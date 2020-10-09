<template>
  <op-wrap
    :isDisabled="isDisableNext"
    :btnText="getI18n('nextBtn')"
    @handleNext="handleNext"
  >
    <div class="olcn-step olcn-step-info-other">
      <cube-form :model="model" class="step-content">
        <head-title :title="titleValues.declareTitle"></head-title>
        <!-- 是否唯一收益拥有人 -->
        <!-- <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountOwner.isAccountOwner"></cube-form-item>
        </cube-form-group>-->

        <!-- 是否与本公司员工有关系 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsOurStaffKin.unrelatedToWLSStaff"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotOurStaffKin.isCanFalse &&
              !model.isNotOurStaffKin
            "
          >
            <cube-form-item
              :field="fieldsOurStaffKin.relatedStaffName"
            ></cube-form-item>
            <cube-form-item
              :field="fieldsOurStaffKin.relationship"
            ></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否港交所參與者僱員 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsHkexParterStaff.isNotHkexParterStaff"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotHkexParterStaff.isCanFalse &&
              !model.isNotHkexParterStaff
            "
          >
            <cube-form-item
              :field="fieldsHkexParterStaff.hkexParterName"
            ></cube-form-item>
            <cube-form-item
              :field="fieldsHkexParterStaff.hkexParterCENo"
            ></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 配偶是否拥有保证金账户 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsConsortWithMargin.isNotConsortWithMargin"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotConsortWithMargin.isCanFalse &&
              !model.isNotConsortWithMargin
            "
          >
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithMargin.withMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithMargin.withMarginAccount"
            ></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 本人或配偶是否是其他账户的实际拥有人或担保人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsOtherPOorPGWithMargin.isNotBOorPG"
          ></cube-form-item>
          <template
            v-if="disclosureDefine.isNotBOorPG.isCanFalse && !model.isNotBOorPG"
          >
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
          <cube-form-item
            :field="fieldsConsortWithOtherMargin.isNotConsortWithOtherMargin"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotConsortWithOtherMargin.isCanFalse &&
              !model.isNotConsortWithOtherMargin
            "
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
        <div class="margin-bottom"></div>

        <!-- 是否美國綠卡 -->
        <section>
          <head-title :title="titleValues.greenCardTitle"></head-title>
          <h3 class="greenCardDeclare">{{ greenCardDeclare }}</h3>
          <cube-form-group class="custom-form-group">
            <cube-form-item :field="fieldUSGreenCard"></cube-form-item>
          </cube-form-group>
        </section>
      </cube-form>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen/format/format-cn/other";
import * as optionsList from "./option-list";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  mixins: [onlineMixin],
  components: {},
  data() {
    return {
      greenCardDeclare: this.getI18n("other.isNotUsGreenCardHolder.title"),
      model: {
        isAccountOwner: true,

        isNotOurStaffKin: true,
        ourStaffKinName: "",
        ourStaffKinRelation: "",

        isNotHkexParterStaff: true,
        hkexParterName: "",
        hkexParterCENo: "",

        isNotConsortWithMargin: true,
        withMarginName: "",
        withMarginAccount: "",

        isNotBOorPG: true,
        otherPOorBGMarginName: "",
        otherPOorBGMarginAccount: "",

        isNotConsortWithOtherMargin: true,
        withOtherMarginName: "",
        withOtherMarginAccount: "",

        isNotUsGreenCardHolder: 3,
      },

      // 1 是否本账号唯一受益人
      fieldsAccountOwner: {
        isAccountOwner: {
          type: "checkbox",
          modelKey: "isAccountOwner",
          props: {
            option: {
              label: this.getI18n("other.isAccountOwner"),
              value: true,
            },
            shape: "square",
          },
        },
      },
      // 3 是否本公司员工有关
      fieldsOurStaffKin: {
        unrelatedToWLSStaff: {
          type: "checkbox",
          modelKey: "isNotOurStaffKin",
          props: {
            option: {
              label: this.getI18n("other.isNotOurStaffKin"),
              value: true,
            },
            shape: "square",
          },
        },
        relatedStaffName: {
          type: "input",
          modelKey: "ourStaffKinName",
          label: this.getI18n("other.ourStaffKinName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        relationship: {
          type: "input",
          modelKey: "ourStaffKinRelation",
          label: this.getI18n("other.ourStaffKinRelation"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      },
      // 4
      fieldsHkexParterStaff: {
        isNotHkexParterStaff: {
          type: "checkbox",
          modelKey: "isNotHkexParterStaff",
          props: {
            option: {
              label: this.getI18n("other.isNotHkexParterStaff"),
              value: true,
            },
            shape: "square",
          },
        },
        hkexParterName: {
          type: "input",
          modelKey: "hkexParterName",
          label: this.getI18n("other.hkexParterName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        hkexParterCENo: {
          type: "input",
          modelKey: "hkexParterCENo",
          label: this.getI18n("other.hkexParterCENo"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      },
      // 5
      fieldsConsortWithMargin: {
        isNotConsortWithMargin: {
          type: "checkbox",
          modelKey: "isNotConsortWithMargin",
          props: {
            option: {
              label: this.getI18n("other.isNotConsortWithMargin"),
              value: true,
            },
            shape: "square",
          },
        },
        withMarginName: {
          type: "input",
          modelKey: "withMarginName",
          label: this.getI18n("other.withMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        withMarginAccount: {
          type: "input",
          modelKey: "withMarginAccount",
          label: this.getI18n("other.withMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
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
              label: this.getI18n("other.isNotBOorPG"),
              value: true,
            },
            shape: "square",
          },
        },
        otherPOorBGMarginName: {
          type: "input",
          modelKey: "otherPOorBGMarginName",
          label: this.getI18n("other.otherBOorPGAccountName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        otherPOorBGMarginAccount: {
          type: "input",
          modelKey: "otherPOorBGMarginAccount",
          label: this.getI18n("other.otherBOorPGAccountNumber"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
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
              label: this.getI18n("other.isNotConsortWithOtherMargin"),
              value: true,
            },
            shape: "square",
          },
        },
        withOtherMarginName: {
          type: "input",
          modelKey: "withOtherMarginName",
          label: this.getI18n("other.withOtherMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        withOtherMarginAccount: {
          type: "input",
          modelKey: "withOtherMarginAccount",
          label: this.getI18n("other.withOtherMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      },
      // 7
      fieldUSGreenCard: {
        type: "radio-group",
        modelKey: "isNotUsGreenCardHolder",
        props: {
          options: optionsList.getUsGreenCardOptions(),
        },
      },
      disclosureDefine: disclosureDefine,
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("other.declareTitle"),
        greenCardTitle: this.getI18n("other.greenCardTitle"),
      };
    },
    // 第一个复选框校验
    accountOwnerStatusCheck() {
      const { isAccountOwner } = this.model;
      if (isAccountOwner) {
        return true;
      }

      return false;
    },
    ourStaffKInStatusCheck() {
      const {
        isNotOurStaffKin,
        ourStaffKinName,
        ourStaffKinRelation,
      } = this.model;
      if (isNotOurStaffKin) {
        return true;
      }
      if (ourStaffKinName && ourStaffKinRelation) {
        return true;
      }
      return false;
    },
    // 第4个复选框校验
    HKexParternerStaffStatusCheck() {
      const {
        isNotHkexParterStaff,
        hkexParterName,
        hkexParterCENo,
      } = this.model;
      if (isNotHkexParterStaff) {
        return true;
      }
      if (hkexParterName && hkexParterCENo) {
        return true;
      }
      return false;
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
    // 第六个复选框校验
    greenCardStatusCheck() {
      const { isNotUsGreenCardHolder } = this.model;
      if (isNotUsGreenCardHolder) {
        return true;
      }
      return false;
    },
    // 提交按钮是否可点击
    isDisableNext() {
      const check1 = this.accountOwnerStatusCheck;
      // const check2 = this.statusCheck2;
      const check2 = this.BOorPGStatusCheck;
      const check3 = this.ourStaffKInStatusCheck;
      const check4 = this.HKexParternerStaffStatusCheck;
      const check5 = this.consortWithMarginStatusCheck;
      const check6 = this.consortWithOtherStatusCheck;
      const check7 = this.greenCardStatusCheck;
      if (check1 && check2 && check3 && check4 && check5 && check6 && check7) {
        return false;
      }
      return true;
    },
  },
  methods: {
    getI18n(key, type = "") {
      return this.getStepI18nValue("infoDisclosure", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      // 表单信息
      Object.keys(this.model).forEach((val) => {
        if (emtpy.includes(userInfo[val])) {
          this.model[val] = this.model[val];
        } else {
          this.model[val] = userInfo[val];
        }
      });
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
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },

    handlerCheckAlert(val, key) {
      if (this.disclosureDefine[key].isCanFalse || val) return;
      const content = this.getI18n(`other.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = typeof val === "boolean" ? true : 1;
        },
      });
    },
    handlerCheckAlertForUs(newVal, oldVal, key) {
      if (newVal !== 1) return;
      const content = this.getI18n(`other.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = typeof val === "boolean" ? true : oldVal;
        },
      });
    },
  },
  created() {
    this.updateInfo();
  },
  watch: {
    "model.isAccountOwner"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isAccountOwner");
    },
    "model.isAccountManager"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isAccountManager");
    },
    "model.isNotOurStaffKin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotOurStaffKin");
    },
    "model.isNotHkexParterStaff"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotHkexParterStaff");
    },
    "model.isNotConsortWithMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithMargin");
    },
    "model.isNotBOorPG"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotBOorPG");
    },
    "model.isNotConsortWithOtherMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithOtherMargin");
    },
    "model.isNotUsGreenCardHolder"(newVal, oldVal) {
      this.handlerCheckAlertForUs(newVal, oldVal, "isNotUsGreenCardHolder");
    },
  },
};
</script>
