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

    <div class="input-wrap">
      <div class="label">{{ getI18n("tradePwd.label") }}</div>
      <cube-input
        name="tradePwd"
        type="password"
        :clearable="clearable"
        :eye="eye"
        :placeholder="getI18n('tradePwd.placeholder')"
        v-model.trim="tradePwd"
        class="pwd"
        :label="getI18n('tradePwd.label')"
      >
      </cube-input>
    </div>
    <div class="agree">
      <cube-checkbox v-model="checked">
        <span class="agree-font">{{ getI18n("agreement.linkContent") }}</span>
      </cube-checkbox>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import {agreementList} from './staticFileList';
import I18n from '@/modules/module-iopen-extension/locale/index.js';
import validate from '@/main/utils/format/validate.js';
import { toast } from '@/main/utils/common/tips/';
import { otherDisclosure } from "@/modules/module-iopen-extension/format/disclosure";
import openMarginApi from "@/modules/module-iopen-extension/api/modules/api-open-margin";
import { mapActions } from 'vuex';


export default {
  data() {
    return {
      // agreements: agreementList,
      tradePwd: '',
      checked: false,
      clearable: {
        visible: true,
        blurHidden: true,
      },
      eye: {
        open: false,
        reverse: false
      },

    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("title"),
      };
    },
    isDisabled() {
      return !this.checked || !this.validatePwd
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
    },
    validatePwd() {
      return validate.isTradePwd(this.tradePwd)
    },
  },
  methods: {
    ...mapActions(['submitOpenMargin']),
    jumpToLink(url) {
      window.location.href = url;
    },
    getI18n(key) {
      return this.$t(`iopenExt.confirm.${key}`);
    },
    handleNext() {
      if (!this.validatePwd) {
        toast({
          type: 'error',
          txt: this.getI18n('tradePwd.badPwd'),
          time: 1000
        })
        return
      }

      const formattedData = this.formatCommitData(
        {
          isNotConsortWithMargin: true,
          isNotConsortWithOtherMargin: true,
          isNotBOorPG: true,
          adjectiveAuth: true,
        }
      );
      const data = {
        tradePwd: this.tradePwd,
        key: '',
        ...formattedData,
      }
      // this.$router.push({name: 'opmaGuide'})
      this.submitOpenMargin(data).then((res)=>{
      // openMarginApi.submitOpenMargin(data).then((res)=>{
        if (res) {
          toast({
            type: 'txt',
            txt: this.getI18n('submitSuccess'),
            time: 1000,
            callback: ()=>{
              this.$router.push('/')
            }
          })
        }
      }).catch((err)=>{
        toast({
          type: 'error',
          txt: err,
          time: 1000,
          callback: ()=>{
            this.$router.push()
          }
        })

      })
    },
    formatCommitData(args) {
      const infoDisclosure = {
        otherDisclosure: otherDisclosure(args), // 身份資料申報
      };
      // 数据汇总
      const formData = {
        ...infoDisclosure,
      };
      const data = {
        formData: JSON.stringify(formData),
      };
      return data;
    }
  },
  created() {

  },
};
</script>
<style lang="scss" scoped>
@import "./style.scss";
</style>
