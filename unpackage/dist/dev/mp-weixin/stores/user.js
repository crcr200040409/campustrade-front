"use strict";
const common_vendor = require("../common/vendor.js");
const useUserStore = common_vendor.defineStore("user", {
  state: () => ({
    // 用户基本信息
    open_id: "",
    user_type: 0,
    // 0:普通用户, 1:管理员
    phone_number: "",
    user_gender: 2,
    // 0:男, 1:女, 2:未知
    user_name: "",
    avatar: "",
    // 最近搜索记录列表
    recentSearches: [],
    // 最大搜索记录保存数量
    maxSearchHistory: 10
  }),
  actions: {
    // 更新用户基本信息
    updateUserInfo(userInfo) {
      this.open_id = userInfo.open_id || this.open_id;
      this.user_type = userInfo.user_type !== void 0 ? userInfo.user_type : this.user_type;
      this.phone_number = userInfo.phone_number || this.phone_number;
      this.user_gender = userInfo.user_gender !== void 0 ? userInfo.user_gender : this.user_gender;
      this.user_name = userInfo.user_name || this.user_name;
      this.avatar = userInfo.avatar || this.avatar;
    },
    // 清除用户信息
    clearUserInfo() {
      this.open_id = "";
      this.user_type = 0;
      this.phone_number = "";
      this.user_gender = 2;
      this.user_name = "";
      this.avatar = "";
      this.recentSearches = [];
    },
    // 添加搜索记录
    addSearchRecord(searchTerm) {
      if (!searchTerm.trim())
        return;
      this.recentSearches = this.recentSearches.filter(
        (item) => item.toLowerCase() !== searchTerm.toLowerCase()
      );
      this.recentSearches.unshift(searchTerm);
      if (this.recentSearches.length > this.maxSearchHistory) {
        this.recentSearches = this.recentSearches.slice(0, this.maxSearchHistory);
      }
    },
    // 移除单个搜索记录
    removeSearchRecord(index) {
      if (index >= 0 && index < this.recentSearches.length) {
        this.recentSearches.splice(index, 1);
      }
    },
    // 清空搜索记录
    clearSearchHistory() {
      this.recentSearches = [];
    },
    // 检查是否是管理员
    isAdmin() {
      return this.user_type === 1;
    }
  },
  getters: {
    // 获取用户基本信息
    userInfo: (state) => ({
      open_id: state.open_id,
      user_type: state.user_type,
      phone_number: state.phone_number,
      user_gender: state.user_gender,
      user_name: state.user_name,
      avatar: state.avatar
    }),
    // 获取格式化性别
    genderText: (state) => {
      const genderMap = ["男", "女", "未知"];
      return genderMap[state.user_gender] || "未知";
    },
    // 获取最近的搜索记录
    getRecentSearches: (state) => state.recentSearches
  },
  // 持久化配置（如果需要）
  persist: {
    enabled: true,
    strategies: [
      {
        key: "user",
        storage: localStorage,
        paths: ["open_id", "user_type", "phone_number", "user_gender", "user_name", "avatar", "recentSearches"]
      }
    ]
  }
});
exports.useUserStore = useUserStore;
//# sourceMappingURL=../../.sourcemap/mp-weixin/stores/user.js.map
