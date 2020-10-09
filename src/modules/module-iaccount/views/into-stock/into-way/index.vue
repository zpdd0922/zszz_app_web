<template>
  <section class="sec-page-wrap sec-stock-way">
    <base-cells class="select-ways">
      <base-cell v-for="item in ways" :key="item.type" class="way-item" @click="handleNext(item)">
        <base-cell-header>
          <em :class="`way-icon way-icon-${item.type}`" />
        </base-cell-header>
        <base-cell-body>
          <span class="label">{{item.label}}</span>
          <span v-if="item.tips" class="tips">{{item.tips}}</span>
        </base-cell-body>
        <base-cell-footer>
          <base-icon name="arrow"></base-icon>
        </base-cell-footer>
      </base-cell>
    </base-cells>
  </section>
</template>

<script type="text/ecmascript-6">
import { userMakePhone, getMobileInfo } from "@/main/utils/native-app/";
import { alert } from "@/main/utils/common/tips";
import validate from "@/main/utils/format/validate";
import { mapActions, mapGetters } from "vuex";
import AccountApi from "@/modules/module-iaccount/api/modules/api-account";
import {
  HKD,
  USD,
  DOLLAR_HK_VAL,
  DOLLAR_US_VAL,
} from "@/modules/module-iaccount/define";

export default {
  data() {
    return {
      offlineOptions: window.OFFLINE_CONTACT,
      selectWay: "",
    };
  },
  created() {
    // TODO: 新增ip判斷，進行邏輯處理？
    // this.queryAddressIP();
  },
  computed: {
    // 判断当前路由环境
    origin() {
      return this.UaInfo.isApp() ? "app" : "h5";
    },
    ways() {
      return [
        {
          type: "hk",
          code: 1,
          label: this.$t("iAccount.intoStock.intoWay.wayHK"),
          tips: "Into HK stocks",
          nextRouteName: "transferInfo",
        },
        {
          type: "us",
          code: 2,
          label: this.$t("iAccount.intoStock.intoWay.wayUS"),
          tips: "Into US stocks",
          // nextRouteName: 'transferInfo',
        },
      ];
    },
  },
  methods: {
    ...mapActions(["setMarketStatus"]),
    handleNext(item) {
      AccountApi.getOpenBankType().then(()=>{
        if (!item.nextRouteName) {
          alert({
            title: this.$t("common.alertTitle"),
            content: this.$t("iAccount.common.alertWaiting"),
          });
          return;
        }
        //更改选择状态
        
        this.setMarketStatus({type: 'in', marketCode: item.code}).then(() => {
          // 进入下一流程
          this.$router.push({
            name: item.nextRouteName,
            // params: { intoType: item.code, isRefresh: false },
          });
        });
      })
    },
  },
};
</script>

