<template>
  <view class="container">
    <!-- 头像和设置部分 -->
    <view class="header">
      <image class="avatar" src="/static/logo.png" />
      <view class="user-info">
        <text class="username">我是盐津蝦</text>
        <text class="user-id">昵称：xy55537471742</text>
      </view>
      <button class="setting-btn">设置</button>
    </view>
    <!-- 我的交易部分 -->
    <view class="section">
     <text class="section-title">我的交易</text>
	  <button class="item-button">
		  <uni-icons type="plusempty" size="20" color="#000" class="icon"></uni-icons>
		  <text class="button-text">我发布的</text>
	  </button>
	  <button class="item-button">
		   <uni-icons type="cart-filled" size="20" color="#000" class="icon"></uni-icons>
		   <text class="button-text">我卖出的</text>
	  </button>
    </view>

    <!-- 常用工具部分 -->
	
    <view class="section">
      <text class="section-title">常用工具</text>
	  <button class="item-button" @click="goMyCollect()">
	  		  <uni-icons type="star-filled" size="20" color="#000" class="icon"></uni-icons>
	  		  <text class="button-text" >我的收藏</text>
	  </button>
     <button class="item-button" @click="contactService()">
     		  <uni-icons type="phone" size="20" color="#000" class="icon"></uni-icons>
     		  <text class="button-text">联系客服</text>
     </button>
	 <button class="item-button">
	 		  <uni-icons type="mail-open" size="20" color="#000" class="icon"></uni-icons>
	 		  <text class="button-text">意见反馈</text>
	 </button>
	 <button class="item-button">
	 		  <uni-icons type="help" size="20" color="#000" class="icon"></uni-icons>
	 		  <text class="button-text">关于吉刻转</text>
	 </button>
    </view>
  </view>
</template>



<script setup>
	 const app = getApp();
   const goMyCollect=()=>{
     console.log('goMyCollect function called');
     uni.navigateTo({
       url: '/pages/collect/collect',
     });
   }
   const contactService=()=>{

   }
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
}

.header {
  display: flex;
  align-items: center;
  background-color: #2196F3; /* 蓝色背景 */
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
  color: white; /* 白色字体 */
}

.avatar {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  margin-right: 10px;
}

.user-info {
  flex-grow: 1;
}

.username {
  font-size: 18px;
  font-weight: bold;
}

.user-id {
  font-size: 14px;
}

.setting-btn {
  background-color: #fff;
  color: #2196F3;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 14px;
  border: none;
}

.section {
  background-color: white;
  padding: 15px;
  margin-bottom: 20px;
  border-radius: 8px;
}

.section-title {
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
}




.item-button {
  display: flex;
  align-items: center;
  background-color: white;
  color: #000;
  padding: 1px 20px;
  margin-top: 15px;
  border-radius: 6px;
  text-align: left;
  font-size: 10px;
  width: 100%;
  border: 1px solid #ddd;
}

.icon {
  margin-right: 10px; /* 设置图标和文字之间的间距 */
}

.button-text {
  font-size: 16px;
  color: #000; /* 设置文字颜色为黑色 */
}
</style>
