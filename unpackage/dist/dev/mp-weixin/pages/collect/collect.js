"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "collect",
  setup(__props) {
    const collectList = common_vendor.ref([]);
    const loadCollectList = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo || !userInfo.openId)
        return;
      try {
        const res = await api_request.request({
          url: `/user/listCollectionCommodity?openId=${userInfo.openId}`,
          method: "POST"
        });
        common_vendor.index.__f__("log", "at pages/collect/collect.vue:42", "获取用户收藏的商品----------->", JSON.stringify(res, null, 2));
        if (res.code === 200 && Array.isArray(res.data)) {
          const commodityDetails = await Promise.all(res.data.map((item) => getCommodityDetail(item.commodityId)));
          collectList.value = commodityDetails;
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/collect/collect.vue:49", "加载收藏商品失败", err);
      }
    };
    const getCommodityDetail = async (commodityId) => {
      try {
        const res = await api_request.request({
          url: "/commodity/getCommodityDetail",
          method: "POST",
          data: commodityId
        });
        common_vendor.index.__f__("log", "at pages/collect/collect.vue:61", "获取商品详情----------->", JSON.stringify(res, null, 2));
        if (res.code === 200 && res.data) {
          return res.data;
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/collect/collect.vue:66", "获取商品详情失败", err);
      }
    };
    const viewProductDetail = (commodityId) => {
      common_vendor.index.navigateTo({
        url: `/pages/productDetail/productDetail?commodityId=${commodityId}`
      });
    };
    common_vendor.onMounted(() => {
      loadCollectList();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: collectList.value.length === 0
      }, collectList.value.length === 0 ? {} : {
        b: common_vendor.f(collectList.value, (item, k0, i0) => {
          return {
            a: item.commodityPhoto,
            b: common_vendor.t(item.commodityName),
            c: common_vendor.t(item.commodityDescription),
            d: common_vendor.t(item.commodityPrice.toFixed(2)),
            e: item.commodityId,
            f: common_vendor.o(($event) => viewProductDetail(item.commodityId), item.commodityId)
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-b24c290b"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/collect/collect.js.map
