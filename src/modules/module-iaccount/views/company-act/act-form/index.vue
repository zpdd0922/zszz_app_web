<template>
  <div class="wrap">
    <div class="header border-bottom-1px border-top-1px">
      <div class="input-btn" @click="searchHandle">
        <i class="cubeic-search icon"></i>
        <span class="txt">{{ $t('iAccount.company_act.placeholder.text_1') }}</span>
      </div>
    </div>
    <div class="stock-info">
      <p class="stock-icon" v-show="this.activeStock"></p>
      <p class="info">{{this.stockInfo}}</p>
    </div>
    <div class="form">
      <div class="form-item">
        <div class="label">{{ $t('iAccount.company_act.label.text_1') }}</div>
        <p class="require-status">*</p>
        <div class="content border-bottom-1px">
          <cube-select
            v-model="bourseValue"
            :options="bourseOptions">
          </cube-select>
        </div>
      </div>
      <div class="form-item">
        <div class="label">{{ $t('iAccount.company_act.label.text_2') }}</div>
        <p class="require-status">*</p>
        <div class="content border-bottom-1px">
          <cube-select
            @change="nameHandle"
            v-model="nameValue"
            :options="nameOptions">
          </cube-select>
        </div>
      </div>
      <template v-if="nameValue && nameValue !== 'OTH'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_3') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-select
              @change="activeHandle"
              v-model="activeSelect"
              :options="activeOptions">
            </cube-select>
          </div>
        </div>
      </template>
      <template v-if="nameValue === 'OTH'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_4') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input v-model="otherValue" :placeholder="$t('iAccount.company_act.placeholder.text_2')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 附選擇權的股息權益 -->
      <template v-if="activeSelect === 'DSO3'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_5') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="scriptStockNum" :placeholder="$t('iAccount.company_act.placeholder.text_3')" ></cube-input>
          </div>
        </div>
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_6') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="scriptCashNum" :placeholder="$t('iAccount.company_act.placeholder.text_4')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 附選擇權的股份轉換 -->
      <template v-if="activeSelect === 'OSE2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_7') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="shareExchangeNum" :placeholder="$t('iAccount.company_act.placeholder.text_5')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 供股 -->
      <template v-if="activeSelect === 'RS2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_8') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="rightSubscriptionNum2" :placeholder="$t('iAccount.company_act.placeholder.text_6')"></cube-input>
          </div>
        </div>
      </template>
      <template v-if="activeSelect === 'RS1' || activeSelect === 'RS2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_9') }}</div>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="rightSubscriptionNum3" :placeholder="$t('iAccount.company_act.placeholder.text_7')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 公開配售 -->
      <template v-if="activeSelect === 'OOS2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_8') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="offerSubscriptionNum2" :placeholder="$t('iAccount.company_act.placeholder.text_6')"></cube-input>
          </div>
        </div>
      </template>
      <template v-if="activeSelect === 'OOS1' || activeSelect === 'OOS2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_9') }}</div>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="offerSubscriptionNum3" :placeholder="$t('iAccount.company_act.placeholder.text_7')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 現金收購 -->
      <template v-if="activeSelect === 'CO2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_10') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="cashOfferNum" :placeholder="$t('iAccount.company_act.placeholder.text_9')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 認股權證的轉換 -->
      <template v-if="activeSelect === 'WC2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_33') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="warrantsConversionNum" :placeholder="$t('iAccount.company_act.placeholder.text_10')"></cube-input>
          </div>
        </div>
      </template>
      <!-- 優先認購 -->
      <template v-if="activeSelect === 'PO2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_8') }}</div>
          <p class="require-status">*</p>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="preferentialOfferNum2" :placeholder="$t('iAccount.company_act.placeholder.text_6')"></cube-input>
          </div>
        </div>
      </template>
      <template v-if="activeSelect === 'PO1' || activeSelect === 'PO2'">
        <div class="form-item">
          <div class="label">{{ $t('iAccount.company_act.label.text_9') }}</div>
          <div class="content border-bottom-1px">
            <cube-input type="tel" v-model="preferentialOfferNum3" :placeholder="$t('iAccount.company_act.placeholder.text_7')"></cube-input>
          </div>
        </div>
      </template>
      <div class="form-item">
        <div class="label">{{ $t('iAccount.company_act.label.text_12') }}</div>
        <div class="content border-bottom-1px">
          <cube-input v-model="remark" :placeholder="$t('iAccount.company_act.placeholder.text_11')"></cube-input>
        </div>
      </div>
    </div>
    <div class="btn">
      <cube-button primary :disabled="disableBtn" @click="submitHandle">{{ $t('iAccount.company_act.label.text_13') }}</cube-button>
    </div>
    <template v-if="dialogStatus">
      <div class="dialog">
        <div class="box">
          <div class="title">{{ $t('iAccount.company_act.label.text_14') }}</div>
          <div class="content">
            <cube-scroll>
              <div class="tiem">
                <p>{{ $t('iAccount.company_act.label.text_15') }}</p>
                <p>{{ $t('iAccount.company_act.label.text_16') }}</p>
              </div>
              <div class="tiem">
                <p>{{ $t('iAccount.company_act.label.text_17') }}</p>
                <p>{{dialogCompanyName}}</p>
              </div>
              <div class="tiem" v-if="this.nameValue !== 'OTH'">
                <p>{{ $t('iAccount.company_act.label.text_18') }}</p>
                <p>{{dialogCompanyActive}}</p>
              </div>
              <div v-if="activeSelect === 'DSO3'">
                <div class="tiem">
                  <p>{{ $t('iAccount.company_act.label.text_19') }}</p>
                  <p>{{scriptStockNum}}</p>
                </div>
                <div class="tiem">
                  <p>{{ $t('iAccount.company_act.label.text_20') }}</p>
                  <p>{{scriptCashNum}}</p>
                </div>
              </div>
              <div v-if="activeSelect === 'OSE2'">
                <div class="tiem">
                  <p>{{ $t('iAccount.company_act.label.text_21') }}</p>
                  <p>{{shareExchangeNum}}</p>
                </div>
              </div>
              <div class="tiem" v-if="activeSelect === 'RS2'">
                <p>{{ $t('iAccount.company_act.label.text_22') }}</p>
                <p>{{rightSubscriptionNum2}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'RS1' || activeSelect === 'RS2'">
                <p>{{ $t('iAccount.company_act.label.text_23') }}</p>
                <p>{{rightSubscriptionNum3}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'OOS2'">
                <p>{{ $t('iAccount.company_act.label.text_22') }}</p>
                <p>{{offerSubscriptionNum2}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'OOS1' || activeSelect === 'OOS2'">
                <p>{{ $t('iAccount.company_act.label.text_23') }}</p>
                <p>{{offerSubscriptionNum3}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'CO2'">
                <p>{{ $t('iAccount.company_act.label.text_24') }}</p>
                <p>{{cashOfferNum}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'WC2'">
                <p>{{ $t('iAccount.company_act.label.text_34') }}</p>
                <p>{{warrantsConversionNum}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'PO2'">
                <p>{{ $t('iAccount.company_act.label.text_22') }}</p>
                <p>{{preferentialOfferNum2}}</p>
              </div>
              <div class="tiem" v-if="activeSelect === 'PO1' || activeSelect === 'PO2'">
                <p>{{ $t('iAccount.company_act.label.text_23') }}</p>
                <p>{{preferentialOfferNum3}}</p>
              </div>
              <div class="tiem">
                <p>{{ $t('iAccount.company_act.label.text_26') }}</p>
                <p>{{remark}}</p>
              </div>
              <div class="msg">
                <p>{{ $t('iAccount.company_act.label.text_27') }}</p>
                <p>{{ $t('iAccount.company_act.label.text_28') }}</p>
                <p>{{ $t('iAccount.company_act.label.text_29') }}</p>
              </div>
            </cube-scroll>
          </div>
          <div class="footer border-top-1px">
            <div class="cancel" @click="handleCancel">{{ $t('iAccount.company_act.common.text_2') }}</div>
            <div class="confirm border-left-1px" @click="handleConfirm">{{ $t('iAccount.company_act.common.text_1') }}</div>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import * as tips from '@/main/utils/common/tips'
import i18n from '@/modules/module-iaccount/locale'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'
import SecuritiesApi from '@/modules/module-iaccount/api/modules/api-securities'


// 附選擇權的股息權益
const SCRIP_OPTIONS = i18n.t('iAccount.define.SCRIP_OPTIONS')

// 附選擇權的股份轉換
const SHARE_EXCHANGE_OPTIONS = i18n.t('iAccount.define.SHARE_EXCHANGE_OPTIONS')

// 供股
const RIGHTS_SUBSCRIPTION_OPTIONS = i18n.t('iAccount.define.RIGHTS_SUBSCRIPTION_OPTIONS')

// 公開配售
const OPEN_OFFER_SUBSCRIPTION_OPTIONS = i18n.t('iAccount.define.OPEN_OFFER_SUBSCRIPTION_OPTIONS')

// 現金收購
const CASH_OFFER = i18n.t('iAccount.define.CASH_OFFER')

// 認股權證的轉換
const WARRANTS_CONVERSION_OPTIONS = i18n.t('iAccount.define.WARRANTS_CONVERSION_OPTIONS')

// 優先認購
const PREFERENTIAL_OFFER = i18n.t('iAccount.define.PREFERENTIAL_OFFER')

export default {
  data () {
    return {
      remark: '',
      options: [],
      bourseValue: 'HKEX',
      bourseOptions: i18n.t('iAccount.define.BOURSE_OPTIONS'),
      // 公司行动名称
      nameValue: '',
      nameOptions: i18n.t('iAccount.define.COMPANY_NAME_OPTIONS'),
      otherValue: '',
      activeSelect: '',
      activeOptions: [],
      scriptStockNum: '',
      scriptCashNum: '',
      shareExchangeNum: '',
      rightSubscriptionNum2: '',
      rightSubscriptionNum3: '',
      offerSubscriptionNum2: '',
      offerSubscriptionNum3: '',
      cashOfferNum: '',
      warrantsConversionNum: '',
      preferentialOfferNum2: '',
      preferentialOfferNum3: '',
      dialogStatus: false // 预览框状态
    }
  },
  computed: {
    ...mapGetters([
      'userInfo',
      'activeStock'
    ]),
    stockInfo() {
      if (this.activeStock) {
        const { id = '', name = '' } = this.activeStock
        return `${name} (${id})`
      }
      return '-- --'
    },
    // 公司行动名称弹框
    dialogCompanyName() {
      const data = this.nameOptions.filter(val => val.value === this.nameValue)
      return data.length && data[0].text
    },
    dialogCompanyActive() {
      const data = this.activeOptions.filter(val => val.value === this.activeSelect)
      return data.length && data[0].text
    },
    // 公司行动名称[DSO-附选择权的股息权益 OSE-附选择权的股份转换 RS-供股 OOS-公开配售 CO-现金收购 WC-认股权证的转换 PO-优先认购 OTH-其他公司行动]
    // 行动之选择[DSO1-全部选择股票 DSO2-全部选择现金 DSO3-部分股票部分现金 OSE1-全部转换 OSE2-部分转换 RS1-全数供股  RS2-部分供股 OOS1-全部供股 OOS2-部分供股 CO1-接受全部 CO2-接受部分 WC1-全部转换 WC2-部分转换 PO1-全部供股 PO2-部分供股]
    disableBtn() {
      if (!this.activeStock) {
        return true
      }
      if (!this.activeSelect && this.nameValue !== 'OTH') {
        return true
      }
      switch (this.nameValue) {
      case 'DSO':
        if (this.activeSelect === 'DSO3' && (!this.scriptStockNum || !this.scriptCashNum)) {
          return true
        }
        break
      case 'OSE':
        if (this.activeSelect === 'OSE2' && !this.shareExchangeNum) {
          return true
        }
        break
      case 'RS':
        if (this.activeSelect === 'RS2' && !this.rightSubscriptionNum2) {
          return true
        }
        break
      case 'OOS':
        if (this.activeSelect === 'OOS2' && !this.offerSubscriptionNum2) {
          return true
        }
        break
      case 'CO':
        if (this.activeSelect === 'CO2' && !this.cashOfferNum) {
          return true
        }
        break
      case 'WC':
        if (this.activeSelect === 'WC2' && !this.warrantsConversionNum) {
          return true
        }
        break
      case 'PO':
        if (this.activeSelect === 'PO2' && !this.preferentialOfferNum2) {
          return true
        }
        break
      case 'OTH':
        if (!this.otherValue) {
          return true
        }
        break
      default:
        return true
      }
      return false
    }
  },
  methods: {
    // 公司行动名称
    nameHandle(value, idx, txt) {
      switch (value) {
      case 'DSO':
        this.activeOptions = SCRIP_OPTIONS
        break
      case 'OSE':
        this.activeOptions = SHARE_EXCHANGE_OPTIONS
        break
      case 'RS':
        this.activeOptions = RIGHTS_SUBSCRIPTION_OPTIONS
        break
      case 'OOS':
        this.activeOptions = OPEN_OFFER_SUBSCRIPTION_OPTIONS
        break
      case 'CO':
        this.activeOptions = CASH_OFFER
        break
      case 'WC':
        this.activeOptions = WARRANTS_CONVERSION_OPTIONS
        break
      case 'PO':
        this.activeOptions = PREFERENTIAL_OFFER
        break
      default:
        this.activeOptions = SCRIP_OPTIONS
        break
      }
      this.clearValue('name')
    },
    clearValue(type) {
      if (type === 'name') {
        this.activeSelect = ''
      }
      this.scriptStockNum = ''
      this.scriptCashNum = ''
      this.shareExchangeNum = ''
      this.rightSubscriptionNum2 = ''
      this.rightSubscriptionNum3 = ''
      this.offerSubscriptionNum2 = ''
      this.offerSubscriptionNum3 = ''
      this.cashOfferNum = ''
      this.warrantsConversionNum = ''
      this.preferentialOfferNum2 = ''
      this.preferentialOfferNum3 = ''
      this.otherValue = ''
      this.remark = ''
    },
    // 行动之选择
    activeHandle(value, idx, txt) {
      this.clearValue()
    },
    searchHandle() {
      this.$router.push({ name: 'act-search' })
    },
    handleCancel() {
      this.dialogStatus = false
    },
    handleConfirm() {
      this.dialogStatus = false
      const obj = this.formatData()
      const { id, name } = this.activeStock
      const params = {
        actionNameType: this.nameValue,
        actionOptType: this.activeSelect,
        exchangeType: this.bourseValue,
        remark: this.remark,
        stockCode: id,
        stockName: name,
        ...obj
      }
      SecApi.saveCorporateActions(params).then(res => {
        const data = { time: res, ...params }
        this.$router.push({ name: 'detail', params: { data } })
      })
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        // if (!this.activeStock) {
        //   const msg = this.$t('iAccount.company_act.placeholder.text_12')
        //   tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
        //   reject(msg)
        // }
        // if (!this.activeSelect) {
        //   const msg = this.$t('iAccount.company_act.placeholder.text_13')
        //   tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
        //   reject(msg)
        // }
        const reg = new RegExp(/^\d+$/)
        switch (this.nameValue) {
        case 'DSO':
          if (this.activeSelect === 'DSO3' && (!reg.test(this.scriptStockNum) || !reg.test(this.scriptCashNum))) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'OSE':
          if (this.activeSelect === 'OSE2' && !reg.test(this.shareExchangeNum)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'RS':
          if (this.activeSelect === 'RS2' && !reg.test(this.rightSubscriptionNum2)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'OOS':
          if (this.activeSelect === 'OOS2' && !reg.test(this.offerSubscriptionNum2)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'CO':
          if (this.activeSelect === 'CO2' && !reg.test(this.cashOfferNum)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'WC':
          if (this.activeSelect === 'WC2' && !reg.test(this.warrantsConversionNum)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        case 'PO':
          if (this.activeSelect === 'PO2' && !reg.test(this.preferentialOfferNum2)) {
            const msg = this.$t('iAccount.company_act.placeholder.text_17')
            tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
            reject(msg)
          }
          break
        }
        resolve()
      })
    },
    formatData() {
      let obj = {}
      switch (this.nameValue) {
      case 'DSO':
        if (this.activeSelect === 'DSO3') {
          obj = {
            stockAmount: this.scriptStockNum,
            cashAmount: this.scriptCashNum
          }
        }
        break
      case 'OSE':
        if (this.activeSelect === 'OSE2') {
          obj = {
            stockAmount: this.shareExchangeNum
          }
        }
        break
      case 'RS':
        if (this.activeSelect === 'RS2') {
          obj = {
            stockAmount: this.rightSubscriptionNum2
          }
        }
        obj = { additionalStkAmount: this.rightSubscriptionNum3, ...obj }
        break
      case 'OOS':
        if (this.activeSelect === 'OOS2') {
          obj = {
            stockAmount: this.offerSubscriptionNum2
          }
        }
        obj = { additionalStkAmount: this.offerSubscriptionNum3, ...obj }
        break
      case 'CO':
        if (this.activeSelect === 'CO2') {
          obj = {
            stockAmount: this.cashOfferNum
          }
        }
        break
      case 'WC':
        if (this.activeSelect === 'WC2') {
          obj = {
            stockAmount: this.warrantsConversionNum
          }
        }
        break
      case 'PO':
        if (this.activeSelect === 'PO2') {
          obj = {
            stockAmount: this.preferentialOfferNum2
          }
        }
        obj = { additionalStkAmount: this.preferentialOfferNum3, ...obj }
        break
      case 'OTH':
        obj = {
          stockAmount: this.otherValue
        }
        break
      default:
        break
      }
      return obj
    },
    submitHandle() {
      const { stockAmount = '', cashAmount = '' } = this.formatData()
      const str = stockAmount + cashAmount
      const reg = new RegExp(/^\d+$/)
      if (stockAmount && cashAmount && !reg.test(str)) {
        const msg = this.$t('iAccount.company_act.placeholder.text_17')
        tips.alert({ content: msg, title: this.$t('iAccount.company_act.common.text_3') })
        return
      }
      this.handleBefore().then(() => {
        this.dialogStatus = true
      })
    }
  }
}
</script>

<style lang="scss">
body, html {
  height: 100%;
}

.cube-picker-confirm {
  color: #093393;
}
.cube-picker-cancel {
  color: #093393;
}
</style>

<style scoped lang="scss">
.content /deep/ .cube-select {
  &:after {
    border: none;
  }
}
.content /deep/ .cube-input {
  &:after {
    border: none;
  }
}
.btn /deep/ .cube-btn-primary {
  background: #093393;
  border-radius:.02rem;
}
.btn /deep/ .cube-btn_disabled {
  background: #ccc;
  border-radius:.02rem;
}
@import './style';

</style>
