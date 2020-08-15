<template>
  <div class="op-com-camera-wrap">
    <div v-for="(item, key, ind) in uploadFiles" :key="ind" class="op-com-camera-item">
      <template v-if="showTxt && item.txt">
        <div class="item-title">{{item.txt}}</div>
      </template>
      <div class="item-photo">
        <template v-if="upload[`${key}${SUFFIX}`]">
          <div class="photo-img">
            <!-- <img @click="showImagePreview(`${key}${SUFFIX}`)" :src="upload[`${key}${SUFFIX}`]"> -->
            <img :src="upload[`${key}${SUFFIX}`]" />
            <!-- 上传进度 -->
            <template v-if="uploadLoad[`${key}Status`] === 'uploading'">
              <div class="photo-rate">
                <span>{{uploadLoad[`${key}Percent`]}} %</span>
              </div>
            </template>
            <!-- 上传失败 -->
            <template v-if="uploadLoad[`${key}Status`] === 'error'">
              <div class="photo-reload" @click="hanldeReload(key)">重新上传</div>
            </template>
          </div>
        </template>
        <template v-else>
          <div class="photo-img">
            <template v-if="uploadTips">
              <div class="photo-tips">{{uploadTips}}</div>
            </template>
            <div
              class="photo-bg"
              :style="{backgroundImage: `url(${item.placehold})`}"
              @click="showImageBg(item)"
            ></div>
          </div>
        </template>
      </div>
      <div class="item-btn">
        <ul>
          <li v-for="(v, i) in computedBtns" :key="i" class="btn-item">
            <template v-if="v.code === 0">
              <!-- 拍摄 -->
              <span @click="handleCamera(key)">{{v.text}}</span>
            </template>
            <template v-else-if="v.code === 1">
              <!-- 扫描 -->
              <span @click="handleCameraST(key, item.stType)">{{v.text}}</span>
            </template>
            <template v-else-if="v.code === 2">
              <!-- 相册 -->
              <template v-if="isAndroid && !isH5">
                <span @click="handleOpenAlbumAndroid(key)">{{v.text}}</span>
              </template>
              <template v-else>
                <span @click="handleOpenAlbum(key)">{{v.text}}</span>
              </template>
            </template>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import UploadTools, { openJsCameraJF } from './upload-tools';
import { stCamera } from './tool-st-camera';
import UserAge from '@/main/utils/common/ua-info';
import { toast } from '@/main/utils/common/tips';
import { openAlbumApp } from '@/main/utils/native-app/';

export default {
  props: {
    // 显示单个组件标题
    showTxt: {
      type: Boolean,
      default: false
    },
    /* 组件提示语 */
    uploadTips: {
      type: String,
      default: ''
    },
    /* 操作按钮 */
    btns: {
      type: Array,
      default: () => []
    },
    /* 需上传列表 */
    uploadFiles: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /* 已传文件对象 */
    uploadList: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /* 初始上传文件base64 */
    uploadBase: {
      type: Object,
      default: () => {
        return {};
      }
    },
    /* 存储字段后缀名 */
    SUFFIX: {
      type: String,
      default: 'Path'
    },
    /* 拍照参数  */
    cameraType: {
      default: 0,
      validator: value => {
        return [
          0, 1
        ].indexOf(value) !== -1;
      }
    },
    // 是否可选相册，默认可选
    isCanSelect: {
      type: Boolean,
      default: false
    },
    /* APP自定义相机提示语 */
    tips: {
      type: String,
      default: '请确保拍摄物体清晰、无反光'
    },
    /* 扫描参数  */
    scanParams: {
      type: Object,
      default: () => {
        return {};
      }
    },
    sdkType: {
      default: 'idCard',
      validator: value => {
        return [
          'idCard', 'bankCard', 'liveNess'
        ].indexOf(value) !== -1;
      }
    },
    idCardFaceType: {
      type: Number
    }
  },
  data() {
    return {
      uploadLoad: {}, // 进度
      uploadTools: null, // 拍照
      uploadToolsH5: null, // 相册
      defaultBtns: [
        { text: this.$t('iOpen.cameraInfo.btnTake'), code: 0 },
        { text: this.$t('iOpen.cameraInfo.btnScan'), code: 1 },
        { text: this.$t('iOpen.cameraInfo.btnAlbum'), code: 2 }
      ]
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
    computedBtns() {
      let btns = this.defaultBtns;
      if (this.btns.length > 0) btns = this.btns;
      const H5Btns = btns.filter(item => item.code !== 1);
      return this.isH5 ? H5Btns : btns;
    },
    // 文件上传暂存base64
    upload() {
      return this.uploadBase;
    }
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
      const curInd = imgs.findIndex(img => img === curImg);
      const params = {
        imgs,
        loop: false,
        initialIndex: curInd
      };
      this.$createImagePreview(params).show();
    },
    // 触发再次上传
    hanldeReload(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      const tempBase = this.upload[`${key}${this.SUFFIX}`];
      this.$emit('uploadAfter', tempBase, tempKey, this.callback);
    },
    // 文件上传回调
    callback(key, e) {
      this.$set(this.uploadLoad, [`${key}Status`], e.status);
      this.$set(this.uploadLoad, [`${key}Percent`], e.percent);
    },
    // 初始化拍照
    initUpload() {
      const defaultUpload = {
        uploadBefore: idFlag => {
          this.$emit('uploadBefore', idFlag);
        },
        localLoad: (file, idFlag) => {
          this.$emit('localLoad', file, idFlag);
        },
        upload: (file, idFlag) => {
          this.$emit('uploadAfter', file, idFlag, this.callback);
        },
        cameraType: this.cameraType,
        isCanSelect: this.isCanSelect,
        tips: this.tips,
        idCardFaceType: this.idCardFaceType
      };
      this.uploadTools = new UploadTools(defaultUpload);
    },
    // 拍照
    handleCamera(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, '');
      }
      this.uploadTools.openCamera(tempKey);
    },
    // 相册 -- 考虑ios没有提供打开相册功能 - 统一调用H5
    handleOpenAlbum(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, '');
      }

      const defaultOptions = {
        idFlag: tempKey,
        isCanSelect: true,
        uploadBefore: idFlag => {
          this.$emit('uploadBefore', idFlag);
        },
        localLoad: (file, idFlag) => {
          this.$emit('localLoad', file, idFlag);
        },
        upload: (file, idFlag) => {
          this.$emit('uploadAfter', file, idFlag, this.callback);
        }
      };

      openJsCameraJF(defaultOptions);
    },
    // APP内安卓 则调用相册 -- 主要兼容华为
    handleOpenAlbumAndroid(key) {
      const tempKey = `${key}${this.SUFFIX}`;
      if (!this.model[tempKey]) {
        this.$set(this.model, tempKey, '');
      }
  
      const defaultOptions = {
        success: (res, msg) => {
          // base64位转换
          const { data = '' } = res;
          const file = `data:image/jpeg;base64,${data}`;
          this.$emit('uploadAfter', file, tempKey, this.callback);
        },
        fail: (res, msg = '操作失败，请稍后重试') => {
          toast({ type: 'error', txt: msg });
          this.$emit('fail', msg);
        },
        complete: msg => {
          this.$emit('complete', msg);
        }
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
          this.$emit('success', val, msg, this.callback);
        },
        fail: (msg = '网络请求超时，请稍后重试') => {
          toast({ type: 'error', txt: msg });
          this.$emit('fail', msg);
        },
        complete: msg => {
          this.$emit('complete', msg);
        }
      };
      stCamera(sdkType, defaultOptions, callback);
    }
  }
};
</script>