<template>
  <sec-wrap
    :btnText="$t('iAccount.deposit.common.text_3')"
    @handleNext="_clickBtn">
    <div class="content">
      <div class="content-inner">
        <h5 class="way-title account-info" v-html="$t('iAccount.deposit.common.text_4', { config: getAccountHmtl(secAccountInfo) })"></h5>
        <div class="way-detail">
          <h6 class="way-detail-title">{{ $t('iAccount.deposit.eBanking.text_1') }}</h6>
          <p class="way-detail-tips">{{ $t('iAccount.deposit.common.text_2') }}</p>

          <detail-list :lists="eBankingDetail"></detail-list>
        </div>
      </div>

      <guide-link
        :title="$t('iAccount.deposit.eBanking.text_11', { config: depositBankData.title })"
        :link="getComputedLink"
        iconName="bank"></guide-link>
    </div>
  </sec-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HKD } from '@/modules/module-iaccount/define'
import { format_Form } from '@/modules/module-iaccount/format/common'
import { formatNumber } from '@/modules/module-iaccount/utils/format'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const EXAMPLE_BANK = {
  foot: [
    {
      txt: 'iAccount.deposit.common.text_5'
    }
  ]
}

const EBANKING_CN = [
  {
    title: 'iAccount.deposit.eBanking.text_8',
    custom: {
      value: (data, obj) => {
        const { depositCurrency, depositSubAccount } = obj
        // 存在子账号
        if (depositSubAccount.subAccountNo) {
          return formatNumber(depositSubAccount.subAccountNo)
        }
        // 大账号
        const val = data.depositToAccount || {}
        return val[depositCurrency.code] || '--'
      }
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_9',
    custom: {
      value: (data, obj) => {
        const { depositSubAccount } = obj
        return depositSubAccount.accountName || data.accountName || '--'
      }
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_10',
    custom: {
      value: 'depositUserAddress'
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_3',
    custom: {
      value: (data) => {
        return data.bankName
      }
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_17',
    custom: {
      value: 'bankNameEN'
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_5',
    custom: {
      value: 'swiftCode'
    }
  }, {
    title: 'iAccount.deposit.eBanking.text_6',
    custom: {
      value: 'depositToBankAddress'
    }
  }
]

export default {
  mixins: [commonMixin],
  data() {
    return {
      eBankingData: EXAMPLE_BANK
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositSubAccount',
      'depositCurrency',
      'depositBankData'
    ]),
    eBankingDetail() {
      const { bankInfo = {} } = this.depositBankData
      const params = {
        depositSubAccount: this.depositSubAccount,
        depositCurrency: this.depositCurrency
      }
      return format_Form(EBANKING_CN, bankInfo, params)
    },
    getComputedLink() {
      const { tipsLinks = {} } = this.depositBankData
      return this.depositCurrency.code === HKD
        ? tipsLinks.appWyHkd : tipsLinks.appWyUsd
    }
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: 'sec-remit-cn' })
    }
  }
}
</script>
