<template>
  <div class="bank-list">
    <part-list
      :title="$t('iAccount.deposit.bank_list.title')"
      :isLink="true"
      :list="optionsBank"
      :alias="{title: 'name', img: 'appBanklogo'}"
      @clickItem="_clickBank">
    </part-list>

    <foot-tip :list="bankCnTips"></foot-tip>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { LIMIT_BANK } from '@/modules/module-iaccount/define'
import * as tips from '@/main/utils/common/tips'
import { formatToDBC } from '@/modules/module-iaccount/utils/format'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const BANK_CN_TIPS = [
  {
    txt: 'iAccount.deposit.bank_list.text_1'
  }
]

export default {
  data() {
    return {
      optionsBank: [],
      bankCnTips: BANK_CN_TIPS
    }
  },
  created() {
    this._fetchBankUser()
    this._fetchBankList()
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositBankType'
    ])
  },
  methods: {
    // 请求用户已绑定银行卡 - 大陆卡
    _fetchBankUser() {
      const { fundAccount = [] } = this.secAccountInfo
      SecApi.depositBank({
        bankType: this.$t('iAccount.define.BANK_CN').value,
        fundAccount: fundAccount[0]
      }).then(res => {
        this.myBank = res || []
      })
    },
    // 请求大陆银行卡列表
    _fetchBankList() {
      SecApi.bankListDeposit({
        bankType: this.$t('iAccount.define.BANK_CN').value
      }).then(res => {
        this.optionsBank = res || []
      })
    },
    // 点击入金
    _clickBank(item) {
      this.judgeLimitBank(item)
    },
    judgeLimitBank(item) {
      console.log(item, this.myBank)
      // 是否是历史入金银行 - 并找出该银行
      const his_bank = this.myBank.find(bank => {
        const isSomeName = formatToDBC(bank.bankName) === formatToDBC(item.name)
        const isSomeCode = bank.bankCode === item.key
        const isSomeType = bank.bankType === this.depositBankType.value
        return (isSomeName || isSomeCode) && isSomeType
      })
      console.log('his_bank', his_bank)
      // 是否超过入金银行数量限制
      const isLimit = !his_bank && this.myBank.length >= LIMIT_BANK
      console.log('isLimit', isLimit)
      // 超过限制 - 前往解绑
      if (isLimit) {
        tips.confirm({
          confirmTxt: this.$t('iAccount.common.text_17'),
          cancelTxt: this.$t('iAccount.common.text_3'),
          content: this.$t('iAccount.my_bank.text_13'),
          onConfirm: () => {
            this.$router.push({ name: 'my-bank' })
          }
        })
        return false
      }

      // 处理其是否选中历史入金银行
      this.$store.dispatch('setDepositBankHis', his_bank)
      // 处理该入金信息
      this.$store.dispatch('setWayInfo', item)
      // 处理入金方式 - 默认网银
      const deposit_way = this.$t('iAccount.define.DEPOSIT_WAY')
      const ways = (item.supportType || '').split(',')
      const waysOption = Object.values(deposit_way).filter(way => ways.includes(way.code))
      console.log('大陆卡 - 入金方式', waysOption)
      if (!waysOption.length) {
        tips.jfDialog({
          content: this.$t('iAccount.deposit.ways.text_13')
        })
        return false
      }
      const wayInfo = waysOption[0]
      this.$store.dispatch('selectWay', wayInfo)
      // 选择入金银行
      this.$store.dispatch('selectBankItem', item).then(() => {
        this.$router.push({ name: 'e-banking-cn' })
      })
    }
  }
}
</script>
