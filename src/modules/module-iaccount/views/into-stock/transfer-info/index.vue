<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="transfer-info-wrap">
          <!-- 转出方信息 -->
      <div class="transfer-info-title">{{titleValues.transferOut}}</div>
      <cube-form :model="transferOutInfoModel" class="form">
        <cube-form-item :field="fieldsTransferOut.transferOutCompany"></cube-form-item>
        <!-- 转出公司为其他时弹出 -->
        <template
          v-if="transferOutInfoModel.transferOutCompany === 'OTH'"
        >
          <cube-form-item :field="fieldsTransferOut.otherTransferOutCompanyName"></cube-form-item>
        </template>
        <cube-form-item :field="fieldsTransferOut.accountNumber"></cube-form-item>
        <cube-form-item :field="fieldsTransferOut.accountName"></cube-form-item>
        <template
          v-if="transferOutInfoModel.transferOutCompany === 'OTH'"
        >
          <cube-form-item :field="fieldsTransferOut.ccass"></cube-form-item>
          <cube-form-item :field="fieldsTransferOut. rolloutContacts"></cube-form-item>
          <cube-form-item :field="fieldsTransferOut.contactPhoneNum"></cube-form-item>
        </template>
        <!-- 提醒 -->
        <div class="tips"></div>
        <div class="tips"></div>
      </cube-form>
        <!-- 接收方信息 -->
      <div class="transfer-info-title">{{titleValues.reciever}}</div>
      <cube-form :model="recieverInfoModel">
        <div></div>
        <cube-form-item :field="fieldsReciever.receiveSec"></cube-form-item>
        <cube-form-item :field="fieldsReciever.recieveAccount"></cube-form-item>
      </cube-form>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import validate from "@/main/utils/format/validate";
import commonMixin from '@/modules/module-iaccount/mixins/common'
import { mapGetters } from 'vuex';

export default {
  mixins: [commonMixin],
  data() {
    return {
      validity: {},
      valid: undefined,
      //TODO:根据港美股入口换券商列表
      isHk: true,
      // isShowCapitalList: false,
      transferOutInfoModel: {
        transferOutCompany: '',
        accountNumber: '',
        accountName: '',
        otherTransferOutCompanyName: '',
        ccass: '',
        rolloutContacts: '',
        contactPhoneNum: '',
      },
      recieverInfoModel: {
        receiveSec: '立桥证券',
        recieveAccount: '',
      },

      // 转出方信息
      fieldsTransferOut: {
        // 转出券商选择
        transferOutCompany: {
          type: "select",
          modelKey: "transferOutCompany",
          label: this.getI18n("transferOutInfo.transferOutCompany.label"),
          props: {
            // title: this.$t("common.cubeComponents.select.title"),
            // cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            // confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "transferOutInfo.transferOutCompany.placeholder"
            ),
            options: optionsList.companyOptions(),
          },
          rules: {
            required: false,
          },
        },
        // 账户号码
        accountNumber: {
          type: "input",
          modelKey: "accountNumber",
          label: this.getI18n("transferOutInfo.accountNumber.label"),
          props: {
            // title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutInfo.accountNumber.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        // 账户姓名
        accountName: {
          type: "input",
          modelKey: "accountName",
          label: this.getI18n("transferOutInfo.accountName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutInfo.accountName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //其他券商名字
        otherTransferOutCompanyName: {
          type: "input",
          modelKey: "otherTransferOutCompanyName",
          label: this.getI18n("transferOutInfo.otherTransferOutCompanyName.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.otherTransferOutCompanyName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //CCASS号码
        ccass: {
          type: "input",
          modelKey: "ccass",
          label: this.getI18n("transferOutInfo.ccass.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.ccass.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //联系人
         rolloutContacts: {
          type: "input",
          modelKey: " rolloutContacts",
          label: this.getI18n("transferOutInfo. rolloutContacts.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo. rolloutContacts.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //联系人电话
        contactPhoneNum: {
          type: "input",
          modelKey: "contactPhoneNum",
          label: this.getI18n("transferOutInfo.contactPhoneNum.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.contactPhoneNum.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
      },
      
      //接收方信息
      fieldsReciever: {
        receiveSec: {
          type: "input",
          modelKey: "receiveSec",
          label: this.getI18n("recieverInfo.receiveSec.label"),
          props: {
            placeholder: this.getI18n(
              "recieverInfo.receiveSec.placeholder"
            ),
            disabled: true
          },
          rules: {
            required: false,
          },
        },
        recieveAccount: {
          type: "select",
          modelKey: "recieveAccount",
          label: this.getI18n("recieverInfo.recieveAccount.label"),
          props: {
            placeholder: this.getI18n(
              "recieverInfo.recieveAccount.placeholder"
            ),
            options: optionsList.companyOptions(),
          },
          rules: {
            required: false,
          },
        },
      },
    }
  },
  props: {
    intoType: {
      type: String,
      default: 'hk'
    }
  },
  computed: {
    ...mapGetters([
      //客户选择港股还是美股
      'isShares',
      //历史选择
      'isHistoryShares',
      'stockTransferredUS',
      'stockTransferredHK',
    ]),
    // 返回title
    titleValues() {
      return {
        transferOut: this.getI18n("transferOutInfo.title"),
        reciever: this.getI18n("recieverInfo.title"),
      };
    },
    // 判断路由入口是美股还是港股
    isHK() {
      if (this.intoType === 'hk') {
        return true
      }
      return false
    },

    // 验证提交按钮
    isDisabled() {
      let data = {
        ...this.transferOutInfoModel,
        ...this.recieverInfoModel
      };
      //TODO:校验要做优化，CCASS要不要后台做校验
      // 证券转出商不为其他
      if (this.transferOutInfoModel.transferOutCompany !== 'OTH') {
        const {
          otherTransferOutCompanyName,
          ccass,
           rolloutContacts,
          contactPhoneNum,
          ...objTemp
        } = data;
        for (let item of Object.keys(objTemp)) {
          // 证券转出商未选择
          if (!objTemp.transferOutCompany) {
            return false
          }
          //未选择接收账户
          if (!objTemp.recieveAccount) {
            return false
          }
        //每项都大于两个字符时通过
          if (objTemp[item].length <2) {
            return false
          }
        };
        return true
      } else {
        //证券转出商为其他
        for (let item of Object.keys(data)) {
          // 证券转出商未选择
          if (!data.transferOutCompany) {
            return false
          }
          //未选择接收账户
          if (!data.recieveAccount) {
            return false
          }
        //每项都大于两个字符时通过
          if (data[item].length <2) {
            return false
          }
        };
        return true
      }
    },
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.intoStock.transferInfo.${key}`);
    },
    // 数据回填
    initInfo() {
      this.$store.dispatch('getTransferredStock', this.stockTransferred).then(() => {
        console.log( this.stockTransferredHK, '获得历史')
        console.log(this.isShares, 1)
        console.log(this.isHistoryShares, 2)
        console.log(this.stockTransferredHK, 3)
      if (this.isShares === this.isHistoryShares) {
        if(this.isShares === 1) {
          Object.keys(this.transferOutInfoModel).forEach((key) => {
            if (this.stockTransferredHK.stock[key]) {
              this.transferOutInfoModel[key] = this.stockTransferredHK.stock[key] 
            }
          })      
          Object.keys(this.recieverInfoModel).forEach((key) => {
            if (this.stockTransferredHK[key]) {
              this.recieverInfoModel[key] = this.stockTransferredHK[key] 
            }
          })      
        }
        console.log(this.transferOutInfoModel, 1234523)
      }
        
        })
    },
    // 下一步
    handleNext(e) {
      e.preventDefault();
      // 保存数据&下一步
      const params = {
        // step: this.step,
        info: {
          ...this.transferOutInfoModel,
          ...this.recieverInfoModel,
        },
      };
      // this.saveCacheInfo(params).then(() => {
      //   this.$router.push({ name: this.nextStep });
      // });
      this.$router.push('stock-detail')
    },
    // validateHandler(result) {
    //   this.validity = result.validity;
    //   this.valid = result.valid;
    // },
    // 获取后台数据字典
    // async fetchDataDesin() {
    //   const result = await this.$store.dispatch(
    //     "getDictionary",
    //     AO_INVEST_TARGET
    //   );
    //   // this.model.investTarget = result.map(v => v.value)
    //   this.fieldsFinance[4].props.options = result.map((res) => ({
    //     text: res.name,
    //     value: res.value,
    //   }));
    // },
  },
  // watch: {
  //   "modelExperience.warrantsInvestmentExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeWarrantsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.futuresInvestmentExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeFuturesFrequency = 0;
  //     }
  //   },
  //   "modelExperience.optionsExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeOptionsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.CCBCExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeUnitTrustsFrequency = 0;
  //     }
  //   },
  //   "modelExperience.otherProductsExperience"(newVal, oldVal) {
  //     if (newVal === 0) {
  //       this.modelTrade.tradeOtherProductsFrequency = 0;
  //     }
  //   },
  // },
  created() {
      this.initInfo();
  },
  mounted() {
  },
}
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>