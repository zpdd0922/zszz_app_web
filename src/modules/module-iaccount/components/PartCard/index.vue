<template>
  <div class="part">
    <h3 v-if="title" class="part-title">{{ title }}</h3>
    <div class="part-card">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    }
  },
  data () {
    return {}
  },
  methods: {
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.part {
  color: $color-text;
  background: $color-theme;
  margin-top: 10px;
  .part-title {
    padding: 0 30px;
    font-size: 28px;
    line-height: 66px;
    font-weight: 500;
    @include border-x(bottom);
  }
  .part-card {
    position: relative;
  }
}
</style>
