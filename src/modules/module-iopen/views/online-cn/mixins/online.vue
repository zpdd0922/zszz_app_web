<script>
// 关于表单输入在安卓移动端底部定位浮起
// 通过input聚焦与失焦来控制起位置
import { mapGetters, mapActions } from "vuex";
import { formatCommitData } from "@/modules/module-iopen/format/format-cn/index";
import validate from "@/main/utils/format/validate";
import { toast } from "@/main/utils/common/tips";

export default {
  data() {
    return {
    }
  },
  metaInfo() {
    return {
      title: this.$route.meta.title,
    };
  },
  computed: {
    ...mapGetters({
      openInfo: "openInfo",
      openImg: "openImg",
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
      toCommitAllData: "toCommitAllData",
      saveCacheInfo: "saveCnCacheInfo",
      saveImage: "saveImage",
    }),
    getStepI18nValue(step, key) {
      // return this.$t(`openAccount.openCn.${step}.${key}`);
      return this.$t(`iOpen.openCn.${step}.${key}`);
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
    checkInfo(data='', func, warn='', preCondition = true) {
      //不满足前置条件时返回真
      if (!preCondition) {
        return true
      }
      if (!func || typeof func !== "function") {
        return;
      }
      if (!func(data)) {
        this.commonToast(warn);
        return false
      } else {
        return true
      }
    },
    checkList(arr) {
      if (arr && Array.isArray(arr)) {
        return arr.every((item) => {
          return this.checkInfo(item.val, item.func, item.msg, item.preCondition)
        })
      }
    }
  },
};
</script>
