<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olhk-step olhk-step-id-card">
      <cube-form :model="model">
        <!-- 证件类型 -->
        <cube-form-group class="step-content custom-form-group">
          <cube-form-item :field="nationFields[0]"></cube-form-item>
          <!-- 护照：选择国家/地区 -->
          <template v-if="model.idKindKey === 'passport'">
            <cube-form-item :field="nationFields[1]"></cube-form-item>
          </template>
          <!-- 其他国家/地区：填写国家/地区 -->
          <template v-if="model.nationType === 'OTH'">
            <cube-form-item :field="nationFields[2]" class="custom-form-enName">
              <div class="cube-input">
                <input
                  v-model.trim="model.otherNationality"
                  class="cube-input-field"
                  :placeholder="nationFields[2].props.placeholder"
                />
              </div>
            </cube-form-item>
          </template>
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
      <!-- 内地身份证 -->
      <template v-if="model.idKindKey === 'idCardCn'">
        <p class="step-content step-content-upload-tips">{{getI18n('tips.idCardCn')}}</p>
        <ul class="step-content step-content-id-card-upload">
          <!-- 身份证正面 -->
          <li>
            <camera
              :uploadFiles="IDCardCnFaceUploadFiles"
              :uploadList="IDCardCnFile"
              :uploadBase="IDCardCnUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              :idCardFaceType="1"
            />
          </li>
          <li>
            <!-- 身份证反面 -->
            <camera
              :uploadFiles="IDCardCnBackUploadFiles"
              :uploadList="IDCardCnFile"
              :uploadBase="IDCardCnUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              :idCardFaceType="2"
            />
          </li>
        </ul>
      </template>
      <!-- 香港永久身份證 -->
      <template v-else-if="model.idKindKey === 'idCardHk'">
        <p class="step-content step-content-upload-tips">{{getI18n('tips.idCardHk')}}</p>
        <ul class="step-content step-content-id-card-upload">
          <!-- 身份证正面 -->
          <li>
            <camera
              :uploadFiles="IDCardHkUploadFiles"
              :uploadList="IDCardHkFile"
              :uploadBase="IDCardHkUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              key="3"
            />
          </li>
        </ul>
      </template>
      <!-- 香港临时身份证 -->
      <template v-else-if="model.idKindKey === 'idCardHkTemp'">
        <p class="step-content step-content-upload-tips">{{getI18n('tips.idCardHkTemp')}}</p>
        <ul class="step-content step-content-id-card-upload">
          <!-- 身份证正面 -->
          <li>
            <camera
              :uploadFiles="IDCardHkTempUploadFiles"
              :uploadList="IDCardHKTempFile"
              :uploadBase="IDCardHKTempUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              key="3"
            />
          </li>
          <li>
            <camera
              :uploadFiles="IDCardHkTempMoreUploadFiles"
              :uploadList="IDCardHKTempFile"
              :uploadBase="IDCardHKTempUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              key="4"
            />
          </li>
        </ul>
      </template>
      <!-- 护照 -->
      <template v-else-if="model.idKindKey === 'passport'">
        <p class="step-content step-content-upload-tips">{{getI18n('tips.passport')}}</p>
        <ul class="step-content step-content-id-card-upload">
          <!-- 身份证正面 -->
          <li>
            <camera
              :uploadFiles="PPCardUploadFiles"
              :uploadList="PPCardFile"
              :uploadBase="PPCardUpload"
              :cameraType="cameraType"
              :isCanSelect="isCanSelect"
              @uploadAfter="handleUpload"
              key="5"
            />
          </li>
        </ul>
      </template>
      <div class="margin-bottom"></div>
      <div class="step-content id-card-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
            <li>{{getI18n('desc.content[1]')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { nationOptions } from "./idCardList";
import { CAMERA_TYPE } from "../../../components/camera/upload-tools";
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
import { numberInput } from "@/main/utils/dom/number-dot";
import validate from "@/main/utils/format/validate";
import { toDBC } from "@/main/utils/format/formatter";
// import initNC from '@/main/utils/common/nc';
// OCR
import { getOcrIDCardData } from "../../../format/common/formateOcrId";

// 身份证正面
const defaultIDCardCnFace = {
  [IDCardFace]: IMAGE_REQUEST_LIST[IDCardFace],
};

// 身份证反面
const defaultIDCardCnBack = {
  [IDCardBack]: IMAGE_REQUEST_LIST[IDCardBack],
};

// 香港永久身份证
const defaultIDCardHk = {
  [IdCardHK]: IMAGE_REQUEST_LIST[IdCardHK],
};

// 香港临时身份证
const defaultIDCardHKTemp = {
  [TemporaryIdCardHK]: IMAGE_REQUEST_LIST[TemporaryIdCardHK],
};

// 香港临时身份证补充
const defaultIDCardHKTempMore = {
  [TemporaryIdCardProveHK]: IMAGE_REQUEST_LIST[TemporaryIdCardProveHK],
};

// 护照内页
const defaultPPCard = {
  [Passport]: IMAGE_REQUEST_LIST[Passport],
};

// 用户信息表单key值
const idCardInfoObj = {
  // [IDCardFace]: ['cnNameValue', 'enNameValue', 'idCardValue', 'addressValue', 'birthday', 'sex'],
  [IDCardFace]: [
    "familyName",
    "givenName",
    "familyNameSpell",
    "givenNameSpell",
    "idCardValue",
    "addressValue",
    "birthday",
    "sex",
  ],
  [IDCardBack]: [
    "dateStartValue",
    "dateEndValue",
    "passportStartValue",
    "passportEndValue",
  ],
};

export default {
  mixins: [onlineMixin],
  data() {
    return {
      SUFFIX,
      // 下一页用户信息暂存表
      modelCardInfo: {},

      // 大陆
      IDCardCnFile: {},
      IDCardCnUpload: {},
      IDCardCnFaceUploadFiles: defaultIDCardCnFace,
      IDCardCnBackUploadFiles: defaultIDCardCnBack,
      // 香港
      IDCardHkFile: {},
      IDCardHkUpload: {},
      IDCardHkUploadFiles: defaultIDCardHk,
      // 临时香港身份证
      IDCardHKTempFile: {},
      IDCardHKTempUpload: {},
      IDCardHkTempUploadFiles: defaultIDCardHKTemp,
      IDCardHkTempMoreUploadFiles: defaultIDCardHKTempMore,
      // 护照
      PPCardFile: {},
      PPCardUpload: {},
      PPCardUploadFiles: defaultPPCard,
      nationOptions,
      cameraType: CAMERA_TYPE.CUSTOMER_CAMERA,
      isCanSelect: false,
      model: {
        idKindKey: "", // 证件类型(本地)
        idKind: "",
        nationType: "", // 国家
        nationTxt: "", // 国家
        otherNationality: "", // 其他国家
      },
      nationFields: [
        {
          type: "select",
          modelKey: "idKindKey",
          label: this.getI18n("idKindKey.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("idKindKey.placeholder"),
            options: [
              {
                value: nationOptions.idCardCn.key,
                // text: nationOptions.idCardCn.text,
                text: this.$t("iOpen.common.idKind.idCardCn")
              },
              {
                value: nationOptions.idCardHk.key,
                // text: nationOptions.idCardHk.text,
                text: this.$t("iOpen.common.idKind.idCardHk")
              },
              {
                value: nationOptions.idCardHkTemp.key,
                // text: nationOptions.idCardHkTemp.text,
                text: this.$t("iOpen.common.idKind.idCardHkTemp")
              },
              {
                value: nationOptions.passport.key,
                // text: nationOptions.passport.text,
                text: this.$t("iOpen.common.idKind.passport")
              },
            ],
          },
        },
        {
          type: "select",
          modelKey: "nationType",
          label: this.getI18n('nationType'),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n('nationTypePlaceholder'),
            options: [],
          },
          events: {
            change: (value, index, text) => {
              if (value !== "OTH") {
                this.model.nationTxt = text;
              }
            },
          },
        },
        {
          type: "input",
          modelKey: "otherNationality",
          label: "",
          props: {
            placeholder: this.getI18n('inputOtherCountry'),
            maxlength: 50,
          },
          trigger: "blur",
        },
      ],
    };
  },
  computed: {
    // 检测其他国家
    isCheckOthers() {
      const { idKindKey, nationType, otherNationality } = this.model;
      if (idKindKey && idKindKey === "passport") {
        if (nationType === "OTH" && otherNationality) {
          return true;
        } else if (nationType && nationType !== "OTH") {
          return true;
        }
        return false;
      }
      return true;
    },
    isDisabled() {
      const { idKindKey } = this.model;

      // 其他证件图片 - 根据国籍
      let cardFile = [];
      let len = 0;
      switch (idKindKey) {
        case "idCardCn":
          cardFile = Object.values(this.IDCardCnFile);
          len = 2;
          break;
        case "idCardHk":
          cardFile = Object.values(this.IDCardHkFile);
          len = 1;
          break;
        case "idCardHkTemp":
          cardFile = Object.values(this.IDCardHKTempFile);
          len = 2;
          break;
        case "passport":
          cardFile = Object.values(this.PPCardFile);
          len = 1;
          break;
      }

      const isUpload =
        len &&
        cardFile.length === len &&
        cardFile.every((val) => String(val).length);

      return !(idKindKey && isUpload && this.isCheckOthers);
    },
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("idCard", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      // 表单信息 => 当前页数据
      Object.keys(this.model).forEach((key) => {
        if (userInfo[key]) {
          this.model[key] = userInfo[key];
        }
      });
      // 表单信息 => 下一页 防止重新上传图片更新数据丢失
      Object.values(idCardInfoObj).forEach((item) => {
        item.forEach((key) => {
          const val = userInfo[key] || "";
          this.$set(this.modelCardInfo, key, val);
        });
      });
      // 国籍/地区证件照
      this.handleNationUpload(userInfo.idKindKey);
    },
    // 根据国籍渲染组件
    handleNationUpload(val) {
      const userImg = this.openImg;
      switch (val) {
        case "idCardCn":
          [IDCardFace, IDCardBack].forEach((key) => {
            const idKey = `${key}${SUFFIX}`;
            const idVal = userImg[idKey] || "";
            this.$set(this.IDCardCnFile, idKey, idVal);
            this.$set(this.IDCardCnUpload, idKey, idVal);
          });
          break;
        case "idCardHk":
          const hkKey = `${IdCardHK}${SUFFIX}`;
          const hkVal = userImg[hkKey] || "";
          this.$set(this.IDCardHkFile, hkKey, hkVal);
          this.$set(this.IDCardHkUpload, hkKey, hkVal);
          break;
        case "passport":
          const ppKey = `${Passport}${SUFFIX}`;
          const ppVal = userImg[ppKey] || "";
          this.$set(this.PPCardFile, ppKey, ppVal);
          this.$set(this.PPCardUpload, ppKey, ppVal);
          break;
        case "idCardHkTemp":
          [TemporaryIdCardHK, TemporaryIdCardProveHK].forEach((key) => {
            const idKey = `${key}${SUFFIX}`;
            const idVal = userImg[idKey] || "";
            this.$set(this.IDCardHKTempFile, idKey, idVal);
            this.$set(this.IDCardHKTempUpload, idKey, idVal);
          });
          break;
      }
    },
    // 上传
    handleUpload(file, idFlag, callback) {
      const imgType = idFlag.replace(SUFFIX, "");
      const params = { imgType, imgBase64: file, callback };
      // 判断文件类型是否银行卡
      if (imgType === BankCardFace) {
        this.$set(this.file, idFlag, "");
        this.$set(this.upload, idFlag, file);
      } else {
        // 根据相应上传图片 -- 重置用户信息表单
        if (idCardInfoObj[imgType]) {
          idCardInfoObj[imgType].forEach((key) => {
            this.$set(this.modelCardInfo, key, "");
          });
        } else {
          // 选择非大陆时，清除下一页全部表单
          Object.values(idCardInfoObj).forEach((item) => {
            item.forEach((key) => {
              this.$set(this.modelCardInfo, key, "");
            });
          });
        }

        // 根据国籍赋值base64
        switch (this.model.idKindKey) {
          case "idCardCn":
            this.$set(this.IDCardCnUpload, idFlag, file);
            this.$set(this.IDCardCnFile, idFlag, "");
            break;
          case "idCardHk":
            this.$set(this.IDCardHkUpload, idFlag, file);
            this.$set(this.IDCardHkFile, idFlag, "");
            break;
          case "passport":
            this.$set(this.PPCardUpload, idFlag, file);
            this.$set(this.PPCardFile, idFlag, "");
            break;
          case "idCardHkTemp":
            this.$set(this.IDCardHKTempUpload, idFlag, file);
            this.$set(this.IDCardHKTempFile, idFlag, "");
            break;
        }
      }
      this.saveImage(params).then((res) => {
        const { imgUrl } = res;
        // 判断文件类型是否银行卡
        if (imgType === BankCardFace) {
          this.$set(this.file, idFlag, imgUrl);
        } else {
          // 根据国籍赋值已上传path
          switch (this.model.idKindKey) {
            case "idCardCn":
              this.$set(this.IDCardCnFile, idFlag, imgUrl);
              break;
            case "idCardHk":
              this.$set(this.IDCardHkFile, idFlag, imgUrl);
              break;
            case "idCardHkTemp":
              this.$set(this.IDCardHKTempFile, idFlag, imgUrl);
              break;
            case "passport":
              this.$set(this.PPCardFile, idFlag, imgUrl);
              break;
          }
        }
      });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        this.handleCheckNat()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    handleNext(e) {
      // 保存数据&下一步
      const obj = Object.assign({}, this.model, this.modelCardInfo);
      const params = {
        step: this.step,
        info: obj,
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    // 判断国籍是否大陆 - 需要OCR识别
    handleCheckNat() {
      return new Promise((resolve, reject) => {
        const { idKindKey } = this.model;
        // 不论成功与否都resolve
        if (idKindKey === "idCardCn") {
          // 获取需要OCR的次数
          const changeTimes = Object.values(this.IDCardCnUpload).filter(
            (val) => val.indexOf(BASE64) > -1
          ).length;

          // 未有重新上传图片
          if (!changeTimes) return resolve();

          // 请求识别次数 - 判断请求完成的标志
          let ocrTimes = 0;
          Object.keys(this.IDCardCnUpload).forEach((val) => {
            const imgType = val.replace(SUFFIX, "");
            const isChange = this.IDCardCnUpload[val].indexOf(BASE64) > -1;
            if (isChange) {
              // OCR识别需携带openType，后台区分
              this.$store
                .dispatch("getOcrData", { imgType, openType: 2 })
                .then((ocr) => {
                  // 处理ocr返回数据
                  const { ocrInfo } = getOcrIDCardData(ocr, imgType);
                  // 同步表单
                  Object.keys(ocrInfo).forEach((key) => {
                    this.$set(this.modelCardInfo, key, ocrInfo[key]);
                  });

                  // 请求次数递增
                  ocrTimes++;
                  // 请求完成
                  if (changeTimes === ocrTimes) {
                    return resolve();
                  }
                })
                .catch(() => {
                  ocrTimes++;
                  if (changeTimes === ocrTimes) {
                    return resolve();
                  }
                });
            }
          });
        } else {
          resolve();
        }
      });
    },
    // 获取后台数据字典
    async fetchDataDesin() {
      const result = await this.$store.dispatch(
        "getDictionary",
        this.$t("iOpen.common.nationlityCode")
      );
      const list = result
        .map((res) => ({ text: res.name, value: res.value }))
        .filter((v) => v.value !== "0");
      this.nationFields[1].props.options = list;
    },
  },
  watch: {
    "model.idKindKey": function (newVal, oldVal) {
      const option = nationOptions[newVal];
      this.model.idKind = option.value;
      this.handleNationUpload(newVal);
    },
    "model.otherNationality": function (newVal, oldVal) {
      if (validate.isChinese(newVal)) {
        this.model.otherNationality = "";
        this.model.nationTxt = "";
      } else {
        this.model.otherNationality = toDBC(newVal);
        this.model.nationTxt = toDBC(newVal);
      }
    },
  },
  created() {
    this.fetchDataDesin();
  },
  mounted() {
    this.updateInfo();
  },
};
</script>

