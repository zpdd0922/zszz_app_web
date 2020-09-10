<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="olcn-step olcn-step-info-finance">
      <cube-form-group class="step-content custom-form-group experience-form-group">
          <!-- 转出方信息 -->
        <cube-form :model="transferOutInfoModel">
          <head-title :title="titleValues.transferOut"></head-title>
          <cube-form-item :field="fieldsTransferOut.transferOutCompany"></cube-form-item>
          <template
            v-if="transferOutInfoModel.transferOutCompany === 'OTH'"
          >
            <cube-form-item :field="fieldsTransferOut.otherTransferOutCompanyName"></cube-form-item>
          </template>
          <cube-form-item :field="fieldsTransferOut.transferOutAccount"></cube-form-item>
          <cube-form-item :field="fieldsTransferOut.transferOutName"></cube-form-item>
          <template
            v-if="transferOutInfoModel.transferOutCompany === 'OTH'"
          >
            <cube-form-item :field="fieldsTransferOut.numberOfCCASS"></cube-form-item>
            <cube-form-item :field="fieldsTransferOut.contactName"></cube-form-item>
            <cube-form-item :field="fieldsTransferOut.contactPhone"></cube-form-item>
          </template>
          <!-- 提醒 -->
          <div class="tips"></div>
          <div class="tips"></div>
        </cube-form>
          <!-- 接收方信息 -->
        <cube-form :model="recieverInfoModel">
          <head-title :title="titleValues.reciever"></head-title>
          <div></div>
          <cube-form-item :field="fieldsReciever.recieverCompany"></cube-form-item>
          <cube-form-item :field="fieldsReciever.recieverAccount"></cube-form-item>
        </cube-form>
      </cube-form-group>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import validate from "@/main/utils/format/validate";

export default {
  // mixins: [onlineMixin],
  data() {
    return {
      validity: {},
      valid: undefined,
      //TODO:根据港美股入口换券商列表
      isHk: true,
      // isShowCapitalList: false,
      transferOutInfoModel: {
        transferOutCompany: '',
        transferOutAccount: '',
        transferOutName: '',
        otherTransferOutCompanyName: '',
        numberOfCCASS: '',
        contactName: '',
        contactPhone: '',
      },
      recieverInfoModel: {
        recieverCompany: '立桥证券',
        recieverAccount: '',
      },

      // 转出方信息
      fieldsTransferOut: {
        // 转出券商名字
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
        transferOutAccount: {
          type: "input",
          modelKey: "transferOutAccount",
          label: this.getI18n("transferOutInfo.transferOutAccount.label"),
          props: {
            // title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutInfo.transferOutAccount.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        // 账户姓名
        transferOutName: {
          type: "input",
          modelKey: "transferOutName",
          label: this.getI18n("transferOutInfo.transferOutName.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            placeholder: this.getI18n(
              "transferOutInfo.transferOutName.placeholder"
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
        numberOfCCASS: {
          type: "input",
          modelKey: "numberOfCCASS",
          label: this.getI18n("transferOutInfo.numberOfCCASS.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.numberOfCCASS.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //联系人
        contactName: {
          type: "input",
          modelKey: "contactName",
          label: this.getI18n("transferOutInfo.contactName.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.contactName.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //联系人电话
        contactPhone: {
          type: "input",
          modelKey: "contactPhone",
          label: this.getI18n("transferOutInfo.contactPhone.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.contactPhone.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
      },
      
      //接收方信息
      fieldsReciever: {
        recieverCompany: {
          type: "input",
          modelKey: "recieverCompany",
          label: this.getI18n("recieverInfo.recieverCompany.label"),
          props: {
            placeholder: this.getI18n(
              "recieverInfo.recieverCompany.placeholder"
            ),
            disabled: true
          },
          rules: {
            required: false,
          },
        },
        recieverAccount: {
          type: "select",
          modelKey: "recieverAccount",
          label: this.getI18n("recieverInfo.recieverAccount.label"),
          props: {
            placeholder: this.getI18n(
              "recieverInfo.recieverAccount.placeholder"
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
      if (this.transferOutInfoModel.otherTransferOutCompanyName !== 'OTH') {
        const {
          otherTransferOutCompanyName,
          numberOfCCASS,
          contactName,
          contactPhone,
          ...objTemp
        } = data;
        // 证券转出商未选择
        if (!objTemp.transferOutCompany) {
          return false
        }
        //未选择接收账户
        if (!objTemp.recieverAccount) {
          return false
        }
        //每项都大于两个字符时通过
        for (let item in Object.keys(objTemp)) {
          if ((item !== 'transferOutCompany' && item !== 'recieverAccount') && String(objTemp[item]).length <2) {
            return false
          }
        };
        return true
      } else {
        //证券转出商为其他
        // 证券转出商未选择
        if (!data.transferOutCompany) {
          return false
        }
        //未选择接收账户
        if (!data.recieverAccount) {
          return false
        }
        //每项都大于两个字符时通过
        for (let item in Object.keys(data)) {
          if ((item !== 'transferOutCompany' && item !== 'recieverAccount') && String(data[item]).length <2) {
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
    handlerShowCapital() {
      this.isShowCapitalList = !this.isShowCapitalList;
    },
    // 数据回填
    // initData() {
    //   const userInfo = this.openInfo;
    //   // const defaultDataTrade = this.modelTrade;
    //   const defaultDataExperience = this.modelExperience;

    //   console.log(
    //     // defaultDataTrade,
    //     defaultDataExperience,
    //     // userInfo.tradeStockFrequency
    //   );
    //   Object.keys(defaultDataExperience).forEach((val) => {
    //     defaultDataExperience[val] =
    //       userInfo[val] !== undefined
    //         ? userInfo[val]
    //         : defaultModelExperience[val] !== undefined
    //         ? defaultModelExperience[val]
    //         : defaultDataExperience[val];
    //   });

    //   Object.keys(defaultDataTrade).forEach((val) => {
    //     defaultDataTrade[val] =
    //       userInfo[val] !== undefined
    //         ? userInfo[val]
    //         : defaultModelTrade[val] !== undefined
    //         ? defaultModelTrade[val]
    //         : defaultDataTrade[val];
    //   });
    // },
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
  created() {},
  mounted() {
    // this.initData();
  },
}
</script>
<style scoped>
@import './style.scss';
</style>