<template>
  <div class="bank-list">
    <part-list
      class="list-wrap"
      :title="$t('deposit.bank_list.title')"
      :isLink="true"
      :list="optionsBank"
      :alias="{title: 'name', img: 'appBanklogo'}"
      @clickItem="_clickBank">
    </part-list>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import {
  LIMIT_BANK, FPS,
  EBANK, CHECK
} from '@/modules/module-iaccount/define'
import * as tips from '@/main/utils/common/tips'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import { format_DepositFPS } from '@/modules/module-iaccount/format/deposit'
import { formatToDBC } from '@/modules/module-iaccount/utils/format'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

export default {
  mixins: [commonMixin],
  data() {
    return {
      optionsBank: [],
      myBank: [],
      fpsTip: {}
    }
  },
  created() {
    this._fetchBankUser()
    this._fetchBankList()
  },
  computed: {
    ...mapGetters([
      'accInfo',
      'depositCurrency',
      'depositBankType'
    ])
  },
  methods: {
    // 请求用户已绑定银行卡 - 其他地区
    _fetchBankUser() {
      const { fundAccount = [] } = this.accInfo
      SecApi.depositBank({
        bankType: this.$t('define.BANK_OTHER').value,
        fundAccount: fundAccount[0]
      }).then(res => {
        this.myBank = res || []
      })
    },
    // 请求其他地区银行卡列表
    _fetchBankList() {
      SecApi.bankListDeposit({
        bankType: this.$t('define.BANK_OTHER').value
      }).then(res => {
        this.optionsBank = res || []
      })
    },
    _clickBank(item) {
      this._judgeLimitBank(item)
    },
    _judgeLimitBank(item) {
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
          confirmTxt: this.$t('common.text_17'),
          cancelTxt: this.$t('common.text_3'),
          content: this.$t('my_bank.text_13'),
          onConfirm: () => {
            this.$router.push({ name: 'my-bank' })
          }
        })
        return false
      }

      // 处理其是否选中历史入金银行
      this.$store.dispatch('setDepositBankHis', his_bank)
      // 选择入金银行
      this.$store.dispatch('selectBankItem', item)
      // 判断入金方式
      this._judgeDepositWay(item)
    },
    // 处理入金方式 - 仅一种直接进入相应页面
    async _judgeDepositWay(bank) {
      const deposit_way = this.$t('define.DEPOSIT_WAY')
      const ways = await this.judgeDepositWay(bank.supportType, this.depositCurrency)
      const waysOption = Object.values(deposit_way).filter(item => ways.includes(item.code))
      console.log('其他地区 => 入金方式', waysOption)
      if (!waysOption.length) {
        tips.jfDialog({
          content: this.$t('deposit.ways.text_13')
        })
        return false
      }
      if (waysOption.length === 1) {
        // 存在fps，额外接口获取信息
        if (ways.includes(deposit_way[FPS].code)) {
          const params = {
            depositType: deposit_way[FPS].code,
            bankType: this.depositBankType.value,
            key: bank.key
          }
          const res = await SecApi.typeSettingInfo(params)
          this.fpsTip = format_DepositFPS(res)[0]
        }
        this._gotoDetail(bank, waysOption)
      } else {
        this.$router.push({ name: 'ways-other' })
      }
    },
    // 处理不同入金方式收款信息
    _gotoDetail(bank, waysOption) {
      let params
      const wayInfo = waysOption[0]
      switch (wayInfo.value) {
      case FPS:
        params = this.fpsTip
        break
      case EBANK:
        params = bank
        break
      case CHECK:
        params = this.$t('define.CHECK_INFO')
        break
      }
      this.$store.dispatch('setWayInfo', params)
      this.$store.dispatch('selectWay', wayInfo).then(() => {
        const name = (`${wayInfo.value}-other`).toLowerCase()
        this.$router.push({ name: name })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
