<template>
  <op-wrap
    :isDisabled="isDisableNext"
    :btnText="getI18nContent('nextBtn')"
    @handleNext="handleNext"
  >
    <div class="olhk-step olhk-step-info-other">
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
            >继续添加</cube-button>
            <cube-button
              class="remove cubeic-remove"
              v-if="isRemoveBtnForCompanyController"
              :light="true"
              inline
              @click="removeCompanyControllerInfo"
            >删除上条</cube-button>
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
        <!-- 是否允許作為促銷 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOther[0]"></cube-form-item>
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
      <!-- 税务信息 -->
      <div class="step-content privacy-box">
        <head-title title="税务信息"></head-title>
        <!-- 税务第一条信息 -->
        <div class="custom-form-group privacy-block-group">
          <div class="cube-form-item privacy-block-item">
            <em class="triangle-icon triangle-icon-1" />
            <label class="cube-form-label">司法管辖区</label>
            <div class="cube-form-field">
              <template v-if="isChina">
                <input
                  class="col-3"
                  type="text"
                  placeholder="请输入司法管辖区"
                  v-model="taxModel.defaultCountryCn"
                  maxlength="50"
                />
              </template>
              <template v-if="isHK">
                <input
                  class="col-3"
                  type="text"
                  placeholder="请输入司法管辖区"
                  v-model="taxModel.defaultCountryHk"
                  maxlength="50"
                />
              </template>
              <template v-if="isOther">
                <input
                  class="col-3"
                  type="text"
                  placeholder="请输入司法管辖区"
                  v-model="taxModel.defaultCountryOther"
                  maxlength="50"
                />
              </template>
            </div>
            <!-- <input type="text" disabled="disabled" value="中国大陆" /> -->
          </div>
          <div class="cube-form-item privacy-block-item">
            <label class="cube-form-label">税务编号</label>
            <div class="cube-form-field">
              <input
                class="cube-input-field"
                maxlength="18"
                type="text"
                v-model="taxModel.defaultPrivacyNum"
                placeholder="请输入税务编号"
              />
            </div>
          </div>
        </div>
        <privacy-form
          :privacy="privacyArray"
          @countryDesc="countryDesc"
          @changeOfferNum="changeOfferNum"
          @changeCanNum="changeCanNum"
          @changeNoOfferNum="changeNoOfferNum"
          @changeReasonDesc="changeReasonDesc"
        ></privacy-form>
        <div class="btn-box">
          <div class="add" @click="addTaxInfo">+ 添加新的税务信息</div>
          <div
            class="dele"
            :class="{'no-del': isGrayRemoveBtnForTax}"
            @click="delTaxInfo"
          >- 删除上个税务信息</div>
        </div>
        <p
          class="error-tips"
        >警告：根据《税务条例》第80(2E)条，如任何人在作出自我证明时，在明知一项陈述在要项上属具误导性、虚假或不正确，或罔顾一项陈述是否在要项上属具误导性、虚假或不正确下，作出该项陈述，即属犯罪。一经定罪，可处第3级（即港币$10,000）罚款。有关定罪及处罚按不时修订的法例为准。</p>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from "vuex";
import { confirm, alert } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen/format/format-hk/other";
import privacyForm from "./comPrivacyForm";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  components: {
    "privacy-form": privacyForm,
  },
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

        isAllowProvidePrivacy: true,
      },
      companyInfoArray: [
        [
          {
            type: "input",
            modelKey: "companyControllerName0",
            label: this.getI18nContent("other.companyControllerName"),
            props: {
              placeholder: this.getI18nContent("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerJob0",
            label: this.getI18nContent("other.companyControllerJob"),
            props: {
              placeholder: this.getI18nContent("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerExchange0",
            label: this.getI18nContent("other.companyControllerExchange"),
            props: {
              placeholder: this.getI18nContent("other.inputPlaceholder"),
            },
          },
          {
            type: "input",
            modelKey: "companyControllerCode0",
            label: this.getI18nContent("other.companyControllerCode"),
            props: {
              placeholder: this.getI18nContent("other.inputPlaceholder"),
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
              label: this.getI18nContent("other.isAccountOwner"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "otherOwnerName",
          label: this.getI18nContent("other.otherOwnerName"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "select",
          modelKey: "otherOwnerCardType",
          label: this.getI18nContent("other.otherOwnerCardType"),
          props: {
            options: [
              {
                text: this.getI18nContent("other.otherOwnerCardTypeOptions")[0],
                value: "身份证",
              },
              {
                text: this.getI18nContent("other.otherOwnerCardTypeOptions")[1],
                value: "护照",
              },
            ],
            placeholder: this.getI18nContent("other.selectPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "otherOwnerCardNum",
          label: this.getI18nContent("other.otherOwnerCardNum"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
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
              label: this.getI18nContent("other.isNotOurStaff"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "ourStaffJob",
          label: this.getI18nContent("other.ourStaffJob"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
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
              label: this.getI18nContent("other.isNotOurStaffKin"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "ourStaffKinName",
          label: this.getI18nContent("other.ourStaffKinName"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "ourStaffKinRelation",
          label: this.getI18nContent("other.ourStaffKinRelation"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
      ],
      fieldsHkexParterStaff: [
        {
          type: "checkbox",
          modelKey: "isNotHkexParterStaff",
          props: {
            option: {
              label: this.getI18nContent("other.isNotHkexParterStaff"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "hkexParterCompany",
          label: this.getI18nContent("other.hkexParterCompany"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "hkexParterStaffJob",
          label: this.getI18nContent("other.hkexParterStaffJob"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
      ],
      fieldsExchangeParter: [
        {
          type: "checkbox",
          modelKey: "isNotExchangeParter",
          props: {
            option: {
              label: this.getI18nContent("other.isNotExchangeParter"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "exchangeParterName",
          label: this.getI18nContent("other.exchangeParterName"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: "exchangeParterNation",
          label: this.getI18nContent("other.exchangeParterNation"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
      ],
      fieldsCompanyController: [
        {
          type: "checkbox",
          modelKey: "isNotCompanyController",
          props: {
            option: {
              label: this.getI18nContent("other.isNotCompanyController"),
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
              label: this.getI18nContent("other.isNotUsGreenCardHolder"),
              value: true,
            },
            shape: "square",
          },
        },
        {
          type: "input",
          modelKey: "usGreenCardCode",
          label: this.getI18nContent("other.usGreenCardCode"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
      ],
      fieldsOther: [
        {
          type: "checkbox",
          modelKey: "isAllowProvidePrivacy",
          props: {
            option: {
              label: this.getI18nContent("other.isAllowProvidePrivacy"),
              value: true,
            },
            shape: "square",
          },
        },
      ],
      taxModel: {
        infoCardCount: 0,
        offerPrivacy1: "",
        offerPrivacy2: "",
        offerPrivacy3: "",
        offerPrivacy4: "",
        noOfferPrivacy1: "",
        noOfferPrivacy2: "",
        noOfferPrivacy3: "",
        noOfferPrivacy4: "",
        canPrivacyNum1: "",
        canPrivacyNum2: "",
        canPrivacyNum3: "",
        canPrivacyNum4: "",
        reasonDesc1: "",
        reasonDesc2: "",
        reasonDesc3: "",
        reasonDesc4: "",
        country1: "",
        country2: "",
        country3: "",
        country4: "",
        defaultCountryCn: "",
        defaultCountryHk: "",
        defaultCountryOther: "",
        defaultPrivacyNum: "",
      },
      infoCount: 0, // 税务个数
      reasonIndex: null,
      disclosureDefine: disclosureDefine,
    };
  },
  computed: {
    ...mapGetters(["openInfo"]),
    titleValues() {
      return {
        title: this.getI18nContent("other.title"),
      };
    },
    step() {
      return this.$route.meta.step;
    },
    nextStep() {
      return this.$route.meta.nextStep;
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

    privacyArray() {
      if (Number(this.taxModel.infoCardCount) === 0) return [];
      const privacyArray = [];
      for (let i = 0; i < Number(this.taxModel.infoCardCount); i++) {
        privacyArray.push({
          offerPrivacyKey: this.taxModel[`offerPrivacy${i + 1}`],
          noOfferPrivacyKey: this.taxModel[`noOfferPrivacy${i + 1}`],
          canPrivacyNumKey: this.taxModel[`canPrivacyNum${i + 1}`],
          reasonDescKey: this.taxModel[`reasonDesc${i + 1}`],
          countryKey: this.taxModel[`country${i + 1}`],
        });
      }
      return privacyArray;
    },
    // 中国大陆国籍
    isChina() {
      const { idKindKey } = this.openInfo;
      if (idKindKey === "idCardCn") {
        return true;
      }
      return false;
    },
    // 中国香港
    isHK() {
      const { idKindKey } = this.openInfo;
      // 香港永久身份与香港临时身份证
      if (idKindKey === "idCardHk" || idKindKey === "idCardHkTemp") {
        return true;
      }
      return false;
    },
    // 其他地区
    isOther() {
      const { idKindKey } = this.openInfo;
      if (idKindKey === "passport") {
        return true;
      }
      return false;
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
    statusCheckTax() {
      if (!this.taxModel.defaultPrivacyNum) return false;
      if (this.isChina && !this.taxModel.defaultCountryCn) {
        return false;
      } else if (this.isHK && !this.taxModel.defaultCountryHk) {
        return false;
      } else if (this.isOther && !this.taxModel.defaultCountryOther) {
        return false;
      }

      if (Number(this.taxModel.infoCardCount) === 0) {
        return true;
      }
      let isCanNextInfo;
      for (let i = 0; i < this.privacyArray.length; i++) {
        if (
          this.privacyArray[i].offerPrivacyKey &&
          this.privacyArray[i].countryKey &&
          this.privacyArray[i].offerPrivacyKey === "can" &&
          Boolean(this.privacyArray[i].canPrivacyNumKey)
        ) {
          isCanNextInfo = true;
        } else if (
          this.privacyArray[i].offerPrivacyKey &&
          this.privacyArray[i].countryKey &&
          this.privacyArray[i].noOfferPrivacyKey &&
          this.privacyArray[i].noOfferPrivacyKey === "B" &&
          this.privacyArray[i].reasonDescKey
        ) {
          isCanNextInfo = true;
        } else if (
          this.privacyArray[i].offerPrivacyKey &&
          this.privacyArray[i].countryKey &&
          this.privacyArray[i].noOfferPrivacyKey &&
          this.privacyArray[i].noOfferPrivacyKey !== "B"
        ) {
          isCanNextInfo = true;
        } else {
          isCanNextInfo = false;
          break;
        }
      }
      return isCanNextInfo;
    },

    // 提交按钮是否可点击
    isDisableNext() {
      const check1 = this.statusCheck1;
      const check2 = this.statusCheck2;
      const check3 = this.statusCheck3;
      const check4 = this.statusCheck4;
      const check5 = this.statusCheck5;
      const check6 = this.statusCheck6;
      const checkTax = this.statusCheckTax;
      if (
        check1 &&
        check2 &&
        check3 &&
        check4 &&
        check5 &&
        check6 &&
        checkTax
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
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

      Object.keys(this.taxModel).forEach((val) => {
        this.taxModel[val] = userInfo[val] ? userInfo[val] : this.taxModel[val];
      });
      this.taxModel.defaultPrivacyNum = userInfo.defaultPrivacyNum
        ? userInfo.defaultPrivacyNum
        : userInfo.idCardValue;
      this.taxModel.infoCount = userInfo.infoCardCount || 0;

      if (userInfo.idKindKey === "idCardCn") {
        this.taxModel.defaultCountryCn = userInfo.defaultCountryCn
          ? userInfo.defaultCountryCn
          : "中国大陆";
      } else if (
        userInfo.idKindKey === "idCardHk" ||
        userInfo.idKindKey === "idCardHkTemp"
      ) {
        this.taxModel.defaultCountryHk = userInfo.defaultCountryHk
          ? userInfo.defaultCountryHk
          : "中国香港";
      } else if (userInfo.idKindKey === "passport") {
        this.taxModel.defaultCountryOther = userInfo.defaultCountryOther
          ? userInfo.defaultCountryOther
          : userInfo.nationTxt && userInfo.nationTxt.length
          ? userInfo.nationTxt
          : "";
      }
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
          label: this.getI18nContent("other.companyControllerName"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerJob${idx}`,
          label: this.getI18nContent("other.companyControllerJob"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerExchange${idx}`,
          label: this.getI18nContent("other.companyControllerExchange"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
          },
        },
        {
          type: "input",
          modelKey: `companyControllerCode${idx}`,
          label: this.getI18nContent("other.companyControllerCode"),
          props: {
            placeholder: this.getI18nContent("other.inputPlaceholder"),
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
    // 选择是否可以提供税务编号
    changeOfferNum(type, index) {
      if (type === "can") {
        this.taxModel[`noOfferPrivacy${index + 1}`] = "";
        this.taxModel[`reasonDesc${index + 1}`] = "";
      } else {
        this.taxModel[`canPrivacyNum${index + 1}`] = "";
      }
      this.taxModel[`offerPrivacy${index + 1}`] = type;
    },

    // 输入国籍
    countryDesc(e, index) {
      this.taxModel[`country${index + 1}`] = e.target.value;
    },

    // 输入税号
    changeCanNum(e, index) {
      this.taxModel[`canPrivacyNum${index + 1}`] = e.target.value;
    },

    // 不能提供税号的理由
    changeNoOfferNum(index, type) {
      this.taxModel[`noOfferPrivacy${index + 1}`] = type;
      if (type !== "B" && this.reasonIndex !== index) {
        this.taxModel.reasonIndex = index;
        this.taxModel[`reasonDesc${index + 1}`] = "";
      }
    },

    // 理由填写
    changeReasonDesc(e, index) {
      this.taxModel[`reasonDesc${index + 1}`] = e.target.value;
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
    // 增加税务信息
    addTaxInfo() {
      if (Number(this.taxModel.infoCardCount) === 4) {
        this.showToast("最多填报5个税务信息");
        return false;
      }
      this.taxModel[`offerPrivacy${++this.infoCount}`] = "can";
      this.taxModel.infoCardCount = this.infoCount;
    },

    // 删除税务信息
    delTaxInfo() {
      if (Number(this.taxModel.infoCardCount) === 0) {
        this.showToast("最少填报1个税务信息");
        return false;
      }
      this.taxModel[`country${this.infoCount}`] = "";
      this.taxModel[`offerPrivacy${this.infoCount}`] = "";
      this.taxModel[`noOfferPrivacy${this.infoCount}`] = "";
      this.taxModel[`canPrivacyNum${this.infoCount}`] = "";
      this.taxModel.infoCardCount = --this.infoCount;
    },
    getI18nContent(key, type = "") {
      return this.$t(`openAccount.openHk.infoDisclosure.${key}`);
    },
    handlerCheckAlert(val, key) {
      if (this.disclosureDefine[key].isCanFalse || val) return;
      const content = this.getI18nContent(`other.${key}Alert`);
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
    "model.isNotOurStaffKin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotOurStaffKin");
    },
    "model.isNotOurStaff"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotOurStaff");
    },
    "model.isNotExchangeParter"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotExchangeParter");
    },
    "model.isNotHkexParterStaff"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotHkexParterStaff");
    },
    "model.isNotCompanyController"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotCompanyController");
    },
    "model.isNotUsGreenCardHolder"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotUsGreenCardHolder");
    },
  },
};
</script>
