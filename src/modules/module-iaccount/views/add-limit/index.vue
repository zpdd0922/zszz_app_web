<template>
  <div class="add-limit-wrap">
    <section class="curLimit">
      <div class="title">{{ getI18n("curLimit.titleHK") }}</div>
      <div>
        <span class="num">{{ curLimit1 }}</span>
        <span class="unit">{{ getI18n("curLimit.unit") }}</span>
      </div>
    </section>
    <section class="canLimit">
      <header class="title">{{ getI18n("canLimit.title") }}</header>
      <div class="body-wrap">
        <div class="body">
          <div>{{ getI18n("canLimit.hk") }}</div>
          <div>
            <span class="num">{{ canLimit }}</span>
            <span class="unit">{{ getI18n("curLimit.unit") }}</span>
          </div>
        </div>
      </div>
      <div class="input">
        <label for="tradePwd">{{ getI18n("tradePwd.label") }}</label>
        <input
          type="password"
          :placeholder="getI18n('tradePwd.placeholder')"
          name="tradePwd"
          v-model="tradePwd"
        />
      </div>
    </section>
    <section class="footer">
      <div class="agree">
        <cube-checkbox v-model="checked">
          <span class="link-start">{{ getI18n("agreement.linkStart") }}</span>
          <span @click.stop="handleToAgreement" class="base-links">{{
            getI18n("agreement.linkContent")
          }}</span>
          {{ getI18n("agreement.linkEnd") }}
        </cube-checkbox>
      </div>
      <div class="btn-wrap">
        <cube-button :disabled="!isCanNext" @click="handleNext">{{
          getI18n("nextBtn")
        }}</cube-button>
      </div>
      <div class="record" @click="goToHistory">
        {{ getI18n("record") }}
      </div>
    </section>
    <section class="tips">
      <h3>{{ getI18n("tips.title") }}</h3>
      <ol tag="ol">
        <li v-for="(item, index) in getI18n('tipsList')" :key="index">
          {{ item }}
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import { getURLParameters } from "@/main/utils/format/url";
import { toast } from "@/main/utils/common/tips/";
// import tipsList from ''
// import {
//   curLimitList,
//   canLimitList,
// } from "@/modules/module-iaccount/views/add-limit/stock-list";

export default {
  data() {
    return {
      //交易密码
      tradePwd: null,
      //当前额度
      curLimit1: this.curLimit || 200000,
      //可以提升的额度
      canLimit: 200000,
      //同意协议
      checked: false,
    };
  },
  created() {
    // this.$store.dispatch("getCurLimit");
    this.setTitle(this.$t("iAccount.addLimit.pageName"));
  },
  computed: {
    ...mapGetters([
      'curLimit'
    ]),
    isCanNext() {
      return this.checked && this.tradePwd && this.tradePwd.length > 0;
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
    getI18n(key) {
      return this.$t(`iAccount.addLimit.${key}`);
    },
    // 处理提交
    handleNext() {
      this.$store.dispatch('submitAddLimit').then(()=>{

      })
    },
    // 处理跳转协议
    handleToAgreement() {
      return;
    },
    //跳转历史记录页面
    goToHistory() {
      this.$router.push({ name: "add-limit-history" });
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
