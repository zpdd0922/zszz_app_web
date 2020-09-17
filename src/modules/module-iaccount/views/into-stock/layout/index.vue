<template>
  <div class="into-stock"
>
    <!-- Loading -->
    <template v-if='!isGetTransferHistory || !secAccountInfo'>
      <loading />
    </template>

    <!-- 主体内容 -->
    <template v-else>
      <router-view 
        :sendTransferredStockCache="sendTransferredStockCache"
      />
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import storage from '@/main/utils/cache/localstorage.js'

export default {
  mixins: [commonMixin],
  data () {
    return {
      // 获取历时转入记录需要字段
      commonInfo: {
        name: '转入股票',
        // state: '0',
        // step: '0',
        type: 1,
      },
    }
  },
  computed: {
    ...mapGetters([
      'isGetTransferHistory',
      'secAccountInfo',
      'stockTransferredHK',
      'stockTransferredUS',
    ])
  },
  methods: {
    ...mapActions([
      'getTransferredStock',
      'sendTransferredStockCache'
    ]),
    // // 发送缓存
    sendTransferredCache(data = {state: 0, step: 0}) {
      const fullData = {...this.commonInfo, ...data};
      this.$store.dispatch('sendTransferredStockCache', fullData)
    },
  },
  created() {
    this.$store.dispatch('getSecAccountInfo').then(res => {
    })
    this.getTransferredStock({state: '0',step: '0'})
  }
}

</script>

<style scoped lang="scss">
/* @import './main' */
.into-stock  {
  width: 100%;
}
</style>
