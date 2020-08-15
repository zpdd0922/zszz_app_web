<template>
  <op-wrap :isDisabled="isDisabled" @handleNext="handleNext">
    <section class="olcn-step olcn-step-avatar-picture">
      <ul class="step-content step-content-avatar-upload">
        <!-- 身份证正面 -->
        <li>
          <camera
            :uploadFiles="uploadFiles"
            :uploadList="file"
            :uploadBase="upload"
            :cameraType="cameraType"
            :isCanSelect="isCanSelect"
            :btns="btns"
            @uploadAfter="handleUpload"
          />
        </li>
      </ul>
      <div class="avatar-card-desc">
        <div class="camera-title" v-html="cameraContent"></div>
      </div>
    </section>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { CAMERA_TYPE } from "@/modules/module-iopen/components/camera/upload-tools";
import { SUFFIX, IMAGE_REQUEST_LIST } from "../../../api/params-define";

const fileName = "avatarFinger";

const defaultBtns = [{ text: "拍摄", code: 0 }];

export default {
  mixins: [onlineMixin],
 
  data() {
    return {
      SUFFIX,
      file: {},
      upload: {},
      fingerNum: "",
      btns: defaultBtns,
      uploadFiles: {},
      cameraType: CAMERA_TYPE.SYSTEM_CAMERA,
      isCanSelect: true
    };
  },
  computed: {
    cameraContent() {
      return this.getI18n("contentFinger").replace(
        "$fingerNum$",
        `<span class='num'>${this.fingerNum}</span>`
      );
    },
    isDisabled() {
      const arr = Object.values(this.file);
      const result = arr.every(val => val.length);
      return !(arr.length > 0 && result);
    }
  },
  created() {
    this.getFinger();
    this.updateInfo();
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("avatarPicture", key);
    },
    getFinger() {
      // 先从已有图片中获取手指，若没则随机
      const fingerPath =
        Object.keys(this.openImg).find(key => key.indexOf(fileName) !== -1) ||
        "";
      const fingerNum =
        fingerPath.replace(/avatarFinger|Path/g, "") ||
        Math.ceil(Math.random() * 5);
      this.fingerNum = fingerNum;
      const tempKey = `${fileName}${fingerNum}`;
      this.uploadFiles = {
        [tempKey]: IMAGE_REQUEST_LIST[tempKey]
      };
    },
    updateInfo() {
      const userImg = this.openImg;
      const updateImg = [`${fileName}${this.fingerNum}`];
      updateImg.forEach(key => {
        const tempKey = `${key}${SUFFIX}`;
        const tempVal = userImg[tempKey] || "";
        this.$set(this.file, tempKey, tempVal);
        this.$set(this.upload, tempKey, tempVal);
      });
    },
    handleUpload(file, idFlag, callback) {
      this.fetchUpload(file, idFlag, callback);
    },
    fetchUpload(file, idFlag, callback) {
      const imgType = idFlag.replace(SUFFIX, "");
      const params = { imgType, imgBase64: file, callback };
      this.$set(this.upload, idFlag, file);
      this.saveImage(params).then(res => {
        const { imgUrl } = res;
        this.$set(this.file, idFlag, imgUrl);
      });
    },
    handleNext() {
      // 保存数据&下一步
      this.$router.push({name: this.nextStep});
    }
  }
};
</script>


