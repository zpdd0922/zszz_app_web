<!--
 * @Author: Jim
 * @Date: 2019-12-18 14:18:36
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-06 15:35:39
 * @Description: 
 -->
<template>
  <div class="download-page-main">
    <i
      @click.stop="handleTipsOpenInBrower(false)"
      v-show="isTipsOpenBrower"
      class="tips-open-brower"
    ></i>
    <section class="box">
      <div class="flag"></div>
      <div class="btn_area">
        <button @click.stop="doDownApp">下载APP</button>
        <!-- <button ref="openApp" @click.stop="doOpenApp">打开APP</button> -->
      </div>
    </section>
  </div>
</template>

<script>
import auth from "@/main/request/utils/auth";
import { customTopToast } from "@/main/utils/common/tips";
import { OpenApp } from "@/main/utils/native-app/open-app";
import {
  downAddressIOSWeb,
  downAddressIOSItms,
  downAddressAndroid,
  openAddressIOS,
  openAddressAndroid
} from "./config";

const openAppTools = new OpenApp({
  androidConfig: {
    // 通过9f打开某个链接
    intentUrl: openAddressAndroid.intentUrl,
    // schema头协议，实际情况填写
    scheme: openAddressAndroid.scheme,
    // apk信息,请根据实际情况填写
    apkInfo: openAddressAndroid.apkInfo,
    downloadUrl: downAddressAndroid
  },
  iosConfig: {
    scheme: openAddressIOS,
    downloadUrl: downAddressIOSWeb
  }
});

export default {
  name: "download-main",
  data() {
    return {
      isTipsOpenBrower: false,
      tipsOpening: "正在尝试打开立桥证券客户端...",
      tipsToOpen: "亲，可以直接点击下载立桥证券或打开立桥证券"
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    isLogin() {
      return auth.getAuthSession().length;
    },
    isNeedShowTipsInBrower() {
      return (
        this.UaInfo.isWX() ||
        (this.UaInfo.isAndroid() && this.UaInfo.isMobileQQ())
      );
    }
  },
  methods: {
    init() {
      // this.$nextTick(() => {
      //   this.$refs.openApp.click();
      // });
    },
    handleTipsOpenInBrower(isShow = false) {
      this.isTipsOpenBrower = isShow;
    },
    handleTipsOpeningApp() {
      customTopToast({
        txt: this.tipsToOpen,
        time: 1500,
        callback: () => {
          customTopToast({ txt: this.tipsOpening, time: 3000 });
        }
      });
    },
    doOpenApp(isShowTopTips) {
      if (this.isNeedShowTipsInBrower) {
        this.handleTipsOpenInBrower(true);
      } else {
        if (isShowTopTips) this.handleTipsOpeningApp();
        openAppTools && openAppTools.loadSchema();
      }
    },
    doDownApp(isOtherApp, otherOpenUrl) {
      if (this.isNeedShowTipsInBrower) {
        this.handleTipsOpenInBrower(true);
      } else {
        const androidUrl = downAddressAndroid;
        const iosUrl = isOtherApp ? downAddressIOSItms : downAddressIOSWeb;

        let url = this.UaInfo.isAndroid() ? androidUrl : iosUrl;

        if (otherOpenUrl && otherOpenUrl !== "") url = otherOpenUrl;

        window.location.href = url;
      }
    }
  }
};
</script>
