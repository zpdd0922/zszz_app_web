<template>
  <section v-show="isShow" class="com-base-dialog">
    <div class="com-dialog-mark" ref="mark" @click="maskClick"></div>
    <transition name="drop">
      <div class="com-dialog-body">
        <!-- 标题部分 -->
        <header class="com-dialog-header">
          <span v-if="title !==''" class="com-dialog-title">{{title}}</span>
          <span v-if="isCloseBtn" class="com-dialog-close" @click="close">╳</span>
        </header>
        <!-- 内容部分 -->
        <section ref="content" class="com-dialog-content">
          <slot name="content" />
        </section>
        <!-- 选项部分 -->
        <slot name="dialog-footer">
          <footer class="com-dialog-footer">
            <button v-for="(item, idx) in btns" :key="idx" @click="btnClick(item)">
              <span>{{item.content}}</span>
            </button>
          </footer>
        </slot>
      </div>
    </transition>
  </section>
</template>
<script>
export default {
  name: "com-dialog",
  props: {
    isShow: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ""
    },
    btns: {
      type: Array,
      default: () => []
    },
    name: {
      default: null
    },
    isCloseBtn: {
      type: Boolean,
      default: true
    },
    isCloseMask: {
      type: Boolean,
      default: false
    },
    dialogClose: {
      type: Function,
      default: () => {}
    }
  },
  watch: {
    isShow(value) {
      value && this.shieldScroll(this.$refs.mark, this.$refs.content);
    }
  },
  methods: {
    close() {
      this.dialogClose(this.name);
    },
    maskClick() {
      if (this.isCloseMask) this.close();
    },
    btnClick(item) {
      item.click && item.click();
    },
    shieldScroll(container, selectorScrollable) {
      window.addEventListener("mousewheel", function(e) {
        e = e || window.event;
        if (e.target === container) {
          if (e.preventDefault) {
            e.preventDefault();
            e.returnValue = false;
          }
        }
        return false;
      });
    }
  }
};
</script>

