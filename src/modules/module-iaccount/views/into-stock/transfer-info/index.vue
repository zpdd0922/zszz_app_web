<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="transfer-info-wrap">
      <!-- 转出方信息 -->
      <div class="transfer-info-title">{{ titleValues.transferOut }}</div>
      <cube-form
        :model="transferOutInfoModel"
        class="step-content custom-form-group"
      >
        <cube-form-item
          :field="fieldsTransferOut.transferOutCompany"
        ></cube-form-item>
        <!-- 转出公司为其他时弹出 -->
        <template v-if="transferOutInfoModel.transferOutCompany === 'OTH'">
          <cube-form-item
            :field="fieldsTransferOut.otherTransferOutCompanyName"
          ></cube-form-item>
        </template>
        <cube-form-item
          :field="fieldsTransferOut.accountNumber"
        ></cube-form-item>
        <!-- <cube-form-item :field="fieldsTransferOut.accountName"></cube-form-item> -->
        <div class="cube-form-item border-bottom-1px">
          <div class="cube-form-label">
            <span>{{ getI18n("transferOutInfo.accountName.label") }}</span>
          </div>
          <div class="cube-validator cube-form-field">
            <div class="cube-validator-content">
              <cube-select
                :options="nameList"
                :placeholder="
                  getI18n('transferOutInfo.accountName.placeholder')
                "
                v-model="transferOutInfoModel.accountName"
              ></cube-select>
            </div>
          </div>
        </div>

        <template v-if="transferOutInfoModel.transferOutCompany === 'OTH'">
          <cube-form-item :field="fieldsTransferOut.ccass"></cube-form-item>
          <cube-form-item
            :field="fieldsTransferOut.rolloutContacts"
          ></cube-form-item>
          <cube-form-item
            :field="fieldsTransferOut.contactsPhoneNum"
          ></cube-form-item>
        </template>
        <div class="tips">
          {{ getI18n("tips1") }}{{ secAccountInfo.clientNameEn
          }}{{ getI18n("tips2") }}
        </div>
      </cube-form>
      <!-- 接收方信息 -->
      <div class="transfer-info-title">{{ titleValues.receiver }}</div>
      <cube-form
        :model="receiverInfoModel"
        class="step-content custom-form-group"
      >
        <div></div>
        <cube-form-item :field="fieldsreceiver.receiveSec"></cube-form-item>
        <!-- <cube-form-item :field="fieldsreceiver.receiveAccount" :options="fundAccount"></cube-form-item> -->
        <!-- 用fieldsoptions绑定不了变量，改成cube-form -->
        <div class="cube-form-item border-bottom-1px">
          <div class="cube-form-label">
            <span>{{ getI18n("receiverInfo.receiveAccount.label") }}</span>
          </div>
          <div class="cube-validator cube-form-field">
            <div class="cube-validator-content">
              <cube-select
                :options="accountList"
                :placeholder="
                  getI18n('receiverInfo.receiveAccount.placeholder')
                "
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
<script type="text/ecmascript-6">
// import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import validate from "@/main/utils/format/validate";
import { isRealLength } from "@/main/utils/format/is";
import commonMixin from "@/modules/module-iaccount/mixins/common";
import { mapGetters } from "vuex";
import { MAX_LENGTH } from "@/modules/module-iaccount/define/maxLength";

export default {
  mixins: [commonMixin],
  data() {
    return {
      //TODO:根据港美股入口换券商列表
      isHk: true,
      // isShowCapitalList: false,
      transferOutInfoModel: {
        transferOutCompany: "",
        accountNumber: "",
        accountName: "",
        otherTransferOutCompanyName: "",
        ccass: "",
        rolloutContacts: "",
        contactsPhoneNum: "",
      },
      receiverInfoModel: {
        receiveSec: this.getI18n("secName"),
        receiveAccount: "",
      },
      metaInfo: {
        type: "in",
        step: 0,
      },
      accountList: [],
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
            maxlength: MAX_LENGTH.TWENTY
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
            readonly: true,
            placeholder: this.getI18n(
              "transferOutInfo.accountName.placeholder"
            ),
            maxlength: MAX_LENGTH.TWENTY
          },
          rules: {
            required: false,
          },
        },
        //其他券商名字
        otherTransferOutCompanyName: {
          type: "input",
          modelKey: "otherTransferOutCompanyName",
          label: this.getI18n(
            "transferOutInfo.otherTransferOutCompanyName.label"
          ),
          props: {
            placeholder: this.getI18n(
              "transferOutInfo.otherTransferOutCompanyName.placeholder"
            ),
            maxlength: MAX_LENGTH.TWENTY
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
            placeholder: this.getI18n("transferOutInfo.ccass.placeholder"),
            maxlength: MAX_LENGTH.TWENTY

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
            maxlength: MAX_LENGTH.TWENTY

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
            maxlength: MAX_LENGTH.TWENTY

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
            placeholder: this.getI18n("receiverInfo.receiveSec.placeholder"),
            disabled: true,
          },
          rules: {
            required: false,
          },
        },
      },
    };
  },
  props: {
    intoType: {
      type: Number,
    },
  },
  computed: {
    ...mapGetters([
      //客户选择港股还是美股
      "isShares",
      //历史选择
      "stockTransferredUS",
      "stockTransferredHK",
      "secAccountInfo",
      "sharesList",
    ]),
    nameList() {
      const list = [];
      if (this.secAccountInfo) {
        const { clientNameEn = "", clientNameCn = "" } = this.secAccountInfo;
        if (isRealLength(clientNameEn)) {
          list.push({ value: String(clientNameEn), text: clientNameEn });
        }
        if (isRealLength(clientNameCn)) {
          list.push({ value: String(clientNameCn), text: clientNameCn });
        }
      }
      return list;
    },

    // 账户列表
    fundAccount() {
      if (this.secAccountInfo) {
        return this.secAccountInfo.fundAccount.map((item) => {
          const { fundAccount: account, assetProp } = item;

          const txt =
            assetProp === "M"
              ? this.$t("iAccount.withdraw.request.text_2m")
              : this.$t("iAccount.withdraw.request.text_2");
          return {
            value: item.fundAccount,
            text: txt + " - " + item.fundAccount,
          };
        });
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
        return true;
      }
      return false;
    },

    // 验证提交按钮
    isDisabled() {
      let data = {
        ...this.transferOutInfoModel,
        ...this.receiverInfoModel,
      };
      //TODO:校验要做优化，CCASS要不要后台做校验
      // 证券转出商不为其他
      if (this.transferOutInfoModel.transferOutCompany !== "OTH") {
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
            return false;
          }
          //未选择接收账户
          if (!objTemp.receiveAccount) {
            return false;
          }
          //每项都大于两个字符时通过
          if (objTemp[item].length < 2) {
            return false;
          }
        }
        return true;
      } else {
        //证券转出商为其他
        for (let item of Object.keys(data)) {
          // 证券转出商未选择
          if (!data.transferOutCompany) {
            return false;
          }
          //未选择接收账户
          if (!data.receiveAccount) {
            return false;
          }
          //每项都大于两个字符时通过
          if (data[item].length < 2) {
            return false;
          }
        }
        return true;
      }
    },
  },
  methods: {
    // 格式化现金账号选项
    _formatAccount() {
      const { fundAccount = [] } = this.secAccountInfo;
      this.accountList = fundAccount.map((item) => {
        const { fundAccount: account, assetProp } = item;
        const txt =
          assetProp === "M"
            ? this.$t("iAccount.withdraw.request.text_2m")
            : this.$t("iAccount.withdraw.request.text_2");
        return {
          value: item.fundAccount,
          text: txt + " - " + item.fundAccount,
        };
      });
      // 默认选中第一项
      this.receiverInfoModel.receiveAccount = this.accountList[0].value;
    },
    getI18n(key) {
      return this.$t(`iAccount.intoStock.transferInfo.${key}`);
    },
    // 数据回填
    initInfo() {
      const stockType = this.intoType || Number(this.isShares);
      if (stockType === 1) {
        if (!this.stockTransferredHK.in.isShares) {
          // this.transferOutInfoModel.accountName = this.secAccountInfo.clientNameEn;
          // this.receiverInfoModel.receiveAccount = this.secAccountInfo.fundAccount[0];
          return;
        } else {
          const companyName = this.stockTransferredHK.in.secName;
          Object.keys(this.transferOutInfoModel).forEach((key) => {
            // 判断转出公司名字是否是其他
            if (companyName) {
              const companyList = optionsList.companyOptions().map((item) => {
                return item.value;
              });
              if (companyList.includes(companyName)) {
                this.transferOutInfoModel.transferOutCompany = companyName;
              } else {
                this.transferOutInfoModel.otherTransferOutCompanyName = companyName;
                this.transferOutInfoModel.transferOutCompany = "OTH";
              }
            }
            if (this.stockTransferredHK.in[key]) {
              this.transferOutInfoModel[key] = this.stockTransferredHK.in[key];
            }
          });
          Object.keys(this.receiverInfoModel).forEach((key) => {
            if (this.stockTransferredHK.in[key]) {
              this.receiverInfoModel[key] = this.stockTransferredHK.in[key];
            }
          });
        }
      } else if (stockType === 2) {
        if (!this.stockTransferredUS.in.isShares) {
          // this.transferOutInfoModel.accountName = this.secAccountInfo.clientNameEn;
          // this.receiverInfoModel.receiveAccount = this.secAccountInfo.fundAccount[0];
          return;
        } else {
          const companyName = this.stockTransferredUS.in.secName;
          Object.keys(this.transferOutInfoModel).forEach((key) => {
            // 判断转出公司名字是否是其他
            if (companyName) {
              const companyList = optionsList.companyOptions().map((item) => {
                return item.value;
              });
              if (companyList.includes(companyName)) {
                this.transferOutInfoModel.transferOutCompany = companyName;
              } else {
                this.transferOutInfoModel.otherTransferOutCompanyName = companyName;
                this.transferOutInfoModel.transferOutCompany = "OTH";
              }
            }
            if (this.stockTransferredUS.in[key]) {
              this.transferOutInfoModel[key] = this.stockTransferredUS.in[key];
            }
          });
          Object.keys(this.receiverInfoModel).forEach((key) => {
            if (this.stockTransferredUS.in[key]) {
              this.receiverInfoModel[key] = this.stockTransferredUS.in[key];
            }
          });
        }
      }
      // this.transferOutInfoModel.accountName = this.secAccountInfo.clientNameEn;
      // this.receiverInfoModel.receiveAccount = this.secAccountInfo.fundAccount[0];
    },
    formatSubData() {
      let secName = "";
      if (this.transferOutInfoModel.transferOutCompany === "OTH") {
        secName = this.transferOutInfoModel.otherTransferOutCompanyName;
      } else {
        secName = this.transferOutInfoModel.transferOutCompany;
        this.transferOutInfoModel.ccass = "";
        this.transferOutInfoModel.rolloutContacts = "";
        this.transferOutInfoModel.contactsPhoneNum = "";
      }
      const clientIdTemp = (() => {
        if (Number(this.isShares) === 1) {
          return (
            this.secAccountInfo.tradeAccount ||
            this.stockTransferredHK.in.clientId
          );
        } else {
          return (
            this.secAccountInfo.tradeAccount ||
            this.stockTransferredUS.in.clientId
          );
        }
      })();
      //请求参数需要字段
      const tempStock = {
        accountName: "",
        accountNumber: "",
        ccass: "",
        clientId: clientIdTemp,
        contactsPhoneNum: "",
        isShares: this.intoType || Number(this.isShares),
        receiveAccount: "",
        receiveSec: "",
        rolloutContacts: "",
        secName: secName,
      };
      const fullData = {
        ...this.transferOutInfoModel,
        ...this.receiverInfoModel,
      };
      // 数据填充
      Object.assign(tempStock, fullData);
      // 请求全部参数
      return {
        info: "",
        ...this.metaInfo,
        ...tempStock,
        shareInfo: this.sharesList.in,
      };
    },
    // 如果券商选择为其他，数据校验
    handleBefore() {
      const checkList = [
        {
          val: this.transferOutInfoModel.otherTransferOutCompanyName,
          func: isRealLength,
          preCondition: this.transferOutInfoModel.transferOutCompany === 'OTH',
          msg: this.getI18n('warn.otherTransferOutCompanyName'),
        },
        {
          val: this.transferOutInfoModel.accountNumber,
          func: validate.isAccountNum,
          msg: this.getI18n('warn.accountNumber'),
        },
        {
          val: this.transferOutInfoModel.accountName,
          func: isRealLength,
          msg: this.getI18n('warn.accountName'),
        },
        {
          val: this.transferOutInfoModel.ccass,
          func: validate.isBankNum,
          preCondition: this.transferOutInfoModel.transferOutCompany === 'OTH',
          msg: this.getI18n('warn.ccass'),
        },
        {
          val: this.transferOutInfoModel.rolloutContacts,
          func: isRealLength,
          preCondition: this.transferOutInfoModel.transferOutCompany === 'OTH',
          msg: this.getI18n('warn.rolloutContacts'),
        },
        {
          val: this.transferOutInfoModel.contactsPhoneNum,
          func: validate.isMobile,
          preCondition: this.transferOutInfoModel.transferOutCompany === 'OTH',
          msg: this.getI18n('warn.contactsPhoneNum'),
        },
      ]
      const result = this.checkList(checkList)
      if (!result) {
        return false
      }
      return true;
    },
    // 下一步
    handleNext(e) {
      e.preventDefault();
      const validate = this.handleBefore();
      if (!validate) {
        return;
      }
      // 保存数据&下一步
      let fullData = {};
      const tempData = this.formatSubData();
      if (Number(this.isShares) === 1) {
        fullData = { ...this.stockTransferredHK.in, ...tempData };
        this.$store.commit("SET_STOCK_TRANSFERRED_HK", {
          stockTransferredHK: fullData,
          type: "in",
        });
      } else if (Number(this.isShares === 2)) {
        fullData = { ...this.stockTransferredHK.in, ...tempData };
        this.$store.commit("SET_STOCK_TRANSFERRED_US", {
          stockTransferredUS: fullData,
          type: "in",
        });
      }
      this.$store.dispatch("sendTransferredStockCache", fullData).then(() => {
        this.$router.push({
          name: "stockDetail",
        });
      });
    },
  },
  created() {
    this._formatAccount();
    this.initInfo();
  },
  mounted() {},
};
</script>