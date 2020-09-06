<template>
  <div class="edda-list">
    <part-list
      :title="$t('deposit.edda.edda_list.title')"
      :isLink="false"
      :list="eddaCard"
      @clickItem="_clickAddAccount">
      <template v-slot:desc="slotProps">
        <div class="item">
          <div class="img"></div>
          <div class="content">
            <div class="name">
              <p>{{slotProps.item.bankName}}</p>
              <p :class="statusColor(slotProps.item)"><span>{{statusText(slotProps.item)}}</span></p>
            </div>
            <p class="account">{{slotProps.item.depositAccount | filterBankCard}}</p>
          </div>
          <div v-if="slotProps.item.eddaState === 2" class="del" @click.stop="_del(slotProps.item)"><span>{{$t('common.text_23')}}</span></div>
          <div v-if="slotProps.item.eddaState !== 2 && slotProps.item.eddaState !== 1" class="arrow"></div>
        </div>
      </template>
    </part-list>
    <div class="btn" @click="_clickBtn">
      <span class="add-icon"></span>
      <span class="txt">{{$t('deposit.edda.edda_list.text_1')}}</span>
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
import SecApi from '@/modules/module-iaccount/api/modules/api-sec'
import { mapGetters } from 'vuex'
import * as tips from '@/main/utils/common/tips'
import commonMixin from '@/modules/module-iaccount/mixins/common'
import { hideCode } from '@/modules/module-iaccount/utils/common'

export default {
  mixins: [commonMixin],
  data () {
    return {
      showCaptcha: false,
      eddaCard: []
    }
  },
  computed: {
    ...mapGetters([
      'accInfo',
      'depositBankData',
      'depositBankType'
    ])
  },
  methods: {
    async fetchBankList() {
      this.eddaCard = await this.fetchEddaList()
    },
    statusColor(item) {
      const { eddaState } = item
      const list = this.$t('define.EDDA_STATUS')
      return [`flag-${list[eddaState].value}`]
    },
    statusText(item) {
      const { eddaState } = item
      const list = this.$t('define.EDDA_STATUS')
      return list[eddaState].text
    },
    _clickAddAccount(item) {
      // 状态 0未授权 1授权中 2授权失败 3授权成功 4解除授权
      switch (item.eddaState) {
      case 0:
        break
      case 1:
        break
      case 2:
        this.$store.dispatch('selectEddaItem', item).then(() => {
          this.$router.push({ name: 'edda-detail' })
        })
        break
      case 3:
        this.$store.dispatch('selectEddaItem', item).then(() => {
          this.$router.push({ name: 'edda-remit', query: { type: 'active' } })
        })
        break
      case 4:
        break
      default:
        break
      }
    },
    _clickBtn() {
      this.showCaptcha = true
    },
    _del(item) {
      tips.confirm({
        title: this.$t('deposit.edda.edda_list.text_2'),
        content: this.$t('deposit.edda.edda_list.text_3'),
        onConfirm: () => {
          const params = {
            clientId: this.accInfo.tradeAccount,
            keyId: item.keyId
          }
          SecApi.eddaBankDelete(params).then(res => {
            this.fetchBankList()
            tips.toast({ txt: this.$t('deposit.edda.edda_list.text_4') })
          })
        }
      })
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
    }
  },
  filters: {
    filterBankCard(val) {
      return hideCode(val, 0, 4)
    }
  },
  mounted() {
    this.fetchBankList()
  }
}
</script>

<style scoped>
/* @import './main'; */
</style>
