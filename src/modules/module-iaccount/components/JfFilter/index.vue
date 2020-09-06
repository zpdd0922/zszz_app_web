<template>
  <div class="jf-filter">
    <div class="title">
      <span :class="['txt', isShowMenu && 'selected_active']" @click="_clickFilter">{{ $t(getCurrent) }}</span>
    </div>
    <div v-show="isShowMenu" class="menu" :style="fixedStyle">
      <div class="menu-mask" @touchmove.prevent></div>
      <div class="menu-list">
        <ul>
          <li
            v-for="(item, index) in menus"
            :key="index"
            class="menu-item border-top-1px"
            :class="isShowMenu && value === item.value && 'active'"
            @click="_filterItem(item, index)">
            <span class="txt">{{ $t(item.text) }}</span>
            <jf-icon class="status" name="selected_arrow"></jf-icon>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    menus: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      isShowMenu: false,
      fixedStyle: {}
    }
  },
  created() {},
  computed: {
    getCurrent() {
      return (this.menus.find((item, index) => item.value === this.value) || {}).text || ''
    }
  },
  methods: {
    _hide() {
      this.isShowMenu = false
    },
    _clickFilter() {
      if (!this.isShowMenu) {
        this._getStyleTop()
      }
      this.isShowMenu = !this.isShowMenu
    },
    _filterItem(item, index) {
      this.$emit('input', item.value)
      this.$emit('filter', item, index)
      this.isShowMenu = false
    },
    _getStyleTop() {
      const { top, height } = this.$el.getBoundingClientRect()
      const temp = (top + height)
      this.fixedStyle = { top: temp + 'px' }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.jf-filter {
  .title {
    color: $color-text;
    font-size: 28px;
    .txt {
      display: block;
      @include triangle(12px, $color-999, bottom);
      &:after {
        margin-top: 8px;
      };
    };
    .selected_active {
      @include triangle(12px, $color-999, top);
      &:after {
        margin-top: -4px;
      };
    };
  };
  .menu {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 750px;
    margin: auto;
    z-index: 99;
    .menu-mask {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: $color-mask-bg;
      z-index: 1;
    };
    .menu-list {
      position: relative;
      z-index: 2;
    };
    .menu-item {
      @include flex-box($row: space-between, $col: center);
      background: $color-theme;
      color: $color-text;
      font-size: 26px;
      padding: 30px 28px;
      line-height: 1;
      &.active {
        color: $color-link;
        .status {
          display: block;
        };
      };
    };
    .status {
      display: none;
    };
  };
};
</style>