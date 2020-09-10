<template>
  <jf-wrap
    class="funds-detail"
    :nextBtnShow="isShowBtn"
    :btnText="$t('history.funds.text_13')"
    @handleNext="_clickCancel">
    <funds-summary :lists="summarys"></funds-summary>

    <detail-list :copy="false" :lists="dataInfo"></detail-list>

    <div class="detail-list">
      <ul>
        <!-- 审核状态 -->
        <li key="state">
          <div class="label">
            <span>{{ $t('history.funds.text_9') }}</span>
          </div>
          <div class="filed">
            <span :style="_getStatusColor(cacheData.state)">{{ cacheData.state | filterStateText }}</span>
          </div>
        </li>
        <!-- 退回时间 -->
        <li v-if="isShowReason" key="modifyTime">
          <div class="label">
            <span>{{ $t('history.funds.text_10') }}</span>
          </div>
          <div class="filed">
            <span>{{ cacheData.modifyTime | filterDateTime }}</span>
          </div>
        </li>
        <!-- 退回原因 -->
        <li v-if="isShowReason">
          <div class="label">
            <span>{{ $t('history.funds.text_11') }}</span>
          </div>
          <div class="filed">
            <span :style="_getStatusColor(cacheData.state)">{{ cacheData.backReason | filterEmptyVal }}</span>
          </div>
        </li>
      </ul>
    </div>
  </jf-wrap>
</template>

<script>
import i18n from '@/modules/module-iaccount/locale'
import { FundsSummary } from '../components'
import { format_Form } from '@/modules/module-iaccount/format/common'
import { timestampToTime } from '@/modules/module-iaccount/utils/date'
import { formatStepSpace } from '@/modules/module-iaccount/utils/format'
import cookie from '@/modules/module-iaccount/utils/cookie'
import * as tips from '@/modules/module-iaccount/utils/tips'
import {
  HIS_WITHDRAW, EMPTY_LABEL, CURRENCY_OUT_STATUS
} from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const SUMMARYS_DATA = [
  {
    title: 'history.funds.text_17'
  }
]

const INFO_FRONT = [
  {
    title: 'history.funds.text_1',
    custom: {
      value: (data) => {
        return timestampToTime(data.createdTime, 'YYYY-MM-DD hh:mm:ss')
      }
    }
  }, {
    title: 'history.funds.text_2',
    custom: {
      value: (data) => {
        const { title } = i18n.t('define.BANK_TYPE').find(item => item.value === data.extMethod) || {}
        return title
      }
    }
  }, {
    title: 'history.funds.text_3',
    custom: {
      value: 'bankName'
    }
  }, {
    title: 'history.funds.text_4',
    custom: {
      value: (data) => {
        return formatStepSpace(data.bankAccount)
      }
    }
  }, {
    title: 'history.funds.text_5',
    custom: {
      value: (data) => {
        return data.extAccount + '-' + data.extAccountName
      }
    }
  }
]

export default {
  mixins: [commonMixin],
  data () {
    const cacheData = cookie.getJSONCookie(HIS_WITHDRAW)
    console.log('his_withdraw', cacheData)
    return {
      cacheData
    }
  },
  created() {},
  computed: {
    isShowReason() {
      return this.cacheData.state === CURRENCY_OUT_STATUS.options[2].value
    },
    isShowBtn() {
      // 待审核
      return this.cacheData.state === CURRENCY_OUT_STATUS.options[0].value
    },
    dataInfo() {
      return format_Form(INFO_FRONT, this.cacheData)
    },
    summarys() {
      const current = this.$t('define.CURRENCY').find(item => item.value === this.cacheData.currency) || {}
      return SUMMARYS_DATA.map(item => {
        return {
          ...item,
          money: this.cacheData.extractionAmount,
          currency: current.label,
          iconName: current.iconName
        }
      })
    }
  },
  methods: {
    _getStatusColor(val) {
      return { color: CURRENCY_OUT_STATUS.options[val].color || '' }
    },
    _clickCancel() {
      tips.confirm({
        confirmTxt: this.$t('common.text_9'),
        cancelTxt: this.$t('common.text_2'),
        content: this.$t('history.funds.text_14'),
        onConfirm: () => {
          this._fetchCancel()
        }
      })
    },
    _fetchCancel() {
      SecApi.cancelWithdrawal({ id: this.cacheData.id }).then(() => {
        tips.toast({
          txt: this.$t('history.funds.text_15'),
          onTimeout: () => {
            this.$router.go(-1)
          }
        })
      })
    }
  },
  filters: {
    filterStateText(val) {
      return CURRENCY_OUT_STATUS.options[val] ? i18n.t(CURRENCY_OUT_STATUS.options[val].text) : EMPTY_LABEL
    },
    filterDateTime(val) {
      return val ? timestampToTime(val, 'YYYY-MM-DD hh:mm:ss') : EMPTY_LABEL
    }
  },
  components: {
    FundsSummary
  }
}

</script>
