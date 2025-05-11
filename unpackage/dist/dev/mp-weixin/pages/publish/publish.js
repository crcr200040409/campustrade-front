"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "publish",
  setup(__props) {
    const myCommodities = common_vendor.ref([]);
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || {});
    const loadMyPublished = async () => {
      try {
        const res = await api_request.request({
          url: "/commodity/listCommodity",
          method: "POST",
          data: {
            pageSize: 50,
            pageIndex: 1
          }
        });
        if (res.code === 200 && Array.isArray(res.data)) {
          myCommodities.value = res.data.filter((item) => item.openId === userInfo.value.openId);
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/publish/publish.vue:45", "加载我的发布失败", err);
      }
    };
    const formatTime = (timeStr) => {
      const date = new Date(timeStr);
      return date.toLocaleDateString() + " " + date.toLocaleTimeString().slice(0, 5);
    };
    common_vendor.onMounted(() => {
      loadMyPublished();
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: myCommodities.value.length === 0
      }, myCommodities.value.length === 0 ? {} : {
        b: common_vendor.f(myCommodities.value, (item, k0, i0) => {
          return {
            a: item.commodityPhoto,
            b: common_vendor.t(item.commodityName),
            c: common_vendor.t(item.commodityDescription),
            d: common_vendor.t(item.commodityPrice.toFixed(2)),
            e: common_vendor.t(formatTime(item.commodityPublishTime)),
            f: item.commodityId
          };
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-bfce3555"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/publish/publish.js.map
