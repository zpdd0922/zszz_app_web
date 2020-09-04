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
      <div v-if="openType!=''" class="desc">
        <h4 class="desc-title">{{$t("iOpen.guide.pending.desc.title")}}</h4>
        <template v-if="openType=='cn'">
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.cn[1]")}}</p>
        </template>
        <template v-if="openType=='hk'">
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.hk[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.hk[1]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.pending.desc.hk[2]")}}</p>
        </template>
      </div>
    </section>
    <footer class="foot">
      <cube-button @click="onClick">{{$t("iOpen.guide.btnLogout")}}</cube-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  OPEN_STATUS,
  PENDING_STATUS_TYPE,
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
      pendingStatusInfo: {
        // 预批中
        [PENDING_STATUS_TYPE.DOING]: {
          title: this.$t("iOpen.guide.pending.doing.title"),
          content: this.$t("iOpen.guide.pending.doing.content"),
          current: 0,
        },
        // 审批中
        [PENDING_STATUS_TYPE.APPROVE]: {
          title: this.$t("iOpen.guide.pending.approve.title"),
          content: this.$t("iOpen.guide.pending.approve.content"),
          current: 1,
        },
        // 柜台开户中
        [PENDING_STATUS_TYPE.OPEN]: {
          title: this.$t("iOpen.guide.pending.open.title"),
          content: this.$t("iOpen.guide.pending.open.content"),
          current: 3,
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
    // 开户类型
    openType() {
      if (!this.openProgress) return "";
      if (this.openProgress.openType == 1) return "cn";
      if (this.openProgress.openType == 2) return "hk";
      return "";
    },
    resultData() {
      const data = this.pendingStatusInfo[this.openProgress.pendType];
      if (typeof data !== "object") {
        return this.pendingStatusInfo[PENDING_STATUS_TYPE.DOING];
      }
      return data;
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