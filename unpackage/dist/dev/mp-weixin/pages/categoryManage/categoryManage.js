"use strict";
const common_vendor = require("../../common/vendor.js");
const itemsPerPage = 8;
const _sfc_main = {
  __name: "categoryManage",
  setup(__props) {
    const categories = common_vendor.ref([
      { id: 1, name: "电子产品", editing: false, editName: "电子产品" },
      { id: 2, name: "家居用品", editing: false, editName: "家居用品" },
      { id: 3, name: "书籍", editing: false, editName: "书籍" },
      { id: 4, name: "运动装备", editing: false, editName: "运动装备" },
      { id: 5, name: "玩具", editing: false, editName: "玩具" },
      { id: 6, name: "衣物", editing: false, editName: "衣物" },
      { id: 7, name: "厨房用品", editing: false, editName: "厨房用品" },
      { id: 8, name: "美妆", editing: false, editName: "美妆" },
      { id: 9, name: "食品", editing: false, editName: "食品" },
      { id: 10, name: "汽车配件", editing: false, editName: "汽车配件" },
      { id: 11, name: "园艺工具", editing: false, editName: "园艺工具" },
      { id: 12, name: "办公用品", editing: false, editName: "办公用品" },
      { id: 13, name: "宠物用品", editing: false, editName: "宠物用品" },
      { id: 14, name: "文具", editing: false, editName: "文具" },
      { id: 15, name: "健康产品", editing: false, editName: "健康产品" }
    ]);
    const newCategory = common_vendor.ref("");
    const showAddModal = common_vendor.ref(false);
    const currentPage = common_vendor.ref(1);
    const totalPages = common_vendor.ref(Math.ceil(categories.value.length / itemsPerPage));
    const currentPageCategories = common_vendor.computed(() => {
      const startIndex = (currentPage.value - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return categories.value.slice(startIndex, endIndex);
    });
    const addCategory = () => {
      if (newCategory.value) {
        const newCategoryData = {
          id: categories.value.length + 1,
          name: newCategory.value,
          editing: false,
          editName: newCategory.value
        };
        categories.value.push(newCategoryData);
        newCategory.value = "";
        showAddModal.value = false;
        totalPages.value = Math.ceil(categories.value.length / itemsPerPage);
      }
    };
    const toggleEdit = (category) => {
      if (category.editing) {
        category.name = category.editName;
      }
      category.editing = !category.editing;
    };
    const deleteCategory = (id) => {
      categories.value = categories.value.filter((category) => category.id !== id);
      totalPages.value = Math.ceil(categories.value.length / itemsPerPage);
    };
    const changePage = (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    };
    common_vendor.onMounted(() => {
      common_vendor.index.__f__("log", "at pages/categoryManage/categoryManage.vue:110", "组件已加载");
    });
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.o(($event) => showAddModal.value = true),
        b: common_vendor.f(currentPageCategories.value, (category, k0, i0) => {
          return common_vendor.e({
            a: category.editing
          }, category.editing ? {
            b: category.editName,
            c: common_vendor.o(($event) => category.editName = $event.detail.value, category.id)
          } : {
            d: common_vendor.t(category.name)
          }, {
            e: common_vendor.t(category.editing ? "保存" : "编辑"),
            f: common_vendor.o(($event) => toggleEdit(category), category.id),
            g: common_vendor.o(($event) => deleteCategory(category.id), category.id),
            h: category.id
          });
        }),
        c: common_vendor.o(($event) => changePage(currentPage.value - 1)),
        d: currentPage.value <= 1,
        e: common_vendor.t(currentPage.value),
        f: common_vendor.t(totalPages.value),
        g: common_vendor.o(($event) => changePage(currentPage.value + 1)),
        h: currentPage.value >= totalPages.value,
        i: showAddModal.value
      }, showAddModal.value ? {
        j: newCategory.value,
        k: common_vendor.o(($event) => newCategory.value = $event.detail.value),
        l: common_vendor.o(addCategory),
        m: common_vendor.o(($event) => showAddModal.value = false)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-a6952639"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/categoryManage/categoryManage.js.map
