"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "profile",
  setup(__props) {
    getApp();
    const goMyCollect = () => {
      common_vendor.index.__f__("log", "at pages/profile/profile.vue:53", "goMyCollect function called");
      common_vendor.index.navigateTo({
        url: "/pages/collect/collect"
      });
    };
    const contactService = () => {
    };
    return (_ctx, _cache) => {
      return {
        a: common_assets._imports_0,
        b: common_vendor.p({
          type: "plusempty",
          size: "20",
          color: "#000"
        }),
        c: common_vendor.p({
          type: "cart-filled",
          size: "20",
          color: "#000"
        }),
        d: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "#000"
        }),
        e: common_vendor.o(($event) => goMyCollect()),
        f: common_vendor.p({
          type: "phone",
          size: "20",
          color: "#000"
        }),
        g: common_vendor.o(($event) => contactService()),
        h: common_vendor.p({
          type: "mail-open",
          size: "20",
          color: "#000"
        }),
        i: common_vendor.p({
          type: "help",
          size: "20",
          color: "#000"
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
