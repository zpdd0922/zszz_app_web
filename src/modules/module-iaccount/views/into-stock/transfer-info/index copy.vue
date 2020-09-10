<template>
  <p v-if="isHK">转移信息</p>
  <p v-else> zmeigu</p>
</template>

<script>
export default {
  data() {
    return {
      isHk: true
    }
  },
  props: {
    intoType: {
      type: String,
      default: 'hk'
    }
  },
  computed: {
    // 判断路由入口是美股还是港股
    isHK() {
      if (this.intoType === 'hk') {
        return true
      }
      return false
    }
  }
}
</script>

<style>

</style>