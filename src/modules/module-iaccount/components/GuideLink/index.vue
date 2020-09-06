<template>
  <div class="guide-link">
    <div class="link-wrap" :link="link">
      <slot>
        <span class="link-txt" @click="_clickLink">{{ title }}</span>
        <span class="link-label">
          <jf-icon v-if="iconName" :name="iconName"></jf-icon>
        </span>
      </slot>
    </div>
  </div>
</template>

<script>
import JfIcon from '../JfIcon'
import commonMixin from '@/modules/module-iaccount/mixins/common'

export default {
  mixins: [commonMixin],
  props: {
    title: {
      type: String,
      default: ''
    },
    link: {
      type: String
    },
    iconName: {
      type: String
    }
  },
  data () {
    return {}
  },
  created() {},
  computed: {},
  methods: {
    _clickLink() {
      if (!this.link) return
      this.gotoGuide(this.link)
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

// 指引样式
.guide-link {
  background: $color-theme;;
  padding: .12rem .15rem;
  .link-wrap {
    padding-left: .1rem;
    height: .45rem;
    line-height: .45rem;
    border-radius: .02rem;
    background: linear-gradient(-90deg,rgba(255,228,216,1),rgba(255,236,228,1));
    position: relative;
    overflow: hidden;
  };
  .link-txt {
    @include arrow($width: .08rem, $border: .015rem, $color: $color-link, $poa: -.15rem, $mt: .05rem);
    color: $color-link;
    font-size: .13rem;
  };
  .link-label {
    position: absolute;
    right: 0;
    bottom: 0;
    z-index: 2;
    .jf-icon {
      vertical-align: bottom;
    };
  };
};
</style>
