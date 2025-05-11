<template>
  <view class="container">
    <!-- 头像和设置部分 -->
    <view class="header">
      <image :src="userInfo.avatar" class="avatar" />
      <view class="user-info">
        <text class="user-id">昵称：{{ userInfo.userName }}</text>
      </view>
      <button class="setting-btn" @click="openSettingModal">设置</button>
    </view>

    <!-- 我的交易部分 -->
    <view class="section">
      <text class="section-title">我的交易</text>
      <button class="item-button" @click="goMyPublish">
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
        <text class="button-text">我的收藏</text>
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
      <button class="item-button" @click="logout">
        <uni-icons type="back" size="20" color="#000" class="icon"></uni-icons>
        <text class="button-text">退出</text>
      </button>
    </view>

    <!-- 用户信息设置弹窗 -->
    <view v-if="showModal" class="modal-overlay" @click="closeSettingModal">
      <view class="modal-content" @click.stop>
        <text class="modal-title">编辑个人信息</text>
        <input v-model="userInfo.userName" placeholder="修改昵称" class="modal-input" />
        <input v-model="userInfo.phoneNumber" placeholder="修改手机号" class="modal-input" type="tel" />
        <button class="upload-avatar-btn" @click="chooseAvatar">上传头像</button>
        <view class="gender-select">
          <radio-group @change="(e) => userInfo.userGender = e.detail.value" class="gender-group">
            <label class="gender-option">
              <radio value="1" :checked="userInfo.userGender === 1" />
              <text>男</text>
            </label>
            <label class="gender-option">
              <radio value="0" :checked="userInfo.userGender === 0" />
              <text>女</text>
            </label>
          </radio-group>
        </view>


        <view class="button-group">
          <button class="save-btn" @click="saveUserInfo">保存</button>
          <button class="cancel-btn" @click="closeSettingModal">取消</button>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import request from '@/api/request.js';  // 引入请求函数
const logout = async () => {
  uni.removeStorageSync('userInfo');
  // 显示退出成功的提示
  uni.showToast({
    title: '退出成功',
    icon: 'success'
  });
  // 跳转到登录页面
  uni.reLaunch({
    url: '/pages/index/index' // 登录页面路径根据实际项目调整
  });
}
const goMyPublish = () => {
  uni.navigateTo({
    url: '/pages/publish/publish'  // 请确保路径与你项目中实际页面路径一致
  });
}
const goMyCollect=()=>{
  uni.navigateTo({
    url: '/pages/collect/collect'  // 请确保路径与你项目中实际页面路径一致
  });
}
// 获取缓存中的用户信息
const userInfo = ref(uni.getStorageSync('userInfo') || {
  avatar: "/static/logo.png",
  userName: "微信用户",
  phoneNumber: null,
  userGender: 0,
  openId: "u001"
});

const showModal = ref(false);  // 控制弹窗显示
const chooseAvatar = () => {
  uni.chooseImage({
    count: 1,  // 只选择一个图片
    success: (res) => {
      // 获取用户选择的头像
      const avatar = res.tempFilePaths[0];
      userInfo.value.avatar = avatar; // 更新头像
    }
  });
};
// 打开设置弹窗
const openSettingModal = () => {
  showModal.value = true;
};
// 关闭设置弹窗
const closeSettingModal = () => {
  showModal.value = false;
};

// 保存用户信息
const saveUserInfo = async () => {
  const updatedUserInfo = { ...userInfo.value };
  // 调用接口更新用户信息
  try {
    console.log("updatedUserInfo----------->", JSON.stringify(updatedUserInfo, null, 2));

    const res = await request({
      url: "/user/updateProfile",
      method: "POST",
      data: updatedUserInfo
    });

    if (res.code === 200) {
      // 保存更新后的用户信息到缓存
      uni.setStorageSync('userInfo', updatedUserInfo);
      uni.showToast({
        title: '更新成功！',
        icon: 'success'
      });
      closeSettingModal();
    } else {
      uni.showToast({
        title: '更新失败',
        icon: 'none'
      });
    }
  } catch (error) {
    console.error('更新用户信息失败', error);
    uni.showToast({
      title: '更新失败',
      icon: 'none'
    });
  }
};
</script>

<style scoped>
.container {
  padding: 20px;
  background-color: #f8f8f8;
}
.gender-select {
  display: flex;
  justify-content: center;
  align-items: center;
}

.gender-group {
  display: flex;
  flex-direction: row;  /* 确保水平排列 */
  gap: 20px;  /* 设置两个选项之间的间距 */
}

.gender-option {
  display: flex;
  align-items: center;
  gap: 5px;
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
.gender-select {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.item-button {
  display: flex;
  align-items: center;
  background-color: white;
  color: #000;
  padding: 1px 17px;
  margin-top: 10px;
  border-radius: 6px;
  text-align: left;
  font-size: 8px;
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

/* 弹窗样式 */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 80%;
  max-width: 400px;
}

.modal-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}

.modal-input {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 14px;
}

.upload-avatar-btn {
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  background-color: #2196F3;
  color: white;
  border-radius: 6px;
  font-size: 16px;
  border: none;
}


.gender-selection button {
  width: 48%;
  padding: 10px;
  background-color: #f0f0f0;
  border-radius: 6px;
  font-size: 16px;
  border: 1px solid #ccc;
}

.gender-selection button.selected {
  background-color: #2196F3;
  color: white;
}

.button-group {
  display: flex;
  justify-content: space-between;
}

.save-btn, .cancel-btn {
  width: 48%;
  padding: 10px;
  border-radius: 6px;
  font-size: 16px;
  border: none;
}

.save-btn {
  background-color: #2196F3;
  color: white;
}

.cancel-btn {
  background-color: #ccc;
  color: white;
}


</style>

