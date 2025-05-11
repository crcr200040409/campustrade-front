<template>
  <view class="container">
    <!-- Notice bar at the top -->
    <uni-notice-bar show-icon scrollable text="5月1号-5月5号放假要调休" />

    <!-- Main content area -->
    <view class="main-content">
      <uni-search-bar
          @confirm="search"
          :focus="true"
          v-model="searchValue"
          @blur="blur"
          @focus="focus"
          @input="input"
          @cancel="cancel"
          @clear="clear">
      </uni-search-bar>

      <!-- Section headers for navigation -->
      <view class="section-headers">
        <text class="section-header" @click="findLike()">猜你喜欢</text>
        <text class="section-header" @click="findNewpush()">最新发布</text>
        <text class="section-header" @click="changeTab(2)">价格</text>
        <text class="section-header filter" @click="changeTab(3)">筛选</text>
      </view>

      <view class="product-list">
        <view class="product-card" v-for="(product, index) in productList" :key="index" @click="viewProductDetail(product.commodityId)">
          <image :src="product.commodityPhoto || '/images/default.jpg'" mode="aspectFill" class="product-image" />
          <text class="product-title">{{ product.commodityName }}</text>
          <text class="product-description">{{ product.commodityDescription }}</text>
          <text class="product-price">¥{{ product.commodityPrice.toFixed(2) }}</text>
        </view>
      </view>
    </view>
  </view>
</template>



<script setup>
import { ref, onMounted ,onUnmounted} from 'vue';
import request from "@/api/request.js"; // 导入封装的请求方法

// 初始化数据
const searchValue = ref('');
const productList = ref([]);

// 模拟从接口获取商品数据
const fetchProductList = async () => {
  try {
    const response = await request({
      url: "/commodity/listCommodity", // 请求商品列表接口
      method: "POST",
      data: {
        pageSize: 10,
        pageIndex: 1
      }
    });
    //console.log("response----------->", JSON.stringify(response, 2));
    if (response.code === 200 && response.data) {
      productList.value = response.data; // 设置商品数据
    } else {
      uni.showToast({
        title: '获取商品列表失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error("请求商品列表失败", error);
    uni.showToast({
      title: '请求失败',
      icon: 'none'
    });
  }
};
// 点击商品卡片查看详情
const viewProductDetail = async (commodityId) => {
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?commodityId=${commodityId}` // 传递 commodityId 参数
  });
};
// 搜索函数
const search = () => {
  uni.showToast({
    title: '正在搜索：' + searchValue.value,
    icon: 'none'
  });
  uni.navigateTo({
    url: `/pages/search/search?keyword=${searchValue.value}`,  // 传递关键词
  });
};

// 输入事件
const input = (res) => {
  searchValue.value = res.value;  // 实时更新搜索框的值
};
// 取消搜索
const cancel = () => {
  searchValue.value = '';  // 清空搜索框
};

// 页面加载时获取商品列表
onMounted(() => {
  fetchProductList(); // 页面加载时调用一次获取商品列表的函数
  // 每分钟调用一次获取商品列表函数
  const intervalId = setInterval(() => {
    fetchProductList();
  }, 60000); // 60000 毫秒 = 1 分钟

  // 页面卸载时清除定时器
  onUnmounted(() => {
    clearInterval(intervalId);
  });
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
}

.main-content {
  flex-grow: 1;
  padding: 15px;
}
.section-headers {
  display: flex;
  margin-bottom: 15px;
  border-bottom: 1px solid #eee;
  padding-bottom: 10px;
}

.section-header {
  margin-right: 20px;
  font-size: 16px;
  color: #666;
}

.section-header.active {
  color: #1d9bf0;
  font-weight: bold;
}

.section-header.filter {
  margin-left: auto;
  margin-right: 0;
}

.product-list {
  background-color: white;
  border-radius: 8px;
  padding: 10px;
}

.product-card {
  padding: 15px 0;
  border-bottom: 1px solid #f0f0f0;
}

.product-card:last-child {
  border-bottom: none;
}

.product-title {
  font-size: 16px;
  font-weight: bold;
  display: block;
  margin-bottom: 5px;
}

.product-description {
  font-size: 14px;
  color: #666;
  display: block;
  margin-bottom: 5px;
}

.product-price {
  font-size: 16px;
  color: #ff6b00;
  display: block;
}

.product-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
  margin-bottom: 10px;
}
</style>
