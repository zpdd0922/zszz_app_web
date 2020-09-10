<template>
  <div class="capital-flow">
    <!-- 出入金总额 -->
    <div class="total-amount">
      <div class="title">
        <p>{{$t('capital_flow.common.text_1')}}</p>
        <p><span>{{$t('capital_flow.common.text_2')}}</span><i :class="{'active': isTotalAmount, 'arrow': true}" @click="toggleArrow('isTotalAmount')"></i></p>
      </div>
      <div class="amount-card" v-show="isTotalAmount">
        <div class="deposit">
          <span><i class="icon-hk"></i> {{totalAmount.enterHK | formatMoney}}{{$t('capital_flow.common.text_18')}}</span>
          <span><i class="icon-us"></i> {{totalAmount.enterUSA | formatMoney}}{{$t('capital_flow.common.text_19')}}</span>
        </div>
        <div class="withdraw">
          <span><i class="icon-hk"></i> {{totalAmount.subtractHK | formatMoney}}{{$t('capital_flow.common.text_18')}}</span>
          <span><i class="icon-us"></i> {{totalAmount.subtractUSA | formatMoney}}{{$t('capital_flow.common.text_19')}}</span>
        </div>
      </div>
    </div>
    <!-- 筛选条件 -->
    <condition @toggle-mask="toggleMask" :fundRecordInfo="fundRecordInfo"></condition>
    <!-- 资金流水 -->
    <div class="list-wrap">
      <template v-if="fundInfoList.length > 0">
        <flow-list v-for="(item, idx) in fundInfoList" :key="idx" :item="item" :index="idx"></flow-list>
        <p class="bottom-tip">{{$t('capital_flow.common.text_27')}}</p>
      </template>
      <empty-box v-else :tips="$t('common.text_13')"></empty-box>
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
import { formatMoney } from '@/modules/module-iaccount/utils/number'

export default {
  components: {
    Condition,
    FlowList
  },
  data() {
    return {
      isTotalAmount: true, // 是否显示出入金总金额
      isMask: false, // 是否显示遮罩层
      showCaptcha: false,
      totalAmount: { // 流水總金額
        enterHK: '--',
        subtractHK: '--',
        enterUSA: '--',
        subtractUSA: '--'
      },
      fundInfoList: [
        // {
        //   'businessDate': '2020/02/05',
        //   'occurAmount': '100',
        //   'occurBalance': '400.00',
        //   'postBalance': '1200.00',
        //   'businessName': '買入證券',
        //   'moneyType': '1' // 1：美元；2：港币；
        // }
      ], // 资金流水
      trd: '',
      key: ''
    }
  },
  filters: {
    formatMoney
  },
  created() {
    if (this.accInfo) {
      this._handleNext()
    } else {
      this.$store.dispatch('apiFindAccInfo').then(() => {
        this._handleNext()
      })
    }
  },
  computed: {
    ...mapGetters([
      'businessType', // 业务类型
      'currencyType', // 币种
      'capitalFlow', // 资金流向
      'dataFilter', // 日期
      'accInfo'
    ])
  },
  methods: {
    _handleNext() {
      // if (userAgent.isApp()) {
      //   // App 交易解锁
      //   window.JFSTOCK.tradeUnlock({
      //     success: (res) => {
      //       const result = JSON.parse(res.data)
      //       console.log('result：', result)
      //       // 处理提取
      //       this.initData({
      //         key: result.key,
      //         trd: result.password,
      //         tradeToken: result.token
      //       })
      //     },
      //     fail: (err) => {
      //       console.log(err)
      //       this.showCaptcha = true
      //     }
      //   })
      // } else {
      this.showCaptcha = true
      // }
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
      this.fundRecordSum()
    },
    // 获取资金总额
    fundRecordSum() {
      const { fundAccount = [], tradeAccount } = this.accInfo
      const params = {
        fundAccount: fundAccount[0],
        clientId: tradeAccount,
        tradePwd: this.trd, // 类型：String  必有字段  备注：交易密码
        key: this.key
      }
      SecApi.fundRecordSum(params).then((res) => {
        this.fundRecordInfo()
        this.totalAmount = res
      }, () => {
        this.fundRecordInfo()
      }).catch(() => {
        this.fundRecordInfo()
      })
    },
    // 获取资金流水
    fundRecordInfo() {
      const { fundAccount = [], tradeAccount } = this.accInfo
      let param = {
        tradePwd: this.trd, // 类型：String  必有字段  备注：交易密码
        key: this.key,
        fundAccount: fundAccount[0], // 类型：String  必有字段  备注：资金账号
        moneyType: this.currencyType.key, // 类型：String  必有字段  备注：币种类别 all: 全部; 1:美元; 2:港币
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
      SecApi.fundRecordInfo(param).then((res) => {
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
        this.fundInfoList = res
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

<style scoped lang="scss">
@import './style';
</style>
