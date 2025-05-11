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
  __name: "profile",
  setup(__props) {
    const logout = async () => {
      common_vendor.index.removeStorageSync("userInfo");
      common_vendor.index.showToast({
        title: "退出成功",
        icon: "success"
      });
      common_vendor.index.reLaunch({
        url: "/pages/index/index"
        // 登录页面路径根据实际项目调整
      });
    };
    const goMyPublish = () => {
      common_vendor.index.navigateTo({
        url: "/pages/publish/publish"
        // 请确保路径与你项目中实际页面路径一致
      });
    };
    const goMyCollect = () => {
      common_vendor.index.navigateTo({
        url: "/pages/collect/collect"
        // 请确保路径与你项目中实际页面路径一致
      });
    };
    const userInfo = common_vendor.ref(common_vendor.index.getStorageSync("userInfo") || {
      avatar: "/static/logo.png",
      userName: "微信用户",
      phoneNumber: null,
      userGender: 0,
      openId: "u001"
    });
    const showModal = common_vendor.ref(false);
    const chooseAvatar = () => {
      common_vendor.index.chooseImage({
        count: 1,
        // 只选择一个图片
        success: (res) => {
          const avatar = res.tempFilePaths[0];
          userInfo.value.avatar = avatar;
        }
      });
    };
    const openSettingModal = () => {
      showModal.value = true;
    };
    const closeSettingModal = () => {
      showModal.value = false;
    };
    const saveUserInfo = async () => {
      const updatedUserInfo = { ...userInfo.value };
      try {
        common_vendor.index.__f__("log", "at pages/profile/profile.vue:140", "updatedUserInfo----------->", JSON.stringify(updatedUserInfo, null, 2));
        const res = await api_request.request({
          url: "/user/updateProfile",
          method: "POST",
          data: updatedUserInfo
        });
        if (res.code === 200) {
          common_vendor.index.setStorageSync("userInfo", updatedUserInfo);
          common_vendor.index.showToast({
            title: "更新成功！",
            icon: "success"
          });
          closeSettingModal();
        } else {
          common_vendor.index.showToast({
            title: "更新失败",
            icon: "none"
          });
        }
      } catch (error) {
        common_vendor.index.__f__("error", "at pages/profile/profile.vue:163", "更新用户信息失败", error);
        common_vendor.index.showToast({
          title: "更新失败",
          icon: "none"
        });
      }
    };
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: userInfo.value.avatar,
        b: common_vendor.t(userInfo.value.userName),
        c: common_vendor.o(openSettingModal),
        d: common_vendor.p({
          type: "plusempty",
          size: "20",
          color: "#000"
        }),
        e: common_vendor.o(goMyPublish),
        f: common_vendor.p({
          type: "cart-filled",
          size: "20",
          color: "#000"
        }),
        g: common_vendor.p({
          type: "star-filled",
          size: "20",
          color: "#000"
        }),
        h: common_vendor.o(($event) => goMyCollect()),
        i: common_vendor.p({
          type: "phone",
          size: "20",
          color: "#000"
        }),
        j: common_vendor.o(($event) => _ctx.contactService()),
        k: common_vendor.p({
          type: "mail-open",
          size: "20",
          color: "#000"
        }),
        l: common_vendor.p({
          type: "help",
          size: "20",
          color: "#000"
        }),
        m: common_vendor.p({
          type: "back",
          size: "20",
          color: "#000"
        }),
        n: common_vendor.o(logout),
        o: showModal.value
      }, showModal.value ? {
        p: userInfo.value.userName,
        q: common_vendor.o(($event) => userInfo.value.userName = $event.detail.value),
        r: userInfo.value.phoneNumber,
        s: common_vendor.o(($event) => userInfo.value.phoneNumber = $event.detail.value),
        t: common_vendor.o(chooseAvatar),
        v: userInfo.value.userGender === 1,
        w: userInfo.value.userGender === 0,
        x: common_vendor.o((e) => userInfo.value.userGender = e.detail.value),
        y: common_vendor.o(saveUserInfo),
        z: common_vendor.o(closeSettingModal),
        A: common_vendor.o(() => {
        }),
        B: common_vendor.o(closeSettingModal)
      } : {});
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-dd383ca2"]]);
wx.createPage(MiniProgramPage);
//# sourceMappingURL=../../../.sourcemap/mp-weixin/pages/profile/profile.js.map
