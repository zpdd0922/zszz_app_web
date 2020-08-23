<template>
  <op-wrap :isDisabled="!isCanNext" @handleNext="handleNext">
    <div class="olhk-step olhk-step-select-account">
      <cube-form :model="model" @validate="validateHandler" @submit="handleNext">
        <cube-form-group class="step-content step-content-accounts custom-form-group">
          <head-title :title="contentTitle.accounts"></head-title>
          <cube-form-item :field="filedsAccounts.fundAccountType">
            <cube-radio-group :hollow-style="true" position="left">
              <cube-radio
                v-model="model.fundAccountType"
                :option="filedsAccounts.fundAccountType.props.options[1]"
              />
              <div v-if="model.fundAccountType === 2" class="select-account-list">
                <cube-checkbox-group
                  shape="square"
                  v-model="model.fundAccountMarginMarkets"
                  :options="marketList"
                  :col-num="3"
                  class="custom-checkbox-group"
                ></cube-checkbox-group>
              </div>
              <cube-radio
                v-model="model.fundAccountType"
                :option="filedsAccounts.fundAccountType.props.options[0]"
              />
              <div v-if="model.fundAccountType === 1" class="select-account-list">
                <cube-checkbox-group
                  shape="square"
                  v-model="model.fundAccountCashMarkets"
                  :options="marketList"
                  :col-num="3"
                  class="custom-checkbox-group"
                />
              </div>
            </cube-radio-group>
          </cube-form-item>
        </cube-form-group>
        <div class="margin-bottom"></div>
        <cube-form-group class="step-content step-content-derivative custom-form-group">
          <!-- <head-title :title="titleValues.derivative"></head-title> -->
          <cube-form-item :field="filedsDerivative.derivative">
            <cube-radio-group
              position="left"
              :hollow-style="true"
              :investmentHorizontal="true"
              v-model="model.derivative"
              :options="filedsDerivative.derivative.props.options"
            />
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
      </cube-form>
    </div>
  </op-wrap>
</template>

<script>
import { mapGetters } from "vuex";
import { confirm, alert } from "@/main/utils/common/tips";
import * as optionsList from "./base-list";

export default {
  props: {},
  data() {
    return {
      contentTitle: {
        accounts: this.getI18n("accounts.title")
      },
      model: {
        fundAccountType: 1,
        fundAccountCashMarkets: ["1", "2"],
        fundAccountMarginMarkets: ["1", "2"],
        derivative: 0, // 是否有意进行衍生品买卖
        derivativeTrade: true, // 三五年内买卖衍生品复选框
        derivativeCourse: true, // 学习过衍生品相关课程复选框
        derivativeIndustry: true // 从事衍生品相关行业复选框
      },
      marketList: [
        {
          label: this.getI18n("accounts.marketHK"),
          value: "1",
          disabled: true
        },
        {
          label: this.getI18n("accounts.marketUS"),
          value: "2"
        },
        {
          label: this.getI18n("accounts.marketCN"),
          value: "3"
        }
      ],
      filedsAccounts: {
        fundAccountType: {
          type: "radio-group",
          modelKey: "fundAccountType",
          props: {
            options: [
              {
                value: 1,
                label: this.getI18n("accounts.accountCash")
              },
              {
                value: 2,
                label: this.getI18n("accounts.accountMargin")
              }
            ]
          },
          rules: {
            required: false
          }
        }
      },
      filedsDerivative: {
        derivative: {
          type: "radio-group",
          modelKey: "derivative",
          label: this.getI18n("derivative.derivative"),
          props: {
            options: [
              {
                label: "是",
                value: 1
              },
              {
                label: "否",
                value: 0
              }
            ]
          },
          rules: {
            required: false
          }
        },
        derivativeCourse: {
          type: "checkbox",
          modelKey: "derivativeCourse",
          props: {
            option: {
              value: true,
              label: this.getI18n("derivative.derivativeCourse")
            },
            shape: "square"
          },
          rules: {
            required: false
          }
        },
        derivativeIndustry: {
          type: "checkbox",
          modelKey: "derivativeIndustry",
          props: {
            option: {
              value: true,
              label: this.getI18n("derivative.derivativeIndustry")
            },
            shape: "square",
            rules: {
              required: false
            }
          }
        },
        derivativeTrade: {
          type: "checkbox",
          modelKey: "derivativeTrade",
          props: {
            option: {
              value: true,
              label: this.getI18n("derivative.derivativeTrade")
            },
            shape: "square"
          },
          rules: {
            required: false
          }
        }
      }
    };
  },
  watch: {},
  computed: {
    ...mapGetters(["openInfo"]),
    step() {
      return this.$route.meta.step;
    },
    // 有意进行衍生品买卖
    isShowDerivative() {
      return this.model.derivative === 1;
    },
    isCanNext() {
      const {
        derivative,
        derivativeTrade,
        derivativeCourse,
        derivativeIndustry
      } = this.model;
      if (
        derivative === 1 &&
        !derivativeTrade &&
        !derivativeCourse &&
        !derivativeIndustry
      )
        return false;
      return true;
    }
  },
  methods: {
    validateHandler(result) {
      this.validity = result.validity;
      this.valid = result.valid;
    },
    getI18n(key) {
      return this.$t(`openAccount.openHk.selectAccount.${key}`);
    },
    // 数据回填
    initData() {
      const userInfo = this.openInfo;
      const defaultData = this.model;
      // 初始化重置数据
      Object.keys(defaultData).forEach(val => {
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
        info: this.model
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({name: "opaStep9-hk"});
      });
    },
    changeOfferNum() {}
  },
  created() {
    this.initData();
  }
};
</script>
