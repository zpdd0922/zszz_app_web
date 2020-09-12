<template>
  <div class="fee-statement-wrap">
    <header class="header">
      <div class="account" @click="showPicker">
        <div>
          <span>{{accountType}}</span>
          <span>{{accountNumber}}</span>
        </div>
        <i class="arrow"></i>
      </div>
    </header>
    <section class="stock">
      <div class="title">
        <div class="icon-hk icon"></div>
        <span>{{$t('iAccount.brokerageCalculate.market.HKStock')}}</span>
      </div>
      <div class="brokerage-standard ">{{$t('iAccount.brokerageCalculate.brokerageStandard')}}</div>
    </section>
    <section class="stock">
      <div class="title">
        <div class="icon-us icon"></div>
        <span>{{$t('iAccount.brokerageCalculate.market.USStock')}}</span>
      </div>
      <div class="brokerage-standard ">{{$t('iAccount.brokerageCalculate.brokerageStandard')}}</div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      accountType: '现金账户',
      accountNumber: '123451345',
      accountArrayMock: [
        {
          type: '1',
          account: '43523452',
        },
        {
          type: '2',
          account: '1234156134',
        },

      ],
    }
  },
  created() {
    this.getUserAccountInfo();
  },
  // computed: {
  //   accountArray() {
  //     return this.accountArrayMock.map((item) => {
  //       let obj = {};
  //       obj.text = item.type === '1' ? '现金账户' : '融资账户';
  //       obj.value = item.account;
  //       return obj;
  //     })
  //   }
  // },
  methods: {
    // 取用户所有的账户信息
    getUserAccountInfo() {
      
    },
    //取用户账户对应的佣金信息
    getUserBrokerageDetails() {

    },
    // 弹出选择框
    showPicker() {
      const accountArray = this.accountArrayMock.map((item) => {
        let obj = {};
        obj.value = item.account;
        obj.text = item.type === '1' ? `${this.$t('iAccount.brokerageCalculate.accountSelector.cashAccount')}: ${item.account}` : `${this.$t('iAccount.brokerageCalculate.accountSelector.marginAccount')}: ${item.account}`;
        return obj;
      });
      console.log(accountArray);
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [accountArray],
          title: this.$t("iAccount.brokerageCalculate.accountSelector.title"),
          cancelTxt: this.$t("iAccount.brokerageCalculate.accountSelector.cancelTxt"),
          confirmTxt: this.$t("iAccount.brokerageCalculate.accountSelector.confirmTxt"),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      //选择账户后，调用接口，获取数据
    },
    //取消选择
    cancelHandle() {
    }
  }
}
</script>

<style>

</style>