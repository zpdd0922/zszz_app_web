<template>
  <div class="wrap">
    <div class="content">
      <div class="item">
        <p class="label">{{$t('company_act.label.text_1')}}</p>
        <p class="text">{{bourseName}}</p>
      </div>
      <div class="item pt">
        <p class="label">{{$t('company_act.label.text_2')}}</p>
        <p class="text">{{companyName}}</p>
      </div>
      <div class="item pt" v-if="actionName">
        <p class="label">{{$t('company_act.label.text_3')}}</p>
        <p class="text">{{actionName}}</p>
      </div>
      <!-- 部分股票 部分现金 -->
      <template v-if="OSO">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_5')}}</p>
          <p class="text">{{renderStockAccount}}</p>
        </div>
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_6')}}</p>
          <p class="text">{{renderCashAmount}}</p>
        </div>
      </template>
      <template v-if="OSE">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_7')}}</p>
          <p class="text">{{renderStockAccount}}</p>
        </div>
      </template>
      <template v-if="RS">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_8')}}</p>
          <p class="text">{{renderStockAccount}}</p>
        </div>
      </template>
      <template v-if="RSOhter">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_9')}}</p>
          <p class="text">{{renderAdditionalStkAmount}}</p>
        </div>
      </template>
      <template v-if="CO">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_30')}}</p>
          <p class="text">{{renderStockAccount}}</p>
        </div>
      </template>
      <template v-if="OTHER">
        <div class="item pt">
          <p class="label">{{$t('company_act.label.text_4')}}</p>
          <p class="text">{{renderStockAccount}}</p>
        </div>
      </template>
      <div class="item pt">
        <p class="label">{{$t('company_act.label.text_12')}}</p>
        <p class="text">{{renderRemark}}</p>
      </div>
      <div class="item pt">
        <p class="label">{{$t('company_act.label.text_31')}}</p>
        <p class="text">{{formatTime}}</p>
      </div>
    </div>
    <div class="notice">
      <p>{{$t('company_act.notice.text_1')}}</p>
      <p>{{$t('company_act.notice.text_2')}}</p>
    </div>
    <div class="btn">
      <cube-button primary  @click="submitHandle">{{ $t('company_act.label.text_32') }}</cube-button>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { timestampToTime } from '@/modules/module-iaccount/utils/date'

export default {
  data () {
    return {

    }
  },
  computed: {
    bourseName() {
      const { exchangeType } = this.$route.params.data
      const data = this.$t('define.BOURSE_OPTIONS').filter(val => val.value === exchangeType)
      return data.length && data[0].text
    },
    companyName() {
      const { actionNameType } = this.$route.params.data
      const data = this.$t('define.COMPANY_NAME_OPTIONS').filter(val => val.value === actionNameType)
      return data.length && data[0].text
    },
    actionName() {
      const list = [
        ...this.$t('define.SCRIP_OPTIONS'),
        ...this.$t('define.SHARE_EXCHANGE_OPTIONS'),
        ...this.$t('define.RIGHTS_SUBSCRIPTION_OPTIONS'),
        ...this.$t('define.OPEN_OFFER_SUBSCRIPTION_OPTIONS'),
        ...this.$t('define.CASH_OFFER'),
        ...this.$t('define.WARRANTS_CONVERSION_OPTIONS'),
        ...this.$t('define.PREFERENTIAL_OFFER')
      ]
      const { actionOptType } = this.$route.params.data
      const data = list.filter(val => val.value === actionOptType)
      return data.length && data[0].text
    },
    OSO() {
      const { actionOptType } = this.$route.params.data
      if (actionOptType === 'DSO3') return true
      return false
    },
    OSE() {
      const { actionOptType } = this.$route.params.data
      if (actionOptType === 'OSE2' || actionOptType === 'WC2') return true
      return false
    },
    RS() {
      const { actionOptType } = this.$route.params.data
      if (actionOptType === 'RS2' || actionOptType === 'OOS2' || actionOptType === 'PO2') return true
      return false
    },
    RSOhter() {
      const { actionNameType } = this.$route.params.data
      if (actionNameType === 'RS' || actionNameType === 'OOS' || actionNameType === 'PO') return true
      return false
    },
    CO() {
      const { actionOptType } = this.$route.params.data
      if (actionOptType === 'CO2') return true
      return false
    },
    OTHER() {
      const { actionNameType } = this.$route.params.data
      if (actionNameType === 'OTH') return true
      return false
    },
    // 股票股数
    renderStockAccount() {
      const { stockAmount } = this.$route.params.data
      return `${stockAmount}股`
    },
    // 现金股数
    renderCashAmount() {
      const { cashAmount } = this.$route.params.data
      return `${cashAmount}股`
    },
    renderAdditionalStkAmount() {
      const { additionalStkAmount } = this.$route.params.data
      return `${additionalStkAmount}股`
    },
    renderRemark() {
      const { remark } = this.$route.params.data
      return remark
    },
    formatTime() {
      const { time } = this.$route.params.data
      return timestampToTime(time, 'YYYY/MM/DD hh:mm:ss')
    }
  },
  methods: {
    submitHandle() {
      this.$router.push({ name: 'act-for' })
    }
  }
}
</script>

<style scoped lang="scss">
.btn /deep/ .cube-btn-primary {
  background: #093393;
  border-radius:4px;
}
.btn /deep/ .cube-btn_disabled {
  background: #ccc;
  border-radius:4px;
}

@import './style';
</style>
