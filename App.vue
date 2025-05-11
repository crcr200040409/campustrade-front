<template>
  <view>
    <view class="content">
      <slot></slot>
    </view>
    <custom-tabbar v-if="showTabBar"></custom-tabbar>
  </view>
</template>

<script>
export default {
  onLaunch: function() {
    console.log('App Launch')
  },
  onShow: function() {
    console.log('App Show')
  },
  onHide: function() {
    console.log('App Hide')
  }
}
</script>

<style>

.content {
  padding-bottom: 100rpx;
}
</style>
