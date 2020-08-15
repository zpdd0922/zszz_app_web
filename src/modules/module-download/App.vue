<template>
  <div id="root" class="root-wrap">
    <div class="main">
      <section class="content">
        <DownloadMain />
      </section>
      <footer class="copyright">
        <base-copyright />
      </footer>
    </div>
  </div>
</template>

<script>
import { DownloadMain } from "@/modules/module-download/views/index";
import BaseCopyright from "@/main/components/base-copyright/";

export default {
  components: { BaseCopyright, DownloadMain },
  created() {},
  computed: {}
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
