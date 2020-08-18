<!--
 * @Author: Jim
 * @Date: 2019-12-11 16:15:26
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-06 15:40:01
 * @Description: 
 -->
<template>
  <div id="root" class="root-wrap">
    <!-- <Header :isShow="false" /> -->
    <section class="root-main">
      <router-view/>
    </section>
  </div>
</template>
<script>
// import Header from '@/main/components/header/header';

export default {
  name: 'App',
  components: {
    // Header
  },
  data() {
    return {
    };
  },
  created() {},
  mounted() {},
  watch: {},
  computed: {},
  methods: {}
};
</script>
<style lang="scss">
</style>
