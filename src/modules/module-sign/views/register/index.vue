<template>
  <layout
    :title="$t('sign.common.register')"
    :tips="$t('sign.common.registerTips')"
  >
    <div class="sign-page-content">
      <base-form
        :formList="formList"
        :formRules="formRules"
        @updateData="updateData"
      />
      <div class="form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">{{
          $t("sign.formBtn.register")
        }}</cube-button>
        <div class="btn-links">
          <div>
            <span @click="handleChangeRoute('loginByPwd')">{{
              $t("sign.common.login")
            }}</span>
          </div>
          <div>
            <span @click="handleChangeRoute('resetPwd')">{{
              $t("sign.common.resetPwd")
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </layout>
</template>

<script>
import { mapState, mapGetters, mapActions } from "vuex";
import BaseForm from "@/main/components/base-form/";
import Layout from "../layout/index";
import { getURLParameters } from "@/main/utils/format/url";
import { toast } from "@/main/utils/common/tips/";
import validate from "@/main/utils/format/validate";

const envConfig = window._GLOBAL_ENV_CONFIG || {};
const downloadUrl = envConfig.webDownload;

const defaultCountryCode = "86";

export default {
  components: {
    BaseForm,
    Layout,
  },
  props: {
    loginOther: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      formData: {
        countryCode: defaultCountryCode,
        certCode: "",
        captcha: "",
        password: "",
      },
      formRules: {
        certCode: {
          tips: "",
        },
        captcha: {
          tips: "",
        },
        password: {
          tips: "",
        },
      },
      urlParams: getURLParameters(),
    };
  },
  created() {},
  mounted() {
    this.setTitle(this.$t("sign.common.register"));
  },
  computed: {
    isDisabled() {
      const { certCode, captcha } = this.formData;
      const result = certCode.length && captcha.length;

      return result < 1;
    },
    isCanSend() {
      return this.formData.certCode.length > 1;
    },
    formList() {
      return {
        certCode: {
          placeholder: this.$t("sign.formPlaceholder.accountMobile"),
          type: "phone",
          handleCountryCode: this.handleCountryCode,
        },
        captcha: {
          placeholder: this.$t("sign.formPlaceholder.captcha"),
          type: "code",
          isCanSend: this.isCanSend,
          handleCheckTrue: this.handleCheckTrue,
          handleSendCode: this.handleSendCode,
        },
        password: {
          placeholder: this.$t("sign.formPlaceholder.pwdRetister"),
          type: "password",
        },
      };
    },
    query() {
      return this.$route.query;
    },
  },
  methods: {
    ...mapActions(["fetchCaptcha", "register"]),
    handleChangeRoute(route, isReplace) {
      console.log(route);
      if (isReplace) {
        this.$router.replace({ name: route });
      } else {
        this.$router.push({ name: route });
      }
    },
    updateData(data) {
      this.formData = {
        ...this.formData,
        ...data,
      };
    },
    handleCountryCode(value) {
      this.formData.countryCode = value;
    },
    handleCheckTrue() {
      // 发送前 --> 校验手机是否合法
      const countryCode = this.formData.countryCode;
      const account = this.formData.certCode;

      if (countryCode === defaultCountryCode && !validate.isMobile(account)) {
        this.formRules.certCode.tips = this.$t("sign.warn.numWarn");
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }

      if (!account) {
        this.formRules.certCode.tips = this.$t("sign.warn.emptyWarn");
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }
      return true;
    },
    handleSendCode() {
      return new Promise((resolve, reject) => {
        const countryCode = this.formData.countryCode;
        const account = this.formData.certCode;

        // 发送中
        this.isSendCode = true;
        const certCode =
          countryCode === defaultCountryCode
            ? account
            : `${countryCode}-${account}`;
        const params = {
          certType: 0,
          phoneNum: certCode,
        };

        this.fetchCaptcha(params)
          .then((res) => {
            this.formData.captchaId = res.eventId || 0;
            resolve();
          })
          .catch((e) => {
            this.isSendCode = false;
            reject();
          });
      });
    },

    // 处理登录
    handleSubmit() {
      const isValid = this.chechFormRules();
      // 4.1验证通过
      if (isValid) {
        const {
          certCode,
          countryCode,
          password,
          captchaId,
          captcha,
        } = this.formData;
        const account =
          countryCode === defaultCountryCode
            ? certCode
            : `${countryCode}-${certCode}`;

        const { invertId = "1", channelId = "1" } = this.urlParams;

        const params = {
          invUserId: invertId,
          userSourceChannelId: channelId,
          certType: 0,
          certCode,
          eventId: captchaId,
          captcha: captcha,
          pwd: password,
        };

        console.log(this.register);

        this.register(params).then((res) => {
          // 4.2登录成功
          this.handleLoginSuccess();
        });
      }
    },
    // 登录成功后跳转页面
    handleLoginSuccess() {
      console.log("handleRegisterSuccess");
      toast({
        txt: this.$t("sign.common.successSign"),
        callback: () => {
          const { redirect_url = "" } = this.urlParams;
          if (!redirect_url) {
            const { redirect = "/" } = this.query;
            this.$router.replace({ path: redirect });
          } else {
            window.location.href = decodeURIComponent(redirect_url);
          }
        },
      });
    },
    // 表单校验
    chechFormRules() {
      const { certCode, captcha, password } = this.formData;

      if (!certCode) {
        this.formRules.certCode.tips = this.$t("sign.warn.accountWarn");
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }

      if (this.showCaptcha && !captcha) {
        this.formRules.captcha.tips = this.$t("sign.warn.captchaWarn");
        return false;
      } else {
        this.formRules.captcha.tips = "";
      }

      if (!password) {
        this.formRules.password.tips = this.$t("sign.warn.setPasswd");
        return false;
      } else {
        this.formRules.password.tips = "";
      }

      return true;
    },
  },
};
</script>
