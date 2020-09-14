<template>
  <op-wrap
    :isDisabled="isDisabled"
    :btnText="$t('iAccount.confirmBtn')"
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
            <span class="content-info">{{stockInfo.secName}}</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('transferOut.accountNumber')}}</span>
            <span class="content-info">{{stockInfo.accountNumber}}</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('transferOut.accountName')}}</span>
            <span class="content-info">{{stockInfo.accountName}}</span>
          </div>
        </div>
      </div>
      <div class="block">
        <h3 class="title">{{getI18n('receive.title')}}</h3>
        <div class="content-wrap">
          <div class="line">
            <span class="content-title">{{getI18n('receive.companyName')}}</span>
            <span class="content-info">{{stockInfo.receiveSec}}</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('receive.accountNumber')}}</span>
            <span class="content-info">{{stockInfo.receiveAccount}}</span>
          </div>
        </div>
      </div>
      <div class="block">
        <h3 class="title">{{getI18n('stockInfo.title')}}</h3>
        <div class="content-wrap"
          v-for="(item, index) in stockList" 
          :key="index"
        >
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.stockCode')}}</span>
            <span class="content-info">{{item.sharesCode}}</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.stockName')}}</span>
            <span class="content-info">{{item.sharesName}}</span>
          </div>
          <div class="line">
            <span class="content-title">{{getI18n('stockInfo.quantity')}}</span>
            <span class="content-info">{{item.sharesNum}}</span>
          </div>
        </div>
      </div>
    </div>
  </op-wrap>

</template>

<script>
import { mapGetters } from 'vuex';

export default {
  data() {
    return {
      stockInfo: {},
      stockList: [],
      isDisabled: false,
      metaInfo: {
        step: -1,
        state: 3,
      }
    }
  },
  created() {
      this.updateInfo().then((res) => {
        console.log(res)
        this.initInfo(res);
      });
  },
  props: {
    isRefresh: {
      type: Boolean,
      default: true,
    },
    updateInfo: {
      type: Function,
    },
    sendTransferredCache: {
      type: Function,
    },
  },
  computed: {
    ...mapGetters([
      // 'isShares',
      'stockTransferredUS',
      'stockTransferredHK',
      'secAccountInfo',
      'isHistoryShares',
      'sharesList',
      // 'searchStockList',
    ]),
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.intoStock.infoConfirm.${key}`)
    },
    //拿到所有填过的数据
    initInfo(res) {
      this.stockInfo = res.stock;
      this.stockList = res.sharesList;
      // if (Number(this.isShares) === 1) {
      //   this.stockInfo = res.stockTransferredHK.stock
      //   this.stockList = res.sharesList;
      // } else if ( this.isShares === 2){
      //   this.stockInfo = res.stockTransferredUS.stock
      //   this.stockList = res.sharesList;
      // }
      
    },
    handleNext() {
      const data = {
        accImgId: '',
        stockId: this.stockList[0].stockId,
        ...this.metaInfo,
      }
      
      this.updateInfo(data);
    },
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>