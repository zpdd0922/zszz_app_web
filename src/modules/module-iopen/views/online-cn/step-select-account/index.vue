<template>
  <op-wrap :isDisabled="!isCanNext" @handleNext="handleNext">
    <div class="olcn-step olcn-step-select-account">
      <cube-form :model="model" @validate="validateHandler" @submit="handleNext">
        <!-- <cube-form-group class="step-content step-content-accounts custom-form-group">
          <head-title :title="contentTitle.personalType"></head-title>
          <cube-form-item :field="filedsMore.personalType">
            <cube-radio
              v-model="model.personalType"
              :option="filedsMore.personalType.props.options[0]"
            />
          </cube-form-item>
        </cube-form-group>-->
        <!-- <div class="margin-bottom"></div> -->
        <cube-form-group class="step-content step-content-accounts custom-form-group">
          <head-title :title="contentTitle.accounts"></head-title>
          <cube-form-item :field="filedsAccounts.fundAccountType">
            <cube-radio-group :hollow-style="true" position="left">
              <cube-radio
                v-model="model.fundAccountType"
                :option="filedsAccounts.fundAccountType.props.options[0]"
              />
              <cube-radio
                v-model="model.fundAccountType"
                :option="filedsAccounts.fundAccountType.props.options[1]"
              />
            </cube-radio-group>
          </cube-form-item>
        </cube-form-group>
        <div class="margin-bottom"></div>
        <cube-form-group class="step-content step-content-accounts custom-form-group">
          <head-title :title="contentTitle.otherAccounts"></head-title>
          <cube-form-item :field="filedsAccounts.isOpenHk"></cube-form-item>
          <cube-form-item :field="filedsAccounts.isOpenCn"></cube-form-item>
          <!-- <cube-form-item :field="filedsAccounts.isOpenUs"></cube-form-item> -->
          <!-- <cube-form-item :field="filedsAccounts.isOpenOptions"></cube-form-item> -->
          <!-- <cube-form-item :field="filedsAccounts.isOpenFutures"></cube-form-item> -->
        </cube-form-group>
        <!-- <div class="margin-bottom"></div>
        <cube-form-group class="step-content step-content-accounts custom-form-group">
          <head-title :title="contentTitle.accounts"></head-title>
          <cube-form-item :field="filedsAccounts.fundAccountType">
            <cube-radio
              v-model="model.tradingWay"
              :option="filedsMore.tradingWay.props.options[0]"
            />
          </cube-form-item>
        </cube-form-group>-->
      </cube-form>
    </div>
  </op-wrap>
</template>

<script>
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./base-list";

export default {
  mixins: [onlineMixin],
  props: {},
  data() {
    return {
      contentTitle: {
        accounts: this.getI18n("accounts.title"),
        otherAccounts: this.getI18n("otherAccounts.title"),
        personalType: this.getI18n("personalType.title"),
        tradingWay: this.getI18n("otherAccounts.title"),
      },
      model: {
        fundAccountType: 1,
        isOpenHk: true,
        isOpenUs: false,
        isOpenFutures: false,
        isOpenOptions: false,
        isOpenCn: false,
        personalType: 1,
        tradingWay: 1,
      },
      typeList: [
        {
          label: this.getI18n("type.individual"),
          value: "1",
          disabled: true,
        },
        // {
        //   label: this.getI18n("type.joint"),
        //   value: "0",
        //   disabled: true,
        // },
        // {
        //   label: this.getI18n("type.corporate"),
        //   value: "0",
        //   disabled: true,
        // },
      ],
      tradingWayList: [],
      filedsMore: {
        personalType: {
          type: "radio-group",
          modelKey: "personalType",
          props: {
            options: [
              {
                label: this.getI18n("personalType.individual"),
                value: 1,
                disabled: true,
              },
            ],
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
        tradingWay: {
          type: "radio-group",
          modelKey: "tradingWay",
          props: {
            options: [
              {
                label: this.getI18n("tradingWay.internet"),
                value: 1,
                disabled: true,
              },
            ],
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
      },
      filedsAccounts: {
        fundAccountType: {
          type: "radio-group",
          modelKey: "fundAccountType",
          props: {
            options: [
              {
                value: 1,
                label: this.getI18n("accounts.accountCash"),
              },
              {
                value: 2,
                label: this.getI18n("accounts.accountMargin"),
              },
            ],
            shape: "square",
          },
          rules: {
            required: false,
          },
        },
        isOpenHk: {
          type: "checkbox",
          modelKey: "isOpenHk",
          props: {
            option: {
              disabled: true,
              label: this.getI18n("otherAccounts.accountHk"),
              value: true,
            },
            shape: "square",
          },
        },
        isOpenUs: {
          type: "checkbox",
          modelKey: "isOpenUs",
          props: {
            option: {
              label: this.getI18n("otherAccounts.accountUs"),
              value: true,
            },
            shape: "square",
          },
        },
        isOpenOptions: {
          type: "checkbox",
          modelKey: "isOpenOptions",
          props: {
            option: {
              label: this.getI18n("otherAccounts.accountStockOptions"),
              value: true,
            },
            shape: "square",
          },
        },
        isOpenFutures: {
          type: "checkbox",
          modelKey: "isOpenFutures",
          props: {
            option: {
              label: this.getI18n("otherAccounts.accountFutures"),
              value: true,
            },
            shape: "square",
          },
        },
        isOpenCn: {
          type: "checkbox",
          modelKey: "isOpenCn",
          props: {
            option: {
              label: this.getI18n("otherAccounts.accountCn"),
              value: true,
            },
            shape: "square",
          },
        },
      },
    };
  },
  watch: {},
  computed: {
    // 有意进行衍生品买卖
    isShowDerivative() {
      return this.model.derivative === 1;
    },
    isCanNext() {
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
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("selectAccount", key);
    },
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    // 数据回填
    initData() {
      const userInfo = this.openInfo;
      const defaultData = this.model;

      // 初始化重置数据
      Object.keys(defaultData).forEach((val) => {
        defaultData[val] =
          userInfo[val] !== undefined ? userInfo[val] : defaultData[val];
      });
    },
    // 下一步
    handleNext(e) {
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
  },
  created() {
    this.initData();
  },
};
</script>
