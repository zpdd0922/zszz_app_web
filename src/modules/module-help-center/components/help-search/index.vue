<template>
  <div class="help-search">
    <div class="search-form" @click.stop="handleClick">
      <i class="query-icon"/>
      <input
        v-show="focus"
        :disabled="disabled"
        type="search"
        placeholder="请输入问题关键字"
        ref="input"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model.trim="value"
        @keyup.13="doSearch"
      >
      <i class="clean-icon" v-show="focus" @click.prevent="handleClean"/>
      <span class="placeholder" v-show="!focus">{{defaultTxt}}</span>
    </div>
    <span class="cancel" v-show="focus" @click="handleCancel">取消</span>
  </div>
</template>

<script>
import setTitle from '../../utils/set-title';
export default {
  name: 'home',
  components: {},
  props: {
    autoFoucs: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: '请输入搜索内容'
    },
    onClick: {
      type: Function,
      default: () => {}
    },
    onSearch: {
      type: Function,
      default: () => {}
    },
    onFocus: {
      type: Function,
      default: () => {}
    },
    onBlur: {
      type: Function,
      default: () => {}
    },
    onCancel: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      focus: false,
      value: ''
    };
  },
  created() {
    if (this.autoFoucs) this.focus = true;
  },
  watch: {},
  computed: {
    defaultTxt() {
      if (this.value.length) return this.value;
      return this.placeholder;
    }
  },
  mounted() {
    if (this.focus) this.$refs['input'].focus();
  },
  methods: {
    handleClick() {
      this.onClick();
      if (!this.focus) {
        this.focus = true;
        this.$nextTick(() => {
          this.$refs['input'].focus();
        });
      }
    },
    handleFocus() {
      this.onFocus();
      this.focus = true;
    },
    handleBlur() {
      this.onBlur();
      if (this.value === '') {
        this.focus = false;
      }
    },
    handleClean() {
      this.value = '';
      this.$refs['input'].focus();
    },
    handleCancel() {
      this.onCancel();
      // this.value = '';
      this.$refs['input'].blur();
      this.focus = false;
    },
    doSearch(e) {
      if (this.value !== '') {
        this.onSearch(this.value);
        this.$refs['input'].blur();
      }
    }
  }
};
</script>
