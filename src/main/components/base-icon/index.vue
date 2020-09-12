<template>
  <span class="base-icon" @click="_click">
    <i :class="iconClass" :style="styleObj">
      <slot></slot>
    </i>
  </span>
</template>

<script>

export default {
  props: {
    name: undefined,
    styleObj: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data () {
    return {}
  },
  computed: {
    iconClass() {
      return this.name ? 'base-icon-' + this.name : ''
    }
  },
  methods: {
    _click() {
      this.$emit('click')
    }
  }
}

</script>
