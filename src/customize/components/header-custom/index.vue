<!--
 * @Author: Jim
 * @Date: 2019-03-25 14:48:03
 * @LastEditors: Jim
 * @LastEditTime: 2019-03-25 14:48:03
 * @Description: 
 -->
<template>
  <!-- 通用顶部 -->
  <header class="header-custom" v-if="isShowHeader && isShow">
    <div class="header-left">
      <header-opreate v-for="(left, leftIdx) in leftBtns" :key="leftIdx" :options="left" />
    </div>
    <div class="header-center">
      <slot>
        <span class="default">{{title}}</span>
      </slot>
    </div>
    <div class="header-right">
      <header-opreate v-for="(right, rightIdx) in rightBtns" :key="rightIdx" :options="right" />
    </div>
  </header>
</template>
<script>
import HeaderOpreate from '@/main/components/header-opreate/index.vue';
export default {
  name: 'header-custom',
  components: {
    HeaderOpreate
  },
  props: {
    isShow: {
      type: Boolean,
      default: true
    },
    leftBtns: {
      type: Array,
      default: () => []
    },
    rightBtns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      isShowHeader: true,
      title: document.title || ''
    };
  },
  created() {
    this.BroadCast.onmessage(this.BROADCAST_ENUMS.UPDATE_TITLE, data => {
      if (data && data.title) {
        this.title = data.title;
      } else {
        this.title = document.title;
      }
    });
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {}
};
</script>
