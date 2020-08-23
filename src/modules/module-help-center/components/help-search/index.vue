<template>
  <div class="help-search">
    <div class="search-form" @click.prevent="handleClick">
      <i class="query-icon" />
      <input
        :class="{unactive: !focused, active: focused}"
        :disabled="disabled"
        type="search"
        placeholder="请输入问题关键字"
        ref="input"
        @focus="handleFocus"
        @blur="handleBlur"
        v-model.trim="value"
        @keyup.13="doSearch"
      />
      <i class="clean-icon" v-show="focused" @click.prevent="handleClean" />
      <span class="placeholder" v-show="!focused">{{defaultTxt}}</span>
    </div>
    <span class="cancel" v-show="focused" @click="handleCancel">取消</span>
  </div>
</template>

<script>
import setTitle from "../../utils/set-title";
export default {
  name: "home",
  components: {},
  props: {
    autoFoucs: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    placeholder: {
      type: String,
      default: "请输入搜索内容",
    },
    onClick: {
      type: Function,
      default: () => {},
    },
    onSearch: {
      type: Function,
      default: () => {},
    },
    onFocus: {
      type: Function,
      default: () => {},
    },
    onBlur: {
      type: Function,
      default: () => {},
    },
    onCancel: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      focused: false,
      value: "",
    };
  },
  created() {
    if (this.autoFoucs) this.focused = true;
  },
  watch: {},
  computed: {
    defaultTxt() {
      if (this.value.length) return this.value;
      return this.placeholder;
    },
  },
  mounted() {
    console.log("mounted, ", this.$refs["input"]);
    if (this.focused) this.$refs["input"].focus();
  },
  methods: {
    handleClick() {
      console.log("handleclick", this.focused);
      this.onClick();
      if (!this.focused) {
        this.focused = true;
        console.log(this.$refs["input"]);
        this.$refs["input"].focus();
      }
    },
    handleFocus() {
      this.onFocus();
      this.focused = true;
    },
    handleBlur() {
      this.onBlur();
      if (this.value === "") {
        this.focused = false;
      }
    },
    handleClean() {
      this.value = "";
      this.$refs["input"].focus();
    },
    handleCancel() {
      this.onCancel();
      // this.value = '';
      this.$refs["input"].blur();
      this.focused = false;
    },
    doSearch(e) {
      if (this.value !== "") {
        this.onSearch(this.value);
        this.$refs["input"].blur();
      }
    },
  },
};
</script>
