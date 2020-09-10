<template>
  <div class="flow-list">
    <!-- 时间分割 -->
    <div :class="{'time-line': true, 'isFirst': index===0 }" v-show="index===0 || item.isDiffMonth">
      {{item.businessDate | timestampToTime('YYYY')}}年{{item.businessDate | timestampToTime('M')}}月
      <p></p>
    </div>
    <!-- 单条记录 -->
    <div class="record">
      <p class="time" v-show="item.isDiffDay">{{item.businessDate | timestampToTime('MM/DD')}}</p>
      <div class="content">
        <div class="left">
          <div class="top">
            <p><i :class="[market, 'adaptive-style']">{{market}}</i></p>
            <span>{{item.businessName}}</span>
          </div>
          <div class="bottom">
            <span v-show="item.stockName">{{item.stockName}}</span>
            <span v-show="item.assetId">{{item.assetId | formatAssetId}}</span>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>{{item.occurAmount | addSymbol}}</span>
          </div>
          <div class="bottom">
            {{$t('capital_flow.common.text_31')}}：<span>{{item.postAmount}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { timestampToTime, timeTotimestamp } from '@/modules/module-iaccount/utils/date'

export default {
  props: {
    item: {
      required: true,
      type: Object
    },
    index: {
      required: true,
      type: Number
    }
  },
  filters: {
    timestampToTime,
    timeTotimestamp,
    formatAssetId(assetId) {
      if (!assetId) {
        return '--'
      }
      const [code] = assetId.split('.')
      return code
    },
    addSymbol(val) {
      if (val.indexOf('-') < 0 && val !== '0') {
        return `+${val}`
      }
      return val
    }
  },
  computed: {
    market() {
      if (this.item.assetId) {
        const market = this.item.assetId.split('.')[1]
        return market.toUpperCase()
      }
      return ''
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.flow-list {
  position: relative;
  z-index: 2;
  .time-line {
    height:.5rem;
    font-size:.14rem;
    box-sizing: border-box;
    padding: 0 .15rem;
    line-height: .4rem;
    border-top: .1rem solid $color-theme-bg;
    position: relative;
    p {
      position: absolute;
      left: .15rem;
      right: .15rem;
      bottom: 0;
      border-bottom: .005rem solid $color-border-light;
    }
    &.isFirst {
      border-top: none;
      height:.4rem;
    }
  }
  .record {
    padding: 0 .15rem;
    .time {
      height:.27rem;
      line-height: .27rem;
      font-size:.12rem;
      color: $color-arrow;
    }
    .content {
      padding: .1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left,.right {
        .top,.bottom {
          display: flex;
          line-height: normal;
          align-items: center;
          justify-content: flex-start;
          height: .17rem;
          font-size: .12rem;
        }
        .bottom {
          color: $color-arrow;
        }
      }
      .left {
        .top {
          height: .19rem;
          margin-bottom: .02rem;
          p {
            position: relative;
            width:.16rem;
            height:.13rem;
            margin-right: .05rem;
            i {
              font-style: normal;
              font-size:.16rem;
              color:$color-theme;
              border-radius:.02rem;
              &.US {
                background: $bg-us;
              }
              &.SZ,&.SH {
                background: $bg-sz;
              }
              &.HK {
                background: $bg-hk;
              }
            }
          }
          span {
            font-size: .14rem;
          }
        }
        .bottom {
          span+span {
            margin-left: .05rem;
          }
        }
      }
      .right {
        .top {
          margin-bottom: .04rem;
        }
        .top,.bottom {
          justify-content: flex-end;
        }
      }
    }
  }
}
.adaptive-style {
  width: 200%;
  height:200%;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: normal;
  transform: scale(0.5);
  transform-origin: top left;
  top: 0;
  left: 0;
}
</style>
