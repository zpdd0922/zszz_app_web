<template>
  <div class="transfer-history">
    <div class="transfer-history-select">
      <sticky :z-index="10">
        <div class="select-tab border-bottom-1px">
          <jf-filter
            ref="market"
            v-model="market"
            :menus="marketMenus"
            @click.native="_clickMarket"
            @filter="_clickFilterMarket"
          ></jf-filter>
          <jf-filter
            ref="state"
            v-model="state"
            :menus="statusMenus"
            @click.native="_clickStatus"
            @filter="_clickFilterStatus"
          ></jf-filter>
        </div>
      </sticky>

      <div v-if="listData" class="select-box">
        <template v-if="listData.length">
          <part-list :list="listData">
            <template v-slot:default="slotProps">
              <div class="content-wrap">
                <ul class="company">
                  <li>
                    <span>{{ $t("iAccount.transferHistory.date") }}</span
                    ><span>{{
                      slotProps.item.stock.createdTime | filterDateTime
                    }}</span>
                  </li>
                  <li>
                    <span>{{ $t("iAccount.transferHistory.outCompany") }}</span
                    ><span>{{ slotProps.item.stock.secName }}</span>
                  </li>
                  <li>
                    <span>{{ $t("iAccount.transferHistory.status") }}</span
                    ><span>{{ slotProps.item.stock.state | filterStatusText }}</span>
                  </li>
                </ul>
                <ul
                  class="stock-detail"
                  v-for="(item, index) in slotProps.item.sharesList"
                  :key="index"
                >
                  <li>
                    <span>{{ $t("iAccount.transferHistory.stockName") }}</span
                    ><span>{{ item.sharesName }}</span>
                  </li>
                  <li>
                    <span>{{ $t("iAccount.transferHistory.stockNum") }}</span
                    ><span>{{ item.sharesNum }}</span>
                  </li>
                </ul>
              </div>
            </template>
          </part-list>
        </template>
        <empty-box v-else :tips="$t('iAccount.common.text_13')"></empty-box>
      </div>
    </div>
  </div>
</template>

<script>
import i18n from "@/modules/module-iaccount/locale";
import * as tips from "@/modules/module-iaccount/utils/tips";
import cookie from "@/modules/module-iaccount/utils/cookie";
import { timestampToTime } from "@/modules/module-iaccount/utils/date";
import {
  HIS_DEPOSIT,
  STOCK_MARKET,
  STOCK_STATUS,
} from "@/modules/module-iaccount/define";
import commonMixin from "@/modules/module-iaccount/mixins/common";
import SecuritiesApi from "@/modules/module-iaccount/api/modules/api-securities";

const STOCK_MENUS = Object.values(STOCK_MARKET.options).sort(
  (a, b) => a.sort - b.sort
);
const STATUS_MENUS = Object.values(STOCK_STATUS.options).sort(
  (a, b) => a.sort - b.sort
);

export default {
  mixins: [commonMixin],
  props: {
    itemData: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      listData: null,
      market: STOCK_MENUS[0].value,
      state: STATUS_MENUS[0].value,
      marketMenus: STOCK_MENUS,
      statusMenus: STATUS_MENUS,
      listDataCache: [],
    };
  },
  created() { 
    this._fetchHis();
  },
  computed: {},
  methods: {
    _getStatusColor(val) {
      return { color: STOCK_STATUS.options[val].color || "" };
    },
    _fetchHis() {
      const params = {
        type: 'in'
      };
      this.$store
        .dispatch("getStocksHistory", {type: 'in'})
        .then((res) => {
          if (res && res.length > 0){
            this.listDataCache = res.filter((item) => {
              return item.stock.state === 0 ? false : true
            });
          } else {
            this.listDataCache = [];
          }
          this.listData = [...this.listDataCache];
        })
        .catch(() => {
          this.listData = [];
        });
    },
    _clickMarket() {
      this.$refs.state._hide();
    },
    _clickStatus() {
      this.$refs.market._hide();
    },

    _clickFilterMarket(selectedVal, selectedIndex) {
      this.market = selectedVal.value;
      this._filterAll();
    },
    _clickFilterStatus(selectedVal, selectedIndex) {
      this.state = selectedVal.value;
      this._filterAll();
    },

    _filterAll() {
      if (!this.market && !this.state) {
        this.listData = [...this.listDataCache];
      } else if (!this.market && this.state) {
        this.listData = [...this.listDataCache].filter((item) => {
          return item.stock.state === this.state;
        });
      } else if (this.market && !this.state) {
        this.listData = [...this.listDataCache].filter((item) => {
          return item.stock.isShares === this.market;
        });
      } else {
        this.listData = [...this.listDataCache].filter((item) => {
          return item.stock.state === this.state && item.stock.isShares === this.market;
        });
      }
    },
  },
  filters: {
    filterStatusText(val) {
      return STOCK_STATUS.options[val]
        ? i18n.t(STOCK_STATUS.options[val].text)
        : val;
    },
    filterDateTime(val) {
      return timestampToTime(val, "YYYY/MM/DD");
    },
  },
  components: {},
};
</script>
