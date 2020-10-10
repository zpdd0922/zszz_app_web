<template>
  <div class="select-bank">

    <part-list
      :title="$t('iAccount.deposit.bank_type.text_1')"
      :isLink="true"
      :list="options_CMBCHK"
      @clickItem="showDialog_withdraw_cmbchk">
      <template v-slot:img>
        <jf-icon name="cmbc_logo"></jf-icon>
      </template>
    </part-list>

    <part-list
      class="list-wrap"
      v-if="bank_hk.length"
      :isLink="true"
      :alias="alias"
      :list="bank_hk"
      @clickItem="_clickBank_hk">
    </part-list>

    <!-- 大陆银行卡 -->
    <part-list
      v-if="bank_cn.length"
      :title="$t('iAccount.deposit.bank_type.text_3')"
      :isLink="true"
      :alias="alias"
      :list="bank_cn"
      @clickItem="_clickBank_cn">
    </part-list>

    <!-- 其他地区银行卡 -->
    <part-list
      v-if="bank_other.length"
      :title="$t('iAccount.deposit.bank_type.text_5')"
      :isLink="true"
      :alias="alias"
      :list="bank_other"
      @clickItem="_clickBank_other">
    </part-list>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { HELP_URL, CMBC_HK } from '@/modules/module-iaccount/define'
import * as tips from '@/modules/module-iaccount/utils/tips'
import { formatToDBC } from '@/modules/module-iaccount/utils/format'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const DEFAULT_ALIAS = {
  title: 'receiptBankName',
  value: 'receiptBankCode',
  img: 'appBanklogo'
}

export default {
  mixins: [commonMixin],
  data() {
    return {
      bank_cn: [],
      bank_hk: [],
      bank_other: [],
      myBank: [],
      alias: DEFAULT_ALIAS
    }
  },
  created() {
    this._fetchBankUser()
    this._fetchBankList()
  },
  computed: {
    ...mapGetters([
      'secAccountInfo'
    ]),
    options_CMBCHK() {
      return [
        {
          value: CMBC_HK,
          title: this.$t('iAccount.deposit.bank_list.cmbchk')
        }
      ]
    }
  },
  methods: {
    // 请求用户已绑定银行卡 - 所有
    _fetchBankUser() {
      // const { fundAccount = [] } = this.secAccountInfo
      SecApi.depositBank({
        bankType: 0,
        // fundAccount: fundAccount[0]
      }).then(res => {
        this.myBank = res || []
      })
    },
    _fetchBankList() {
      // 大陆卡
      SecApi.bankListWithdraw({
        bankType: 1
      }).then(res => {
        this.bank_cn = res || []
      })

      // 香港卡
      SecApi.bankListWithdraw({
        bankType: 2
      }).then(res => {
        this.bank_hk = res || []
      })

      // 其他地区银行卡
      SecApi.bankListWithdraw({
        bankType: 3
      }).then(res => {
        this.bank_other = res || []
      })
    },
    // 香港卡
    _clickBank_hk(item) {
      this._judgeLimitBank(item)
    },
    // 大陆卡
    _clickBank_cn(item) {
      tips.confirm({
        confirmTxt: this.$t('iAccount.common.text_1'),
        cancelTxt: this.$t('iAccount.common.text_3'),
        onConfirm: () => {
          this._judgeLimitBank(item)
        },
        render: (createElement) => {
          return [
            createElement('div', {
              class: {
                'custom-cube-dialog-title': true
              },
              slot: 'title'
            }, this.$t('iAccount.withdraw.select_bank.text_1')),
            createElement('div', {
              class: {
                'custom-cube-dialog-content': true
              },
              slot: 'content'
            }, [
              createElement('p', null, [
                this.$t('iAccount.withdraw.select_bank.text_2'),
                createElement('span', {
                  class: {
                    'font-link': true
                  },
                  on: {
                    click: (e) => {
                      this.gotoGuide(HELP_URL.REQUEST_HK_CARD_LINK)
                    }
                  }
                }, this.$t('iAccount.withdraw.select_bank.text_3'))
              ])
            ])
          ]
        }
      })
    },
    // 其他地区银行卡
    _clickBank_other(item) {
      this._judgeLimitBank(item)
    },
    _judgeLimitBank(item) {
      console.log(item, this.myBank)
      // 是否是已绑定银行 - 并找出该银行
      const his_bank = this.myBank.find(bank => {
        const isSomeName = formatToDBC(bank.bankName) === formatToDBC(item.receiptBankName)
        const isSomeCode = bank.bankCode === item.receiptBankCode
        const isSomeType = bank.bankType === item.bankType
        return (isSomeName || isSomeCode) && isSomeType
      })
      console.log('his_bank', his_bank)
      // 处理其是否选中历史绑定银行
      this.$store.dispatch('setWithdrawBankHis', his_bank)
      // 选择出金银行
      this.$store.dispatch('selectWithdrawBank', item).then(() => {
        this.$router.push({ name: 'request-cn' })
      })
    }
  }
}
</script>

<style scoped lang="scss">
@import './style';
</style>
