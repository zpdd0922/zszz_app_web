<template>
  <section class="op-guide">
    <template v-if="!openProgress">
      <base-waiting />
    </template>
    <template v-else>
      <div class="box">
        <!-- 未开始 -->
        <template
          v-if="
            marginOpenStatus === OPEN_STATUS.UN_START ||
            marginOpenStatus === OPEN_STATUS.UN_SUBMIT
          "
        >
          <com-ready :skin="skin" @click="onOpenClick"></com-ready>
        </template>
        <!-- 开户中 -->
        <template v-else-if="marginOpenStatus === OPEN_STATUS.PENDING">
          <!-- <template v-if="isAuthing">
            <com-authing :skin="skin" @click="handleLogout"></com-authing>
          </template>
          <template v-else>-->
          <com-pending :skin="skin" @click="handleLogout"></com-pending>
          <!-- </template> -->
        </template>
        <!-- 开户已取消 -->
        <template v-else-if="marginOpenStatus === OPEN_STATUS.CANCELED">
          <com-fail :skin="skin" isCanceled @click="onOpenClick"></com-fail>
        </template>
        <!-- 开户成功 -->
        <template v-else-if="marginOpenStatus === OPEN_STATUS.SUCCESS">
          <com-success :skin="skin" @click="handleLogout"></com-success>
        </template>
        <!-- 开户失败 -->
        <template
          v-else-if="
            marginOpenStatus === OPEN_STATUS.FAILED ||
            marginOpenStatus === OPEN_STATUS.FAILED_1 ||
            marginOpenStatus === OPEN_STATUS.FAILED_2
          "
        >
          <com-fail :skin="skin" @click="onOpenClick"></com-fail>
        </template>
        <!-- 销户 -->
        <template v-else-if="marginOpenStatus === OPEN_STATUS.ACCOUNT_OFF">
          <com-error :skin="skin" @click="handleLogout"></com-error>
        </template>
        <!-- 账户异常 -->
        <!-- <template v-else-if="marginOpenStatus === OPEN_STATUS.ACCOUNT_ABO">
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
} from "@/modules/module-iopen-extension/enums/open-progress";

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const openURL = envConfig.webIOpen;

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
    marginOpenStatus() {
      return this.openProgress.marginOpenStatus;
    },
    isOpenAccount() {
      return this.openProgress.openStatus === OPEN_STATUS.SUCCESS;
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
  },
  mounted() {
    this.getOpenProgress({ openType: 0 }).then((res) => {
      // 未开户，跳转开户
      if (res.openStatus !== OPEN_STATUS.SUCCESS) {
        window.location.replace(openURL);
      } else if (
        marginOpenStatus === OPEN_STATUS.UN_START ||
        marginOpenStatus === OPEN_STATUS.UN_SUBMIT
      ) {
        this.onOpenClick();
      }
    });
  },
  methods: {
    ...mapActions(["getOpenProgress"]),
    // 触发极速开户
    onOpenClick() {
      this.$router.push({ name: "margin-info-disclosure" });
    },
    handleLogout() {
      this.$store.dispatch("logout").then(() => {
        location.reload();
      });
    },
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>