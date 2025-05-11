"use strict";
const common_vendor = require("../../common/vendor.js");
const api_request = require("../../api/request.js");
if (!Array) {
  const _easycom_uni_list_chat2 = common_vendor.resolveComponent("uni-list-chat");
  const _easycom_uni_list2 = common_vendor.resolveComponent("uni-list");
  (_easycom_uni_list_chat2 + _easycom_uni_list2)();
}
const _easycom_uni_list_chat = () => "../../uni_modules/uni-list/components/uni-list-chat/uni-list-chat.js";
const _easycom_uni_list = () => "../../uni_modules/uni-list/components/uni-list/uni-list.js";
if (!Math) {
  (_easycom_uni_list_chat + _easycom_uni_list)();
}
const defaultAvatar = "https://qiniu-web-assets.dcloud.net.cn/unidoc/zh/unicloudlogo.png";
const _sfc_main = {
  __name: "messages",
  setup(__props) {
    const userList = common_vendor.ref([]);
    common_vendor.onMounted(() => {
      loadConversationList();
    });
    const loadConversationList = async () => {
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      if (!userInfo || !userInfo.openId)
        return;
      try {
        const res = await api_request.request({
          url: `/user/listMessageList/?openId=${userInfo.openId}`,
          method: "POST"
        });
        common_vendor.index.__f__("log", "at pages/messages/messages.vue:43", "resInfo----------->", JSON.stringify(res, null, 2));
        if (res.code === 200 && Array.isArray(res.data)) {
          userList.value = res.data.map((openId) => ({
            openId,
            userName: "用户" + openId.slice(-4),
            // 可拓展昵称接口
            lastMessage: "您收到一条新的消息",
            lastTime: /* @__PURE__ */ new Date(),
            // 需替换为接口返回时间（你现在接口没提供）
            unreadCount: 0,
            // 这里先写死，真实项目应统计未读数
            avatar: defaultAvatar
          }));
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/messages/messages.vue:55", "加载消息列表失败", err);
      }
    };
    const goToChatDetail = (openId) => {
      common_vendor.index.navigateTo({
        url: `/pages/chatdetail/chatdetail?sellerId=${openId}`,
        fail: (err) => {
          common_vendor.index.__f__("error", "at pages/messages/messages.vue:63", "跳转失败:", err);
        }
      });
    };
    const formatTime = (time) => {
      const d = new Date(time);
      return d.toLocaleTimeString("zh", { hour: "2-digit", minute: "2-digit" });
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.f(userList.value, (user, k0, i0) => {
          return {
            a: user.openId,
            b: common_vendor.o(($event) => goToChatDetail(user.openId), user.openId),
            c: "ecc172b4-1-" + i0 + ",ecc172b4-0",
            d: common_vendor.p({
              title: user.userName || user.openId,
              avatar: user.avatar || defaultAvatar,
              note: user.lastMessage || "点击开始聊天",
              time: formatTime(user.lastTime),
              ["badge-text"]: user.unreadCount || "",
              link: true
            })
          };
        }),
        b: common_vendor.p({
          border: true
        }),
        c: userList.value.length === 0
      }, userList.value.length === 0 ? {} : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-ecc172b4"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/messages/messages.js.map
