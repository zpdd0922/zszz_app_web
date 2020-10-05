<template>
  <div class="double-page-wrap">
    <!-- Loading -->
    <template v-if="isGetPhone">
      <base-waiting />
    </template>
    <!-- 主体内容 -->
    <template>
      <router-view />
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      isGetPhone: true
    };
  },
  computed: {
    ...mapGetters([
      'openAccountNum'
    ])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.$store.dispatch('getOpenAccountNum').then(()=>{
        if (this.openAccountNum && this.openAccountNum.length !== 0) {
          this.isGetPhone = false;
        }
      })
    }
  }
};
</script>
