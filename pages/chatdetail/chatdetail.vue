<template>
  <view class="chat-container">
    <!-- 头部 -->
    <view class="chat-header">
      <text class="user-name">{{ userName }}</text>
    </view>
    <!-- 消息列表 -->
    <scroll-view
        class="message-list"
        scroll-y
        :scroll-top="scrollTop"
        :style="{ height: scrollHeight + 'px' }"
    >
      <view
          v-for="(message, index) in messages"
          :key="index"
          class="message-item"
          :class="message.sender"
      >
        <view class="message-bubble">
          <text class="message-content">{{ message.content }}</text>
          <text class="message-time">{{ message.time }}</text>
        </view>
      </view>
    </scroll-view>

    <!-- 输入区 -->
    <view class="chat-input">
      <input
          v-model="newMessage"
          type="text"
          placeholder="请输入消息"
          :adjust-position="false"
      @confirm="sendMessage"
      />
      <button @click="sendMessage">发送</button>
    </view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'

// const openId = uni.getCurrentPages().pop().options.openId
const openId ="1010"
const userName = ref('ruichen')
const messages = reactive([
  {
    sender: "me",
    content: "你好，最近怎么样？",
    time: "10:30"
  },
  {
    sender: "other",
    content: "很好，谢谢！",
    time: "10:31"
  }
])

// 新增：滚动控制相关变量
const scrollTop = ref(0)
const scrollHeight = ref(0)

// 修复3：自动计算可滚动高度
onMounted(() => {
  const systemInfo = uni.getSystemInfoSync()
  const query = uni.createSelectorQuery().in(this)
  query.select('.chat-header').boundingClientRect()
  query.select('.chat-input').boundingClientRect()
  query.exec(res => {
    const headerHeight = res[0].height
    const inputHeight = res[1].height
    scrollHeight.value = systemInfo.windowHeight - headerHeight - inputHeight
  })
})

const newMessage = ref('')
const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  messages.push({
    sender: "me",
    content: newMessage.value.trim(),
    time: new Date().toLocaleTimeString('zh', { hour: '2-digit', minute: '2-digit' })
  })

  newMessage.value = ''
  await nextTick()
  scrollTop.value = Date.now()
}

setInterval(() => {
  if (messages.length % 2 === 0) return
  messages.push({
    sender: "other",
    content: "自动回复：" + new Date().toLocaleTimeString(),
    time: new Date().toLocaleTimeString('zh', { hour: '2-digit', minute: '2-digit' })
  })
  scrollTop.value = Date.now()
}, 3000)
</script>

<style lang="scss">
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: #f5f5f5;
}

.chat-header {
  padding: 15px;
  background: #fff;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);

  .user-name {
    font-size: 18px;
    font-weight: 600;
    color: #333;
  }
}

.message-list {
  flex: 1;
  padding: 15px;
  box-sizing: border-box;
}

.message-item {
  margin-bottom: 15px;

  &.me {
    display: flex;
    justify-content: flex-end;
  }

  &.other {
    display: flex;
    justify-content: flex-start;
  }
}

.message-bubble {
  max-width: 70%;
  padding: 12px 15px;
  border-radius: 8px;
  position: relative;

  .me & {
    background: #1d9bf0;
    color: white;
    border-bottom-right-radius: 2px;
  }

  .other & {
    background: white;
    color: #333;
    border-bottom-left-radius: 2px;
    box-shadow: 0 2px 4px rgba(0,0,0,0.1);
  }
}

.message-content {
  font-size: 16px;
  line-height: 1.4;
}

.message-time {
  display: block;
  font-size: 12px;
  color: rgba(255,255,255,0.7);
  margin-top: 5px;
  text-align: right;

  .other & {
    color: #666;
  }
}

.chat-input {
  display: flex;
  padding: 10px;
  background: white;
  border-top: 1px solid #eee;

  input {
    flex: 1;
    padding: 10px 15px;
    border: 1px solid #ddd;
    border-radius: 20px;
    margin-right: 10px;
    font-size: 14px;
  }

  button {
    background: #1d9bf0;
    color: white;
    border: none;
    border-radius: 20px;
    padding: 0 20px;
    font-size: 14px;

    &:active {
      opacity: 0.8;
    }
  }
}
</style>