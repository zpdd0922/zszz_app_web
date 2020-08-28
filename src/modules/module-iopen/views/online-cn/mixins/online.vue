
<script>
// 关于表单输入在安卓移动端底部定位浮起
// 通过input聚焦与失焦来控制起位置
import { mapGetters, mapActions } from "vuex";
import { formatCommitData } from "@/modules/module-iopen/format/format-cn/index";

export default {
  data() {},
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
      toCommitAllData:'toCommitAllData',
      saveCacheInfo:'saveCnCacheInfo',
      saveImage:'saveImage',
    }),
    getStepI18nValue(step, key) {
      // return this.$t(`openAccount.openCn.${step}.${key}`);
      return this.$t(`iOpen.openCn.${step}.${key}`);
    },
  },
};
</script>
