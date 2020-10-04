<template>
  <div class="op-com-camera-wrap">
    <div
      v-for="(item, key, ind) in uploadFiles"
      :key="ind"
      class="op-com-camera-item"
    >
      <template v-if="showTxt && item.txt">
        <div class="op-com-item-title">{{ item.txt }}</div>
      </template>
      <div class="op-com-item-photo" @click="handleCamera(key)">
        {{ uploadLoad[`${key}Status`] }}
        <template v-if="upload[`${key}${SUFFIX}`]">
          <div class="op-com-photo-img">
            <!-- <img @click="showImagePreview(`${key}${SUFFIX}`)" :src="upload[`${key}${SUFFIX}`]"> -->
            <img :src="upload[`${key}${SUFFIX}`]" />
            <!-- 加载图片 -->
            <template v-if="uploadLoad[`${key}Status`] === 'ready'">
              <div class="op-com-photo-rate">
                <span>{{$t('iOpen.uploadPicinfo.loading')}}</span>
              </div>
            </template>
            <!-- 压缩图片 -->
            <template v-if="uploadLoad[`${key}Status`] === 'compress'">
              <div class="op-com-photo-rate">
                <span>{{$t('iOpen.uploadPicinfo.zipping')}}</span>
              </div>
            </template>
            <!-- 上传进度 -->
            <template v-if="uploadLoad[`${key}Status`] === 'uploading'">
              <div class="op-com-photo-rate">
                <span>{{ uploadLoad[`${key}Percent`] }} %</span>
              </div>
            </template>
            <!-- 上传失败 -->
            <template v-if="uploadLoad[`${key}Status`] === 'error'">
              <div class="op-com-photo-reload" @click.stop="hanldeReload(key)">
                {{$t('iOpen.uploadPicinfo.reload')}}
              </div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="op-com-photo-img">
            <template v-if="uploadTips">
              <div class="photo-tips">{{ uploadTips }}</div>
            </template>
            <div
              class="op-com-photo-bg"
              :style="{ backgroundImage: `url(${item.placehold})` }"
              @click="showImageBg(item)"
            ></div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import UploadTools, { openJsCameraJF } from "./upload-tools";
import { stCamera } from "./tool-st-camera";
import UserAge from "@/main/utils/common/ua-info";
import { toast } from "@/main/utils/common/tips";
import { openAlbumApp } from "@/main/utils/native-app/";

export default {
  props: {
    // 显示单个组件标题
    showTxt: {
      type: Boolean,
      default: false,
    },
    /* 组件提示语 */
    uploadTips: {
      type: String,
      default: "",
    },
    /* 需上传列表 */
    uploadFiles: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* 已传文件对象 */
    uploadList: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* 初始上传文件base64 */
    uploadBase: {
      type: Object,
      default: () => {
        return {};
      },
    },
    /* 存储字段后缀名 */
    SUFFIX: {
      type: String,
      default: "Path",
    },
    /* 拍照参数  */
    cameraType: {
      default: 0,
      validator: (value) => {
        return [0, 1].indexOf(value) !== -1;
      },
    },
    // 是否可选相册，默认可选
    isCanSelect: {
      type: Boolean,
      default: false,
    },
    /* APP自定义相机提示语 */
    tips: {
      type: String,
      default: "请确保拍摄物体清晰、无反光",
    },
    /* 扫描参数  */
    scanParams: {
      type: Object,
      default: () => {
        return {};
      },
    },
    sdkType: {
      default: "idCard",
      validator: (value) => {
        return ["idCard", "bankCard", "liveNess"].indexOf(value) !== -1;
      },
    },
    idCardFaceType: {
      type: Number,
    },
  },
  data() {
    return {
      uploadLoad: {}, // 进度
      uploadTools: null, // 拍照
      uploadToolsH5: null, // 相册
    };
  },
  computed: {
    model() {
      return this.uploadList;
    },
    isH5() {
      return !UserAge.isApp();
    },
    isAndroid() {
      return UserAge.isAndroid();
    },
    // 文件上传暂存base64
    upload() {
      return this.uploadBase;
    },
  },
  created() {
    this.initUpload();
  },
  methods: {
    // 背景图 - 预览
    showImageBg(item) {
      const { preview } = item;
      // 不可点击预览
      if (!preview) return false;
      const imgs = [preview];
      this.$createImagePreview({ imgs }).show();
    },
    // 已上传图 - 预览
    showImagePreview(key) {
      const imgs = Object.values(this.upload);
      const curImg = this.upload[key];
      const curInd = imgs.findIndex((img) => img === curImg);
      const params = {
        imgs,
        loop: false,
        initialIndex: curInd,
      };
      this.$createImagePreview(params).show();
    },
    // 触发再次上传
    hanldeReload(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      const tempBase = this.upload[`${key}${this.SUFFIX}`];
      this.$emit("uploadAfter", tempBase, tempKey, this.callback);
    },
    // 文件上传回调
    callback(key, e) {
      console.log(123231, key);
      this.$set(this.uploadLoad, [`${key}Status`], e.status);
      this.$set(this.uploadLoad, [`${key}Percent`], e.percent);
    },
    // 初始化拍照
    initUpload() {
      const defaultUpload = {
        uploadBefore: (idFlag) => {
          const imgType = idFlag.replace(this.SUFFIX, "");
          this.$set(this.uploadLoad, [`${imgType}Status`], "ready");
          this.$emit("uploadBefore", idFlag);
        },
        localLoad: (file, idFlag) => {
          const imgType = idFlag.replace(this.SUFFIX, "");
          this.$set(this.uploadLoad, [`${imgType}Status`], "compress");
          this.$emit("localLoad", file, idFlag);
        },
        upload: (file, idFlag) => {
          console.log(typeof this.callback)
          this.$emit("uploadAfter", file, idFlag, this.callback);
        },
        cameraType: this.cameraType,
        isCanSelect: this.isCanSelect,
        tips: this.tips,
        idCardFaceType: this.idCardFaceType,
      };
      this.uploadTools = new UploadTools(defaultUpload);
    },
    // 拍照
    handleCamera(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, "");
      }
      this.uploadTools.openCamera(tempKey);
    },
    // 相册 -- 考虑ios没有提供打开相册功能 - 统一调用H5
    handleOpenAlbum(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, "");
      }

      const defaultOptions = {
        idFlag: tempKey,
        isCanSelect: true,
        uploadBefore: (idFlag) => {
          this.$emit("uploadBefore", idFlag);
        },
        localLoad: (file, idFlag) => {
          this.$emit("localLoad", file, idFlag);
        },
        upload: (file, idFlag) => {
          this.$emit("uploadAfter", file, idFlag, this.callback);
        },
      };

      openJsCameraJF(defaultOptions);
    },
    // APP内安卓 则调用相册 -- 主要兼容华为
    handleOpenAlbumAndroid(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, "");
      }

      const defaultOptions = {
        success: (res, msg) => {
          // base64位转换
          const { data = "" } = res;
          const file = `data:image/jpeg;base64,${data}`;
          this.$emit("uploadAfter", file, tempKey, this.callback);
        },
        fail: (res, msg = "操作失败，请稍后重试") => {
          toast({ type: "error", txt: msg });
          this.$emit("fail", msg);
        },
        complete: (msg) => {
          this.$emit("complete", msg);
        },
      };
      openAlbumApp(defaultOptions);
    },
    // 扫描 --> 商汤方式
    handleCameraST(key, type) {
      const sdkType = this.sdkType;

      const scanType = type || 0;
      const defaultOptions = { ...this.scanParams, scanType };

      const callback = {
        success: (val, msg) => {
          this.$emit("success", val, msg, this.callback);
        },
        fail: (msg = "网络请求超时，请稍后重试") => {
          toast({ type: "error", txt: msg });
          this.$emit("fail", msg);
        },
        complete: (msg) => {
          this.$emit("complete", msg);
        },
      };
      stCamera(sdkType, defaultOptions, callback);
    },
  },
};
</script>