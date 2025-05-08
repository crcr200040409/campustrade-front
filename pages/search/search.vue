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

    <view class="search-result">
      <text class="search-result-text">当前输入为：{{ searchValue }}</text>
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
  </view>
</template>

<script setup>
import {ref} from 'vue';
import {useUserStore} from '@/stores/user.js';

const userStore = useUserStore();
const searchValue = ref('');

// 获取搜索记录
const recentSearches = ref(userStore.getRecentSearches);

// 搜索处理
const handleSearch = () => {
  if (!searchValue.value.trim()) return;
  userStore.addSearchRecord(searchValue.value);
  recentSearches.value = userStore.getRecentSearches;
  uni.showToast({
    title: '搜索：' + searchValue.value,
    icon: 'none'
  });
  // 实际搜索逻辑，例如跳转到搜索结果页
  // uni.navigateTo({ url: `/pages/search/result?keyword=${searchValue.value}` });
};

// 点击标签搜索
const handleTagClick = (value) => {
  searchValue.value = value;
  handleSearch();
};

// 长按删除单个搜索记录
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

// 清空搜索历史
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

// 其他原有方法保持不变
const input = (res) => {
  searchValue.value = res.value;
};
const cancel = () => {
  searchValue.value = '';
};
const blur = () => {
};
const focus = () => {
};
const clear = () => {
  searchValue.value = '';
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #fff;
}

.search-bar {
  margin-top: 15px;
  background-color: #f5f5f5;
  border-radius: 25px;
  border: 1px solid #ddd;
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