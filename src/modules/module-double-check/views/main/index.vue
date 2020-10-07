<template>
  <div class="double-check-wrap">
    <header class="header">
      <img :src="imgUrl" alt="double-check" class="img" />
      <p class="emp">{{ statusWarn.header1 }}</p>
      <p>{{ statusWarn.header2 }}</p>
    </header>
    <section class="body">
      <div class="phone">{{$t('doubleCheck.curPhoneNum')}}{{hiddennedPhoneNum}}</div>
      <div class="captcha-wrap">
        <!-- <input
          type="text"
          :value="captcha"
          :placeholder="$t('doubleCheck.captchaPlaceholder')"
          class="captchaInput"
          maxlength="6"
        />
        <span class="sendCaptcha"
          @click="handleSendCode"
        >{{ $t("doubleCheck.sendCaptcha") }}</span> -->
        <base-form
          class="captchaForm"
          :formList="formList"
          :formRules="formRules"
          @updateData="updateData"
        />
      </div>
      <cube-button
        :disabled="isDisabled"
        @click="handleSubmit"
        class="cap-btn"
        >{{ $t("doubleCheck.confirmBtn") }}</cube-button
      >
      <cube-checkbox v-model="sevenNRemFlag" class="agree">
        <span @click.stop="handleToAgreement" class="base-links">{{
          $t("doubleCheck.tips")
        }}</span>
      </cube-checkbox>
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
import { mapActions, mapGetters } from "vuex";
import BaseForm from "@/main/components/base-form/";
import { getURLParameters } from "@/main/utils/format/url";
import { toast } from "@/main/utils/common/tips/";

export default {
  components: {
    BaseForm,
  },
  data() {
    return {
      imgUrl: require("@/modules/module-double-check/assets/images/double-check.png"),
      formData: {
        // certCode: "",
        captcha: "",
      },
      formRules: {
        certCode: {
          tips: "",
        },
        captcha: {
          tips: "",
        },
        captchaImg: {
          tips: "",
        },
      },
      //缓存获取的验证码
      captchaId: null,
      urlParams: getURLParameters(),
      sevenNRemFlag: true,
    };
  },
  computed: {
    ...mapGetters(["openAccountNum", "isShowImgCaptcha", "userInfo"]),
    hiddennedPhoneNum() {
      return this.openAccountNum &&
      this.openAccountNum.replace(this.openAccountNum.substring(3, 7), "****")
    },
    statusWarn() {
      const type = this.urlParams.remindType || 0;
      if (type === 0) {
        return {
          header1: this.$t("doubleCheck.statusWarnList.firstTime.header1"),
          header2: this.$t("doubleCheck.statusWarnList.firstTime.header2"),
        };
      } else if (type === 1) {
        return {
          header1: this.$t("doubleCheck.statusWarnList.mt7days.header1"),
          header2: this.$t("doubleCheck.statusWarnList.mt7days.header2"),
        };
      } else if (type === 2) {
        return {
          header1: this.$t("doubleCheck.statusWarnList.untrust.header1"),
          header2: this.$t("doubleCheck.statusWarnList.untrust.header2"),
        };
      } else {
        return {
          header1: this.$t("doubleCheck.statusWarnList.firstTime.header1"),
          header2: this.$t("doubleCheck.statusWarnList.firstTime.header2"),
        };
      }
    },
    isDisabled() {
      const { captcha } = this.formData;
      const result = captcha && captcha.length;
      return result < 1;
    },
    isCanSend() {
      return this.openAccountNum && this.openAccountNum.length > 1;
    },
    formList() {
      if (this.isShowImgCaptcha) {
        return {
          certCode: {
            placeholder: this.$t("doubleCheck.formPlaceholder.accountMobile"),
            type: "phone",
            handleSetCountry: this.handleSetCountry,
          },
          captcha: {
            placeholder: this.$t("doubleCheck.formPlaceholder.captcha"),
            type: "code",
            isCanSend: this.isCanSend,
            handleCheckTrue: this.handleCheckTrue,
            handleSendCode: this.handleSendCode,
          },
          captchaImg: {
            placeholder: this.$t("doubleCheck.formPlaceholder.imgCaptcha"),
            type: "captcha",
            captchaSrc: this.captchaImgUrl,
            handleCaptchaSrc: () => {
              this.captchaImgUrl = defaultSrc + +new Date();
            },
          },
        };
      }
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
    ...mapActions(["getVerifyCode"]),
    handleToAgreement() {
      this.sevenNRemFlag = !this.sevenNRemFlag;
    },
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
        const params = {
          userId: this.userInfo.uId,
          equipmentNum: this.userInfo.equipmentNum || 123124,
          authCode: this.formData.captcha,
          eventId: this.captchaId,
          sevenNRemFlag: Number(this.sevenNRemFlag),
          equipmentName: this.userInfo.equipmentName || "iphone8",
        };
        if (params.eventId !== null) {
          this.$store.dispatch("checkCaptcha", params).then((res) => {
            if (res.validateCode === "1") {
              toast({
                type: "txt",
                txt: this.$t("doubleCheck.checkSuccess"),
                time: 1000,
                callback: () => {
                  console.log("跳转");
                  // if (!redirect_url) {
                  //   const { redirect = "/" } = this.query;
                  //   this.$router.replace({ path: redirect });
                  // } else {
                  //   window.location.href = decodeURIComponent(redirect_url);
                  // }
                },
              });
            } else {
              toast({
                type: "error",
                time: 2000,
                txt: res.validateMsg,
              });
            }
          });
        } else {
          toast({
            type: "txt",
            time: 2000,
            txt: this.$t("doubleCheck.getCaptcha"),
          });
        }
      }
    },

    handleCheckTrue() {
      return this.openAccountNum && this.openAccountNum.length > 0;
    },
    handleSendCode() {
      return new Promise((resolve, reject) => {
        // 发送中
        this.isSendCode = true;
        // const params = {
        //   nameType: 0,
        //   name: certCode,
        // };
        const params = {
          certType: 0,
          phoneNum: this.openAccountNum,
        };

        this.getVerifyCode(params)
          .then((res) => {
            // this.formData.captchaId = res.eventId || 0;
            this.captchaId = res.eventId || 0;
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
      const { captcha } = this.formData;

      if (!captcha) {
        this.formRules.captcha.tips = this.$t("doubleCheck.captchaWarn");
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
