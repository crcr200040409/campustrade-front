<!-- components/custom-tabbar.vue -->
<template>
  <!-- 普通用户 TabBar -->
  <view v-if="!isAdmin" class="tabbar safe-area">
    <view
        v-for="(item, index) in userTabs"
        :key="index"
        class="tabbar-item"
        @click="switchTab(item)"
    >
      <image :src="currentPage === item.pagePath ? item.selectedIconPath : item.iconPath"/>
      <text :class="{ active: currentPage === item.pagePath }">{{ item.text }}</text>
    </view>
  </view>

  <!-- 管理员 TabBar -->
  <view v-else class="tabbar safe-area">
    <view
        v-for="(item, index) in adminTabs"
        :key="index"
        class="tabbar-item"
        @click="switchTab(item)"
    >
      <image :src="currentPage === item.pagePath ? item.selectedIconPath : item.iconPath"/>
      <text :class="{ active: currentPage === item.pagePath }">{{ item.text }}</text>
    </view>
  </view>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useUserStore } from '@/store/user';
import { storeToRefs } from 'pinia';

const userStore = useUserStore();
const { isAdmin } = storeToRefs(userStore);

const props = defineProps({
  currentPage: String // 当前页面路径
});

// 普通用户 Tab 配置
const userTabs = [
  {
    pagePath: "pages/home/home",
    text: "首页",
    iconPath: "/static/home-icon.png",
    selectedIconPath: "/static/home-active.png"
  },
  // 其他用户专属 Tab...
];

// 管理员 Tab 配置
const adminTabs = [
  {
    pagePath: "pages/admin/home",
    text: "仪表盘",
    iconPath: "/static/admin-home.png",
    selectedIconPath: "/static/admin-home-active.png"
  },
  {
    pagePath: "pages/admin/users",
    text: "用户管理",
    iconPath: "/static/user-manage.png",
    selectedIconPath: "/static/user-manage-active.png"
  },
  // 其他管理功能 Tab...
];

const switchTab = (item) => {
  uni.switchTab({ url: '/' + item.pagePath });
};
</script>

<style scoped>
.tabbar {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 100rpx;
  display: flex;
  background: white;
  box-shadow: 0 -2rpx 10rpx rgba(0,0,0,0.05);
}
.tabbar-item {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.tabbar-item image {
  width: 48rpx;
  height: 48rpx;
}
.active {
  color: #3cc51f;
}
.safe-area {
  padding-bottom: env(safe-area-inset-bottom);
}
</style>