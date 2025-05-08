"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "userManage",
  setup(__props) {
    const userList = common_vendor.ref([]);
    const searchQuery = common_vendor.ref("");
    const filteredUserList = common_vendor.ref([]);
    const mockUserData = [
      { id: 1, open_id: "openid_123", user_name: "Alice", isBlocked: false },
      { id: 2, open_id: "openid_456", user_name: "Bob", isBlocked: true },
      { id: 3, open_id: "openid_789", user_name: "Charlie", isBlocked: false },
      { id: 4, open_id: "openid_101", user_name: "David", isBlocked: true },
      { id: 5, open_id: "openid_102", user_name: "Eve", isBlocked: false },
      { id: 6, open_id: "openid_103", user_name: "Frank", isBlocked: false }
    ];
    const fetchUsers = async () => {
      userList.value = mockUserData;
      filteredUserList.value = mockUserData;
    };
    const toggleBlock = async (user) => {
      await common_vendor.index.request({
        url: `/api/admin/users/${user.id}/block`,
        method: "POST",
        data: { block: !user.isBlocked }
      });
      fetchUsers();
    };
    const filterUsers = () => {
      filteredUserList.value = userList.value.filter((user) => {
        return user.open_id.includes(searchQuery.value) || user.user_name.includes(searchQuery.value);
      });
    };
    common_vendor.onMounted(fetchUsers);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o([($event) => searchQuery.value = $event.detail.value, filterUsers]),
        b: searchQuery.value,
        c: common_vendor.f(filteredUserList.value, (user, k0, i0) => {
          return {
            a: common_vendor.t(user.open_id),
            b: common_vendor.t(user.user_name),
            c: common_vendor.t(user.isBlocked ? "解除拉黑" : "拉黑用户"),
            d: common_vendor.o(($event) => toggleBlock(user), user.id),
            e: user.id
          };
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-603ef4d8"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/userManage/userManage.js.map
