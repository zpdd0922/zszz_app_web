<template>
  <div class="tab">
    <div class="tab-bar">
      <div
        v-for="(item, index) in lists"
        :key="index"
        :class="['bar-item', Number(value) === index && 'active']"
        @click="_clickBarItem(index)"
      >
        <slot :item="item" name="bar">
          <span>{{ $t(item.title) }}</span>
        </slot>
      </div>
    </div>
    <div class="tan-card">
      <div
        v-for="(item, index) in lists"
        :key="index"
        :class="['card-item', Number(value) === index && 'active']"
      >
        <template v-if="Number(value) === index">
          <slot :item="item" name="card">
            <div>{{ item.title }}</div>
          </slot>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
const EVENT_INPUT = "input";
const EVENT_CHANGE = "change";
const EVENT_CLICK = "click";

export default {
  props: {
    value: {
      type: [String, Number],
      required: true,
    },
    lists: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {};
  },
  created() {},
  computed: {},
  methods: {
    _clickBarItem(index) {
      this.$emit(EVENT_CLICK, index);

      if (index !== this.value) {
        const changedEvents = [EVENT_INPUT, EVENT_CHANGE];
        changedEvents.forEach((eventType) => {
          this.$emit(eventType, index);
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "~@/modules/module-iaccount/assets/styles/variable.scss";
@import "~@/modules/module-iaccount/assets/styles/mixin.scss";

.tab {
  .tab-bar {
    @include flex-box();
    background: $color-theme;
    height: 0.36rem;
    line-height: 0.36rem;
  }
  .bar-item {
    @include no-wrap();
    color: $color-999;
    flex: 1;
    font-size: 0.15rem;
    text-align: center;
    position: relative;
    &.active {
      color: $color-link;
      &:after {
        content: "";
        width: 0.18rem;
        height: 0.03rem;
        background: $color-link;
        @include pos-x();
        bottom: 0;
      }
    }
  }
  .card-item {
    display: none;
    &.active {
      display: block;
    }
  }
}
</style>
