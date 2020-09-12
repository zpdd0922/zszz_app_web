<template>
  <div class="currency-type">
    <part-list
      :title="$t('iAccount.deposit.currency_type.title_1')"
      :isLink="true"
      :list="$t('iAccount.define.CURRENCY')"
      @clickItem="_clickCurrency">
      <template v-slot:img="slotProps">
        <jf-icon class="type-img" :name="slotProps.item.iconName"></jf-icon>
      </template>
    </part-list>

    <part-list
      v-if="hisData.length"
      :title="$t('iAccount.deposit.currency_type.title_2')"
      :list="hisData">
      <template v-slot:default="slotProps">
        <div class="item-info">
          <div class="info-list" key="currency">
            <span class="label">{{ $t('iAccount.deposit.currency_type.text_4') }}</span>
            <span class="field">{{ slotProps.item.currency | filterCurrency }}</span>
          </div>
          <div class="info-list" key="bank">
            <span class="label">{{ $t('iAccount.deposit.currency_type.text_5') }}</span>
            <span class="field" v-if="slotProps.item.remittanceBankName || slotProps.item.remittanceBankAccount">
              {{ slotProps.item.remittanceBankName }}-{{ slotProps.item.remittanceBankAccount | filterSubStr }}
            </span>
          </div>
          <div class="info-list" key="way">
            <span class="label">{{ $t('iAccount.deposit.currency_type.text_6') }}</span>
            <span class="field">{{ slotProps.item.bankCode | filterBankCodeWay }}</span>
          </div>
          <span
            class="info-btn"
            @click="judgeDepositAgain(slotProps.item)">{{ $t('iAccount.deposit.currency_type.text_3')}}</span>
        </div>
      </template>
    </part-list>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/modules/module-iaccount/locale'
import {
  EBANK, FPS, CHECK, OTHER,
  CURRENCY_TYPE, CURRENCY_STATUS
} from '@/modules/module-iaccount/define'
import { formatToDBC } from '@/modules/module-iaccount/utils/format'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import AccountApi from '@/modules/module-iaccount/api/modules/api-account'
import SecuritiesApi from '@/modules/module-iaccount/api/modules/api-securities'

const FPS_CHECK_key = [FPS, CHECK]

export default {
  mixins: [commonMixin],
  data() {
    return {
      hisData: []
    }
  },
  created() {
    this._fetchHis()
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    _fetchHis() {
      const params = {
        type: 1, // 入金记录
        currency: CURRENCY_TYPE.options[0].value, // 所有币种
        state: CURRENCY_STATUS.options[3].value // 已完成
      }
      SecuritiesApi.getFundsHistory(params).then(res => {
        console.log(res)
        this._handleResData(res || {})
      }).catch(() => {
        this.hisData = []
      })
    },
    // 处理入金历史记录 - 匹配出OMS目前支持的入金记录
    async _handleResData(data) {
      console.log(data)
      const arr = data.moneyList || []
            console.log(arr)

      if (!arr.length) return false
      // 获取入金银行
            console.log(4)

      const { bank_hk, bank_cn, bank_other } = await this.fetchDepositBankList()
      // 匹配支持入金银行的所有记录
      const his = arr.filter(item => {
        const hisData = item
        // 入金方式KEY
        const wayKey = (item.bankCode || '').toUpperCase()
        console.log('处理入金记录-币种 wayKey', wayKey)

        // 匹配出入金方式 - 其他为网银
        const temp_way = this.$t('iAccount.define.DEPOSIT_WAY')[wayKey] || this.$t('iAccount.define.DEPOSIT_WAY')[EBANK]
        console.log('处理入金记录-币种 temp_way', temp_way)
        // 获取当前银行卡类型的列表
        // const temp_bankList = item.bankType === this.$t('iAccount.define.BANK_HK').value ? bank_hk : bank_cn
        let temp_bankList = []
        if (item.bankType === this.$t('iAccount.define.BANK_HK').value) {
          temp_bankList = bank_hk
        } else if (item.bankType === this.$t('iAccount.define.BANK_CN').value) {
          temp_bankList = bank_cn
        } else if (item.bankType === this.$t('iAccount.define.BANK_OTHER').value) {
          temp_bankList = bank_other
        }
        console.log('temp_bankList', temp_bankList)
        // 并找出支持该入金方式的银行
        let temp_bankItem
        if (wayKey === OTHER || FPS_CHECK_key.indexOf(wayKey) === -1) {
          // 其他银行OTHER 或者具名银行 - 匹配OMS配置的入金银行
          temp_bankItem = temp_bankList.find(item => {
            const isSomeWay = (item.supportType || '').indexOf(temp_way.code) !== -1
            return isSomeWay && (item.key === wayKey)
          })
        } else {
          // FPS、CHECK - 匹配收款银行名称或编码
          temp_bankItem = temp_bankList.find(item => {
            const isSomeWay = (item.supportType || '').indexOf(temp_way.code) !== -1
            // const isSomeBank = (formatToDBC(item.bankInfo.bankName) === formatToDBC(hisData.getBankNameCn) || item.bankInfo.code === hisData.getBankCode)
            // return isSomeWay && isSomeBank
            const isSomeBank = (formatToDBC(item.name) === formatToDBC(hisData.remittanceBankName) || item.key === hisData.remittanceBankCorde)
            return isSomeWay && isSomeBank && (item.key === hisData.remittanceBankCorde)
          })
        }

        console.log('处理入金记录-币种 temp_bankItem', temp_bankItem)
        return temp_bankItem
      })
      // 第一条港币
      const data_hk = his.filter(item => item.remittanceBankCorde).find(item => item.currency === this.$t('iAccount.define.DOLLAR_HK').value)
      // 第一条美元
      const data_us = his.filter(item => item.remittanceBankCorde).find(item => item.currency === this.$t('iAccount.define.DOLLAR_US').value)
      console.log('_handleResData', arr, his, data_hk, data_us)
      this.hisData = [data_hk, data_us].filter(Boolean)
      console.log('this.hisData', this.hisData)
    },
    _clickCurrency(item) {
      AccountApi.getOpenBankType().then(res => {
        const { bankType } = res
        if (bankType === 0) {
          // 香港卡开户
          const bank_hk = this.$t('iAccount.define.BANK_HK')
          this.$store.dispatch('selectBankType', bank_hk).then(() => {
            this._gotoView('bank-list-hk', item)
          })
        } else {
          // 大陆卡开户
          this._gotoView('bank-type', item)
        }
      })
    },
    _gotoView(name, item) {
      this.$store.dispatch('selectCurrency', item).then(() => {
        this.$router.push({ name: name })
      })
    }
  },
  filters: {
    filterCurrency(val) {
      return CURRENCY_TYPE.options[val] ? i18n.t(CURRENCY_TYPE.options[val].text) : val
    },
    filterBankCodeWay(val) {
      // 根据bankCode判断
      // CHECK - 支票 FPS-fps转数快 其他-网银
      const temp = (val || '').toUpperCase()
      const deposit_way = i18n.t('iAccount.define.DEPOSIT_WAY')
      const wayKey = Object.keys(deposit_way).find(item => item === temp) || EBANK
      return deposit_way[wayKey].title
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
