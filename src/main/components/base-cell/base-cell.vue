<template>
  <div class="base-com-cell" v-bind="$attrs" v-on="$listeners">
    <slot />
  </div>
</template>

<script>
  export default {
    name: 'base-cell',
    inheritAttrs: false,
    data() {
      return {};
    },
    components: {},
    computed: {
    },
    watch: {},
    destroyed() {},
    methods: {}
  };
</script>
