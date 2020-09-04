<template>
  <section class="op-guide-com op-guide-com-fail">
    <section class="content">
      <div class="box">
        <em class="status"></em>
        <p class="result-title" v-html="failTitle"></p>
        <p class="result-content">
          {{$t("iOpen.guide.contactPre")}}
          <a
            class="telephone"
            :href="`tel:${telePhone}`"
          >{{telePhone}}</a>
        </p>
      </div>
    </section>
    <footer class="foot">
      <cube-button @click="onClick">{{$t("iOpen.guide.btnLogout")}}</cube-button>
    </footer>
  </section>
</template>



<script>
import { mapGetters, mapActions } from "vuex";
import { OPEN_STATUS } from "@/modules/module-iopen/enums/open-progress";

export default {
  props: {
    skin: {
      // 皮肤
      type: String,
      default: "",
    },
  },
  computed: {
    ...mapGetters(["openProgress"]),
    telePhone() {
      return this.$t("customize.company.telePhone");
    },
    failTitle() {
      // 是否销户
      if (this.openProgress.openStatus === OPEN_STATUS.ACCOUNT_OFF) {
        return this.$t("iOpen.guide.fail.titleAccountOff");
      }
      // 账户异常
      return this.$t("iOpen.guide.fail.titleAccountAbo");
    },
  },
  methods: {
    // 点击跳转'极速开户'
    onClick() {
      this.$emit("click");
    },
  },
};
</script>