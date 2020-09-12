<template>
  <div class="cmbc">
    <head-bank
      :styleObj="styleObj"
      :bank="data_bank.head"
      :desc="data_bank.head">
      <template v-slot:img>
        <jf-icon name="cmbc_yz"></jf-icon>
      </template>
      <template v-slot:title>
        <span>{{ $t(data_bank.head.title) }}</span>
        <jf-icon v-if="data_bank.head.symbol" name="symbol">{{ $t(data_bank.head.symbol) }}</jf-icon>
      </template>
    </head-bank>

    <div class="account">
      <p class="text">{{$t('iAccount.deposit.cmbchk.text_13')}}</p>
      <p class="acc-num">{{accountNum}}</p>
    </div>

    <div class="content">
      <div class="content-inner">
        <div class="inner-detail">
          <div class="qa">
            <ul>
              <li
                class="qa-item"
                v-for="(item, index) in data_bank.qa"
                :key="index">
                <h4 class="title">{{ $t(item.title) }}</h4>
                <p class="txt">{{ $t(item.txt) }}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <guide-link
        :title="$t('iAccount.deposit.cmbchk.text_8')"
        :link="link_how"
        iconName="cmbc"></guide-link>
    </div>

    <foot-tip
      :list="data_bank.foot">
      <template v-slot:default="slotProps">
        {{ $t(slotProps.item.txt) }} <span class="font-link" @click="gotoGuide(link_first)">{{ $t(slotProps.item.link) }}</span>
      </template>
    </foot-tip>

  </div>
</template>

<script>
import i18n from '@/modules/module-iaccount/locale'
import { HELP_URL } from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import { mapGetters } from 'vuex'

const CMBC_TXT = {
  head: {
    title: 'iAccount.deposit.bank_list.cmbchk',
    value: 'cmbchk',
    symbol: 'iAccount.deposit.cmbchk.text_1',
    descTime: i18n.t('iAccount.deposit.cmbchk.text_2'),
    descFee: i18n.t('iAccount.deposit.cmbchk.text_3')
  },
  qa: [
    {
      title: 'iAccount.deposit.cmbchk.text_4',
      txt: 'iAccount.deposit.cmbchk.text_5'
    }, {
      title: 'iAccount.deposit.cmbchk.text_6',
      txt: 'iAccount.deposit.cmbchk.text_7'
    }
  ],
  foot: [
    {
      txt: 'iAccount.deposit.cmbchk.text_9'
    }, {
      txt: 'iAccount.deposit.cmbchk.text_10'
    }, {
      txt: 'iAccount.deposit.cmbchk.text_11',
      link: 'iAccount.deposit.cmbchk.text_12'
    }
  ]
}

const CMBC_STYLE = {
  background: 'linear-gradient(-90deg,rgba(49,83,180,1),rgba(91,157,214,1))',
  boxShadow: '0px .07rem .16rem 0px rgba(49,84,180,0.4)'
}

export default {
  mixins: [commonMixin],
  data() {
    return {
      link_first: HELP_URL.CMBC_DEPOSIT_FIRST,
      link_how: HELP_URL.CMBC_DEPOSIT_HOW,
      data_bank: CMBC_TXT,
      styleObj: CMBC_STYLE
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo'
    ]),
    accountNum() {
      const acc = this.secAccountInfo
      return acc.fundAccount.length && acc.fundAccount[0]
    }
  },
  methods: {
  }
}
</script>

<style scoped>
@import './style.scss';
</style>
