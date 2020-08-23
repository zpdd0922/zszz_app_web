<template>
  <op-wrap :isDisabled="submitStatus" @handleNext="submitHandler">
    <div class="olhk-step olhk-step-info-finance">
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
        <!-- 財務狀況 -->
        <cube-form-group class="step-content custom-form-group">
          <head-title :title="titleValues.financeTitle"></head-title>
          <!-- 年收入 income-->
          <cube-form-item :field="fieldsFinance[0]"></cube-form-item>
          <!-- 净资产 capital -->
          <cube-form-item :field="fieldsFinance[1]"></cube-form-item>
          <!-- 净资产 capital -->
          <cube-form-item :field="fieldsFinance[2]">
            <div
              @click.stop="handlerShowCapital"
              :class="['cube-select', {'cube-select_active': isShowCapitalList}]"
            >
              <span
                v-if="!model.capitalTxt.length"
                class="cube-select-placeholder"
              >{{fieldsFinance[2].props.placeholder}}</span>
              <span v-else class="cube-select-text">{{model.capitalTxt}}</span>
              <i class="cube-select-icon" />
            </div>
          </cube-form-item>
          <cube-form-item v-show="isShowCapitalList">
            <cube-checkbox-group
              shape="square"
              v-model="model.capital"
              :options="fieldsFinance[3].props.options"
              :col-num="3"
              class="custom-checkbox-group"
            />
          </cube-form-item>
          <!-- 投资目标 investTarge -->
          <cube-form-item :field="fieldsFinance[4]"></cube-form-item>
          <!-- 其他投资目标 investTargetOther -->
          <template v-if="isShowTargetInput">
            <cube-form-item :field="fieldsFinance[5]"></cube-form-item>
          </template>
        </cube-form-group>
        <div class="margin-bottom"></div>
      </cube-form>
      <!-- 投资经验 -->
      <cube-form :model="modelSuffer" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group class="step-content custom-form-group suffer-form-group">
          <head-title :title="titleValues.sufferTitle"></head-title>
          <cube-form-item :field="fieldsSuffer.stocksInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsSuffer.warrantsInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsSuffer.futuresInvestmentExperience"></cube-form-item>
          <cube-form-item :field="fieldsSuffer.optionsExperience"></cube-form-item>
          <cube-form-item :field="fieldsSuffer.unitTrustsExperience"></cube-form-item>
          <cube-form-item :field="fieldsSuffer.otherProductsExperience"></cube-form-item>
          <template v-if="modelSuffer.otherProductsExperience &&  modelSuffer.otherProductsExperience !== 0">
            <cube-form-item :field="fieldsSuffer.otherProductsName"></cube-form-item>
          </template>
        </cube-form-group>
        <div class="margin-bottom"></div>
      </cube-form>
      <!-- 交易頻率 -->
      <cube-form :model="modelRate" @validate="validateHandler" @submit="submitHandler">
        <cube-form-group class="step-content custom-form-group suffer-form-group">
          <head-title :title="titleValues.sufferTitle"></head-title>
          <cube-form-item :field="fieldsRate.stocksInvestmentExperience">
            <!-- <cube-select
              v-model="modelRate.stocksInvestmentExperience"
              :options="fieldsRate.stocksInvestmentExperience.props.options"
              :placeholder="fieldsRate.stocksInvestmentExperience.props.placeholder"
            ></cube-select>-->
          </cube-form-item>
          <!-- <template v-if="modelSuffer.warrantsInvestmentExperience && modelSuffer.warrantsInvestmentExperience !== 0"> -->
          <cube-form-item :field="fieldsRate.warrantsInvestmentExperience"></cube-form-item>
          <!-- </template> -->
          <!-- <template v-if="modelSuffer.futuresInvestmentExperience &&  modelSuffer.futuresInvestmentExperience !== 0"> -->
          <cube-form-item :field="fieldsRate.futuresInvestmentExperience"></cube-form-item>
          <!-- </template> -->
          <!-- <template v-if="modelSuffer.optionsExperience &&  modelSuffer.optionsExperience !== 0"> -->
          <cube-form-item :field="fieldsRate.optionsExperience"></cube-form-item>
          <!-- </template> -->
          <!-- <template v-if="modelSuffer.unitTrustsExperience &&  modelSuffer.unitTrustsExperience !== 0"> -->
          <cube-form-item :field="fieldsRate.unitTrustsExperience"></cube-form-item>
          <!-- </template> -->
          <!-- <template v-if="modelSuffer.otherProductsExperience &&  modelSuffer.otherProductsExperience !== 0"> -->
          <cube-form-item :field="fieldsRate.otherProductsExperience"></cube-form-item>
          <!-- </template> -->
        </cube-form-group>
      </cube-form>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import * as optionsList from "./options-list";
import * as validForm from "./validator";
import { AO_INVEST_TARGET } from "@/modules/module-iopen/api/params-define";
import validate from "@/main/utils/format/validate";

const defaultModel = {
  income: 1,
  assets: 2,
  capital: [1],
  investTarget: 3,
};

const defaultModelSuffer = {
  stocksInvestmentExperience: 0,
  warrantsInvestmentExperience: 0,
  futuresInvestmentExperience: 0,
  optionsExperience: 0,
  unitTrustsExperience: 0,
  otherProductsExperience: 0,
};

const defaultModelRate = {
  stocksInvestmentExperience: 1,
  warrantsInvestmentExperience: 1,
  futuresInvestmentExperience: 1,
  optionsExperience: 1,
  unitTrustsExperience: 1,
  otherProductsExperience: 1,
};

export default {
  data() {
    return {
      validity: {},
      valid: undefined,
      msg: "",
      stockBlur: false,
      realBlur: false,
      isShowCapitalList: false,
      model: {
        income: "", // 年收入
        assets: "", // 净资产管
        capitalTxt: "",
        capital: [],
        investTarget: "",
        investTargetOther: "",
      },
      modelSuffer: {
        stocksInvestmentExperience: "",
        warrantsInvestmentExperience: "",
        futuresInvestmentExperience: "",
        optionsExperience: "",
        unitTrustsExperience: "",
        otherProductsExperience: "",
        otherProductsName: "",
      },
      modelRate: {
        stocksInvestmentExperience: "",
        warrantsInvestmentExperience: "",
        futuresInvestmentExperience: "",
        optionsExperience: "",
        unitTrustsExperience: "",
        otherProductsExperience: "",
      },
      // 财务状况
      fieldsFinance: [
        {
          type: "select",
          modelKey: "income",
          label: this.$t("iOpen.openHk.infoFinance.finance.income.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.finance.income.placeholder"
            ),
            options: optionsList.incomeOptions,
          },
          rules: {
            required: false,
          },
        },
        {
          type: "select",
          modelKey: "assets",
          label: this.$t("iOpen.openHk.infoFinance.finance.assets.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.finance.assets.placeholder"
            ),
            options: optionsList.assetsOptions,
          },
          rules: {
            required: false,
          },
        },
        {
          type: "input",
          modelKey: "capitalTxt",
          label: this.$t(
            "openAccount.openHk.infoFinance.finance.capital.label"
          ),
          props: {
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.finance.capital.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        {
          type: "checkbox-group",
          modelKey: "capital",
          props: {
            options: optionsList.capitalOptions,
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
        {
          type: "select",
          modelKey: "investTarget",
          label: this.$t(
            "openAccount.openHk.infoFinance.finance.investTarget.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.finance.investTarget.placeholder"
            ),
            options: optionsList.investmentOptions,
          },
          rules: {
            required: false,
          },
        },
        {
          type: "input",
          modelKey: "investTargetOther",
          label: this.$t(
            "openAccount.openHk.infoFinance.finance.investTargetOther.label"
          ),
          props: {
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.finance.investTargetOther.placeholder"
            ),
          },
          rules: { required: false, maxlength: 50 },
        },
      ],
      // 投资经验
      fieldsSuffer: {
        stocksInvestmentExperience: {
          type: "select",
          modelKey: "stocksInvestmentExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.stocksInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.stocksInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        warrantsInvestmentExperience: {
          type: "select",
          modelKey: "warrantsInvestmentExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.warrantsInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.warrantsInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        futuresInvestmentExperience: {
          type: "select",
          modelKey: "futuresInvestmentExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.futuresInvestmentExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.futuresInvestmentExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        optionsExperience: {
          type: "select",
          modelKey: "optionsExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.optionsExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.optionsExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        unitTrustsExperience: {
          type: "select",
          modelKey: "unitTrustsExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.unitTrustsExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.unitTrustsExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        otherProductsExperience: {
          type: "select",
          modelKey: "otherProductsExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.otherProductsExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.otherProductsExperience.placeholder"
            ),
            options: optionsList.yearOptions,
          },
          rules: {
            required: false,
          },
        },
        otherProductsName: {
          type: "input",
          modelKey: "otherProductsName",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.otherProductsName.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.otherProductsName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
      },
      // 投资頻率
      fieldsRate: {
        stocksInvestmentExperience: {
          type: "select",
          modelKey: "stocksInvestmentExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.stocksInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.stocksInvestmentExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
        warrantsInvestmentExperience: {
          type: "select",
          modelKey: "warrantsInvestmentExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.warrantsInvestmentExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.warrantsInvestmentExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
        futuresInvestmentExperience: {
          type: "select",
          modelKey: "futuresInvestmentExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.futuresInvestmentExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.futuresInvestmentExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
        optionsExperience: {
          type: "select",
          modelKey: "optionsExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.optionsExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.optionsExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
        unitTrustsExperience: {
          type: "select",
          modelKey: "unitTrustsExperience",
          label: this.$t("iOpen.openHk.infoFinance.suffer.unitTrustsExperience.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.unitTrustsExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
        otherProductsExperience: {
          type: "select",
          modelKey: "otherProductsExperience",
          label: this.$t(
            "openAccount.openHk.infoFinance.suffer.otherProductsExperience.label"
          ),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.$t(
              "openAccount.openHk.infoFinance.suffer.otherProductsExperience.placeholder"
            ),
            options: optionsList.tradeOptions,
          },
          rules: {
            required: false,
          },
        },
      },

      options: {
        scrollToInvalidField: true,
        layout: "standard", // classic fresh
      },
    };
  },
  computed: {
    ...mapGetters(["openInfo", "openIndustry"]),
    step() {
      return this.$route.meta.step;
    },
    nextStep() {
      return this.$route.meta.nextStep;
    },
    isShowTargetInput() {
      // 投资目标选择其他时候显示输入框 | 6: 代表其他
      // return false;
      return this.model.investTarget === 6;
    },
    // 返回title
    titleValues() {
      return {
        financeTitle: this.$t("iOpen.openHk.infoFinance.finance.title"),
        sufferTitle: this.$t("iOpen.openHk.infoFinance.suffer.title"),
      };
    },
    // 验证财务信息
    validCapital() {
      const data = this.model;
      const status = validForm.capitalValidator.map((val) => {
        const item = data[val];
        console.log(val, item);
        if (typeof item === "object") {
          return Boolean(item.length);
        }
        return Boolean(item);
      });
      return !status.includes(false);
    },
    // 投资经验
    validSuffer() {
      const {
        stocksInvestmentExperience,
        warrantsInvestmentExperience,
        futuresInvestmentExperience,
        optionsExperience,
        unitTrustsExperience,
        otherProductsExperience,
        otherProductsName = "",
      } = this.modelSuffer;
      if (
        (stocksInvestmentExperience || stocksInvestmentExperience === 0) &&
        (warrantsInvestmentExperience || warrantsInvestmentExperience === 0) &&
        (futuresInvestmentExperience || futuresInvestmentExperience === 0) &&
        (optionsExperience || optionsExperience === 0) &&
        (unitTrustsExperience || unitTrustsExperience === 0) &&
        !(otherProductsExperience && otherProductsExperience !== 0 && otherProductsName.trim() === "")
      ) {
        return true;
      }
      return false;
    },
    // 验证提交按钮
    submitStatus() {
      const status = this.validCapital && this.validSuffer;
      return !status;
    },
  },
  methods: {
    handlerShowCapital() {
      this.isShowCapitalList = !this.isShowCapitalList;
    },
    // 数据回填
    initData() {
      const userInfo = this.openInfo;
      const defaultData = this.model;
      const defaultDataRate = this.modelRate;
      const defaultDataSuffer = this.modelSuffer;
      // 初始化重置数据
      Object.keys(defaultData).forEach((val) => {
        defaultData[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModel[val] !== undefined
            ? defaultModel[val]
            : defaultData[val];
      });

      Object.keys(defaultDataSuffer).forEach((val) => {
        defaultDataSuffer[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModelSuffer[val] !== undefined
            ? defaultModelSuffer[val]
            : defaultDataSuffer[val];
      });

      Object.keys(defaultDataRate).forEach((val) => {
        defaultDataRate[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModelRate[val] !== undefined
            ? defaultModelRate[val]
            : defaultDataRate[val];
      });
    },
    // 下一步
    submitHandler(e) {
      e.preventDefault();
      // 保存数据&下一步
      const params = {
        step: this.step,
        info: this.model,
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
    async fetchDataDesin() {
      const result = await this.$store.dispatch(
        "getDictionary",
        AO_INVEST_TARGET
      );
      // this.model.investTarget = result.map(v => v.value)
      this.fieldsFinance[4].props.options = result.map((res) => ({
        text: res.name,
        value: res.value,
      }));
    },
  },
  watch: {
    "model.capital"(newVal, oldVal) {
      let capitalTxt = "";
      this.fieldsFinance[3].props.options.forEach((item) => {
        if (newVal.includes(item.value)) {
          capitalTxt += capitalTxt === "" ? item.label : `、${item.label}`;
        }
      });
      this.model.capitalTxt = capitalTxt;
    },
    "modelSuffer.stocksInvestmentExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.stocksInvestmentExperience = 0;
      }
    },
    "modelSuffer.warrantsInvestmentExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.warrantsInvestmentExperience = 0;
      }
    },
    "modelSuffer.futuresInvestmentExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.futuresInvestmentExperience = 0;
      }
    },
    "modelSuffer.optionsExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.optionsExperience = 0;
      }
    },
    "modelSuffer.unitTrustsExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.unitTrustsExperience = 0;
      }
    },
    "modelSuffer.otherProductsExperience"(newVal, oldVal) {
      if (newVal === 0) {
        this.modelRate.otherProductsExperience = 0;
      }
    },
  },
  created() {
    // this.fetchDataDesin();
    // this.fetchOptionsIndustry();
    // this.showRetire();
  },
  mounted() {
    this.initData();
  },
};
</script>


