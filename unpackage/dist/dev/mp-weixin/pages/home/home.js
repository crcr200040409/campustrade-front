"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uni_notice_bar2 = common_vendor.resolveComponent("uni-notice-bar");
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  (_easycom_uni_notice_bar2 + _easycom_uni_search_bar2)();
}
const _easycom_uni_notice_bar = () => "../../uni_modules/uni-notice-bar/components/uni-notice-bar/uni-notice-bar.js";
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  (_easycom_uni_notice_bar + _easycom_uni_search_bar)();
}
const _sfc_main = {
  __name: "home",
  setup(__props) {
    const searchValue = common_vendor.ref("");
    const search = () => {
      common_vendor.index.showToast({
        title: "搜索：" + searchValue.value,
        icon: "none"
      });
      common_vendor.index.navigateTo({
        url: "/pages/search/search"
      });
    };
    const input = (res) => {
      searchValue.value = res.value;
    };
    const cancel = () => {
      searchValue.value = "";
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
          ["show-icon"]: true,
          scrollable: true,
          text: "5月1号-5月5号放假要调休"
        }),
        b: common_vendor.o(search),
        c: common_vendor.o(_ctx.blur),
        d: common_vendor.o(_ctx.focus),
        e: common_vendor.o(input),
        f: common_vendor.o(cancel),
        g: common_vendor.o(_ctx.clear),
        h: common_vendor.o(($event) => searchValue.value = $event),
        i: common_vendor.p({
          focus: true,
          modelValue: searchValue.value
        }),
        j: common_vendor.o(($event) => _ctx.findLike()),
        k: common_vendor.o(($event) => _ctx.findNewpush()),
        l: common_vendor.o(($event) => _ctx.changeTab(2)),
        m: common_vendor.o(($event) => _ctx.changeTab(3))
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
