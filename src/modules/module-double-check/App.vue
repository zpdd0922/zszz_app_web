<template>
  <div id="root" class="root-wrap">
    <header-custom
      :isShow="!isApp"
      :rightBtns="[{ content: this.nextLang, callBack: this.changeLang }]"
    />
    <template v-if="isChecking">
      <base-waiting />
    </template>
    <template v-else>
      <router-view v-if="isRouterAlive" />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseCopyright from "@/main/components/base-copyright/";
import { getURLParameters } from "@/main/utils/format/url";
import HeaderCustom from "@/customize/components/header-custom/";
import { setLanguage } from "@/main/locale/helper";
export default {
  components: { BaseCopyright, HeaderCustom },
  created() {
    this.setTitle(this.$t("doubleCheck.main.pageName"));
    // this.checkLogin();
  },
  computed: {
    isApp() {
      return this.UaInfo.isApp();
    },
    isZhCN() {
      if (this.$t("language") === "zh_CN") {
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
  data() {
    return {
      isRouterAlive: true, //控制视图是否显示的变量
      isChecking: false,
    };
  },
  // provide() {
  //   //父组件中通过provide来提供变量，在子组件中通过inject来注入变量。
  //   return {
  //     reload: this.reload,
  //   };
  // },
  methods: {
    reload() {
      this.isChecking = true; //先关闭，
      this.$nextTick(function() {
        this.isChecking = false; //再打开
      });
    },
    ...mapActions(["login"]),
    changeLang() {
      const nextLangStr = this.isZhCN ? "zh_HK" : "zh_CN";
      const realLang = setLanguage(nextLangStr);
      this.$i18n.locale = realLang;
      this.reload();
    },
    checkLogin() {
      const params = getURLParameters();
      const userToken = params["user_token"] || "";
      if (userToken && userToken !== "") {
        const params = {
          certType: 0,
          certCode: userToken,
          passwordType: 0,
          password: "",
        };
        this.login(params)
          .then((res) => {
            if (this.$route.name === "login") {
              this.$router.replace({ name: "opaGuide" });
            }
            this.isChecking = false;
          })
          .catch(() => {
            // 4.3是否需要验证码
            this.$router.replace({ name: "login" });
            this.isChecking = false;
          });
      } else {
        this.isChecking = false;
      }
    },
  },
};
</script>

<style scoped>
.root-wrap {
  position: relative;
  padding-top: 0.44rem;
  min-width: 300px;
}
.root-wrap-app {
  padding-top: 0;
}

.header-custom {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
}
</style>
