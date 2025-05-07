<template>
  <view class="container">
    <uni-list :border="true">
      <uni-list-chat
        title="ruichen"
        avatar="https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png"
        note="您收到一条新的消息"
        time="2020-02-02 20:20"
        badge-position="left"
        badge-text="99"
        @click="goToChatDetail('openId12345')" link
      ></uni-list-chat>
    </uni-list>
  </view>
</template>

<script setup>
// 跳转到聊天详细页面，并传递openId
const goToChatDetail = (openId) => {
  console.log("click---goToChatDetail");
  uni.navigateTo({
    url: `/pages/chatdetail/chatdetail?openId=${openId}`,
    fail: (err) => {
      console.error('跳转失败:', err);
    }
  });
};
</script>

<style>
.container uni-list-chat {
  cursor: pointer;
}
</style>
