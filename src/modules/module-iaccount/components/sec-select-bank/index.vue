<template>
  <div class="sec-select-bank">
    <h5 class="title">{{title}}</h5>
    <div class="item" v-for="(item, idx) in list" :key="idx" @click="handlerClick(item)">
      <img :src="item.icon" :alt="item.label">
      <div>
        <p>{{item.label}}</p>
        <p class="label-sub">{{item.labelSub}}</p>
      </div>
      <i></i>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sec-select-bank',
  components: {},
  props: {
    title: {
      type: String,
      default: '请选择类型'
    },
    list: {
      type: Array,
      default: () => []
    },
    handlerClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
