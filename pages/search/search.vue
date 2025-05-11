<template>
  <view class="container">
    <!-- 搜索框 -->
    <uni-search-bar
        @confirm="handleSearch"
        :focus="true"
        v-model="searchValue"
        @blur="blur"
        @focus="focus"
        @input="input"
        @cancel="cancel"
        @clear="clear"
    ></uni-search-bar>

    <!-- 筛选项 -->
    <view class="filters">
      <view class="filter-group">
        <text class="label">价格区间：</text>
        <input class="input" type="number" v-model.number="priceMin" placeholder="最小价格" />
        <text class="to">-</text>
        <input class="input" type="number" v-model.number="priceMax" placeholder="最大价格" />
      </view>
      <view class="filter-group">
        <text class="label">价格排序：</text>
        <switch @change="e => priceSort = e.detail.value" :checked="priceSort" />
        <text>{{ priceSort ? '升序' : '降序' }}</text>
      </view>
      <view class="filter-group">
        <text class="label">时间排序：</text>
        <switch @change="e => dateSort = e.detail.value" :checked="dateSort" />
        <text>{{ dateSort ? '升序' : '降序' }}</text>
      </view>
    </view>

    <!-- 最近搜索 -->
    <view class="section" v-if="recentSearches.length > 0">
      <view class="section-header">
        <text class="section-title">最近搜索</text>
        <text class="clear-btn" @click="clearHistory">清空</text>
      </view>
      <view class="search-tags">
        <view
            class="tag"
            v-for="(item, index) in recentSearches"
            :key="index"
            @click="handleTagClick(item)"
            @longpress="removeSearchItem(index)"
        >
          {{ item }}
        </view>
      </view>
    </view>
    <!-- 搜索结果展示 -->
    <view class="result-list" v-if="productList.length">
      <view
          class="result-item"
          v-for="(item, index) in productList"
          :key="item.commodityId"
          @click="viewProductDetail(item.commodityId)"
      >
        <image
            :src="item.commodityPhoto || '/images/default.jpg'"
            class="result-image"
            mode="aspectFill"
        />
        <view class="result-info">
          <text class="result-title">{{ item.commodityName }}</text>
          <text class="result-desc">{{ item.commodityDescription }}</text>
          <text class="result-price">¥{{ item.commodityPrice.toFixed(2) }}</text>
        </view>
      </view>
    </view>

    <view v-else-if="searchPerformed" class="empty-tip">
      暂无匹配商品结果
    </view>
  </view>

</template>


<script setup>
import { onMounted, ref } from 'vue';
const searchValue = ref('');
import request from '@/api/request.js';
import { useUserStore } from '@/stores/user.js';
const productList = ref([]);
const searchPerformed = ref(false);
const userStore = useUserStore();
const recentSearches = ref(userStore.getRecentSearches);

// 额外筛选项
const priceMin = ref(0);
const priceMax = ref(100000);
const priceSort = ref(true); // true: 升序
const dateSort = ref(false); // false: 默认降序

const handleSearch = async () => {
  if (!searchValue.value.trim()) return;
  // 保存搜索内容到本地存储
  uni.setStorageSync('searchValue', searchValue.value); // 存储搜索内容
  // 添加搜索记录
  userStore.addSearchRecord(searchValue.value);
  recentSearches.value = userStore.getRecentSearches;
  const payload = {
    labelId: null,
    commodityPriceMin: priceMin.value,
    commodityPriceMax: priceMax.value,
    commodityKeyWord: searchValue.value,
    priceSort: priceSort.value,
    dateSort: dateSort.value,
    commodityStatus: 1,
    pageDTO: {
      pageSize: 10,
      pageIndex: 1
    }
  };

  try {
    const res = await request({
      url: "/commodity/listCommodityByDTO",
      method: "POST",
      data: payload
    });

    if (res.code === 200) {
      productList.value = res.data || [];
      searchPerformed.value = true;
    } else {
      uni.showToast({ title: '搜索失败', icon: 'none' });
    }
  } catch (err) {
    console.error("搜索失败", err);
    uni.showToast({ title: '请求错误', icon: 'none' });
  }
};

// 点击查看详情
const viewProductDetail = (id) => {
  uni.navigateTo({
    url: `/pages/productDetail/productDetail?commodityId=${id}`
  });
};

// 标签点击触发搜索
const handleTagClick = (value) => {
  searchValue.value = value;
  handleSearch();
};

const removeSearchItem = (index) => {
  uni.showModal({
    title: '提示',
    content: '确定删除该搜索记录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.removeSearchRecord(index);
        recentSearches.value = userStore.getRecentSearches;
      }
    }
  });
};

const clearHistory = () => {
  uni.showModal({
    title: '提示',
    content: '确定清空所有搜索记录吗？',
    success: (res) => {
      if (res.confirm) {
        userStore.clearSearchHistory();
        recentSearches.value = [];
      }
    }
  });
};

const input = (res) => searchValue.value = res.value;
const cancel = () => searchValue.value = '';
const blur = () => {};
const focus = () => {};
const clear = () => searchValue.value = '';

onMounted(() => {
  const storedSearchValue = uni.getStorageSync('searchValue');
  if (storedSearchValue) {
    searchValue.value = storedSearchValue; // 将存储的值赋给 searchValue
  }
});
</script>


<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
}

.filters {
  margin-top: 20px;
  margin-bottom: 20px;
}
.result-list {
  margin-top: 20px;
}

.result-item {
  display: flex;
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.result-image {
  width: 100px;
  height: 100px;
  border-radius: 8px;
  background-color: #f1f1f1;
  margin-right: 10px;
}

.result-info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.result-title {
  font-size: 16px;
  font-weight: bold;
  color: #333;
}

.result-desc {
  font-size: 14px;
  color: #666;
  margin: 5px 0;
}

.result-price {
  font-size: 16px;
  color: #ff6b00;
}

.empty-tip {
  text-align: center;
  margin-top: 40px;
  color: #999;
  font-size: 14px;
}

.filter-group {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.label {
  width: 90px;
  font-size: 14px;
  color: #333;
}

.input {
  width: 90px;
  padding: 5px 10px;
  margin-right: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.to {
  margin-right: 8px;
}

.search-tags {
  display: flex;
  flex-wrap: wrap;
  margin-top: 10px;
}

.tag {
  margin: 5px;
  padding: 8px 15px;
  background-color: #f1f1f1;
  border-radius: 20px;
  font-size: 14px;
  color: #333;
}

.section {
  margin-top: 20px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}

.section-title {
  font-size: 16px;
  color: #333;
  font-weight: bold;
}

.clear-btn {
  font-size: 14px;
  color: #999;
}
</style>
