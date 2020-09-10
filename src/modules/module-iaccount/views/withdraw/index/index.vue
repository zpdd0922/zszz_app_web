<template>
  <div></div>
</template>

<script>
import OpenApi from '@/modules/module-iaccount/api/modules/api-open'

export default {
  data () {
    return {}
  },
  created() {
    this._fetchOpenType()
  },
  computed: {},
  methods: {
    _fetchOpenType() {
      OpenApi.getOpenBankType().then(res => {
        const { bankType } = res
        if (bankType === 0) {
          // 香港卡开户
          this.$router.replace({ name: 'open-hk' })
        } else {
          // 大陆卡开户
          this.$router.replace({ name: 'open-cn' })
        }
      })
    }
  }
}

</script>
