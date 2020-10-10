<template>
  <jf-wrap
    class="request"
    :isDisabled="isDisabled"
    :btnText="$t('iAccount.withdraw.request.text_24')"
    :handleBefore="_handleBefore"
    @handleNext="_handleNext"
  >
    <part-card>
      <ul class="detail-form">
        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_1") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">
              <div class="form-select" @click="_clickSelectAccount">
                <span v-if="accountLabel">{{ accountLabel }}</span>
                <span v-else class="txt">{{
                  $t("iAccount.withdraw.request.text_25")
                }}</span>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </part-card>

    <part-card :title="$t('iAccount.withdraw.request.text_3')">
      <ul class="detail-form">
        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_4") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <span class="txt">{{
                withdrawBankInfo.receiptBankName | filterEmptyVal
              }}</span>
            </div>
          </div>
        </li>
        <!-- 选择其他银行 -->
        <li v-if="isShowOther">
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_31") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <input
                v-model="model.withdrawBankNameOther"
                type="text"
                maxlength="150"
                :placeholder="$t('iAccount.withdraw.request.text_32')"
              />
            </div>
            <div class="filed-msg" v-show="model.withdrawBankNameOther">
              <span
                class="txt font-link-size"
                @click="_clearInput('model.withdrawBankNameOther')"
                >{{ $t("iAccount.common.text_16") }}</span
              >
            </div>
          </div>
        </li>

        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_6") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <span v-if="withdrawBankHis" class="txt">{{
                model.withdrawBankAccount
              }}</span>
              <input
                v-else
                v-model="model.withdrawBankAccount"
                type="text"
                maxlength="30"
                :placeholder="$t('iAccount.withdraw.request.text_7')"
              />
            </div>
            <div
              class="filed-msg"
              v-show="!withdrawBankHis && model.withdrawBankAccount"
            >
              <span
                class="txt font-link-size"
                @click="_clearInput('model.withdrawBankAccount')"
                >{{ $t("iAccount.common.text_16") }}</span
              >
            </div>
          </div>
        </li>

        <!-- 需要再次确认账号 -->
        <li v-if="!withdrawBankHis">
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_8") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <input
                v-model="model.withdrawBankAccountAgain"
                type="text"
                maxlength="30"
                :placeholder="$t('iAccount.withdraw.request.text_9')"
              />
            </div>
            <div class="filed-msg" v-show="model.withdrawBankAccountAgain">
              <span
                class="txt font-link-size"
                @click="_clearInput('model.withdrawBankAccountAgain')"
                >{{ $t("iAccount.common.text_16") }}</span
              >
            </div>
          </div>
        </li>

        <template v-if="isBank_CN || isBank_other">
          <li>
            <div class="form-label">
              <span>{{ $t("iAccount.withdraw.request.text_10") }}</span>
            </div>
            <div class="form-filed">
              <div class="filed-item border-bottom-1px">
                <input
                  v-model="model.swiftCode"
                  type="text"
                  maxlength="50"
                  :placeholder="
                    $t('iAccount.withdraw.request.text_11', {
                      name: getSwiftCodeName,
                    })
                  "
                />
              </div>
              <jf-icon
                name="tips_gray"
                @click="
                  _showTip(
                    $t('iAccount.withdraw.request.text_12', {
                      name: getSwiftCodeName,
                    })
                  )
                "
              ></jf-icon>
            </div>
          </li>

          <li>
            <div class="form-label">
              <span>{{ $t("iAccount.withdraw.request.text_13") }}</span>
            </div>
            <div class="form-filed">
              <div class="filed-item border-bottom-1px">
                <input
                  v-model="model.address"
                  type="text"
                  maxlength="50"
                  :placeholder="$t('iAccount.withdraw.request.text_14')"
                />
              </div>
            </div>
          </li>
        </template>
      </ul>
    </part-card>

    <part-card :title="$t('iAccount.withdraw.request.text_15')">
      <ul class="detail-form">
        <!-- <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_16") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item border-bottom-1px">
              <div class="radio-group horizontal">
                <div
                  v-for="item in currencyOptions"
                  :key="item.code"
                  :class="[
                    'form-radio',
                    item.value === Number(model.currency) &&
                      'cube-radio_selected',
                  ]"
                >
                  <label
                    class="cube-radio-wrap"
                    @click="_clickSelectCurrency(item)"
                  >
                    <span class="cube-radio-ui cubeic-round-border"
                      ><i></i
                    ></span>
                    <span class="radio-txt">{{ item.label }}</span>
                  </label>
                </div>
              </div>
            </div>
          </div>
        </li> -->
        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_17") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">
              <input
                v-model="model.withdrawMoney"
                type="text"
                :placeholder="$t('iAccount.withdraw.request.text_18')"
                @focus="_focusMoneyInput"
                @blur="_blurMoneyInput"
              />
            </div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
        <!-- 手续费 -->
        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_33") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">{{ _getFee() }}</div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
        <!-- 实际提取金额 -->
        <li>
          <div class="form-label">
            <span>{{ $t("iAccount.withdraw.request.text_34") }}</span>
          </div>
          <div class="form-filed">
            <div class="filed-item">{{ getAct }}</div>
            <div class="filed-msg">
              <span class="txt">{{ getCurrency.label }}</span>
            </div>
          </div>
        </li>
      </ul>
    </part-card>

    <div class="wrap-tips">
      <ul>
        <li class="cell">
          <div>
            <span>
              {{ $t("iAccount.withdraw.request.text_19") }}
              <em class="money"
                >{{ money | filterEmptyVal }} {{ getCurrency.label }}</em
              >
            </span>
          </div>
          <div>
            <span class="font-link" @click="_clickSetAll">{{
              $t("iAccount.withdraw.request.text_20")
            }}</span>
          </div>
        </li>
        <li class="cell">
          <div>
            <span
              >{{ $t("iAccount.deposit.common.text_7") }}
              {{ withdrawBankInfo.chargeMoney | filterEmptyVal }}</span
            >
            <jf-icon
              v-if="withdrawBankInfo.chargeMoneyRemark"
              name="tips_gray"
              @click="_showTip(withdrawBankInfo.chargeMoneyRemark)"
            ></jf-icon>
          </div>
        </li>
        <li class="cell">
          <div>
            <span
              >{{ $t("iAccount.deposit.common.text_8") }}
              {{ withdrawBankInfo.timeArrival | filterEmptyVal }}</span
            >
          </div>
        </li>
        <li v-if="withdrawBankInfo.effectiveTime" class="cell">
          <div>
            <span
              >{{ $t("iAccount.deposit.common.text_9") }}
              {{ withdrawBankInfo.effectiveTime }}</span
            >
          </div>
        </li>
      </ul>
    </div>

    <!-- H5弹框输入交易密码 -->
    <jf-dialog
      v-if="showCaptcha"
      :showBtn="false"
      :showClose="true"
      :styleObj="{ marginTop: '-150px' }"
      @onClose="_closeCaptcha"
    >
      <captcha-box @submit="_getCaptchaVal"></captcha-box>
    </jf-dialog>
  </jf-wrap>
</template>

<script>
import { mapGetters } from "vuex";
import { HKD, OTHER } from "@/modules/module-iaccount/define";
import {
  formatNumber,
  formatToDBC,
  formatStepSpace,
} from "@/modules/module-iaccount/utils/format";
import { format_CommitData_CN } from "@/modules/module-iaccount/format/withdraw";
import * as tips from "@/modules/module-iaccount/utils/tips";
// import userAgent from '@/modules/module-iaccount/utils/ua-parser'
import commonMixin from "@/modules/module-iaccount/mixins/common";
import SecApi from "@/modules/module-iaccount/api/modules/api-sec";

export default {
  mixins: [commonMixin],
  data() {
    const currencyOptions = this.$t("iAccount.define.CURRENCY");
    return {
      showCaptcha: false,
      currencyOptions: currencyOptions,
      money: "",
      accountLabel: "",
      accountValue: "",
      accountList: [],
      model: {
        currency: currencyOptions[0].value,
        withdrawBankNameOther: "",
        withdrawBankAccount: "",
        withdrawBankAccountAgain: "",
        swiftCode: "",
        address: "",
        withdrawMoney: "",
      },
    };
  },
  created() {
    this._updateInfo();
    this._formatAccount();
  },
  computed: {
    ...mapGetters(["secAccountInfo", "withdrawBankHis", "withdrawBankInfo"]),
    isShowOther() {
      return (
        this.withdrawBankInfo && this.withdrawBankInfo.receiptBankCode === OTHER
      );
    },
    isBank_CN() {
      return [this.$t("iAccount.define.BANK_CN").value].includes(
        this.withdrawBankInfo.bankType
      );
    },
    isBank_other() {
      return [this.$t("iAccount.define.BANK_OTHER").value].includes(
        this.withdrawBankInfo.bankType
      );
    },
    getSwiftCodeName() {
      return this.isBank_CN ? "大陆" : "";
    },
    isDisabled() {
      const { receiptBankName } = this.withdrawBankInfo;
      const {
        withdrawBankNameOther,
        withdrawBankAccountAgain,
        swiftCode,
        withdrawMoney,
        currency,
        withdrawBankAccount,
      } = this.model;
      const isRequired =
        [currency, withdrawBankAccount].every((item) => String(item).length) &&
        receiptBankName &&
        Number(withdrawMoney);
      const isRequired_cn = [swiftCode].every((item) => item.length);
      const temp =
        this.isBank_CN && this.isBank_other
          ? isRequired && isRequired_cn
          : isRequired;
      // 选择其他银行
      const result = this.isShowOther
        ? temp && withdrawBankNameOther.length
        : temp;
      const isEmpty = this.withdrawBankHis
        ? result
        : withdrawBankAccountAgain.length && result;
      return !isEmpty;
    },
    getCurrency() {
      return (
        this.currencyOptions.find(
          (item) => item.value === Number(this.model.currency)
        ) || {}
      );
    },
    getAct() {
      const num = this.model.withdrawMoney - parseFloat(this.getCurrency.fee);
      return num >= 0
        ? Number(formatNumber(num, { digit: 2 })).toFixed(2)
        : "0.00";
    },
  },
  methods: {
    _updateInfo() {
      const { bankAccount = "" } = this.withdrawBankHis || {};
      const { swiftCode = "" } = this.withdrawBankInfo || {};
      console.log("object", this.withdrawBankHis);
      if (this.withdrawBankHis) {
        this.model.withdrawBankAccount = bankAccount;
        this.model.swiftCode = swiftCode;
      } else {
        SecApi.withdrawBank({ extMethod: this.withdrawBankInfo.bankType }).then(
          (res) => {
            const { bankAccount, address, bankName } = res;
            this.model.withdrawBankAccount = bankAccount;
            this.model.withdrawBankNameOther = bankName;
            this.model.withdrawBankAccountAgain = bankAccount;
            this.model.swiftCode = res.swiftCode || swiftCode;
            this.model.address = address;
          }
        );
      }
    },
    _showTip(txt) {
      tips.jfDialog({
        btnTxt: this.$t("iAccount.common.text_10"),
        content: txt,
      });
    },
    _handleBefore() {
      return new Promise((resolve, reject) => {
        // 表单校验
        const {
          withdrawBankAccount,
          withdrawBankAccountAgain,
          withdrawMoney,
        } = this.model;
        // 过滤历史出金银行存在情况
        if (
          !this.withdrawBankHis &&
          withdrawBankAccount !== withdrawBankAccountAgain
        ) {
          const msg = this.$t("iAccount.withdraw.request.text_27");
          tips.toast({ txt: msg });
          return reject(msg);
        }

        // 实际提取金额小于零
        if (Number(this.getAct) <= 0) {
          const msg = this.$t("iAccount.withdraw.request.text_35");
          tips.toast({ txt: msg });
          return reject(msg);
        }

        if (this.getCurrency.code === HKD && Number(withdrawMoney) < 10) {
          const msg = this.$t("iAccount.withdraw.request.text_28");
          tips.toast({ txt: msg });
          return reject(msg);
        }
        // 提取资金不可超过可提资金
        if (Number(withdrawMoney) > Number(this.money)) {
          const msg = this.$t("iAccount.withdraw.request.text_29");
          tips.toast({ txt: msg });
          return reject(msg);
        }

        resolve();
      });
    },
    _handleNext() {
      // if (userAgent.isApp()) {
      //   // App 交易解锁
      //   window.JFSTOCK.tradeUnlock({
      //     success: (res) => {
      //       const result = JSON.parse(res.data)
      //       // 处理提取
      //       this._fetchWithdraw({
      //         key: result.key,
      //         trd: result.password,
      //         tradeToken: result.token
      //       })
      //     },
      //     fail: (err) => {
      //       console.log(err)
      //       this.showCaptcha = true
      //     }
      //   })
      // } else {
      //   this.showCaptcha = true
      // }
      this.showCaptcha = true;
    },
    _closeCaptcha() {
      this.showCaptcha = false;
    },
    _getCaptchaVal(val) {
      // 关闭交易密码弹框
      this._closeCaptcha();
      // 处理提取
      this._fetchWithdraw({ trd: val });
    },
    _fetchWithdraw(obj) {
      const formData = {
        money: this.money,
        chargeMoney: this.getCurrency.fee,
        ...obj,
        ...this.model,
      };
      const data = this.$store.state;
      const params = format_CommitData_CN(data, formData);
      console.log(params);
      this.$store.dispatch("apiToCommitCashOutData", params).then(() => {
        this.$router.push({ name: "withdraw-notify" });
      });
    },
    _clickSelectCurrency(item) {
      console.log("点击币种切换", item);
      if (this.model.currency === item.value) return false;
      this.model.currency = item.value;
      this.money = "";
      this._fetchMoney();
    },
    // 获取可提资金
    _fetchMoney() {
      const { fundAccount = [] } = this.secAccountInfo;
      // 需要取柜台定义币种字段
      const currencyGt = this.getCurrency.gt;
      const params = {
        moneyType: currencyGt,
        fundAccount: this.accountValue,
      };
      SecApi.findExtractableMoney(params).then((res) => {
        const temp = res.totalAmount;
        this.money = Number(temp) <= 0 ? "0.00" : temp;
      });
    },
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
      this.accountLabel = this.accountList[0].text;
      this.accountValue = this.accountList[0].value;
      this._fetchMoney();
    },
    _clickSelectAccount() {
      if (!this.picker_account) {
        this.picker_account = this.$createPicker({
          title: "",
          confirmTxt: this.$t("iAccount.common.text_9"),
          cancelTxt: this.$t("iAccount.common.text_2"),
          data: [this.accountList],
          onSelect: this.selectHandle_account,
        });
      }
      this.picker_account.show();
    },
    selectHandle_account(selectedVal, selectedIndex, selectedText) {
      console.log(selectedVal, selectedIndex, selectedText);
      this.accountLabel = selectedText[0];
      this.accountValue = selectedVal[0];
      this._fetchMoney();
    },
    _clickSetAll() {
      this.model.withdrawMoney = this.money;
    },
    _focusMoneyInput() {
      const old = this.model.withdrawMoney;
      this.model.withdrawMoney = old && String(Number(old));
    },
    _blurMoneyInput() {
      const old = this.model.withdrawMoney;
      this.model.withdrawMoney = old && Number(old).toFixed(2);
    },
    _clearInput(key) {
      const [obj, sub] = key.split(".");
      if (sub) {
        this.$set(this[obj], sub, "");
      } else {
        this[obj] = "";
      }
    },
    _getFee() {
      return formatNumber(this.getCurrency.fee, { digit: 2 });
    },
  },
  watch: {
    "model.withdrawBankAccount": function (newVal, oldVal) {
      if (!newVal) return "";
      const num = formatNumber(formatToDBC(newVal));
      this.model.withdrawBankAccount = formatStepSpace(num);
    },
    "model.withdrawBankAccountAgain": function (newVal, oldVal) {
      if (!newVal) return "";
      const num = formatNumber(formatToDBC(newVal));
      this.model.withdrawBankAccountAgain = formatStepSpace(num);
    },
    "model.withdrawMoney": function (newVal, oldVal) {
      if (!newVal) return "";
      this.model.withdrawMoney = formatNumber(this.model.withdrawMoney, {
        digit: 2,
      });
    },
  },
};
</script>

