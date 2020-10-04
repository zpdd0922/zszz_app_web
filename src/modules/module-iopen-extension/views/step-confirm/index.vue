<template>
  <op-wrap
    :isDisabled="isDisabled"
    :btnText="$t('iopenExt.confirm.nextBtn')"
    @handleNext="handleNext"
  >
    <cube-form>
      <head-title :title="titleValues.declareTitle"></head-title>
    </cube-form>

    <div class="list-wrap">
      <ul>
        <li v-for="(item, index) in agreementList" :key="index">
          <a :href="item.url" class="link">{{ item.title }}</a>      
        </li>
      </ul>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import {agreementList} from './agreementList';

export default {
  data() {
    return {
      agreementList: agreementList(),
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("title"),
      };
    },
    isDisabled() {
      return false
    },
  },
  methods: {
    jumpToLink(url) {
      window.location.href = url;
    },
    getI18n(key) {
      return this.$t(`iopenExt.confirm.${key}`);
    },
    handleNext() {
      this.$router.push({name: 'margin-signature'})
    },
  },
  created() {
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
