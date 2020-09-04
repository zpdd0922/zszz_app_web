<template>
  <div class="sec-home">
    <div
      v-for="menuItem in menu"
      v-if="menuItem.channel.length"
      :key="menuItem.key"
    >
      <sec-title :content="menuItem.label" />
      <ul class="sec-list-box">
        <li
          v-for="channelItem in menuItem.channel"
          :key="channelItem.key"
          class="sec-list-item"
          @click="intoChannel(channelItem)"
        >
          <i :class="`sec-icon-${channelItem.iconType}`"></i>
          <span>{{channelItem.label}}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'home',
    components: {},
    props: {},
    data() {
      return {};
    },
    created() {},
    watch: {},
    computed: {
      menu() {
        return [
          {
            key: 'funds',
            label: '资金管理',
            channel: [
              {
                key: 'deposit',
                label: '存入资金',
                iconType: 'deposit'
              },
              {
                key: 'withdraw',
                label: '提取资金',
                iconType: 'withdraw'
              },
              // { key: 'exchange', label: '货币兑换', iconType: 'exchange' },
              {
                key: 'history-funds',
                label: '历史记录',
                iconType: 'fund_history'
              }
            ]
          },
          {
            key: 'stocks',
            label: '股票管理',
            channel: [
              {
                key: 'enter',
                label: '转入股票',
                iconType: 'enter'
              },
              {
                key: 'out',
                label: '转出股票',
                iconType: 'out'
              },
              {
                key: 'history-stocks',
                label: '历史记录',
                iconType: 'stock_history'
              }
            ]
          },
          {
            key: 'others',
            label: '其他管理',
            channel: []
          }
        ];
      }
    },
    methods: {
      // 点击菜单
      intoChannel(item) {}
    }
  };
</script>
