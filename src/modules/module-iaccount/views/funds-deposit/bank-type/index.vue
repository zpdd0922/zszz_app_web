<template>
  <div class="sec-currency">
    <sec-select-type title="请选择银行卡类型" :list="list" :handleClick="handleClick"/>
  </div>
</template>

<script>
export default {
  name: 'bank-type',
  components: {},
  props: {},
  data() {
    return {
      list: [
        {
          bankType: 'hk',
          label: '香港银行卡',
          labelSub: '支持银证转账',
          icon: require('@/modules/module-iaccount/assets/img/select-type/icon_hk_card.png')
        },
        {
          bankType: 'cn',
          label: '大陆银行卡',
          // labelSub: 'China Bank-Card',
          icon: require('@/modules/module-iaccount/assets/img/select-type/icon_cn_card.png')
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
        path: 'select_bank',
        query: { ...this.$route.query, bankType: item.bankType }
      });
    }
  }
};
</script>
