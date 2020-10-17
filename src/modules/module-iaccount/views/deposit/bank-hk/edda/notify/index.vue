<template>
  <div class="notify">
    <div class="notify-status">
      <jf-icon name="success"></jf-icon>
      <p class="status-title">{{ $t('iAccount.deposit.edda.iAccount.notify.text_1') }}</p>
      <p class="status-txt" v-if="query">{{ $t('iAccount.deposit.edda.iAccount.notify.text_3') }}</p>
      <p class="status-txt" v-else>{{ $t('iAccount.deposit.edda.iAccount.notify.text_2') }}</p>
    </div>
    <div class="notify-btn" v-if="query">
        <cube-button @click="handleNext">{{$t('iAccount.deposit.edda.iAccount.notify.text_4')}}</cube-button>
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
        this.closeBack()
      }
    }
  },
  mixins: [commonMixin],
  data() {
    return {
    }
  },
  computed: {
    query () {
      const { type = '' } = this.$route.query
      return type
    }
  },
  methods: {
    handleNext() {
      this.$router.push({ name: 'sec-funds-history' })
    }
  }
}
</script>

<style scoped>
/* @import './main' */
</style>
