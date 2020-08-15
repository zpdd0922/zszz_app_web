<template>
  <op-wrap :isDisabled="isDisableNext" :btnText="getI18n('nextBtn')" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-other">
      <cube-form :model="model" class="step-content">
        <head-title :title="titleValues.title"></head-title>
        <!-- 是否唯一收益拥有人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountOwner[0]"></cube-form-item>
          <template v-if="disclosureDefine.isAccountOwner.isCanFalse && !model.isAccountOwner">
            <cube-form-item :field="fieldsAccountOwner[1]"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner[2]"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner[3]"></cube-form-item>
          </template>
        </cube-form-group>  
        <!-- 是否唯一指示人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountOwner[0]"></cube-form-item>
          <template v-if="disclosureDefine.isAccountManager.isCanFalse && !model.isAccountManager">
            <cube-form-item :field="fieldsAccountOwner[1]"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner[2]"></cube-form-item>
            <cube-form-item :field="fieldsAccountOwner[3]"></cube-form-item>
          </template>
        </cube-form-group>
        <!-- 是否本公司員工 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOurStaff[0]"></cube-form-item>
          <template v-if="disclosureDefine.isNotOurStaff.isCanFalse && !model.isNotOurStaff">
            <cube-form-item :field="fieldsOurStaff[1]"></cube-form-item>
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

        <!-- 是否交易所參與者關係 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsExchangeParter[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotExchangeParter.isCanFalse &&  !model.isNotExchangeParter"
          >
            <cube-form-item class="label-width-7em" :field="fieldsExchangeParter[1]"></cube-form-item>
            <cube-form-item class="label-width-7em" :field="fieldsExchangeParter[2]"></cube-form-item>
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

        <!-- 是否上市公司董事、股東、高管 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsCompanyController[0]"></cube-form-item>
          <template
            v-if="disclosureDefine.isNotCompanyController.isCanFalse &&  !model.isNotCompanyController"
          >
            <div
              v-for="(item, index) in companyInfoArray"
              :key="index"
              class="disclosure-block-item"
            >
              <em :class="`triangle-icon triangle-icon-${index+1}`"></em>
              <cube-form-item class="label-width-8em" :field="item[0]"></cube-form-item>
              <cube-form-item class="label-width-8em" :field="item[1]"></cube-form-item>
              <cube-form-item class="label-width-8em" :field="item[2]"></cube-form-item>
              <cube-form-item class="label-width-8em" :field="item[3]"></cube-form-item>
            </div>
          </template>
        </cube-form-group>
        <template
          v-if="disclosureDefine.isNotCompanyController.isCanFalse &&  !model.isNotCompanyController"
        >
          <div class="footer">
            <cube-button
              class="add cubeic-add"
              v-if="isAddBtnForCompanyController"
              :light="true"
              inline
              @click="addCompanyControllerInfo"
            >{{getI18n('other.add')}}</cube-button>
            <cube-button
              class="remove cubeic-remove"
              v-if="isRemoveBtnForCompanyController"
              :light="true"
              inline
              @click="removeCompanyControllerInfo"
            >{{getI18n('other.remove')}}</cube-button>
          </div>
        </template>

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

        isNotOurStaff: true,
        ourStaffJob: "",

        isNotOurStaffKin: true,
        ourStaffKinName: "",
        ourStaffKinRelation: "",

        isNotHkexParterStaff: true,
        hkexParterCompany: "",
        hkexParterStaffJob: "",

        isNotExchangeParter: true,
        exchangeParterName: "",
        exchangeParterNation: "",

        isNotCompanyController: true,
        companyControllerName0: "",
        companyControllerName1: "",
        companyControllerName2: "",
        companyControllerName3: "",
        companyControllerName4: "",
        companyControllerJob0: "",
        companyControllerJob1: "",
        companyControllerJob2: "",
        companyControllerJob3: "",
        companyControllerJob4: "",
        companyControllerExchange0: "",
        companyControllerExchange1: "",
        companyControllerExchange2: "",
        companyControllerExchange3: "",
        companyControllerExchange4: "",
        companyControllerCode0: "",
        companyControllerCode1: "",
        companyControllerCode2: "",
        companyControllerCode3: "",
        companyControllerCode4: "",

        isNotUsGreenCardHolder: true,
        usGreenCardCode: "",
      },
      companyInfoArray: [
        [
          {
            type: "input",
            modelKey: "companyControllerName0",
            label: this.getI18n("other.companyControllerName"),
            props: {
              placeholder: this.getI18n("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerJob0",
            label: this.getI18n("other.companyControllerJob"),
            props: {
              placeholder: this.getI18n("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerExchange0",
            label: this.getI18n("other.companyControllerExchange"),
            props: {
              placeholder: this.getI18n("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerCode0",
            label: this.getI18n("other.companyControllerCode"),
            props: {
              placeholder: this.getI18n("other.inputPlaceholder"),
            },
          },
        ],
      ],

      // 是否本账号唯一受益人
      fieldsAccountOwner: [
        {
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
        {
          type: "input",
          modelKey: "otherOwnerName",
          label: this.getI18n("other.otherOwnerName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
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
        {
          type: "input",
          modelKey: "otherOwnerCardNum",
          label: this.getI18n("other.otherOwnerCardNum"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
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
      ],
      // 是否本公司員工
      fieldsOurStaff: [
        {
          type: "checkbox",
          modelKey: "isNotOurStaff",
          props: {
            option: {
              label: this.getI18n("other.isNotOurStaff"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "ourStaffJob",
          label: this.getI18n("other.ourStaffJob"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      // 是否本公司员工亲属关系
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
          modelKey: "hkexParterCompany",
          label: this.getI18n("other.hkexParterCompany"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "hkexParterStaffJob",
          label: this.getI18n("other.hkexParterStaffJob"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      fieldsExchangeParter: [
        {
          type: "checkbox",
          modelKey: "isNotExchangeParter",
          props: {
            option: {
              label: this.getI18n("other.isNotExchangeParter"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "exchangeParterName",
          label: this.getI18n("other.exchangeParterName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "exchangeParterNation",
          label: this.getI18n("other.exchangeParterNation"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
          },
        },
      ],
      fieldsCompanyController: [
        {
          type: "checkbox",
          modelKey: "isNotCompanyController",
          props: {
            option: {
              label: this.getI18n("other.isNotCompanyController"),
              value: true,
            },
            shape: "square",
          },
        },
      ],
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
      const { isNotOurStaff, ourStaffJob } = this.model;
      if (isNotOurStaff) {
        return true;
      }
      if (ourStaffJob) {
        return true;
      }
      return false;
    },
    // 第二个复选框校验
    statusCheck2() {
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
    // 第三个复选框校验
    statusCheck3() {
      const {
        isNotHkexParterStaff,
        hkexParterCompany,
        hkexParterStaffJob,
      } = this.model;
      if (isNotHkexParterStaff) {
        return true;
      }
      if (hkexParterCompany && hkexParterStaffJob) {
        return true;
      }
      return false;
    },
    // 第四个复选框校验
    statusCheck4() {
      const {
        isNotExchangeParter,
        exchangeParterName,
        exchangeParterNation,
      } = this.model;
      if (isNotExchangeParter) {
        return true;
      }
      if (exchangeParterName && exchangeParterNation) {
        return true;
      }
      return false;
    },
    // 第五个复选框校验
    statusCheck5() {
      const { isNotCompanyController } = this.model;
      if (isNotCompanyController) {
        return true;
      }
      const check = this.companyInfoArray.map((val, idx) => {
        const idx1 = `companyControllerName${idx}`;
        const idx2 = `companyControllerJob${idx}`;
        const idx3 = `companyControllerExchange${idx}`;
        const idx4 = `companyControllerCode${idx}`;
        if (
          this.model[idx1] &&
          this.model[idx2] &&
          this.model[idx3] &&
          this.model[idx4]
        ) {
          return true;
        }
        return false;
      });
      return !check.includes(false);
      // return false
    },
    // 第六个复选框校验
    statusCheck6() {
      const { isNotUsGreenCardHolder } = this.model;
      if (isNotUsGreenCardHolder) {
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
      if (check1 && check2 && check3 && check4 && check5 && check6) {
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
    // "model.isAccountOwner"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isAccountOwner");
    // },
    // "model.isNotOurStaffKin"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotOurStaffKin");
    // },
    // "model.isNotOurStaff"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotOurStaff");
    // },
    // "model.isNotExchangeParter"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotExchangeParter");
    // },
    // "model.isNotHkexParterStaff"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotHkexParterStaff");
    // },
    // "model.isNotCompanyController"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotCompanyController");
    // },
    // "model.isNotUsGreenCardHolder"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isNotUsGreenCardHolder");
    // },
  },
};
</script>
