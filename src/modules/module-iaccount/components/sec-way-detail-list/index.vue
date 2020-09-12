<template>
  <ul class="sec-way-detail-list">
    <li v-for="(item, index) in lists" :key="index">
      <slot :item="item">
        <div class="label">
          <slot name="label" :item="item" :index="index">
            <span>{{ $t(item.title) }}</span>
          </slot>
        </div>
        <div class="filed">
          <slot name="filed" :item="item" :index="index">
            <template v-if="copy">
              <base-copy-board :item="item">{{ item.value | filterEmptyVal }}</base-copy-board>
            </template>
            <template v-else>
              <span>{{ item.value | filterEmptyVal }}</span>
            </template>
            <!-- <jf-icon v-if="item.tips" name="tips_gray" @click="_clickIconTips(item.tips)"></jf-icon> -->
          </slot>
        </div>
      </slot>
    </li>
  </ul>
</template>

<script>
import BaseCopyBoard from "@/main/components/base-copy-board";
import * as tips from "@/main/utils/common/tips";

import commonMixin from "@/modules/module-iaccount/mixins/common";

export default {
  mixins: [commonMixin],
  props: {
    copy: {
      type: Boolean,
      default: true,
    },
    lists: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
  created() {},
  mounted() {},
  computed: {},
  methods: {
    _clickIconTips(txt) {
      tips.jfDialog({
        content: txt,
      });
    },
  },
  components: {
    BaseCopyBoard,
  },
};
</script>

<style lang="scss">
</style>
