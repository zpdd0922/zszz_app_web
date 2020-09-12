<template>
  <sec-wrap
    class="apply-account"
    :isDisabled="isDisabled"
    :btnText="btnText"
    @handleNext="_clickBtn">
    <div class="content">
      <div class="content-inner">
        <h5 class="way-title account-info" v-html="$t('iAccount.deposit.common.text_4', { config: getAccountHmtl(secAccountInfo) })"></h5>
        <div class="way-detail">
          <h6 class="way-detail-title">{{ $t('iAccount.deposit.eBanking.text_1') }}</h6>

          <p class="account-tips">{{ $t('iAccount.deposit.eBanking.text_12') }}</p>
        </div>
      </div>
    </div>

  </sec-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/modules/module-iaccount/locale'
import { STATUS_ACCOUNT } from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'

export default {
  mixins: [commonMixin],
  data() {
    return {
      btnText: i18n.t('iAccount.deposit.eBanking.text_13'),
      isDisabled: false
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositSubAccount'
    ])
  },
  methods: {
    _clickBtn() {
      if (this.isDisabled) return
      this.isDisabled = true
      this.btnText = i18n.t('iAccount.deposit.eBanking.text_14')
      const { tradeAccount, fundAccount = [], clientNameCn, clientNameEn } = this.secAccountInfo
      const params = {
        clientId: tradeAccount,
        clientNameCn,
        clientNameEn,
        fundAccount: fundAccount[0]
      }
      this.$store.dispatch('apiGetCollectionNo', params).finally(() => {
        this._getBtnText()
      })
    },
    _getBtnText() {
      switch (this.depositSubAccount.state) {
      case STATUS_ACCOUNT.IsGet:
        this.btnText = i18n.t('iAccount.deposit.eBanking.text_15')
        break
      default:
        this.isDisabled = false
        this.btnText = i18n.t('iAccount.deposit.eBanking.text_16')
        break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.apply-account {
  & /deep/ .way-detail {
    &:before {
      content: none;
    }
  }

  .account-tips {
    color: $color-666;
    background: $color-theme;
    font-size: .13rem;
    line-height: .24rem;
    padding: .15rem .15rem .22rem;
  }
}
</style>
