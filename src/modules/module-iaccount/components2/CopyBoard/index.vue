<template>
  <span
    class="copyBtn"
    :data-item="JSON.stringify(item)">
    <slot></slot>
  </span>
</template>

<script>
import ClipboardJS from 'clipboard'
import * as tips from '@/main/utils/common/tips'


const DEFAULT_ALIAS = {
  title: 'title',
  value: 'value'
}

export default {
  props: {
    item: {
      type: Object,
      default: () => {
        return {}
      }
    },
    alias: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  data() {
    return {}
  },
  mounted() {
    this._initCopy()
  },
  computed: {
    getAlias() {
      return Object.assign({}, DEFAULT_ALIAS, this.alias)
    }
  },
  methods: {
    _initCopy() {
      const _self = this
      const instance = new ClipboardJS('.copyBtn', {
        text: function(trigger) {
          const { value } = _self._getTriggerData(trigger)
          return value
        }
      })
      instance.on('success', function(e) {
        const { title, value } = _self._getTriggerData(e.trigger)
        const txt = (_self.$t(title) || value) + _self.$t('iAccount.common.text_14')
        tips.toast({ txt: txt, time: 1000 })
        e.clearSelection()
      })

      instance.on('error', function(e) {
        const { title, value } = _self._getTriggerData(e.trigger)
        const txt = (_self.$t(title) || value) + _self.$t('iAccount.common.text_15')
        tips.toast({ type: 'error', txt: txt, time: 1000 })
      })

      // 退出后摧毁实例
      this.$once('hook:beforeDestroy', function () {
        instance.destroy()
      })
    },
    _getTriggerData(trigger) {
      const item = trigger.getAttribute('data-item') || '{}'
      try {
        return JSON.parse(item)
      } catch (error) {
        return {}
      }
    }
  }
}

</script>