<template>
  <layout :title="$t('sign.common.loginByCaptcha')">
    <div class="sign-page-content">
      <base-form :formList="formList" :formRules="formRules" @updateData="updateData" />
      <div class="form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">{{$t("sign.formBtn.login")}}</cube-button>
        <div class="btn-links">
          <div>
            <span @click="handleChangeRoute('loginByPwd', true)">{{$t('sign.common.loginByPwd')}}</span>
          </div>
          <div>
            <span @click="handleChangeRoute('register')">{{$t('sign.common.register')}}</span>
            <span @click="handleChangeRoute('resetPwd')">{{$t('sign.common.resetPwd')}}</span>
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
    Layout,
    BaseForm,
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
      },
      formRules: {
        certCode: {
          tips: "",
        },
        captcha: {
          tips: "",
        },
      },
      urlParams: getURLParameters(),
    };
  },
  created() {},
  mounted() {
    this.setTitle(
      this.$t("sign.common.login")
    );
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
          handleSetCountry: this.handleSetCountry,
        },
        captcha: {
          placeholder: this.$t("sign.formPlaceholder.captcha"),
          type: "code",
          isCanSend: this.isCanSend,
          handleCheckTrue: this.handleCheckTrue,
          handleSendCode: this.handleSendCode,
        },
      };
    },
    query() {
      return this.$route.query;
    },
  },
  methods: {
    ...mapActions(["fetchCaptcha", "login"]),
    handleChangeRoute(route, isReplace) {
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
    handleSetCountry(value) {
      this.formData.countryCode = value;
    },
    handleCheckTrue() {
      // 发送前 --> 校验手机是否合法
      const countryCode = this.formData.countryCode;
      const account = this.formData.certCode;

      if (countryCode === defaultCountryCode && !validate.isMobile(account)) {
        this.formRules.certCode.tips = "请输入正确的手机号码";
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }

      if (!account) {
        this.formRules.certCode.tips = "手机号码不能为空";
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
          nameType: 0,
          name: certCode,
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
        const { invUserId = 1, sourceCode = "" } = this.urlParams;

        const { certCode, countryCode, captcha, captchaId } = this.formData;
        const account =
          countryCode === defaultCountryCode
            ? certCode
            : `${countryCode}-${certCode}`;

        const params = {
          certType: 9,
          certCode: account,
          eventId: captchaId,
          pwd: captcha,
          invUserId,
          sourceCode,
        };

        this.login(params).then((res) => {
          // 4.2登录成功
          this.handleLoginSuccess();
        });
      }
    },
    // 登录成功后跳转页面
    handleLoginSuccess() {
      console.log("handleLoginSuccess");
      toast({
        txt: "登录成功！",
        callback: () => {
          const { redirect_url = "" } = this.urlParams;
          if (!redirect_url) {
            window.location.href = downloadUrl;
          } else {
            window.location.href = decodeURIComponent(redirect_url);
          }
        },
      });
    },
    // 表单校验
    chechFormRules() {
      const { certCode, captcha } = this.formData;

      if (!certCode) {
        this.formRules.certCode.tips = "请输入账号/手机号码";
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }

      if (this.showCaptcha && !captcha) {
        this.formRules.captcha.tips = "请输入验证码";
        return false;
      } else {
        this.formRules.captcha.tips = "";
      }

      return true;
    },
  },
};
</script>
