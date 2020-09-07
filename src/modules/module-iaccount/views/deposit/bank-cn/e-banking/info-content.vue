<template>
  <jf-wrap
    :btnText="$t('deposit.common.text_3')"
    @handleNext="_clickBtn">
    <div class="content">
      <div class="content-inner">
        <h5 class="inner-title account-info" v-html="$t('deposit.common.text_4', { config: getAccountHmtl(accInfo) })"></h5>
        <div class="inner-detail">
          <h6 class="detail-title">{{ $t('deposit.eBanking.text_1') }}</h6>
          <p class="detail-tips">{{ $t('deposit.common.text_2') }}</p>

          <detail-list :lists="eBankingDetail"></detail-list>
        </div>
      </div>

      <guide-link
        :title="$t('deposit.eBanking.text_11', { config: depositBankData.title })"
        :link="getComputedLink"
        iconName="bank"></guide-link>
    </div>
  </jf-wrap>
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
      txt: 'deposit.common.text_5'
    }
  ]
}

const EBANKING_CN = [
  {
    title: 'deposit.eBanking.text_8',
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
    title: 'deposit.eBanking.text_9',
    custom: {
      value: (data, obj) => {
        const { depositSubAccount } = obj
        return depositSubAccount.accountName || data.accountName || '--'
      }
    }
  }, {
    title: 'deposit.eBanking.text_10',
    custom: {
      value: 'depositUserAddress'
    }
  }, {
    title: 'deposit.eBanking.text_3',
    custom: {
      value: (data) => {
        return data.bankName
      }
    }
  }, {
    title: 'deposit.eBanking.text_17',
    custom: {
      value: 'bankNameEN'
    }
  }, {
    title: 'deposit.eBanking.text_5',
    custom: {
      value: 'swiftCode'
    }
  }, {
    title: 'deposit.eBanking.text_6',
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
      'accInfo',
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
      this.$router.push({ name: 'remit-cn' })
    }
  }
}
</script>
