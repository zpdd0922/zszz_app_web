<template>
  <div class="op-com-progress">
    <ul class="bar-list">
      <li
        v-for="(item,index) in list"
        class="bar-item"
        :class="{current:current===index, done:current>index}"
        :key="index"
      >
        <i :class="`icon-progress-${item.key}`"></i>
        <span class="text">{{item.text}}</span>
        <em class="line" v-if="index<list.length-1"></em>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "ProgressBar",
  props: {
    type: {
      // 类型
      type: Number,
      default: 0
    },
    skin: {
      // 皮肤
      type: String,
      default: ""
    },
    current: {
      // 当前索引
      type: Number,
      default: 0
    },
    list: {
      type: Array,
      default: () => {
        return [];
      }
    }
  },
  methods: {}
};
</script>
