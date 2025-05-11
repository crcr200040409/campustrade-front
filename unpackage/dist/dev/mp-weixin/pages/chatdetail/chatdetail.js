"use strict";
const common_vendor = require("../../common/vendor.js");
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
  __name: "chatdetail",
  setup(__props) {
    const messages = common_vendor.reactive([]);
    const newMessage = common_vendor.ref("");
    const scrollTop = common_vendor.ref(0);
    const scrollHeight = common_vendor.ref(0);
    const myId = common_vendor.ref("");
    const options = common_vendor.ref({});
    const userName = common_vendor.ref("");
    common_vendor.onLoad(async (params) => {
      options.value = params;
      common_vendor.index.__f__("log", "at pages/chatdetail/chatdetail.vue:43", "myId set to:", params.value);
      userName.value = params.userName || "用户";
      const userInfo = common_vendor.index.getStorageSync("userInfo");
      myId.value = (userInfo == null ? void 0 : userInfo.openId) || "unknown_user";
      common_vendor.index.__f__("log", "at pages/chatdetail/chatdetail.vue:47", "myId set to:", myId.value);
      await loadMessages();
      setTimeout(() => {
        calcScrollHeight();
      }, 300);
    });
    const loadMessages = async () => {
      try {
        const res = await api_request.request({
          url: "/user/listMessage",
          method: "POST",
          data: {
            senderId: myId.value,
            receiverId: options.value.sellerId
          }
        });
        common_vendor.index.__f__("log", "at pages/chatdetail/chatdetail.vue:65", "options.value.sellerId----------->", JSON.stringify(options, null, 2));
        if (res.code === 200 && res.data) {
          messages.splice(0, messages.length, ...res.data.map((msg) => ({
            sender: msg.senderId,
            content: msg.messageContent,
            time: msg.timestamp || /* @__PURE__ */ new Date()
          })));
          scrollToBottom();
        }
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/chatdetail/chatdetail.vue:75", "加载消息失败", err);
      }
    };
    const sendMessage = async () => {
      const content = newMessage.value.trim();
      if (!content)
        return;
      const msg = {
        sender: myId.value,
        content,
        time: /* @__PURE__ */ new Date()
      };
      messages.push(msg);
      newMessage.value = "";
      scrollToBottom();
      try {
        const res = await api_request.request({
          url: "/user/sendMessage",
          method: "POST",
          data: {
            senderId: myId.value,
            receiverId: options.value.sellerId,
            messageContent: content
          }
        });
        common_vendor.index.__f__("error", "at pages/chatdetail/chatdetail.vue:101", "sendMessage---------->", res);
      } catch (err) {
        common_vendor.index.__f__("error", "at pages/chatdetail/chatdetail.vue:103", "发送失败", err);
        common_vendor.index.showToast({ title: "消息发送失败", icon: "none" });
      }
    };
    const scrollToBottom = () => {
      common_vendor.nextTick$1(() => {
        scrollTop.value = 999999;
      });
    };
    const formatTime = (date) => {
      if (!date)
        return "";
      const d = new Date(date);
      return d.toLocaleTimeString("zh", { hour: "2-digit", minute: "2-digit" });
    };
    const calcScrollHeight = () => {
      common_vendor.nextTick$1(() => {
        const systemInfo = common_vendor.index.getSystemInfoSync();
        const query = common_vendor.index.createSelectorQuery();
        query.select(".chat-header").boundingClientRect();
        query.select(".chat-input-area").boundingClientRect();
        query.exec((res) => {
          if (res && res[0] && res[1]) {
            const headerHeight = res[0].height || 50;
            const inputHeight = res[1].height || 60;
            scrollHeight.value = systemInfo.windowHeight - headerHeight - inputHeight;
          } else {
            scrollHeight.value = systemInfo.windowHeight - 110;
          }
        });
      });
    };
    const goBack = () => {
      common_vendor.index.navigateBack();
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(goBack),
        b: common_vendor.p({
          type: "arrowleft",
          size: "24",
          color: "#333"
        }),
        c: common_vendor.t(userName.value),
        d: common_vendor.f(messages, (message, index, i0) => {
          return {
            a: common_vendor.t(message.content),
            b: common_vendor.t(formatTime(message.time)),
            c: index,
            d: common_vendor.n(message.sender === myId.value ? "me" : "other")
          };
        }),
        e: scrollTop.value,
        f: scrollHeight.value + "px",
        g: common_vendor.o(sendMessage),
        h: newMessage.value,
        i: common_vendor.o(($event) => newMessage.value = $event.detail.value),
        j: common_vendor.o(sendMessage),
        k: !newMessage.value.trim()
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chatdetail/chatdetail.js.map
