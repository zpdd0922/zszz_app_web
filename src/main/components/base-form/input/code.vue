<template>
  <div class="base-input">
    <input type="text" v-bind:value="value" v-bind="$attrs" v-on="inputListeners" />
    <span :class="itemCodeClass" @click="handleClickSendCode">{{captchaTips}}</span>
  </div>
</template>

<script>
// 0: 可发送， 1：发送中， 2：发送失败， 3： 发送成功， 4：可再次发送
const SEND_STATUS = {
  SEND: {
    value: 0,
    key: "send",
    label: "获取验证码",
  },
  SENDING: {
    value: 1,
    key: "sending",
    label: "正在获取...",
  },
  FAILED: {
    value: 2,
    key: "failed",
    label: "获取失败",
  },
  SUCCESS: {
    value: 3,
    key: "success",
    label: "$times$ S",
  },
  RESEND: {
    value: 4,
    key: "resend",
    label: "重新获取验证码",
  },
};

export default {
  inheritAttrs: false,
  props: {
    value: {},
    handleSendCode: {
      type: Function,
      default: () => {},
    },
    handleCheckTrue: {
      type: Function,
    },
    isCanSend: {
      type: Boolean,
      default: false,
    },
    timesOut: {
      type: Number,
      default: 60,
    },
  },
  data() {
    return {
      sendStatus: SEND_STATUS.SEND,
      timer: null,
      captchaTimes: "",
    };
  },
  created() {},
  computed: {
    inputListeners() {
      const vm = this;
      return Object.assign({}, this.$listeners, {
        input: function () {
          vm.$emit("input", event.target.value);
        },
      });
    },

    itemCodeClass() {
      return {
        "input-code": true,
        active:
          this.isCanSend &&
          (this.sendStatus.value === SEND_STATUS.SEND.value ||
            this.sendStatus.value === SEND_STATUS.RESEND.value),
      };
    },
    captchaTips() {
      const labels = {
        send: this.$t("sign.captchaStatus.send"),
        sending: this.$t("sign.captchaStatus.sending"),
        failed: this.$t("sign.captchaStatus.failed"),
        success: this.$t("sign.captchaStatus.success"),
        resend: this.$t("sign.captchaStatus.resend"),
      };
      if (this.sendStatus.value !== SEND_STATUS.SUCCESS.value) {
        return labels[this.sendStatus.key];
      }
      return labels[this.sendStatus.key].replace("$times$", this.captchaTimes);
    },
  },
  methods: {
    count() {
      this.captchaTimes = this.timesOut;
      this.timer = setInterval(() => {
        this.captchaTimes--;
        if (this.captchaTimes === 0) {
          this.clear();
          this.sendStatus = SEND_STATUS.RESEND;
        }
      }, 1000);
    },
    clear() {
      if (this.timer) clearInterval(this.timer);
      this.timer = null;
      this.captchaTimes = "";
    },
    async handleClickSendCode() {
      if (
        (this.sendStatus.value !== SEND_STATUS.SEND.value &&
          this.sendStatus.value !== SEND_STATUS.RESEND.value) ||
        !this.isCanSend
      ) {
        return false;
      }

      if (
        typeof this.handleCheckTrue === "function" &&
        !this.handleCheckTrue()
      ) {
        return;
      }

      this.sendStatus = SEND_STATUS.SENDING;
      this.handleSendCode()
        .then(() => {
          this.sendStatus = SEND_STATUS.SUCCESS;
          this.count();
        })
        .catch(() => {
          this.sendStatus = SEND_STATUS.FAILED;
          setTimeout(() => {
            this.sendStatus = SEND_STATUS.RESEND;
          }, 1000);
        });
    },
  },
};
</script>
