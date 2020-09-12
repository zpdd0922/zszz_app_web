<template>
  <div class="funds">
    <!-- <funds-summary
      :title="$t('iAccount.history.common.text_3')"
      :lists="summarys"
      @clickTips="_clickDepositTips"></funds-summary> -->

    <div class="funds-select">
      <sticky :z-index="10">
        <div class="select-tab border-bottom-1px">
          <jf-filter
            ref="currency"
            v-model="currency"
            :menus="currencyMenus"
            @click.native="_clickCurrency"
            @filter="_clickFilterCurrrency"></jf-filter>
          <jf-filter
            ref="state"
            v-model="state"
            :menus="statusMenus"
            @click.native="_clickStatus"
            @filter="_clickFilterStatus"></jf-filter>
        </div>
      </sticky>

      <div v-if="listData" class="select-box">
        <template v-if="listData.length">
          <part-list
            :isLink="true"
            :list="listData"
            @clickItem="_clickListItem">
            <template v-slot:default="slotProps">
              <div class="box-item">
                <p class="tip">
                  <template v-if="slotProps.item.remittanceBankName || slotProps.item.remittanceBankAccount">
                    {{ slotProps.item.remittanceBankName }}-{{ slotProps.item.remittanceBankAccount | filterSubStr }}
                  </template>
                  {{ $t(itemData.label) }}
                </p>
                <p class="money">
                  <span class="num">{{ slotProps.item.depositMoney | filterMoney }}</span>
                  <span class="label">{{ slotProps.item.currency | filterCurrency }}</span>
                </p>
                <p class="time">{{ slotProps.item.createdTime | filterDateTime }}</p>
                <span class="status" :style="_getStatusColor(slotProps.item.state)">{{ slotProps.item.state | filterStatusText }}</span>
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
import i18n from '@/modules/module-iaccount/locale'
// import { FundsSummary } from '../components'
import * as tips from '@/modules/module-iaccount/utils/tips'
import cookie from '@/modules/module-iaccount/utils/cookie'
import { timestampToTime } from '@/modules/module-iaccount/utils/date'
import { HIS_DEPOSIT, CURRENCY_TYPE, CURRENCY_STATUS } from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import SecuritiesApi from '@/modules/module-iaccount/api/modules/api-securities'

const SUMMARYS_DATA = [
  {
    title: 'iAccount.deposit.currency_type.text_1',
    iconName: 'hk',
    key: 'hk',
    money: ''
  }, {
    title: 'iAccount.deposit.currency_type.text_2',
    iconName: 'us',
    key: 'dollar',
    money: ''
  }
]
const CURRENCY_MENUS = Object.values(CURRENCY_TYPE.options).sort((a, b) => a.sort - b.sort)
const STATUS_MENUS = Object.values(CURRENCY_STATUS.options).sort((a, b) => a.sort - b.sort)

export default {
  mixins: [commonMixin],
  props: {
    itemData: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      listData: null,
      summarys: SUMMARYS_DATA,
      currency: CURRENCY_MENUS[0].value,
      state: STATUS_MENUS[0].value,
      currencyMenus: CURRENCY_MENUS,
      statusMenus: STATUS_MENUS
    }
  },
  created() {
    this._fetchHis()
  },
  computed: {
  },
  methods: {
    _getStatusColor(val) {
      return { color: CURRENCY_STATUS.options[val].color || '' }
    },
    _fetchHis() {
      const params = {
        type: this.itemData.value,
        currency: this.currency,
        state: this.state
      }
      SecuritiesApi.getFundsHistory(params).then(res => {
        this._handleResData(res)
      }).catch(() => {
        this.listData = []
      })
    },
    _handleResData(data) {
      const { moneySum, moneyList } = data
      this.summarys = SUMMARYS_DATA.map(item => {
        return {
          ...item,
          money: moneySum[item.key] || '0'
        }
      })
      this.listData = moneyList
    },
    _clickCurrency() {
      this.$refs.state._hide()
    },
    _clickStatus() {
      this.$refs.currency._hide()
    },
    _clickFilterCurrrency(selectedVal, selectedIndex) {
      this.currency = selectedVal.value
      this._fetchHis()
    },
    _clickFilterStatus(selectedVal, selectedIndex) {
      this.state = selectedVal.value
      this._fetchHis()
    },
    _clickListItem(item) {
      cookie.setCookie(HIS_DEPOSIT, item)
      this.$router.push({ name: 'funds-deposit', query: { tab: this.itemData.key } })
    },
    _clickDepositTips() {
      tips.alert({
        confirmTxt: this.$t('iAccount.common.text_10'),
        render: (createElement) => {
          return [
            createElement('div', {
              class: {
                'custom-cube-dialog-title': true
              },
              slot: 'title'
            }, this.$t('iAccount.history.common.text_3')),
            createElement('div', {
              class: {
                'custom-cube-dialog-content': true
              },
              slot: 'content'
            }, [
              createElement('p', null, [
                this.$t('iAccount.history.common.text_4'),
                createElement('span', {
                  class: {
                    'font-link': true
                  },
                  on: {
                    click: (e) => {
                      this.tellPhone(this.getPhone)
                    }
                  }
                }, this.getPhone),
                this.$t('iAccount.history.common.text_15')
              ])
            ])
          ]
        }
      })
    }
  },
  filters: {
    filterCurrency(val) {
      return CURRENCY_TYPE.options[val] ? i18n.t(CURRENCY_TYPE.options[val].text) : val
    },
    filterStatusText(val) {
      return CURRENCY_STATUS.options[val] ? i18n.t(CURRENCY_STATUS.options[val].text) : val
    },
    filterDateTime(val) {
      return timestampToTime(val, 'YYYY.MM.DD hh:mm:ss')
    },
    filterMoney(val = 0) {
      return Number(val).toFixed(2) + ''
    }
  },
  components: {
    // FundsSummary
  }
}

</script>
