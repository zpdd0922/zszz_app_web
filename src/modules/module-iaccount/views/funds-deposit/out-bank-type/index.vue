<template>
  <section class="sec-page-wrap sec-deposit-bank-type">
    <base-cells class="select-ways">
      <base-cell v-for="item in ways" :key="item.type" class="way-item" @click="handleNext(item)">
        <base-cell-header>
          <em :class="`way-icon bank-type-icon-${item.type}`" />
        </base-cell-header>
        <base-cell-body>
          <span class="label">
            {{item.label}}
            <i v-if="item.isRecommend" class="icon-recommend">推荐</i>
          </span>
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
  created() {},
  computed: {
    ...mapGetters(["openInfo", "openProgress"]),
    ways() {
      return [
        {
          type: "hk",
          code: "hk",
          value: 2,
          label: this.$t("iAccount.fundsDeposit.outBankType.hk.name"),
          tips: this.$t("iAccount.fundsDeposit.outBankType.hk.tips"),
          isRecommend: true,
          nextRoute: "sec-out-bank-hk",
        },
        {
          type: "other",
          code: "other",
          value: 3,
          label: this.$t("iAccount.fundsDeposit.outBankType.other.name"),
          tips: this.$t("iAccount.fundsDeposit.outBankType.other.tips"),
          nextRoute: "sec-out-bank-other",
        },
      ];
    },
  },
  methods: {
    handleNext(item) {
      this.$store.dispatch("selectBankType", item).then(() => {
        console.log(item)
        this.$router.push({ name: item.nextRoute });
      });
    },
  },
};
</script>

