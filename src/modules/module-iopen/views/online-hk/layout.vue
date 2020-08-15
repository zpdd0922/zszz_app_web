<!--
 * @Author: Jim
 * @Date: 2019-12-18 12:55:20
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-15 16:49:34
 * @Description: 
 -->
<template>
  <div class="op-layout">
    <header v-if="isHeader" class="op-page-title">{{pageName}}</header>
    <!-- Loading -->
    <template v-if="!openInfoHK">
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
    ...mapGetters(["openProgress", "openInfoHK"]),
    pageName() {
      const pageName = this.$route.meta.pageName;
      if (pageName) {
        return this.$t(pageName);
      }
      return "";
    },
    isHeader() {
      const { isHeader = true } = this.$route.meta;
      return isHeader;
    },
    isFooter() {
      const { isFooter = true } = this.$route.meta;
      return isFooter;
    }
  },
  created() {
    this.fetchOpenInfo();
    // this.BroadCast.onmessage(this.BROADCAST_ENUMS.UPDATE_TITLE, data => {
    //   if (data && data.title) {
    //     this.pageName = data.title;
    //   } else {
    //     this.pageName = document.title;
    //   }
    // });
  },
  methods: {
    ...mapActions(["getHkCacheData"]),

    // 获取用户开户信息 - 大陆
    fetchOpenInfo() {
      this.getHkCacheData();
    }
  }
};
</script>