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
  margin-top: .05rem;
  .part-title {
    padding: 0 .15rem;
    font-size: .14rem;
    line-height: .33rem;
    font-weight: 500;
    @include border-x(bottom);
  }
  .part-card {
    position: relative;
  }
}
</style>
