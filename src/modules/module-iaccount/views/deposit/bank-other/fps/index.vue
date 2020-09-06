<template>
  <jf-wrap
    class="fps"
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
        {{ depositBankData.title }} • {{ $t('deposit.ways.text_2') }}
      </template>
    </head-bank>

    <div class="content">
      <div class="content-inner">
        <h5 class="inner-title account-info" v-html="$t('deposit.common.text_4', { config: getAccountHmtl(accInfo) })"></h5>
        <div class="inner-detail">
          <h6 class="detail-title">{{ $t('deposit.fps.text_1') }}</h6>
          <p class="detail-tips">{{ $t('deposit.common.text_2') }}</p>

          <detail-list :lists="fpsDetail"></detail-list>
        </div>
      </div>

      <guide-link
        :title="$t('deposit.fps.text_5')"
        :link="link"
        iconName="fps"></guide-link>
    </div>

  </jf-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HELP_URL } from '@/modules/module-iaccount/define'
import { format_Form } from '@/modules/module-iaccount/format/common'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const EXAMPLE_BANK = {
  foot: [
    {
      txt: 'deposit.common.text_5'
    }
  ]
}

const FPS_BOCHK = [
  {
    title: 'deposit.fps.text_2',
    custom: {
      value: 'accountFPS'
    }
  }, {
    title: 'deposit.fps.text_3',
    custom: {
      value: 'bankName'
    }
  }, {
    title: 'deposit.fps.text_4',
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
      'accInfo',
      'depositWayInfo',
      'depositBankData'
    ]),
    fpsDetail() {
      return format_Form(FPS_BOCHK, this.depositWayInfo)
    }
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: 'remit-other' })
    }
  }
}
</script>