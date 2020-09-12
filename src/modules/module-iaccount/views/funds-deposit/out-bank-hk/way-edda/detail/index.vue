<template>
  <div class="detail">
    <sec-wrap
      :isDisabled="false"
      :nextBtnFixed="false"
      :btnText="$t('iAccount.common.text_22')"
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
      <div class="error-info">
        <div class="info-wrap">
          <div class="box">
            <div class="title">
              <p class="img"></p>
              <p>{{$t('iAccount.deposit.edda.bind.text_15')}}</p>
            </div>
            <div class="desc">{{depositEddaInfo.eddaFailReason}}</div>
          </div>
        </div>
      </div>
      <div class="content">
        <div class="content-inner">
          <div class="way-detail">
            <ul class="detail-form-new">
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_1')}}</div>
                <div class="form-filed">{{depositEddaInfo.bankName}}</div>
              </li>
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_2')}}</div>
                <div class="form-filed">{{depositEddaInfo.depositAccountName}}</div>
              </li>
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_5')}}</div>
                <div class="form-filed">{{_depositAccountType}}</div>
              </li>
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_7')}}</div>
                <div class="form-filed">{{depositEddaInfo.depositAccount}}</div>
              </li>
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_9')}}</div>
                <div class="form-filed">{{_bankIdKind}}</div>
              </li>
              <li>
                <div class="form-label">{{$t('iAccount.deposit.edda.bind.text_10')}}</div>
                <div class="form-filed">{{depositEddaInfo.bankIdNo}}</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </sec-wrap>
    <div class="btn" @click="delHandle">{{$t('iAccount.common.text_23')}}</div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'
import * as tips from '@/main/utils/common/tips'

export default {
  data () {
    return {
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
    _bankIdKind() {
      let type = ''
      const { bankIdKind } = this.depositEddaInfo
      switch (bankIdKind) {
      case 1:
        type = this.filterKind(bankIdKind)
        break
      case 2:
        type = this.filterKind(bankIdKind)
        break
      case 3:
        type = this.filterKind(bankIdKind)
        break
      case 4:
        type = this.filterKind(bankIdKind)
        break
      default:
        break
      }
      return type
    },
    _depositAccountType() {
      let type = ''
      const { depositAccountType } = this.depositEddaInfo
      switch (depositAccountType) {
      case 1:
        type = this.filterType(depositAccountType)
        break
      case 2:
        type = this.filterType(depositAccountType)
        break
      default:
        break
      }
      return type
    }
  },
  methods: {
    filterKind(value) {
      const list = this.$t('iAccount.define.BANK_ID_KIND')
      return list.filter(data => data.value === value)[0].text
    },
    filterType(value) {
      const list = this.$t('iAccount.define.DEPOSIT_ACCOUNT_TYPE')
      return list.filter(data => data.value === value)[0].text
    },
    delHandle() {
      tips.confirm({
        content: this.$t('iAccount.common.text_24'),
        onConfirm: () => {
          const params = {
            clientId: this.secAccountInfo.tradeAccount,
            keyId: this.depositEddaInfo.keyId
          }
          SecApi.eddaBankDelete(params).then(() => {
            this.$router.replace({ name: 'edda-list' })
          })
        }
      })
    },
    _handleNext() {
      this.$router.push({ name: 'edda-bind', query: { id: this.depositEddaInfo.keyId } })
    }
  }
}
</script>

<style scoped>
/* @import './main' */
</style>
