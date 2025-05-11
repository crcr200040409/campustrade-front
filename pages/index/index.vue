<template>
  <view class="login-container">
    <image class="logo" src="/static/logo.png" alt="吉刻转 Logo"></image>
    <view class="text-area">
      <text class="title">吉刻转</text>
    </view>
    <button class="wechat-login-button" @click="wechatLogin">使用微信登录</button>
    <button class="guest-login-button" @click="guestLogin">游客登录</button>
  </view>

</template>

<script setup>
import request from "@/api/request.js";
const wechatLogin = () => {
  wx.login({
    async success(res) {
      if (res.code) {
        console.log("code          "+res.code);
        //发起网络请求
        wx.request({
          url: 'https://example.com/onLogin',
          data: {
            code: res.code
          }
        })
        const sessionId = await request({
          url: `/user/sessionId/${res.code}`, // 把code拼接到路径中
          method: "GET"
        });
        if(sessionId){
          // 微信授权
          
          wx.getUserInfo({
            success: async function (res) {
              const encryptedData=res.encryptedData
              const iv=res.iv
              const loginRes = await request({
                url: "/user/login",
                method: "POST",
                data: {
                  encryptedData,
                  iv,
                  sessionId
                }
              });
              if(loginRes.code==200) {
                uni.showToast({
                  title: '登录成功',
                  icon: 'success'
                });
                const userData = loginRes.data;
                //console.log(userData)
                uni.setStorageSync('userInfo', userData);
                uni.switchTab({
                  url: "/pages/home/home"
                });
                console.log(loginRes);
              }else{
                uni.showToast({
                  title: '登录失败',
                  icon: 'error'
                });
              }
            }
          })
        }
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
};

const guestLogin=()=> {
  // 游客登录逻辑
  console.log('游客登录成功');
  uni.showToast({
    title: '游客登录成功',
    icon: 'success',
  });
  // 使用 switchTab 跳转到首页
  uni.switchTab({
    url: '/pages/home/home'
  });
}
</script>

<style scoped>
.login-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin-bottom: 40rpx;
}

.text-area {
  margin-bottom: 30rpx;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}

.wechat-login-button,
.guest-login-button {
  width: 100%;
  padding: 14rpx;
  border-radius: 6rpx;
  font-size: 16px;
  margin-top: 20rpx;
}

.wechat-login-button {
  background-color: #1d9bf0;
  color: white;
}

.guest-login-button {
  background-color: #f0f0f0;
  color: #1d9bf0;
  border: 1px solid #1d9bf0;
}
</style>
