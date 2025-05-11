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
              if(loginRes.code) {
                console.error("ans---------------")
                console.log(loginRes);
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
