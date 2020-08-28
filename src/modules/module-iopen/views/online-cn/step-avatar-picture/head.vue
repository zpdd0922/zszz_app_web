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
import {
  SUFFIX,
  AvatarHead,
  IMAGE_REQUEST_LIST,
} from "../../../api/params-define";

const defaultUpload = {
  [AvatarHead]: IMAGE_REQUEST_LIST[AvatarHead],
};
const updateImg = [AvatarHead];

const defaultBtns = [{ text: "拍摄", code: 0 }];

export default {
  mixins: [onlineMixin],

  data() {
    return {
      SUFFIX,
      file: {},
      upload: {},
      btns: defaultBtns,
      uploadFiles: defaultUpload,
      cameraType: CAMERA_TYPE.SYSTEM_CAMERA,
      isCanSelect: true,
    };
  },
  computed: {
    cameraContent() {
      return this.getI18n("contentHead");
    },
    isDisabled() {
      const arr = Object.values(this.file);
      const result = arr.every((val) => val.length);
      return !(arr.length > 0 && result);
    },
  },
  created() {
    this.updateInfo();
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("avatarPicture", key);
    },
    updateInfo() {
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
    fetchUpload(file, idFlag, callback) {
      const imgType = idFlag.replace(SUFFIX, "");
      const params = { imgType, imgBase64: file, callback };
      this.$set(this.upload, idFlag, file);
      this.saveImage(params).then((res) => {
        const { path } = res;
        this.$set(this.file, idFlag, path);
      });
    },
    handleNext() {
      this.$router.push({ name: this.nextStep });
    },
  },
};
</script>


