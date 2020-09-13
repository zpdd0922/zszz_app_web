<template>
  <div class="into-stock">
    <!-- Loading -->
    <!-- <template v-if='!accInfo'> -->
    <template v-if='false'>
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
import storage from '@/main/utils/cache/localstorage.js'

export default {
  mixins: [commonMixin],
  data () {
    return {
      // 获取历时转入记录需要字段
      stockTransferred: {
        name: '转入股票',
        state: '0',
        step: '0',
        type: '1',
      }
    }
  },
  computed: {
    ...mapGetters([
      'accInfo',
      'stockTransferredHK',
    ])
  },
  methods: {},
  created() {
    //TODO:
    // this.$store.dispatch('getSecAccountInfo').then(res => {
    //   this.getAccountStatus(res)
    // })
    this.$store.dispatch('getSecAccountInfo').then(res => {
      storage.set('secAccountInfo', res)
    })
    //获得历史转移记录，存入vuex;
    this.$store.dispatch('getTransferredStock', this.stockTransferred).then((res) => {console.log(res, this.stockTransferredHK, '获得历史')})
  }
}

</script>

<style scoped lang="scss">
/* @import './main' */
.into-stock  {
  width: 100%;
}
</style>
