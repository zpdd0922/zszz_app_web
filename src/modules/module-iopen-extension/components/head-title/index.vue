
<template>
  <div class="op-header-title border-bottom-1px">
    <span class="op-header-title-main">{{title}}</span>
    <span class="op-header-title-tips" v-if="tips.length" @click.stop="tipsClick">{{tips}}</span>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'headTitle',
  props: {
    title: {
      type: String,
      required: true
    },
    tips: {
      type: String,
      default: ''
    },
  },
  data() {
    return {

    };
  },
  methods:{
    tipsClick() {
      this.$emit("tipsClick")
    }
  }
};
</script>
<style lang="scss">
@import './style.scss';
</style>