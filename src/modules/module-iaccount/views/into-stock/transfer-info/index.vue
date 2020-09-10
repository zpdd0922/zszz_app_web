<template>
  <op-wrap :isDisabled="isDisabled" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-finance">
      <!-- 转出方信息 -->
      <cube-form-group class="step-content custom-form-group experience-form-group">
          <!-- 转出方信息 -->
        <cube-form :model="transferOutInfoModel">
          <head-title :title="titleValues.transferOut"></head-title>
          <cube-form-item :field="fieldsTransferOut.transferOutCompany"></cube-form-item>
          <cube-form-item :field="fieldsTransferOut.transferOutAccount"></cube-form-item>
          <cube-form-item :field="fieldsTransferOut.transferOutName"></cube-form-item>
          <template
            v-if="transferOutInfoModel.otherProductsExperience &&  modelExperience.otherProductsExperience !== 0"
          >
            <cube-form-item :field="fieldsExperience.otherProductsName"></cube-form-item>
          </template>
          <div class="tips"></div>
          <div class="tips"></div>
        </cube-form>
          <!-- 接收方信息 -->
        <cube-form :model="recieverInfoModel">
          <head-title :title="titleValues.reciever"></head-title>
          <div></div>
          <cube-form-item :field="recieverInfoModel.recieverCompany"></cube-form-item>
          <cube-form-item :field="recieverInfoModel.recieverAccount"></cube-form-item>
        </cube-form>
      </cube-form-group>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import validate from "@/main/utils/format/validate";

// const defaultModelExperience = {
//   stocksInvestmentExperience: 0,
//   warrantsInvestmentExperience: 0,
//   futuresInvestmentExperience: 0,
//   optionsExperience: 0,
//   CCBCExperience: 0,
//   otherProductsExperience: 0,
// };

export default {
  mixins: [onlineMixin],
  data() {
    return {
      validity: {},
      valid: undefined,
      // isShowCapitalList: false,
      transferOutInfoModel: {
        transferOutCompany: '',
        transferOutAccount: '',
        otherTransferOutCompanyName: '',
        numberOfCCASS: '',
        contactName: '',
        contactPhone: '',
      },
      recieverInfoModel: {

      },

      // 转出方信息
      fieldsTransferOut: {
        // 转出券商名字
        transferOutCompany: {
          type: "select",
          modelKey: "transferOutCompany",
          label: this.getI18n("transferOutInfo.transferOutCompany.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "transferOutInfo.transferOutCompany.placeholder"
            ),
            options: optionsList.companyOptions(),
          },
          rules: {
            required: false,
          },
        },
        // 账户号码
        transferOutAccount: {
          type: "input",
          modelKey: "transferOutAccount",
          label: this.getI18n("transferOutInfo.transferOutAccount.label"),
          props: {
            // title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutAccount.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        // 账户姓名
        transferOutName: {
          type: "input",
          modelKey: "transferOutName",
          label: this.getI18n("experience.transferOutAccount.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutInfo.transferOutName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //其他券商名字
        otherTransferOutCompanyName: {
          type: "input",
          modelKey: "otherTransferOutCompanyName",
          label: this.getI18n("experience.otherProductsName.label"),
          props: {
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        otherCompanyName: {
          type: "input",
          modelKey: "otherProductsName",
          label: this.getI18n("experience.otherProductsName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        otherCompanyName: {
          type: "input",
          modelKey: "otherProductsName",
          label: this.getI18n("experience.otherProductsName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        otherCompanyName: {
          type: "input",
          modelKey: "otherProductsName",
          label: this.getI18n("experience.otherProductsName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },

      },
      //接收方信息
      recieverInfoModel: {
        recieverCompany: {
          type: "input",
          modelKey: "transferOutAccount",
          label: this.getI18n("experience.transferOutAccount.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        recieverAccount: {
          type: "input",
          modelKey: "transferOutAccount",
          label: this.getI18n("experience.transferOutAccount.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
      },
    };
  },
  computed: {
    // 返回title
    titleValues() {
      return {
        transferOut: this.getI18n("transferOutInfo.title"),
        reciever: this.getI18n("recieverInfo.title"),
      };
    },
    // 投资经验
    validExperience() {
      const {
        stocksInvestmentExperience,
        warrantsInvestmentExperience,
        futuresInvestmentExperience,
        optionsExperience,
        CCBCExperience,
        otherProductsExperience,
        otherProductsName = "",
      } = this.modelExperience;
      if (
        (stocksInvestmentExperience || stocksInvestmentExperience === 0) &&
        (warrantsInvestmentExperience || warrantsInvestmentExperience === 0) &&
        (futuresInvestmentExperience || futuresInvestmentExperience === 0) &&
        (optionsExperience || optionsExperience === 0) &&
        (CCBCExperience || CCBCExperience === 0) &&
        !(
          otherProductsExperience &&
          otherProductsExperience !== 0 &&
          otherProductsName.trim() === ""
        )
      ) {
        return true;
      }
      return false;
    },
    // 验证提交按钮
    submitStatus() {
      const status = this.validExperience;
      return !status;
    },
  },
  methods: {
    getI18n(key) {
      return this.$t(`iaccount.intoStock.transferInfo.${key}`);
    },
    handlerShowCapital() {
      this.isShowCapitalList = !this.isShowCapitalList;
    },
    // 数据回填
    initData() {
      const userInfo = this.openInfo;
      // const defaultDataTrade = this.modelTrade;
      const defaultDataExperience = this.modelExperience;

      console.log(
        // defaultDataTrade,
        defaultDataExperience,
        // userInfo.tradeStockFrequency
      );
      Object.keys(defaultDataExperience).forEach((val) => {
        defaultDataExperience[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModelExperience[val] !== undefined
            ? defaultModelExperience[val]
            : defaultDataExperience[val];
      });

      // Object.keys(defaultDataTrade).forEach((val) => {
      //   defaultDataTrade[val] =
      //     userInfo[val] !== undefined
      //       ? userInfo[val]
      //       : defaultModelTrade[val] !== undefined
      //       ? defaultModelTrade[val]
      //       : defaultDataTrade[val];
      // });
    },
    // 下一步
    submitHandler(e) {
      e.preventDefault();
      // 保存数据&下一步
      const params = {
        step: this.step,
        info: {...this.modelExperience},
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    // 获取后台数据字典
    // async fetchDataDesin() {
    //   const result = await this.$store.dispatch(
    //     "getDictionary",
    //     AO_INVEST_TARGET
    //   );
    //   // this.model.investTarget = result.map(v => v.value)
    //   this.fieldsFinance[4].props.options = result.map((res) => ({
    //     text: res.name,
    //     value: res.value,
    //   }));
    // },
  },
  // watch: {
  //   "modelExperience.stocksInvestmentExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeStockFrequency = 0;
  //     }
  //   },
  //   "modelExperience.warrantsInvestmentExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeWarrantsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.futuresInvestmentExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeFuturesFrequency = 0;
  //     }
  //   },
  //   "modelExperience.optionsExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeOptionsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.CCBCExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeUnitTrustsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.otherProductsExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeOtherProductsFrequency = 0;
  //     }
  //   },
  // },
  created() {},
  mounted() {
    this.initData();
  },
};
</script>


