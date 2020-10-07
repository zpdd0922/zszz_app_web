<template>
  <div class="risk-com-agreement">
    <ul>
      <li v-for="(item, idx) in agreements" :key="idx">
        <a class="base-links" :href="item.href">《{{item.content}}》</a>
      </li>
    </ul>
  </div>
</template>
<script>
import { agreementsData } from "./base-list";
export default {
  data() {
    return {};
  },
  props: {
    language: {
      type: String,
      default: ""
    }
  },
  computed: {
    agreements() {
      if (!this.language) return [];
      if (this.language === "zh_CN") {
        return agreementsData.zh_CN.list || [];
      }
      return agreementsData.zh_HK.list || [];
    }
  },
  created() {
    console.log(this.$t('language'))
  }
};
</script>
<style lang="scss" scoped>
.risk-com-agreement {
  padding: 0 .15rem;

  ul li {
    line-height: 2.5em;
  }
}
</style>