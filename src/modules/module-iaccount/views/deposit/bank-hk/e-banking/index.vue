<template>
  <jf-wrap
    class="e-banking"
    :btnText="$t('deposit.common.text_3')"
    @handleNext="_clickBtn">
    <head-bank
      :styleObj="{
        background: depositBankData.bgColor,
        boxShadow: `0px .07rem .16rem 0px ${depositBankData.shadowColor}`
      }"
      :bank="depositBankData"
      :desc="depositWayInfo">
      <template v-slot:title>
        {{ depositBankData.title }} • {{ $t('deposit.ways.text_3') }}
      </template>
    </head-bank>

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
        :title="$t('deposit.eBanking.text_7')"
        :link="getComputedLink"
        iconName="bank"></guide-link>
    </div>
  </jf-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HKD } from '@/modules/module-iaccount/define'
import { format_Form } from '@/modules/module-iaccount/format/common'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const EXAMPLE_BANK = {
  foot: [
    {
      txt: 'deposit.common.text_5'
    }
  ]
}

const EBANKING_HK = [
  {
    title: 'deposit.eBanking.text_2',
    custom: {
      value: (data, obj) => {
        const val = data.depositToAccount || {}
        return val[obj.code]
      },
      tips: (data, obj) => {
        const val = data.depositToAccount || {}
        const tempKey = obj.code + 'Remark'
        return val[tempKey]
      }
    }
  }, {
    title: 'deposit.eBanking.text_3',
    custom: {
      value: 'bankName'
    }
  }, {
    title: 'deposit.eBanking.text_17',
    custom: {
      value: 'bankNameEN'
    }
  }, {
    title: 'deposit.eBanking.text_4',
    custom: {
      value: 'accountName',
      tips: 'accountNameRemark'
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
      'depositCurrency',
      'depositWayInfo',
      'depositBankData'
    ]),
    eBankingDetail() {
      const { bankInfo = {} } = this.depositBankData
      return format_Form(EBANKING_HK, bankInfo, this.depositCurrency)
    },
    getComputedLink() {
      const { tipsLinks = {} } = this.depositBankData
      return this.depositCurrency.code === HKD
        ? tipsLinks.appWyHkd : tipsLinks.appWyUsd
    }
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: 'remit-hk' })
    }
  }
}
</script>