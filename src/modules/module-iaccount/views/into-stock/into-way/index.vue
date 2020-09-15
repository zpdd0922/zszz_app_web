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
      metaInfo: {
        state: 0,
        step: 0,
      }
    };
  },
  props: {
    updateInfo: {
      type: Function
    }
  },
  created() {
    // typeof this.updateInfo === 'function' && this.updateInfo();
    //TODO:新增一个获取可提取现金的接口调用 /find_extractable_money

    // TODO: 新增ip判斷，進行邏輯處理？
    // this.queryAddressIP();
  },
  computed: {
    // ...mapGetters(["openInfo", "openProgress"]),
    ...mapGetters(["isShares"]),
    // 判断当前路由环境
    origin() {
      return this.UaInfo.isApp() ? "app" : "h5";
    },

    ways() {

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
      if (item.code === 2) {
        alert({
          title: this.$t("common.alertTitle"),
          content: "功能待开放",
        });
        return
      }
      //更改选择状态
      // this.$store.commit('SET_ISSHARES', {isShares: item.code})
      this.$store.dispatch("setMarketStatus", item.code)
      // 进入下一流程
      this.$router.push({
        name: 'transferInfo',
        // params: { intoType: item.code, isRefresh: false },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>

