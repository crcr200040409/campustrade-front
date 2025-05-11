"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
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
    const searchValue = common_vendor.ref("");
    const productList = common_vendor.ref([]);
    const searchPerformed = common_vendor.ref(false);
    const userStore = stores_user.useUserStore();
    const recentSearches = common_vendor.ref(userStore.getRecentSearches);
    const priceMin = common_vendor.ref(0);
    const priceMax = common_vendor.ref(1e5);
    const priceSort = common_vendor.ref(true);
    const dateSort = common_vendor.ref(false);
    const handleSearch = async () => {
      if (!searchValue.value.trim())
        return;
      common_vendor.index.setStorageSync("searchValue", searchValue.value);
      userStore.addSearchRecord(searchValue.value);
      recentSearches.value = userStore.getRecentSearches;
      const payload = {
        labelId: null,
        commodityPriceMin: priceMin.value,
        commodityPriceMax: priceMax.value,
        commodityKeyWord: searchValue.value,
        priceSort: priceSort.value,
        dateSort: dateSort.value,
        commodityStatus: 1,
        pageDTO: {
          pageSize: 10,
          pageIndex: 1
        }
      };
      try {
        const res = await api_request.request({
          url: "/commodity/listCommodityByDTO",
          method: "POST",
          data: payload
        });
        if (res.code === 200) {
          productList.value = res.data || [];
          searchPerformed.value = true;
        } else {
          common_vendor.index.showToast({ title: "搜索失败", icon: "none" });
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/search/search.vue:133", "搜索失败", err);
        common_vendor.index.showToast({ title: "请求错误", icon: "none" });
      }
    };
    const viewProductDetail = (id) => {
      common_vendor.index.navigateTo({
        url: `/pages/productDetail/productDetail?commodityId=${id}`
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
    const input = (res) => searchValue.value = res.value;
    const cancel = () => searchValue.value = "";
    const blur = () => {
    };
    const focus = () => {
    };
    const clear = () => searchValue.value = "";
    common_vendor.onMounted(() => {
      const storedSearchValue = common_vendor.index.getStorageSync("searchValue");
      if (storedSearchValue) {
        searchValue.value = storedSearchValue;
      }
    });
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
        i: priceMin.value,
        j: common_vendor.o(common_vendor.m(($event) => priceMin.value = $event.detail.value, {
          number: true
        })),
        k: priceMax.value,
        l: common_vendor.o(common_vendor.m(($event) => priceMax.value = $event.detail.value, {
          number: true
        })),
        m: common_vendor.o((e) => priceSort.value = e.detail.value),
        n: priceSort.value,
        o: common_vendor.t(priceSort.value ? "升序" : "降序"),
        p: common_vendor.o((e) => dateSort.value = e.detail.value),
        q: dateSort.value,
        r: common_vendor.t(dateSort.value ? "升序" : "降序"),
        s: recentSearches.value.length > 0
      }, recentSearches.value.length > 0 ? {
        t: common_vendor.o(clearHistory),
        v: common_vendor.f(recentSearches.value, (item, index, i0) => {
          return {
            a: common_vendor.t(item),
            b: index,
            c: common_vendor.o(($event) => handleTagClick(item), index),
            d: common_vendor.o(($event) => removeSearchItem(index), index)
          };
        })
      } : {}, {
        w: productList.value.length
      }, productList.value.length ? {
        x: common_vendor.f(productList.value, (item, index, i0) => {
          return {
            a: item.commodityPhoto || "/images/default.jpg",
            b: common_vendor.t(item.commodityName),
            c: common_vendor.t(item.commodityDescription),
            d: common_vendor.t(item.commodityPrice.toFixed(2)),
            e: item.commodityId,
            f: common_vendor.o(($event) => viewProductDetail(item.commodityId), item.commodityId)
          };
        })
      } : searchPerformed.value ? {} : {}, {
        y: searchPerformed.value
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-c10c040c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/search/search.js.map
