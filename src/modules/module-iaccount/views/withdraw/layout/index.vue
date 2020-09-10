<template>
  <div class="withdraw">
    <!-- Loading -->
    <template v-if='!accInfo'>
      <loading />
    </template>

    <!-- 主体内容 -->
    <template v-else>
      <router-view/>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import commonMixin from '@/modules/module-iaccount/mixins/common'

export default {
  mixins: [commonMixin],
  data () {
    return {}
  },
  computed: {
    ...mapGetters([
      'accInfo'
    ])
  },
  methods: {},
  created() {
    this.$store.dispatch('apiFindAccInfo').then(res => {
      this.getAccountStatus(res)
    })
  }
}

</script>

<style lang="scss">
@import './style';
</style>
