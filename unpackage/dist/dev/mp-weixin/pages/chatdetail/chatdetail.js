"use strict";
const common_vendor = require("../../common/vendor.js");
const _sfc_main = {
  __name: "chatdetail",
  setup(__props) {
    const userName = common_vendor.ref("ruichen");
    const messages = common_vendor.reactive([
      {
        sender: "me",
        content: "你好，最近怎么样？",
        time: "10:30"
      },
      {
        sender: "other",
        content: "很好，谢谢！",
        time: "10:31"
      }
    ]);
    const scrollTop = common_vendor.ref(0);
    const scrollHeight = common_vendor.ref(0);
    common_vendor.onMounted(() => {
      const systemInfo = common_vendor.index.getSystemInfoSync();
      const query = common_vendor.index.createSelectorQuery().in(this);
      query.select(".chat-header").boundingClientRect();
      query.select(".chat-input").boundingClientRect();
      query.exec((res) => {
        const headerHeight = res[0].height;
        const inputHeight = res[1].height;
        scrollHeight.value = systemInfo.windowHeight - headerHeight - inputHeight;
      });
    });
    const newMessage = common_vendor.ref("");
    const sendMessage = async () => {
      if (!newMessage.value.trim())
        return;
      messages.push({
        sender: "me",
        content: newMessage.value.trim(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh", { hour: "2-digit", minute: "2-digit" })
      });
      newMessage.value = "";
      await common_vendor.nextTick$1();
      scrollTop.value = Date.now();
    };
    setInterval(() => {
      if (messages.length % 2 === 0)
        return;
      messages.push({
        sender: "other",
        content: "自动回复：" + (/* @__PURE__ */ new Date()).toLocaleTimeString(),
        time: (/* @__PURE__ */ new Date()).toLocaleTimeString("zh", { hour: "2-digit", minute: "2-digit" })
      });
      scrollTop.value = Date.now();
    }, 3e3);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.t(userName.value),
        b: common_vendor.f(messages, (message, index, i0) => {
          return {
            a: common_vendor.t(message.content),
            b: common_vendor.t(message.time),
            c: index,
            d: common_vendor.n(message.sender)
          };
        }),
        c: scrollTop.value,
        d: scrollHeight.value + "px",
        e: common_vendor.o(sendMessage),
        f: newMessage.value,
        g: common_vendor.o(($event) => newMessage.value = $event.detail.value),
        h: common_vendor.o(sendMessage)
      };
    };
  }
};
wx.createPage(_sfc_main);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/chatdetail/chatdetail.js.map
