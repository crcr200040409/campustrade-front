<template>
  <view class="container">
    <!-- 页面主体内容 -->
    <view class="main-content">
      <text>Home 页面内容</text>
    </view>

  </view>
</template>

<script setup>
  // No special setup code required for this template
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;  /* 让整个页面的高度为视口高度 */
}

.main-content {
  flex-grow: 1;  /* 让主体内容区域占据剩余的空间 */
  padding: 20px;
  background-color: #f5f5f5;
}

</style>
