<template>
  <view class="container">
    <!-- Notice bar at the top -->
    <uni-notice-bar show-icon scrollable text="5月1号-5月5号放假要调休" />
    
    <!-- Main content area -->
    <view class="main-content">
      <uni-search-bar @confirm="search" :focus="true" v-model="searchValue" @blur="blur" @focus="focus" @input="input"
      	@cancel="cancel" @clear="clear">
      </uni-search-bar>
      
      <!-- Job invitation cards (repeated) -->
      <view class="job-cards-container">
        <view class="job-card">
          <text class="job-title">邀你做兼职</text>
          <text class="job-earnings">日赚100-300元</text>
		  </view>
      </view>
      
       <view class="section-headers">
		  <text class="section-header" @click="findLike()">猜你喜欢</text>
		  <text class="section-header" @click="findNewpush()">最新发布</text>
		  <text class="section-header" @click="changeTab(2)">价格</text>
		  <text class="section-header filter" @click="changeTab(3)">筛选</text>
		</view>
	   
      <view class="product-list">
        <view class="product-card">
          <text class="product-title">偏夏手作湾脚FC尺寸湾心本</text>
          <text class="product-description">子，尺寸FC，内里渐变卡位</text>
          <text class="product-price">v1.13万</text>
        </view>
        
        <view class="product-card">
          <text class="product-title">宽边雪勒饼子的火龙果</text>
          <text class="product-description">电脑包，未使用，保存不当 外面有点痕迹，已擦干净，</text>
          <text class="product-price">v3</text>
        </view>
        
        <view class="product-card">
          <text class="product-title">gorfeld</text>
          <text class="product-description">360秒亲子必备超60秒</text>
          <text class="product-price"></text>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
// 初始化搜索值
const searchValue = ref('');
// 搜索函数
const search = () => {
  uni.showToast({
    title: '搜索：' + searchValue.value,
    icon: 'none'
  });
  uni.navigateTo({
    url: '/pages/search/search', 
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
	.job-cards-container {
	  display: flex;
	  flex-wrap: wrap;
	  justify-content: space-between;
	  margin-bottom: 20px;
	}
	.job-card {
	  width: 48%;
	  background-color: white;
	  border-radius: 8px;
	  padding: 15px;
	  margin-bottom: 10px;
	}

	.job-title {
	  font-size: 16px;
	  font-weight: bold;
	  display: block;
	  margin-bottom: 5px;
	}

	.job-earnings {
	  font-size: 14px;
	  color: #ff6b00;
	  display: block;
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
</style>