<template>
  <div>
    <template v-if="isLoading">
      <loading />
    </template>
    <template v-else>
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
            <span>{{getI18n('market.HKStock')}}</span>
          </div>
          <div class="brokerage-standard ">
            <span>{{getI18n('brokerageStandard')}}</span>
            <span>{{formattedBalRtoHK}}, 最低{{commissionStandard.hk.minFare}}{{getI18n('unitHK')}}</span>
          </div>
        </section>
        <section class="stock">
          <div class="title">
            <div class="icon-us icon"></div>
            <span>{{getI18n('market.USStock')}}</span>
          </div>
          <div class="brokerage-standard ">
            <span>{{getI18n('brokerageStandard')}}</span>
            <span>{{formattedBalRtoUS}}, 最低{{commissionStandard.us.minFare}}{{getI18n('unitUS')}}</span>
          </div>
        </section>
        <section class="record" v-if="isGetPrivilege">
          <span class="privilege">{{privilegeText}}</span>
        </section>
      </div>
    </template>
  </div>
</template>
<script>
import { mapGetters } from 'vuex';
import Apicommission from '@/modules/module-iaccount/api/modules/api-commission'
import ApiAccount from '@/modules/module-iaccount/api/modules/api-account'

export default {
  data() {
    return {
      accountType: '现金账户',
      accountNumber: '',
      accountArray: [],
      commissionStandard: {
        hk: {

        },
        us: {

        }
      },
      isLoading: false,
      isGetPrivilege: true,
      privilegeText: '',
    }
  },
  created() {
    this.getUserAccountInfo().then((acc)=>{
      this.getUsercommissionRecord(acc);
    })
    this.getcommissionInfo();
  },
  computed: {
    formattedBalRtoHK() {
      if (typeof this.commissionStandard.hk === 'undefined') {
        return ''
      }
      switch (this.commissionStandard.hk.feeType) {
        case '0': 
          return `${this.commissionStandard.hk.balanceRatio * 100}%`;

        case '1':
          return `${this.commissionStandard.hk.feeCountFix}${this.getI18n('unitHK')}/${getI18n('bi')}`;

        case '5':
          return `${this.commissionStandard.hk.feeCountFix}${this.getI18n('unitHK')}/股`;
      }
    },
    formattedBalRtoUS() {
      if (typeof this.commissionStandard.hk === 'undefined') {
        return ''
      }

      switch (this.commissionStandard.us.feeType) {
        case '0': 
          return `${this.commissionStandard.us.balanceRatio * 100}%`;

        case '1':
          return `${this.commissionStandard.us.feeCountFix}${this.getI18n('unitUS')}/${getI18n('bi')}`

        case '5':
          return `${this.commissionStandard.us.feeCountFix}${this.getI18n('unitUS')}/股`
      }
    }
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.brokerageCalculate.${key}`)
    },
    // 取用户所有的账户信息
    getUserAccountInfo() {
      return new Promise((resolve,reject)=>{
        ApiAccount.getSecAccountInfo().then((res)=> {
          if (res) {
            this.accountArray = res.fundAccount
            this.accountNumber = this.accountArray[0]
            resolve(this.accountNumber)
          }
        }).catch((err)=> {
          reject(err);
        }) 
      })
    },
    //取用户账户对应的佣金信息
    getcommissionInfo() {
      return new Promise((resolve,reject)=>{
        Apicommission.getHKcommissionInfo().then((res)=> {
          if (res) {
            this.commissionStandard.hk = {...res.hk};
            this.commissionStandard.us = {...res.us};
            this.isLoading = false;
          }
        }).catch((err)=>{
          reject(err)
        })
      })

    },
    //获取用户免佣情况
    getUsercommissionRecord(acc) {
      if (!acc) {
        return ''
      }
      return new Promise((resolve, reject)=> {
        Apicommission.getUsercommissionRecord({fundAccount: acc}).then((res)=> {
          if (res.fundAccount) {
            this.privilegeStatus(res);
          }
        })
      })
    },
    //更改佣金特权字段
    privilegeStatus(res) {
      if (!res.valid) {
        this.privilegeText = ''
      } else {
        this.privilegeText = `${this.getI18n('privilege')}${res.startDate}-${res.endDate}`
      }
    },

    // 弹出选择框
    showPicker() {
      const arr = this.accountArray.map((item) => {
        let obj = {};
        obj.value = item;
        // obj.text = item.type === '1' ? `${this.getI18n('accountSelector.cashAccount')}: ${item.account}` : `${this.getI18n('accountSelector.marginAccount')}: ${item.account}`;
        obj.text = item;
        return obj;
      });
      if (!this.picker) {
        this.picker = this.$createPicker({
          data: [arr],
          title: this.getI18n("accountSelector.title"),
          cancelTxt: this.getI18n("accountSelector.cancelTxt"),
          confirmTxt: this.getI18n("accountSelector.confirmTxt"),
          onSelect: this.selectHandle,
          onCancel: this.cancelHandle
        })
      }
      this.picker.show()
    },
    selectHandle(selectedVal, selectedIndex, selectedText) {
      //选择账户后，调用接口，获取数据
      if (this.accountNumber === selectedVal[0]) {
        return
      }
      this.accountNumber = selectedVal[0];
      this.getUsercommissionRecord(this.accountNumber);
    },
  }
}
</script>

<style>

</style>