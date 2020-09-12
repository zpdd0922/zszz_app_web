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
    @include jf-icon-img(.14rem, .14rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/tips_gray');
  }
  .icon-tips_white {
    margin-left: 10px;
    @include jf-icon-img(.12rem, .12rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/tips_white');
  }
  .icon-del {
    @include jf-icon-img(.18rem, .18rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/del');
  }
  .icon-success {
    @include jf-icon-img(.55rem, .55rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/status_success');
  }
  .icon-empty {
    @include jf-icon-img(.86rem, .625rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/empty');
  }
  .icon-us {
    @include jf-icon-img(.5rem, .5rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/us');
  }
  .icon-hk {
    @include jf-icon-img(.5rem, .5rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/hk');
  }
  .icon-cn {
    @include jf-icon-img(.5rem, .5rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cn');
  }
  .icon-other {
    @include jf-icon-img(.5rem, .5rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/other');
  }
  .icon-selected_arrow {
    @include jf-icon-img(.155rem, .1rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/selected_arrow');
  }
  .icon-cmbc_yz {
    @include jf-icon-img(.33rem, .33rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc_yz');
  }
  .icon-cmbc_logo {
    @include jf-icon-img(.23rem, .23rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc_logo');
  }
  .icon-cmb_wlb_logo {
    @include jf-icon-img(.23rem, .23rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmb_wlb_logo');
  }
  .icon-cmb_wlb_yz {
    @include jf-icon-img(.33rem, .33rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmb_wlb_yz');
  }
  .icon-cmbc {
    @include jf-icon-img(.45rem, .34rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/cmbc');
  }
  .icon-fps {
    @include jf-icon-img(.635rem, .205rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/fps');
  }
  .icon-bank {
    @include jf-icon-img(.445rem, .33rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/bank');
  }
  .icon-check {
    @include jf-icon-img(.445rem, .32rem);
    @include retina-images('~@/modules/module-iaccount/assets/img/icon/check');
  }
}
</style>
