<template>
  <sec-wrap
    :nextBtnShow="false">
    <head-bank
      :styleObj="{
        background: depositBankData.bgColor,
        boxShadow: `0px .07rem .16rem 0px ${depositBankData.shadowColor}`
      }"
      :bank="depositBankData"
      :desc="depositWayInfo">
    </head-bank>

    <component :is="currentComp"></component>
  </sec-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import InfoContent from './info-content'
import InfoContentSub from './info-content-sub'
import { STATUS_ACCOUNT } from '@/modules/module-iaccount/define'

export default {
  data() {
    return {
      currentComp: ''
    }
  },
  created() {
    // 先判断是否已申请子账号
    this.$store.dispatch('apiFindAccountInfo')
    // 处理渲染视图组件
    this._renderView()
  },
  computed: {
    ...mapGetters([
      'depositSubAccount',
      'depositWayInfo',
      'depositBankData'
    ])
  },
  methods: {
    _renderView() {
      const { bankInfo: { accountType } } = this.depositBankData
      const { state = STATUS_ACCOUNT.IsUnKnow } = this.depositSubAccount
      // 子账号
      if (accountType === 2) {
        if (state === STATUS_ACCOUNT.IsGet) {
          this.currentComp = InfoContent
        } else {
          this.currentComp = InfoContentSub
        }
      } else {
      // 大账户
        this.currentComp = InfoContent
      }
    }
  },
  watch: {
    // 监听子账户信息再次渲染
    depositSubAccount: function(newVal) {
      this._renderView()
    }
  },
  components: {
    InfoContent,
    InfoContentSub
  }
}
</script>