<template>
  <div class="sec-history">
    <sec-top-nav
      :navList="navList"
      :activeNav="activeNav.key"
      :handleClickNav="selectTab"
    />
    历史记录
  </div>
</template>

<script>
  import {
    mapActions
  } from 'vuex';

  export default {
    name: 'home',
    components: {},
    props: {},
    data() {
      return {
        navList: [
          {
            key: 'deposit',
            label: '存入资金',
          },
          {
            key: 'withdraw',
            label: '提取资金'
          },
          {
            key: 'exchange',
            label: '货币兑换',
            disable: true
          },
        ],
        activeNav: {}
      };
    },
    created() {
      this.selectTab(this.navList[0]);
    },
    watch: {},
    computed: {

    },
    methods: {
      ...mapActions(['getFundsHistory']),
      // 点击菜单
      selectTab(item) {
        const {
          key,
          disable
        } = item;
        if (disable) {
          console.log(item);
        } else if (key !== this.activeNav.key) {
          this.activeNav = item;
          this.getFundsHistory();

          // this.setState({
          //   activeNavKey
          // }, () => {
          //   const {
          //     commonState: {
          //       [`currency${activeNavKey}Value`]: {
          //         code: currencyType
          //       },
          //       [`status${activeNavKey}Value`]: {
          //         code: recordStatus
          //       },
          //     },
          //   } = this.props;

          // this.toChangeHistory(activeNavKey, {
          //     currencyType,
          //     recordStatus,
          //   })
          //   .catch((e) => {
          //     console.log(e);
          //     Tips.show(e.message)
          //   });
        }
      }
    }
  };
</script>
