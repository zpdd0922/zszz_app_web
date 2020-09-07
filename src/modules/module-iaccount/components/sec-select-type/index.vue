<template>
  <div class="sec-select-type">
    <h5 class="title">{{title}}</h5>
    <div class="item" v-for="(item, idx) in list" :key="idx" @click="handleClick(item)">
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
  name: 'sec-select-type',
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
    handleClick: {
      type: Function,
      default: () => {}
    }
  }
};
</script>
