<template>
  <section class="into-way-wrap">
    <header class="page-title">{{$t('iAccount.intoStock.intoWay.title')}}</header>
    <div class="ways">
      <div
        v-for="item in ways"
        :key="item.type"
        class="way-item"
        @click="handleNext(item)"
      >
        <div>
          <em :class="`icon icon-${item.type}`" />
        </div>
        <div class="cell-body">
          <span class="label">{{item.label}}</span>
          <span class="eng">{{item.engLabel}}</span>
          <!-- <span class="tips">{{item.tips}}</span> -->
        </div>
        <div class="arrow"></div>
      </div>
    </div>
  </section>
</template>

<script type="text/ecmascript-6">
import { userMakePhone, getMobileInfo } from "@/main/utils/native-app/";
import { alert } from "@/main/utils/common/tips";
import validate from "@/main/utils/format/validate";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
    };
  },
  created() {
    // TODO: 新增ip判斷，進行邏輯處理？
    // this.queryAddressIP();
  },
  computed: {
    // ...mapGetters(["openInfo", "openProgress"]),
    // 判断当前路由环境
    origin() {
      return this.UaInfo.isApp() ? "app" : "h5";
    },
    // isCanOpenCn() {
    //   const phone = this.openProgress.phoneNumber;
    //   return validate.isCnMobile(phone);
    //   return true;
    // },
    ways() {
      // if (this.isCanOpenCn) {
      //   return [
      //     {
      //       type: "cn",
      //       code: 1,
      //       label: this.$t("iOpen.authWay.wayCN"),
      //       tips: this.$t("iOpen.authWay.wayCNTips"),
      //       nextRoute: "opaOnlineCn",
      //     },
      //     {
      //       type: "hk",
      //       code: 2,
      //       label: this.$t("iOpen.authWay.wayHK"),
      //       tips: this.$t("iOpen.authWay.wayHKTips"),
      //       nextRoute: "opaOnlineHk",
      //     },
      //     {
      //       type: "other",
      //       code: 3,
      //       label: this.$t("iOpen.authWay.wayOther"),
      //       nextRoute: "",
      //     },
      //   ];
      // }
      return [
        {
          type: "hk",
          code: 1,
          label: this.$t("iAccount.intoStock.intoWay.wayHK"),
          engLabel: 'Into HK stocks',
          // nextRouteName: 'transferInfo',
        },
        {
          type: "us",
          code: 2,
          label: this.$t("iAccount.intoStock.intoWay.wayUS"),
          engLabel: 'Into US stocks',
          // nextRouteName: 'transferInfo',
        },
      ];
    },
  },
  methods: {
    handleNext(item) {
      // 进入下一流程
      this.$router.push({
        name: 'transferInfo',
        params: { intoType: item.type },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

