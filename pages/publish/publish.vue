<template>
  <view class="my-publish-container">
    <view class="title">我发布的商品</view>

    <view v-if="myCommodities.length === 0" class="empty">
      暂无发布商品
    </view>
    <view v-else class="commodity-list">
      <view v-for="item in myCommodities" :key="item.commodityId" class="commodity-item">
        <image :src="item.commodityPhoto" class="commodity-photo" mode="aspectFill" />
        <view class="commodity-info">
          <view class="name">{{ item.commodityName }}</view>
          <view class="desc">{{ item.commodityDescription }}</view>
          <view class="price-time">
            <text class="price">¥{{ item.commodityPrice.toFixed(2) }}</text>
            <text class="time">{{ formatTime(item.commodityPublishTime) }}</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import request from '@/api/request.js'

const myCommodities = ref([])
const userInfo = ref(uni.getStorageSync('userInfo') || {})

const loadMyPublished = async () => {
  try {
    const res = await request({
      url: '/commodity/listCommodity',
      method: 'POST',
      data: {
        pageSize: 50,
        pageIndex: 1
      }
    })

    if (res.code === 200 && Array.isArray(res.data)) {
      myCommodities.value = res.data.filter(item => item.openId === userInfo.value.openId)
    }
  } catch (err) {
    console.error('加载我的发布失败', err)
  }
}

const formatTime = (timeStr) => {
  const date = new Date(timeStr)
  return date.toLocaleDateString() + ' ' + date.toLocaleTimeString().slice(0, 5)
}

onMounted(() => {
  loadMyPublished()
})
</script>
<style scoped>
.my-publish-container {
  padding: 20rpx;
  background-color: #f8f8f8;
}

.title {
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 20rpx;
}

.empty {
  text-align: center;
  color: #888;
  margin-top: 100rpx;
}

.commodity-list {
  display: flex;
  flex-direction: column;
  gap: 20rpx;
}

.commodity-item {
  display: flex;
  background: #fff;
  border-radius: 12rpx;
  overflow: hidden;
  box-shadow: 0 2rpx 8rpx rgba(0, 0, 0, 0.05);
}

.commodity-photo {
  width: 120rpx;
  height: 120rpx;
  object-fit: cover;
  border-radius: 12rpx 0 0 12rpx;
}

.commodity-info {
  flex: 1;
  padding: 12rpx;
}

.name {
  font-size: 16px;
  font-weight: 600;
}

.desc {
  font-size: 14px;
  color: #666;
  margin: 6rpx 0;
}

.price-time {
  display: flex;
  justify-content: space-between;
  font-size: 14px;
  color: #999;
}

.price {
  color: #e91e63;
}
</style>
