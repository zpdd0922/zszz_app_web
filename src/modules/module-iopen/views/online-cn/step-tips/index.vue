<template>
  <op-wrap
    :isDisabled="!isCanNext"
    :btnText="this.getI18n('btn')"
    @handleNext="handleNext"
  >
    <div class="olcn-step olcn-step-tips">
      <cube-popup :visible="isShowAgreementPopup">
        <risk-com-agreement />
      </cube-popup>
      <div class="step-content step-content-list">
        <base-cells>
          <base-cell v-for="(item, idx) in list" :key="idx">
            <base-cell-header>
              <span :class="`icon icon-${item.icon}`">
                <em />
              </span>
            </base-cell-header>
            <base-cell-body>
              <span>{{item.label}}</span>
            </base-cell-body>
          </base-cell>
        </base-cells>
      </div>
      <div class="margin-bottom"></div>
      <div class="step-content-agreement">
        <div class="square">
          <cube-checkbox v-model="model.riskAgreement" shape="square">
            {{getI18n('agreement.linkStart')}}
            <span
              @click.stop="handleToAgreement"
              class="base-links"
            >{{getI18n('agreement.linkContent')}}</span>
            {{getI18n('agreement.linkEnd')}}
          </cube-checkbox>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import {
  toast,
  alert,
  customToast,
  customAlert,
} from "@/main/utils/common/tips";
import UserAge from "@/main/utils/common/ua-info";
import { riskOptions } from "./base-list";
import RiskComAgreement from "./com-agreement";

export default {
  mixins: [onlineMixin],
  components: {
    RiskComAgreement,
  },
  data() {
    return {
      model: {
        riskAgreement: false,
      },
      isShowAgreementPopup: false,
    };
  },
  computed: {
    list() {
      return this.getI18n("content");
    },
    nextBtnText() {
      if (!this.isPlayStatus) return this.getI18n("playMediaBtn");
      return "";
    },
    isCanNext() {
      if (this.model.riskAgreement) {
        return true;
      }
      return false;
    },
  },
  created() {
    this.updateInfo();
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("tips", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      // 表单信息
      Object.keys(this.model).forEach((val) => {
        const res = userInfo[val] ? userInfo[val] : this.model[val];
        this.model[val] = res;
      });
    },
    // 跳转协议页面
    showAlert(item) {
      const { value } = item;
      if (value === 0) {
        this.$router.push({ name: "cash-account" });
      } else if (value === 1) {
        this.$router.push({ name: "pel" });
      }
    },
    handleNext(e) {
      e.preventDefault();
      // 保存数据&下一步
      const obj = this.model;
      const params = {
        step: this.step,
        info: obj,
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    handleBefore() {
     
    },
    handleToAgreement(e) {
      e.preventDefault();
      // this.$refs.agreementPopup.show();
      // this.isShowAgreementPopup = true;
      alert(
        {
          title: this.getI18n("agreement.dialogTitle"),
          confirmTxt: this.getI18n("agreement.dialogBtn"),
          showClose: true,
          callback: () => {
            this.model.riskAgreement = true;
          },
        },
        (h) => [
          h(RiskComAgreement, {
            props: {
              language: this.language,
            },
            slot: "content",
          }),
        ]
      );
    },
  },
};
</script>



