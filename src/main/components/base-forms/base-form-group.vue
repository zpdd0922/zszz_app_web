<template>
  <div class="base-form-group">
    <p v-if="isLegend" class="base-form-group-legend">{{legend}}</p>
    <div class="base-form-group-content">
      <slot />
    </div>
  </div>
</template>

<script>
export default {
  name: 'base-form-group',
  props: {
    legend: {
      type: String,
      default: ''
    }
  },
  data() {
    return {};
  },
  components: {},
  computed: {
    isLegend() {
      return typeof this.legend === 'string' && this.legend !== '';
    }
  },
  watch: {},
  destroyed() {},
  methods: {}
};
</script>
