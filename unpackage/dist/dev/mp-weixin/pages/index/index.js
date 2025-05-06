"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const _sfc_main = {
  data() {
    return {};
  },
  methods: {
    // 微信登录方法
    // 微信登录方法
    async wechatLogin() {
      try {
        const res = await common_vendor.index.login({
          provider: "weixin"
        });
        if (res.code) {
          const userProfile = await common_vendor.index.getUserProfile({
            desc: "获取你的公开信息"
            // 描述用户授权目的
          });
          if (userProfile.userInfo) {
            common_vendor.index.__f__("log", "at pages/index/index.vue:35", "微信登录成功，userInfo:", userProfile.userInfo);
            const backendRes = await common_vendor.index.request({
              url: "https://your-backend-url.com/api/login",
              // 替换为您的后端 API 地址
              method: "POST",
              data: {
                code: res.code,
                // 将 code 传递给服务器
                userInfo: userProfile.userInfo
                // 传递用户信息
              },
              success: (response) => {
                if (response.data && response.data.openid) {
                  common_vendor.index.__f__("log", "at pages/index/index.vue:48", "用户 openid:", response.data.openid);
                  common_vendor.index.showToast({
                    title: "登录成功",
                    icon: "success"
                  });
                  common_vendor.index.switchTab({
                    url: "/pages/home/home"
                  });
                } else {
                  common_vendor.index.showToast({
                    title: response.data.errmsg || "登录失败",
                    icon: "none"
                  });
                }
              },
              fail: (error) => {
                common_vendor.index.__f__("error", "at pages/index/index.vue:66", "请求失败", error);
                common_vendor.index.showToast({
                  title: "登录请求失败，请重试",
                  icon: "none"
                });
              }
            });
          } else {
            common_vendor.index.showToast({
              title: "用户未授权",
              icon: "none"
            });
          }
        } else {
          common_vendor.index.showToast({
            title: "微信登录失败",
            icon: "none"
          });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/index/index.vue:86", "微信登录失败", err);
        common_vendor.index.showToast({
          title: "微信登录失败",
          icon: "none"
        });
      }
    },
    // 游客登录方法
    guestLogin() {
      common_vendor.index.__f__("log", "at pages/index/index.vue:97", "游客登录成功");
      common_vendor.index.showToast({
        title: "游客登录成功",
        icon: "success"
      });
      common_vendor.index.switchTab({
        url: "/pages/home/home"
      });
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_assets._imports_0,
    b: common_vendor.o((...args) => $options.wechatLogin && $options.wechatLogin(...args)),
    c: common_vendor.o((...args) => $options.guestLogin && $options.guestLogin(...args))
  };
}
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-1cf27b2a"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/index/index.js.map
