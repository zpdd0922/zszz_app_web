<!--
 * @Author: Jim
 * @Date: 2019-05-24 16:29:32
 * @LastEditors: Jim
 * @LastEditTime: 2019-12-17 18:07:56
 * @Description: 
 -->
<template>
  <p class="base-copyright">{{content}}</p>
</template>
<script>
export default {
  name: "com-dialog",
  props: {
    content: {
      type: String,
      default: ""
    }
  },
  watch: {},
  methods: {}
};
</script>
