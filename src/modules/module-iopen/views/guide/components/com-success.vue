<template>
  <div class="op-guide-com op-guide-com-success">
    <section class="content">
      <div class="box">
        <em class="status"></em>
        <p class="result-title">{{$t("iOpen.guide.success.title")}}</p>
        <!-- 开户方式为香港 -->
        <!-- 开户方式为大陆 -->
        <!-- 用户是否入金 -->
      </div>
      <div v-if="openType!=''" class="desc">
        <h4 v-if="openType=='cn'" class="desc-title">
          {{$t("iOpen.guide.success.desc.tradeAccountPre")}}
          <span
            class="highlight"
          >{{tradeAccount}}</span>
        </h4>
        <h4 class="desc-title">
          {{$t("iOpen.guide.success.desc.fundAccountPre")}}
          <span
            class="highlight"
          >{{fundAccount}}</span>
        </h4>
        <template v-if="openType=='cn'">
          <p class="desc-tips">{{$t("iOpen.guide.success.desc.cn[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.success.desc.cn[1]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.success.desc.cn[2]")}}</p>
        </template>
        <template v-if="openType=='hk'">
          <p class="desc-tips">{{$t("iOpen.guide.success.desc.hk[0]")}}</p>
          <p class="desc-tips">{{$t("iOpen.guide.success.desc.hk[1]")}}</p>
        </template>
        <p class="desc-tips">
          {{$t("iOpen.guide.contactPre")}}
          <a
            class="telephone"
            :href="`tel:${telePhone}`"
          >{{telePhone}}</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  props: {
    skin: {
      // 皮肤
      type: String,
      default: ""
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["openProgress"]),
    // 开户类型
    openType() {
      if (!this.openProgress) return "";
      if (this.openProgress.openType == 1) return "cn";
      if (this.openProgress.openType == 3) return "hk";
      return "";
    },
    telePhone() {
      return this.$t("common.company.telePhone");
    },
    tradeAccount() {
      if (!this.openProgress) return "";
      return this.openProgress.tradeAccount;
    },
    fundAccount() {
      if (!this.openProgress) return "";
      return this.openProgress.fundAccount;
    }
  }
};
</script>