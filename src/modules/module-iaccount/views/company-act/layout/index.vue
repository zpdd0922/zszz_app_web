<template>
  <div>
    <header v-if="headerTitle" class="sec-page-title">
      <base-cell>
        <base-cell-header></base-cell-header>
        <base-cell-body>{{headerTitle}}</base-cell-body>
        <base-cell-footer v-if="headerGuide && headerGuideUrl">
          <a class="guide-link" :href="headerGuideUrl">{{headerGuide}}</a>
        </base-cell-footer>
      </base-cell>
    </header>
    <router-view/>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'

export default {
  data () {
    return {

    }
  },
  computed: {
    headerTitle() {
      const title = this.$route.meta.title;
      if (title) {
        return this.$t(title);
      }
      return "";
    },
    headerGuide() {
      const guide = this.$route.meta.guide;
      if (guide) {
        return this.$t(guide);
      }
      return "";
    },
    headerGuideUrl() {
      const guideUrl = this.$route.meta.guideUrl;
      if (guideUrl) {
        return guideUrl;
      }
      return "";
    },
  }
}
</script>

