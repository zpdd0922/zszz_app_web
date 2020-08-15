<template>
  <!-- 嵌入到app中的对话框样式 -->
  <section v-show="isShow"
           class="com-base-app-dialog">
    <div class="com-dialog-mark"
         ref="mark"
         @click="$emit('maskClick')"></div>
    <transition name="drop">
      <div class="com-dialog-body">
        <div class="content">
          <slot></slot>
        </div>
        <div class="close-outframe">
          <div class="close-frame">
            <i class="column-line"></i>
            <i class="icon-none-1" @click="$emit('closeDialog')"></i>
          </div>
        </div>
      </div>

    </transition>
  </section>
</template>
<script>
export default {
  name: 'base-app-dialog',
  data() {
    return {};
  },
  props: {
    isShow: {
      // 是否展示对话框
      type: Boolean,
      default: false
    }
  }
};
</script>