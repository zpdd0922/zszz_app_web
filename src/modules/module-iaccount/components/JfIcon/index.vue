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

<style scoped>
/* @import '~assets/stylus/variable.styl'
@import '~assets/stylus/mixin.styl'

.jf-icon
  display inline-block
  vertical-align middle
  i
    font-style normal
    display block
  .icon-symbol
    color $color-theme
    font-size 24px
    padding 4px 16px
    margin-left 16px
    background:linear-gradient(-90deg,rgba(254,121,56,1),rgba(253,172,101,1));
    border-radius:0px 16px 0px 16px;

  .icon-tips_gray
    margin-left 10px
    bg-image('icon/tips_gray', true)
  .icon-tips_white
    margin-left 10px
    bg-image('icon/tips_white', true)
  .icon-del
    bg-image('icon/del', true)
  .icon-success
    bg-image('icon/status_success', true)
  .icon-empty
    bg-image('icon/empty', true)
  .icon-us
    bg-image('icon/us', true)
  .icon-hk
    bg-image('icon/hk', true)
  .icon-cn
    bg-image('icon/cn', true)
  .icon-other
    bg-image('icon/other', true)
  .icon-selected_arrow
    bg-image('icon/selected_arrow', true)
  .icon-cmbc_yz
    bg-image('icon/cmbc_yz', true)
  .icon-cmbc_logo
    bg-image('icon/cmbc_logo', true)
  .icon-cmb_wlb_logo
    bg-image('icon/cmb_wlb_logo', true)
  .icon-cmb_wlb_yz
    bg-image('icon/cmb_wlb_yz', true)
  .icon-cmbc
    bg-image('icon/cmbc', true)
  .icon-fps
    bg-image('icon/fps', true)
  .icon-bank
    bg-image('icon/bank', true)
  .icon-check
    bg-image('icon/check', true) */
</style>
