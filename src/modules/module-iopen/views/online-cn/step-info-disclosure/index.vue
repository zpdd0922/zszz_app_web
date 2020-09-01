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
        <!-- <cube-form-group class="custom-form-group">
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
 -->
        <!-- 是否与本公司员工有关系 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOurStaffKin.unrelatedToWLSStaff"></cube-form-item>
          <template v-if="disclosureDefine.isNotOurStaffKin.isCanFalse &&  !model.isNotOurStaffKin">
            <cube-form-item :field="fieldsOurStaffKin.relatedStaffName"></cube-form-item>
            <cube-form-item :field="fieldsOurStaffKin.relationship"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否港交所參與者僱員 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsHkexParterStaff.isNotHkexParterStaff"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotHkexParterStaff.isCanFalse &&  !model.isNotHkexParterStaff"
          >
            <cube-form-item :field="fieldsHkexParterStaff.hkexParterName"></cube-form-item>
            <cube-form-item :field="fieldsHkexParterStaff.hkexParterCENo"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 配偶是否拥有保证金账户 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithMargin.isNotConsortWithMargin"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithMargin.isCanFalse &&  !model.isNotConsortWithMargin"
          >
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithMargin.withMarginName"></cube-form-item>
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithMargin.withMarginAccount"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 本人或配偶是否是其他账户的实际拥有人或担保人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOtherPOorPGWithMargin.isNotBOorPG"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotBOorPG.isCanFalse &&  !model.isNotBOorPG"
          >
            <cube-form-item class="label-width-5em" :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginName"></cube-form-item>
            <cube-form-item class="label-width-5em" :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginAccount"></cube-form-item>
          </template>
        </cube-form-group>
        
        <!-- 是否大于35% -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsConsortWithOtherMargin.isNotConsortWithOtherMargin"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotConsortWithOtherMargin.isCanFalse &&  !model.isNotConsortWithOtherMargin"
          >
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithOtherMargin.withOtherMarginName"></cube-form-item>
            <cube-form-item class="label-width-4em" :field="fieldsConsortWithOtherMargin.withOtherMarginAccount"></cube-form-item>
          </template>
        </cube-form-group>

        <!-- 是否美國綠卡 -->
        <cube-radio-group :field="fieldUsGreenCard">
          <cube-radio
            v-model="isNotUsGreenCardHolder"
            :option="greenCardOptionsList.notGreenCardHolder"
          ></cube-radio>
          <cube-radio
            v-model="isNotUsGreenCardHolder"
            :option="greenCardOptionsList.notAmericanBornInUS"
          ></cube-radio>
          <cube-radio
            v-model="isNotUsGreenCardHolder"
            :option="greenCardOptionsList.greenCardHolder"
          ></cube-radio>
        </cube-radio-group>
        <!-- <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsUsGreenCard.isNotUsGreenCardHolder"></cube-form-item> -->
          <!-- <template
            v-if="disclosureDefine.isNotUsGreenCardHolder.isCanFalse &&  !model.isNotUsGreenCardHolder"
          >
            <cube-form-item class="label-width-10em" :field="fieldsUsGreenCard.usGreenCardCode"></cube-form-item>
          </template> -->
        <!-- </cube-form-group> -->
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
      greenCardOptionsList: optionsList.getUsGreenCardOptions(),
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

        isNotBOorPG: true,
        otherPOorBGMarginName: '',
        otherPOorBGMarginAccount: '',

        isNotConsortWithOtherMargin: true,
        withOtherMarginName: "",
        withOtherMarginAccount: "",

        isNotUsGreenCardHolder: "",
        // usGreenCardCode: "",
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
      // // 2 是否本账号唯一指示人
      // fieldsAccountManager: [
      //   {
      //     type: "checkbox",
      //     modelKey: "isAccountManager",
      //     props: {
      //       option: {
      //         label: this.getI18n("other.isAccountManager"),
      //         value: true,
      //       },
      //       shape: "square",
      //     },
      //   },
      //   {
      //     type: "input",
      //     modelKey: "otherManagerName",
      //     label: this.getI18n("other.otherManagerName"),
      //     props: {
      //       placeholder: this.getI18n("other.otherManagerName"),
      //     },
      //   },
      //   {
      //     type: "select",
      //     modelKey: "otherManagerCardType",
      //     label: this.getI18n("other.otherManagerCardType"),
      //     props: {
      //       options: [
      //         {
      //           text: this.getI18n("other.otherManagerCardTypeOptions")[0],
      //           value: "身份证",
      //         },
      //         {
      //           text: this.getI18n("other.otherManagerCardTypeOptions")[1],
      //           value: "护照",
      //         },
      //       ],
      //       placeholder: this.getI18n("other.selectPlaceholder"),
      //     },
      //   },
      //   {
      //     type: "input",
      //     modelKey: "otherManagerCardNum",
      //     label: this.getI18n("other.otherManagerCardNum"),
      //     props: {
      //       placeholder: this.getI18n("other.inputPlaceholder"),
      //     },
      //   },
        
      //   {
      //     type: "input",
      //     modelKey: "otherManagerAddress",
      //     label: this.getI18n("other.otherManagerAddress"),
      //     props: {
      //       placeholder: this.getI18n("other.inputPlaceholder"),
      //     },
      //   },
      // ],
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
        hkexParterName:{
          type: "input",
          modelKey: "hkexParterName",
          label: this.getI18n("other.hkexParterName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        hkexParterCENo:{
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
      fieldUsGreenCard: {
        type: "radio-group",
        modelKey: "isNotUsGreenCardHolder",
        props: {
          options: optionsList.getUsGreenCardOptions()
        }
      },
        // usGreenCardCode: {
        //   type: "input",
        //   modelKey: "usGreenCardCode",
        //   label: this.getI18n("other.usGreenCardCode"),
        //   props: {
        //     placeholder: this.getI18n("other.inputPlaceholder"),
        //   },
        // },
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
    accountOwnerStatusCheck() {
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
    // // 第2个复选框校验
    // statusCheck2() {
    //   const {
    //     isAccountManager,
    //     otherManagerName,
    //     otherManagerCardType,
    //     otherManagerCardNum,
    //     otherManagerAddress,
    //   } = this.model;
    //   if (isAccountManager) {
    //     return true;
    //   }

    //   if (
    //     otherManagerName &&
    //     otherManagerCardType &&
    //     otherManagerCardNum &&
    //     otherManagerAddress
    //   ) {
    //     return true;
    //   }
    //   return false;
    // },
    // 第3个复选框校验
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
      console.log(1)
      console.log(this.model)
      console.log(2)
      const obj = { ...this.model};
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
    "model.isNotBOorPG"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotBOorPG");
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
