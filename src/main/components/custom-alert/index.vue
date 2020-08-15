<template>
  <div class="custom-dialog cube-popup cube-popup_mask cube-dialog">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container cube-popup-center">
      <div class="cube-popup-content">
        <div class="cube-dialog-main">
          <div class="cube-dialog-alert">
            <h2 class="cube-dialog-title">
              <p class="cube-dialog-title-def">{{title}}</p>
            </h2>
            <div class="cube-dialog-content">
              <div class="cube-dialog-content-def" v-html="content"></div>
            </div>
            <div class="cube-dialog-btns">
              <span
                @click.prevent="handleConfirm"
                class="cube-dialog-btn border-top-1px cube-dialog-btn_highlight"
              >{{confirmTxt}}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name:'custom-alert',
  props: {
    title: {
      type: String,
      default: "温馨提示"
    },
    content: {
      type: String,
      default: "DOM"
    },
    confirmTxt: {
      type: String,
      default: "确定"
    }
  },
  mounted() {
    this.handleBodyFixed();
  },
  methods: {
    handleBodyFixed() {
      const body = document.querySelector("body");
      const container = document.querySelector(".online-container");
      const { top } = container.getBoundingClientRect();
      body.style = `position: fixed; top: ${top}px`;
      // 退出后摧毁实例
      this.$once("hook:beforeDestroy", function() {
        body.style = "";
        body.scrollTop = -top;
        document.documentElement.scrollTop = -top;
      });
    },
    handleConfirm(e) {
      this.$emit("confirm", e);
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
