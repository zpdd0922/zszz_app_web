<template>
  <section class="sec-page-wrap sec-into-stock-way">
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
import { alert } from "@/main/utils/common/tips";

export default {
  data() {
    return {
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
          label: this.$t("iAccount.company_act.market.hk"),
          tips: "HK stocks",
          nextRouteName: "act-form",
        },
        {
          type: "us",
          code: 2,
          label: this.$t("iAccount.company_act.market.us"),
          tips: "US stocks",
          // nextRouteName: 'transferInfo',
        },
      ];
    },
  },
  methods: {
    handleNext(item) {
      if (!item.nextRouteName) {
        alert({
          title: this.$t("common.alertTitle"),
          content: "功能待开放",
        });
        return;
      }
      // 进入下一流程
      this.$router.push({
        name: item.nextRouteName,
        query: {
          market: item.type
        }
        // params: { intoType: item.code, isRefresh: false },
      });
    },
  },
};
</script>

