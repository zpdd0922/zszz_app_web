<script>
// 关于表单输入在安卓移动端底部定位浮起
// 通过input聚焦与失焦来控制起位置
import { mapGetters, mapActions } from "vuex";
import { formatCommitData } from "@/modules/module-iopen/format/format-hk/index";
import validate from "@/main/utils/format/validate";
import { toast } from "@/main/utils/common/tips";
import { noSpace } from "@/main/utils/format/formatter.js";

export default {
  data() {},
  metaInfo() {
    return {
      title: this.$route.meta.title,
    };
  },
  computed: {
    ...mapGetters({
      openInfo: "openInfoHK",
      openImg: "openImgHK",
      userInfo: "userInfo",
      openProgress: "openProgress",
    }),
    isApp() {
      return UserAge.isApp();
    },
    isH5() {
      return !UserAge.isApp();
    },
    language() {
      return this.$t("language");
    },
    step() {
      return this.$route.meta.step;
    },
    nextStep() {
      return this.$route.meta.nextStep;
    },
  },
  mounted() {},
  methods: {
    formatCommitData,
    ...mapActions({
      // toCommitAllData: "toCommitAllData",
      toCommitAllDataHK: "toCommitAllDataHK",
      saveCacheInfo: "saveHkCacheInfo",
      saveImage: "saveImageHK",
    }),
    getStepI18nValue(step, key) {
      return this.$t(`iOpen.openHk.${step}.${key}`);
    },
    commonToast(text = "") {
      if (typeof text === "string") {
        return toast({
          type: "txt",
          txt: text,
          time: 1000,
        });
      }
    },
    //校验方法
    checkInfo(val = "", func, warn = "") {
      const data = val.replace(/\s+/g, "");
      if (!func || typeof func !== "function") {
        return;
      }
      if (!func(data)) {
        this.commonToast(warn);
        return false;
      } else {
        return true;
      }
    },
    // 检查空值，并且提示
    checkEmpty(checkedValue, warnMsg) {
      if (!checkedValue) {
        return false;
      }
      let msg = warnMsg || this.$t('iOpen.common.warn.emptyMsg')
      if (!noSpace(checkedValue)) {
        this.commonToast(msg);
        return false;
      } else {
        return true;
      }
    },
  },
};
</script>
