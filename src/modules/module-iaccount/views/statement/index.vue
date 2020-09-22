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
    <div class="detail">
      <cube-scroll
        :data="data"
      >
        <div>
          <div v-for="(item, index) in data" :key="index">
            <p class="title">{{item[0]}}</p>
            <ul class="list">
              <li v-for="(list, index) in item[1]" :key="index" class="item border-bottom-1px">
                <p class="date">{{formatDate(list)}}</p>
                <p class="type">{{formatType(list)}}</p>
                <p class="pdf">查看PDF</p>
              </li>
            </ul>
          </div>
        </div>
      </cube-scroll>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { timestampToTime } from '@/modules/module-iaccount/utils/date'
import { getStatementsData } from './format'

export default {
  data () {
    return {
      typeValue: '',
      dateValue: '全部日期',
      upIcon: false,
      data: [{
            "date": 1600099200000,
            "pdf": "http://down.statement.9fstock.com/2020/09/QKC4uXQKuPhxeOYXMN3Kkb58XAyZyq.pdf",
            "type": 1
          }, {
            "date": 1600012800000,
            "pdf": "http://down.statement.9fstock.com/2020/09/VBpsQTHj2WBQBf1qeyZIWAbj4PV6qB.pdf",
            "type": 1
          }, {
            "date": 1599667200000,
            "pdf": "http://down.statement.9fstock.com/2020/09/H18OaYDVxr2lCj8itlM1Dz1nqpoyJR.pdf",
            "type": 1
          }, {
            "date": 1598803200000,
            "pdf": "http://down.statement.9fstock.com/2020/08/dD3pmHjJDQ0Zlct9R4WylxtuHn2xf0.pdf",
            "type": 2
          }, {
            "date": 1597334400000,
            "pdf": "http://down.statement.9fstock.com/2020/08/jyBQLOzRNHE7BcjjnCVcaOUyNeB68i.pdf",
            "type": 1
          }, {
            "date": 1597161600000,
            "pdf": "http://down.statement.9fstock.com/2020/08/j37A1wDTON1DJsFVDPfw3xSDYFKgTj.pdf",
            "type": 1
          }, {
            "date": 1597075200000,
            "pdf": "http://down.statement.9fstock.com/2020/08/5GJ8ozRj6g5kjDj1hFeaLuu8rLYzvM.pdf",
            "type": 1
          }, {
            "date": 1596729600000,
            "pdf": "http://down.statement.9fstock.com/2020/08/lURAxr9MIW5d4PDtIwbW1Qq2dj9G5m.pdf",
            "type": 1
          }, {
            "date": 1596124800000,
            "pdf": "http://down.statement.9fstock.com/2020/07/k0m5WMilrwoGvZF3eHGNWTjrQqHvVY.pdf",
            "type": 2
          }, {
            "date": 1595433600000,
            "pdf": "http://down.statement.9fstock.com/2020/07/keShXcVbuEILAh66BKk8UJNK7CyamY.pdf",
            "type": 1
          }, {
            "date": 1595260800000,
            "pdf": "http://down.statement.9fstock.com/2020/07/EIggiusDBAutIOyqkkEZApsLQnkGwz.pdf",
            "type": 1
          }, {
            "date": 1594569600000,
            "pdf": "http://down.statement.9fstock.com/2020/07/lRQd1TWxCA3DQZkzfKhmbZZm0bnxt8.pdf",
            "type": 1
          }, {
            "date": 1594310400000,
            "pdf": "http://down.statement.9fstock.com/2020/07/281BvwQnfXI6EW1Jl3CjfEAFjnmqXq.pdf",
            "type": 1
          }, {
            "date": 1594137600000,
            "pdf": "http://down.statement.9fstock.com/2020/07/8DcoD5J6JQybigckTThZfYejGUgnWh.pdf",
            "type": 1
          }, {
            "date": 1594051200000,
            "pdf": "http://down.statement.9fstock.com/2020/07/VHHYRxGecT6InT7O2rH58SkUgzgpK6.pdf",
            "type": 1
          }, {
            "date": 1593705600000,
            "pdf": "http://down.statement.9fstock.com/2020/07/vSLZ5guwoPmsvVYQmIhcdmjlaA1OOD.pdf",
            "type": 1
          }, {
            "date": 1593446400000,
            "pdf": "http://down.statement.9fstock.com/2020/06/LLakwE7qcgEljYMDhhlfcrKimrI9vy.pdf",
            "type": 2
          }, {
            "date": 1593100800000,
            "pdf": "http://down.statement.9fstock.com/2020/06/3SrHQdaCd2xsWZ0gGzKkSfGl6eLLu0.pdf",
            "type": 1
          }, {
            "date": 1592841600000,
            "pdf": "http://down.statement.9fstock.com/2020/06/4p0gt1IBpV7HvYMGHh1smNOPC9wqa7.pdf",
            "type": 1
          }, {
            "date": 1592496000000,
            "pdf": "http://down.statement.9fstock.com/2020/06/6spqjo5gNpSZB3ueZpC14Vc5Snlt2s.pdf",
            "type": 1
          }]
    }
  },
  methods: {
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
    },
    cancelHandle() {
      console.log('1', 1)
    },
    // 格式化时间
    formatDate(data) {
      const { date } = data
      return timestampToTime(date, 'D')
    },
    // 格式化日月结单文案
    formatType(data) {
      const { type } = data
      if (type === 1) {
        return '日结单'
      }
      return '月结单'
    }
  },
  mounted() {
    this.data = getStatementsData(this.data)
    console.log('this.data', this.data)
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
