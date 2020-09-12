<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olcn-step olcn-step-id-card">
      <ul class="step-content step-content-id-card-upload">
        <!-- 身份证正面 -->
        <li>
          <!-- <p class="item-title">身份证正面</p> -->
          <camera
            :uploadFiles="uploadFaceFiles"
            :uploadList="file"
            :uploadBase="upload"
            :cameraType="cameraType"
            :isCanSelect="isCanSelect"
            :tips="uploadFaceTips"
            @uploadAfter="handleUpload"
            :scanParams="scanParams"
            :sdkType="sdkType"
            @success="handleSTSuccess"
            :idCardFaceType="1"
          />
        </li>
        <li>
          <!-- 身份证反面 -->
          <!-- <p class="item-title">身份证反面</p> -->
          <camera
            :uploadFiles="uploadBackFiles"
            :uploadList="file"
            :uploadBase="upload"
            :cameraType="cameraType"
            :isCanSelect="isCanSelect"
            :tips="uploadBackTips"
            @uploadAfter="handleUpload"
            :scanParams="scanParams"
            :sdkType="sdkType"
            @success="handleSTSuccess"
            :idCardFaceType="2"
          />
        </li>
      </ul>
      <div class="margin-bottom"></div>
      <div class="step-content id-card-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
            <li>{{getI18n('desc.content[1]')}}</li>
          </ul>
        </div>
        <div class="desc-list">
          <!-- <ul>
            <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/id-card/id-card-1.png" />
              <span class="item-txt icon-ok">{{getI18n('desc.tips[0]')}}</span>
            </li>
            <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/id-card/id-card-2.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[1]')}}</span>
            </li>
            <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/id-card/id-card-3.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[2]')}}</span>
            </li>
            <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/id-card/id-card-4.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[3]')}}</span>
            </li>
          </ul>-->
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { CAMERA_TYPE } from "../../../components/camera/upload-tools";
import UserAge from "@/main/utils/common/ua-info";
import {
  SDK_TYPE,
  STIDCardType,
} from "../../../components/camera/tool-st-camera";
import {
  SUFFIX,
  BASE64,
  IDCardFace,
  IDCardBack,
  IMAGE_REQUEST_LIST,
} from "../../../api/params-define";
// OCR
import { getOcrIDCardData } from "../../../format/common/formateOcrId";
// 扫描
import { getStIDCardData } from "./formateStId";

const uploadFace = {
  [IDCardFace]: IMAGE_REQUEST_LIST[IDCardFace],
};

const uploadBack = {
  [IDCardBack]: IMAGE_REQUEST_LIST[IDCardBack],
};

const idCardInfoObj = {
  [IDCardFace]: [
    "cnNameValue",
    "enNameValue",
    "addressValue",
    "birthday",
    "sex",
    "idCardValue",
  ],
  [IDCardBack]: ["dateStartValue", "dateEndValue"],
};

const updateImg = [IDCardFace, IDCardBack];

export default {
  mixins: [onlineMixin],
  data() {
    return {
      SUFFIX,
      file: {}, // 已上传完成文件
      upload: {}, // 暂存base64文件
      model: {}, // 读取用户信息表单
      uploadFaceFiles: uploadFace,
      uploadBackFiles: uploadBack,
      // 相机提示语
      uploadFaceTips: this.$t("iOpen.cameraInfo.uploadFaceTips"),
      uploadBackTips: this.$t("iOpen.cameraInfo.uploadBackTips"),
      cameraType: CAMERA_TYPE.CUSTOMER_CAMERA,
      isCanSelect: false,
      scanParams: {
        scanType: STIDCardType.face,
      },
      sdkType: SDK_TYPE.idCard,
    };
  },
  computed: {
    isDisabled() {
      const arr = Object.values(this.file);
      const result = arr.every((val) => val.length);
      return !(arr.length === 2 && result);
    },
  },
  created() {
    this.updateInfo();
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("idCard", key);
    },
    updateInfo() {
      // 更新图片
      const userImg = this.openImg;
      updateImg.forEach((key) => {
        const tempKey = `${key}${SUFFIX}`;
        const tempVal = userImg[tempKey] || "";
        this.$set(this.file, tempKey, tempVal);
        this.$set(this.upload, tempKey, tempVal);
      });
    },
    handleUpload(file, idFlag, callback) {
      this.fetchUpload(file, idFlag, callback);
    },
    handleSTSuccess(data, msg, callback) {
      const { idCardImg, idCardInfo, idCardSTInfo } = getStIDCardData(data);
      // 同步图片
      const { imgType, imgData, imgDataUrl } = idCardImg;
      const tempKey = `${imgType}${SUFFIX}`;
      // 如APP未上传，则前端上传
      if (!imgDataUrl) {
        this.fetchUpload(imgData, tempKey, callback);
      } else {
        const params = { imgType, imgPath: imgDataUrl };
        this.$store.dispatch("saveImageSt", params);
        this.$set(this.upload, tempKey, imgData);
        this.$set(this.file, tempKey, imgDataUrl);
      }
      // 存储扫描信息
      this.$store.dispatch("setStInfo", idCardSTInfo);
      // 同步表单
      Object.keys(idCardInfo).forEach((key) => {
        this.$set(this.model, key, idCardInfo[key]);
      });
    },
    fetchUpload(file, idFlag, callback) {
      const imgType = idFlag.replace(SUFFIX, "");
      // 若选择拍照或相册，重置原本信息
      idCardInfoObj[imgType].forEach((val) => {
        this.$set(this.model, val, "");
      });
      this.$set(this.file, idFlag, "");
      const params = { imgType, imgBase64: file, callback };
      this.$set(this.upload, idFlag, file);
      this.saveImage(params).then((res) => {
        const { path } = res;
        this.$set(this.file, idFlag, path);
      });
    },
    handleNext() {
      this.fetchUserNamePY().then(() => {
        // 保存数据&下一步
        const obj = this.model;
        const params = {
          step: this.step,
          info: obj,
        };
        this.saveCacheInfo(params).then(() => {
          this.$router.push({ name: this.nextStep });
        });
      });
    },
    fetchUserNamePY() {
      return new Promise((resolve, reject) => {
        // 若为身份证正面 --> 额外需请求名字拼音接口
        // const { cnNameValue: userName } = this.model;
        // if (userName) {
        //   this.$store
        //     .dispatch("getUserNamePY", { userName })
        //     .then(res => {
        //       const result = res || "";
        //       this.$set(this.model, "enNameValue", result);
        //       resolve();
        //     })
        //     .catch(() => {
        //       resolve();
        //     });
        // } else {
        //   resolve();
        // }
        resolve();
      });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        // 获取需要OCR的次数
        const changeTimes = Object.values(this.upload).filter(
          (val) => val.indexOf(BASE64) > -1
        ).length;

        // 未有重新上传图片
        if (!changeTimes) return resolve();

        // 请求识别次数 - 判断请求完成的标志
        let ocrTimes = 0;
        Object.keys(this.upload).forEach((val) => {
          const imgType = val.replace(SUFFIX, "");
          const isChange = this.upload[val].indexOf(BASE64) > -1;

          if (isChange) {
            // OCR识别需携带openType，后台区分
            this.$store
              .dispatch("getOcrData", { imgType, openType: 1 })
              .then((ocr) => {
                // 处理ocr返回数据
                const { ocrInfo } = getOcrIDCardData(ocr, imgType);
                // 同步表单
                Object.keys(ocrInfo).forEach((key) => {
                  this.$set(this.model, key, ocrInfo[key]);
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
      });
    },
  },
};
</script>

