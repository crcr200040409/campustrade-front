"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
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
    const productList = common_vendor.ref([]);
    const fetchProductList = async () => {
      try {
        const response = await api_request.request({
          url: "/commodity/listCommodity",
          // 请求商品列表接口
          method: "POST",
          data: {
            pageSize: 10,
            pageIndex: 1
          }
        });
        if (response.code === 200 && response.data) {
          productList.value = response.data;
        } else {
          common_vendor.index.showToast({
            title: "获取商品列表失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/home/home.vue:70", "请求商品列表失败", error);
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "none"
        });
      }
    };
    const viewProductDetail = async (commodityId) => {
      common_vendor.index.navigateTo({
        url: `/pages/productDetail/productDetail?commodityId=${commodityId}`
        // 传递 commodityId 参数
      });
    };
    const search = () => {
      common_vendor.index.showToast({
        title: "正在搜索：" + searchValue.value,
        icon: "none"
      });
      common_vendor.index.navigateTo({
        url: `/pages/search/search?keyword=${searchValue.value}`
        // 传递关键词
      });
    };
    const input = (res) => {
      searchValue.value = res.value;
    };
    const cancel = () => {
      searchValue.value = "";
    };
    common_vendor.onMounted(() => {
      fetchProductList();
      const intervalId = setInterval(() => {
        fetchProductList();
      }, 6e4);
      common_vendor.onUnmounted(() => {
        clearInterval(intervalId);
      });
    });
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
        m: common_vendor.o(($event) => _ctx.changeTab(3)),
        n: common_vendor.f(productList.value, (product, index, i0) => {
          return {
            a: product.commodityPhoto || "/images/default.jpg",
            b: common_vendor.t(product.commodityName),
            c: common_vendor.t(product.commodityDescription),
            d: common_vendor.t(product.commodityPrice.toFixed(2)),
            e: index,
            f: common_vendor.o(($event) => viewProductDetail(product.commodityId), index)
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-07e72d3c"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/home/home.js.map
