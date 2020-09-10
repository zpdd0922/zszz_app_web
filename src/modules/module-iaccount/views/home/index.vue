<template>
  <div class="sec-home">
    <div v-for="(menuItem) in menu" :key="menuItem.key">
      <template v-if="menuItem.channel.length">
        <!-- <sec-title :content="menuItem.label" /> -->
        <ul class="sec-list-box">
          <li
            v-for="(channelItem, idx2) in menuItem.channel"
            :key="channelItem.key"
            :class="['sec-list-item', {'sec-list-item-last-line': (menuItem.channel.length - idx2) / 4 < 1}]"
            @click="intoChannel(channelItem)"
          >
            <i :class="`sec-icon-${channelItem.iconType}`"></i>
            <span>{{channelItem.label}}</span>
          </li>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { toast, alert, confirm } from "@/main/utils/common/tips";

export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {},
  watch: {},
  computed: {
    menu() {
      return [
        {
          key: "funds",
          label: "資金",
          channel: [
            {
              key: "deposit",
              label: "存入資金",
              iconType: "deposit",
              path: "/deposit",
            },
            // { key: "exchange", label: "貨幣兌換", iconType: "exchange" },
            {
              key: "withdraw",
              label: "取出資金",
              iconType: "withdraw",
              path: "/withdraw",
            },
            // {
            //   key: "funds_history1",
            //   label: "資金調撥",
            //   iconType: "transfer",
            //   path: "/funds_history",
            // },
            {
              key: "funds_history2",
              label: "資金記錄",
              iconType: "fund_history",
              path: "/history-funds",
            },
            {
              key: "funds_history",
              label: "資金流水",
              iconType: "fund_list",
              path: "/capital-flow",
            },
          ],
        },
        {
          key: "stocks",
          label: "股票",
          channel: [
            { key: "enter", label: "轉入股票", iconType: "enter", path: "" },
            { key: "out", label: "轉出股票", iconType: "out" },
            {
              key: "history-stocks",
              label: "股票歷史",
              iconType: "stock_history",
            },
            // { key: "ipo", label: "新股認購", iconType: "ipo" },
            // { key: "ipo_history", label: "新股歷史", iconType: "ipo_history" },
          ],
        },
        {
          key: "company",
          label: "公司行動",
          channel: [
            { key: "xgxx", label: "選股選息", iconType: "xgxx" },
            { key: "sqgg", label: "申請供股", iconType: "sqgg" },
          ],
        },
        {
          key: "fee",
          label: "費用",
          channel: [
            {
              key: "quotas",
              label: "行情購買",
              iconType: "quotas",
            },
            {
              key: "statement",
              label: "傭金方案",
              iconType: "statement",
              path: "fee/statement"
            },
            {
              key: "account",
              label: "計算傭金",
              iconType: "account",
            },
            {
              key: "dayly",
              label: "日月結單",
              iconType: "dayly",
            },
            // {
            //   key: "other_fee",
            //   label: "其他費用",
            //   iconType: "other_fee",
            // },
          ],
        },
        {
          key: "accounts",
          label: "賬戶",
          channel: [
            {
              key: "account",
              label: "證券賬戶資料",
              iconType: "account",
              path: "",
            },
            // {
            //   key: "pro",
            //   label: "專業投資者",
            //   iconType: "pro",
            //   path: "",
            // },
            { key: "password", label: "修改交易密碼", iconType: "password" },
          ],
        },
      ];
    },
  },
  mounted() {
    document.title = "證券業務";
    this.BroadCast.send(this.BROADCAST_ENUMS.UPDATE_TITLE, {
      title: "證券業務",
    });
  },

  methods: {
    // 點擊菜單
    intoChannel(item) {
      const { path } = item;
      if (path) {
        this.$router.push(path);
      } else {
        alert({
          title: this.$t("common.alertTitle"),
          content: "功能待开放",
        });
      }
    },
  },
};
</script>
