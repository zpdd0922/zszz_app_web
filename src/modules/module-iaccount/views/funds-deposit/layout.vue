<template>
  <div class="sec-funds-deposit">
    <header v-if="headerTitle" class="sec-page-title">
      <base-cell>
        <base-cell-header></base-cell-header>
        <base-cell-body>{{headerTitle}}</base-cell-body>
        <base-cell-footer v-if="headerGuide && headerGuideUrl">
          <a class="guide-link" :href="headerGuideUrl">{{headerGuide}}</a>
        </base-cell-footer>
      </base-cell>
    </header>
    <!-- Loading -->
    <template v-if="!secAccountInfo">
      <loading />
    </template>

    <!-- 主体内容 -->
    <template v-else>
      <router-view />
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import commonMixin from "@/modules/module-iaccount/mixins/common";

export default {
  mixins: [commonMixin],
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["secAccountInfo"]),
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
    step() {
      return this.$route.meta.step;
    },
    isHeader() {
      const { isHeader = true } = this.$route.meta;
      return isHeader;
    },
    isFooter() {
      const { isFooter = true } = this.$route.meta;
      return isFooter;
    },
  },
  methods: {},
  created() {
    this.$store.dispatch("getSecAccountInfo").then((res) => {
      this.getAccountStatus(res);
    });
  },
};
</script>