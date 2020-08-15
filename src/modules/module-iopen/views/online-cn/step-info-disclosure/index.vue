<template>
  <op-wrap :isDisabled="isDisableNext" :btnText="getI18n('nextBtn')" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-other">
      <cube-form :model="model" class="step-content">
        <head-title :title="titleValues.title"></head-title>
        <!-- 是否唯一收益拥有人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountOwner.isAccountOwner"></cube-form-item>
          <template v-if="disclosureDefine.isAccountOwner.isCanFalse && !model.isAccountOwner">
            <cube-form-item :field="fieldsAccountOwner.otherOwnerName"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner.otherOwnerCardType"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner.otherOwnerCardNum"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner.otherOwnerAddress">
              <cube-textarea
                v-model="model.otherOwnerAddress"
                :placeholder="fieldsAccountOwner.otherOwnerAddress.props.placeholder"
                :maxlength="50"
                :indicator="false"
              ></cube-textarea>
            </cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否唯一指示人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountManager[0]"></cube-form-item>
          <template v-if="disclosureDefine.isAccountManager.isCanFalse && !model.isAccountManager">
            <cube-form-item :field="fieldsAccountManager[1]"></cube-form-item>
            <cube-form-item :field="fieldsAccountManager[2]"></cube-form-item>
            <cube-form-item :field="fieldsAccountManager[3]"></cube-form-item>
            <cube-form-item :field="fieldsAccountManager[3]">
              <cube-textarea
                v-model="model.otherManagerAddress"
                :placeholder="fieldsAccountManager[3].props.placeholder"
                :maxlength="50"
                :indicator="false"
              ></cube-textarea>
            </cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否本公司員工親屬關係 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOurStaffKin[0]"></cube-form-item>
          <template v-if="disclosureDefine.isNotOurStaffKin.isCanFalse &&  !model.isNotOurStaffKin">
            <cube-form-item :field="fieldsOurStaffKin[1]"></cube-form-item>
            <cube-form-item :field="fieldsOurStaffKin[2]"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否港交所參與者僱員 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsHkexParterStaff[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotHkexParterStaff.isCanFalse &&  !model.isNotHkexParterStaff"
          >
            <cube-form-item :field="fieldsHkexParterStaff[1]"></cube-form-item>
            <cube-form-item :field="fieldsHkexParterStaff[2]"></cube-form-item>
          </template>
        </cube-form-group>

        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithMargin[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithMargin.isCanFalse &&  !model.isNotConsortWithMargin"
          >
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithMargin[1]"></cube-form-item>
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithMargin[2]"></cube-form-item>
          </template>
        </cube-form-group>

        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithOtherMargin[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithOtherMargin.isCanFalse &&  !model.isNotConsortWithOtherMargin"
          >
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithOtherMargin[1]"></cube-form-item>
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithOtherMargin[2]"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否美國綠卡 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsUsGreenCard[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotUsGreenCardHolder.isCanFalse &&  !model.isNotUsGreenCardHolder"
          >
            <cube-form-item class="label-width-10em" :field="fieldsUsGreenCard[1]"></cube-form-item>
          </template>
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen/format/format-cn/other";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  mixins: [onlineMixin],
  components: {},
  data() {
    return {
      model: {
        isAccountOwner: true,
        otherOwnerName: "",
        otherOwnerCardType: "",
        otherOwnerCardNum: "",
        otherOwnerAddress: "",

        isAccountManager: true,
        otherManagerName: "",
        otherManagerCardType: "",
        otherManagerCardNum: "",
        otherManagerAddress: "",

        isNotOurStaffKin: true,
        ourStaffKinName: "",
        ourStaffKinRelation: "",

        isNotHkexParterStaff: true,
        hkexParterName: "",
        hkexParterCENo: "",

        isNotConsortWithMargin: true,
        withMarginName: "",
        withMarginAccount: "",

        isNotConsortWithOtherMargin: true,
        withOtherMarginName: "",
        withOtherMarginAccount: "",

        isNotUsGreenCardHolder: true,
        usGreenCardCode: "",
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
        otherOwnerName: {
          type: "input",
          modelKey: "otherOwnerName",
          label: this.getI18n("other.otherOwnerName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        otherOwnerCardType: {
          type: "select",
          modelKey: "otherOwnerCardType",
          label: this.getI18n("other.otherOwnerCardType"),
          props: {
            options: [
              {
                text: this.getI18n("other.otherOwnerCardTypeOptions")[0],
                value: "身份证",
              },
              {
                text: this.getI18n("other.otherOwnerCardTypeOptions")[1],
                value: "护照",
              },
            ],
            placeholder: this.getI18n("other.selectPlaceholder"),
          },
        },
        otherOwnerCardNum: {
          type: "input",
          modelKey: "otherOwnerCardNum",
          label: this.getI18n("other.otherOwnerCardNum"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        otherOwnerAddress: {
          type: "input",
          modelKey: "otherOwnerAddress",
          label: this.getI18n("other.otherOwnerAddress"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      },
      // 2 是否本账号唯一指示人
      fieldsAccountManager: [
        {
          type: "checkbox",
          modelKey: "isAccountManager",
          props: {
            option: {
              label: this.getI18n("other.isAccountManager"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "otherManagerName",
          label: this.getI18n("other.otherManagerName"),
          props: {
            placeholder: this.getI18n("other.otherManagerName"),
          },
        },
        {
          type: "select",
          modelKey: "otherManagerCardType",
          label: this.getI18n("other.otherManagerCardType"),
          props: {
            options: [
              {
                text: this.getI18n("other.otherManagerCardTypeOptions")[0],
                value: "身份证",
              },
              {
                text: this.getI18n("other.otherManagerCardTypeOptions")[1],
                value: "护照",
              },
            ],
            placeholder: this.getI18n("other.selectPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "otherManagerCardNum",
          label: this.getI18n("other.otherManagerCardNum"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        
        {
          type: "input",
          modelKey: "otherManagerAddress",
          label: this.getI18n("other.otherManagerAddress"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 3 是否本公司员工亲属关系
      fieldsOurStaffKin: [
        {
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
        {
          type: "input",
          modelKey: "ourStaffKinName",
          label: this.getI18n("other.ourStaffKinName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "ourStaffKinRelation",
          label: this.getI18n("other.ourStaffKinRelation"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 4
      fieldsHkexParterStaff: [
        {
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
        {
          type: "input",
          modelKey: "hkexParterName",
          label: this.getI18n("other.hkexParterName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "hkexParterCENo",
          label: this.getI18n("other.hkexParterCENo"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 5
      fieldsConsortWithMargin: [
        {
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
        {
          type: "input",
          modelKey: "withMarginName",
          label: this.getI18n("other.withMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "withMarginAccount",
          label: this.getI18n("other.withMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 6
      fieldsConsortWithOtherMargin: [
        {
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
        {
          type: "input",
          modelKey: "withOtherMarginName",
          label: this.getI18n("other.withOtherMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "withOtherMarginAccount",
          label: this.getI18n("other.withOtherMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 7
      fieldsUsGreenCard: [
        {
          type: "checkbox",
          modelKey: "isNotUsGreenCardHolder",
          props: {
            option: {
              label: this.getI18n("other.isNotUsGreenCardHolder"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "usGreenCardCode",
          label: this.getI18n("other.usGreenCardCode"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      disclosureDefine: disclosureDefine,
    };
  },
  computed: {
    titleValues() {
      return {
        title: this.getI18n("other.title"),
      };
    },
    // 是否显示增加按钮
    isAddBtnForCompanyController() {
      return this.companyInfoArray.length < 5;
    },
    // 是否显删除按钮
    isRemoveBtnForCompanyController() {
      return this.companyInfoArray.length > 1;
    },
    isGrayRemoveBtnForTax() {
      return this.privacyArray.length <= 0;
    },
    // 第一个复选框校验
    statusCheck1() {
      const {
        isAccountOwner,
        otherOwnerName,
        otherOwnerCardType,
        otherOwnerCardNum,
        otherOwnerAddress,
      } = this.model;
      if (isAccountOwner) {
        return true;
      }

      if (
        otherOwnerName &&
        otherOwnerCardType &&
        otherOwnerCardNum &&
        otherOwnerAddress
      ) {
        return true;
      }
      return false;
    },
    // 第2个复选框校验
    statusCheck2() {
      const {
        isAccountManager,
        otherManagerName,
        otherManagerCardType,
        otherManagerCardNum,
        otherManagerAddress,
      } = this.model;
      if (isAccountManager) {
        return true;
      }

      if (
        otherManagerName &&
        otherManagerCardType &&
        otherManagerCardNum &&
        otherManagerAddress
      ) {
        return true;
      }
      return false;
    },
    // 第3个复选框校验
    statusCheck3() {
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
    statusCheck4() {
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
    statusCheck5() {
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
    // 第五个复选框校验
    statusCheck6() {
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
    statusCheck7() {
      const { isNotUsGreenCardHolder, usGreenCardCode } = this.model;
      if (isNotUsGreenCardHolder) {
        return true;
      }
      if (usGreenCardCode) {
        return true;
      }
      return false;
    },
    // 提交按钮是否可点击
    isDisableNext() {
      const check1 = this.statusCheck1;
      const check2 = this.statusCheck2;
      const check3 = this.statusCheck3;
      const check4 = this.statusCheck4;
      const check5 = this.statusCheck5;
      const check6 = this.statusCheck6;
      const check7 = this.statusCheck7;
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
      const obj = { ...this.model, ...this.taxModel };
      const params = {
        step: this.step,
        info: obj,
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    // 增加公司信息
    addCompanyControllerInfo() {
      const idx = this.companyInfoArray.length;
      const array = [
        {
          type: "input",
          modelKey: `companyControllerName${idx}`,
          label: this.getI18n("other.companyControllerName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerJob${idx}`,
          label: this.getI18n("other.companyControllerJob"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerExchange${idx}`,
          label: this.getI18n("other.companyControllerExchange"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerCode${idx}`,
          label: this.getI18n("other.companyControllerCode"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ];
      this.companyInfoArray = [...this.companyInfoArray, array];
    },
    // 删除公司信息
    removeCompanyControllerInfo() {
      const idx = this.companyInfoArray.length - 1;
      this.companyInfoArray.pop();
      this.model[`companyControllerName${idx}`] = "";
      this.model[`companyControllerJob${idx}`] = "";
      this.model[`companyControllerExchange${idx}`] = "";
      this.model[`companyControllerCode${idx}`] = "";
    },

    // 显示tips
    showToast(txt) {
      const toast = this.$createToast({
        type: "warn",
        time: 1000,
        txt,
      });
      toast.show();
    },

    handlerCheckAlert(val, key) {
      if (this.disclosureDefine[key].isCanFalse || val) return;
      const content = this.getI18n(`other.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = true;
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
    "model.isNotConsortWithOtherMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithOtherMargin");
    },
    "model.isNotUsGreenCardHolder"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotUsGreenCardHolder");
    },
  },
};
</script>
