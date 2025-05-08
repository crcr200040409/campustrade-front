"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "productReview",
  setup(__props) {
    const pendingProducts = common_vendor.ref([
      {
        commodityId: 111,
        commodityName: "城成",
        commodityPhoto: "https://loremflickr.com/400/400?lock=2258253218856786",
        commodityDescription: "道算百族领头听很性由。省门前始。",
        commodityPrice: 50.99,
        commodityStatus: 0,
        commodityPublishTime: "2025-05-07T00:39:15",
        commodityModifyTime: "2025-05-07T00:47:21"
      },
      {
        commodityId: 112,
        commodityName: "瑞德",
        commodityPhoto: "https://loremflickr.com/400/400?lock=2258253218856787",
        commodityDescription: "优雅的设计，经典的风格，适合任何场合。",
        commodityPrice: 120.5,
        commodityStatus: 0,
        commodityPublishTime: "2025-05-06T14:15:00",
        commodityModifyTime: "2025-05-06T14:20:00"
      }
    ]);
    const showModal = common_vendor.ref(false);
    const currentProduct = common_vendor.ref({});
    const fetchPendingProducts = async () => {
      const { data } = await common_vendor.index.request({ url: "/api/admin/products/pending" });
      pendingProducts.value = data;
    };
    const openReviewModal = (product) => {
      currentProduct.value = product;
      showModal.value = true;
    };
    const closeModal = () => {
      showModal.value = false;
    };
    const approveProduct = async (id) => {
      await common_vendor.index.request({ url: `/api/admin/products/${id}/approve`, method: "POST" });
      fetchPendingProducts();
      closeModal();
    };
    const rejectProduct = async (id) => {
      await common_vendor.index.request({ url: `/api/admin/products/${id}/reject`, method: "POST" });
      fetchPendingProducts();
      closeModal();
    };
    common_vendor.onMounted(fetchPendingProducts);
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(pendingProducts.value, (product, k0, i0) => {
          return {
            a: product.commodityPhoto,
            b: common_vendor.t(product.commodityName),
            c: common_vendor.t(product.commodityPrice),
            d: common_vendor.o(($event) => openReviewModal(product), product.commodityId),
            e: product.commodityId
          };
        }),
        b: showModal.value
      }, showModal.value ? {
        c: common_vendor.t(currentProduct.value.commodityName),
        d: currentProduct.value.commodityPhoto,
        e: common_vendor.t(currentProduct.value.commodityDescription),
        f: common_vendor.t(currentProduct.value.commodityPrice),
        g: common_vendor.t(currentProduct.value.commodityPublishTime),
        h: common_vendor.t(currentProduct.value.commodityModifyTime),
        i: common_vendor.o(($event) => approveProduct(currentProduct.value.commodityId)),
        j: common_vendor.o(($event) => rejectProduct(currentProduct.value.commodityId)),
        k: common_vendor.o(closeModal)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-80209502"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productReview/productReview.js.map
