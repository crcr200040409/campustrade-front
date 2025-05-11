"use strict";
Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
const common_vendor = require("./common/vendor.js");
if (!Math) {
  "./pages/index/index.js";
  "./pages/test/test.js";
  "./pages/productReview/productReview.js";
  "./pages/categoryManage/categoryManage.js";
  "./pages/home/home.js";
  "./pages/sell/sell.js";
  "./pages/messages/messages.js";
  "./pages/profile/profile.js";
  "./pages/search/search.js";
  "./pages/collect/collect.js";
  "./pages/publish/publish.js";
  "./pages/mysale/mysale.js";
  "./pages/chatdetail/chatdetail.js";
  "./pages/userManage/userManage.js";
  "./pages/productDetail/productDetail.js";
}
const _sfc_main = {
  onLaunch: function() {
    common_vendor.index.__f__("log", "at App.vue:13", "App Launch");
  },
  onShow: function() {
    common_vendor.index.__f__("log", "at App.vue:16", "App Show");
  },
  onHide: function() {
    common_vendor.index.__f__("log", "at App.vue:19", "App Hide");
  }
};
if (!Array) {
  const _component_custom_tabbar = common_vendor.resolveComponent("custom-tabbar");
  _component_custom_tabbar();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: _ctx.showTabBar
  }, _ctx.showTabBar ? {} : {});
}
const App = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render]]);
function createApp() {
  const app = common_vendor.createSSRApp(App);
  app.use(common_vendor.createPinia());
  return {
    app,
    Pinia: common_vendor.Pinia
    // 此处必须将 Pinia 返回
  };
}
createApp().app.mount("#app");
exports.createApp = createApp;
//# sourceMappingURL=../.sourcemap/mp-weixin/app.js.map
