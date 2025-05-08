<template>
  <view>
    <!-- 商品列表 -->
    <view v-for="product in pendingProducts" :key="product.commodityId" class="product-item">
      <image :src="product.commodityPhoto" mode="aspectFill" class="product-image"/>
      <view class="product-details">
        <text class="product-name">{{ product.commodityName }}</text>
        <text class="product-price">¥{{ product.commodityPrice }}</text>
      </view>
      <button @click="openReviewModal(product)" class="view-button">查看详情</button>
    </view>

    <!-- 商品审核弹窗 -->
    <view v-if="showModal" class="modal">
      <view class="modal-content">
        <text class="modal-title">商品名称: {{ currentProduct.commodityName }}</text>
        <image :src="currentProduct.commodityPhoto" mode="aspectFill" class="product-image"/>
        <text class="modal-description">描述: {{ currentProduct.commodityDescription }}</text>
        <text class="modal-price">价格: ¥{{ currentProduct.commodityPrice }}</text>
        <text class="modal-publish-time">发布时间: {{ currentProduct.commodityPublishTime }}</text>
        <text class="modal-modify-time">修改时间: {{ currentProduct.commodityModifyTime }}</text>

        <view class="actions">
          <button @click="approveProduct(currentProduct.commodityId)" class="approve-button">通过</button>
          <button @click="rejectProduct(currentProduct.commodityId)" class="reject-button">拒绝</button>
          <button @click="closeModal" class="close-button">关闭</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const pendingProducts = ref([
  {
    commodityId: 111,
    commodityName: "城成",
    commodityPhoto: "https://loremflickr.com/400/400?lock=2258253218856786",
    commodityDescription: "道算百族领头听很性由。省门前始。",
    commodityPrice: 50.99,
    commodityStatus: 0,
    commodityPublishTime: "2025-05-07T00:39:15",
    commodityModifyTime: "2025-05-07T00:47:21"
  },
  {
    commodityId: 112,
    commodityName: "瑞德",
    commodityPhoto: "https://loremflickr.com/400/400?lock=2258253218856787",
    commodityDescription: "优雅的设计，经典的风格，适合任何场合。",
    commodityPrice: 120.50,
    commodityStatus: 0,
    commodityPublishTime: "2025-05-06T14:15:00",
    commodityModifyTime: "2025-05-06T14:20:00"
  },
])  // 存放待审核商品列表
const showModal = ref(false)  // 控制弹窗显示
const currentProduct = ref({})  // 存放当前点击的商品信息

// 获取待审核商品列表
const fetchPendingProducts = async () => {
  const { data } = await uni.request({ url: '/api/admin/products/pending' })
  pendingProducts.value = data
}

// 打开商品审核弹窗
const openReviewModal = (product) => {
  currentProduct.value = product
  showModal.value = true
}

// 关闭弹窗
const closeModal = () => {
  showModal.value = false
}

// 审核通过
const approveProduct = async (id) => {
  await uni.request({ url: `/api/admin/products/${id}/approve`, method: 'POST' })
  fetchPendingProducts()  // 重新获取待审核商品列表
  closeModal()  // 关闭弹窗
}

// 审核拒绝
const rejectProduct = async (id) => {
  await uni.request({ url: `/api/admin/products/${id}/reject`, method: 'POST' })
  fetchPendingProducts()  // 重新获取待审核商品列表
  closeModal()  // 关闭弹窗
}

// 页面加载时获取待审核商品列表
onMounted(fetchPendingProducts)
</script>

<style scoped>
/* 商品项布局 */
.product-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: #fff;
}

.product-image {
  width: 80px;
  height: 80px;
  object-fit: cover;
  margin-right: 10px;
}

.product-details {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin-right: 10px;
}

.product-name {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.product-price {
  font-size: 14px;
  color: #999;
}

.view-button {
  background-color: #2196F3;
  color: white;
  border: none;
  padding: 8px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.view-button:hover {
  background-color: #1976D2;
}

/* 弹窗样式 */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
}

/* 弹窗内容 */
.modal-content {
  background-color: #fff;
  padding: 20px;
  width: 80%;
  max-width: 500px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  color: #333;
  margin-bottom: 10px;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 15px;
}

.modal-description,
.modal-price,
.modal-publish-time,
.modal-modify-time {
  font-size: 14px;
  color: #666;
  margin: 10px 0;
  display: block;
}

.actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

button {
  padding: 8px 20px;
  font-size: 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.approve-button {
  background-color: #4CAF50;
  color: white;
}

.reject-button {
  background-color: #F44336;
  color: white;
}

.close-button {
  background-color: #9E9E9E;
  color: white;
}

button:hover {
  opacity: 0.8;
}
</style>
