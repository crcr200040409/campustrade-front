"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
const _sfc_main = {
  __name: "sell",
  setup(__props) {
    const form = common_vendor.ref({
      title: "",
      description: "",
      categoryId: 1,
      Price: ""
    });
    const handleCategoryChange = (categoryId) => {
      common_vendor.index.__f__("log", "at pages/sell/sell.vue:79", "选中了分类ID:", categoryId);
      form.value.categoryId = categoryId;
      common_vendor.index.__f__("log", "at pages/sell/sell.vue:81", "当前form.categoryId:", form.value.categoryId);
    };
    const images = common_vendor.ref([]);
    const categories = common_vendor.ref([
      { id: 1, name: "数码电子", description: "电子产品" },
      { id: 2, name: "图书教材", description: "书籍" },
      { id: 3, name: "家居生活", description: "家居用品" },
      { id: 4, name: "运动户外", description: "运动器材" }
    ]);
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 只选择一张图片
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          images.value = [res.tempFilePaths[0]];
        }
      });
    };
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const submitForm = async () => {
      var _a;
      if (!form.value.title) {
        common_vendor.index.showToast({ title: "请填写商品名称", icon: "none" });
        return;
      }
      if (images.value.length === 0) {
        common_vendor.index.showToast({ title: "请上传商品图片", icon: "none" });
        return;
      }
      if (!form.value.Price) {
        common_vendor.index.showToast({ title: "请输入商品价格", icon: "none" });
        return;
      }
      if (!form.value.categoryId) {
        common_vendor.index.showToast({ title: "请选择商品分类", icon: "none" });
        return;
      }
      const openId = (_a = common_vendor.index.getStorageSync("userInfo")) == null ? void 0 : _a.openId;
      if (!openId) {
        common_vendor.index.showToast({ title: "未找到用户信息，请先登录", icon: "none" });
        return;
      }
      const commodityData = {
        commodityName: form.value.title,
        commodityPhoto: images.value[0],
        // 使用上传的第一张图片
        commodityDescription: form.value.description,
        labelId: form.value.categoryId,
        // 使用单一的分类ID
        commodityPrice: parseFloat(form.value.Price),
        openId
      };
      try {
        const res = await api_request.request({
          url: "/commodity/addCommodity",
          method: "POST",
          data: commodityData
        });
        if (res.code === 200) {
          common_vendor.index.showToast({
            title: "发布成功",
            icon: "success"
          });
        } else {
          common_vendor.index.showToast({
            title: "发布失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/sell/sell.vue:165", "发布商品失败", error);
        common_vendor.index.showToast({
          title: "发布失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(images.value, (img, index, i0) => {
          return {
            a: img,
            b: common_vendor.o(($event) => removeImage(index), index),
            c: index
          };
        }),
        b: images.value.length < 1
      }, images.value.length < 1 ? {
        c: common_vendor.o(chooseImage)
      } : {}, {
        d: form.value.title,
        e: common_vendor.o(($event) => form.value.title = $event.detail.value),
        f: form.value.description,
        g: common_vendor.o(($event) => form.value.description = $event.detail.value),
        h: common_vendor.f(categories.value, (category, index, i0) => {
          return {
            a: category.id,
            b: form.value.categoryId === category.id,
            c: common_vendor.o(($event) => handleCategoryChange(category.id), index),
            d: common_vendor.t(category.name),
            e: index
          };
        }),
        i: form.value.Price,
        j: common_vendor.o(($event) => form.value.Price = $event.detail.value),
        k: common_vendor.o(submitForm)
      });
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/sell/sell.js.map
