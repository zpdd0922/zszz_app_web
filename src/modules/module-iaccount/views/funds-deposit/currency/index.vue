<template>
  <section class="sec-page-wrap sec-deposit-currency">
    <base-cells class="select-ways">
      <base-cell v-for="item in ways" :key="item.type" class="way-item" @click="handleNext(item)">
        <base-cell-header>
          <em :class="`way-icon currency-icon-${item.type}`" />
        </base-cell-header>
        <base-cell-body>
          <span class="label">{{item.label}}</span>
          <span v-if="item.tips" class="tips">{{item.tips}}</span>
        </base-cell-body>
        <base-cell-footer>
          <base-icon name="arrow"></base-icon>
        </base-cell-footer>
      </base-cell>
    </base-cells>
  </section>
</template>

<script type="text/ecmascript-6">
import { userMakePhone, getMobileInfo } from "@/main/utils/native-app/";
import { alert } from "@/main/utils/common/tips";
import validate from "@/main/utils/format/validate";
import { mapGetters } from "vuex";
import AccountApi from "@/modules/module-iaccount/api/modules/api-account";
import {
  HKD,
  USD,
  DOLLAR_HK_VAL,
  DOLLAR_US_VAL,
} from "@/modules/module-iaccount/define";

export default {
  data() {
    return {
      offlineOptions: window.OFFLINE_CONTACT,
      selectWay: "",
    };
  },
  created() {
    // TODO: 新增ip判斷，進行邏輯處理？
    // this.queryAddressIP();
  },
  computed: {
    ...mapGetters(["openInfo", "openProgress"]),
    // 判断当前路由环境
    origin() {
      return this.UaInfo.isApp() ? "app" : "h5";
    },
    ways() {
      return [
        {
          type: "hkd",
          code: 1,
          name: this.$t("iAccount.fundsDeposit.currency.hkd.name"),
          label: this.$t("iAccount.fundsDeposit.currency.hkd.label"),
          tips: this.$t("iAccount.fundsDeposit.currency.usd.tips"),
          code: HKD,
          value: DOLLAR_HK_VAL,
          gt: 2,
          fee: "0.00",
        },
        // {
        //   type: "usd",
        //   code: 2,
        //   name: this.$t("iAccount.fundsDeposit.currency.usd.name"),
        //   label: this.$t("iAccount.fundsDeposit.currency.usd.label"),
        //   tips: this.$t("iAccount.fundsDeposit.currency.usd.tips"),
        //   code: USD,
        //   value: DOLLAR_US_VAL,
        //   gt: 1,
        //   fee: "0.00",
        // },
      ];
    },
  },
  methods: {
    handleNext(item) {
      // this.$store.dispatch("selectCurrency", item).then(() => {
      //   this.$router.push({ name: "outBankType" });
      // });
      AccountApi.getOpenBankType().then((res) => {
        const { bankType } = res;
        if (bankType === 0) {
          // 香港卡开户
          const bank_hk = this.$t("iAccount.define.BANK_HK");
          this.$store.dispatch("selectBankType", bank_hk).then(() => {
            this.gotoView("sec-out-bank-hk", item);
          });
        } else {
          // 大陆卡开户
          this.gotoView("sec-out-bank-type", item);
        }
      });
    },
    gotoView(name, item) {
      this.$store.dispatch("selectCurrency", item).then(() => {
        this.$router.push({ name: name });
      });
    },
  },
};
</script>

