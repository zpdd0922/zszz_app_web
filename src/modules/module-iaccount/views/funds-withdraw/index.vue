<template>
  <div class="sec-deposit">
    <sec-top-progress :progressList="progressList" :step="step" :isShow="isShowProgress"/>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'deposit',
  components: {},
  props: {},
  data() {
    return {
      progressList: [
        { label: '入金方式' },
        { label: '完成汇款' },
        { label: '通知查收' }
      ]
    };
  },
  created() {},
  watch: {},
  computed: {
    step() {
      return this.$route.meta.step;
    },
    isShowProgress() {
      return !this.$route.meta.isHideProgress;
    }
  },
  mounted() {
    document.title = '提取资金';
    this.BroadCast.send(this.BROADCAST_ENUMS.UPDATE_TITLE, {
      title: '存入资金'
    });
  },
  methods: {}
};
</script>
