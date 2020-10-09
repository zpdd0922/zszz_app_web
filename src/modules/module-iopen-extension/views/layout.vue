<!--
 * @Author: Jim
 * @Date: 2019-12-18 12:55:20
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-15 16:49:34
 * @Description: 
 -->
<template>
  <div class="margin-page-wrap">
    <!-- Loading -->
    <template v-if="isFetchingProgress">
      <base-waiting />
    </template>
    <!-- 主体内容 -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isFetchingProgress: false
    };
  },
  computed: {
  },
  //TODO:这里路由跳转前请求开户状态，根据状态跳转路由
  created() {
    this.setTitle(this.$t("iopenExt.main.pageName"));
    // this.init();
  },
  methods: {
    init() {
      this.$store.dispatch('getOpenProgress').then(()=>{
        this.isFetchingProgress = false;
      })
    }
  }
};
</script>