<template>
  <div class="op-guide-com op-guide-com-fail">
    <section class="content">
      <div class="box">
        <em class="status"></em>
        <p class="result-title" v-html="failTitle"></p>
        <p v-if="isCanceled" class="desc-content">
          {{$t("iopenExt.guide.contactPre")}}
          <a
            class="telephone"
            :href="`tel:${telePhone}`"
          >{{telePhone}}</a>
        </p>
      </div>
      <div v-if="!isCanceled" class="desc">
        <h4 class="desc-title">{{$t("iopenExt.guide.fail.descTitle")}}</h4>
        <p class="desc-tips" v-for="(reason, idx) in failReasons" :key="idx">{{reason}}</p>
        <p class="desc-tips">
          {{$t("iopenExt.guide.contactPre")}}
          <a
            class="telephone"
            :href="`tel:${telePhone}`"
          >{{telePhone}}</a>
        </p>
      </div>
    </section>
    <footer class="foot">
      <cube-button @click="onClick">{{$t('iopenExt.guide.fail.btn')}}</cube-button>
    </footer>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import {
  OPEN_STATUS,
  PENDING_STATUS_TYPE,
  FAIL_STATUS_TYPE
} from "@/modules/module-iopen-extension/enums/open-progress";
export default {
  props: {
    skin: {
      // 皮肤
      type: String,
      default: ""
    },
    isCanceled: {
      // 是否取消开户
      type: Boolean,
      default: false
    }
  },
  computed: {
    ...mapGetters(["userInfo", "openProgress"]),
    // 开户状态
    openStatus() {
      return this.openProgress.openStatus;
    },
    failStatusType() {
      return this.openProgress.failType;
    },
    telePhone() {
      return this.$t("customize.company.telePhone");
    },
    failTitle() {
      if (this.isCanceled) {
        return this.$t("iopenExt.guide.fail.titleCanceled");
      }
      return this.$t("iopenExt.guide.fail.titleBack");
      // switch (this.failStatusType) {
      //   // 其他错误
      //   case FAIL_STATUS_TYPE.ERROR_OTHER:
      //   // 基本数据错误
      //   case FAIL_STATUS_TYPE.ERROR_INFO:
      //   // 影像数据错误
      //   case FAIL_STATUS_TYPE.ERROR_PIC:
      //   // CA数据错误
      //   case FAIL_STATUS_TYPE.ERROR_INFO_PIC:
      //   // 未知
      //   case FAIL_STATUS_TYPE.ERROR_CA:
      //   default:
      // }
    },
    failReasons() {
      if (this.isCanceled || !this.openProgress) return [];
      const failReasonInfo = this.openProgress.failReason;
      if (!Array.isArray(failReasonInfo)) return [];
      return failReasonInfo;

      // return [];
    }
  },
  methods: {
    // 点击跳转'极速开户'
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>