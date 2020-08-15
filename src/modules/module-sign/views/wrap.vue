<!--
 * @Author: Jim
 * @Date: 2019-12-16 17:28:48
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-25 18:18:09
 * @Description: 
 -->
<template>
  <div class="main">
    <template v-if="isChecking">
      <base-waiting />
    </template>
    <template v-else>
      <section class="content">
        <router-view />
      </section>
      <footer class="copyright">
        <base-copyright :content="$t('common.company.copyright')" />
      </footer>
    </template>
    <template v-if="!isChecking && isLoading">
      <base-waiting />
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import BaseCopyright from "@/main/components/base-copyright/";
export default {
  components: { BaseCopyright },
  created() {
    // this.setTitle(this.$t("appName"));
  },
  data() {
    return {
      isChecking: false
    };
  },
  computed: {
    ...mapState({
      isLoading: state => state.viewLoad.isLoading
    })
  },
  methods: {
    ...mapActions(["login"])
  }
};
</script>
<style scoped>
.main {
  position: relative;
  min-height: 100%;
  padding-bottom: 40px;
  margin-bottom: -40px;
}
.copyright {
  position: absolute;
  bottom: 0;
  width: 100%;
  font-size: 11px;
  height: 40px;
  line-height: 40px;
}
</style>
