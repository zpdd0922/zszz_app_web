<template>
  <div class="base-form-item">
    <div v-if="isLabel" class="base-form-item-label">
      <span>{{label}}</span>
    </div>
    <div class="base-form-item-field">
    <slot />

    </div>
  </div>
</template>

<script>
export default {
  name: 'base-form-item',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    isLabel() {
      return typeof this.label === 'string' && this.label !== '';
    }
  },
  watch: {},
  destroyed() {},
  methods: {}
};
</script>
