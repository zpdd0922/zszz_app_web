<template>
  <div class="stock-flow">
    <!-- 筛选条件 -->
    <condition @toggle-mask="toggleMask" :stockRecordInfo="stockRecordInfo"></condition>
    <!-- 资金流水 -->
    <div class="list-wrap">
      <template v-if="stockInfoList.length > 0">
        <flow-list v-for="(item, idx) in stockInfoList" :key="idx" :item="item" :index="idx"></flow-list>
        <p class="bottom-tip">{{$t('iAccount.capital_flow.common.text_27')}}</p>
      </template>
      <empty-box v-else :tips="$t('iAccount.common.text_13')"></empty-box>
    </div>
    <!-- 遮罩层 -->
    <div class="mask" v-show="isMask"></div>
    <!-- H5弹框输入交易密码 -->
    <jf-dialog
      v-if="showCaptcha"
      :showBtn="false"
      :showClose="true"
      :styleObj="{ marginTop: '-150px' }"
      @onClose="_closeCaptcha">
      <captcha-box @submit="_getCaptchaVal"></captcha-box>
    </jf-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Condition from './condition'
import FlowList from './flow-list'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'
// import userAgent from '@/utils/ua-parser'

export default {
  components: {
    Condition,
    FlowList
  },
  data() {
    return {
      isMask: false, // 是否显示遮罩层
      showCaptcha: false,
      stockInfoList: [
        // {
        //   'businessDate': '20200205',
        //   'stockCode': '00700',
        //   'assetId': '00700.US',
        //   'stockName': '騰訊控股',
        //   'occurAmount': '100',
        //   'postAmount': '400.00',
        //   'businessName': '買入證券'
        // }
      ], // 股票流水
      trd: '',
      key: ''
    }
  },
  created() {
    if (this.secAccountInfo) {
      this._handleNext()
    } else {
      this.$store.dispatch('getSecAccountInfo').then(() => {
        this._handleNext()
      })
    }
  },
  computed: {
    ...mapGetters([
      'businessType', // 业务类型
      'marketType', // 币种
      'capitalFlow', // 资金流向
      'dataFilter', // 日期
      'secAccountInfo'
    ])
  },
  methods: {
    _handleNext() {
      this.stockRecordInfo()
    },
    _getCaptchaVal(val) {
      // 关闭交易密码弹框
      this._closeCaptcha()
      // 处理提取
      this.initData({ trd: val })
    },
    _closeCaptcha() {
      this.showCaptcha = false
    },
    initData(obj) {
      this.trd = obj.trd
      this.key = obj.key
      this.stockRecordInfo()
    },
    // 获取股票流水
    stockRecordInfo() {
      const { fundAccount = [], tradeAccount } = this.secAccountInfo
      let param = {
        // tradePwd: this.trd, // 类型：String  必有字段  备注：交易密码
        // key: this.key,
        fundAccount: fundAccount[0], // 类型：String  必有字段  备注：资金账号
        marketType: this.marketType.key, // 类型：String  必有字段  备注：all:全部;K:港股; P:美股
        busCode: this.businessType.key, // 类型：String  必有字段  备注：业务类型：all：全部；secFund：证券存取；newStock：新股认购；secTransact：证券交易；com：公司行动；other：其他；accountFund：资金存取
        secType: this.capitalFlow.key, // 类型：String  必有字段  备注：证券流向:all全部；1：转入；-1：转出
        clientId: tradeAccount // 类型：String  必有字段  备注：交易账户
      }
      if (this.dataFilter.key) {
        param = Object.assign({}, param, {
          dateChange: this.dataFilter.key
        })
      } else {
        param = Object.assign({}, param, {
          beginDate: (this.dataFilter.date.start).replace(/-|\//g, ''),
          endDate: (this.dataFilter.date.end).replace(/-|\//g, '')
        })
      }
      SecApi.stockRecordInfo(param).then((res) => {
        let prevMonth = ''
        let prevDay = ''
        for (let i = 0; i < res.length; i++) {
          const year = res[i].businessDate.substr(0, 4)
          const month = res[i].businessDate.substr(4, 2)
          const day = res[i].businessDate.substr(6, 2)
          res[i].businessDate = `${year}/${month}/${day}`
          if (month !== prevMonth) {
            res[i].isDiffMonth = true
            prevMonth = month
          }
          if (day !== prevDay) {
            res[i].isDiffDay = true
            prevDay = day
          }
        }
        this.stockInfoList = res
      })
    },
    // 资金汇总下拉
    toggleArrow(type) {
      this[type] = !this[type]
    },
    // 遮罩层
    toggleMask(value) {
      this.isMask = value
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
