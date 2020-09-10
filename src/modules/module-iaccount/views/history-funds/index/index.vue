<template>
  <tab-panel
    v-model="selectInd"
    :lists="lists">
    <template v-slot:card="slotProps">
      <component :itemData="slotProps.item" :is="comp[slotProps.item.key]"></component>
    </template>
  </tab-panel>
</template>

<script>
import { FUNDS_TYPE } from '@/modules/module-iaccount/define'
import ListDeposit from './listDeposit'
import ListWithdraw from './listWithdraw'

const FUNDS_COMP = {
  deposit: ListDeposit,
  withdraw: ListWithdraw
}

const DEFAULT_TABS = Object.values(FUNDS_TYPE.options)

export default {
  // 记录上一次选中tab栏
  beforeRouteEnter (to, from, next) {
    const tab = from.query.tab || to.query.tab
    next(vm => {
      if (tab) {
        const val = vm.lists.findIndex(item => item.key === tab)
        vm.selectInd = val || 0
      }
    })
  },
  data () {
    return {
      selectInd: 0,
      lists: DEFAULT_TABS,
      comp: FUNDS_COMP
    }
  },
  created() {},
  computed: {},
  methods: {
  },
  components: {
    ListDeposit,
    ListWithdraw
  }
}

</script>

<style lang='scss'>
@import './style';
</style>
