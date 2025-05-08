<template>
  <view>
    <button @click="testApi1">Test API</button>
    <text>{{ response }}</text>
  </view>
  <view>
    <button @click="testApi">测试获取 code</button>
    <text>获取的 code：{{ code }}</text>
    <text>获取的 sessionId：{{ sessionId }}</text>
  </view>
</template>

<script setup>
import { ref } from 'vue';
import request from '../../api/request'; // 引入封装的请求函数

// 响应数据
const response = ref('');
const code = ref('');
const sessionId = ref('');
const testApi1 = ()=>{
  request({
    url: '/user/test', // 后端接口地址
    method: 'GET',
  }).then((data) => {
      // 请求成功后更新响应数据
      response.value = data;
    })
    .catch((error) => {
      // 处理请求错误
      response.value = '请求失败：' + error;
    });
}
// 测试API函数
const testApi = () => {
  wx.login({
    success: async (res) => {
      const userCode = res.code;  // 获取 code
      if (userCode) {
        // 显示code
        code.value = userCode;

        // 发起请求
        const response = await request({
          url: '/weixin/sessionId/' + userCode
        });

        if (response.statusCode === 200) {
          // 获取返回的 sessionId
          sessionId.value = response.data.data;
          wx.showToast({
            title: '请求成功！',
            icon: 'success',
          });
        } else {
          wx.showToast({
            title: '请求失败！',
            icon: 'error',
          });
        }
      } else {
        console.log("获取用户登录状态失败!" + res.errMsg);
      }
    }
  });
  // 使用封装的请求函数发送请求
  // request({
  //   url: '/user/test', // 后端接口地址
  //   method: 'GET',
  // }).then((data) => {
  //     // 请求成功后更新响应数据
  //     response.value = data;
  //   })
  //   .catch((error) => {
  //     // 处理请求错误
  //     response.value = '请求失败：' + error;
  //   });
};



</script>

<style scoped>
/* 样式部分，根据需要自行调整 */
button {
  margin: 20px;
  padding: 10px;
  background-color: #007AFF;
  color: white;
  border-radius: 5px;
  font-size: 16px;
}

text {
  display: block;
  margin-top: 20px;
  font-size: 16px;
  color: #333;
}
</style>
