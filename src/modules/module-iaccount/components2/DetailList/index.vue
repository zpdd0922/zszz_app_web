<template>
  <div class="detail-list">
    <ul>
      <li
        v-for="(item, index) in lists"
        :key="index">
        <slot :item="item">
          <div class="label">
            <slot name="label" :item="item" :index="index">
              <span>{{ $t(item.title) }}</span>
            </slot>
          </div>
          <div class="filed">
            <slot name="filed" :item="item" :index="index">
              <template v-if="copy">
                <copy-board :item="item">{{ item.value | filterEmptyVal }}</copy-board>
              </template>
              <template v-else>
                <span>{{ item.value | filterEmptyVal }}</span>
              </template>
              <jf-icon
                v-if="item.tips"
                name="tips_gray"
                @click="_clickIconTips(item.tips)"></jf-icon>
            </slot>
          </div>
        </slot>
      </li>
    </ul>
  </div>
</template>

<script>
import CopyBoard from '../CopyBoard'
import JfIcon from '../JfIcon'
import * as tips from '@/main/utils/common/tips'

import commonMixin from '@/modules/module-iaccount/mixins/common'

export default {
  mixins: [commonMixin],
  props: {
    copy: {
      type: Boolean,
      default: true
    },
    lists: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  created() {
  },
  mounted() {
  },
  computed: {
  },
  methods: {
    _clickIconTips(txt) {
      tips.jfDialog({
        content: txt
      })
    }
  },
  components: {
    CopyBoard,
    JfIcon
  }
}

</script>

<style lang="scss">
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.detail-list {
  background: $color-theme;
  padding: .1rem .15rem .12rem;
  li {
    @include flex-box();
    font-size: .15rem;
    line-height: .22rem;
    &:not(:first-child) {
      margin-top: .1rem;
    }
    .label {
      width: .8rem;
      margin-right: .12rem;
    }
    .filed {
      color: $color-text;
      flex: 1;
    }
    .jf-icon {
      margin-top: -.02rem;
    }
  }
}
</style>
