<template>
  <view class="container">
    <uni-list :border="true">
      <uni-list-chat
          v-for="user in userList"
          :key="user.openId"
          :title="user.userName || user.openId"
          :avatar="user.avatar || defaultAvatar"
          :note="user.lastMessage || '点击开始聊天'"
          :time="formatTime(user.lastTime)"
          :badge-text="user.unreadCount || ''"
          @click="goToChatDetail(user.openId)"
          link
      ></uni-list-chat>
    </uni-list>

    <view v-if="userList.length === 0" class="empty">
      暂无会话
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import request from '@/api/request' // 请确认路径正确

const userList = ref([])
const defaultAvatar = 'https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png'

onMounted(() => {
  loadConversationList()
})

const loadConversationList = async () => {
  const userInfo = uni.getStorageSync('userInfo')
  if (!userInfo || !userInfo.openId) return

  try {
    const res = await request({
      url: `/user/listMessageList/?openId=${userInfo.openId}`,
      method: 'POST'
    })
    console.log("resInfo----------->", JSON.stringify(res, null, 2));
    if (res.code === 200 && Array.isArray(res.data)) {
      userList.value = res.data.map(openId => ({
        openId,
        userName: '用户' + openId.slice(-4), // 可拓展昵称接口
        lastMessage: '您收到一条新的消息',
        lastTime: new Date(), // 需替换为接口返回时间（你现在接口没提供）
        unreadCount: 0, // 这里先写死，真实项目应统计未读数
        avatar: defaultAvatar
      }))
    }
  } catch (err) {
    console.error('加载消息列表失败', err)
  }
}

const goToChatDetail = (openId) => {
  uni.navigateTo({
    url: `/pages/chatdetail/chatdetail?sellerId=${openId}`,
    fail: (err) => {
      console.error('跳转失败:', err)
    }
  })
}

const formatTime = (time) => {
  const d = new Date(time)
  return d.toLocaleTimeString('zh', { hour: '2-digit', minute: '2-digit' })
}
</script>

<style scoped>
.container {
  padding: 10rpx;
}
.empty {
  text-align: center;
  color: #999;
  margin-top: 100rpx;
}
</style>
