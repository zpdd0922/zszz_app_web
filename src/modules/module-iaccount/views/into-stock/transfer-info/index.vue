<template>
  <div>
    <template v-if="isUpdating"> 
      <loading />
    </template>
    <template v-else>
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
              <cube-form-item :field="fieldsTransferOut.rolloutContacts"></cube-form-item>
              <cube-form-item :field="fieldsTransferOut.contactsPhoneNum"></cube-form-item>
            </template>
            <!-- 提醒 -->
            <!-- <div class="tips" v-if="transferOutCompany==='OTH'"></div> -->
            <div class="tips">{{getI18n('tips1')}}{{secAccountInfo.clientNameEn}}{{getI18n('tips2')}}</div>
          </cube-form>
            <!-- 接收方信息 -->
          <div class="transfer-info-title">{{titleValues.receiver}}</div>
          <cube-form :model="receiverInfoModel">
            <div></div>
            <cube-form-item :field="fieldsreceiver.receiveSec"></cube-form-item>
            <!-- <cube-form-item :field="fieldsreceiver.receiveAccount" :options="fundAccount"></cube-form-item> -->
            <!-- 用fieldsoptions绑定不了变量，改成cube-form -->
            <div class="cube-form-item border-bottom-1px">
              <div class="cube-form-label">
                <span>{{getI18n("receiverInfo.receiveAccount.label")}}</span>
              </div>
              <div class="cube-validator cube-form-field">
                <div class="cube-validator-content">
                  <cube-select 
                    :options="fundAccount"
                    :placeholder="getI18n('receiverInfo.receiveAccount.placeholder')"
                    v-model="receiverInfoModel.receiveAccount"
                  ></cube-select>
                </div>
              </div>
            </div>
          </cube-form>
          <div class="margin-bottom"></div>
        </div>
      </op-wrap>
    </template>  
  </div>
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
      isUpdating: false,
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
        contactsPhoneNum: '',
      },
      receiverInfoModel: {
        receiveSec: '立桥证券',
        receiveAccount: '',
      },
      metaInfo: {
        step: 1,
        state: 1
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
          modelKey: "rolloutContacts",
          label: this.getI18n("transferOutInfo.rolloutContacts.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.rolloutContacts.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        //联系人电话
        contactsPhoneNum: {
          type: "input",
          modelKey: "contactsPhoneNum",
          label: this.getI18n("transferOutInfo.contactsPhoneNum.label"),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.contactsPhoneNum.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
      },
      
      //接收方信息
      fieldsreceiver: {
        receiveSec: {
          type: "input",
          modelKey: "receiveSec",
          label: this.getI18n("receiverInfo.receiveSec.label"),
          props: {
            placeholder: this.getI18n(
              "receiverInfo.receiveSec.placeholder"
            ),
            disabled: true
          },
          rules: {
            required: false,
          },
        },
        // receiveAccount: {
        //   type: "select",
        //   modelKey: "receiveAccount",
        //   label: this.getI18n("receiverInfo.receiveAccount.label"),
        //   props: {
        //     placeholder: this.getI18n(
        //       "receiverInfo.receiveAccount.placeholder"
        //     ),
        //     // options: this.fundAccount1,
        //   },
        //   rules: {
        //     required: false,
        //   },
        // },
      },
    }
  },
  props: {
    isRefresh: {
      type: Boolean,
      default: true,
    },
    intoType: {
      type: Number,
    },
    updateInfo: {
      type: Function,
    },
    // sendTransferredCache: {
    //   type: Function,
    // },
  },
  computed: {
    ...mapGetters([
      //客户选择港股还是美股
      'isShares',
      //历史选择
      'stockTransferredUS',
      'stockTransferredHK',
      'secAccountInfo',
    ]),

    // 选择港股还是美股
    stockType() {
      return this.intoType || this.isShares;
    },
    // 账户列表
    fundAccount() {
      if (this.secAccountInfo) {
        return this.secAccountInfo.fundAccount.map((item) => {
          return {
            value: String(item),
            text: `现金账户 ${item}`
          }
        })
      }
    },

    // 返回title
    titleValues() {
      return {
        transferOut: this.getI18n("transferOutInfo.title"),
        receiver: this.getI18n("receiverInfo.title"),
      };
    },
    // 判断路由入口是美股还是港股
    isHK() {
      if (this.intoType === 1) {
        return true
      }
      return false
    },

    // 验证提交按钮
    isDisabled() {
      let data = {
        ...this.transferOutInfoModel,
        ...this.receiverInfoModel
      };
      //TODO:校验要做优化，CCASS要不要后台做校验
      // 证券转出商不为其他
      if (this.transferOutInfoModel.transferOutCompany !== 'OTH') {
        const {
          otherTransferOutCompanyName,
          ccass,
          rolloutContacts,
          contactsPhoneNum,
          ...objTemp
        } = data;
        for (let item of Object.keys(objTemp)) {
          // 证券转出商未选择
          if (!objTemp.transferOutCompany) {
            return false
          }
          //未选择接收账户
          if (!objTemp.receiveAccount) {
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
          console.log(data)
          // 证券转出商未选择
          if (!data.transferOutCompany) {
            return false
          }
          //未选择接收账户
          if (!data.receiveAccount) {
            return false
          }
        //每项都大于两个字符时通过
          if (data[item].length < 2) {
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
      const stockType = this.intoType || Number(this.isShares);
      if (stockType === 1) {
        if (!this.stockTransferredHK.stock) {
          return
        } else {
          const companyName = this.stockTransferredHK.stock.secName;
          Object.keys(this.transferOutInfoModel).forEach((key) => {
            // 判断转出公司名字是否是其他
            if (companyName) {
              const companyList = optionsList.companyOptions().map((item) => {
                return item.value
              });
              if (companyList.includes(companyName)) {
                this.transferOutInfoModel.transferOutCompany = companyName;
              } else {
                this.transferOutInfoModel.otherTransferOutCompanyName = companyName;
                this.transferOutInfoModel.transferOutCompany = 'OTH';
              }
            }
            if (this.stockTransferredHK.stock[key]) {
              this.transferOutInfoModel[key] = this.stockTransferredHK.stock[key] 
            }
          })      
          Object.keys(this.receiverInfoModel).forEach((key) => {
            if (this.stockTransferredHK.stock[key]) {
              this.receiverInfoModel[key] = this.stockTransferredHK.stock[key] 
            }
          })      
        }
      } else if(stockType === 2) {
        if (!this.stockTransferredUS.stock) {
          return
        } else {
          const companyName = this.stockTransferredUS.stock.secName;
          Object.keys(this.transferOutInfoModel).forEach((key) => {
            // 判断转出公司名字是否是其他
            if (companyName) {
              const companyList = optionsList.companyOptions().map((item) => {
                return item.value
              });
              if (companyList.includes(companyName)) {
                this.transferOutInfoModel.transferOutCompany = companyName;
              } else {
                this.transferOutInfoModel.otherTransferOutCompanyName = companyName;
                this.transferOutInfoModel.transferOutCompany = 'OTH';
              }
            }
            if (this.stockTransferredUS.stock[key]) {
              this.transferOutInfoModel[key] = this.stockTransferredUS.stock[key] 
            }
          })      
          Object.keys(this.receiverInfoModel).forEach((key) => {
            if (this.stockTransferredUS.stock[key]) {
              this.receiverInfoModel[key] = this.stockTransferredUS.stock[key] 
            }
          })      

        }
      }
    },
    formatSubData() {
      let secName = '';
      if (this.transferOutInfoModel.transferOutCompany === 'OTH') {
        secName = this.transferOutInfoModel.otherTransferOutCompanyName;
      } else {
        secName = this.transferOutInfoModel.transferOutCompany;
        this.transferOutInfoModel.ccass = '';
        this.transferOutInfoModel.rolloutContacts = '';
        this.transferOutInfoModel.contactsPhoneNum = '';
      }
      const clientIdTemp = (() => {
        if (Number(this.isShares) ===1) {
          return this.secAccountInfo.tradeAccount || this.stockTransferredHK.stock.clientId
        } else {
          return this.secAccountInfo.tradeAccount || this.stockTransferredUS.stock.clientId
        }
      })()
      const tempStock = {
        accountName: '',
        accountNumber: '',
        ccass: '',
        clientId: clientIdTemp,
        contactsPhoneNum: '',
        isShares: this.intoType || Number(this.isShares),
        receiveAccount: '',
        receiveSec: '',
        rolloutContacts: '',
        secName: secName,
      }
      const fullData = {
        ...this.transferOutInfoModel,
        ...this.receiverInfoModel,
      }
      Object.assign(tempStock, fullData)
      return {
        info: '',
        ...this.metaInfo,
        stock: {
          ...tempStock
        }
      }
    },
    // 下一步
    handleNext(e) {
      e.preventDefault();
      // 保存数据&下一步
      // const fullData = {type: this.stockType, data: this.formatSubData()};
      let fullData = {};
      const tempData = this.formatSubData();
      if (Number(this.isShares) === 1) {
        fullData = {...this.stockTransferredHK, ...tempData}
        this.$store.commit('SET_STOCK_TRANSFERRED_HK', {stockTransferredHK: fullData})
      } else if (Number(tempData === 2)) {
        fullData = {...this.stockTransferredUS, ...tempData}
        this.$store.commit('SET_STOCK_TRANSFERRED_HK', {stockTransferredHK: fullData})
      }
      this.$store.dispatch('sendTransferredStockCache', tempData);
      this.$router.push({name:'stockDetail', params: {isRefresh: false}});
    },

  },
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