<template>
  <div :class="['jf-action-sheet', isShow && 'active']">
    <div class="mask" @touchmove.prevent @click="close"></div>
    <div class="wrap">
      <slot>
        <ul class="sheet-panel">
          <li
            v-for="(item, index) in items"
            :key="index"
            class="sheet-item"
            @click="_clickItem(item, index)">
            <span>{{ $t(item.title) }}</span>
          </li>
        </ul>
      </slot>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    // 是否可见
    visible: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      default: () => []
    },

    openCallBack: {
      type: Function,
      default: null
    },
    closeCallBack: {
      type: Function,
      default: null
    }
  },
  data() {
    return {
      isShow: this.visible
    }
  },
  methods: {
    // 关闭
    close() {
      if (this.closeCallBack && typeof this.closeCallBack === 'function') {
        this.closeCallBack()
      }
      this.isShow = false
    },
    // 打开
    open() {
      if (this.openCallBack && typeof this.openCallBack === 'function') {
        this.openCallBack()
      }
      this.isShow = true
    },
    _clickItem(item, index) {
      this.$emit('clickItem', item, index)
    }
  }
}
</script>

<style lang="scss" scoped >
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.jf-action-sheet {
  &.active {
    .mask {
      position: fixed;
    };
    .wrap {
      transform: translateY(0);
    };
  };
  .mask {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 99;
    background: $color-mask-bg;
  };
  .wrap {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    margin: auto;
    transition: transform 280ms;
    transform: translateY(100%);
  };
  .sheet-item {
    background: $color-theme;
    color: $color-text;
    font-size: .15rem;
    padding: .2rem 0;
    text-align: center;
    &:not(:last-child) {
      @include border-x(bottom);
    };
    &:active {
      background: $color-theme-bg;
    };
  };
};
</style>