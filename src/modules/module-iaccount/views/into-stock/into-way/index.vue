<template>
  <section class="op-page-wrap op-page-wrap-ow">
    <header class="op-page-title">{{$t('iAccount.intoStock.intoWayTitle')}}</header>
    <base-cells class="ow-ways">
      <base-cell
        v-for="item in ways"
        :key="item.type"
        class="ow-way-item"
        @click="handleNext(item)"
      >
        <base-cell-header>
          <em :class="`ow-icon ow-icon-${item.type}`" />
        </base-cell-header>
        <base-cell-body>
          <span class="ow-label">{{item.label}}</span>
          <span class="ow-tips">{{item.tips}}</span>
        </base-cell-body>
      </base-cell>
    </base-cells>
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
          label: this.$t("iOpen.authWay.wayHK"),
          // nextRouteName: 'transferInfo',
        },
        {
          type: "us",
          code: 2,
          label: this.$t("iOpen.authWay.wayOther"),
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

