<template>
  <section class="into-stock-op-wrap">
    <!-- 默认插槽 -->
    <slot></slot>
    <!-- 下一步按钮 -->
    <template v-show="nextBtnShow">
      <div class="custom-form-btn">
        <cube-button :disabled="isCannext" @click="handleNext">{{nextBtnText}}</cube-button>
      </div>
    </template>
  </section>
</template>

<script>
export default {
  name: "opWrap",
  props: {
    // 底部按钮是否显示
    nextBtnShow: {
      type: Boolean,
      default: true
    },
    // 按钮是否可点击
    isDisabled: {
      type: Boolean,
      default: true
    },
    // 按钮提示语
    btnText: {
      type: String,
      default: ""
    },
    // 提交前 链式函数
    handleBefore: {
      type: Function,
      default: () => {
        return Promise.resolve();
      }
    }
  },
  data() {
    return {
      isClicked: false // 按钮是否已点击
    };
  },
  computed: {
    nextBtnText() {
      if (typeof this.btnText === "string" && this.btnText !== "") {
        return this.btnText;
      }
      return this.$t("iAccount.nextBtn");
    },
    isCannext() {
      return this.isDisabled || this.isClicked;
    }
  },
  methods: {
    // 1.点击按钮事件
    handleNext(e) {
      // 防止多次点击
      if (this.isClicked) return false;
      this.isClicked = true;

      // 调用完成重置按钮点击状态
      this.handleBefore()
        .then(res => {
          // 验证成功
          this.handleSuccessFunc(e, res);
        })
        .catch(err => {
          // 验证失败
          this.handleFailFunc(e, err);
        });
    },
    // 2.回传父组件事件 - 成功
    handleSuccessFunc(e, res) {
      this.isClicked = false;
      this.$emit("handleNext", e, res);
    },
    // 3.回传父组件事件 - 失败
    handleFailFunc(e, err) {
      this.isClicked = false;
      this.$emit("handleFail", e, err);
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>