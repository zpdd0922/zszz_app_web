<template>
  <Signature :userName="openInfo.cnNameValue" @confirm="handleConfirmSign" />
</template>

<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import storage from "@/main/utils/cache/localstorage";
// import { SUFFIX } from "../../../api/params-define";

export default {
  // mixins: [onlineMixin],
  data() {
    return {
      file: {},
    };
  },
  computed: {

  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("signature", key);
    },
    // 确认签名
    handleConfirmSign(params) {
      const self = this;
      const { imgType, imgBase64 } = params;
      const signFile = `${imgType}${SUFFIX}`;
      this.saveImage(params).then((res) => {
        const { path } = res;
        this.$set(this.file, signFile, path);
        this.handleBase2Blob(imgBase64, (imgBlob) => {
          // 合成页面注意去除URL，释放缓存
          const url = URL.createObjectURL(imgBlob);
          // 存储本地
          storage.set(signFile, url);
          this.$router.replace({ name: this.nextStep });
        });
      });
    },
    // base64转blob
    handleBase2Blob(imgBase, callback) {
      const binStr = atob(imgBase.split(",")[1]);
      const len = binStr.length;
      const arr = new Uint8Array(len);
      const mimeString = imgBase.split(",")[0].split(":")[1].split(";")[0];
      for (let i = 0; i < len; i++) {
        arr[i] = binStr.charCodeAt(i);
      }
      const imgBlob = new Blob([arr], { type: mimeString });
      if (callback) {
        callback(imgBlob);
      } else {
        return imgBlob;
      }
    },
  },
};
</script>


