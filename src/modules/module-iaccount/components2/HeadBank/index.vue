<template>
  <div class="head">
    <div class="head-media" :style="styleObj">
      <slot name="img" :item="bank">
        <img v-if="bank.img" class="bank-img" :src="bank.img">
      </slot>
      <div class="bank-txt">
        <h4 class="title">
          <slot name="title">
            {{ bank.title }}
          </slot>
        </h4>
        <p class="txt" v-if="Object.values(desc).length">
          <span class="desc" key="descTime">
            <span>{{ $t('iAccount.deposit.common.text_8') }} {{ desc.descTime }}</span>
            <jf-icon
              v-if="desc.descTimeTips"
              name="tips_white"
              @click="_clickIconTips(desc.descTimeTips)"></jf-icon>
          </span>

          <span class="desc" key="descFee">
            <span>{{ $t('iAccount.deposit.common.text_7') }} {{ desc.descFee }}</span>
            <jf-icon
              v-if="desc.descFeeTips"
              name="tips_white"
              @click="_clickIconTips(desc.descFeeTips)"></jf-icon>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import JfIcon from '../JfIcon'
import * as tips from '@/main/utils/common/tips'

export default {
  props: {
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    },
    bank: {
      type: Object,
      default: () => {
        return {}
      }
    },
    desc: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  created() {
  },
  computed: {},
  methods: {
    _clickIconTips(txt) {
      tips.jfDialog({
        content: txt
      })
    }
  },
  components: {
    JfIcon
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.head {
  padding: .1rem .15rem;
  background: $color-theme;
  .head-media {
    @include flex-box($col: center);
    height: .81rem;
    padding-left: .2rem;
    border-radius: .02rem;
    background: $color-mybank-bg;
  }
  .bank-img {
    width: .33rem;
    height: .33rem;
    border-radius: 50%;
    background: $color-theme;
  }
  .bank-txt {
    .title {
      color: $color-head-title;
      font-size: .16rem;
      margin-left: .12rem;
    }
    .txt {
      @include flex-box();
      flex-wrap: wrap;
      color: $color-theme-m;
      font-size: .12rem;
    }
    .desc {
      @include flex-box($col: center);
      margin-left: .12rem;
      margin-top: .07rem;
    }
  }
}
</style>
