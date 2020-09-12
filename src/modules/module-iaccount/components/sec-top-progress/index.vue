<template>
  <ul v-if="isShow" class="sec-top-progress">
    <li
      v-for="(progress, index) in progressList"
      :key="index"
      :class="['progress', {'progress-active': step === index + 1}, {'progress-success': step > index + 1}]"
    >
      <em class="line"/>
      <span class="step">{{index + 1}}</span>
      <span class="label">{{progress.label}}</span>
    </li>
  </ul>
</template>

<script>
export default {
  name: 'sec-top-progress',
  components: {},
  props: {
    progressList: {
      type: Array,
      default: () => []
    },
    step: {
      // 当前步骤
      type: Number,
      default: 1
    },
    isShow: {
      // 是否显示
      type: Boolean,
      default: true
    }
  }
};
</script>
