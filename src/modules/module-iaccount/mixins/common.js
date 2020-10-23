import { mapGetters } from "vuex";
import {
  EMPTY_LABEL,
  FPS,
  CHECK,
  EDDA,
  EBANK,
  USD,
  HELP_URL,
  OTHER,
} from "@/modules/module-iaccount/define";
import * as tips from "@/main/utils/common/tips";
import userAgent from "@/main/utils/common/ua-info";
import { getURLParameters } from "@/modules/module-iaccount/utils/url";
import { formatToDBC } from "@/modules/module-iaccount/utils/format";
import { format_DepositFPS } from "@/modules/module-iaccount/format/deposit";
import { format_getBankAccount } from "@/modules/module-iaccount/format/common";
import SecApi from "@/modules/module-iaccount/api/modules/api-sec";
import AccountApi from "@/modules/module-iaccount/api/modules/api-account";
const envConfig = window._GLOBAL_ENV_CONFIG || {};
const selfURL = envConfig.webIAccount;
import { toast } from "@/main/utils/common/tips";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters([
      "secAccountInfo",
      "depositBankData",
      "depositBankType",
      //客户选择港股还是美股
      "isShares",
      //历史选择
      "isHistoryShares",
      "stockTransferredUS",
      "stockTransferredHK",
    ]),
    getPhone() {
      return window.PHONE_CN;
    },
    getPhone_HK() {
      return window.PHONE_HK;
    },
    getPhone_HK_CHECK() {
      return window.PHONE_HK_CHECK;
    },
  },
  methods: {
    // 处理调整地址方法 - 针对帮助中心指引
    gotoGuide(url) {
      // 如app-IOS需额外处理
      if (userAgent.isApp() && userAgent.isIOS()) {
        window.JFSTOCK.jumpUrl({
          url: url,
          backHeader: true,
          isNeedHeader: true,
        });
      } else {
        window.location.href = url;
      }
    },
    // 拨打电话
    tellPhone(phone) {
      if (!phone) return;
      window.JFSTOCK.userMakePhone({ phone });
    },
    // 交易信息展示 名称 + 英文
    getAccountHmtl(secAccountInfo) {
      const val = secAccountInfo
        ? secAccountInfo.clientNameCn + "(" + secAccountInfo.clientNameEn + ")"
        : EMPTY_LABEL;
      const valHtml = `<strong class="font-strong">${val}</strong>`;
      return valHtml;
    },
    // 客户交易账户状态
    getAccountStatus() {
      const { clientStatus } = this.secAccountInfo || {};
      // 账号已冻结
      if (clientStatus === "1") {
        tips.jfDialog({
          render: (createElement) => {
            return createElement("p", null, [
              createElement("span", null, this.$t("iAccount.common.text_18")),
              createElement(
                "span",
                {
                  class: {
                    "font-link": true,
                  },
                  on: {
                    click: (e) => {
                      this.tellPhone(this.getPhone_HK);
                    },
                  },
                },
                this.getPhone_HK
              ),
              createElement("span", null, this.$t("iAccount.common.text_19")),
              createElement(
                "span",
                {
                  class: {
                    "font-link": true,
                  },
                  on: {
                    click: (e) => {
                      this.tellPhone(this.getPhone);
                    },
                  },
                },
                this.getPhone
              ),
            ]);
          },
          onConfirm: () => {
            this.closeBack();
          },
        });
      }
    },
    // 关闭回调地址
    closeBack(url = selfURL) {
      if (userAgent.isApp()) {
        // app
        window.JFSTOCK.closeWebView();
      } else {
        const { source } = getURLParameters();
        // 存在来源-回调
        if (source) {
          window.location.href = source;
        } else {
          window.location.href = url;
        }
      }
    },
    // 民生出金 - 弹框
    showDialog_withdraw_cmbchk() {
      tips.jfDialog({
        render: (createElement) => {
          return [
            createElement("p", null, [
              createElement(
                "span",
                null,
                this.$t("iAccount.withdraw.select_bank.text_4")
              ),
              // createElement('span', {
              //   class: {
              //     'font-link': true
              //   },
              //   on: {
              //     click: (e) => {
              //       // 民生 - 出金指引
              //       this.gotoGuide(HELP_URL.CMBC_WITHDRAW_HOW)
              //     }
              //   }
              // }, this.$t('iAccount.withdraw.select_bank.text_5'))
            ]),
          ];
        },
      });
    },
    // 入金银行数据
    async fetchDepositBankList() {
      let bank_cn = [];
      let bank_hk = [];
      let bank_other = [];
      const bank_type = this.$t("iAccount.define.BANK_TYPE");
      try {
        // 香港
        bank_hk = await SecApi.bankListDeposit({
          bankType: bank_type[0].value,
        });
        // 大陆
        bank_cn = await SecApi.bankListDeposit({
          bankType: bank_type[1].value,
        });
        // 其他地区
        bank_other = await SecApi.bankListDeposit({
          bankType: bank_type[2].value,
        });
      } catch (error) {}
      const banks = bank_hk.concat(bank_cn);
      console.log(banks);
      return { banks, bank_hk, bank_cn, bank_other };
    },
    // 入金方式处理
    async judgeDepositWay(supportType, depositCurrency) {
      // 1.后台配置入金方式 - 默认网银
      let ways = (supportType || "").split(",");
      // 2.入金币种 - 美元 - 不展示FPS
      const isUS = depositCurrency.code === USD;
      if (isUS) {
        ways = ways.filter(
          (item) =>
            item !== this.$t("iAccount.define.DEPOSIT_WAY")[FPS].code &&
            item !== this.$t("iAccount.define.DEPOSIT_WAY")[EDDA].code
        );
      }
      // 3.香港卡开户 - 不展示支票
      const { bankType } = await AccountApi.getOpenBankType();
      if (bankType === 0) {
        ways = ways.filter(
          (item) => item !== this.$t("iAccount.define.DEPOSIT_WAY")[CHECK].code
        );
      }
      console.log("ways", ways);
      return ways;
    },
    // 处理是否可再次入金
    async getDepositAgainBank(data) {
      console.log("处理入金记录", data);
      // 该数据入金方式
      const wayKey = (data.bankCode || "").toUpperCase();
      console.log("处理入金记录-wayKey", wayKey);

      // 匹配出入金方式 - 其他为网银
      const temp_way =
        this.$t("iAccount.define.DEPOSIT_WAY")[wayKey] ||
        this.$t("iAccount.define.DEPOSIT_WAY")[EBANK];
      console.log("处理入金记录-temp_way", temp_way);

      // 该银行卡类型下所有银行列表数据
      const temp_bankList = await SecApi.bankListDeposit({
        bankType: data.bankType,
      });
      console.log("处理入金记录-temp_bankList", temp_bankList);
      const FPS_CHECK_key = [FPS, CHECK];
      // 并找出支持该入金方式的银行
      let temp_bankItem;
      if (wayKey === OTHER || FPS_CHECK_key.indexOf(wayKey) === -1) {
        // 其他银行OTHER 或者具名银行 - 匹配OMS配置的入金银行
        temp_bankItem = temp_bankList.find((item) => {
          const isSomeWay =
            (item.supportType || "").indexOf(temp_way.code) !== -1;
          return isSomeWay && item.key === wayKey;
        });
      } else {
        // FPS、CHECK - 匹配收款银行名称或编码
        temp_bankItem = temp_bankList.find((item) => {
          const isSomeWay =
            (item.supportType || "").indexOf(temp_way.code) !== -1;
          // const isSomeBank = (formatToDBC(item.bankInfo.bankName) === formatToDBC(data.getBankNameCn) || item.bankInfo.code === data.getBankCode)
          const isSomeBank =
            formatToDBC(item.name) === formatToDBC(data.remittanceBankName) ||
            item.key === data.remittanceBankCorde;
          // return isSomeWay && isSomeBank
          return (
            isSomeWay && isSomeBank && item.key === data.remittanceBankCorde
          );
        });
      }
      console.log("处理入金记录-temp_bankItem", temp_bankItem);
      if (!temp_bankItem) {
        console.log("未找到相同方式入金银行");
        return false;
      }

      return { wayKey, temp_way, temp_bankItem };
    },
    // 再次入金
    async judgeDepositAgain(data) {
      const res = await this.getDepositAgainBank(data);
      if (!res) return false;

      // 获取匹配的入金数据
      const { wayKey, temp_way, temp_bankItem } = res;
      this.$store.dispatch("selectWay", temp_way);
      this.$store.dispatch("selectBankItem", temp_bankItem);

      // 币种
      const temp_currency = this.$t("iAccount.define.CURRENCY").find(
        (item) => item.value === data.currency
      );
      this.$store.dispatch("selectCurrency", temp_currency);
      console.log("再次转入-temp_currency", temp_currency);

      // 银行卡类型
      const temp_bankType = this.$t("iAccount.define.BANK_TYPE").find(
        (item) => item.value === data.bankType
      );
      this.$store.dispatch("selectBankType", temp_bankType);
      console.log("再次转入-temp_bankType", temp_bankType);

      // 构造入金时汇款银行数据
      const temp_bankHis = {
        bankName: data.remittanceBankName,
        bankAccount: data.remittanceBankAccount,
        bankAccountName: data.remittanceAccountNameEn,
      };
      this.$store.dispatch("setDepositBankHis", temp_bankHis);
      console.log("再次转入-temp_bankHis", temp_bankHis);

      let temp_wayInfo;
      // 最后构造入金方式对应的数据，并进入对应路由
      switch (wayKey) {
        case FPS:
          const params = {
            depositType: temp_way.code,
            bankType: data.bankType,
            key: data.remittanceBankCorde,
          };
          const temp_fps = await SecApi.typeSettingInfo(params);
          temp_wayInfo = format_DepositFPS(temp_fps)[0];
          this.$store.dispatch("setWayInfo", temp_wayInfo);
          console.log("再次转入-temp_wayInfo", temp_wayInfo);
          if (data.bankType === this.$t("iAccount.define.BANK_HK").value) {
            this.$router.push({ name: "sec-fps-hk" });
          } else {
            this.$router.push({ name: "sec-fps-other" });
          }
          break;
        case CHECK:
          temp_wayInfo = this.$t("iAccount.define.CHECK_INFO");
          this.$store.dispatch("setWayInfo", temp_wayInfo);
          console.log("再次转入-temp_wayInfo", temp_wayInfo);
          if (data.bankType === this.$t("iAccount.define.BANK_HK").value) {
            this.$router.push({ name: "sec-check-hk" });
          } else {
            this.$router.push({ name: "sec-check-other" });
          }
          break;
        default:
          temp_wayInfo = temp_bankItem;
          this.$store.dispatch("setWayInfo", temp_wayInfo);
          console.log("再次转入-temp_wayInfo", temp_wayInfo);
          // 区分大陆还是香港卡
          // if (data.bankType === this.$t('iAccount.define.BANK_HK').value) {
          //   this.$router.push({ name: 'sec-e-banking-hk' })
          // } else {
          //   this.$router.push({ name: 'sec-e-banking-cn' })
          // }
          switch (data.bankType) {
            case 1:
              this.$router.push({ name: "sec-e-banking-cn" });
              break;
            case 2:
              this.$router.push({ name: "sec-e-banking-hk" });
              break;
            case 3:
              this.$router.push({ name: "sec-e-banking-other" });
              break;
          }
          break;
      }
    },
    /**
     * 查询edda列表
     * 状态 0未授权 1授权中 2授权失败 3授权成功 4解除授权
     * @param {*} type
     */
    async fetchEddaList(type) {
      const params = {
        clientId: this.secAccountInfo.tradeAccount,
        fundAccount:
          this.secAccountInfo.fundAccount.length &&
          this.secAccountInfo.fundAccount[0],
        bankCode: this.depositBankData.value,
        bankType: this.depositBankType.value,
      };
      let list = [];
      const res = await SecApi.getEddaBankInfo(params);
      switch (type) {
        case 0:
          list = res.filter((data) => data.eddaState === 0);
          break;
        case 1:
          list = res.filter((data) => data.eddaState === 1);
          break;
        case 2:
          list = res.filter((data) => data.eddaState === 2);
          break;
        case 3:
          list = res.filter((data) => data.eddaState === 3);
          break;
        case 4:
          list = res.filter((data) => data.eddaState === 4);
          break;
        default:
          list = res;
          break;
      }
      return list;
    },
    //提交后台缓存
    commitInfoCache(data) {
      this.$store.dispatch("sendTransferredStockCache", data);
    },
    //提醒方法
    commonToast(text = "") {
      if (typeof text === "string") {
        return toast({
          type: "txt",
          txt: text,
          time: 1000,
        });
      }
    },
    //校验方法
    checkInfo(data = "", func, warn = "", preCondition = true) {
      //不满足前置条件时返回真
      if (!preCondition) {
        return true;
      }
      if (!func || typeof func !== "function") {
        return;
      }
      if (!func(data)) {
        this.commonToast(warn);
        return false;
      } else {
        return true;
      }
    },
    checkList(arr) {
      console.log('adsfga', arr);
      if (arr && Array.isArray(arr)) {
        return arr.every((item) => {
          return this.checkInfo(
            item.val,
            item.func,
            item.msg,
            item.preCondition
          );
        });
      }
    },
  },
  filters: {
    filterEmptyVal(val) {
      return val || EMPTY_LABEL;
    },
    filterSubStr(val) {
      return format_getBankAccount(val);
    },
  },
};
