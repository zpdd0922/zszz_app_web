<template>
  <sec-wrap
    class="fps"
    :btnText="$t('iAccount.deposit.common.text_3')"
    @handleNext="_clickBtn">
    <head-bank
      :styleObj="{
        background: depositBankData.bgColor,
        boxShadow: `0px .07rem .16rem 0px ${depositBankData.shadowColor}`
      }"
      :bank="depositBankData"
      :desc="depositWayInfo">
      <template v-slot:title>
        {{ depositBankData.title }} • {{ $t('iAccount.deposit.ways.text_2') }}
      </template>
    </head-bank>

    <div class="content">
      <div class="content-inner">
        <h5 class="inner-title account-info" v-html="$t('iAccount.deposit.common.text_4', { config: getAccountHmtl(secAccountInfo) })"></h5>
        <div class="inner-detail">
          <h6 class="detail-title">{{ $t('iAccount.deposit.fps.text_1') }}</h6>
          <p class="detail-tips">{{ $t('iAccount.deposit.common.text_2') }}</p>

          <detail-list :lists="fpsDetail"></detail-list>
        </div>
      </div>

      <guide-link
        :title="$t('iAccount.deposit.fps.text_5')"
        :link="link"
        iconName="fps"></guide-link>
    </div>

  </sec-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HELP_URL } from '@/modules/module-iaccount/define'
import { format_Form } from '@/modules/module-iaccount/format/common'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const EXAMPLE_BANK = {
  foot: [
    {
      txt: 'iAccount.deposit.common.text_5'
    }
  ]
}

const FPS_BOCHK = [
  {
    title: 'iAccount.deposit.fps.text_2',
    custom: {
      value: 'accountFPS'
    }
  }, {
    title: 'iAccount.deposit.fps.text_3',
    custom: {
      value: 'bankName'
    }
  }, {
    title: 'iAccount.deposit.fps.text_4',
    custom: {
      value: 'accountName',
      tips: 'accountNameRemark'
    }
  }
]

export default {
  mixins: [commonMixin],
  data() {
    return {
      link: HELP_URL.FPS_DEPOSIT_LINK,
      fpsData: EXAMPLE_BANK
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositWayInfo',
      'depositBankData'
    ]),
    fpsDetail() {
      return format_Form(FPS_BOCHK, this.depositWayInfo)
    }
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: 'remit-hk' })
    }
  }
}
</script>
