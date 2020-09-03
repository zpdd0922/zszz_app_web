<template>
  <section class="op-guide">
    <template v-if="!openProgress">
      <base-waiting />
    </template>
    <template v-else>
      <div class="box">
        <!-- 未开始 -->
        <template
          v-if="openStatus === OPEN_STATUS.UN_START || openStatus === OPEN_STATUS.UN_SUBMIT"
        >
          <com-ready :skin="skin" @click="onOpenClick"></com-ready>
        </template>
        <!-- 开户中 -->
        <template v-else-if="openStatus === OPEN_STATUS.PENDING">
          <template v-if="isAuthing">
            <com-authing :skin="skin" @click="handleLogout"></com-authing>
          </template>
          <template v-else>
            <com-pending :skin="skin" @click="handleLogout"></com-pending>
          </template>
        </template>
        <!-- 开户已取消 -->
        <template v-else-if="openStatus === OPEN_STATUS.CANCELED">
          <com-fail :skin="skin" isCanceled @click="onOpenClick"></com-fail>
        </template>
        <!-- 开户成功 -->
        <template v-else-if="openStatus === OPEN_STATUS.SUCCESS">
          <com-success :skin="skin" @click="handleLogout"></com-success>
        </template>
        <!-- 开户失败 -->
        <template v-else-if="openStatus === OPEN_STATUS.FAILED">
          <com-fail :skin="skin" @click="onOpenClick"></com-fail>
        </template>
        <!-- 销户 -->
        <template v-else-if="openStatus === OPEN_STATUS.ACCOUNT_OFF">
          <com-error :skin="skin" @click="handleLogout"></com-error>
        </template>
        <!-- 账户异常 -->
        <!-- <template v-else-if="openStatus === OPEN_STATUS.ACCOUNT_ABO">
          <com-error :skin="skin"></com-error>
        </template>-->
        <template v-else>
          <com-error :skin="skin" @click="handleLogout"></com-error>
        </template>
      </div>
    </template>
  </section>
</template>

<script>
import { getURLParameters } from "@/main/utils/format/url";
import { jumpUrl, initSZCA, setCADoc } from "@/main/utils/native-app/index";

import ComReady from "./components/com-ready";
import ComPending from "./components/com-pending";
import ComAuthing from "./components/com-authing";
import ComSuccess from "./components/com-success";
import ComFail from "./components/com-fail";
import ComError from "./components/com-error";
import { mapGetters, mapActions } from "vuex";
import { confirm, alert } from "@/main/utils/common/tips";
import {
  OPEN_STATUS,
  PENDING_STATUS_TYPE,
} from "@/modules/module-iopen/enums/open-progress";

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const selfURL = envConfig.selfURL;

export default {
  components: {
    ComReady,
    ComPending,
    ComAuthing,
    ComSuccess,
    ComFail,
    ComError,
  },
  metaInfo() {
    return {
      title: this.$route.meta.title,
    };
  },
  data() {
    return {
      OPEN_STATUS,
    };
  },
  computed: {
    ...mapGetters(["userInfo", "openProgress"]),
    // 开户状态
    openStatus() {
      // return OPEN_STATUS.PENDING;
      return this.openProgress.openStatus;
    },
    urlObj() {
      return getURLParameters();
    },
    skin() {
      return "white";
      // const theme = this.userInfo.skin;
      // if (theme) {
      //   return theme.toLowerCase();
      // }
      // return this.urlObj['skin'];
    },
    isAuthing() {
      return this.openProgress.pendType === PENDING_STATUS_TYPE.AUTH;
    },
    isH5() {
      return !this.UaInfo.isApp();
    },
    progressComponent() {},
  },
  created() {
    this.getOpenProgress({ openType: 0 });
  },
  methods: {
    ...mapActions(["getOpenProgress", "updateAuthStatus"]),
    // 触发极速开户
    onOpenClick() {
      this.handleAppOpen({ path: "open-way" });
    },
    onAuthClick() {
      this.updateAuthStatus({ flag: 1 }).then(
        this.getOpenProgress({ openType: 0 })
      );
    },
    handleLogout() {
      this.$store.dispatch("logout").then(() => {
        location.reload();
      });
    },
    // 判断APP环境 url：外链完整路径，path：开户项目path路径, name: 开户项目路由名称
    handleAppOpen(urlInfo) {
      const { path, name } = urlInfo;
      // 自定义APP内，且需要新开窗口，使用完整路径
      if (this.UaInfo.isApp() && this.urlObj["isnew"] === "y") {
        const url = `${selfURL}index.html#/opa/${path}`;
        const opts = {
          url,
          bottomTab: false, // 是否需要底部导航栏  //仅限于首页
          backHeader: true, // 是否需要后退按钮
          isFresh: false, // 是否下拉可刷新
          elasticBorder: true, // 是否弹性边框        //针对IOS
          isCloseBtn: true, // 是否关闭按钮
          isNeedHeader: true, // 是否需要头部
          isNewPage: true,
        };

        jumpUrl(opts);
      } else {
        // 如果vue开户项目内
        if (name) {
          this.$router.push({ name });
        } else if (path) {
          this.$router.push(path);
        } else {
          window.location.href = url;
        }
      }
    },
  },
};
</script>
