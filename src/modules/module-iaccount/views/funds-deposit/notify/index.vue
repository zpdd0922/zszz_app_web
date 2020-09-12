<template>
  <div class="sec-notify">
    <div class="notify-status">
      <jf-icon name="success"></jf-icon>
      <p class="status-title">{{ $t('iAccount.iAccount.notify.text_1') }}</p>
      <p class="status-txt">{{ $t('iAccount.iAccount.notify.text_2') }}</p>
    </div>
    <div class="notify-action">
      <div class="action-item">
        <cube-button :outline="true" @click="_clickGoHis">{{ $t('iAccount.history.common.text_1') }}</cube-button>
      </div>
      <div class="action-item">
        <cube-button @click="_clickGoAgain">{{ $t('iAccount.deposit.currency_type.text_3') }}</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DEV } from '@/modules/module-iaccount/api/config'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const ROUTE_NAME = {
  funds: 'sec-funds-history',
  deposit: 'sec-deposit-currency',
  home: 'sec-home'
}
export default {
  // 返回 - 前往证券首页
  beforeRouteLeave (to, from, next) {
    const names = Object.values(ROUTE_NAME)
    if (names.indexOf(to.name) !== -1) {
      next()
    } else {
      if (DEV) {
        next({ name: ROUTE_NAME.home })
      } else {
        this.closeBack(window.MAIN_URL + window.HASH_SECRRITY_SERVICE)
      }
    }
  },
  mixins: [commonMixin],
  data() {
    return {
    }
  },
  computed: {
  },
  methods: {
    _clickGoHis() {
      this.$router.push({ name: ROUTE_NAME.funds })
    },
    _clickGoAgain() {
      this.$router.push({ name: ROUTE_NAME.deposit })
    }
  }
}
</script>
