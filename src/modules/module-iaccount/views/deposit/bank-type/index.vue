<template>
  <div class="bank-type">
    <part-list
      :title="$t('deposit.bank_type.title')"
      :isLink="true"
      :list="$t('define.BANK_TYPE')"
      @clickItem="_clickBankType">
      <template v-slot:img="slotProps">
        <jf-icon class="type-img" :name="slotProps.item.code"></jf-icon>
      </template>
    </part-list>

    <div class="btn-link">
      <span @click="gotoGuide(link)" class="txt">{{ $t('deposit.bank_type.text_4') }}</span>
    </div>
  </div>
</template>

<script>
import { HELP_URL } from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'

export default {
  mixins: [commonMixin],
  data() {
    return {
      link: HELP_URL.REQUEST_HK_CARD_LINK
    }
  },
  computed: {
  },
  methods: {
    _clickBankType(item) {
      this.$store.dispatch('selectBankType', item).then(() => {
        // 区分选择银行卡类型-进入不同路由
        this.$router.push({ name: `bank-${item.code}` })
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
