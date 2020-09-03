<template>
  <op-wrap :isDisabled="submitStatus" @handleNext="submitHandler">
    <div class="olhk-step olhk-step-info-finance">
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
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import * as validForm from "./validator";
import { AO_INVEST_TARGET } from "@/modules/module-iopen/api/params-define";
import validate from "@/main/utils/format/validate";

const defaultModelExperience = {
  stocksInvestmentExperience: 0,
  warrantsInvestmentExperience: 0,
  futuresInvestmentExperience: 0,
  optionsExperience: 0,
  CCBCExperience: 0,
  otherProductsExperience: 0,
};

export default {
  mixins: [onlineMixin],
  data() {
    return {
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
        experience: this.getI18n("experience.title"),
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
      const defaultDataExperience = this.modelExperience;

      console.log(
        defaultDataExperience,
      );
      Object.keys(defaultDataExperience).forEach((val) => {
        defaultDataExperience[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModelExperience[val] !== undefined
            ? defaultModelExperience[val]
            : defaultDataExperience[val];
      });

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
  },
  mounted() {
    this.initData();
  },
}
</script>
