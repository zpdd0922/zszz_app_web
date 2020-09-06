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
  padding: 24px 30px;
  .link-wrap {
    padding-left: 20px;
    height: 90px;
    line-height: 90px;
    border-radius: 4px;
    background: linear-gradient(-90deg,rgba(255,228,216,1),rgba(255,236,228,1));
    position: relative;
    overflow: hidden;
  };
  .link-txt {
    @include arrow($width: 16px, $border: 3px, $color: $color-link, $poa: -30px, $mt: 10px);
    color: $color-link;
    font-size: 26px;
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
