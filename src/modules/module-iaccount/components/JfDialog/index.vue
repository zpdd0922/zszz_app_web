<template>
  <div class="jf-dialog">
    <div class="dialog-mask" @touchmove.prevent></div>
    <div class="dialog-inner">
      <div class="inner-content" :style="styleObj">
        <span
          v-if="showClose"
          class="dialog-close"
          @click="_clickClose"></span>
        <div class="content-wrap">
          <div class="wrap-title">
            <slot name="title">
              {{ title }}
            </slot>
          </div>
          <template v-if="isScroll && items">
            <div class="wrap-scroll">
              <cube-scroll
                ref="scroll"
                :data="items">
                <div
                  class="scroll-item"
                  v-for="(item, index) in items"
                  :key="index">
                  <slot :item="item"></slot>
                </div>
              </cube-scroll>
            </div>
          </template>
          <template v-else>
            <div class="wrap-content">
              <slot>
                <div v-html="content"></div>
              </slot>
            </div>
          </template>
        </div>
        <div v-if="showBtn" class="content-btn border-top-1px">
          <slot name="btn">
            <span @click="_clickBtn" class="txt">{{ btnTxt }}</span>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from '@/modules/module-iaccount/locale'

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    content: {
      type: String
    },
    showClose: {
      type: Boolean,
      default: false
    },
    showBtn: {
      type: Boolean,
      default: true
    },
    title: {
      type: String
    },
    btnTxt: {
      type: String,
      default: () => i18n.t('common.text_1')
    },
    isScroll: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array
    },
    styleObj: {
      type: Object,
      default: () => {}
    }
  },
  data() {
    return {
    }
  },
  mounted() {
  },
  methods: {
    _clickBtn(e) {
      this.$emit('onConfirm', e)
    },
    _clickClose() {
      this.$emit('onClose')
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.jf-dialog {
  @include fixed-full(100);
  .dialog-mask {
    @include fixed-full(1);
    background-color: $color-mask-bg;
  }
  .dialog-close {
    background: url('./images/dialog-close.png') center center;
    background-repeat: no-repeat;
    background-size: contain;
    width: .14rem;
    height: .14rem;
    cursor: pointer;
    position: absolute;
    right: .05rem;
    top: .05rem;
    z-index: 1;
  }
  .dialog-inner {
    @include pos-center(2);
    animation: jfdialog-zoom .4s;
  }
  .inner-content {
    background: $color-theme;
    width: 3.10rem;
    border-radius: .04rem;
    position: relative;
  }
  .content-wrap {
    color: $color-text;
    font-size: .14rem;
    line-height: .22rem;
    padding: .15rem .2rem;
  }
  .wrap-title {
    color: $color-text;
    font-size: .16rem;
    text-align: center;
    font-weight: bold;
  }
  .wrap-scroll {
    height: 4.45rem;
  }
  .scroll-item {
    padding-top: .05rem;
    margin-bottom: .1rem;
  }
  .content-btn {
    color: $color-theme-active;
    font-size: .14rem;
    line-height: .42rem;
    text-align: center;
    .txt {
      display: block;
    }
  }
}

@keyframes jfdialog-fadein {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
@keyframes jfdialog-zoom {
  0% {
    transform: translate(-50%,-50%) scale(0);
  }
  50% {
    transform: translate(-50%,-50%) scale(1.1);
  }
  100% {
    transform: translate(-50%,-50%) scale(1);
  }
}
</style>
