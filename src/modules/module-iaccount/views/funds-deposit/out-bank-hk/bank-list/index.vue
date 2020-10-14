<template>
  <div class="bank-list">
    <sec-part-list :isLink="true" :list="bank_CMBCHK" @clickItem="_clickBank"></sec-part-list>

    <div class="step-content">
      <sec-part-list
        class="list-wrap"
        :isLink="true"
        :list="optionsBank"
        :alias="{title: 'name', img: 'appBanklogo'}"
        @clickItem="_clickBank"
      ></sec-part-list>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {
  FPS,
  EBANK,
  CHECK,
  CMBC_HK,
  CMB_WLB,
} from "@/modules/module-iaccount/define";
import * as tips from "@/main/utils/common/tips";
import commonMixin from "@/modules/module-iaccount/mixins/common";
import { format_DepositFPS } from "@/modules/module-iaccount/format/deposit";
import { formatToDBC } from "@/modules/module-iaccount/utils/format";
import SecApi from "@/modules/module-iaccount/api/modules/api-sec";

export default {
  mixins: [commonMixin],
  data() {
    return {
      optionsBank: [],
      myBank: [],
      fpsTip: {},
    };
  },
  created() {
    this._fetchBankUser();
    this._fetchBankList();
  },
  computed: {
    ...mapGetters(["secAccountInfo", "depositCurrency", "depositBankType"]),
    bank_CMBCHK() {
      return [
        // {
        //   value: CMBC_HK,
        //   title: this.$t('iAccount.deposit.bank_list.cmbchk'),
        //   symbol: this.$t('iAccount.deposit.cmbchk.text_1'),
        //   icon: 'cmbc_logo'
        // },
        // {
        //   value: CMB_WLB,
        //   title: this.$t('iAccount.deposit.bank_list.cmbwlb'),
        //   symbol: this.$t('iAccount.deposit.cmbwlb.text_1'),
        //   icon: 'cmb_wlb_logo'
        // }
      ];
    },
  },
  methods: {
    // 请求用户已绑定银行卡 - 香港卡
    _fetchBankUser() {
      // const { fundAccount = [] } = this.secAccountInfo;
      SecApi.depositBank({
        bankType: this.$t("iAccount.define.BANK_HK").value,
        // fundAccount: fundAccount[0],
      }).then((res) => {
        this.myBank = res || [];
      });
    },
    // 请求香港银行卡列表
    _fetchBankList() {
      SecApi.bankListDeposit({
        bankType: this.$t("iAccount.define.BANK_HK").value,
      }).then((res) => {
        this.optionsBank = res || [];
      });
    },
    // 点击入金银行
    _clickBank(item) {
      if (item.value === CMBC_HK) {
        this.$router.push({ name: "cmbc-hk" });
      } else if (item.value === CMB_WLB) {
        this.$router.push({ name: "cmbwlb-hk" });
      } else {
        this._judgeLimitBank(item);
      }
    },
    _judgeLimitBank(item) {
      console.log(item, this.myBank);
      // 是否是历史入金银行 - 并找出该银行
      const his_bank = this.myBank.find((bank) => {
        const isSomeName =
          formatToDBC(bank.bankName) === formatToDBC(item.name);
        const isSomeCode = bank.bankCode === item.key;
        const isSomeType = bank.bankType === this.depositBankType.value;
        return (isSomeName || isSomeCode) && isSomeType;
      });
      // console.log('his_bank', his_bank)
      // // 是否超过入金银行数量限制
      // const isLimit = !his_bank && this.myBank.length >= LIMIT_BANK
      // console.log('isLimit', isLimit)
      // // 超过限制 - 前往解绑
      // if (isLimit) {
      //   tips.confirm({
      //     confirmTxt: this.$t('iAccount.common.text_17'),
      //     cancelTxt: this.$t('iAccount.common.text_3'),
      //     content: this.$t('iAccount.my_bank.text_13'),
      //     onConfirm: () => {
      //       this.$router.push({ name: 'my-bank' })
      //     }
      //   })
      //   return false
      // }

      // 处理其是否选中历史入金银行
      this.$store.dispatch("setDepositBankHis", his_bank);
      // 选择入金银行
      this.$store.dispatch("selectBankItem", item);
      // 判断入金方式
      this._judgeDepositWay(item);
    },
    // 处理入金方式 - 仅一种直接进入相应页面
    async _judgeDepositWay(bank) {
      const deposit_way = this.$t("iAccount.define.DEPOSIT_WAY");
      const ways = await this.judgeDepositWay(
        bank.supportType,
        this.depositCurrency
      );
      const waysOption = Object.values(deposit_way).filter((item) =>
        ways.includes(item.code)
      );
      console.log("香港卡 => 入金方式", waysOption);
      if (!waysOption.length) {
        tips.jfDialog({
          content: this.$t("iAccount.deposit.ways.text_13"),
        });
        return false;
      }
      if (waysOption.length === 1) {
        // 存在fps，额外接口获取信息
        if (ways.includes(deposit_way[FPS].code)) {
          const params = {
            depositType: deposit_way[FPS].code,
            bankType: this.depositBankType.value,
            key: bank.key,
          };
          const res = await SecApi.typeSettingInfo(params);
          this.fpsTip = format_DepositFPS(res)[0];
        }
        this._gotoDetail(bank, waysOption);
      } else {
        this.$router.push({ name: "sec-ways-hk" });
      }
    },
    // 处理不同入金方式收款信息
    _gotoDetail(bank, waysOption) {
      let params;
      const wayInfo = waysOption[0];
      switch (wayInfo.value) {
        case FPS:
          params = this.fpsTip;
          break;
        case EBANK:
          params = bank;
          break;
        case CHECK:
          params = this.$t("iAccount.define.CHECK_INFO");
          break;
      }
      console.log("object", params);
      this.$store.dispatch("setWayInfo", params);
      this.$store.dispatch("selectWay", wayInfo).then(() => {
        // const name = (`${wayInfo.value}-hk`).toLowerCase()
        // const name = `${wayInfo.value}Hk`;
        const name = `sec-${wayInfo.value.toLowerCase()}-hk`
        this.$router.push({ name: name });
      });
    },
  },
};
</script>