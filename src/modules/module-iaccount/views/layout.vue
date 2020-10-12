<template>
  <div class="layout-iaccount" v-if="secAccountInfo">
    <router-view />
  </div>
  <div v-else>
      <base-waiting />
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
  },
  computed: {
    ...mapGetters(["secAccountInfo"]),
  },
  methods: {
    ...mapActions(["getSecAccountInfo"]),
  },
};
</script>
