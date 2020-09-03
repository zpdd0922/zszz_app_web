<template>
  <op-wrap :isDisabled="submitStatus" @handleNext="submitHandler">
    <div class="olcn-step olcn-step-info-finance">
      <cube-form :model="model" @validate="validateHandler" @submit="submitHandler">
        <!-- 財務狀況 -->
        <cube-form-group class="step-content custom-form-group">
          <head-title :title="titleValues.finance"></head-title>
          <!-- 年收入 income-->
          <cube-form-item :field="fieldsFinance.income"></cube-form-item>
          <!-- 投资年期 investmentHorizon-->
          <!-- <cube-form-item :field="fieldsFinance.investmentHorizon"></cube-form-item> -->
          <!-- 净资产 assets -->
          <cube-form-item :field="fieldsFinance.totalAssets"></cube-form-item>
          <!-- 不动产 realValue -->
          <!-- <cube-form-item :field="fieldsFinance.realValue"></cube-form-item> -->
          <!-- 資金來源 capitalTxt -->
          <cube-form-item :field="fieldsFinance.capitalTxt">
            <div
              @click.stop="handlerShowCapital"
              :class="['cube-select', {'cube-select_active': isShowCapitalList}]"
            >
              <span
                v-if="!model.capitalTxt.length"
                class="cube-select-placeholder"
              >{{fieldsFinance.capitalTxt.props.placeholder}}</span>
              <span v-else class="cube-select-text">{{model.capitalTxt}}</span>
              <i class="cube-select-icon" />
            </div>
          </cube-form-item>
          <cube-form-item v-show="isShowCapitalList">
            <cube-checkbox-group
              shape="square"
              v-model="model.capital"
              :options="fieldsFinance.capital.props.options"
              :col-num="3"
              class="custom-checkbox-group"
            />
          </cube-form-item>
          <!-- 投资目标 investTarge -->
          <cube-form-item :field="fieldsFinance.investTarget"></cube-form-item>
          <!-- 其他投资目标 investTargetOther -->
          <template v-if="isShowTargetInput">
            <cube-form-item :field="fieldsFinance.investTargetOther"></cube-form-item>
          </template>
          <!-- 住房产权-->
          <cube-form-item :field="fieldsFinance.residence"></cube-form-item>
          <!-- 其他住房产权 investTargetOther -->
          <template v-if="isShowResidenceInput">
            <cube-form-item :field="fieldsFinance.residenceOther"></cube-form-item>
          </template>
        </cube-form-group>
        <div class="margin-bottom"></div>

        <!-- 财产种类 -->
        <!-- <cube-form-group class="step-content custom-form-group">
          <head-title :title="titleValues.assets"></head-title>
          <div class="cube-form-item border-bottom-1px">
            <div class="cube-form-label">
              <cube-checkbox
                v-model="model.totalAssets"
                :disabled="true"
                shape="square"
              >{{fieldsAssets.all.label}}</cube-checkbox>
            </div>
            <div class="cube-form-field">
              <cube-select
                v-if="model.totalAssets"
                :placeholder="fieldsAssets.all.props.placeholder"
                :options="fieldsAssets.all.props.options"
                v-model="model.allValue"
              ></cube-select>
            </div>
          </div>
          <div class="cube-form-item border-bottom-1px">
            <div class="cube-form-label">
              <cube-checkbox v-model="model.realCheck" shape="square">{{fieldsAssets.real.label}}</cube-checkbox>
            </div>
            <div class="cube-form-field">
              <cube-select
                v-if="model.realCheck"
                :placeholder="fieldsAssets.real.props.placeholder"
                :options="fieldsAssets.real.props.options"
                v-model="model.realValue"
              ></cube-select>
            </div>
          </div>
        </cube-form-group> -->
        <div class="margin-bottom"></div>
        <cube-form-group class="step-content step-content-derivative custom-form-group">
          <head-title :title="titleValues.derivative"></head-title>
          <p class="derivative-item-content">{{getI18n("derivative.derivative")}}</p>
          <cube-form-item :field="filedsDerivative.derivative">
        
          </cube-form-item>
          <template v-if="isShowDerivative">
            <!-- 衍生品课程学习 -->
            <cube-form-item :field="filedsDerivative.derivativeCourse"></cube-form-item>
            <!-- 从事衍生品相关行业 -->
            <cube-form-item :field="filedsDerivative.derivativeIndustry"></cube-form-item>
            <!-- 有意进行衍生品交易 -->
            <cube-form-item :field="filedsDerivative.derivativeTrade"></cube-form-item>
          </template>
        </cube-form-group>
        <div class="margin-bottom"></div>
      </cube-form>
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

const defaultModel = {
  income: 1,
  totalAssets: 1,
  capital: [1],
  investTarget: 1,
  residence: 1,
  // investmentHorizon: 1,
  // allValue: 1,
  // realCheck: false,
  // realValue: "",
  derivative: 0, // 是否有意进行衍生品买卖
  derivativeTrade: false, // 三五年内买卖衍生品复选框
  derivativeCourse: false, // 学习过衍生品相关课程复选框
  derivativeIndustry: false, // 从事衍生品相关行业复选框
};

export default {
  mixins: [onlineMixin],
  data() {
    return {
      validity: {},
      valid: undefined,
      isShowCapitalList: false,
      model: {
        income: "", // 年收入
        capitalTxt: "",
        capital: [],
        investTarget: "",
        investTargetOther: "",
        totalAssets: "", // 净资产數值
        residence: "", //住房产权
        residenceOther: "", //其他住房产权
      // validity: {},
      // valid: undefined,
        // totalAssets: true, // 净资产選擇框
        // investmentHorizon: "", // 投资年期
        // realCheck: false, // 不动产选择框
        // realValue: "", // 不动产数值
        derivative: 0, // 是否有意进行衍生品买卖
        derivativeTrade: false, // 三五年内买卖衍生品复选框
        derivativeCourse: false, // 学习过衍生品相关课程复选框
        derivativeIndustry: false, // 从事衍生品相关行业复选框
      },
      // 财务状况
      fieldsFinance: {
        income: {
          type: "select",
          modelKey: "income",
          label: this.getI18n("finance.income.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("finance.income.placeholder"),
            options: optionsList.incomeOptions(),
          },
          rules: {
            required: false,
          },
        },
        totalAssets: {
          type: "select",
          modelKey: "totalAssets",
          label: this.getI18n("finance.totalAssets.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("finance.totalAssets.placeholder"),
            options: optionsList.totalAssetsOptions(),
          },
          rules: {
            required: false,
          },
        },
        // investmentHorizon: {
        //   type: "select",
        //   modelKey: "investmentHorizon",
        //   label: this.getI18n("finance.investmentHorizon.label"),
        //   props: {
        //     title: this.$t("common.cubeComponents.select.title"),
        //     cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
        //     confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
        //     placeholder: this.getI18n("finance.investmentHorizon.placeholder"),
        //     options: optionsList.investmentHorizonOptions(),
        //   },
        //   rules: {
        //     required: false,
        //   },
        // },
        capitalTxt: {
          type: "input",
          modelKey: "capitalTxt",
          label: this.getI18n("finance.capital.label"),
          props: {
            placeholder: this.getI18n("finance.capital.placeholder"),
          },
          rules: {
            required: false,
          },
        },
        capital: {
          type: "checkbox-group",
          modelKey: "capital",
          props: {
            options: optionsList.capitalOptions(),
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
        investTarget: {
          type: "select",
          modelKey: "investTarget",
          label: this.getI18n("finance.investTarget.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("finance.investTarget.placeholder"),
            options: optionsList.investmentOptions(),
          },
          rules: {
            required: false,
          },
        },
        investTargetOther: {
          type: "input",
          modelKey: "investTargetOther",
          label: this.getI18n("finance.investTargetOther.label"),
          props: {
            placeholder: this.getI18n("finance.investTargetOther.placeholder"),
          },
          rules: { required: false, maxlength: 50 },
        },
        residence: {
          type: "select",
          modelKey: "residence",
          label: this.getI18n("finance.residence.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("finance.residence.placeholder"),
            options: optionsList.residenceOptions(),
          },
          rules: {
            required: false,
          },
        },
        residenceOther: {
          type: "input",
          modelKey: "residenceOther",
          label: this.getI18n("finance.residenceOther.label"),
          props: {
            placeholder: this.getI18n("finance.residenceOther.placeholder"),
          },
          rules: { required: false, maxlength: 50 },
        },
      },
      // fieldsAssets: {
      //   all: {
      //     // type: "select",
      //     // modelKey: "allValue",
      //     label: this.getI18n("assets.all.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n("assets.all.placeholder"),
      //       options: optionsList.assetsAllOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      //   real: {
      //     // type: "select",
      //     // modelKey: "realValue",
      //     label: this.getI18n("assets.real.label"),
      //     props: {
      //       title: this.$t("common.cubeComponents.select.title"),
      //       cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
      //       confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
      //       placeholder: this.getI18n("assets.real.placeholder"),
      //       options: optionsList.assetsRealOptions(),
      //     },
      //     rules: {
      //       required: false,
      //     },
      //   },
      // },
      filedsDerivative: {
        derivative: {
          type: "radio-group",
          modelKey: "derivative",
          props: {
            colNum: 2,
            horizontal: true,
            options: [
              {
                label: this.getI18n("derivative.yes"),
                value: 1,
              },
              {
                label: this.getI18n("derivative.no"),
                value: 0,
              },
            ],
          },
          rules: {
            required: false,
          },
        },
        derivativeCourse: {
          type: "checkbox",
          modelKey: "derivativeCourse",
          props: {
            option: {
              value: false,
              label: this.getI18n("derivative.derivativeCourse"),
            },
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
        derivativeIndustry: {
          type: "checkbox",
          modelKey: "derivativeIndustry",
          props: {
            option: {
              value: false,
              label: this.getI18n("derivative.derivativeIndustry"),
            },
            shape: "square",
            rules: {
              required: false,
            },
          },
        },
        derivativeTrade: {
          type: "checkbox",
          modelKey: "derivativeTrade",
          props: {
            option: {
              value: false,
              label: this.getI18n("derivative.derivativeTrade"),
            },
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
      },
    };
  },
  computed: {
    // 有意进行衍生品买卖
    isShowDerivative() {
      return this.model.derivative === 1;
    },
    isShowTargetInput() {
      // 投资目标选择其他时候显示输入框 | 5: 代表其他
      // return false;
      return this.model.investTarget === 5;
    },
    isShowResidenceInput() {
      // 投资目标选择其他时候显示输入框 | 5: 代表其他
      // return false;
      return this.model.residence === 6;
    },
    // 返回title
    titleValues() {
      return {
        finance: this.getI18n("finance.title"),
        // assets: this.getI18n("assets.title"),
        derivative: this.getI18n("derivative.title"),
      };
    },
    // 验证财务信息
    validCapital() {
      const data = this.model;
      const status = validForm.capitalValidator.map((val) => {
        const item = data[val];
        if (typeof item === "object") {
          return Boolean(item.length);
        }
        return Boolean(item);
      });
      return !status.includes(false);
    },
    // 验证财产种类
    // validAsset() {
    //   const data = this.model;
    //   // 验证至少有一个值
    //   const status = validForm.assetValidator.map((val) => {
    //     if (data[val.key]) {
    //       if (data[val.valueKey]) {
    //         return true;
    //       }
    //       return false;
    //     }
    //     return true;
    //   });
    //   // 验证选项框
    //   const value = validForm.assetValidator.some((val) => data[val.key]);
    //   return value ? !status.includes(false) : false;
    // },
    validDerivative() {
      const {
        derivative,
        derivativeTrade,
        derivativeCourse,
        derivativeIndustry,
      } = this.model;
      if (
        derivative === 1 &&
        !derivativeTrade &&
        !derivativeCourse &&
        !derivativeIndustry
      )
        return false;
      return true;
    },
    // 验证提交按钮
    submitStatus() {
      const status =
        this.validCapital && this.validDerivative;
      return !status;
    },
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("infoFinance", key);
    },
    handlerShowCapital() {
      this.isShowCapitalList = !this.isShowCapitalList;
    },
    // 数据回填
    initData() {
      const userInfo = this.openInfo;
      const defaultData = this.model;
      // 初始化重置数据
      Object.keys(defaultData).forEach((val) => {
        defaultData[val] =
          userInfo[val] !== undefined
            ? userInfo[val]
            : defaultModel[val] !== undefined
            ? defaultModel[val]
            : defaultData[val];
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
  //   async fetchDataDesin() {
  //     const result = await this.$store.dispatch(
  //       "getDictionary",
  //       AO_INVEST_TARGET
  //     );
  //     // this.model.investTarget = result.map(v => v.value)
  //     this.fieldsFinance.investTarget.props.options = result.map((res) => ({
  //       text: res.name,
  //       value: res.value,
  //     }));
  //   },
  },
  watch: {
    "model.capital"(newVal, oldVal) {
      let capitalTxt = "";
      this.fieldsFinance.capital.props.options.forEach((item) => {
        if (newVal.includes(item.value)) {
          capitalTxt += capitalTxt === "" ? item.label : `、${item.label}`;
        }
      });
      this.model.capitalTxt = capitalTxt;
    },
  },
  created() {},
  mounted() {
    this.initData();
  },
};
</script>


