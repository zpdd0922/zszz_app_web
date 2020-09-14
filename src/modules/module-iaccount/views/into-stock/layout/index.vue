<template>
  <div class="into-stock"
>
    <!-- Loading -->
    <template v-if='!secAccountInfo'>
    <!-- <template v-if='false'> -->
      <loading />
    </template>

    <!-- 主体内容 -->
    <template v-else>
      <router-view 
        :updateInfo="updateInfo"
        :sendTransferredCache="sendTransferredCache"
      />
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
      commonInfo: {
        name: '转入股票',
        // state: '0',
        // step: '0',
        type: 1,
      }
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'stockTransferredHK',
      'stockTransferredUS',
    ])
  },
  methods: {
    //获取历史
    updateInfo(data = {state: '0',step: '0'}) {
      const fullData = {...this.commonInfo, ...data};
      return this.$store.dispatch('getTransferredStock', fullData)
    },
    // 发送缓存
    sendTransferredCache(data = {state: 0, step: 0}) {
      const fullData = {...this.commonInfo, ...data};
      console.log(fullData);
      return this.$store.dispatch('sendTransferredStockCache', fullData)
    }
  },
  created() {
    //TODO:
    // this.$store.dispatch('getSecAccountInfo').then(res => {
    //   this.getAccountStatus(res)
    // })
    this.$store.dispatch('getSecAccountInfo').then(res => {
      storage.set('secAccountInfo', res)
    })
    //获得历史转移记录，存入vuex;
    // this.updateInfo();
  }
}

</script>

<style scoped lang="scss">
/* @import './main' */
.into-stock  {
  width: 100%;
}
</style>
