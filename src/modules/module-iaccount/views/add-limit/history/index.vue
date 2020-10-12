<template>
  <div class="limit-history">
    <template v-if="isFetching">
      <loading />
    </template>
    <template v-else>
      <ul class="list-wrap" v-if="historyList && historyList.length">
        <li class="list-item" v-for="(item, index) in historyList" :key="index">
          <div class="top">
            <!-- 时间 -->
            <span>{{ item.createTime | timeFormatter }}</span>
            <!-- 状态 status 0:已提交 1:已受理  2:已成功 3:退回  -->
            <span :class="statusClass(item.status)">{{
              statusFormatter(item.status)
            }}</span>
          </div>
          <div class="step-content tb">
            <div class="tr thead">
              <span class="td txt-left">{{ getI18n("mktTitle") }}</span>
              <span class="td txt-right">{{
                getI18n("originLimitTitle")
              }}</span>
              <!-- <span class="td">{{ getI18n("curLimitTitle") }}</span> -->
              <span class="td txt-right">{{ getI18n("curLimitTitle") }}</span>
            </div>
            <template v-if="item.lineCreditList && item.lineCreditList.length">
              <div
                class="tr"
                v-for="(itemLine, idx) in item.lineCreditList"
                :key="idx"
              >
                <span class="td txt-left">{{
                  getCurrencyLabel(itemLine.moneyType)
                }}</span>
                <span class="td txt-right">{{
                  (item.lineCreditBefore || 0) | formatMoney
                }}</span>
                <!-- <span class="td  txt-right"
                  >{{ (item.lineCreditApply|| 0)  | formatMoney
                  }}</span
                > -->
                <span class="td txt-right">{{
                  (item.lineCreditAfter || 0) | formatMoney
                }}</span>
              </div>
            </template>
          </div>
        </li>
      </ul>
      <div class="noMore">{{ getI18n("noMore") }}</div>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { format2datetime } from "@/main/utils/format/date.js";
import { Toast } from "cube-ui";
import { isArray } from "@/main/utils/format/is";
import { formatMoney } from "@/modules/module-iaccount/utils/number";

export default {
  data() {
    return {
      historyList: [],
      marketMap: {
        0: "cn",
        1: "us",
        2: "hk",
      },
    };
  },
  created() {
    this.setTitle(this.$t("iAccount.addLimit.history.pageName"));
    // this.getList();
  },
  computed: {
    ...mapGetters(["secAccountInfo", "isFetching"]),
    isOpenCnMarket() {
      return (
        this.secAccountInfo && Boolean(this.secAccountInfo.isOpenCnStockMarket)
      );
    },
    isOpenHkMarket() {
      return (
        this.secAccountInfo && Boolean(this.secAccountInfo.isOpenHkStockMarket)
      );
    },
    isOpenUsaMarket() {
      return (
        this.secAccountInfo && Boolean(this.secAccountInfo.isOpenUsaStockMarket)
      );
    },
    marginAccount() {
      const { fundAccount = [] } = this.secAccountInfo;
      let account = "";
      fundAccount.some((item) => {
        if (item.assetProp == "M") {
          account = item.fundAccount;
        }
        return item.assetProp == "M";
      });
      return account;
    },
  },
  methods: {
    ...mapActions(["getAddLimitHistory"]),
    getCurrencyLabel(market) {
      const mktKey = this.marketMap[market];
      if (!mktKey) return "";
      return (
        this.$t(`iAccount.addLimit.loanLimit.${mktKey}.accountName`) +
        "/" +
        this.$t(`iAccount.addLimit.loanLimit.${mktKey}.curreny`)
      );
    },
    getList() {
      this.getAddLimitHistory({ fundAccount: this.marginAccount }).then(
        (res) => {
          if (isArray(res)) {
            this.historyList = res;
          }
        }
      );
    },
    getI18n(key) {
      return this.$t(`iAccount.addLimit.history.${key}`);
    },
    statusClass(status) {
      switch (status) {
        case 0:
          return "unProcessed";
        case 1:
          return "processing";
        case 2:
          return "success";
        case 3:
          return "backed";
      }
    },
    statusFormatter(status) {
      switch (status) {
        case 0:
          return this.getI18n("status.unProcessed");
        case 1:
          return this.getI18n("status.processing");
        case 2:
          return this.getI18n("status.success");
        case 3:
          return this.getI18n("status.backed");
      }
    },
  },
  filters: {
    formatMoney,
    timeFormatter(time) {
      return time && format2datetime(time, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
