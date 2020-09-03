<template>
  <div class="sec-bank">
        <h5 class="title">请选择入金银行</h5>
    <div v-for="banksFamily in banksList" :key="banksFamily.key">
      <template v-if="banksFamily.banks.length">
        <!-- <sec-title :content="banksFamily.name" /> -->
        <ul class="banks-family">
          <li
            v-for="bank in banksFamily.banks"
            :key="bank.code"
            class="bank-item"
            @click="selectBank(bank)"
          >
            <i :class="`bank-icon-${bank.code}`"></i>
            <div>
              <p>{{bank.name}}</p>
              <!-- <p class="sub">手续费 : {{bank.fee}} 到账时间 : {{bank.time}}</p> -->
            </div>
            <b :class="{'active': selected && bank.code === selected.code}"></b>
          </li>
        </ul>
      </template>
    </div>
    <!-- <div v-if="isBankCardCN">提示</div>
    <div class="next-btn-wrap">
      <cube-button :disabled="isCanNext" @click="handleNext">下一步</cube-button>
    </div> -->
  </div>
</template>

<script>
import { HKD_HK_Banks_Family, HKD_CN_Banks_Family } from "./banks";
export default {
  name: "bank-type",
  components: {},
  props: {},
  data() {
    return {
      selected: null
    };
  },
  created() {},
  watch: {},
  computed: {
    isCanNext() {
      return !this.selected;
    },
    isBankCardCN() {
      return this.$route.query.bankType === "cn";
    },
    banksList() {
      const { currency, bankType } = this.$route.query;
      if (currency === "hkd") {
        if (bankType === "hk") return HKD_HK_Banks_Family;
        if (bankType === "cn") return HKD_CN_Banks_Family;
      } else if (currency === "usd") {
      }
      return [];
    }
  },
  methods: {
    selectBank(item) {
      this.selected = item;
    },
    handleNext() {
      console.log(this.selected);
    }
  }
};
</script>
