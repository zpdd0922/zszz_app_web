<template>
  <jf-wrap
    class="apply-account"
    :isDisabled="isDisabled"
    :btnText="btnText"
    @handleNext="_clickBtn">
    <div class="content">
      <div class="content-inner">
        <h5 class="inner-title account-info" v-html="$t('deposit.common.text_4', { config: getAccountHmtl(accInfo) })"></h5>
        <div class="inner-detail">
          <h6 class="detail-title">{{ $t('deposit.eBanking.text_1') }}</h6>

          <p class="account-tips">{{ $t('deposit.eBanking.text_12') }}</p>
        </div>
      </div>
    </div>

  </jf-wrap>
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
      btnText: i18n.t('deposit.eBanking.text_13'),
      isDisabled: false
    }
  },
  created() {
  },
  computed: {
    ...mapGetters([
      'accInfo',
      'depositSubAccount'
    ])
  },
  methods: {
    _clickBtn() {
      if (this.isDisabled) return
      this.isDisabled = true
      this.btnText = i18n.t('deposit.eBanking.text_14')

      const { tradeAccount, fundAccount = [], clientNameCn, clientNameEn } = this.accInfo
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
        this.btnText = i18n.t('deposit.eBanking.text_15')
        break
      default:
        this.isDisabled = false
        this.btnText = i18n.t('deposit.eBanking.text_16')
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
  &>>>.inner-detail {
    &:before {
      content: none;
    }
  }

  .account-tips {
    color: $color-666;
    background: $color-theme;
    font-size: 26px;
    line-height: 48px;
    padding: 30px 30px 44px;
  }
}
</style>
