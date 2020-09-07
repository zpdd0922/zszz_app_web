<template>
  <span class="jf-icon" @click="_click">
    <i :class="iconClass" :style="styleObj">
      <slot></slot>
    </i>
  </span>
</template>

<script>

export default {
  props: {
    name: undefined,
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    iconClass() {
      return this.name ? 'icon-' + this.name : ''
    }
  },
  methods: {
    _click() {
      this.$emit('click')
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/theme-white.scss';
// @import '~@/main/assets/scss/mixin.scss';
// @import '~@/modules/module-iaccount/assets/styles/variable.scss';
// @import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.jf-icon {
  display: inline-block;
  vertical-align: middle;
  i {
    font-style: normal;
    display: block;
  }
  .icon-symbol {
    color: $color-theme;
    font-size: .12rem;
    padding: .02rem .08rem;
    margin-left: .08rem;
    background:linear-gradient(-90deg,rgba(254,121,56,1),rgba(253,172,101,1));
    border-radius:0px .08rem 0px .08rem;
  }
  .icon-tips_gray {
    margin-left: 10px;
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/tips_gray');
    // bg-image('icon/tips_gray', true);
  }
  .icon-tips_white {
    margin-left: 10px;
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/tips_white');
    // bg-image('icon/tips_white', true);
  }
  .icon-del {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/del');
    // bg-image('icon/del', true)
  }
  .icon-success {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/status_success');
    // bg-image('icon/status_success', true)
  }
  .icon-empty {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/empty');
    // bg-image('icon/empty', true)
  }
  .icon-us {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/us');
    // bg-image('icon/us', true)
  }
  .icon-hk {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/hk');
    // bg-image('icon/hk', true)
  }
  .icon-cn {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cn');
    // bg-image('icon/cn', true)
  }
  .icon-other {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/other');
    // bg-image('icon/other', true)
  }
  .icon-selected_arrow {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/selected_arrow');
    // bg-image('icon/selected_arrow', true)
  }
  .icon-cmbc_yz {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc_yz');
    // bg-image('icon/cmbc_yz', true)
  }
  .icon-cmbc_logo {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc_logo');
    // bg-image('icon/cmbc_logo', true)
  }
  .icon-cmb_wlb_logo {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmb_wlb_logo');
    // bg-image('icon/cmb_wlb_logo', true)
  }
  .icon-cmb_wlb_yz {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmb_wlb_yz');
    // bg-image('icon/cmb_wlb_yz', true)
  }
  .icon-cmbc {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc');
    // bg-image('icon/cmbc', true)
  }
  .icon-fps {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/fps');
    // bg-image('icon/fps', true)
  }
  .icon-bank {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/bank');
    // bg-image('icon/bank', true)
  }
  .icon-check {
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/check');
    // bg-image('icon/check', true)
  }
}
</style>
