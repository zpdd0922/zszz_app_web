<template>
  <div class="flow-list">
    <header class="header">
      <div class="account" @click="showPicker">
        <div>
          <span>{{ accountContent }}</span>
        </div>
        <i class="arrow"></i>
      </div>
    </header>
    <!-- 时间分割 -->
    <div
      :class="{ 'time-line': true, isFirst: index === 0 }"
      v-show="index === 0 || item.isDiffMonth"
    >
      {{ item.businessDate | timestampToTime("YYYY") }}年{{
        item.businessDate | timestampToTime("M")
      }}月
      <p></p>
    </div>
    <!-- 单条记录 -->
    <div class="record">
      <p class="time" v-show="item.isDiffDay">
        {{ item.businessDate | timestampToTime("MM/DD") }}
      </p>
      <div class="content">
        <div class="left">
          <div class="top">
            <p>
              <i :class="[market, 'adaptive-style']">{{ market }}</i>
            </p>
            <span>{{ item.businessName }}</span>
          </div>
        </div>
        <div class="right">
          <div class="top">
            <span>{{ item.occurBalance | formatMoney | addSymbol }}</span>
          </div>
          <div class="bottom">
            {{ $t("iAccount.capital_flow.common.text_26") }}：<span>{{
              item.postBalance | formatMoney
            }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  timestampToTime,
  timeTotimestamp,
} from "@/modules/module-iaccount/utils/date";
import { formatMoney } from "@/modules/module-iaccount/utils/number";

export default {
  props: {
    item: {
      required: true,
      type: Object,
    },
    index: {
      required: true,
      type: Number,
    },
  },
  filters: {
    timestampToTime,
    timeTotimestamp,
    formatMoney,
    addSymbol(val) {
      if (val.indexOf("-") < 0 && val !== "0") {
        return `+${val}`;
      }
      return val;
    },
  },
  computed: {
    market() {
      // '1'：美元；'2'：港币； 只判断美元和港币(即只有港美股添加市场icon)
      switch (this.item.moneyType) {
        case "1":
          return "US";
        case "2":
          return "HK";
        default:
          return "";
      }
    },
  },
  data() {
    return {
      accountList: [],
      accountNumber: "",
      accountContent: "",
    };
  },
  methods: {},
};
</script>

<style scoped lang="scss">
@import "~@/modules/module-iaccount/assets/styles/variable.scss";
@import "~@/modules/module-iaccount/assets/styles/mixin.scss";

.flow-list {
  position: relative;
  z-index: 2;
  .time-line {
    height: 0.5rem;
    font-size: 0.14rem;
    box-sizing: border-box;
    padding: 0 0.15rem;
    line-height: 0.4rem;
    border-top: 0.1rem solid $color-theme-bg;
    position: relative;
    p {
      position: absolute;
      left: 0.15rem;
      right: 0.15rem;
      bottom: 0;
      border-bottom: 0.005rem solid $color-border-light;
    }
    &.isFirst {
      border-top: none;
      height: 0.4rem;
    }
  }
  .record {
    padding: 0 0.15rem;
    .time {
      height: 0.27rem;
      line-height: 0.27rem;
      font-size: 0.12rem;
      color: $color-arrow;
    }
    .content {
      padding: 0.1rem 0;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left,
      .right {
        .top,
        .bottom {
          display: flex;
          line-height: normal;
          align-items: center;
          justify-content: flex-start;
          height: 0.17rem;
          font-size: 0.12rem;
        }
        .bottom {
          color: $color-arrow;
        }
      }
      .left {
        .top {
          height: 0.19rem;
          // margin-bottom 4px
          p {
            position: relative;
            width: 0.16rem;
            height: 0.13rem;
            margin-right: 0.05rem;
            i {
              font-style: normal;
              font-size: 0.16rem;
              color: $color-theme;
              border-radius: 0.02rem;
              &.US {
                background: $bg-us;
              }
              // &.SZ,&.SH
              //   background $bg-sz
              &.HK {
                background: $bg-hk;
              }
            }
          }
          span {
            font-size: 0.14rem;
          }
        }
        .bottom {
          span + span {
            margin-left: 0.05rem;
          }
        }
      }
      .right {
        .top {
          margin-bottom: 0.04rem;
        }
        .top,
        .bottom {
          justify-content: flex-end;
        }
      }
    }
  }
}
.adaptive-style {
  width: 200%;
  height: 200%;
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
