<template>
  <div id="root" class="root-wrap">
    <div class="main">
      <section class="content">
        <DocumentDetail />
      </section>
      <div v-if="isShowBottom" class="bottom-share">
        <BottomShare @handleClick="handleBottom" />
      </div>
      <footer class="copyright">
        <base-copyright />
      </footer>
    </div>
  </div>
</template>

<script>
import { DocumentDetail } from "@/modules/document/views/index";
import BaseCopyright from "@/main/components/base-copyright/";
import BottomShare from "@/main/components/bottom-share/";
import auth from "@/main/request/utils/auth";

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const signUrl = envConfig.webSign;
const downloadUrl = envConfig.webDownload;

export default {
  components: { BaseCopyright, DocumentDetail, BottomShare },
  created() {},
  computed: {
    isShowBottom(){
      return !this.UaInfo.isApp()
    },
     isLogin() {
      return auth.getAuthSession().length;
    }
  },
  methods: {
    handleBottom() {
      if (!this.isLogin) {
        window.location.href = signUrl;
      } else {
        window.location.href = downloadUrl;
      }
    }
  }
};
</script>
<style scoped>
.main {
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
}

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
