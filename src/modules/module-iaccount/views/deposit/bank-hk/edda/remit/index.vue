<template>
  <div class="remit">
    <sec-wrap
      :isDisabled="false"
      :nextBtnFixed="false"
      :btnText="$t('iAccount.common.text_1')"
      :handleBefore="handleBefore"
      @handleNext="_handleNext"
    >
      <head-bank
        :styleObj="{
          background: depositBankData.bgColor,
          boxShadow: `0px .07rem .16rem 0px ${depositBankData.shadowColor}`
        }"
        :bank="depositBankData"
        :desc="depositWayInfo">
      </head-bank>
      <div class="content">
        <div class="content-inner">
          <div class="inner-detail">
            <ul class="detail-form-new">
              <!-- 汇款账号 -->
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.remit.text_1')}}</div>
                <div class="form-filed" @click="selectAccount">
                  <div v-if="depositAccount" class="flag">
                    <span>{{depositAccount}}</span>
                    <span class="flag-3">{{flagText}}</span>
                  </div>
                  <div v-else>{{$t('iAccount.deposit.edda.remit.text_2')}}</div>
                  <i class="cubeic-pulldown"></i>
                </div>
              </li>
              <p class="tips">{{$t('iAccount.deposit.edda.remit.tips.text_5')}}</p>
              <!-- 存入金额 -->
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.remit.text_3')}}</div>
                <div class="form-filed form-jc">
                  <div class="form-items">
                    <input t
                      ype="text"
                      :placeholder="$t('iAccount.deposit.edda.remit.text_5')"
                      @focus="_focusMoneyInput"
                      @blur="_blurMoneyInput"
                      v-model="depositMoney">
                  </div>
                  <p>{{$t('iAccount.deposit.edda.remit.text_4')}}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </sec-wrap>
    <foot-tip :list="remitTips" :title="$t('iAccount.common.text_12')"></foot-tip>
    <!-- 选择框 -->
    <div class="select-wrap" v-show="selectStatus" @click="hideWrap">
      <div class="list">
        <div class="item">
          <ul>
            <li :class="[depositAccount === item.depositAccount ? 'active': '']" v-for="(item, index) in list" :key="index" @click.stop="handleAccount(item)">
              <p class="account">{{item.depositAccount}}</p>
              <p :class="statusColor(item)"><span>{{statusText(item)}}</span></p>
            </li>
            <li @click="addHandle">{{$t('iAccount.deposit.edda.remit.text_6')}}</li>
          </ul>
        </div>
      </div>
    </div>

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

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import * as tips from '@/main/utils/common/tips'
import { formatNumber } from '@/modules/module-iaccount/utils/format'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const REMIT_TIPS = [
  {
    txt: 'iAccount.deposit.edda.remit.tips.text_1'
  },
  {
    txt: 'iAccount.deposit.edda.remit.tips.text_2'
  }
]
export default {
  mixins: [commonMixin],
  data () {
    return {
      list: [],
      remitTips: REMIT_TIPS,
      selectStatus: false,
      depositAccount: '',
      flagText: this.$t('iAccount.define.EDDA_STATUS')[3].text,
      depositMoney: '',
      showCaptcha: false
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositWayInfo',
      'depositBankData',
      'depositBankType',
      'depositEddaInfo'
    ])
  },
  methods: {
    async getList() {
      const res = await this.fetchEddaList()
      const succ = res.filter(item => item.eddaState === 3)
      this.list = res
      const query = this.$route.query
      if (query.type === 'active') {
        this.depositAccount = this.depositEddaInfo.depositAccount
        return
      }
      if (succ.length) {
        await this.$store.dispatch('selectEddaItem', succ[0])
        this.depositAccount = succ[0].depositAccount
      }
    },
    statusColor(item) {
      const { eddaState } = item
      const list = this.$t('iAccount.define.EDDA_STATUS')
      return [`flag-${list[eddaState].value}`]
    },
    statusText(item) {
      const { eddaState } = item
      const list = this.$t('iAccount.define.EDDA_STATUS')
      return list[eddaState].text
    },
    selectAccount() {
      this.selectStatus = true
    },
    hideWrap() {
      this.selectStatus = false
    },
    // 增加账号
    addHandle() {
      this.hideWrap()
      this.showCaptcha = true
    },
    _closeCaptcha() {
      this.showCaptcha = false
    },
    _getCaptchaVal(val) {
      // 关闭交易密码弹框
      this._closeCaptcha()
      SecApi.validTrdPwd({ tradePwd: val }).then(() => {
        this.$router.push({ name: 'edda-bind' })
      })
    },
    // 选择授权账号
    handleAccount(item) {
      const { eddaState, depositAccount } = item
      switch (eddaState) {
      case 0:
        break
      case 1:
        break
      case 2:
        this.$store.dispatch('selectEddaItem', item).then(() => {
          this.$router.push({ name: 'edda-detail' })
          this.hideWrap()
        })
        break
      case 3:
        this.$store.dispatch('selectEddaItem', item).then(() => {
          this.depositAccount = depositAccount
          this.hideWrap()
        })
        break
      case 4:
        break
      default:
        break
      }
    },
    _focusMoneyInput() {
      const old = this.depositMoney
      this.depositMoney = old && String(Number(old))
    },
    _blurMoneyInput() {
      const old = this.depositMoney
      this.depositMoney = old && (Number(old)).toFixed(2)
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        if (!this.depositAccount) {
          const msg = this.$t('iAccount.deposit.edda.remit.tips.text_3')
          tips.toast({ txt: msg })
          return reject(msg)
        }
        if (!this.depositMoney) {
          const msg = this.$t('iAccount.deposit.edda.remit.tips.text_4')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        if (this.depositMoney < 0.01) {
          const msg = this.$t('iAccount.deposit.edda.remit.tips.text_6')
          tips.toast({ txt: msg })
          return reject(msg)
        }
        if (this.depositEddaInfo.bankQuota < this.depositMoney) {
          const msg = this.$t('iAccount.deposit.edda.remit.tips.text_7')
          tips.toast({ txt: msg })
          return reject(msg)
        }
        resolve()
      })
    },
    _handleNext() {
      const { account, deposit } = this.$store.state
      const bankInfo = this.$t('iAccount.define.BANK_NAME_OPTIONS')[2]
      // 基本信息
      const baseInfo = {
        currency: deposit.depositCurrency.value, // 入金币种
        bankType: deposit.depositBankType.value // 入金银行卡类型
      }

      // 用户账号信息
      const secAccountInfo = {
        clientId: account.secAccountInfo.tradeAccount, // 交易账号
        depositAccount: formatNumber(account.secAccountInfo.fundAccount[0]), // 存入账号， 目前默认：现金账号
        depositAccountName: '现金账户'// 存入账户名称，目前仅支持：现金账户
      }
      const eddaInfo = {
        remittanceBankName: deposit.depositEddaInfo.bankName,
        remittanceAccountNameEn: deposit.depositEddaInfo.depositAccountName,
        remittanceBankAccount: deposit.depositEddaInfo.depositAccount,
        remittanceBankCorde: deposit.depositEddaInfo.bankCode,
        remittanceBankId: deposit.depositEddaInfo.bankId

      }
      const jfBankInfo = {
        getAccount: bankInfo.depositToAccount.hkd,
        getAccountName: bankInfo.getAccountName,
        getBankCode: bankInfo.getBankCode,
        getBankNameCn: bankInfo.getBankNameCn
      }
      const params = {
        depositMoney: this.depositMoney,
        bankName: deposit.depositWay.title,
        bankCode: deposit.depositWay.value,
        ...baseInfo,
        ...secAccountInfo,
        ...eddaInfo,
        ...jfBankInfo
      }
      this.$store.dispatch('apiSaveIntoMoney', params).then(res => {
        this.$router.push({ name: 'edda-notify', query: { type: 1 } })
      }).catch((error) => {
        const { message } = error
        tips.alert({ content: message })
      })
    }
  },
  watch: {
    depositMoney(newVal, oldVal) {
      if (!newVal) return ''
      this.depositMoney = formatNumber(this.depositMoney, { digit: 2 })
    }
  },
  mounted() {
    this.getList()
  }
}
</script>

<style scoped>
/* @import './main' */
</style>
