<template>
  <div>
    <template v-if="isUpdating">
      <loading />
    </template>
    <template v-else>
      <op-wrap
        :isDisabled="isDisabled"
        :btnText="$t('iAccount.confirmBtn')"
        @handleNext="handleNext"
        class="info-confirm"
      >
        <header class="info-confirm-title">
          {{ getI18n("confirmTitle") }}
        </header>
        <div>
          <div class="block">
            <h3 class="title">{{ getI18n("transferOut.title") }}</h3>
            <div class="content-wrap">
              <div class="line">
                <span class="content-title">{{
                  getI18n("transferOut.companyName")
                }}</span>
                <span class="content-info">{{ stockInfo.secName }}</span>
              </div>
              <div class="line">
                <span class="content-title">{{
                  getI18n("transferOut.accountNumber")
                }}</span>
                <span class="content-info">{{ stockInfo.accountNumber }}</span>
              </div>
              <div class="line">
                <span class="content-title">{{
                  getI18n("transferOut.accountName")
                }}</span>
                <span class="content-info">{{ stockInfo.accountName }}</span>
              </div>
            </div>
          </div>
          <div class="block">
            <h3 class="title">{{ getI18n("receive.title") }}</h3>
            <div class="content-wrap">
              <div class="line">
                <span class="content-title">{{
                  getI18n("receive.companyName")
                }}</span>
                <span class="content-info">{{ stockInfo.receiveSec }}</span>
              </div>
              <div class="line">
                <span class="content-title">{{
                  getI18n("receive.accountNumber")
                }}</span>
                <span class="content-info">{{ stockInfo.receiveAccount }}</span>
              </div>
            </div>
          </div>
          <div class="block">
            <h3 class="title">{{ getI18n("stockInfo.title") }}</h3>
            <div class="content">
              <span class="content-title">{{
                getI18n("stockInfo.stockCode")
              }}</span>
              <span class="content-title">{{
                getI18n("stockInfo.stockName")
              }}</span>
              <span class="content-title">{{
                getI18n("stockInfo.quantity")
              }}</span>
            </div>
            <div
              class="content-wrap"
              v-for="(item, index) in stockList"
              :key="index"
            >
              <span class="content-info">{{ item.sharesCode }}</span>
              <span class="content-info">{{ item.sharesName }}</span>
              <span class="content-info">{{ item.sharesNum }}</span>
            </div>
          </div>
        </div>
      </op-wrap>
    </template>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {
      isUpdating: false,
      stockInfo: {},
      stockList: [],
      isDisabled: false,
      metaInfo: {
        step: 1,
        type: 'in',
      },
    };
  },
  created() {
    this.initInfo();
  },
  computed: {
    ...mapGetters([
      "isShares",
      "stockTransferredUS",
      "stockTransferredHK",
      "secAccountInfo",
      "isHistoryShares",
      "sharesList",
      // 'searchStockList',
    ]),
  },
  methods: {
    ...mapActions["sendTransferredStockCache"],
    getI18n(key) {
      return this.$t(`iAccount.intoStock.infoConfirm.${key}`);
    },
    //拿到所有填过的数据
    initInfo() {
      if (Number(this.isShares) === 1) {
        this.stockInfo = this.stockTransferredHK.in;
      } else if (Number(this.isShares) === 2) {
        this.stockInfo = this.stockTransferredUS.in;
      }
      this.stockList = this.sharesList.in;
    },
    clearCache() {
      this.$store.commit("SET_SHARES_LIST", { sharesList: [], stock: {type: 'in'}});
      this.$store.commit("SET_STOCK_TRANSFERRED_HK", {
        stockTransferredHK: {},
        type: 'in',
      });
      this.$store.commit("SET_STOCK_TRANSFERRED_US", {
        stockTransferredUS: {},
        type: 'in',
      });
      // this.$store.commit("SET_ISHISTORYSHARES", { stock: {
      //   isShares: ''
      // } });
    },
    createToast(txt) {
      const toast = this.$createToast({
        type: "txt",
        time: 1000,
        txt: this.getI18n(txt),
      });
      toast.show();
    },
    handleNext() {
      this.isDisabled = true;
      let data = null;
      if (Number(this.isShares) === 1) {
        data = {
          id: this.stockTransferredHK.in.id,
          ...this.metaInfo,
        };
      } else if (Number(this.isShares) === 2) {
        data = {
          id: this.stockTransferredUS.in.id,
          ...this.metaInfo,
        };
      }
      this.$store.dispatch("sendTransferredStockCache", data).then(
        (res) => {
          if (!res.stock && res.sharesList.length === 0) {
            this.createToast("fail");
            this.isDisabled = false;
            return;
          }
          this.createToast("success");
          this.clearCache();
          setTimeout(() => {
            this.$router.replace("/");
          }, 1000);
        },
        (err) => {
          const toast = this.$createToast({
            type: "txt",
            time: 1000,
            txt: err,
          });
          toast.show();
        }
      );
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
