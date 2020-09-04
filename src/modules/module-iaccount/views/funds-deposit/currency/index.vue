<template>
  <div class="sec-currency">
    <sec-select-type title="请选择入金币种" :list="list" :handleClick="handleClick"/>
  </div>
</template>

<script>
export default {
  name: 'currency',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          currency: 'hkd',
          label: '港币',
          labelSub: 'HK Dollar',
          icon: require('@/modules/module-iaccount/assets/img/select-type/icon_hk.png')
        },
        {
          currency: 'usd',
          label: '美元',
          labelSub: 'US Dollar',
          icon: require('@/modules/module-iaccount/assets/img/select-type/icon_us.png')
        }
      ]
    };
  },
  created() {},
  watch: {},
  computed: {},
  methods: {
    handleClick(item) {
      this.$router.push({
        path: 'select_bank_type',
        query: { currency: item.currency }
      });
    }
  }
};
</script>
