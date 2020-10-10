<template>
  <div class="sec-ways">
    <sec-part-list
      :isLink="true"
      :list="waysOption"
      @clickItem="_clickWay">
      <template v-slot:desc="slotProps">
        <!-- eDDA -->
        <p v-if="slotProps.item.value === eDDA" class="sec-ways-desc">
          <span class="txt">
            {{$t('iAccount.deposit.common.text_8')}} {{$t('iAccount.define.EDDA_INFO').descTime}}
            <jf-icon name="tips_gray" @click.native.stop="_showTips($t('iAccount.define.EDDA_INFO').descTimeTips)"></jf-icon>
          </span>
          <span class="txt">{{$t('iAccount.deposit.common.text_7')}} {{$t('iAccount.define.EDDA_INFO').descFee}}</span>
        </p>
        <!-- fps -->
        <p v-if="slotProps.item.value === fps" class="sec-ways-desc">
          <span class="txt">
            {{$t('iAccount.deposit.common.text_8')}} {{fpsTip.descTime}}
            <jf-icon v-if="fpsTip.descTimeTips" name="tips_gray" @click.native.stop="_showTips(fpsTip.descTimeTips)"></jf-icon>
          </span>
          <span class="txt">
            {{$t('iAccount.deposit.common.text_7')}} {{fpsTip.descFee}}
            <jf-icon v-if="fpsTip.descFeeTips" name="tips_gray" @click.native.stop="_showTips(fpsTip.descFeeTips)"></jf-icon>
          </span>
        </p>
        <!-- ebank -->
        <p v-if="slotProps.item.value === ebank" class="sec-ways-desc">
          <span class="txt">
            {{$t('iAccount.deposit.common.text_8')}} {{depositBankData.descTime}}
            <jf-icon v-if="depositBankData.descTimeTips" name="tips_gray" @click.native.stop="_showTips(depositBankData.descTimeTips)"></jf-icon>
          </span>
          <span class="txt">
            {{$t('iAccount.deposit.common.text_7')}} {{depositBankData.descFee}}
            <jf-icon v-if="depositBankData.descFeeTips" name="tips_gray" @click.native.stop="_showTips(depositBankData.descFeeTips)"></jf-icon>
          </span>
        </p>
        <!-- check -->
        <p v-if="slotProps.item.value === check" class="sec-ways-desc">
          <span class="txt">{{$t('iAccount.deposit.common.text_8')}} {{$t('iAccount.define.CHECK_INFO').descTime}}</span>
          <span class="txt">{{$t('iAccount.deposit.common.text_7')}} {{$t('iAccount.define.CHECK_INFO').descFee}}</span>
        </p>
      </template>
    </sec-part-list>

    <!-- <foot-tip :list="waysNotice"></foot-tip> -->

    <div v-show="isShowWayTips">
      <jf-dialog
        :isScroll="true"
        :items="items"
        @onConfirm="_clickHide">
        <template v-slot:default="slotProps">
          <h6 class="title">{{ $t(slotProps.item.title) }}</h6>
          <ul class="content">
            <li
              v-for="(sub, ind) in slotProps.item.list"
              :key="ind">
              {{ typeof sub.txt === 'function' ? sub.txt(fpsTip) : $t(sub.txt) }}
            </li>
          </ul>
        </template>
      </jf-dialog>
    </div>

    <div v-show="isShowEddaTips">
      <jf-dialog
        @onConfirm="_clickHide">
        <template v-slot:default>
          <div>
            <div>
              <h6 class="title">{{$t('iAccount.deposit.edda.tips.text_1')}}</h6>
              <p>{{$t('iAccount.deposit.edda.tips.text_2')}}</p>
            </div>
            <div>
              <h6 class="title">{{$t('iAccount.deposit.edda.tips.text_3')}}</h6>
              <p>{{$t('iAccount.deposit.edda.tips.text_4')}}</p>
            </div>
          </div>
        </template>
      </jf-dialog>
    </div>

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/modules/module-iaccount/locale'
import { isFunc } from '@/modules/module-iaccount/utils/is'
import { FPS, EBANK, CHECK, EDDA, LIMIT_BANK } from '@/modules/module-iaccount/define'
import { format_DepositFPS } from '@/modules/module-iaccount/format/deposit'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import * as tips from '@/main/utils/common/tips'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'
import { formatToDBC } from '@/modules/module-iaccount/utils/format'

const WAYS_NOTICE = [
  {
    txt: 'iAccount.deposit.ways.text_10'
  }, {
    txt: (valHtml) => {
      return i18n.t('iAccount.deposit.ways.text_11', { config: valHtml })
    }
  }, {
    txt: 'iAccount.deposit.ways.text_12'
  }
]

const FPS_TIPS = [
  {
    title: 'iAccount.deposit.fps.tips.text_1',
    list: [
      { txt: 'iAccount.deposit.fps.tips.text_2' },
      { txt: 'iAccount.deposit.fps.tips.text_3' },
      { txt: 'iAccount.deposit.fps.tips.text_4' },
      { txt: 'iAccount.deposit.fps.tips.text_5' },
      { txt: 'iAccount.deposit.fps.tips.text_6' },
      { txt: 'iAccount.deposit.fps.tips.text_7' }
    ]
  }, {
    title: 'iAccount.deposit.fps.tips.text_8',
    list: [
      { txt: 'iAccount.deposit.fps.tips.text_9' },
      { txt: 'iAccount.deposit.fps.tips.text_10' },
      {
        txt: (val) => {
          return i18n.t('iAccount.deposit.fps.tips.text_11', { config: val.accountFPS })
        }
      },
      {
        txt: (val) => {
          return i18n.t('iAccount.deposit.fps.tips.text_12', { config: val.accountName })
        }
      },
      { txt: 'iAccount.deposit.fps.tips.text_13' },
      { txt: 'iAccount.deposit.fps.tips.text_14' }
    ]
  }
]

export default {
  mixins: [commonMixin],
  data() {
    return {
      fps: FPS,
      ebank: EBANK,
      check: CHECK,
      eDDA: EDDA,
      items: [],
      fpsTip: {},
      eDDATip: {},
      waysOption: [],
      isShowWayTips: false,
      isShowEddaTips: false,
      myBank: []
    }
  },
  created() {
    this._fetchBankUser()
    this._updateWays()
  },
  computed: {
    ...mapGetters([
      'secAccountInfo',
      'depositCurrency',
      'depositBankData',
      'depositBankType'
    ]),
    waysNotice() {
      return WAYS_NOTICE.map(item => {
        if (isFunc(item.txt)) {
          const valHtml = this.getAccountHmtl(this.secAccountInfo)
          item.txt = item.txt(valHtml)
        }
        return item
      })
    }
  },
  methods: {
    // 请求用户已绑定银行卡 - 香港卡
    _fetchBankUser() {
      // const { fundAccount = [] } = this.secAccountInfo
      SecApi.depositBank({
        bankType: this.$t('iAccount.define.BANK_HK').value,
        // fundAccount: fundAccount[0]
      }).then(res => {
        this.myBank = res || []
      })
    },
    // 获取当前支持入金方式
    async _updateWays() {
      const deposit_way = this.$t('iAccount.define.DEPOSIT_WAY')
      const ways = await this.judgeDepositWay(this.depositBankData.supportType, this.depositCurrency)
      this.waysOption = Object.values(deposit_way).filter(item => ways.includes(item.code))
      console.log('ways => _judgeDepositWay', this.waysOption)
      if (!this.waysOption.length) {
        tips.jfDialog({
          content: this.$t('iAccount.deposit.ways.text_13')
        })
        return false
      }
      // 若存在fps，额外接口获取信息
      if (ways.includes(deposit_way[FPS].code)) {
        const params = {
          depositType: deposit_way[FPS].code,
          bankType: this.depositBankType.value,
          key: this.depositBankData.value
        }
        const temp = await SecApi.typeSettingInfo(params)
        this.fpsTip = format_DepositFPS(temp)[0]
      }
    },
    _showTips(txt) {
      tips.jfDialog({
        content: txt
      })
    },
    _clickWay(item, key) {
      // 提示信息
      if (key === 'tips') {
        if (item.value === FPS) {
          this.items = FPS_TIPS
          // 加载标题栏tip内容
          this.$nextTick(() => {
            // 显示弹框
            this.isShowWayTips = true
          })
        } else if (item.value === EDDA) {
          this.isShowEddaTips = true
        }
      } else { // 跳转相应路由
        if (item.value !== EDDA) {
          // 是否是历史入金银行 - 并找出该银行
          const his_bank = this.myBank.find(bank => {
            const isSomeName = formatToDBC(bank.bankName) === formatToDBC(this.depositBankData.title)
            const isSomeCode = bank.bankCode === this.depositBankData.value
            const isSomeType = bank.bankType === this.depositBankType.value
            return (isSomeName || isSomeCode) && isSomeType
          })
          const linmit = this.myBank.filter(val => val.bindSource === 'other')
          // 是否超过入金银行数量限制
          const isLimit = !his_bank && linmit.length >= LIMIT_BANK
          // 超过限制 - 前往解绑
          if (isLimit) {
            tips.confirm({
              confirmTxt: this.$t('iAccount.common.text_17'),
              cancelTxt: this.$t('iAccount.common.text_3'),
              content: this.$t('iAccount.my_bank.text_13'),
              onConfirm: () => {
                this.$router.push({ name: 'my-bank' })
              }
            })
            return false
          }
        }
        // 对应入金方式
        this._gotoDetail(item)
      }
    },
    async _gotoDetail(item) {
      // 处理不同入金方式收款信息
      let params
      switch (item.value) {
      case EDDA:
        params = this.$t('iAccount.define.EDDA_INFO')
        break
      case FPS:
        params = this.fpsTip
        break
      case EBANK:
        params = this.depositBankData
        break
      case CHECK:
        params = this.$t('iAccount.define.CHECK_INFO')
        break
      }
      await this.$store.dispatch('setWayInfo', params)
      await this.$store.dispatch('selectWay', item)
      if (item.value === EDDA) {
        const list = await this.fetchEddaList()
        const status = list.find(item => item.eddaState === 3)
        if (status) {
          this.$router.push({ name: 'edda-remit' })
        } else {
          this.$router.push({ name: 'edda-list' })
        }
      } else {
        const name = (`sec-${item.value}-hk`).toLowerCase()
        this.$router.push({ name: name })
      }
    },
    _clickHide() {
      this.isShowWayTips = false
      this.isShowEddaTips = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import './style.scss';
</style>
