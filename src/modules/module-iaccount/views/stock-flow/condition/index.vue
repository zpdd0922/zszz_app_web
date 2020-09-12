<template>
  <div class="condition">
    <div class="title">
      <p :class="{'active': isFilterCriteria}" @click="toggleArrow('isFilterCriteria')">{{$t('iAccount.capital_flow.common.text_3')}}<i :class="{'active': isFilterCriteria, 'arrow': true}"></i></p>
      <span></span>
      <p v-if="dataFilter.key" @click="toggleArrow('isDate')"  :class="{'active': isDate}">{{$t(`iAccount.capital_flow.common.${dataFilter.text}`)}}<i :class="{'active': isDate, 'arrow': true}"></i></p>
      <p v-if="dataFilter.date" @click="toggleArrow('isDate')" :class="{'active': isDate}">
        <span class="date-show">
          <span>{{dataFilter.date.start}}</span>
          <span>{{dataFilter.date.end}}</span>
        </span>
        <i :class="{'active': isDate, 'arrow': true}"></i>
      </p>
    </div>
    <!-- 筛选 -->
    <div class="selsct-card" v-show="isFilterCriteria || isDate">
      <!-- 筛选条件 -->
      <div v-show="isFilterCriteria" class="filter-criteria">
        <ul>
          <li v-for="(item,idx) in filterCriteriaArr" :key="idx">
            <p class="title">{{$t(`iAccount.capital_flow.common.${item.title}`)}}</p>
            <p class="items">
              <span
                v-for="(items,index) in item.option"
                :key="index"
                :class="{'active':
                  item.type === 'businessType' && (businessTypeSel ? (items.key === businessTypeSel.key) : items.default) ||
                  item.type === 'marketType' && (marketTypeSel ? (items.key === marketTypeSel.key) : items.default) ||
                  item.type === 'capitalFlow' && (capitalFlowSel ? (items.key === capitalFlowSel.key) : items.default)
                }"
                @click="changeCondition(0,item.type, items)">
                {{$t(`iAccount.capital_flow.common.${items.text}`)}}
              </span>
            </p>
          </li>
        </ul>
      </div>
      <!-- 筛选日期 -->
      <div v-show="isDate" class="date-filter">
        <p class="title">{{$t('iAccount.capital_flow.common.text_8')}}</p>
        <div class="items">
          <span
             v-for="(item,index) in dataFilterArr.option"
            :key="index"
            :class="{'active': dataFilterSel ? (item.key === dataFilterSel.key) : (item.default)}"
            @click="changeCondition(1,dataFilterArr.type, item)">
              {{$t(`iAccount.capital_flow.common.${item.text}`)}}
          </span>
        </div>
        <div class="date-select">
          <div>
            <input @click="showDatePicker(0)"  type="text" v-model="startDate" readonly :placeholder="$t('iAccount.capital_flow.common.text_22')" />
            <span>{{$t('iAccount.capital_flow.common.text_23')}}</span>
            <input @click="showDatePicker(1)" type="text" v-model="endDate" readonly :placeholder="$t('iAccount.capital_flow.common.text_24')" />
          </div>
          <p v-show="isTipShow"><i></i>{{$t('iAccount.capital_flow.common.text_25')}}</p>
        </div>
      </div>
      <div class="btn-wrap">
        <p class="cancel" @click="reSet">{{$t('iAccount.common.text_21')}}</p>
        <p :class="{'ok': true, 'disabled': isTipShow }" @click="commit">{{$t('iAccount.common.text_9')}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { timestampToTime, timeTotimestamp } from '@/modules/module-iaccount/utils/date'
// 筛选条件
const conditionArr = [
  {
    title: 'text_9',
    type: 'businessType',
    option: [
      { text: 'text_12', key: 'all', default: true },
      { text: 'text_32', key: 'secFund' },
      { text: 'text_14', key: 'newStock' },
      { text: 'text_15', key: 'secTransact' },
      { text: 'text_16', key: 'com' },
      { text: 'text_17', key: 'other' }
    ]
  },
  {
    title: 'text_28',
    type: 'marketType',
    option: [
      { text: 'text_12', key: 'all', default: true },
      { text: 'text_29', key: 'K' },
      { text: 'text_30', key: 'P' }
    ]
  },
  {
    title: 'text_33',
    type: 'capitalFlow',
    option: [
      { text: 'text_12', key: 'all', default: true },
      { text: 'text_20', key: '1' },
      { text: 'text_21', key: '-1' }
    ]
  }
]
// 选择日期
const dataFilterArr = {
  type: 'dataFilter',
  option: [
    { text: 'text_4', key: '0' },
    { text: 'text_5', key: '1' },
    { text: 'text_6', key: '2' },
    { text: 'text_7', key: '3', default: true }
  ]
}

export default {
  props: {
    stockRecordInfo: {
      required: true,
      type: Function
    }
  },
  data() {
    return {
      isFilterCriteria: false, // 筛选条件
      isDate: false, // 日期选择
      filterCriteriaArr: JSON.parse(JSON.stringify(conditionArr)),
      dataFilterArr: JSON.parse(JSON.stringify(dataFilterArr)), // 日期选项
      datePicker: null,
      startDate: null, // 开始日期
      endDate: null, // 结束日期
      dateActiveIdx: 0, // 0 选择起始日期  1 选择结束日期
      isTipShow: false, // 是否显示时间跨度超过两个年提示
      dataFilterSel: null, // 日期(当前选择)
      capitalFlowSel: null, // 资金流向(当前选择)
      marketTypeSel: null, // 市场(当前选择)
      businessTypeSel: null, // 业务类型(当前选择)
      isCommit: false
    }
  },
  computed: {
    ...mapGetters([
      'businessType', // 业务类型
      'marketType', // 市场
      'capitalFlow', // 资金流向
      'dataFilter' // 日期
    ])
  },
  created() {
  },
  methods: {
    // 下拉按钮
    toggleArrow(type) {
      if (type === 'isFilterCriteria') {
        this.isDate = false
      } else {
        this.isFilterCriteria = false
      }
      this[type] = !this[type]
      // 遮罩层控制
      this.$emit('toggle-mask', this[type])
    },
    // 切换筛选条件
    changeCondition(type, key, item) {
      this[`${key}Sel`] = item
      if (type === 1) {
        this.isTipShow = false
        this.endDate = null
        this.startDate = null
        this.dataFilterSel.date = null
      }
    },
    // 创建日期选择表
    showDatePicker(idx) {
      this.dataFilterSel = Object.assign({}, this.dataFilterSel, { key: null })
      // 选择起始日期
      if (!this.endDate) {
        this.endDate = timestampToTime(new Date())
      }
      if (!this.startDate) {
        this.startDate = timestampToTime(new Date())
      }
      let max = new Date(this.endDate.replace(/-/g, '/'))
      let min = new Date(0)
      let dateVal = this.startDate
      // 选择结束日期
      if (idx === 1) {
        min = new Date(this.startDate.replace(/-/g, '/'))
        max = new Date()
        dateVal = this.endDate
      }

      if (!this.datePicker) {
        // 创建
        this.datePicker = this.$createDatePicker({
          min,
          max,
          value: new Date(dateVal.replace(/-/g, '/')),
          onSelect: this.selectHandle
        })
      } else {
        // 更新
        this.datePicker.$updateProps({
          min,
          max,
          value: new Date(dateVal.replace(/-/g, '/'))
        })
      }
      this.dateActiveIdx = idx
      this.datePicker.show()
    },
    // 选择日期
    selectHandle(date) {
      if (this.dateActiveIdx === 0) {
        this.startDate = timestampToTime(date)
      } else {
        this.endDate = timestampToTime(date)
      }
      // 判断时间跨度是否超过两年
      const start = timeTotimestamp(this.startDate.replace(/-/g, '/'))
      const end = timeTotimestamp(this.endDate.replace(/-/g, '/'))
      const maxMs = 366 * 2 * 24 * 60 * 60 * 1000
      if (end - start > maxMs) {
        this.isTipShow = true
        return
      } else {
        this.isTipShow = false
      }
      this.dataFilterSel = {
        key: null,
        date: { start: this.startDate, end: this.endDate }
      }
    },
    // 重置
    reSet(flag) {
      if (this.isCommit) {
        return
      }
      this.isCommit = true
      if (this.isFilterCriteria || flag === 'all') {
        for (let i = 0; i < conditionArr.length; i++) {
          for (let j = 0; j < conditionArr[i].option.length; j++) {
            if (conditionArr[i].option[j].default) {
              this[`${conditionArr[i].type}Sel`] = conditionArr[i].option[j]
            }
          }
        }
        this.$store.commit('BUSINESS_TYPE', this.businessTypeSel)
        this.$store.commit('MARKET_TYPE', this.marketTypeSel)
        this.$store.commit('MARKET_TYPE', this.capitalFlowSel)
        this.isFilterCriteria = false
      }
      if (this.isDate || flag === 'all') {
        this.isTipShow = false
        this.endDate = null
        this.startDate = null
        for (let i = 0; i < dataFilterArr.option.length; i++) {
          if (dataFilterArr.option[i].default) {
            this.dataFilterSel = dataFilterArr.option[i]
          }
        }
        this.$store.commit('DATA_FILTER', this.dataFilterSel)
        this.isDate = false
      }
      this.isCommit = false
      if (flag !== 'all') {
        this.$emit('toggle-mask', false)
        this.stockRecordInfo()
      }
    },
    // 确认 提交
    commit() {
      if (this.isCommit) {
        return
      }
      this.isCommit = true
      if (this.isFilterCriteria) {
        if (this.businessTypeSel) {
          this.$store.commit('BUSINESS_TYPE', this.businessTypeSel)
        }
        if (this.marketTypeSel) {
          this.$store.commit('MARKET_TYPE', this.marketTypeSel)
        }
        if (this.capitalFlowSel) {
          this.$store.commit('CAPITAL_FLOW', this.capitalFlowSel)
        }
        this.isFilterCriteria = false
      } else {
        if (this.isTipShow) return
        if (this.dataFilterSel) {
          this.$store.commit('DATA_FILTER', this.dataFilterSel)
        }
        this.isDate = false
      }
      this.$emit('toggle-mask', false)
      this.isCommit = false
      this.stockRecordInfo()
    }
  },
  destroyed() {
    this.reSet('all')
  }
}
</script>

<style lang="scss" scoped>
@import './style';
</style>
