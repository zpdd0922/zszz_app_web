<template>
  <op-wrap :isDisabled="isDisableNext" :btnText="getI18n('nextBtn')" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-declare">
      <cube-form :model="model" class="step-content">
        <head-title :title="i18nValues.isAllowProvidePrivacy.title"></head-title>
        <!-- 是否允許作為促銷 -->
        <p class="declare-item-content">{{i18nValues.isAllowProvidePrivacy.tipsContent}}</p>
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOther.isAllowProvidePrivacy" />
        </cube-form-group>
        <p class="declare-item-content">{{i18nValues.isAllowProvidePrivacy.content}}</p>
      </cube-form>
      <div class="margin-bottom"></div>
        <!-- 是否北向交易 -->
      <!-- <cube-form :model="model" class="step-content">
        <head-title :title="i18nValues.northTrade.title"></head-title>
        <p class="declare-item-content">{{i18nValues.northTrade.tipsContent}}</p>
        <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsOther.northTrade" />
        </cube-form-group>
        <p class="declare-item-content">{{i18nValues.northTrade.content}}</p>
      </cube-form> -->
      <!-- <div class="margin-bottom"></div> -->
      <!-- 税务信息 -->
      <div class="step-content privacy-box">
        <head-title :title="getI18n('tax.title')"></head-title>
        <!-- 税务第一条信息 -->
        <div class="custom-form-group privacy-block-group">
          <div class="cube-form-item privacy-block-item">
            <em class="triangle-icon triangle-icon-1" />
            <label class="cube-form-label">{{getI18n('tax.countryKey.label')}}</label>
            <div class="cube-form-field">
              <span>{{getI18n('tax.taxCn')}}</span>
            </div>
          </div>
          <div class="cube-form-item privacy-block-item">
            <label class="cube-form-label">{{getI18n('tax.privacyNum.label')}}</label>
            <div class="cube-form-field">
              <input
                class="cube-input-field"
                maxlength="18"
                type="text"
                :placeholder="getI18n('tax.privacyNum.placeholder')"
                v-model="taxModel.defaultPrivacyNum"
              />
            </div>
          </div>
        </div>
        <com-privacy-form
          :privacy="privacyArray"
          @countryDesc="countryDesc"
          @changeOfferNum="changeOfferNum"
          @changeCanNum="changeCanNum"
          @changeNoOfferNum="changeNoOfferNum"
          @changeReasonDesc="changeReasonDesc"
        ></com-privacy-form>
        <div class="btn-box">
          <div class="add" @click="addTaxInfo">+ {{getI18n('tax.add')}}</div>
          <div
            class="dele"
            :class="{'no-del': isGrayRemoveBtnForTax}"
            @click="delTaxInfo"
          >- {{getI18n('tax.remove')}}</div>
        </div>
        <p class="error-tips">{{getI18n('tax.tips')}}</p>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen/format/format-hk/other";
import ComPrivacyForm from "./com-privacy-form";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  mixins: [onlineMixin],
  components: {
    ComPrivacyForm,
  },
  data() {
    return {
      model: {
        isAllowProvidePrivacy: 1,
        // northTrade: 1,
      },
      fieldsOther: {
        isAllowProvidePrivacy: {
          type: "radio-group",
          modelKey: "isAllowProvidePrivacy",
          props: {
            colNum: 2,
            horizontal: true,
            options: [
              {
                label: this.getI18n("agreen"),
                value: 1,
              },
              {
                label: this.getI18n("notAgreen"),
                value: 0,
              },
            ],
            shape: "square",
          },
        },
        northTrade: {
          type: "radio-group",
          modelKey: "northTrade",
          props: {
            horizontal: true,
            colNum: 2,
            options: [
              {
                label: this.getI18n("agreen"),
                value: 1,
              },
              {
                label: this.getI18n("notAgreen"),
                value: 0,
              },
            ],
            shape: "square",
          },
        },
        fatca: {
          type: "radio-group",
          modelKey: "fatca",
          props: {
            colNum: 2,
            options: [
              {
                label: this.getI18n("agreen"),
                value: 1,
              },
              {
                label: this.getI18n("notAgreen"),
                value: 0,
              },
            ],
            shape: "square",
          },
        },
      },
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
    i18nValues() {
      return {
        isAllowProvidePrivacy: {
          title: this.getI18n("isAllowProvidePrivacy.title"),
          tips: this.getI18n("isAllowProvidePrivacy.tips"),
          tipsContent: this.getI18n("isAllowProvidePrivacy.tipsContent"),
          content: this.getI18n("isAllowProvidePrivacy.content"),
        },
        northTrade: {
          title: this.getI18n("northTrade.title"),
          tips: this.getI18n("northTrade.tips"),
          tipsContent: this.getI18n("northTrade.tipsContent"),
          content: this.getI18n("northTrade.content"),
        },
        // fatca: {
        //   title: this.getI18n("fatca.title"),
        //   tips: this.getI18n("fatca.tips"),
        //   tipsContent: this.getI18n("fatca.tipsContent"),
        //   content: this.getI18n("fatca.content"),
        // },
      };
    },
    tipsValues() {
      return {
        isAllowProvidePrivacy: this.getI18n("isAllowProvidePrivacy.tips"),
        northTrade: this.getI18n("northTrade.tips"),
        fatca: this.getI18n("fatca.tips"),
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
      console.log(this.privacyArray)
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
      const checkTax = this.statusCheckTax;
      if (checkTax) {
        return false;
      }
      return true;
    },
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("infoDeclare", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;

      Object.keys(this.model).forEach((val) => {
        const res =
          userInfo[val] || userInfo[val] === 0
            ? userInfo[val]
            : this.model[val];
        this.model[val] = res;
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
          : this.getI18n("tax.taxCn");
      } else if (
        userInfo.idKindKey === "idCardHk" ||
        userInfo.idKindKey === "idCardHkTemp"
      ) {
        this.taxModel.defaultCountryHk = userInfo.defaultCountryHk
          ? userInfo.defaultCountryHk
          : this.getI18n("tax.taxHk");
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
        this.showToast(this.getI18n("tax.max"));
        return false;
      }
      this.taxModel[`offerPrivacy${++this.infoCount}`] = "can";
      this.taxModel.infoCardCount = this.infoCount;
    },

    // 删除税务信息
    delTaxInfo() {
      if (Number(this.taxModel.infoCardCount) === 0) {
        this.showToast(this.getI18n("tax.min"));
        return false;
      }
      this.taxModel[`country${this.infoCount}`] = "";
      this.taxModel[`offerPrivacy${this.infoCount}`] = "";
      this.taxModel[`noOfferPrivacy${this.infoCount}`] = "";
      this.taxModel[`canPrivacyNum${this.infoCount}`] = "";
      this.taxModel.infoCardCount = --this.infoCount;
    },
    handleToTips(key) {
      // e.preventDefault();
      // this.$refs.agreementPopup.show();
      // this.isShowAgreementPopup = true;
      const values = this.i18nValues[key];
      alert({
        title: values.title,
        content: values.tipsContent,

        confirmTxt: this.$t("iOpen.openCn.risk.agreement.dialogBtn"),
        showClose: true,
        callback: () => {
          this.model.riskAgreement = true;
        },
      });
    },
  },
  created() {
    this.updateInfo();
  },
  watch: {},
};
</script>
