<template>
  <div class="empty" :style="styleObj">
    <div class="empty-wrap">
      <jf-icon name="empty"></jf-icon>
      <p class="empty-txt">{{ tips }}</p>
    </div>
  </div>
</template>

<script>
import JfIcon from '../JfIcon'

export default {
  props: {
    tips: {
      type: String,
      default: ''
    },
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  components: {
    JfIcon
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.empty {
  height: 500px;
  position: relative;
  text-align: center;
  .empty-wrap {
    @include pos-center();
  }
  .empty-txt {
    color: $color-999;
    margin-top: 50px;
  }
}
</style>
