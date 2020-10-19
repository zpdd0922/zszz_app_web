<template>
  <div id="root" class="root-wrap">
    <div class="main">
      <section class="content">
        <DocumentList />
      </section>
      <footer class="copyright">
        <base-copyright :content="$t('customize.company.copyright')" />
      </footer>
    </div>
  </div>
</template>

<script>
import DocumentList from "@/modules/module-document/views/list/";
import BaseCopyright from "@/main/components/base-copyright/";
import BottomShare from "@/main/components/bottom-share/";
import auth from "@/main/request/utils/auth";

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const signUrl = envConfig.webSign;
const downloadUrl = envConfig.webDownload;

export default {
  components: { BaseCopyright, DocumentList, BottomShare },
  created() {},
  computed: {
    isApp() {
      return this.UaInfo.isApp();
    },
    isZhCN() {
      if (this.$i18n.locale === "zh_CN") {
        return true;
      }
      return false;
    },
    nextLang() {
      if (this.isZhCN) {
        return "繁体";
      }
      return "简体";
    },
  },
  methods: {
    changeLang() {
      const nextLangStr = this.isZhCN ? "zh_HK" : "zh_CN";
      const realLang = setLanguage(nextLangStr);
      this.$i18n.locale = realLang;
      this.reload();
    },
  },
};
</script>
<style scoped>
.content {
  flex: 1;
}
.copyright {
  width: 100%;
  font-size: 11px;
  height: 40px;
  line-height: 40px;
}
.bottom-share {
  position: fixed;
  height: 0.5rem;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
}
.bottom-share + .copyright {
  margin-bottom: 0.5rem;
}
</style>