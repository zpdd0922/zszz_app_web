<template>
  <op-wrap
    :isDisabled="isDisabled"
    :btnText="$t('iAccount.confirmBtn')"
    :handleBefore="handleBefore"
    @handleNext="handleNext"
    class="info-confirm"
  >
    <header class="info-confirm-title">{{getI18n('confirmTitle')}}</header>
    <div>
      <div class="block">
        <h3 class="title">{{getI18n('transferOut.title')}}</h3>
        <div class="content-wrap">
          <div class="line">
            <span class="content-title">{{getI18n('transferOut.companyName')}}</span>
            <span class="content-info">123</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('transferOut.accountNumber')}}</span>
            <span class="content-info">123</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('transferOut.accountName')}}</span>
            <span class="content-info">123</span>
          </div>
        </div>
      </div>
      <div class="block">
        <h3 class="title">{{getI18n('reciever.title')}}</h3>
        <div class="content-wrap">
          <div class="line">
            <span class="content-title">{{getI18n('reciever.companyName')}}</span>
            <span class="content-info">123</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('reciever.accountNumber')}}</span>
            <span class="content-info">123</span>
          </div>
        </div>
      </div>
      <div class="block">
        <h3 class="title">{{getI18n('stockInfo.title')}}</h3>
        <div class="content-wrap">
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.stockCode')}}</span>
            <span class="content-info">123</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.stockName')}}</span>
            <span class="content-info">123</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.quantity')}}</span>
            <span class="content-info">123</span>
          </div>
        </div>
      </div>
    </div>
  </op-wrap>

</template>

<script>
export default {
  data() {
    return {
      totalInfo: [],
      isDisabled: false
    }
  },
  created() {
    this.getTotalInfo()
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.intoStock.infoConfirm.${key}`)
    },
    //拿到所有填过的数据
    getTotalInfo() {
      return true
    },
    handleNext() {

    },
    handleBefore() {

    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>