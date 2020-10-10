<template>
  <jf-wrap
    class="request"
    :isDisabled="isDisabled"
    :btnText="$t('iAccount.withdraw.request.text_24')"
    :handleBefore="_handleBefore"
    @handleNext="_handleNext">
    <part-card>
      <ul class="detail-form">
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_1') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <div
                class="form-select"
                @click="_clickSelectAccount">
                <span v-if="accountLabel">{{ accountLabel }}</span>
                <span v-else class="txt">{{ $t('iAccount.withdraw.request.text_25') }}</span>
              </div>
            </div>
          </div>
        </li>
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_5') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <span class="txt">{{ secAccountInfo | format_secAccountInfo }}</span>
            </div>
          </div>
        </li>
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_6') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">
              <div
                class="form-select"
                @click="_clickSelectBank">
                <span v-if="bankInfo">{{ bankInfo.text }}</span>
                <span v-else class="txt">{{ $t('iAccount.withdraw.request.text_26') }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </part-card>

    <part-card :title="$t('iAccount.withdraw.request.text_15')">
      <ul class="detail-form">
        <!-- <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_16') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <div class="radio-group horizontal">
                <div
                  v-for="item in currencyOptions"
                  :key="item.code"
                  :class="['form-radio', item.value === Number(model.currency) && 'radio_selected']">
                  <label
                    class="radio-wrap"
                    @click="_clickSelectCurrency(item)">
                    <span class="radio-ui"></span>
                    <span class="radio-txt">{{ item.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </li> -->
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_17') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">
              <input
                v-model="model.withdrawMoney"
                type="text"
                :placeholder="$t('iAccount.withdraw.request.text_18')"
                @focus="_focusMoneyInput"
                @blur="_blurMoneyInput">
            </div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
        <!-- 手续费 -->
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_33') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">{{ _getFee() }}</div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
        <!-- 实际提取金额 -->
        <li>
          <div class="form-label">
            <span>{{ $t('iAccount.withdraw.request.text_34') }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">{{ getAct }}</div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
      </ul>
    </part-card>

    <div class="wrap-tips">
      <ul>
        <li class="cell">
          <div>
            <span>
              {{ $t('iAccount.withdraw.request.text_19')}}
              <em class="money">{{ money | filterEmptyVal }} {{ getCurrency.label }}</em>
            </span>
          </div>
          <div>
            <span class="font-link" @click="_clickSetAll">{{ $t('iAccount.withdraw.request.text_20') }}</span>
          </div>
        </li>
        <li class="cell">
          <div>
            <span>{{ $t('iAccount.deposit.common.text_7') }} {{ withdrawBankInfo.chargeMoney | filterEmptyVal }}</span>
            <jf-icon v-if="withdrawBankInfo.chargeMoneyRemark" name="tips_gray" @click="_showTip(withdrawBankInfo.chargeMoneyRemark)"></jf-icon>
          </div>
        </li>
        <li class="cell">
          <div>
            <span>{{ $t('iAccount.deposit.common.text_8') }} {{ withdrawBankInfo.timeArrival | filterEmptyVal }}</span>
          </div>
        </li>
        <li v-if="withdrawBankInfo.effectiveTime" class="cell">
          <div>
            <span>{{ $t('iAccount.deposit.common.text_9') }} {{ withdrawBankInfo.effectiveTime }}</span>
          </div>
        </li>
      </ul>
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
  </jf-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { HKD, EMPTY_LABEL } from '@/modules/module-iaccount/define'
import { formatNumber, formatToDBC } from '@/modules/module-iaccount/utils/format'
import { format_CommitData_HK } from '@/modules/module-iaccount/format/withdraw'
import { format_getBankAccount } from '@/modules/module-iaccount/format/common'
import * as tips from '@/modules/module-iaccount/utils/tips'
// import userAgent from '@/modules/module-iaccount/utils/ua-parser'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

export default {
  mixins: [commonMixin],
  data() {
    const currencyOptions = this.$t('iAccount.define.CURRENCY')
    return {
      showCaptcha: false,
      bank_hk: [],
      currencyOptions: currencyOptions,
      money: '',
      accountLabel: '',
      accountValue: '',
      accountList: [],
      bankInfo: null,
      bankList: [],
      model: {
        currency: currencyOptions[0].value,
        withdrawMoney: ''
      }
    }
  },
  created() {
    // this._fetchMoney()
    this._formatAccount()
    this._fetchBankList()
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'withdrawBankInfo'
    ]),
    isBank_CN() {
      return true
    },
    isDisabled() {
      const { withdrawMoney, ...obj } = this.model
      const form_input = Object.values(obj).every(item => String(item).length) && Number(withdrawMoney)
      const isExistBank = this.bankInfo
      return !(form_input && isExistBank)
    },
    getCurrency() {
      return this.currencyOptions.find(item => item.value === Number(this.model.currency)) || {}
    },
    getAct() {
      const num = this.model.withdrawMoney - parseFloat(this.getCurrency.fee)
      return num >= 0 ? Number(formatNumber(num, { digit: 2 })).toFixed(2) : '0.00'
    }
  },
  methods: {
    _showTip(txt) {
      tips.jfDialog({
        btnTxt: this.$t('iAccount.common.text_10'),
        content: txt
      })
    },
    _fetchBankList() {
      // 香港卡出金
      SecApi.bankListWithdraw({
        bankType: 2
      }).then(res => {
        this.bank_hk = res
        // 再获取我的银行卡
        this._fetchDepositBank()
      })
    },
    _handleBefore() {
      return new Promise((resolve, reject) => {
        // 表单校验
        const {
          withdrawMoney
        } = this.model

        // 实际提取金额小于零
        if (Number(this.getAct) <= 0) {
          const msg = this.$t('iAccount.withdraw.request.text_35')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        if (this.getCurrency.code === HKD && Number(withdrawMoney) < 10) {
          const msg = this.$t('iAccount.withdraw.request.text_28')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        if (Number(withdrawMoney) > Number(this.money)) {
          const msg = this.$t('iAccount.withdraw.request.text_29')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        resolve()
      })
    },
    _handleNext() {
      // if (userAgent.isApp()) {
      //   // App 交易解锁
      //   window.JFSTOCK.tradeUnlock({
      //     success: (res) => {
      //       const result = JSON.parse(res.data)
      //       // 处理提取
      //       this._fetchWithdraw({
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
      //   this.showCaptcha = true
      // }
      this.showCaptcha = true
    },
    _closeCaptcha() {
      this.showCaptcha = false
    },
    _getCaptchaVal(val) {
      // 关闭交易密码弹框
      this._closeCaptcha()
      // 处理提取
      this._fetchWithdraw({ trd: val })
    },
    _fetchWithdraw(obj) {
      const formData = {
        money: this.money,
        chargeMoney: this.getCurrency.fee,
        bankInfo: this.bankInfo,
        ...obj,
        ...this.model
      }
      const data = this.$store.state
      const params = format_CommitData_HK(data, formData)
      console.log(params)
      this.$store.dispatch('apiToCommitCashOutData', params).then(() => {
        this.$router.push({ name: 'withdraw-notify' })
      })
    },
    _clickSelectCurrency(item) {
      console.log('点击币种切换', item)
      if (this.model.currency === item.value) return false
      this.model.currency = item.value
      this.money = ''
      this._fetchMoney()
    },
    // 获取可提资金
    _fetchMoney() {
      // 需要取柜台定义币种字段
      const currencyGt = this.getCurrency.gt;
      const params = {
        moneyType: currencyGt,
        fundAccount: this.accountValue,
      };
      SecApi.findExtractableMoney(params).then(res => {
        const temp = res.totalAmount
        this.money = Number(temp) <= 0 ? '0.00' : temp
      })
    },
    // 已绑定入金银行
    _fetchDepositBank() {
      const { fundAccount = [] } = this.secAccountInfo
      const params = {
        bankType: 2,
        // fundAccount: fundAccount[0]
      }
      SecApi.depositBank(params).then(res => {
        this._formatBank(res)
      })
    },
    // 格式化现金账号选项
    _formatAccount() {
         const { fundAccount = [] } = this.secAccountInfo;
      this.accountList = fundAccount.map((item) => {
        const { fundAccount: account, assetProp } = item;
        const txt =
          assetProp === "M"
            ? this.$t("iAccount.withdraw.request.text_2m")
            : this.$t("iAccount.withdraw.request.text_2");
        return {
          value: item.fundAccount,
          text: txt + " - " + item.fundAccount,
        };
      });
      // 默认选中第一项
      this.accountLabel = this.accountList[0].text;
      this.accountValue = this.accountList[0].value;
      this._fetchMoney();
    },
    // 格式化银行卡选项
    _formatBank(res = []) {
      if (!res.length) return
      this.bankList = res.map(item => {
        return {
          value: item.bankAccount,
          text: item.bankName + '-' + format_getBankAccount(item.bankAccount),
          ...item
        }
      })
      // 默认选中第一项
      this.bankInfo = this.bankList[0]
      this._judgeLimitBank(this.bankInfo)
    },
    _judgeLimitBank(item) {
      if (!item) return
      console.log(item, this.bank_hk)
      // 是否是已选中银行 - 并找出该银行
      const his_bank = this.bank_hk.find(bank => {
        const isSomeName = formatToDBC(bank.receiptBankName) === formatToDBC(item.bankName)
        const isSomeCode = bank.receiptBankCode === item.bankCode
        const isSomeType = bank.bankType === item.bankType
        return (isSomeName || isSomeCode) && isSomeType
      })
      console.log('his_bank', his_bank)

      // 处理其选中银行
      this.$store.dispatch('selectWithdrawBank', his_bank)
    },
    _clickSelectAccount() {
      if (!this.picker_account) {
        this.picker_account = this.$createPicker({
          title: '',
          confirmTxt: this.$t('iAccount.common.text_9'),
          cancelTxt: this.$t('iAccount.common.text_2'),
          data: [this.accountList],
          onSelect: this.selectHandle_account
        })
      }
      this.picker_account.show()
    },
    selectHandle_account(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      this.accountLabel = selectedText[0]
    },
    _clickSelectBank() {
      // 入金银行数据为空
      if (!this.bankList.length) {
        tips.jfDialog({
          render: (createElement) => {
            return createElement('p', null, [
              createElement('span', null, this.$t('iAccount.withdraw.request.text_30')),
              createElement('span', {
                class: {
                  'font-link': true
                },
                on: {
                  click: (e) => {
                    this.tellPhone(this.getPhone)
                  }
                }
              }, this.getPhone)
            ])
          }
        })
        return false
      }

      if (!this.picker_bank) {
        this.picker_bank = this.$createPicker({
          title: '',
          confirmTxt: this.$t('iAccount.common.text_9'),
          cancelTxt: this.$t('iAccount.common.text_2'),
          data: [this.bankList],
          onSelect: this.selectHandle_bank
        })
      }
      this.picker_bank.show()
    },
    selectHandle_bank(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText)
      const temp = this.bankList[selectedIndex[0]]
      // 民生银行_香港 - 弹框提醒
      if (formatToDBC(temp.bankName).indexOf(this.$t('iAccount.withdraw.select_bank.text_6')) !== -1) {
        this.showDialog_withdraw_cmbchk()
        return false
      } else {
        this.bankInfo = temp
        this._judgeLimitBank(temp)
      }
    },
    _clickSetAll() {
      this.model.withdrawMoney = this.money
    },
    _focusMoneyInput() {
      const old = this.model.withdrawMoney
      this.model.withdrawMoney = old && String(Number(old))
    },
    _blurMoneyInput() {
      const old = this.model.withdrawMoney
      this.model.withdrawMoney = old && (Number(old)).toFixed(2)
    },
    _getFee() {
      return formatNumber(this.getCurrency.fee, { digit: 2 })
    }
  },
  filters: {
    format_secAccountInfo(val) {
      return val ? (val.clientNameCn + ' - ' + val.clientNameEn) : EMPTY_LABEL
    }
  },
  watch: {
    'model.withdrawMoney': function(newVal, oldVal) {
      if (!newVal) return ''
      this.model.withdrawMoney = formatNumber(this.model.withdrawMoney, { digit: 2 })
    }
  }
}
</script>
