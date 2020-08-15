<template>
  <div id="root" class="app-wrap">
    <Header :isLogin="isLogin"/>
    <section>
      <View404/>
    </section>
  </div>
</template>
<script>
import Header from '@/main/components/header/header';
import { View404 } from '../../views/index';

export default {
  name: 'App',
  components: {
    Header,
    View404
  },
  data() {
    return {};
  },
  mounted() {},
  watch: {},
  methods: {}
};
</script>
<style lang="scss">
</style>
