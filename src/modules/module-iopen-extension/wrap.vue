<!--
 * @Author: Jim
 * @Date: 2019-12-16 17:28:48
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-25 18:18:09
 * @Description: 
 -->
<template>
  <div class="root-main">
    <section class="content">
      <router-view />
    </section>
    <footer class="copyright">
      <base-copyright :content="$t('customize.company.copyright')" />
    </footer>
    <template v-if="isLoading">
      <base-waiting />
    </template>
  </div>
</template>

<script>
import { mapState } from "vuex";
import BaseCopyright from "@/main/components/base-copyright/";
export default {
  components: { BaseCopyright },
  created() {
    this.setTitle(this.$t("iopenExt.main.pageName"));
  },
  computed: {
    ...mapState({
      isLoading: state => state.viewLoad.isLoading
    })
  }
};
</script>
<style scoped>
.content {
  min-height: 100%;
  padding-bottom: 40px;
  margin-bottom: -40px;
  max-width: 960px;
  margin-left: auto;
  margin-right: auto;
}
.copyright {
  width: 100%;
  font-size: 11px;
  height: 40px;
  line-height: 40px;
}
</style>
