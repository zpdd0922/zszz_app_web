<template>
  <div class="statement">
    <div class="header">
      <div class="jd-type">
        <cube-select
          v-model="typeValue"
          :options="$t('iAccount.define.STATEMENT_TYPE_LIST')"
        ></cube-select>
      </div>
      <div class="jd-date">
        <div class="cube-select">
          <div @click="showDatePicker">{{dateValue}}</div>
          <i class="cube-select-icon"></i>
        </div>
      </div>
    </div>
    <div class="detail" v-if="isHasData">
      <cube-sticky :pos="scrollY">
        <cube-scroll
          :data="data"
          :scroll-events="scrollEvents"
          @scroll="scrollHandler"
        >
          <div>
            <div v-for="(item, index) in data" :key="index">
              <cube-sticky-ele :ele-key="item[0]">
                <p class="title">{{item[0]}}</p>
              </cube-sticky-ele>
              <ul class="list">
                <li v-for="(list, index) in item[1]" :key="index" class="item border-bottom-1px" @click="goPdf(list)">
                  <p :class="['date', list.type === 1 ? 'day' : 'month']">{{formatDate(list)}}</p>
                  <p class="type">{{formatType(list)}}</p>
                  <p class="pdf">查看PDF</p>
                </li>
              </ul>
            </div>
          </div>
        </cube-scroll>
        <template slot="fixed" slot-scope="props">
          <ul class="sticky-header">
            <li>{{props.current}}</li>
            <li @click="pwdTips">结单密码？</li>
          </ul>
        </template>
      </cube-sticky>
    </div>
    <template v-else>
      <empty-box tips="暂无相关内容"></empty-box>
    </template>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import { timestampToTime } from '@/modules/module-iaccount/utils/date'
import { getStatementsData } from './format'
import { openPDF } from '@/main/utils/native-app'
import tradeApi from '@/modules/module-iaccount/api/modules/api-trade'
import * as tips from '@/main/utils/common/tips'

export default {
  data () {
    return {
      typeValue: '',
      dateValue: '全部日期',
      dateYear: '', // 真是发往后台时间
      dateMonth: '', // 真是发往后台时间
      upIcon: false,
      scrollEvents: ['scroll'],
      scrollY: 0,
      data: [],
    }
  },
  computed: {
    ...mapGetters([
      'secAccountInfo'
    ]),
    isHasData() {
      return this.data.length
    }
  },
  methods: {
    fetchData() {
      const { fundAccount = [] } = this.secAccountInfo
      const params = {
        year: this.dateYear,
        month: this.dateMonth,
        type: this.typeValue,
        fundAccount: fundAccount[0],
      }
      tradeApi.getStatements(params).then(res => {
        this.data = getStatementsData(res)
      })
    },
    showDatePicker() {
      if (!this.datePicker) {
        this.datePicker = this.$createDatePicker({
          min: new Date(1979, 1, 1),
          max: new Date(),
          value: new Date(),
          columnCount: 2,
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.upIcon = true
      this.datePicker.show()
    },
    selectHandle(date, selectedVal, selectedText) {
      this.upIcon = false
      const text = selectedText.length && `${selectedText[0]}年-${selectedText[1]}月`
      this.dateValue = text
      this.dateYear = selectedText.length && selectedText[0]
      this.dateMonth = selectedText.length && selectedText[1]
    },
    cancelHandle() {
      console.log('1', 1)
    },
    // 格式化时间
    formatDate(data) {
      const { date,   type } = data
      if (type === 2) {
        return timestampToTime(date, 'M') + '月'
      }
      return timestampToTime(date, 'D') + '日'
    },
    // 格式化日月结单文案
    formatType(data) {
      const { type } = data
      if (type === 1) {
        return '日结单'
      }
      return '月结单'
    },
    scrollHandler({ y }) {
      this.scrollY = -y
    },
    goPdf({ pdf }) {
      if (pdf && pdf !== '') {
        openPDF({ url: pdf });
      }
    },
    pwdTips() {
      tips.jfDialog({
        content: '为保护您的结单安全，已对结单进行加密，秘密为开户证件号码的后六位，包括数字，字母和字符。'
      })
    }
  },
  mounted() {
    this.data = getStatementsData(this.data)

    // this.fetchData()
  }
}
</script>

<style scoped lang="scss">
.jd-type /deep/ .cube-select {
  &:after {
    border: none;
  }
}

.jd-date /deep/ .cube-select {
  &:after {
    border: none;
  }
}
@import './style';
</style>
