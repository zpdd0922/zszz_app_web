<template>
  <op-wrap :isDisabled="submitStatus" @handleNext="submitHandler">
    <div class="olcn-step olcn-step-info-finance">
      <!-- 投资经验 -->
      <cube-form :model="modelExperience" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group class="step-content custom-form-group experience-form-group">
          <head-title :title="titleValues.experience"></head-title>
          <cube-form-item :field="fieldsExperience.stocksInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsExperience.warrantsInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsExperience.optionsExperience"></cube-form-item>
          <cube-form-item :field="fieldsExperience.futuresInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsExperience.CCBCExperience"></cube-form-item>
          <cube-form-item :field="fieldsExperience.otherProductsExperience"></cube-form-item>
          <template
            v-if="modelExperience.otherProductsExperience &&  modelExperience.otherProductsExperience !== 0"
          >
            <cube-form-item :field="fieldsExperience.otherProductsName"></cube-form-item>
          </template>
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
      <!-- 交易頻率 -->
      <!-- <cube-form :model="modelTrade" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group class="step-content custom-form-group experience-form-group">
          <head-title :title="titleValues.trade"></head-title>
          <cube-form-item :field="fieldsTrade.tradeStockFrequency"> -->
            <!-- <cube-select
              v-model="modelTrade.tradeStockFrequency"
              :options="fieldsTrade.tradeStockFrequency.props.options"
              :placeholder="fieldsTrade.tradeStockFrequency.props.placeholder"
            ></cube-select>-->
          <!-- </cube-form-item> -->
          <!-- <template v-if="modelExperience.warrantsInvestmentExperience && modelExperience.warrantsInvestmentExperience !== 0"> -->
          <!-- <cube-form-item :field="fieldsTrade.tradeWarrantsFrequency"></cube-form-item> -->
          <!-- </template> -->
          <!-- <template v-if="modelExperience.optionsExperience &&  modelExperience.optionsExperience !== 0"> -->
          <!-- <cube-form-item :field="fieldsTrade.tradeOptionsFrequency"></cube-form-item> -->
          <!-- </template> -->
          <!-- <template v-if="modelExperience.futuresInvestmentExperience &&  modelExperience.futuresInvestmentExperience !== 0"> -->
          <!-- <cube-form-item :field="fieldsTrade.tradeFuturesFrequency"></cube-form-item> -->
          <!-- </template> -->
          <!-- <template v-if="modelExperience.CCBCExperience &&  modelExperience.CCBCExperience !== 0"> -->
          <!-- <cube-form-item :field="fieldsTrade.tradeUnitTrustsFrequency"></cube-form-item> -->
          <!-- </template> -->
          <!-- <template v-if="modelExperience.otherProductsExperience &&  modelExperience.otherProductsExperience !== 0"> -->
          <!-- <cube-form-item :field="fieldsTrade.tradeOtherProductsFrequency"></cube-form-item> -->
          <!-- </template> -->
        <!-- </cube-form-group> -->
      <!-- </cube-form> -->
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import validate from "@/main/utils/format/validate";
import { MAX_LENGTH } from "@/modules/module-iopen/enums/maxLength";

const defaultModelExperience = {
  stocksInvestmentExperience: 0,
  warrantsInvestmentExperience: 0,
  futuresInvestmentExperience: 0,
  optionsExperience: 0,
  CCBCExperience: 0,
  otherProductsExperience: 0,
};

// const defaultModelTrade = {
//   tradeStockFrequency: 1,
//   tradeWarrantsFrequency: 1,
//   tradeFuturesFrequency: 1,
//   tradeOptionsFrequency: 1,
//   tradeUnitTrustsFrequency: 1,
//   tradeOtherProductsFrequency: 1,
// };

export default {
  mixins: [onlineMixin],
  data() {
    return {
      maxLength: MAX_LENGTH,
      validity: {},
      valid: undefined,
      isShowCapitalList: false,
      modelExperience: {
        stocksInvestmentExperience: "",
        warrantsInvestmentExperience: "",
        futuresInvestmentExperience: "",
        optionsExperience: "",
        CCBCExperience: "",
        otherProductsExperience: "",
        otherProductsName: "",
      },
      // modelTrade: {
      //   tradeStockFrequency: "",
      //   tradeWarrantsFrequency: "",
      //   tradeFuturesFrequency: "",
      //   tradeOptionsFrequency: "",
      //   tradeUnitTrustsFrequency: "",
      //   tradeOtherProductsFrequency: "",
      // },
      // 投资经验
      fieldsExperience: {
        stocksInvestmentExperience: {
          type: "select",
          modelKey: "stocksInvestmentExperience",
          label: this.getI18n("experience.stocksInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.stocksInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        warrantsInvestmentExperience: {
          type: "select",
          modelKey: "warrantsInvestmentExperience",
          label: this.getI18n("experience.warrantsInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.warrantsInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        futuresInvestmentExperience: {
          type: "select",
          modelKey: "futuresInvestmentExperience",
          label: this.getI18n("experience.futuresInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.futuresInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        optionsExperience: {
          type: "select",
          modelKey: "optionsExperience",
          label: this.getI18n("experience.optionsExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.optionsExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        CCBCExperience: {
          type: "select",
          modelKey: "CCBCExperience",
          label: this.getI18n("experience.CCBCExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.CCBCExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        otherProductsExperience: {
          type: "select",
          modelKey: "otherProductsExperience",
          label: this.getI18n("experience.otherProductsExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "experience.otherProductsExperience.placeholder"
            ),
            options: optionsList.yearOptions(),
          },
          rules: {
            required: false,
          },
        },
        otherProductsName: {
          type: "input",
          modelKey: "otherProductsName",
          label: this.getI18n("experience.otherProductsName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "experience.otherProductsName.placeholder"
            ),
            maxlength: MAX_LENGTH.FIFTY,
          },
          rules: {
            required: false,
          },
        },
      },
      // 投资頻率
      // fieldsTrade: {
      //   tradeStockFrequency: {
      //     type: "select",
      //     modelKey: "tradeStockFrequency",
      //     label: this.getI18n("trade.tradeStockFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n("trade.tradeStockFrequency.placeholder"),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },  
      //   tradeWarrantsFrequency: {
      //     type: "select",
      //     modelKey: "tradeWarrantsFrequency",
      //     label: this.getI18n("trade.tradeWarrantsFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n(
      //         "trade.tradeWarrantsFrequency.placeholder"
      //       ),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      //   tradeFuturesFrequency: {
      //     type: "select",
      //     modelKey: "tradeFuturesFrequency",
      //     label: this.getI18n("trade.tradeFuturesFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n(
      //         "trade.tradeFuturesFrequency.placeholder"
      //       ),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      //   tradeOptionsFrequency: {
      //     type: "select",
      //     modelKey: "tradeOptionsFrequency",
      //     label: this.getI18n("trade.tradeOptionsFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n(
      //         "trade.tradeOptionsFrequency.placeholder"
      //       ),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      //   tradeUnitTrustsFrequency: {
      //     type: "select",
      //     modelKey: "tradeUnitTrustsFrequency",
      //     label: this.getI18n("trade.tradeUnitTrustsFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n(
      //         "trade.tradeUnitTrustsFrequency.placeholder"
      //       ),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      //   tradeOtherProductsFrequency: {
      //     type: "select",
      //     modelKey: "tradeOtherProductsFrequency",
      //     label: this.getI18n("trade.tradeOtherProductsFrequency.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n(
      //         "trade.tradeOtherProductsFrequency.placeholder"
      //       ),
      //       options: optionsList.tradeOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      // },
    };
  },
  computed: {
    // 返回title
    titleValues() {
      return {
        experience: this.getI18n("experience.title"),
        // trade: this.getI18n("trade.title"),
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
      return this.getStepI18nValue("infoExperience", key);
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


