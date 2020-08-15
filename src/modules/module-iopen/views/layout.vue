<!--
 * @Author: Jim
 * @Date: 2019-12-18 12:55:20
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-15 16:49:34
 * @Description: 
 -->
<template>
  <div class="op-page-wrap">
    <!-- Loading -->
    <template v-if="!openProgress">
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
    return {};
  },
  computed: {
    ...mapGetters(["openProgress"])
  },
  created() {
    this.init();
  },
  methods: {
    ...mapActions(["getOpenProgress"]),
    init() {
      this.getOpenProgress({ flag: 0 });
    }
  }
};
</script>