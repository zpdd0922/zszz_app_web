<template>
  <jf-wrap
    class="check"
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
        {{ depositBankData.title }} • {{ $t('deposit.ways.text_4') }}
      </template>
    </head-bank>

    <div class="content">
      <div class="content-inner">
        <h5 class="inner-title account-info" v-html="$t('deposit.check.text_1', { config: getAccountHmtl(accInfo) })"></h5>
        <div class="inner-detail">
          <ul class="detail-check">
            <!-- 表单信息 -->
            <li key="check-form">
              <div class="check-label">
                <span>{{ $t('deposit.check.text_2') }}</span>
              </div>
              <div class="check-filed">
                <p
                  v-for="(sub, ind) in checkForm"
                  :key="ind">
                  <copy-board :item="sub">{{ $t(sub.title) }}： {{ sub.value }}</copy-board>
                </p>
              </div>
            </li>

            <li
              v-for="item in checkDetail"
              :key="item.value">
              <div class="check-label">
                <span>{{ $t(item.title) }}</span>
              </div>
              <div class="check-filed">
                <p
                  v-for="(sub, ind) in item.list"
                  :key="ind">
                  {{ $t(sub.txt) }}
                  <span v-if="sub.phone" @click="tellPhone(getPhone_HK_CHECK)">{{ getPhone_HK_CHECK }}</span>
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <guide-link
        :title="$t('deposit.check.text_12')"
        :link="link_how"
        iconName="check"></guide-link>
    </div>

  </jf-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HELP_URL } from '@/modules/module-iaccount/define'
import { format_Form } from '@/modules/module-iaccount/format/common'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const CHECK_FORM = [{
  title: 'deposit.check.text_3',
  custom: {
    value: 'accountName'
  }
}, {
  title: 'deposit.check.text_4',
  custom: {
    value: (data, obj) => {
      const val = data.depositToAccount || {}
      return val[obj.code]
    }
  }
}]

const CHECK_DETAIL = [{
  title: 'deposit.check.text_5',
  list: [{
    txt: 'deposit.check.text_6'
  }]
}, {
  title: 'deposit.check.text_7',
  list: [{
    txt: 'deposit.check.text_8'
  }, {
    txt: 'deposit.check.text_9'
  }, {
    txt: 'deposit.check.text_10',
    phone: true
  }, {
    txt: 'deposit.check.text_11'
  }]
}]

export default {
  mixins: [commonMixin],
  data() {
    return {
      checkDetail: CHECK_DETAIL,
      link_how: HELP_URL.CHECK_DEPOSIT_LINK
    }
  },
  computed: {
    ...mapGetters([
      'accInfo',
      'depositWayInfo',
      'depositCurrency',
      'depositBankData'
    ]),
    checkForm() {
      return format_Form(CHECK_FORM, this.$t('define.CHECK_INFO'), this.depositCurrency)
    }
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: 'remit-other' })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
