<template>
  <tab-panel v-model="selectInd" :lists="lists">
    <template v-slot:card="slotProps">
      <component
        :itemData="slotProps.item"
        :is="comp[slotProps.item.key]"
      ></component>
    </template>
  </tab-panel>
</template>

<script>
import { TRANSFER_TYPE } from "@/modules/module-iaccount/define";
import ListIntoStock from "./listIntoStock";
import ListOutStock from "./listOutStock";

const FUNDS_COMP = {
  intoStock: ListIntoStock,
  outStock: ListOutStock,
};

const DEFAULT_TABS = Object.values( TRANSFER_TYPE.options);

export default {
  // 记录上一次选中tab栏
  beforeRouteEnter(to, from, next) {
    const tab = from.query.tab || to.query.tab;
    next((vm) => {
      if (tab) {
        const val = vm.lists.findIndex((item) => item.key === tab);
        vm.selectInd = val || 0;
      }
    });
  },
  data() {
    return {
      selectInd: 0,
      lists: DEFAULT_TABS,
      comp: FUNDS_COMP,
    };
  },
  created() {},
  computed: {},
  methods: {},
  components: {
    ListIntoStock,
    ListOutStock,
  },
};
</script>

<style lang="scss">
@import "./style";
</style>
