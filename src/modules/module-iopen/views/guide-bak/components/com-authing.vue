<template>
  <div class="op-guide-com op-guide-com-pending">
    <ProgressBar :skin="skin" :current="resultData.current" :list="progressList" class="bar" />
    <div class="margin-bottom"></div>
    <section class="content">
      <div class="box">
        <em class="status"></em>
        <p class="result-title" v-html="resultData.title"></p>
        <div class="result-content">
          <p class="text" v-html="resultData.content"></p>
        </div>
      </div>
      <div v-if="isAuthWaiting" class="desc">
        <h4 class="desc-title">{{$t("iOpen.guide.authing.desc.title")}}</h4>
        <template v-if="openType=='cn'">
          <p class="desc-tips">{{$t("iOpen.guide.authing.desc.cn[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.authing.desc.cn[1]")}}</p>
        </template>
        <template v-if="openType=='hk'">
          <p class="desc-tips">{{$t("iOpen.guide.authing.desc.hk[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.authing.desc.hk[1]")}}</p>
        </template>
      </div>
      <div v-else class="desc">
        <h4 class="desc-title">{{$t("iOpen.guide.pending.desc.title")}}</h4>
        <template v-if="openType=='cn'">
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[1]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[2]")}}</p>
        </template>
        <template v-if="openType=='hk'">
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.hk[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.hk[1]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[2]")}}</p>
        </template>
      </div>
    </section>
    <!-- <footer class="foot" v-if="isAuthWaiting">
      <cube-button @click="onClick">{{btnContent}}</cube-button>
    </footer> -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import _ from "lodash";
import {
  OPEN_STATUS,
  PENDING_STATUS_TYPE,
  AUTH_STATUS_TYPE,
  FAIL_STATUS_TYPE,
} from "@/modules/module-iopen/enums/open-progress";
export default {
  props: {
    skin: {
      // 皮肤
      type: String,
      default: "",
    },
  },
  data() {
    return {
      // 认证中
      authingStatusInfo: {
        cn: {
          [AUTH_STATUS_TYPE.WAITING]: {
            title: this.$t("iOpen.guide.authing.ca_waiting.title"),
            content: this.$t("iOpen.guide.authing.ca_waiting.content"),
            current: 2,
          },
          [AUTH_STATUS_TYPE.DOING]: {
            title: this.$t("iOpen.guide.authing.ca_doing.title"),
            content: this.$t("iOpen.guide.authing.ca_doing.content"),
            current: 2,
          },
        },
        hk: {
          [AUTH_STATUS_TYPE.WAITING]: {
            title: this.$t("iOpen.guide.authing.deposit_waiting.title"),
            content: this.$t(
              "iOpen.guide.authing.deposit_waiting.content"
            ),
            current: 2,
          },
          [AUTH_STATUS_TYPE.DOING]: {
            title: this.$t("iOpen.guide.authing.deposit_doing.title"),
            content: this.$t("iOpen.guide.authing.deposit_doing.content"),
            current: 2,
          },
        },
      },
    };
  },
  computed: {
    ...mapGetters(["openProgress"]),
    progressList() {
      if (this.openType === "cn") {
        return [
          { key: "ready", text: this.$t("iOpen.guide.progress.ready") },
          {
            key: "approve",
            text: this.$t("iOpen.guide.progress.approve"),
          },
          { key: "ca", text: this.$t("iOpen.guide.progress.ca") },
          { key: "open", text: this.$t("iOpen.guide.progress.open") },
        ];
      }
      return [
        { key: "ready", text: this.$t("iOpen.guide.progress.ready") },
        {
          key: "approve",
          text: this.$t("iOpen.guide.progress.approve"),
        },
        { key: "auth", text: this.$t("iOpen.guide.progress.deposit") },
        { key: "open", text: this.$t("iOpen.guide.progress.open") },
      ];
    },
    isAuthWaiting() {
      return this.openProgress.authType === AUTH_STATUS_TYPE.WAITING;
    },
    btnContent() {
      const btns = {
        cn: this.$t("iOpen.guide.authing.ca_waiting.btn"),
        hk: this.$t("iOpen.guide.authing.deposit_waiting.btn"),
      };
      const btn = btns[this.openType];
      if (typeof btn === "string") return btn.trim();
      return "";
    },
    // 开户类型
    openType() {
      if (!this.openProgress) return "";
      if (this.openProgress.openType == 1) return "cn";
      if (this.openProgress.openType == 2) return "hk";
      return "";
    },
    resultData() {
      const authData = _.get(this.authingStatusInfo, [
        this.openType,
        this.openProgress.authType,
      ]);
      if (typeof authData !== "object") {
        return _.get(this.authingStatusInfo, [
          this.openType,
          AUTH_STATUS_TYPE.DOING,
        ]);
      }
      return authData;
    },
  },
  methods: {
    // 点击跳转'极速开户'
    onClick() {
      this.$emit("click");
    },
  },
};
</script>