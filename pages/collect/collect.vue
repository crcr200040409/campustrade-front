<template>
  <view class="collect-container">
    <text class="title">我的收藏</text>

    <view v-if="collectList.length === 0" class="empty">
      暂无收藏商品
    </view>

    <view v-else class="commodity-list">
      <view
          v-for="item in collectList"
          :key="item.commodityId"
          class="commodity-item"
          @click="viewProductDetail(item.commodityId)"
      >
        <image :src="item.commodityPhoto" class="commodity-photo" mode="aspectFill" />
        <view class="commodity-info">
          <view class="name">{{ item.commodityName }}</view>
          <view class="desc">{{ item.commodityDescription }}</view>
          <view class="price">¥{{ item.commodityPrice.toFixed(2) }}</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import request from '@/api/request.js'

const collectList = ref([])

// 获取用户收藏的商品
const loadCollectList = async () => {
  const userInfo = uni.getStorageSync('userInfo')
  if (!userInfo || !userInfo.openId) return

  try {
    const res = await request({
      url: `/user/listCollectionCommodity?openId=${userInfo.openId}`,
      method: 'POST'
    })
    console.log("获取用户收藏的商品----------->", JSON.stringify(res, null, 2));
    if (res.code === 200 && Array.isArray(res.data)) {
      // 获取商品详细信息
      const commodityDetails = await Promise.all(res.data.map(item => getCommodityDetail(item.commodityId)))
      collectList.value = commodityDetails
    }
  } catch (err) {
    console.error('加载收藏商品失败', err)
  }
}

// 获取商品详情
const getCommodityDetail = async (commodityId) => {
  try {
    const res = await request({
      url: '/commodity/getCommodityDetail',
      method: 'POST',
      data: commodityId 
    })
    console.log("获取商品详情----------->", JSON.stringify(res, null, 2));
    if (res.code === 200 && res.data) {
      return res.data
    }
  } catch (err) {
    console.error('获取商品详情失败', err)
  }
}

// 查看商品详情
const viewProductDetail = (commodityId) => {
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?commodityId=${commodityId}`
  })
}

onMounted(() => {
  loadCollectList()
})
</script>
<style scoped>
.collect-container {
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
  cursor: pointer;
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

.price {
  font-size: 16px;
  color: #e91e63;
}
</style>
