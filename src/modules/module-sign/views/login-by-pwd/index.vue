<template>
  <layout :title="$t('sign.common.loginByPwd')">
    <div class="sign-page-content">
      <base-form :formList="formList" :formRules="formRules" @updateData="updateData" />
      <div class="form-btn">
        <cube-button :disabled="isDisabled" @click="handleSubmit">{{$t("sign.formBtn.login")}}</cube-button>
        <div class="btn-links">
          <div>
            <span
              @click="handleChangeRoute('loginByCaptcha', true)"
            >{{$t('sign.common.loginByCaptcha')}}</span>
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
    BaseForm
  },
  props: {
    loginOther: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      formData: {
        countryCode: defaultCountryCode,
        certCode: "",
        password: ""
      },
      formRules: {
        certCode: {
          tips: ""
        },
        password: {
          tips: ""
        }
      },
      urlParams: getURLParameters()
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
      const { certCode, password } = this.formData;
      const result = certCode.length && password.length;
      return result < 1;
    },
    formList() {
      return {
        certCode: {
          placeholder: this.$t("sign.formPlaceholder.accountMobile"),
          type: "phone",
          handleSetCountry: this.handleSetCountry
        },
        password: {
          placeholder: this.$t("sign.formPlaceholder.pwdLogin"),
          type: "password"
        }
      };
    },
    query() {
      return this.$route.query;
    }
  },
  methods: {
    ...mapActions(["fetchCaptcha", "login"]),
    handleChangeRoute(route, isReplace = false) {
      console.log(route, isReplace);
      if (isReplace) {
        this.$router.replace({ name: route });
      } else {
        this.$router.push({ name: route });
      }
    },
    updateData(data) {
      this.formData = {
        ...this.formData,
        ...data
      };
    },
    handleSetCountry(value) {
      this.formData.countryCode = value;
    },

    // 处理登录
    handleSubmit() {
      const isValid = this.chechFormRules();
      // 4.1验证通过
      if (isValid) {
        const { invUserId = 1, sourceCode = "" } = this.urlParams;

        const { certCode, password, countryCode } = this.formData;
        const account =
          countryCode === defaultCountryCode
            ? certCode
            : `${countryCode}-${certCode}`;

        const params = {
          certType: 0,
          certCode: account,
          pwd: password,
          invUserId,
          sourceCode
        };

        this.login(params)
          .then(res => {
            // 4.2登录成功
            this.handleLoginSuccess();
          })
          .catch(() => {
            toast({ txt: "登录失败，请重试" });
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
            const { redirect = "/" } = this.query;
            this.$router.replace({ path: redirect });
          } else {
            window.location.href = decodeURIComponent(redirect_url);
          }
        }
      });
    },
    // 表单校验
    chechFormRules() {
      const { certCode, password } = this.formData;

      if (!certCode) {
        this.formRules.certCode.tips = "请输入账号/手机号码";
        return false;
      } else {
        this.formRules.certCode.tips = "";
      }

      if (!password) {
        this.formRules.password.tips = "请输入登录密码";
        return false;
      } else {
        this.formRules.password.tips = "";
      }

      return true;
    }
  }
};
</script>
