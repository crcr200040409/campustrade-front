"use strict";
const common_vendor = require("../../common/vendor.js");
const stores_user = require("../../stores/user.js");
if (!Array) {
  const _easycom_uni_search_bar2 = common_vendor.resolveComponent("uni-search-bar");
  _easycom_uni_search_bar2();
}
const _easycom_uni_search_bar = () => "../../uni_modules/uni-search-bar/components/uni-search-bar/uni-search-bar.js";
if (!Math) {
  _easycom_uni_search_bar();
}
const _sfc_main = {
  __name: "search",
  setup(__props) {
    const userStore = stores_user.useUserStore();
    const searchValue = common_vendor.ref("");
    const recentSearches = common_vendor.ref(userStore.getRecentSearches);
    const handleSearch = () => {
      if (!searchValue.value.trim())
        return;
      userStore.addSearchRecord(searchValue.value);
      recentSearches.value = userStore.getRecentSearches;
      common_vendor.index.showToast({
        title: "搜索：" + searchValue.value,
        icon: "none"
      });
    };
    const handleTagClick = (value) => {
      searchValue.value = value;
      handleSearch();
    };
    const removeSearchItem = (index) => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定删除该搜索记录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.removeSearchRecord(index);
            recentSearches.value = userStore.getRecentSearches;
          }
        }
      });
    };
    const clearHistory = () => {
      common_vendor.index.showModal({
        title: "提示",
        content: "确定清空所有搜索记录吗？",
        success: (res) => {
          if (res.confirm) {
            userStore.clearSearchHistory();
            recentSearches.value = [];
          }
        }
      });
    };
    const input = (res) => {
      searchValue.value = res.value;
    };
    const cancel = () => {
      searchValue.value = "";
    };
    const blur = () => {
    };
    const focus = () => {
    };
    const clear = () => {
      searchValue.value = "";
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(handleSearch),
        b: common_vendor.o(blur),
        c: common_vendor.o(focus),
        d: common_vendor.o(input),
        e: common_vendor.o(cancel),
        f: common_vendor.o(clear),
        g: common_vendor.o(($event) => searchValue.value = $event),
        h: common_vendor.p({
          focus: true,
          modelValue: searchValue.value
        }),
        i: common_vendor.t(searchValue.value),
        j: recentSearches.value.length > 0
      }, recentSearches.value.length > 0 ? {
        k: common_vendor.o(clearHistory),
        l: common_vendor.f(recentSearches.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => handleTagClick(item), index),
            d: common_vendor.o(($event) => removeSearchItem(index), index)
          };
        })
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
