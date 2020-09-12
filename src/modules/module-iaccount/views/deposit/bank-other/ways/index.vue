<template>
  <div class="ways">
    <head-bank
      :styleObj="{
        background: depositBankData.bgColor,
        boxShadow: `0px .07rem .16rem 0px ${depositBankData.shadowColor}`
      }"
      :bank="depositBankData">
    </head-bank>

    <part-list
      :title="$t('iAccount.deposit.ways.text_1')"
      :isLink="true"
      :list="waysOption"
      @clickItem="_clickWay">
      <template v-slot:desc="slotProps">
        <!-- fps -->
        <p v-if="slotProps.item.value === fps" class="desc">
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
        <p v-if="slotProps.item.value === ebank" class="desc">
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
        <p v-if="slotProps.item.value === check" class="desc">
          <span class="txt">{{$t('iAccount.deposit.common.text_8')}} {{$t('iAccount.define.CHECK_INFO').descTime}}</span>
          <span class="txt">{{$t('iAccount.deposit.common.text_7')}} {{$t('iAccount.define.CHECK_INFO').descFee}}</span>
        </p>
      </template>
    </part-list>

    <foot-tip :list="waysNotice"></foot-tip>

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

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import i18n from '@/modules/module-iaccount/locale'
import { isFunc } from '@/modules/module-iaccount/utils/is'
import { FPS, EBANK, CHECK } from '@/modules/module-iaccount/define'
import { format_DepositFPS } from '@/modules/module-iaccount/format/deposit'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import * as tips from '@/main/utils/common/tips'
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'

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
      items: [],
      fpsTip: {},
      waysOption: [],
      isShowWayTips: false
    }
  },
  created() {
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
      switch (key) {
      case 'tips':
        // 加载标题栏tip内容
        this.items = FPS_TIPS
        this.$nextTick(() => {
          // 显示弹框
          this.isShowWayTips = true
        })
        break
      default:
        // 对应入金方式
        this._gotoDetail(item)
        break
      }
    },
    _gotoDetail(item) {
      // 处理不同入金方式收款信息
      let params
      switch (item.value) {
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
      this.$store.dispatch('setWayInfo', params)
      this.$store.dispatch('selectWay', item).then(() => {
        const name = (`${item.value}-other`).toLowerCase()
        this.$router.push({ name: name })
      })
    },
    _clickHide() {
      this.isShowWayTips = false
    }
  }
}
</script>

<style lang="scss" scoped >
@import './style.scss';
</style>
