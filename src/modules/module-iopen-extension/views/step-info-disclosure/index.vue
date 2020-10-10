<template>
  <op-wrap :isDisabled="isDisableNext" :btnText="getI18n('nextBtn')" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-other">
      <cube-form :model="model" class="step-content">
        <head-title :title="titleValues.declareTitle"></head-title>

        <!-- 配偶是否拥有保证金账户 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithMargin.isNotConsortWithMargin"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithMargin.isCanFalse && !model.isNotConsortWithMargin"
          >
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithMargin.withMarginName"></cube-form-item>
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithMargin.withMarginAccount"
            ></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 本人或配偶是否是其他账户的实际拥有人或担保人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOtherPOorPGWithMargin.isNotBOorPG"></cube-form-item>
          <template v-if="disclosureDefine.isNotBOorPG.isCanFalse && !model.isNotBOorPG">
            <cube-form-item
              class="label-width-5em"
              :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-5em"
              :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginAccount"
            ></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否大于35% -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithOtherMargin.isNotConsortWithOtherMargin"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithOtherMargin.isCanFalse &&  !model.isNotConsortWithOtherMargin"
          >
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithOtherMargin.withOtherMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithOtherMargin.withOtherMarginAccount"
            ></cube-form-item>
          </template>
        </cube-form-group>
        <!-- 常设授权 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="adjectiveAuthFields"></cube-form-item>
        </cube-form-group>
        <div class="margin-bottom"></div>
      </cube-form>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen-extension/format/disclosure";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  data() {
    return {
      model: {
        isNotConsortWithMargin: true,
        withMarginName: "",
        withMarginAccount: "",

        isNotBOorPG: true,
        otherPOorBGMarginName: "",
        otherPOorBGMarginAccount: "",

        isNotConsortWithOtherMargin: true,
        withOtherMarginName: "",
        withOtherMarginAccount: "",

        adjectiveAuth: true,

      },
      fieldsConsortWithMargin: {
        isNotConsortWithMargin: {
          type: "checkbox",
          modelKey: "isNotConsortWithMargin",
          props: {
            option: {
              label: this.getI18n("openMargin.isNotConsortWithMargin"),
              value: true,
            },
            shape: "square",
          },
        },
        withMarginName: {
          type: "input",
          modelKey: "withMarginName",
          label: this.getI18n("openMargin.withMarginName"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
        withMarginAccount: {
          type: "input",
          modelKey: "withMarginAccount",
          label: this.getI18n("openMargin.withMarginAccount"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
      },
      //不是担保人
      fieldsOtherPOorPGWithMargin: {
        isNotBOorPG: {
          type: "checkbox",
          modelKey: "isNotBOorPG",
          props: {
            option: {
              label: this.getI18n("openMargin.isNotBOorPG"),
              value: true,
            },
            shape: "square",
          },
        },
        otherPOorBGMarginName: {
          type: "input",
          modelKey: "otherPOorBGMarginName",
          label: this.getI18n("openMargin.otherBOorPGAccountName"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
        otherPOorBGMarginAccount: {
          type: "input",
          modelKey: "otherPOorBGMarginAccount",
          label: this.getI18n("openMargin.otherBOorPGAccountNumber"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
      },
      // 6
      fieldsConsortWithOtherMargin: {
        isNotConsortWithOtherMargin: {
          type: "checkbox",
          modelKey: "isNotConsortWithOtherMargin",
          props: {
            option: {
              label: this.getI18n("openMargin.isNotConsortWithOtherMargin"),
              value: true,
            },
            shape: "square",
          },
        },
        withOtherMarginName: {
          type: "input",
          modelKey: "withOtherMarginName",
          label: this.getI18n("openMargin.withOtherMarginName"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
        withOtherMarginAccount: {
          type: "input",
          modelKey: "withOtherMarginAccount",
          label: this.getI18n("openMargin.withOtherMarginAccount"),
          props: {
            placeholder: this.getI18n("openMargin.inputPlaceholder"),
          },
        },
      },
      adjectiveAuthFields: {
        type: "checkbox",
        modelKey: "adjectiveAuth",
        props: {
          option: {
            label: this.getI18n("openMargin.adjectiveAuth"),
            value: true,
          },
          shape: "square",
        },
      },

      disclosureDefine: disclosureDefine,
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("openMargin.declareTitle"),
      };
    },
    // 第5个复选框校验
    consortWithMarginStatusCheck() {
      const {
        isNotConsortWithMargin,
        withMarginName,
        withMarginAccount,
      } = this.model;
      if (isNotConsortWithMargin) {
        return true;
      }
      if (withMarginName && withMarginAccount) {
        return true;
      }
      return false;
    },
    BOorPGStatusCheck() {
      const {
        isNotBOorPG,
        otherPOorBGMarginName,
        otherPOorBGMarginAccount,
      } = this.model;
      if (isNotBOorPG) {
        return true;
      }
      if (otherPOorBGMarginName && otherPOorBGMarginAccount) {
        return true;
      }
      return false;
    },
    // 第五个复选框校验
    consortWithOtherStatusCheck() {
      const {
        isNotConsortWithOtherMargin,
        withOtherMarginName,
        withOtherMarginAccount,
      } = this.model;
      if (isNotConsortWithOtherMargin) {
        return true;
      }
      if (withOtherMarginName && withOtherMarginAccount) {
        return true;
      }
      return false;
    },
    adjectiveAuthCheck() {
      const {
        adjectiveAuth
      } = this.model;
      if (adjectiveAuth) {
        return true;
      }
      return false;
    },
    // 提交按钮是否可点击
    isDisableNext() {
      const check1 = this.BOorPGStatusCheck;
      const check2 = this.consortWithMarginStatusCheck;
      const check3 = this.consortWithOtherStatusCheck;
      const check4 = this.adjectiveAuthCheck;
      if (check1 && check2 && check3 && check4) {
        return false;
      }
      return true;
    },
  },
  methods: {
    getI18n(key, type = "") {
      return this.$t(`iopenExt.${key}`);
    },
    // 提交方法
    handleNext() {
      // 保存数据&下一步
      // const obj = { ...this.model, ...this.taxModel };
      const obj = { ...this.model };
      const params = {
        step: this.step,
        info: obj,
      };
      // this.saveCacheInfo(params).then(() => {
      //   this.$router.push({ name: this.nextStep });
      // });
      this.$router.push({ name: 'margin-risk' });
    },

    handlerCheckAlert(val, key) {
      if (this.disclosureDefine[key].isCanFalse || val) return;
      const content = this.getI18n(`openMargin.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = typeof val === "boolean" ? true : 1;
        },
      });
    },
  },
  created() {
    // this.updateInfo();
    // console.log(this.greenCardDeclare)
  },
  watch: {
    "model.isNotConsortWithMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithMargin");
    },
    "model.isNotBOorPG"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotBOorPG");
    },
    "model.isNotConsortWithOtherMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithOtherMargin");
    },
    "model.adjectiveAuth"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "adjectiveAuth");
    },
  },
};
</script>
<style lang="scss" scoped>
  @import './style.scss';
</style>