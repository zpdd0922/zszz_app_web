<template>
  <div class="notify">
    <div class="notify-status">
      <jf-icon name="success"></jf-icon>
      <p class="status-title">{{ $t('notify.text_3') }}</p>
      <p class="status-txt">{{ $t('notify.text_4') }}</p>
    </div>
    <div class="notify-action">
      <div class="action-item">
        <cube-button :outline="true" @click="_clickGoHis">{{ $t('history.common.text_2') }}</cube-button>
      </div>
    </div>
  </div>
</template>

<script>
import { DEV } from '@/modules/module-iaccount/api/config'
import commonMixin from '@/modules/module-iaccount/mixins/common'

const ROUTE_NAME = {
  funds: 'history-funds',
  home: 'home'
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
      this.$router.push({ name: ROUTE_NAME.funds, query: { tab: 'withdraw' } })
    }
  }
}
</script>

<style scoped lang="scss">
@import './style';
</style>
