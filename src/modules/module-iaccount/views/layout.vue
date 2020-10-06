<template>
  <div class="layout-iaccount" v-if="secAccountInfo">
    <router-view />
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.setTitle(this.$t("iAccount.main.pageName"));

    this.getSecAccountInfo();
  },
  mounted() {
    // this.setTitle("证券服务")
    // document.title = '证券服务';
  },
  computed: {
    ...mapGetters(["secAccountInfo"]),
  },
  methods: {
    ...mapActions(["getSecAccountInfo"]),
  },
};
</script>
