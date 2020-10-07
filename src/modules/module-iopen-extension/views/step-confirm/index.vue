<template>
  <op-wrap
    :isDisabled="isDisabled"
    :btnText="$t('iopenExt.confirm.nextBtn')"
    @handleNext="handleNext"
    class="margin-confirm"
  >
    <cube-form>
      <head-title :title="titleValues.declareTitle"></head-title>
    </cube-form>

    <div class="list-wrap">
      <ul>
        <li v-for="(item, index) in agreements" :key="index">
          <a :href="item.href" class="link">{{ item.content }}</a>
        </li>
      </ul>
    </div>

    <div class="input">
      <label for="tradePwd">{{ getI18n("tradePwd.label") }}</label>
      <input
        type="password"
        :placeholder="getI18n('tradePwd.placeholder')"
        name="tradePwd"
        v-model="tradePwd"
      />
    </div>
    <div class="agree">
      <cube-checkbox v-model="checked" >
        <span class="agree-font">{{ getI18n("agreement.linkContent")}}</span>
      </cube-checkbox>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import {agreementList} from './staticFileList';
import I18n from '@/modules/module-iopen-extension/locale/index.js';

export default {
  data() {
    return {
      // agreements: agreementList,
      tradePwd: null,
      checked: false,
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("title"),
      };
    },
    isDisabled() {
      return !this.checked
    },
    //风险提示列表
    agreements() {
      if (!agreementList) {
        return []
      }
      if (I18n.locale === 'zh_CN') {
        return agreementList.zh_CN.list
      } else if (I18n.locale === 'zh_HK') {
        return agreementList.zh_HK.list
      }
    }
  },
  methods: {
    jumpToLink(url) {
      window.location.href = url;
    },
    getI18n(key) {
      return this.$t(`iopenExt.confirm.${key}`);
    },
    handleNext() {
      this.$router.push({name: 'opmaGuide'})
      // this.$store.dispatch('handleOpenMargin')
    },

  },
  mounted() {
  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
