"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "sell",
  setup(__props) {
    const form = common_vendor.ref({
      title: "",
      description: "",
      categories: [],
      Price: "",
      contact: ""
    });
    const images = common_vendor.ref([]);
    const categories = common_vendor.ref(["数码电子", "服饰鞋包", "图书教材", "家居生活", "美妆个护", "运动户外", "其他"]);
    const chooseImage = () => {
      common_vendor.index.chooseImage({
        count: 9 - images.value.length,
        sizeType: ["compressed"],
        sourceType: ["album", "camera"],
        success: (res) => {
          images.value = images.value.concat(res.tempFilePaths);
        }
      });
    };
    const handleCategoryChange = (e, category) => {
      const checked = e.detail.value;
      if (checked) {
        if (!form.value.categories.includes(category)) {
          form.value.categories.push(category);
        }
      } else {
        form.value.categories = form.value.categories.filter((c) => c !== category);
      }
    };
    const removeImage = (index) => {
      images.value.splice(index, 1);
    };
    const submitForm = () => {
      if (!form.value.title) {
        common_vendor.index.showToast({ title: "请填写商品名称", icon: "none" });
        return;
      }
      if (images.value.length === 0) {
        common_vendor.index.showToast({ title: "请上传商品图片", icon: "none" });
        return;
      }
      common_vendor.index.showLoading({ title: "发布中..." });
      setTimeout(() => {
        common_vendor.index.hideLoading();
        common_vendor.index.showToast({ title: "发布成功" });
        setTimeout(() => {
          common_vendor.index.navigateBack();
        }, 1500);
      }, 2e3);
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
        b: images.value.length < 9
      }, images.value.length < 9 ? {
        c: common_vendor.o(chooseImage)
      } : {}, {
        d: form.value.title,
        e: common_vendor.o(($event) => form.value.title = $event.detail.value),
        f: form.value.description,
        g: common_vendor.o(($event) => form.value.description = $event.detail.value),
        h: common_vendor.f(categories.value, (category, index, i0) => {
          return {
            a: common_vendor.t(category),
            b: category,
            c: form.value.categories.includes(category),
            d: common_vendor.o(($event) => handleCategoryChange($event, category), index),
            e: "category-" + index,
            f: index
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
