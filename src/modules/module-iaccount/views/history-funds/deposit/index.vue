<template>
  <jf-wrap
    class="funds-detail"
    :nextBtnShow="isShowBtn"
    :btnText="$t('iAccount.history.funds.text_12')"
    @handleNext="judgeDepositAgain(cacheData)">
    <funds-summary :lists="summarys"></funds-summary>

    <detail-list :copy="false" :lists="depositInfo">
      <template v-slot:filed="slotProps">
        <!-- 处理转账凭证 -->
        <template v-if="slotProps.item.accImgId || slotProps.item.accImgIdA">
          <div class="wrap-camera">
            <div
              v-if="slotProps.item.accImgId"
              class="camera-item"
              key="upload-accImgId">
              <camera
                picKey="accImgId"
                compType="example"
                :showAction="false"
                :file="accImgId_path"></camera>
            </div>
            <div
              v-if="slotProps.item.accImgIdA"
              class="camera-item"
              key="upload-accImgIdA">
              <camera
                picKey="accImgIdA"
                compType="example"
                :showAction="false"
                :file="accImgIdA_path"></camera>
            </div>
          </div>
        </template>
      </template>
    </detail-list>

    <div class="detail-list">
      <ul>
        <!-- 审核状态 -->
        <li key="state">
          <div class="label">
            <span>{{ $t('iAccount.history.funds.text_9') }}</span>
          </div>
          <div class="filed">
            <span :style="_getStatusColor(cacheData.state)">{{ cacheData.state | filterStateText }}</span>
          </div>
        </li>
        <!-- 退回时间 -->
        <li v-if="isShowReason" key="modifyTime">
          <div class="label">
            <span>{{ $t('iAccount.history.funds.text_10') }}</span>
          </div>
          <div class="filed">
            <span>{{ cacheData.modifyTime | filterDateTime }}</span>
          </div>
        </li>
        <!-- 退回原因 -->
        <li v-if="isShowReason">
          <div class="label">
            <span>{{ $t('iAccount.history.funds.text_11') }}</span>
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
import {
  HIS_DEPOSIT, EBANK,
  EMPTY_LABEL, CURRENCY_STATUS
} from '@/modules/module-iaccount/define'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

const SUMMARYS_DATA = [
  {
    title: 'iAccount.history.funds.text_16'
  }
]

const INFO_FRONT = [
  {
    title: 'iAccount.history.funds.text_1',
    custom: {
      value: (data) => {
        return timestampToTime(data.createdTime, 'YYYY-MM-DD hh:mm:ss')
      }
    }
  }, {
    title: 'iAccount.history.funds.text_2',
    custom: {
      value: (data) => {
        const { title } = i18n.t('iAccount.define.BANK_TYPE').find(item => item.value === data.bankType) || {}
        return title
      }
    }
  }, {
    title: 'iAccount.history.funds.text_3',
    key: 'remittanceBankName',
    custom: {
      value: 'remittanceBankName'
    }
  }, {
    title: 'iAccount.history.funds.text_4',
    key: 'remittanceBankAccount',
    custom: {
      value: (data) => {
        return formatStepSpace(data.remittanceBankAccount)
      }
    }
  }, {
    title: 'iAccount.history.funds.text_6',
    custom: {
      value: (data) => {
        // 根据bankCode判断
        // CHECK - 支票 FPS-fps转数快 其他-网银
        const val = (data.bankCode || '').toUpperCase()
        const deposit_way = i18n.t('iAccount.define.DEPOSIT_WAY')
        const wayKey = Object.keys(deposit_way).find(item => item === val) || EBANK
        return deposit_way[wayKey].title
      }
    }
  }, {
    title: 'iAccount.history.funds.text_7',
    custom: {
      value: (data) => {
        return data.depositAccount + '-' + data.depositAccountName
      }
    }
  }, {
    title: 'iAccount.history.funds.text_8',
    custom: {
      accImgId: 'accImgId',
      accImgIdA: 'accImgIdA'
    }
  }
]

export default {
  mixins: [commonMixin],
  data () {
    const cacheData = cookie.getJSONCookie(HIS_DEPOSIT)
    console.log('his_deposit', cacheData)
    return {
      cacheData,
      isShowBtn: false,
      accImgId_path: '',
      accImgIdA_path: ''
    }
  },
  created() {
    this._fetchImg()
    this._judgeIsShowBtn()
  },
  computed: {
    isShowReason() {
      return this.cacheData.state === CURRENCY_STATUS.options[2].value
    },
    depositInfo() {
      const temp = format_Form(INFO_FRONT, this.cacheData)
      // 隐藏未有数据
      const res = temp.filter(item => {
        if (item.key === 'remittanceBankName' || item.key === 'remittanceBankAccount') {
          return item.value
        }
        return true
      })
      console.log(temp, res)
      return res
    },
    summarys() {
      console.log(11111111111111111111, this.$t('iAccount.define.CURRENCY'))
      const current = this.$t('iAccount.define.CURRENCY').find(item => item.value === this.cacheData.currency) || {}
      
      return SUMMARYS_DATA.map(item => {
        return {
          ...item,
          money: this.cacheData.depositMoney,
          currency: current.label,
          iconName: current.iconName
        }
      })
    }
  },
  methods: {
    _fetchImg() {
      const { accImgId, accImgIdA } = this.cacheData
      const imgs = [accImgId, accImgIdA].filter(Boolean).join(',')
      if (!imgs) return
      SecApi.getImg({ imgIds: imgs }).then(res => {
        this.accImgId_path = res[0] ? res[0].imgPath : ''
        this.accImgIdA_path = res[1] ? res[1].imgPath : ''
      })
    },
    async _judgeIsShowBtn() {
      const res = await this.getDepositAgainBank(this.cacheData)
      const { remittanceBankCorde } = this.cacheData
      if (res && remittanceBankCorde) {
        this.isShowBtn = true
      } else {
        this.isShowBtn = false
      }
    },
    _getStatusColor(val) {
      return { color: CURRENCY_STATUS.options[val].color || '' }
    }
  },
  filters: {
    filterStateText(val) {
      return CURRENCY_STATUS.options[val] ? i18n.t(CURRENCY_STATUS.options[val].text) : EMPTY_LABEL
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

<style lang='scss' scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.wrap-camera {
  @include clearfix();
  padding-top: .04rem;
  .camera-item {
    float: left;
    margin-right: .1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
