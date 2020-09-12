<template>
  <div class="sec-part-list">
    <base-cells>
      <base-cell
        class="sec-part-list-item"
        v-for="(item, index) in list"
        :key="index"
        @click="_clickItem(item)"
      >
        <!-- 概览图 -->
        <base-cell-header v-if="item[getAlias.img]">
          <img class="sec-part-item-media-img" :src="item[getAlias.img]" />
        </base-cell-header>
        <!-- 文本信息 -->
        <base-cell-body class="sec-part-item-body">
          <slot name="txt" :item="item" :index="index">
            <h5 class="sec-part-item-title">
              <span>{{ item[getAlias.title] }}</span>
              <jf-icon
                v-if="item.tips"
                name="tips_gray"
                @click.native.stop="_clickItem(item, 'tips')"
              ></jf-icon>
              <jf-icon v-if="item.symbol" name="symbol">{{ item.symbol }}</jf-icon>
            </h5>
            <slot name="desc" :item="item" :index="index">
              <p v-if="item.desc" class="sec-part-item-txt">
                <span>{{ item.desc }}</span>
              </p>
            </slot>
          </slot>
        </base-cell-body>
        <base-cell-footer>
          <base-icon name="arrow"></base-icon>
        </base-cell-footer>
      </base-cell>
    </base-cells>
  </div>
</template>

<script>
const DEFAULT_ALIAS = {
  title: "title",
  img: "img",
};

export default {
  components: {},
  props: {
    title: {
      type: String,
    },
    isLink: {
      type: Boolean,
      default: false,
    },
    list: {
      type: Array,
      default: () => {
        return [];
      },
    },
    alias: {
      type: Object,
      default: () => {
        return {};
      },
    },
  },
  data() {
    return {};
  },
  computed: {
    getAlias() {
      return Object.assign({}, DEFAULT_ALIAS, this.alias);
    },
  },
  methods: {
    _clickItem(item, type) {
      this.$emit("clickItem", item, type);
    },
  },
};
</script>
