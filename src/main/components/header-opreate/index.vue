<!--
 * @Author: Jim
 * @Date: 2019-09-12 15:33:45
 * @LastEditors: Jim
 * @LastEditTime: 2019-09-12 15:33:45
 * @Description: 
 -->
<template>
  <!-- 通用顶部按钮 -->
  <span class="header-opreate" @click="handlerClick">
    <i v-if="options.type === 'icon'" :class="options.icon"></i>
    <template v-else><span class="type-content" v-html="options.content"></span></template>
  </span>
</template>
<script>
export default {
  name: 'HeaderOpreate',
  props: {
    options: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    handlerClick() {
      if (typeof this.options.callBack === 'function') {
        this.options.callBack(this.options);
      }
    }
  }
};
</script>
