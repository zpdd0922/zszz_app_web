<template>
  <div class="summary">
    <h5 v-if="title" class="summary-title">
      <span>{{ title }}</span>
      <jf-icon name="tips_gray" @click="_clickTips"></jf-icon>
    </h5>
    <div class="summary-detail">
      <div
        class="detail-item"
        v-for="(item, index) in lists"
        :key="index">
        <div class="sub">
          <jf-icon :name="item.iconName" :styleObj="iconStyle"></jf-icon>
          <span class="label">{{ $t(item.title) }}</span></div>
        <div class="bot">
          <span class="bot-num">{{ item.money | filterMoney }}</span>
          <span
            v-if="item.currency"
            class="bot-type">{{item.currency}}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      iconStyle: {
        width: '.3rem', height: '.3rem'
      }
    }
  },
  created() {},
  computed: {},
  methods: {
    _clickTips() {
      this.$emit('clickTips')
    }
  },
  filters: {
    filterMoney(val = 0) {
      return Number(val).toFixed(2) + ''
    }
  }
}

</script>

<style lang='scss' scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.summary {
  background: $color-theme;
  color: $color-text;
  padding: .14rem .1rem;
  margin-top: .05rem;
  .summary-title {
    @include flex-box($row: center, $col: center);
    font-size: .15rem;
    &+.summary-detail {
      margin-top: .15rem;
    }
  }
  .summary-detail {
    @include flex-box($row: center);
  }
  .detail-item {
    width: 100%;
    text-align: center;
    &:not(:last-child) {
      @include border-y(right);
    }
  }
  .sub {
    font-size: .13rem;
  }
  .label {
    margin-left: .05rem;
    vertical-align: middle;
  }
  .bot {
    margin-top: .09rem;
  }
  .bot-num {
    font-size: .22rem;
    font-weight: bold;
  }
  .bot-type {
    font-size: .12rem;
    margin-left: .07rem;
    vertical-align: .01rem;
  }
}
</style>
