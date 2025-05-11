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
        async success(res) {
          if (res.code) {
            common_vendor.index.__f__("log", "at pages/test/test.vue:39", "code          " + res.code);
            common_vendor.wx$1.request({
              url: "https://example.com/onLogin",
              data: {
                code: res.code
              }
            });
            const sessionId2 = await api_request.request({
              url: `/user/sessionId/${res.code}`,
              // 把code拼接到路径中
              method: "GET"
            });
            if (sessionId2) {
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
                      sessionId: sessionId2
                    }
                  });
                  if (loginRes.code) {
                    common_vendor.index.__f__("error", "at pages/test/test.vue:67", "ans---------------");
                    common_vendor.index.__f__("log", "at pages/test/test.vue:68", loginRes);
                  }
                }
              });
            }
          } else {
            common_vendor.index.__f__("log", "at pages/test/test.vue:74", "登录失败！" + res.errMsg);
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
