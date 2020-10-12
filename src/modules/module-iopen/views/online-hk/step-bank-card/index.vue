<template>
  <op-wrap :isDisabled="isDisabled" @handleNext="handleNext">
    <div class="olhk-step olhk-step-bank-card">
      <div class="step-content bank-card-tips">
        <p v-html="tipsContent"></p>
      </div>
      <div class="margin-bottom"></div>
      <cube-form :model="model">
        <!-- 銀行信息 -->
        <cube-form-group class="step-content custom-form-group">
          <cube-form-item :field="fieldsBank.bankId"></cube-form-item>
          <template v-if="model.bankId === bankValue.OTHERS">
            <cube-form-item :field="fieldsBank.otherBankName"></cube-form-item>
          </template>
          <cube-form-item :field="fieldsBank.bankNum">
            <div class="cube-input">
              <input
                type="text"
                v-model="model.bankNum"
                class="cube-input-field"
                maxlength="30"
                :placeholder="fieldsBank.bankNum.props.placeholder"
              />
            </div>
          </cube-form-item>
          <cube-form-item :field="fieldsBank.bankCurrency"></cube-form-item>
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
      <!-- 银行凭证 -->
      <!-- <p class="step-content step-content-upload-tips">{{getI18n('imgTips')}}</p>
      <ul class="step-content step-content-bank-card-upload">
        <li>
          <camera
            :uploadFiles="BankCardUploadFiles"
            :uploadList="BankCardFile"
            :uploadBase="BankCardUpload"
            :cameraType="cameraType"
            :isCanSelect="isCanSelect"
            @uploadAfter="handleUpload"
          />
        </li>
      </ul> 
      <div class="margin-bottom"></div>-->
      <div class="bank-card-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { bankValue, bankOptions } from "./bankList";
import { CAMERA_TYPE } from "../../../components/camera/upload-tools";
import { getSexFromCard, getBirthFromCard } from "@/main/utils/format/idcard";
import { getPreDay } from "@/main/utils/format/date";
import { getAge } from "@/main/utils/format/idcard";
import { toDBC } from "@/main/utils/format/formatter";
import validate from "@/main/utils/format/validate";

import {
  SUFFIX,
  BASE64,
  BankCardFace,
  TemporaryIdCardHK,
  TemporaryIdCardProveHK,
  IDCardFace,
  IDCardBack,
  IdCardHK,
  Passport,
  IMAGE_REQUEST_LIST,
} from "../../../api/params-define";

// 重置香港银行卡默认提示图
// 并增加可点击预览示例图 preview: url
const BankBgHK = require("@/modules/module-iopen/assets/images/bank-card/bank-hk-bg.png");
const BankImgHK = require("@/modules/module-iopen/assets/images/bank-card/bank-hk-img.png");
// const defaultBankCardHK = Object.assign({}, IMAGE_REQUEST_LIST[BankCardFace], {
//   // placehold: BankBgHK,
//   // preview: BankImgHK,
// });

const defaultBankCardHK = {
  [BankCardFace]: IMAGE_REQUEST_LIST[BankCardFace],
};

// TODO: 處理手機號為驗證用
export default {
  mixins: [onlineMixin],

  data() {
    return {
      bankValue,
      model: {
        bankUserName: "",
        bankName: "", // 银行名称
        otherBankName: "", // 其他银行名称
        bankId: "", // 银行编码
        bankNum: "", // 银行卡
        bankCurrency: "", // 幣種
      },
      // 大陆
      BankCardFile: {},
      BankCardUpload: {},
      BankCardUploadFiles: defaultBankCardHK,
      cameraType: CAMERA_TYPE.CUSTOMER_CAMERA,
      isCanSelect: false,
      fieldsBank: {
        bankId: {
          type: "select",
          modelKey: "bankId",
          label: this.getI18n("bankId.label"),
          events: {
            change: (value, index, text) => {
              this.model.bankName = text;
            },
          },
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("bankId.placeholder"),
            options: bankOptions(),
          },
        },
        bankNum: {
          type: "input",
          modelKey: "bankNum",
          label: this.getI18n("bankNum.label"),
          props: {
            placeholder: this.getI18n("bankNum.placeholder"),
            type: "number",
            maxlength: 5,
          },
        },
        otherBankName: {
          type: "input",
          modelKey: "otherBankName",
          label: this.getI18n("otherBankName.label"),
          props: {
            placeholder: this.getI18n("otherBankName.placeholder"),
            maxlength: 30,
          },
        },
        bankCurrency: {
          type: "select",
          modelKey: "bankCurrency",
          label: this.getI18n("bankCurrency.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("bankCurrency.placeholder"),
            options: [
              {
                value: 1,
                text: this.getI18n("bankCurrency.options.hkd"),
              },
              {
                value: 2,
                text: this.getI18n("bankCurrency.options.usd"),
              },
              {
                value: 3,
                text: this.getI18n("bankCurrency.options.rmb"),
              },
              {
                value: 0,
                text: this.getI18n("bankCurrency.options.multiple"),
              },
            ],
          },
        },
      },
    };
  },
  computed: {
    tipsContent() {
      return (
        this.getI18n("tips").replace(
          "$userName$",
          `<span class='highlight'>(${this.openInfo.enNameValue})</span>`
        ) +
        `<span class='highlight'>${this.getI18n(
          "tips2"
        )}<span class='highlight'>`
      );
    },
    isDisabled() {
      // todo 原因不明，逻辑有问题
      // if(this.model.bankId === this.bankValue.OHTERS){
      //   return false;
      // }

      // const result = Object.values(this.model).every(
      //   (val) => String(val).length
      // );

      let result
      if(this.model.bankId === this.bankValue.OTHERS){
        result = Object.values(this.model).every(
          (val) => String(val).length
        );
      } else {
        result = Object.keys(this.model).filter(val => val !== 'otherBankName')
          .every(val => String(this.model[val]).length)
      }
      // const cardFile = Object.values(this.BankCardFile);
      // const len = 1;

      // const isUpload =
      //   len &&
      //   cardFile.length === len &&
      //   cardFile.every((val) => String(val).length);

      // return !(result && isUpload);
      return !result
    },
  },
  created() {
    console.log('bankValue', bankValue)
    this.updateInfo();
  },
  methods: {
    validBankNum() {
      return this.model.bankNum && this.model.bankNum.length > 3 && validate.isAccountNum(this.model.bankNum)
    },
    validBankName() {
      return validate.isBankName(this.model.otherBankName);
    },
    getI18n(key) {
      return this.getStepI18nValue("bankCard", key);
    },
    // 上传
    handleUpload(file, idFlag, callback) {
      const imgType = idFlag.replace(SUFFIX, "");
      const params = { imgType, imgBase64: file, callback };
      // 判断文件类型是否银行卡
      this.$set(this.BankCardFile, idFlag, "");
      this.$set(this.BankCardUpload, idFlag, file);
      this.saveImage(params).then((res) => {
        const { imgUrl } = res;
        // 判断文件类型是否银行卡
        this.$set(this.BankCardFile, idFlag, imgUrl);
      });
    },
    updateInfo() {
      const userInfo = this.openInfo;
      Object.keys(this.model).forEach((val) => {
        if (val == "bankUserName") {
          this.model[val] = this.openInfo.enNameValue;
        } else {
          const res = userInfo[val] ? userInfo[val] : this.model[val];
          this.model[val] = res;
        }
      });

      // const userImg = this.openImg;

      // const tempKey = `${BankCardFace}${SUFFIX}`;
      // const tempVal = userImg[tempKey] || "";
      // this.$set(this.BankCardFile, tempKey, tempVal);
      // this.$set(this.BankCardUpload, tempKey, tempVal);
    },
    
    handleNext(e) {
      if (!this.validBankNum()) {
        const errorTips = this.getI18n('errorTipsBankNum');
        toast({ type: "error", txt: errorTips, time: 1000 });
        return;
      }
      if (this.model.bankId === this.bankValue.OTHERS) {
        if (!this.validBankName()) {
          const errorTips = this.getI18n('errorTipsBankName');
          toast({ type: "error", txt: errorTips, time: 1000 });
          return;
        }
      }
      //银行名称不为其他清空已填其他值
      if (this.model.bankId !== this.bankValue.OTHERS) {
        this.model.otherBankName = ''
      }
      const params = {
        step: this.step,
        info: this.model,
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    // 处理手机号
    handleUpdatePhone(info, key) {
      const arr = info.split("-");
      if (arr.length > 1) {
        this.model[key] = arr[1];
      } else {
        this.model[key] = arr[0];
      }
    },
  },
  watch: {}
};
</script>

