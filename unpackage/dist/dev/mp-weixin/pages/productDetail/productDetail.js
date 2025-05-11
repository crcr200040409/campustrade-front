"use strict";
const common_vendor = require("../../common/vendor.js");
const common_assets = require("../../common/assets.js");
const api_request = require("../../api/request.js");
if (!Array) {
  const _easycom_uni_icons2 = common_vendor.resolveComponent("uni-icons");
  _easycom_uni_icons2();
}
const _easycom_uni_icons = () => "../../uni_modules/uni-icons/components/uni-icons/uni-icons.js";
if (!Math) {
  _easycom_uni_icons();
}
const _sfc_main = {
  __name: "productDetail",
  setup(__props) {
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || null);
    const product = common_vendor.ref({
      commodityId: 0,
      commodityPrice: 0,
      commodityPhoto: "",
      commodityName: "",
      commodityDescription: "",
      commodityPublishTime: "",
      openId: ""
    });
    const isCollected = common_vendor.ref(false);
    const formatTime = (timeString) => {
      if (!timeString)
        return "";
      const date = new Date(timeString);
      return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, "0")}-${date.getDate().toString().padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`;
    };
    const fetchProductDetail = async (commodityId) => {
      try {
        const response = await api_request.request({
          url: "/commodity/getCommodityDetail",
          method: "POST",
          data: commodityId
        });
        if (response.code === 200 && response.data) {
          product.value = response.data;
          await checkCollectionStatus(commodityId);
        } else {
          common_vendor.index.showToast({
            title: "获取商品详情失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/productDetail/productDetail.vue:94", "请求商品详情失败", error);
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "none"
        });
      }
    };
    const checkCollectionStatus = async (commodityId) => {
      try {
        const res = await api_request.request({
          url: `/user/listCollectionCommodity?openId=${userInfo.value.openId}`,
          method: "POST"
        });
        common_vendor.index.__f__("log", "at pages/productDetail/productDetail.vue:108", "resInfo----------->", JSON.stringify(res, null, 2));
        if (res.code === 200 && Array.isArray(res.data)) {
          isCollected.value = res.data.find((item) => item.commodityId === Number(commodityId)) !== void 0;
        } else {
          isCollected.value = false;
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/productDetail/productDetail.vue:116", "检查收藏状态失败", error);
      }
    };
    const toggleCollect = async () => {
      isCollected.value = !isCollected.value;
      const url = isCollected.value ? "/user/collectCommodity" : "/user/removeCommodity";
      try {
        const res = await api_request.request({
          url,
          // API接口
          method: "POST",
          data: {
            openId: userInfo.value.openId,
            // 用户ID
            commodityId: [product.value.commodityId]
            // 商品ID数组
          }
        });
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: isCollected.value ? "已收藏" : "已取消收藏",
            icon: "none"
          });
        } else {
          common_vendor.index.showToast({
            title: "操作失败，请稍后再试",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/productDetail/productDetail.vue:145", "操作失败", error);
        common_vendor.index.showToast({
          title: "请求失败",
          icon: "none"
        });
      }
    };
    const contactSeller = () => {
      common_vendor.index.showToast({
        title: "正在联系卖家...",
        icon: "none"
      });
      common_vendor.index.navigateTo({
        url: `/pages/chatdetail/chatdetail?sellerId=${product.value.openId}`
      });
    };
    common_vendor.onMounted(() => {
      const pages = getCurrentPages();
      const currentPage = pages[pages.length - 1];
      const commodityId = currentPage.options.commodityId;
      fetchProductDetail(commodityId);
      checkCollectionStatus(commodityId);
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: product.value.commodityPhoto || "/images/default.jpg",
        b: common_vendor.t(product.value.commodityPrice.toFixed(2)),
        c: common_vendor.t(product.value.commodityName),
        d: common_vendor.t(formatTime(product.value.commodityPublishTime)),
        e: product.value.commodityModifyTime
      }, product.value.commodityModifyTime ? {
        f: common_vendor.t(formatTime(product.value.commodityModifyTime))
      } : {}, {
        g: common_vendor.t(product.value.commodityDescription),
        h: common_assets._imports_0$1,
        i: common_vendor.t(product.value.openId.slice(-4)),
        j: common_vendor.p({
          type: isCollected.value ? "heart-filled" : "heart",
          size: "24",
          color: "#333"
        }),
        k: common_vendor.t(isCollected.value ? "已收藏" : "收藏"),
        l: common_vendor.o(toggleCollect),
        m: common_assets._imports_1,
        n: common_vendor.o(contactSeller)
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-be4f4aac"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/productDetail/productDetail.js.map
