<template>
  <sec-wrap
    class="remit"
    :isDisabled="isDisabled"
    :btnText="$t('iAccount.deposit.common.text_6')"
    :handleBefore="_handleBefore"
    @handleNext="_handleNext">
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
          <ul class="detail-form">
            <!-- 收款银行 -->
            <li v-if="isShowOther">
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_14') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <cube-select
                    v-model="bankCode"
                    :options="bankOptions"
                    @change="_changeBank">
                  </cube-select>
                </div>
              </div>
            </li>
            <!-- 银行户名 -->
            <li>
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_1') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <span class="txt">{{secAccountInfo.clientNameCn}} （{{secAccountInfo.clientNameEn}}）</span>
                </div>
              </div>
            </li>

            <!-- 选择其他银行 -->
            <li v-if="isShowOther">
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_12') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <span
                    v-if="depositBankHis && depositBankHis.bankName"
                    class="txt">{{model.depositBankNameOther}}</span>

                  <input
                    v-else
                    v-model="model.depositBankNameOther"
                    type="text"
                    maxlength="150"
                    :placeholder="$t('iAccount.deposit.remit.text_13')">
                </div>
                <div class="filed-msg" v-show="!(depositBankHis && depositBankHis.bankName) && model.depositBankNameOther">
                  <span class="txt font-link-size" @click="_clearInput('model.depositBankNameOther')">{{ $t('iAccount.common.text_16') }}</span>
                </div>
              </div>
            </li>
            <!-- 汇款账号选择框 -->
            <li>
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_2') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <cube-select
                    v-model="depositSelectBankAccount"
                    :options="myBankOptions"
                    @change="_handleAccount"
                  >
                  </cube-select>
                </div>
              </div>
            </li>
            <!-- 汇款账号 -->
            <li v-if="isNoaddAccount">
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_2') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <input
                    v-model="model.depositBankAccount"
                    type="text"
                    maxlength="30"
                    :placeholder="$t('iAccount.deposit.remit.text_5')">
                </div>
                <div class="filed-msg" v-show="!(depositBankHis && depositBankHis.bankAccount) && model.depositBankAccount">
                  <span class="txt font-link-size" @click="_clearInput('model.depositBankAccount')">{{ $t('iAccount.common.text_16') }}</span>
                </div>
              </div>
            </li>

            <!-- 需要再次确认账号 -->
            <!-- <li v-if="!(depositBankHis && depositBankHis.bankAccount)"> -->
            <li v-if="isNoaddAccount">
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_3') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <input
                    v-model="model.depositBankAccountAgain"
                    type="text"
                    maxlength="30"
                    :placeholder="$t('iAccount.deposit.remit.text_5')">
                </div>
                <div class="filed-msg" v-show="model.depositBankAccountAgain">
                  <span class="txt font-link-size" @click="_clearInput('model.depositBankAccountAgain')">{{ $t('iAccount.common.text_16') }}</span>
                </div>
              </div>
            </li>
            <!-- 存入金额 -->
            <li>
              <div class="form-label">
                <span>{{ $t('iAccount.deposit.remit.text_4') }}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item border-bottom-1px">
                  <input
                    v-model="model.depositMoney"
                    type="text"
                    :placeholder="$t('iAccount.deposit.remit.text_6')"
                    @focus="_focusMoneyInput"
                    @blur="_blurMoneyInput">
                </div>
                <div class="filed-msg">
                  <span class="txt">{{ depositCurrency.label }}</span>
                </div>
              </div>
            </li>
          </ul>

          <wrap-upload
            @upload="_getImgId"
            @del="_delImgId"
            :exampleImg="_getExampleImg"></wrap-upload>
        </div>
      </div>
    </div>

    <foot-tip :list="dataRemit.foot"></foot-tip>
  </sec-wrap>
</template>

<script>
import { mapGetters } from 'vuex'
import { WrapUpload } from '@/modules/module-iaccount/views/deposit/components'
import { formatNumber, formatToDBC, formatStepSpace } from '@/modules/module-iaccount/utils/format'
import { format_CommitData } from '@/modules/module-iaccount/format/deposit'
import * as tips from '@/main/utils/common/tips'
import { OTHER, LIMIT_BANK } from '@/modules/module-iaccount/define'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const EXAMPLE_BANK = {
  foot: [
    {
      txt: 'iAccount.deposit.remit.text_8'
    }
  ]
}

export default {
  data() {
    return {
      dataRemit: EXAMPLE_BANK,
      file: {},
      depositSelectBankAccount: '',
      model: {
        depositBankNameOther: '',
        depositBankAccount: '',
        depositBankAccountAgain: '',
        depositMoney: '',
        remarks: ''
      },
      bankOptions: [],
      myBankOptions: [],
      bankName: '',
      bankCode: ''
    }
  },
  created() {
    this._updateInfo()
    this._getBankOptions()
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositWay',
      'depositWayInfo',
      'depositBankHis',
      'depositCurrency',
      'depositBankData',
      'depositBankType'
    ]),
    isShowOther() {
      return this.depositBankData && this.depositBankData.value === OTHER
    },
    // 不是新增汇款账号
    isNoaddAccount() {
      return this.depositSelectBankAccount === 'add'
    },
    _getExampleImg() {
      // 示例图
      // return this.depositBankData.depositCertImg || require('assets/images/example/deposit.jpg')
      return this.depositBankData.depositCertImg || require('@/modules/module-iaccount/assets/img/example/deposit.jpg')
    },
    isDisabled() {
      const { remarks, depositBankNameOther, depositBankAccountAgain, depositMoney, ...obj } = this.model
      const formInput = Object.values(obj).every(item => item.length) && Number(depositMoney)
      // const formFile = Object.values(this.file).some(item => String(item).length)
      // const temp = Object.values(this.depositBankData).length && formInput && formFile
      const temp = Object.values(this.depositBankData).length && formInput
      // 选择其他银行
      const result = this.isShowOther ? temp && depositBankNameOther.length : temp
      // 存在历史入金银行
      // const isEmpty = (this.depositBankHis && this.depositBankHis.bankAccount) ? result : depositBankAccountAgain.length && result
      const isEmpty = this.depositSelectBankAccount !== 'add' ? result : depositBankAccountAgain.length && result
      console.log('isDisabled-cn', formInput, result, isEmpty)
      return !isEmpty
    }
  },
  methods: {
    // _updateInfo() {
    //   const { bankAccount = '', bankName = '' } = this.depositBankHis || {}
    //   this.model.depositBankNameOther = bankName
    //   this.model.depositBankAccount = bankAccount
    // },
    async _updateInfo() {
      // const { fundAccount = [] } = this.secAccountInfo
      const myBank = await SecApi.depositBank({
        bankType: this.$t('iAccount.define.BANK_CN').value,
        // fundAccount: fundAccount[0]
      })
      const bank = myBank.filter(val => formatToDBC(val.bankName) === formatToDBC(this.depositBankData.title))
        .map(val => {
          return {
            value: val.bankAccount,
            text: val.bankAccount
          }
        })
      // 是否超过入金银行数量限制
      const limit = myBank.filter(val => val.bindSource !== 'edda')
      const isLimit = limit.length >= LIMIT_BANK
      if (isLimit) {
        this.myBankOptions = bank
      } else {
        this.myBankOptions = [...bank, ...[{ value: 'add', text: '新增汇款账号' }]]
      }
      const { bankAccount = '', bankName = '' } = this.depositBankHis || {}
      this.depositSelectBankAccount = bankAccount
      this.model.depositBankAccount = bankAccount
      this.model.depositBankNameOther = bankName
    },
    _handleBefore() {
      return new Promise((resolve, reject) => {
        // 表单校验
        const {
          depositBankAccount, depositBankAccountAgain
        } = this.model
        // 过滤历史入金银行存在情况
        if (this.depositSelectBankAccount === 'add' &&
          (depositBankAccount !== depositBankAccountAgain)
        ) {
          const msg = this.$t('iAccount.deposit.remit.text_11')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        // 未选择收款银行
        if (!this.bankCode && this.isShowOther) {
          const msg = this.$t('iAccount.deposit.remit.text_15')
          tips.toast({ txt: msg })
          return reject(msg)
        }

        const { fundAccount = [], tradeAccount } = this.secAccountInfo
        const params = {
          clientId: tradeAccount,
          depositAccount: fundAccount[0],
          remittanceBankAccount: formatNumber(this.model.depositBankAccount)
        }
        const formFile = Object.values(this.file).some(item => String(item).length)
        if (this.bankCode === 'DBS') {
          SecApi.saveMoneyCheckAccount(params).then(res => {
            if (res.count) {
              resolve()
            } else if (!formFile) {
              const msg = this.$t('iAccount.deposit.remit.text_16')
              tips.toast({ txt: msg })
              return reject(msg)
            } else {
              resolve()
            }
          })
        } else {
          if (!formFile) {
            const msg = this.$t('iAccount.deposit.remit.text_16')
            tips.toast({ txt: msg })
            return reject(msg)
          } else {
            resolve()
          }
        }
      })
    },
    // 切换银行卡
    _changeBank(value, index, text) {
      this.bankCode = value
      this.bankName = text
    },
    // 加载收款银行信息
    _getBankOptions() {
      this.bankOptions = this.$t('iAccount.define.BANK_NAME_OPTIONS')
    },
    // 切换汇款账号
    _handleAccount(value, index, text) {
      if (value === 'add') {
        this.model.depositBankAccount = ''
        this.model.depositBankAccountAgain = ''
        this.model.depositMoney = ''
        return
      }
      this.model.depositBankAccount = value
    },
    _handleNext() {
      const data = this.$store.state
      const formData = Object.assign({}, this.model, { img: this.file })
      const params = format_CommitData(data, formData)
      // 表单信息缺少 - 需重新入金
      if (!params) {
        tips.jfDialog({
          content: this.$t('iAccount.deposit.common.text_11'),
          onConfirm: () => {
            this.$router.push({ name: 'deposit' })
          }
        })
        return false
      }
      this.$store.dispatch('apiSaveIntoMoney', params).then(res => {
        this.$router.push({ name: "sec-deposit-notify" })
      }).catch((error) => {
        const { message } = error
        tips.alert({ content: message })
      })
    },
    _focusMoneyInput() {
      const old = this.model.depositMoney
      this.model.depositMoney = old && String(Number(old))
    },
    _blurMoneyInput() {
      const old = this.model.depositMoney
      this.model.depositMoney = old && (Number(old)).toFixed(2)
    },
    _clearInput(key) {
      const [obj, sub] = key.split('.')
      if (sub) {
        this.$set(this[obj], sub, '')
      } else {
        this[obj] = ''
      }
    },
    _getImgId(key, res) {
      const { imgId } = res
      this.$set(this.file, [key], imgId)
    },
    _delImgId(key) {
      this.$set(this.file, [key], '')
    }
  },
  watch: {
    'model.depositBankAccount': function(newVal, oldVal) {
      if (!newVal) return ''
      const num = formatNumber(formatToDBC(newVal))
      this.model.depositBankAccount = formatStepSpace(num)
    },
    'model.depositBankAccountAgain': function(newVal, oldVal) {
      if (!newVal) return ''
      const num = formatNumber(formatToDBC(newVal))
      this.model.depositBankAccountAgain = formatStepSpace(num)
    },
    'model.depositMoney': function(newVal, oldVal) {
      if (!newVal) return ''
      this.model.depositMoney = formatNumber(this.model.depositMoney, { digit: 2 })
    }
  },
  components: {
    WrapUpload
  }
}
</script>