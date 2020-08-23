<template>
  <div class="sign-layout">
    <!-- 主体内容 -->
    <header v-if="title" class="sign-layout-head">
      <p class="head-title">{{title}}</p>
      <p class="head-tips">{{tips}}</p>
    </header>
    <section class="sign-layout-main">
      <slot></slot>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  props: {
    title: {
      type: String,
      default: undefined
    },
    tips: {
      type: String,
      default: undefined
    }
  },
  watch: {
  },
  computed: {},
  created() {},
  updated() {},
  methods: {}
};
</script>
<style lang="scss">
</style>