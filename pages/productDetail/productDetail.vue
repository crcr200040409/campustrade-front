<template>
  <view class="container">
    <!-- 商品图片轮播 -->
    <swiper class="product-swiper" indicator-dots autoplay circular>
      <swiper-item>
        <image :src="product.commodityPhoto || '/images/default.jpg'" mode="aspectFill" class="swiper-image" />
      </swiper-item>
      <!-- 可以添加更多图片 -->
    </swiper>

    <!-- 商品基本信息 -->
    <view class="product-info">
      <view class="price-section">
        <text class="price-symbol">¥</text>
        <text class="product-price">{{ product.commodityPrice.toFixed(2) }}</text>
      </view>
      <text class="product-title">{{ product.commodityName }}</text>
      <view class="meta-info">
        <text class="publish-time">发布时间: {{ formatTime(product.commodityPublishTime) }}</text>
        <text class="modify-time" v-if="product.commodityModifyTime">更新: {{ formatTime(product.commodityModifyTime) }}</text>
      </view>
    </view>

    <!-- 商品描述 -->
    <view class="description-card">
      <text class="section-title">商品描述</text>
      <text class="product-description">{{ product.commodityDescription }}</text>
    </view>

    <!-- 卖家信息 -->
    <view class="seller-card">
      <text class="section-title">卖家信息</text>
      <view class="seller-info">
        <image src="/static/images/avatar.png" class="seller-avatar" />
        <text class="seller-name">用户{{ product.openId.slice(-4) }}</text>
      </view>
    </view>

    <!-- 底部操作栏 -->
    <view class="action-bar">
      <button class="action-btn collect-btn" @tap="toggleCollect">
        <uni-icons :type="isCollected ? 'heart-filled' : 'heart'" size="24" color="#333" class="btn-icon"></uni-icons>
        <text>{{ isCollected ? '已收藏' : '收藏' }}</text>
      </button>

      <button class="action-btn contact-btn" @tap="contactSeller">
        <image src="/static/images/contact.png" class="btn-icon" />
        <text>联系卖家</text>
      </button>
    </view>
  </view>
</template>

<script setup>
import {ref, onMounted} from 'vue';
import request from "@/api/request.js";
const userInfo = ref(uni.getStorageSync('userInfo') || null);

const product = ref({
  commodityId:0,
  commodityPrice: 0,
  commodityPhoto: '',
  commodityName: '',
  commodityDescription: '',
  commodityPublishTime: '',
  openId: ''
});
const isCollected = ref(false);
// 格式化时间显示
const formatTime = (timeString) => {
  if (!timeString) return '';
  const date = new Date(timeString);
  return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')} ${date.getHours().toString().padStart(2, '0')}:${date.getMinutes().toString().padStart(2, '0')}`;
};
// 获取商品详情
const fetchProductDetail = async (commodityId) => {
  try {
    const response = await request({
      url: "/commodity/getCommodityDetail",
      method: "POST",
      data: commodityId
    });
    if (response.code === 200 && response.data) {
      product.value = response.data;
      // 检查是否已收藏
      await checkCollectionStatus(commodityId);
    } else {
      uni.showToast({
        title: '获取商品详情失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error("请求商品详情失败", error);
    uni.showToast({
      title: '请求失败',
      icon: 'none'
    });
  }
};

const checkCollectionStatus = async (commodityId) => {
  try {
    const res = await request({
      url: `/user/listCollectionCommodity?openId=${userInfo.value.openId}`,
      method: 'POST'
    });
    console.log("resInfo----------->", JSON.stringify(res, null, 2));
    if (res.code === 200 && Array.isArray(res.data)) {
      isCollected.value = res.data.find(item => item.commodityId === Number(commodityId)) !== undefined;

    } else {
      isCollected.value = false;
    }
  } catch (error) {
    console.error("检查收藏状态失败", error);
  }
};

// 切换收藏状态
const toggleCollect = async () => {
  isCollected.value = !isCollected.value;
  const url = isCollected.value ? '/user/collectCommodity' : '/user/removeCommodity'; // 根据收藏状态切换URL
  try {
    const res = await request({
      url: url, // API接口
      method: 'POST',
      data: {
        openId: userInfo.value.openId, // 用户ID
        commodityId: [product.value.commodityId], // 商品ID数组
      }
    });
    if (res.code === 200) {
      uni.showToast({
        title: isCollected.value ? '已收藏' : '已取消收藏',
        icon: 'none'
      });
    } else {
      uni.showToast({
        title: '操作失败，请稍后再试',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('操作失败', error);
    uni.showToast({
      title: '请求失败',
      icon: 'none'
    });
  }
};

// 联系卖家
const contactSeller = () => {
  uni.showToast({
    title: '正在联系卖家...',
    icon: 'none'
  });
  // 联系卖家
  uni.navigateTo({
    url: `/pages/chatdetail/chatdetail?sellerId=${product.value.openId}`
  });

  // 这里可以实现跳转到聊天页面或复制联系方式
};

// 页面加载时获取商品详情
onMounted(() => {
  const pages = getCurrentPages();
  const currentPage = pages[pages.length - 1];
  const commodityId = currentPage.options.commodityId;
  fetchProductDetail(commodityId);
  checkCollectionStatus(commodityId)
});
</script>

<style scoped>
.container {
  padding-bottom: 100px;
  background-color: #f7f7f7;
  min-height: 100vh;
}

/* 商品轮播图样式 */
.product-swiper {
  width: 100%;
  height: 375px;
  background-color: #f5f5f5;
}

.swiper-image {
  width: 100%;
  height: 100%;
}

/* 商品信息区域 */
.product-info {
  padding: 20px 15px;
  background-color: #fff;
  margin-bottom: 10px;
}

.price-section {
  display: flex;
  align-items: baseline;
  margin-bottom: 10px;
}

.price-symbol {
  font-size: 18px;
  color: #ff6b00;
  font-weight: bold;
}

.product-price {
  font-size: 24px;
  color: #ff6b00;
  font-weight: bold;
  margin-left: 2px;
}

.product-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 10px;
  line-height: 1.4;
}

.meta-info {
  display: flex;
  justify-content: space-between;
  font-size: 12px;
  color: #999;
}

/* 描述卡片 */
.description-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
  border-radius: 0;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
  display: block;
  color: #333;
}

.product-description {
  font-size: 14px;
  color: #666;
  line-height: 1.6;
}

/* 卖家信息卡片 */
.seller-card {
  background-color: #fff;
  padding: 15px;
  margin-bottom: 10px;
}

.seller-info {
  display: flex;
  align-items: center;
  padding: 10px 0;
}

.seller-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  margin-right: 10px;
}

.seller-name {
  font-size: 15px;
  color: #333;
}

/* 底部操作栏 */
.action-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  height: 60px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  box-shadow: 0 -2px 10px rgba(0, 0, 0, 0.05);
  z-index: 100;
}

.action-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  font-size: 12px;
  color: #666;
  padding: 5px 15px;
  height: 100%;
}

.action-btn::after {
  border: none;
}

.btn-icon {
  width: 24px;
  height: 28px;
  margin-bottom: 3px;
}

.collect-btn {
  color: #666;
}


.contact-btn {
  flex: 1;
  background-color: #ff6b00;
  color: #fff;
  border-radius: 30px;
  margin-left: 15px;
  height: 45px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

.contact-btn text {
  color: #fff;
  font-size: 16px;
  margin-left: 5px;
}
</style>