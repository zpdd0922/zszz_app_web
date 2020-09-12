<template>
  <sec-wrap
    class="sec-way sec-way-check"
    :btnText="$t('iAccount.deposit.common.text_3')"
    @handleNext="_clickBtn"
  >
    <header class="sec-page-title">
      <base-cell>
        <base-cell-header></base-cell-header>
        <base-cell-body>{{$t('iAccount.deposit.ways.text_4')}}</base-cell-body>
        <base-cell-footer>
          <a class="guide-link" :href="link_how">{{$t('iAccount.deposit.check.text_12')}}</a>
        </base-cell-footer>
      </base-cell>
    </header>

    <div class="step-content step-content-way">
      <h5
        class="way-title"
        v-html="$t('iAccount.deposit.check.text_1', { config: getAccountHmtl(secAccountInfo) })"
      ></h5>
      <div class="way-detail">
        <!-- <p class="top-tips" v-if="Object.values(depositWayInfo).length">
        <span class="desc" key="descTime">
          <span>{{ $t('iAccount.deposit.common.text_8') }} {{ depositWayInfo.descTime }}</span>
          <jf-icon
            v-if="depositWayInfo.descTimeTips"
            name="tips_white"
            @click="_clickIconTips(depositWayInfo.descTimeTips)"
          ></jf-icon>
        </span>
        <span class="desc" key="descFee">
          <span>{{ $t('iAccount.deposit.common.text_7') }} {{ depositWayInfo.descFee }}</span>
          <jf-icon
            v-if="depositWayInfo.descFeeTips"
            name="tips_white"
            @click="_clickIconTips(depositWayInfo.descFeeTips)"
          ></jf-icon>
        </span>
        </p>-->
        <ul class="detail-check">
          <!-- 表单信息 -->
          <li key="check-form">
            <div class="check-label">
              <span>{{ $t('iAccount.deposit.check.text_2') }}</span>
            </div>
            <div class="check-filed">
              <p v-for="(sub, ind) in checkForm" :key="ind">
                <base-copy-board :item="sub">{{ $t(sub.title) }}： {{ sub.value }}</base-copy-board>
              </p>
            </div>
          </li>
          <li v-for="item in checkDetail" :key="item.value">
            <div class="check-label">
              <span>{{ $t(item.title) }}</span>
            </div>
            <div class="check-filed">
              <p v-for="(sub, ind) in item.list" :key="ind">
                {{ $t(sub.txt) }}
                <span
                  v-if="sub.phone"
                  @click="tellPhone(getPhone_HK_CHECK)"
                >{{ getPhone_HK_CHECK }}</span>
              </p>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </sec-wrap>
</template>

<script>
import { mapGetters } from "vuex";
import { HELP_URL } from "@/modules/module-iaccount/define";
import { format_Form } from "@/modules/module-iaccount/format/common";
import commonMixin from "@/modules/module-iaccount/mixins/common";

const CHECK_FORM = [
  {
    title: "iAccount.deposit.check.text_3",
    custom: {
      value: "accountName",
    },
  },
  {
    title: "iAccount.deposit.check.text_4",
    custom: {
      value: (data, obj) => {
        const val = data.depositToAccount || {};
        return val[obj.code];
      },
    },
  },
];

const CHECK_DETAIL = [
  {
    title: "iAccount.deposit.check.text_5",
    list: [
      {
        txt: "iAccount.deposit.check.text_6",
      },
    ],
  },
  {
    title: "iAccount.deposit.check.text_7",
    list: [
      {
        txt: "iAccount.deposit.check.text_8",
      },
      {
        txt: "iAccount.deposit.check.text_9",
      },
      {
        txt: "iAccount.deposit.check.text_10",
        phone: true,
      },
      {
        txt: "iAccount.deposit.check.text_11",
      },
    ],
  },
];

export default {
  mixins: [commonMixin],
  data() {
    return {
      checkDetail: CHECK_DETAIL,
      link_how: HELP_URL.CHECK_DEPOSIT_LINK,
    };
  },
  computed: {
    ...mapGetters([
      "secAccountInfo",
      "depositWayInfo",
      "depositCurrency",
      "depositBankData",
    ]),
    checkForm() {
      return format_Form(
        CHECK_FORM,
        this.$t("iAccount.define.CHECK_INFO"),
        this.depositCurrency
      );
    },
  },
  methods: {
    _clickBtn() {
      this.$router.push({ name: "sec-remit-hk" });
    },
  },
};
</script>