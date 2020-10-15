<template>
  <div class="add-limit-wrap">
    <ul class="step-content limit-current-box">
      <li class="limit-current-item" v-if="isOpenHkMarket">
        <span class="name">{{ getI18n("loanLimit.hk.currentName") }}</span>
        <div class="content">
          <span class="num">{{ (loanLimitValue.hk || 0) | formatMoney }}</span>
          <span class="unit">{{ getI18n("loanLimit.hk.curreny") }}</span>
        </div>
      </li>
      <li class="limit-current-item" v-if="isOpenUsaMarket">
        <span class="name">{{ getI18n("loanLimit.us.currentName") }}</span>
        <div class="content">
          <span class="num">{{ (loanLimitValue.us || 0) | formatMoney }}</span>
          <span class="unit">{{ getI18n("loanLimit.us.curreny") }}</span>
        </div>
      </li>
      <li class="limit-current-item" v-if="isOpenCnMarket">
        <p class="name">{{ getI18n("loanLimit.cn.currentName") }}</p>
        <div class="content">
          <span class="num">{{ (loanLimitValue.cn || 0) | formatMoney }}</span>
          <span class="unit">{{ getI18n("loanLimit.cn.curreny") }}</span>
        </div>
      </li>
    </ul>
    <div class="margin-bottom"></div>
    <!-- <div class="step-content limit-next-box">
      <header class="title">{{ getI18n("canLimit.title") }}</header>
      <ul class="limit-next-content">
        <li class="limit-next-item" v-if="isOpenHkMarket">
          <p class="name">{{ getI18n("loanLimit.hk.nextName") }}</p>
          <div class="content">
            <span class="num">{{ loanLimitNextValue.hk | formatMoney }}</span>
            <span class="unit">{{ getI18n("loanLimit.hk.curreny") }}</span>
          </div>
        </li>
        <li class="limit-next-item" v-if="isOpenUsaMarket">
          <p class="name">{{ getI18n("loanLimit.us.nextName") }}</p>
          <div class="content">
            <span class="num">{{ loanLimitNextValue.hk | formatMoney }}</span>
            <span class="unit">{{ getI18n("loanLimit.us.curreny") }}</span>
          </div>
        </li>
        <li class="limit-next-item" v-if="isOpenCnMarket">
          <p class="name">{{ getI18n("loanLimit.cn.nextName") }}</p>
          <div class="content">
            <span class="num">{{ loanLimitNextValue.hk | formatMoney }}</span>
            <span class="unit">{{ getI18n("loanLimit.cn.curreny") }}</span>
          </div>
        </li>
      </ul>
    </div>
    <div class="margin-bottom"></div> -->
    <div class="step-content limit-trdpwd-box">
      <div class="">
        <label for="tradePwd">{{ getI18n("tradePwd.label") }}</label>
        <input
          type="password"
          :placeholder="getI18n('tradePwd.placeholder')"
          name="tradePwd"
          v-model="tradePwd"
        />
      </div>
    </div>
    <div class="limit-agree-box">
      <cube-checkbox v-model="checked">
        <span>{{ getI18n("agreement.linkStart") }}</span>
        <a :href="addLimitAgreement.href" class="base-links">《{{
          addLimitAgreement.content
        }}》</a>
        {{ getI18n("agreement.linkEnd") }}
      </cube-checkbox>
    </div>

    <footer class="footer">
      <div class="btn-wrap">
        <cube-button :disabled="!isCanNext" @click="handleNext">{{
          getI18n("nextBtn")
        }}</cube-button>
      </div>
      <div class="record" @click="goToHistory">
        {{ getI18n("record") }}
      </div>
      <div class="tips">
        <h3>{{ getI18n("tips.title") }}</h3>
        <ol tag="ol">
          <li v-for="(item, index) in getI18n('tipsList')" :key="index">
            {{ item }}
          </li>
        </ol>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getURLParameters } from "@/main/utils/format/url";
import { toast } from "@/main/utils/common/tips/";
// import tipsList from ''
// import {
//   curLimitList,
//   canLimitList,
// } from "@/modules/module-iaccount/views/add-limit/stock-list";
import { formatMoney } from "@/modules/module-iaccount/utils/number";
import validate from "@/main/utils/format/validate";
import {agreementsData} from './risk';

export default {
  data() {
    return {
      //交易密码
      tradePwd: null,
      //当前额度
      defaultNextLimitHk: 200000,
      loanLimitValue: {
        hk: "0.00",
        us: "0.00",
        cn: "0.00",
      },
      loanLimitNextValue: {
        hk: "0.00",
        us: "0.00",
        cn: "0.00",
      },
      marketMap: {
        0: "cn",
        1: "us",
        2: "hk",
      },
      //可以提升的额度
      canLimit: 200000,
      //同意协议
      checked: false,
    };
  },

  filters: {
    formatMoney,
  },
  created() {
    // this.$store.dispatch("getMarginLoanLimitInfo");
    this.init();
    this.setTitle(this.$t("iAccount.addLimit.pageName"));
  },
  computed: {
    ...mapGetters(["secAccountInfo"]),
    addLimitAgreement() {
      if (this.$t('language') === "zh_CN") {
        return agreementsData.zh_CN.addLimit;
      }
      return agreementsData.zh_HK.addLimit;
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
    isCanNext() {
      return this.checked && this.tradePwd && this.tradePwd.length > 0;
    },
    isCanSend() {
      return this.openAccountNum && this.openAccountNum.length > 1;
    },
    formList() {
      if (this.isShowImgCaptcha) {
        return {
          certCode: {
            placeholder: this.$t("doubleCheck.formPlaceholder.accountMobile"),
            type: "phone",
            handleSetCountry: this.handleSetCountry,
          },
          captcha: {
            placeholder: this.$t("doubleCheck.formPlaceholder.captcha"),
            type: "code",
            isCanSend: this.isCanSend,
            handleCheckTrue: this.handleCheckTrue,
            handleSendCode: this.handleSendCode,
          },
          captchaImg: {
            placeholder: this.$t("doubleCheck.formPlaceholder.imgCaptcha"),
            type: "captcha",
            captchaSrc: this.captchaImgUrl,
            handleCaptchaSrc: () => {
              this.captchaImgUrl = defaultSrc + +new Date();
            },
          },
        };
      }
      return {
        captcha: {
          placeholder: this.$t("doubleCheck.captchaPlaceholder"),
          type: "code",
          isCanSend: this.isCanSend,
          handleCheckTrue: this.handleCheckTrue,
          handleSendCode: this.handleSendCode,
        },
      };
    },
  },
  methods: {
    ...mapActions(["getMarginLoanLimitInfo"]),
    init() {
      this.getMarginLoanLimitInfo({ fundAccount: this.marginAccount }).then(
        (res) => {
          res.map((item) => {
            const { moneyType = "", maxExposure = "0" } = item;
            const key = this.marketMap[moneyType];
            if (key) {
              this.loanLimitValue[key] = maxExposure;
            }
          });
        }
      );
    },
    getI18n(key) {
      return this.$t(`iAccount.addLimit.${key}`);
    },
    validatePwd() {
      return validate.isTradePwd(this.tradePwd);
    },
    // 处理提交
    handleNext() {
      if (!this.validatePwd()) {
        toast({
          type: "txt",
          txt: this.getI18n("warn.badPwd"),
          time: 1000,
        });
        return;
      }
      const lineCreditInfo = [];
      if(this.isOpenCnMarket){
        lineCreditInfo.push({
          moneyType: 0,
          lineCreditBefore: this.loanLimitValue.cn
        })
      }
      if(this.isOpenHkMarket){
        lineCreditInfo.push({
          moneyType: 2,
          lineCreditBefore: this.loanLimitValue.hk
        })
      }
      if(this.isOpenUsaMarket){
        lineCreditInfo.push({
          moneyType: 1,
          lineCreditBefore: this.loanLimitValue.us
        })
      }

      const data = {
        fundAccount: this.marginAccount,
        tradePwd: this.tradePwd,
        lineCreditInfo:lineCreditInfo,
      };
      this.$store.dispatch("submitAddLimit", data).then((res) => {
        if (res) {
          toast({
            type: 'txt',
            txt: this.getI18n('warn.submitSuccess'),
            time: 1000,
            callback: () => {
              this.$router.push("/")             
            }
          })
        }
      });
    },
    // 处理跳转协议
    // handleToAgreement() {
    //   return;
    // },
    //跳转历史记录页面
    goToHistory() {
      this.$router.push({ name: "add-limit-history" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
