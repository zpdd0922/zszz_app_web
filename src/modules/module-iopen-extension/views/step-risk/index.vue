<template>
  <op-wrap
    :isDisabled="!isCanNext"
    :btnText="nextBtnText"
    :handleBefore="handleBefore"
    @handleNext="handleNext"
  >
    <cube-form>
      <head-title :title="titleValues.declareTitle"></head-title>
    </cube-form>
    <div class="olcn-step olcn-step-risk">
      <!-- <cube-popup :visible="isShowAgreementPopup">
        <risk-com-agreement />
      </cube-popup> -->
      <div class="step-content step-content-media">
        <base-cells class="risk-media">
          <base-cell>
            <base-cell-header>
              <i class="avatar" />
            </base-cell-header>
            <base-cell-body>
              <div>
                <p class="rep-name">{{getI18n('media.repNameLabel')}}{{riskAudio.name}}</p>
                <p class="rep-code">{{getI18n('media.repCodeLabel')}}{{riskAudio.code}}</p>
              </div>
            </base-cell-body>
            <base-cell-footer>
              <span :class="['btn-audio']" @click="playAudio">
                <i v-if="isPlay" class="icon-pause"></i>
                <i v-else class="icon-play"></i>
              </span>
              <audio ref="riskMedia" v-show="false" :src="riskAudio.src" />
            </base-cell-footer>
          </base-cell>
        </base-cells>
      </div>
      <div class="margin-bottom"></div>

      <div v-if="isPlayStatus" class="step-content-agreement">
        <div class="agreement-warp">
          <div class="agreement">
            <p v-for="(item, idx) in riskAudio.content" :key="idx" class="item">
              <span class="addon">{{idx+1}}</span>
              <span v-html="item"></span>
            </p>
          </div>
        </div>
        <div class="square">
          <cube-checkbox v-model="model.riskAgreement" shape="square">
            {{getI18n('agreement.linkStart')}}
            <!-- <span
              @click.stop="handleToAgreement"
              class="base-links"
            >{{getI18n('agreement.linkContent')}}</span> -->
            {{getI18n('agreement.linkEnd')}}
          </cube-checkbox>
        </div>
      </div>
      <div v-else class="step-content-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
            <li>{{getI18n('desc.content[1]')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online.vue";
import {
  toast,
  alert,
  customToast,
  customAlert,
} from "@/main/utils/common/tips";
import UserAge from "@/main/utils/common/ua-info";
import { riskList } from "./base-list";
// import RiskComAgreement from "./com-agreement";

export default {
  // mixins: [onlineMixin],
  components: {
    // RiskComAgreement,
  },
  data() {
    return {
      model: {
        riskAgreement: false,
      },
      isPlay: false,
      isPlayStatus: false,
      // isShowAgreementPopup: false,
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("title"),
      };
    },

    riskAudio() {
      if (this.$t('language') === "zh_CN") {
        return riskList.zh_CN;
      } else if(this.$t('language') === "zh_HK") {
        return riskList.zh_HK;
      } else {
        return []
      }
    },
    nextBtnText() {
      if (!this.isPlayStatus) return this.getI18n("playMediaBtn");
      return "";
    },
    isCanNext() {
      if (!this.isPlayStatus) return true;
      if (this.model.riskAgreement) {
        return true;
      }
      return false;
    },
  },
  created() {
  },
  methods: {
    getI18n(key, type = "") {
      return this.$t(`iopenExt.risk.${key}`);
    },

    playAudio(item) {
      this.isPlayStatus = true;
      if (this.isPlay) {
        this.$refs.riskMedia.pause();
        this.isPlay = false;
      } else {
        this.$refs.riskMedia.play();
        this.isPlay = true;
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
      // this.saveCacheInfo(params).then(() => {
        // });
      this.$router.push({ name: 'margin-confirm' });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        // 确认已收听录音
        if (!this.isPlayStatus) {
          // const audioTips = "请确认已经听完风险披露录音！";
          // toast({ type: "txt", txt: audioTips });
          this.playAudio();
          return reject(new Error());
        }
        resolve();
      });
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
<style lang="scss" scoped>
  @import './style.scss';
</style>


