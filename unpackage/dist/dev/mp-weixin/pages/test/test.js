"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "test",
  setup(__props) {
    const response = common_vendor.ref("");
    const code = common_vendor.ref("");
    const sessionId = common_vendor.ref("");
    const testApi1 = () => {
      api_request.request({
        url: "/user/test",
        // 后端接口地址
        method: "GET"
      }).then((data) => {
        response.value = data;
      }).catch((error) => {
        response.value = "请求失败：" + error;
      });
    };
    const testApi = () => {
      common_vendor.wx$1.login({
        success: async (res) => {
          const userCode = res.code;
          if (userCode) {
            code.value = userCode;
            const response2 = await api_request.request({
              url: "/weixin/sessionId/" + userCode
            });
            if (response2.statusCode === 200) {
              sessionId.value = response2.data.data;
              common_vendor.wx$1.showToast({
                title: "请求成功！",
                icon: "success"
              });
            } else {
              common_vendor.wx$1.showToast({
                title: "请求失败！",
                icon: "error"
              });
            }
          } else {
            common_vendor.index.__f__("log", "at pages/test/test.vue:62", "获取用户登录状态失败!" + res.errMsg);
          }
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(testApi1),
        b: common_vendor.t(response.value),
        c: common_vendor.o(testApi),
        d: common_vendor.t(code.value),
        e: common_vendor.t(sessionId.value)
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-727d09f0"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/test/test.js.map
