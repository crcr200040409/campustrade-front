<template>
  <view class="chat-container">
    <!-- 头部 -->
    <view class="chat-header">
      <uni-icons type="arrowleft" size="24" color="#333" @click="goBack" class="back-icon"></uni-icons>
      <text class="user-name">{{ userName }}</text>
    </view>

    <!-- 消息列表 -->
    <scroll-view class="message-list" scroll-y :scroll-top="scrollTop" :style="{ height: scrollHeight + 'px' }">
      <view v-for="(message, index) in messages" :key="index" class="message-item" :class="message.sender === myId ? 'me' : 'other'">
        <view class="message-bubble">
          <text class="message-text">{{ message.content }}</text>
          <text class="message-time">{{ formatTime(message.time) }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区 -->
    <view class="chat-input-area">
      <input v-model="newMessage" type="text" placeholder="请输入消息" :adjust-position="false" @confirm="sendMessage" class="message-input" />
      <button @click="sendMessage" :disabled="!newMessage.trim()" class="send-button">发送</button>
    </view>
  </view>
</template>

<script setup>
import {ref, reactive, onMounted, nextTick} from 'vue'
import {onLoad} from '@dcloudio/uni-app'
import request from '@/api/request' // 需提前封装好 request 方法

const messages = reactive([])
const newMessage = ref('')
const scrollTop = ref(0)
const scrollHeight = ref(0)

const myId = ref('')
const options = ref({})
const userName = ref('')

onLoad(async (params) => {
  options.value = params
  console.log('myId set to:', params.value)
  userName.value = params.userName || '用户'
  const userInfo = uni.getStorageSync('userInfo')
  myId.value = userInfo?.openId || 'unknown_user'
  console.log('myId set to:', myId.value)
  await loadMessages()
  setTimeout(() => {
    calcScrollHeight()
  }, 300)
})

// 获取聊天历史
const loadMessages = async () => {
  try {
    const res = await request({
      url: '/user/listMessage',
      method: 'POST',
      data: {
        senderId: myId.value,
        receiverId: options.value.sellerId
      }
    })
    console.log("options.value.sellerId----------->", JSON.stringify(options, null, 2));
    if (res.code === 200 && res.data) {
      messages.splice(0, messages.length, ...res.data.map(msg => ({
        sender: msg.senderId,
        content: msg.messageContent,
        time: msg.timestamp || new Date()
      })))
      scrollToBottom()
    }
  } catch (err) {
    console.error('加载消息失败', err)
  }
}

// 发送消息
const sendMessage = async () => {
  const content = newMessage.value.trim()
  if (!content) return
  const msg = {
    sender: myId.value,
    content,
    time: new Date()
  }
  messages.push(msg)
  newMessage.value = ''
  scrollToBottom()
  try {
    const res=await request({
      url: '/user/sendMessage',
      method: 'POST',
      data: {
        senderId: myId.value,
        receiverId: options.value.sellerId,
        messageContent: content
      }
    })
    console.error('sendMessage---------->', res)
  } catch (err) {
    console.error('发送失败', err)
    uni.showToast({title: '消息发送失败', icon: 'none'})
  }
}

// 滚动到底部
const scrollToBottom = () => {
  nextTick(() => {
    scrollTop.value = 999999
  })
}

// 时间格式化
const formatTime = (date) => {
  if (!date) return ''
  const d = new Date(date)
  return d.toLocaleTimeString('zh', {hour: '2-digit', minute: '2-digit'})
}

// 高度计算
const calcScrollHeight = () => {
  nextTick(() => {
    const systemInfo = uni.getSystemInfoSync()
    const query = uni.createSelectorQuery()
    query.select('.chat-header').boundingClientRect()
    query.select('.chat-input-area').boundingClientRect()
    query.exec(res => {
      if (res && res[0] && res[1]) {
        const headerHeight = res[0].height || 50
        const inputHeight = res[1].height || 60
        scrollHeight.value = systemInfo.windowHeight - headerHeight - inputHeight
      } else {
        // 默认值，防止计算失败
        scrollHeight.value = systemInfo.windowHeight - 110 // 50(header) + 60(input)
      }
    })
  })
}

// 返回
const goBack = () => {
  uni.navigateBack()
}
</script>

<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.chat-header {
  display: flex;
  align-items: center;
  padding: 15px;
  background-color: #fff;
  border-bottom: 1px solid #eee;

  .back-icon {
    margin-right: 10px;
  }

  .user-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
}

.message-list {
  flex: 1;
  padding: 10px 15px;
  box-sizing: border-box;
  background-color: #f5f5f5;
}

.message-item {
  margin-bottom: 15px;

  &.me {
    display: flex;
    justify-content: flex-end;

    .message-bubble {
      background-color: #1d9bf0;
      border-top-right-radius: 0;

      .message-text {
        color: #fff;
      }

      .message-time {
        color: rgba(255, 255, 255, 0.7);
      }
    }
  }

  &.other {
    display: flex;
    justify-content: flex-start;

    .message-bubble {
      background-color: #fff;
      border-top-left-radius: 0;
      box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
    }
  }
}

.message-bubble {
  max-width: 70%;
  padding: 10px 12px;
  border-radius: 8px;
}

.message-text {
  font-size: 16px;
  line-height: 1.4;
}

.message-time {
  display: block;
  font-size: 12px;
  margin-top: 4px;
  text-align: right;
  color: #999;
}

.chat-input-area {
  display: flex;
  padding: 10px;
  background-color: #fff;
  border-top: 1px solid #eee;

  .message-input {
    flex: 1;
    padding: 8px 12px;
    background-color: #f5f5f5;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 16px;
  }

  .send-button {
    background-color: #1d9bf0;
    color: #fff;
    border: none;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 14px;

    &:disabled {
      background-color: #ccc;
      color: #999;
    }
  }
}
</style>
