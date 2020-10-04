<template>
  <div class="double-check-wrap">
    <header class="header">
      <img :src="imgUrl" alt="double-check" class="img" />
      <p class="emp">{{ $t("doubleCheck.header_1") }}</p>
      <p>{{ $t("doubleCheck.header_2") }}</p>
    </header>
    <section class="body">
      <div class="captcha-wrap">
        <input
          type="text"
          :value="captcha"
          :placeholder="$t('doubleCheck.captchaPlaceholder')"
          class="captchaInput"
          maxlength="6"
        />
        <span class="sendCaptcha">{{ $t("doubleCheck.sendCaptcha") }}</span>
      </div>
      <cube-button :disabled="isDisabled" @click="handleSubmit" class="cap-btn">{{
        $t("doubleCheck.confirmBtn")
      }}</cube-button>
      <div class="tips">{{ $t("doubleCheck.tips") }}</div>
    </section>
    <footer class="footer">
      <div class="faqs-title">FAQS</div>
      <div class="faqs">
        <h3>{{ $t("doubleCheck.faqs.question_1") }}</h3>
        <p>{{ $t("doubleCheck.faqs.answer_1") }}</p>
      </div>
      <div class="faqs">
        <h3>{{ $t("doubleCheck.faqs.question_2") }}</h3>
        <p>{{ $t("doubleCheck.faqs.answer_2") }}</p>
      </div>
      <div class="faqs">
        <h3>{{ $t("doubleCheck.faqs.question_3") }}</h3>
        <p>{{ $t("doubleCheck.faqs.answer_3") }}</p>
      </div>
    </footer>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  components: {},
  data() {
    return {
      imgUrl: require("@/modules/module-double-check/assets/images/double-check.png"),
      // formData: {
      //   certCode: "",
      //   captcha: "",
      // },
      // formRules: {
      //   certCode: {
      //     tips: "",
      //   },
      //   captcha: {
      //     tips: "",
      //   },
      //   captchaImg: {
      //     tips: "",
      //   },
      // },
      captcha: '',
    };
  },
  computed: {
    isDisabled() {
      // const { certCode, captcha } = this.formData;
      const result = this.captcha && this.captcha.length;
      return result < 1;
    },
    isCanSend() {
      return this.formData.certCode.length > 1;
    },
    formList() {
      // if (this.isShowImgCaptcha) {
      //   return {
      //     certCode: {
      //       placeholder: this.$t("doubleCheck.formPlaceholder.accountMobile"),
      //       type: "phone",
      //       handleSetCountry: this.handleSetCountry,
      //     },
      //     captcha: {
      //       placeholder: this.$t("doubleCheck.formPlaceholder.captcha"),
      //       type: "code",
      //       isCanSend: this.isCanSend,
      //       handleCheckTrue: this.handleCheckTrue,
      //       handleSendCode: this.handleSendCode,
      //     },
      //     captchaImg: {
      //       placeholder: this.$t("doubleCheck.formPlaceholder.imgCaptcha"),
      //       type: "captcha",
      //       captchaSrc: this.captchaImgUrl,
      //       handleCaptchaSrc: () => {
      //         this.captchaImgUrl = defaultSrc + +new Date();
      //       },
      //     },
      //   };
      // }
      return {
        captcha: {
          placeholder: this.$t("doubleCheck.captchaPlaceholder"),
          type: "code",
          isCanSend: this.isCanSend,
          handleCheckTrue: this.handleCheckTrue,
          handleSendCode: this.handleSendCode,
        },
      };
    },
  },
  methods: {
    ...mapActions(["needCaptcha", "fetchCaptcha"]),
    updateData(data) {
      this.formData = {
        ...this.formData,
        ...data,
      };
    },
    //处理提交
    handleSubmit() {
      const isValid = this.chechFormRules();
      // 4.1验证通过
      if (isValid) {
        const { invUserId = 1, sourceCode = "" } = this.urlParams;

        const {
          certCode,
          countryCode,
          captcha,
          captchaId,
          captchaImg,
        } = this.formData;
        const account =
          countryCode === defaultCountryCode
            ? certCode
            : `${countryCode}-${certCode}`;

        const params = {
          certType: 9,
          certCode: account,
          eventId: captchaId,
          pwd: captcha,
          captcha: captchaImg,
          invUserId,
          sourceCode,
        };

        this.login(params).then((res) => {
          // 4.2登录成功
          this.handleLoginSuccess();
        });
      }
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
        // const params = {
        //   nameType: 0,
        //   name: certCode,
        // };
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

<style lang="scss" scoped>
@import "./style.scss";
</style>
