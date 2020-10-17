<template>
  <sec-wrap
    class="sec-way sec-way-ebanking"
    :btnText="$t('iAccount.deposit.common.text_3')"
    @handleNext="_clickBtn"
  >
    <header class="sec-page-title">
      <base-cell>
        <base-cell-header></base-cell-header>
        <base-cell-body>{{$t('iAccount.deposit.ways.text_3')}}</base-cell-body>
        <!-- <base-cell-footer>
          <a class="guide-link" :href="getComputedLink">{{$t('iAccount.deposit.eBanking.text_7')}}</a>
        </base-cell-footer> -->
      </base-cell>
    </header>

    <div class="step-content step-content-way">
      <h5
        class="way-title"
        v-html="$t('iAccount.deposit.common.text_4', { config: getAccountHmtl(secAccountInfo) })"
      ></h5>
      <div class="way-detail">
        <h6 class="way-detail-title">{{ $t('iAccount.deposit.eBanking.text_1') }}</h6>
        <p class="way-detail-tips">{{ $t('iAccount.deposit.common.text_2') }}</p>
        <sec-way-detail-list :lists="eBankingDetail"></sec-way-detail-list>
      </div>
    </div>
  </sec-wrap>
</template>

<script>
import { mapGetters } from "vuex";
import { HKD } from "@/modules/module-iaccount/define";
import { format_Form } from "@/modules/module-iaccount/format/common";
import commonMixin from "@/modules/module-iaccount/mixins/common";

const EXAMPLE_BANK = {
  foot: [
    {
      txt: "iAccount.deposit.common.text_5",
    },
  ],
};

const EBANKING_HK = [
  {
    title: "iAccount.deposit.eBanking.text_2",
    custom: {
      value: (data, obj) => {
        const val = data.depositToAccount || {};
        return val[obj.code];
      },
      tips: (data, obj) => {
        const val = data.depositToAccount || {};
        const tempKey = obj.code + "Remark";
        return val[tempKey];
      },
    },
  },
  {
    title: "iAccount.deposit.eBanking.text_3",
    custom: {
      value: "bankName",
    },
  },
  {
    title: "iAccount.deposit.eBanking.text_17",
    custom: {
      value: "bankNameEN",
    },
  },
  {
    title: "iAccount.deposit.eBanking.text_4",
    custom: {
      value: "accountName",
      tips: "accountNameRemark",
    },
  },
  {
    title: "iAccount.deposit.eBanking.text_5",
    custom: {
      value: "swiftCode",
    },
  },
  {
    title: "iAccount.deposit.eBanking.text_6",
    custom: {
      value: "depositToBankAddress",
    },
  },
];

export default {
  mixins: [commonMixin],
  data() {
    return {
      eBankingData: EXAMPLE_BANK,
    };
  },
  created() {},
  computed: {
    ...mapGetters([
      "secAccountInfo",
      "depositCurrency",
      "depositWayInfo",
      "depositBankData",
    ]),
    eBankingDetail() {
      const { bankInfo = {} } = this.depositBankData;
      return format_Form(EBANKING_HK, bankInfo, this.depositCurrency);
    },
    getComputedLink() {
      const { tipsLinks = {} } = this.depositBankData;
      return this.depositCurrency.code === HKD
        ? tipsLinks.appWyHkd
        : tipsLinks.appWyUsd;
    },
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: "sec-remit-hk" });
    },
  },
};
</script>