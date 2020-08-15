<template>
  <div v-show="isVisible" class="cube-popup cube-toast" :style="styleObj">
    <div class="cube-popup-mask"></div>
    <div class="cube-popup-container cube-popup-center">
      <div class="cube-popup-content">
        <template v-if="type !== 'txt'">
          <i :class="['cube-toast-icon', `cubeic-${type}`]"></i>
        </template>
        <div class="cube-toast-tip">{{txt}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'custom-toast',
  props: {
    type: {
      type: String,
      default: 'txt'
    },
    txt: {
      type: String,
      default: 'Loading'
    },
    styleObj: {
      type: Object,
      default: function() {
        return {}
      }
    },
    time: {
      type: Number,
      default: 2000
    }
  },
  data() {
    return {
      timer: null,
      isVisible: false
    }
  },
  methods: {
    show() {
      this.isVisible = true
      this.clearTimer()
      this.$nextTick(function () {
        if (this.time !== 0) {
          this.timer = setTimeout(() => {
            this.hide()
            this.$emit('timeout')
          }, this.time)
        }
      })
    },
    hide() {
      this.isVisible = false
      this.clearTimer()
    },
    clearTimer() {
      clearTimeout(this.timer)
      this.timer = null
    }
  }
}
</script>