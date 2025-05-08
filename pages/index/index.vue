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

<script>
export default {
  data() {
    return {};
  },
  methods: {
    // 微信登录方法
    // 微信登录方法
    async wechatLogin() {
      try {
        // 调用微信登录接口，获取用户的登录凭证 code
        const res = await uni.login({
          provider: 'weixin',
        });
    
        if (res.code) {
          // 获取用户的授权信息
          const userProfile = await uni.getUserProfile({
            desc: '获取你的公开信息', // 描述用户授权目的
          });
    
          // 如果用户同意授权
          if (userProfile.userInfo) {
            console.log('微信登录成功，userInfo:', userProfile.userInfo);
    
            // 使用获取到的 code 和用户信息，进行后端处理
            const backendRes = await uni.request({
              url: 'https://your-backend-url.com/api/login',  // 替换为您的后端 API 地址
              method: 'POST',
              data: {
                code: res.code,  // 将 code 传递给服务器
                userInfo: userProfile.userInfo,  // 传递用户信息
              },
              success: (response) => {
                if (response.data && response.data.openid) {
                  // 登录成功，获取到 openid 和 session_key
                  console.log('用户 openid:', response.data.openid);
                  uni.showToast({
                    title: '登录成功',
                    icon: 'success',
                  });
    
               uni.switchTab({
                 url: '/pages/home/home'
               });

                } else {
                  uni.showToast({
                    title: response.data.errmsg || '登录失败',
                    icon: 'none',
                  });
                }
              },
              fail: (error) => {
                console.error('请求失败', error);
                uni.showToast({
                  title: '登录请求失败，请重试',
                  icon: 'none',
                });
              },
            });
          } else {
            uni.showToast({
              title: '用户未授权',
              icon: 'none',
            });
          }
        } else {
          uni.showToast({
            title: '微信登录失败',
            icon: 'none',
          });
        }
      } catch (err) {
        console.error('微信登录失败', err);
        uni.showToast({
          title: '微信登录失败',
          icon: 'none',
        });
      }
    },

    // 游客登录方法
    guestLogin() {
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
    },
  },
};
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
