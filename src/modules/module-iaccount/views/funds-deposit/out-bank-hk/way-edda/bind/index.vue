<template>
  <div class="bind">
    <sec-wrap
      :isDisabled="btnStatus"
      :nextBtnFixed="false"
      :btnText="$t('iAccount.deposit.edda.bind.text_14')"
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
      <div class="error" v-show="errorStatus"><span>{{errorMsg}}</span></div>
      <div class="content">
        <div class="content-inner">
          <ul>
            <!-- 银行名称 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_1')}}</span>
              </div>
              <div class="form-filed">
                <span>{{depositBankData.title}}</span>
              </div>
            </li>
            <!-- 银行户名 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_2')}}</span>
              </div>
              <div class="form-filed">
                <span>{{model.depositAccountName}}</span>
              </div>
              <p class="tips">{{$t('iAccount.deposit.edda.bind.text_4')}}</p>
            </li>
            <!-- 银行账户类型 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_5')}}</span>
                <jf-icon name="tips_gray" @click.native.stop="_showTips()"></jf-icon>
              </div>
              <div class="form-filed">
                <cube-select
                  v-model="model.depositAccountType"
                  :options="$t('iAccount.define.DEPOSIT_ACCOUNT_TYPE')">
                </cube-select>
              </div>
            </li>
            <!-- 银行账号 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_7')}}</span>
              </div>
              <div class="form-filed">
                <div class="filed-flex">
                  <!-- <span class="bank_code">{{depositBankData.bankIdQuick}}-</span> -->
                  <cube-select
                    class="bank_code"
                    v-model="bankIdQuickValue"
                    :options="bankIdOptions">
                  </cube-select>
                  <input
                    type="tel"
                    :placeholder="$t('iAccount.deposit.edda.bind.text_8')"
                    v-model="model.depositAccount"
                  >
                </div>
              </div>
            </li>
            <!-- 银行开户证件类型 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_9')}}</span>
              </div>
              <div class="form-filed">
                <cube-select
                  v-model="model.bankIdKind"
                  :options="$t('iAccount.define.BANK_ID_KIND')"
                  @change="handleKind">
                </cube-select>
              </div>
            </li>
            <!-- 证件号码 -->
            <li>
              <div class="form-label">
                <span>{{$t('iAccount.deposit.edda.bind.text_10')}}</span>
              </div>
              <div class="form-filed">
                <div class="filed-item">
                  <template v-if="idNoDisabled">
                    <span>{{model.bankIdNo}}</span>
                  </template>
                  <template v-else>
                    <input
                      type="text"
                      :placeholder="$t('iAccount.deposit.edda.bind.text_11')"
                      v-model="model.bankIdNo"
                    >
                  </template>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div class="agreement">
          <span v-show="!agreeType" class="default-icon" @click="_changeAgreement"></span>
          <span v-show="agreeType" class="active-icon" @click="_changeAgreement"></span>
          <span class="act" @click="_changeAgreement">{{$t('iAccount.deposit.edda.bind.text_12')}}</span>
          <span class="agr" @click="goAgreement">{{$t('iAccount.deposit.edda.bind.text_13')}}</span>
        </div>
      </div>
    </sec-wrap>
    <div class="warn">
      <p>{{$t('iAccount.deposit.edda.bind.tips.text_1')}}</p>
      <p>{{$t('iAccount.deposit.edda.bind.tips.text_2')}}</p>
      <p>{{$t('iAccount.deposit.edda.bind.tips.text_3')}}</p>
    </div>
    <!-- 弹框 -->
    <div v-show="isShowEddaTips">
      <jf-dialog
        @onConfirm="_clickHide">
        <template v-slot:default>
          <div class="dialog">
            <p class="title">{{$t('iAccount.deposit.edda.bind.text_5')}}</p>
            <div>
              <p>{{$t('iAccount.deposit.edda.bind.tips.text_4')}}</p>
              <p>{{$t('iAccount.deposit.edda.bind.tips.text_5')}}</p>
            </div>
            <div>
              <p>{{$t('iAccount.deposit.edda.bind.tips.text_6')}}</p>
              <p>{{$t('iAccount.deposit.edda.bind.tips.text_7')}}</p>
            </div>
          </div>
        </template>
      </jf-dialog>
    </div>
    <div v-show="isShowAgrTips">
      <jf-dialog
        @onConfirm="_clickHide">

        <template v-slot:default>
          <div class="agr-list" v-html="$t('iAccount.deposit.edda.bind.tips.text_10')"></div>
        </template>
      </jf-dialog>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import validate from '@/modules/module-iaccount/utils/validate'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const GGREEMENT_TXT = [
  {
    title: '',
    list: [
      { txt: 'iAccount.deposit.edda.bind.tips.text_10' }
    ]
  },
  {
    title: 'iAccount.deposit.edda.bind.tips.text_11',
    list: [
      { txt: 'iAccount.deposit.edda.bind.tips.text_12' }
    ]
  },
  {
    title: 'iAccount.deposit.edda.bind.tips.text_13',
    list: [
      { txt: 'iAccount.deposit.edda.bind.tips.text_14' }
    ]
  }
]

export default {
  data () {
    return {
      items: GGREEMENT_TXT,
      model: {
        depositAccount: '',
        depositAccountName: '',
        depositAccountType: '',
        bankIdKind: '',
        bankIdNo: ''
      },
      bankIdQuickValue: '',
      bankIdQuickOptions: [],
      agreeType: false,
      errorStatus: false,
      errorMsg: '',
      isShowEddaTips: false,
      isShowAgrTips: false,
      fetUserInfo: {},
      idNoDisabled: false
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositWayInfo',
      'depositBankData',
      'depositBankType',
      'depositEddaInfo'
    ]),
    bankIdOptions() {
      const { bankIdQuick = '' } = this.depositBankData
      return bankIdQuick.split(',')
    },
    btnStatus() {
      const status = Object.values(this.model).some(item => item === '')
      if (status || !this.agreeType) {
        return true
      }
      return false
    }
  },
  methods: {
    updateData() {
      const { depositAccountType, bankIdKind, depositAccount, bankIdNo, bankId } = this.depositEddaInfo
      this.model.depositAccountName = this.secAccountInfo.clientNameEn
      const { id } = this.$route.query
      // 编辑授权信信息
      if (id) {
        this.model.depositAccountType = depositAccountType
        this.model.bankIdKind = bankIdKind
        this.model.depositAccountType = depositAccountType
        this.model.depositAccount = depositAccount
        this.model.bankIdNo = bankIdNo
        this.bankIdQuickValue = bankId
      } else {
        const options = this.bankIdOptions
        this.bankIdQuickValue = options[0]
      }
    },
    _showTips() {
      this.isShowEddaTips = true
    },
    // 是否勾选协议
    _changeAgreement() {
      this.agreeType = !this.agreeType
    },
    async getUserInfo() {
      const res = await SecApi.findUserInfo()
      // 证件类型与CUBP开户类型之间转换value
      switch (res.idKind) {
      case 1:
        this.fetUserInfo = { ...res, idKind: 1 }
        break
      case 2:
      case 4:
        this.fetUserInfo = { ...res, idKind: 3 }
        break
      case 3:
        this.fetUserInfo = { ...res, idKind: 4 }
        break
      default:
        // this.fetUserInfo = res
        break
      }
    },
    handleKind(value, text) {
      const { idKind, idNo } = this.fetUserInfo
      if (idKind === value) {
        this.model.bankIdNo = idNo
        this.idNoDisabled = true
      } else {
        this.idNoDisabled = false
        this.model.bankIdNo = ''
      }
    },
    handleBefore() {
      const { bankIdKind, bankIdNo, depositAccount } = this.model
      return new Promise((resolve, reject) => {
        if (!validate.isNumber(depositAccount)) {
          const msg = this.$t('iAccount.deposit.edda.bind.tips.text_15')
          this.errorStatus = true
          this.errorMsg = msg
          return reject(msg)
        }
        switch (bankIdKind) {
        case 1:
          if (!validate.isIdCard(bankIdNo)) {
            const msg = this.$t('iAccount.deposit.edda.bind.tips.text_9')
            this.errorStatus = true
            this.errorMsg = msg
            return reject(msg)
          }
          this.model.bankIdNo = this.model.bankIdNo.toUpperCase()
          break
        case 2:
          const start = bankIdNo.toUpperCase().startsWith('C')
          const end = !validate.isNumber(bankIdNo.slice(1)) || bankIdNo.length !== 8
          if (!start && end) {
            const msg = this.$t('iAccount.deposit.edda.bind.tips.text_9')
            this.errorStatus = true
            this.errorMsg = msg
            return reject(msg)
          }
          this.model.bankIdNo = `C${bankIdNo.slice(1)}`
          break
        case 3:
          // 提取数字
          const num = bankIdNo.replace(/[^0-9]/ig, '')
          // 提取字母
          const abs = bankIdNo.replace(/[^a-z]+/ig, '')
          if (num.length === 7) {
            const idNumHk = `${num.slice(0, 6)}(${num.slice(6, 7)})`
            this.model.bankIdNo = abs.toUpperCase() + idNumHk
          } else if (abs.length === 2 && num.length === 6) {
            const start = abs.slice(0, 1)
            const end = `(${abs.slice(1, 2)})`
            this.model.bankIdNo = start.toUpperCase() + num + end.toUpperCase()
          } else {
            const msg = this.$t('iAccount.deposit.edda.bind.tips.text_9')
            this.errorStatus = true
            this.errorMsg = msg
            return reject(msg)
          }
          break
        case 4:
          const reg = /^\w+$/
          const check = reg.test(this.model.bankIdNo)
          if (!check) {
            const msg = this.$t('iAccount.deposit.edda.bind.tips.text_9')
            this.errorStatus = true
            this.errorMsg = msg
            return reject(msg)
          }
          break
        default:
          break
        }
        resolve()
      })
    },
    _handleNext() {
      const { id } = this.$route.query
      const params = {
        bankType: this.depositBankType.value,
        clientId: this.secAccountInfo.tradeAccount,
        bankName: this.depositBankData.title,
        bankCode: this.depositBankData.value,
        bankId: this.bankIdQuickValue,
        fundAccount: this.secAccountInfo.fundAccount.length && this.secAccountInfo.fundAccount[0],
        keyId: id || '',
        ...this.model
      }
      if (id) {
        SecApi.eddaBankUpdate(params).then(res => {
          this.$router.push({ name: 'edda-notify' })
        })
      } else {
        SecApi.eddaBankSave(params).then(res => {
          this.$router.push({ name: 'edda-notify' })
        })
      }
    },
    _clickHide() {
      this.isShowEddaTips = false
      this.isShowAgrTips = false
    },
    resetError() {
      if (this.errorStatus) {
        this.errorStatus = false
        this.errorMsg = ''
      }
    },
    goAgreement() {
      this.$nextTick(() => {
        // 显示弹框
        this.isShowAgrTips = true
      })
    }
  },
  watch: {
    'model.depositAccount': function(newVal, oldVal) {
      this.resetError()
    },
    'model.depositAccountType': function(newVal, oldVal) {
      this.resetError()
    },
    'model.bankIdKind': function(newVal, oldVal) {
      this.resetError()
    },
    'model.bankIdNo': function(newVal, oldVal) {
      this.resetError()
    }
  },
  created() {
    this.getUserInfo()
    this.updateData()
  }
}
</script>

<style scoped>
/* @import './main' */
</style>
