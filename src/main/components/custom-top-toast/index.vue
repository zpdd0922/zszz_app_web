<template>
  <div v-show="isVisible" class="cube-popup cube-toast">
    <div class="cube-popup-container cube-popup-top custom-popup-top">
      <div class="cube-popup-content custom-popup-content">
        <div class="cube-toast-tip custom-toast-tip" v-show="txt" v-html="txt"></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "custom-top-toast",
  props: {
    txt: {
      type: String,
      default: "Loading"
    },
    time: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      timer: null,
      isVisible: false
    };
  },
  methods: {
    show() {
      this.isVisible = true;
      this.clearTimer();
      this.$nextTick(function() {
        if (this.time !== 0) {
          this.timer = setTimeout(() => {
            this.hide();
            this.$emit("timeout");
          }, this.time);
        }
      });
    },
    hide() {
      this.isVisible = false;
      this.clearTimer();
    },
    clearTimer() {
      clearTimeout(this.timer);
      this.timer = null;
    }
  }
};
</script>
<style scoped>
.custom-popup-top {
  text-align: center;
}

.custom-popup-content {
  text-align: center;
  background-color: rgba(244, 67, 54, 0.7);
  padding: 3px 0;
}
.custom-toast-tip {
  text-align: center;
  display: inline-block;
  max-width: 100%;
  flex: 1;
  color: #fff;
}
</style>