<template>
  <div :class="['jf-wrap', nextBtnShow && nextBtnFixed && 'pb']">
    <!-- 默认插槽 -->
    <slot></slot>

    <!-- 下一步按钮 -->
    <template v-if="nextBtnShow">
      <div :class="['common-btn', nextBtnFixed && 'fixed']">
        <cube-button :disabled="isCannext" @click="handleNext">{{btnText || $t('deposit.common.text_3')}}</cube-button>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'JfWrap',
  props: {
    // 底部按钮是否显示
    nextBtnShow: {
      type: Boolean,
      default: true
    },
    // 底部按钮是否固定
    nextBtnFixed: {
      type: Boolean,
      default: true
    },
    // 按钮是否可点击
    isDisabled: {
      type: Boolean,
      default: false
    },
    // 按钮提示语
    btnText: {
      type: String,
      default: ''
    },
    // 提交前 链式函数
    handleBefore: {
      type: Function,
      default: () => {
        return Promise.resolve()
      }
    }
  },
  data() {
    return {
      isClicked: false // 按钮是否已点击
    }
  },
  computed: {
    isCannext() {
      return this.isDisabled || this.isClicked
    }
  },
  methods: {
    // 1.点击按钮事件
    handleNext(e) {
      // 防止多次点击
      if (this.isClicked) return false
      this.isClicked = true

      // 调用完成重置按钮点击状态
      this.handleBefore()
        .then(res => {
          // 验证成功
          this.handleSuccessFunc(e, res)
        })
        .catch(err => {
          // 验证失败
          this.handleFailFunc(e, err)
        })
    },
    // 2.回传父组件事件 - 成功
    handleSuccessFunc(e, res) {
      this.isClicked = false
      this.$emit('handleNext', e, res)
    },
    // 3.回传父组件事件 - 失败
    handleFailFunc(e, err) {
      this.isClicked = false
      this.$emit('handleFail', e, err)
    }
  }
}
</script>

<style lang="scss" scoped>
 .common-btn >>> .cube-btn {
  border-radius:46px;
 }
.common-btn >>> .cube-btn_disabled::after {
  border: none;
}
.jf-wrap {
  &.pb {
    padding-bottom: 160px;
  }
}

.common-btn {
  width: 700px;
  margin: 20px auto;
  &.fixed {
    position: fixed;
    left: 25px;
    right: 25px;
    bottom: 40px;
    z-index: 10;
    margin: auto;
  }
}
</style>
