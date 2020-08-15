<!--
 * @Author: Jim
 * @Date: 2019-03-25 14:48:03
 * @LastEditors: Jim
 * @LastEditTime: 2019-03-25 14:48:03
 * @Description: 
 -->
<template>
  <!-- 通用顶部 -->
  <div class="com-bottom-share">
    <base-cell>
      <base-cell-header>
        <i class="logo" />
      </base-cell-header>
      <base-cell-body>策略大师，值得拥有~</base-cell-body>
      <base-cell-footer>
        <button @click.stop="doDownload" class="button">了解更多</button>
      </base-cell-footer>
    </base-cell>
  </div>
</template>
<script>
import {
  BaseCell,
  BaseCellHeader,
  BaseCellBody,
  BaseCellFooter
} from "../base-cell";
export default {
  name: "header-custom",
  components: {
    BaseCell,
    BaseCellHeader,
    BaseCellBody,
    BaseCellFooter
  },
  props: {
  },
  data() {
    return {}
  },
  created() {
  },
  computed: {},
  watch: {},
  mounted() {},
  methods: {
    doDownload() {
      this.$emit("handleClick")
    }
  }
};
</script>
