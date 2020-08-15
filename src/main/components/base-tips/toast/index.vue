<template>
  <transition name="base-tips-toast-drop">
    <div :style="{'z-index': zIndex}" v-show="isVisible" :class="domClass">
      <div v-show="mask" class="base-tips-mask" @touchmove.prevent @click="maskClick"></div>
      <div class="base-tips-container">
        <div class="base-tips-content">
          <i class="cube-toast-icon cubeic-wrong" />
          <span class="toast-txt">{{txt}}</span>
        </div>
      </div>
    </div>
  </transition>
</template>
<script>
export default {
  name: 'base-com-toast',
  props: {
    mask: {
      type: Boolean,
      default: false
    },
    txt: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: 'loading'
    },
    time: {
      type: Number,
      default: 0
    },
    onTimeout: {
      type: Function,
      default: () => {}
    },
    zIndex: {
      type: Number,
      default: 900
    }
  },
  data() {
    return {
      isVisible: false
    };
  },
  watch: {},
  computed: {
    domClass() {
      return [
        'base-tips-toast', `base-tips-toast-${this.type}`
      ];
    },
    isLoading() {
      return this.type === 'loading';
    }
  },
  methods: {
    maskClick() {
      this.maskClosable && this.hide();
    },
    show() {
      this.isVisible = true;
      this.clearTimer();
      this.$nextTick(() => {
        if (this.time !== 0) {
          this.timer = setTimeout(() => {
            this.hide();
            this.onTimeout();
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
