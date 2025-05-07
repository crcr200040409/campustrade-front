"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
const _sfc_main = {
  __name: "messages",
  setup(__props) {
    const goToChatDetail = (openId) => {
      common_vendor.index.__f__("log", "at pages/messages/messages.vue:20", "click---goToChatDetail");
      common_vendor.index.navigateTo({
        url: `/pages/chatdetail/chatdetail?openId=${openId}`,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/messages/messages.vue:24", "跳转失败:", err);
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => goToChatDetail("openId12345")),
        b: common_vendor.p({
          title: "ruichen",
          avatar: "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png",
          note: "您收到一条新的消息",
          time: "2020-02-02 20:20",
          ["badge-position"]: "left",
          ["badge-text"]: "99",
          link: true
        }),
        c: common_vendor.p({
          border: true
        })
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/messages/messages.js.map
