"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "index",
  setup(__props) {
    const wechatLogin = () => {
      common_vendor.wx$1.login({
        async success(res) {
          if (res.code) {
            common_vendor.index.__f__("log", "at pages/index/index.vue:19", "code          " + res.code);
            common_vendor.wx$1.request({
              url: "https://example.com/onLogin",
              data: {
                code: res.code
              }
            });
            const sessionId = await api_request.request({
              url: `/user/sessionId/${res.code}`,
              // 把code拼接到路径中
              method: "GET"
            });
            if (sessionId) {
              common_vendor.wx$1.getUserInfo({
                success: async function(res2) {
                  const encryptedData = res2.encryptedData;
                  const iv = res2.iv;
                  const loginRes = await api_request.request({
                    url: "/user/login",
                    method: "POST",
                    data: {
                      encryptedData,
                      iv,
                      sessionId
                    }
                  });
                  if (loginRes.code == 200) {
                    common_vendor.index.showToast({
                      title: "登录成功",
                      icon: "success"
                    });
                    const userData = loginRes.data;
                    common_vendor.index.setStorageSync("userInfo", userData);
                    common_vendor.index.switchTab({
                      url: "/pages/home/home"
                    });
                    common_vendor.index.__f__("log", "at pages/index/index.vue:58", loginRes);
                  } else {
                    common_vendor.index.showToast({
                      title: "登录失败",
                      icon: "error"
                    });
                  }
                }
              });
            }
          } else {
            common_vendor.index.__f__("log", "at pages/index/index.vue:69", "登录失败！" + res.errMsg);
          }
        }
      });
    };
    const guestLogin = () => {
      common_vendor.index.__f__("log", "at pages/index/index.vue:77", "游客登录成功");
      common_vendor.index.showToast({
        title: "游客登录成功",
        icon: "success"
      });
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.o(wechatLogin),
        c: common_vendor.o(guestLogin)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
