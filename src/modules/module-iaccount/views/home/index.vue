<template>
  <div class="sec-home">
    <div v-for="menuItem in menu" :key="menuItem.key">
      <template v-if="menuItem.channel.length">
        <sec-title :content="menuItem.label" />
        <ul class="sec-list-box">
          <template v-for="(channelItem, idx2) in menuItem.channel">
            <li
              v-if="!channelItem.disabled"
              :key="channelItem.key"
              :class="[
                'sec-list-item',
                {
                  'sec-list-item-last-line':
                    (menuItem.channel.length - idx2) / 4 < 1,
                },
              ]"
              @click="intoChannel(channelItem)"
            >
              <i :class="`sec-icon-${channelItem.iconType}`"></i>
              <span>{{ channelItem.label }}</span>
            </li>
          </template>
        </ul>
      </template>
    </div>
  </div>
</template>

<script>
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { mapGetters } from "vuex";

export default {
  name: "home",
  components: {},
  props: {},
  data() {
    return {};
  },
  created() {
    this.setTitle(this.$t("iAccount.main.pageName"));
  },
  watch: {},
  computed: {
    ...mapGetters(["secAccountInfo"]),
    isMarginAccount() {
      const { fundAccount = [] } = this.secAccountInfo;
      return fundAccount.some((item) => item.assetProp == "M");
    },
    menu() {
      return [
        {
          key: "funds",
          label: this.getI18n("iconLabel.funds.label"),
          channel: [
            {
              key: "deposit",
              label: this.getI18n("iconLabel.funds.deposit"),
              iconType: "deposit",
              path: "sec-funds-deposit",
            },
            // { key: "exchange", label: this.getI18n('iconLabel.funds.exchange'), iconType: "exchange" },
            {
              key: "withdraw",
              label: this.getI18n("iconLabel.funds.withdraw"),
              iconType: "withdraw",
              path: "sec-funds-withdraw",
            },
            // {
            //   key: "funds_history1",
            //   label: this.getI18n('iconLabel.funds.funds_history1'),
            //   iconType: "transfer",
            //   path: "/funds_history",
            // },
            {
              key: "funds_history2",
              label: this.getI18n("iconLabel.funds.funds_history2"),
              iconType: "fund_history",
              path: "sec-funds-history",
            },
            {
              key: "funds_history",
              label: this.getI18n("iconLabel.funds.funds_history"),
              iconType: "fund_list",
              path: "sec-funds-capital-flow",
              disabled: true
            },
          ],
        },
        {
          key: "stocks",
          label: this.getI18n("iconLabel.stocks.label"),
          channel: [
            {
              key: "enter",
              label: this.getI18n("iconLabel.stocks.enter"),
              iconType: "enter",
              path: "intoStock",
            },
            {
              key: "out",
              label: this.getI18n("iconLabel.stocks.out"),
              iconType: "out",
              path: "outStock",
            },
            {
              key: "history-stocks",
              label: this.getI18n("iconLabel.stocks.history"),
              iconType: "stock_history",
              path: "stock-transfer-history",
            },
            // { key: "ipo", label: this.getI18n('iconLabel.stocks.ipo'), iconType: "ipo" },
            // { key: "ipo_history", label: this.getI18n('iconLabel.stocks.ipo_history'), iconType: "ipo_history" },
          ],
        },
        {
          key: "company",
          label: this.getI18n("iconLabel.company.label"),
          channel: [
            {
              key: "xgxx",
              label: this.getI18n("iconLabel.company.xgxx"),
              iconType: "xgxx",
              path: "company-act",
            },
            // { key: "sqgg", label: this.getI18n('iconLabel.company.sqgg'), iconType: "sqgg" },
          ],
        },
        {
          key: "fee",
          label: this.getI18n("iconLabel.fee.label"),
          channel: [
            {
              key: "quotas",
              label: this.getI18n("iconLabel.fee.quotas"),
              iconType: "quotas",
            },
            {
              key: "statement",
              label: this.getI18n("iconLabel.fee.statement"),
              iconType: "statement",
              path: "feeStatement",
            },
            // {
            //   key: "account",
            //   label: this.getI18n('iconLabel.fee.account'),
            //   iconType: "account",
            // },
            {
              key: "dayly",
              label: this.getI18n("iconLabel.fee.dayly"),
              iconType: "dayly",
              path: "statement",
            },
            // {
            //   key: "other_fee",
            //   label: this.getI18n('iconLabel.fee.other_fee'),
            //   iconType: "other_fee",
            // },
          ],
        },
        {
          key: "accounts",
          label: this.getI18n("iconLabel.accounts.label"),
          channel: [
            {
              key: "account",
              label: this.getI18n("iconLabel.accounts.account"),
              iconType: "account",
              path: "",
              disabled: true
            },
            // {
            //   key: "pro",
            //   label: this.getI18n('iconLabel.accounts.pro'),
            //   iconType: "pro",
            //   path: "",
            // },
            {
              key: "password",
              label: this.getI18n("iconLabel.accounts.password"),
              iconType: "password",
              disabled: true
            },
            {
              key: "margin",
              label: this.getI18n("iconLabel.accounts.margin"),
              iconType: "margin",
              path: "opmaGuide",
              disabled: this.isMarginAccount,
            },
            {
              key: "add-limit",
              label: this.getI18n("iconLabel.accounts.add_limit"),
              iconType: "add_limit",
              path: "add-limit",
              disabled: !this.isMarginAccount,
            },
          ],
        },
      ];
    },
  },
  mounted() {
    // document.title = "證券業務";
    // this.BroadCast.send(this.BROADCAST_ENUMS.UPDATE_TITLE, {
    //   title: "證券業務",
    // });
  },

  methods: {
    getI18n(key) {
      return this.$t(`iAccount.home.${key}`);
    },
    // 點擊菜單
    intoChannel(item) {
      const { path } = item;
      if (path) {
        this.$router.push({ name: path });
      } else {
        alert({
          title: this.$t("common.alertTitle"),
          content: this.$t("iAccount.common.alertWaiting"),
        });
      }
    },
  },
};
</script>
