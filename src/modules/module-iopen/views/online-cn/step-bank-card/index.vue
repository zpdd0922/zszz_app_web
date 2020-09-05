<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olcn-step olcn-step-bank-card">
      <cube-form :model="model">
        <!-- 銀行信息 -->
        <cube-form-group class="step-content custom-form-group">
          <cube-form-item :field="fieldsBank.bankNum">
            <div class="cube-input">
              <input
                type="text"
                v-model="model.bankNum"
                class="cube-input-field"
                maxlength="30"
                :placeholder="fieldsBank.bankNum.props.placeholder"
              />
            </div>
          </cube-form-item>
          <cube-form-item :field="fieldsBank.bankPhoneNum"></cube-form-item>
          <!-- <cube-form-item :field="fieldsBank.bankCurrency"></cube-form-item> -->
        </cube-form-group>
      </cube-form>
      <div class="bank-card-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
            <li>{{getI18n('desc.content[1]')}}</li>
          </ul>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { getSexFromCard, getBirthFromCard } from "@/main/utils/format/idcard";
import { getPreDay } from "@/main/utils/format/date";
import { getAge } from "@/main/utils/format/idcard";
import { toDBC } from "@/main/utils/format/formatter";
import validate from "@/main/utils/format/validate";

// TODO: 處理手機號為驗證用
export default {
  mixins: [onlineMixin],
  components: {},
  data() {
    return {
      model: {
        // bankName: '', // 银行名称
        // bankId: "", // 银行编码
        bankNum: "", // 银行卡
        bankPhoneNum: "", // 預留手機號
        // bankCurrency: "", // 幣種
      },
      fieldsBank: {
        // bankId:{
        //   type: 'select',
        //   modelKey: 'bankId',
        //   label: '银行名称',
        //   events: {
        //     'change': (value, index, text) => {
        //       this.model.bankName = text
        //     }
        //   },
        //   props: {
        //     placeholder: '请选择银行',
        //     options: bankOptions
        //   }
        // },
        bankNum: {
          type: "input",
          modelKey: "bankNum",
          label: this.getI18n("bankNum.label"),
          props: {
            placeholder: this.getI18n("bankNum.placeholder"),
            type: "number",
            maxlength: 30,
          },
        },
        bankPhoneNum: {
          type: "input",
          modelKey: "bankPhoneNum",
          label: this.getI18n("bankPhoneNum.label"),
          props: {
            placeholder: this.getI18n("bankPhoneNum.placeholder"),
            maxlength: 50,
          },
        },
        bankCurrency: {
          type: "select",
          modelKey: "bankCurrency",
          label: this.getI18n("bankCurrency.label"),
          props: {
            placeholder: this.getI18n("bankCurrency.placeholder"),
            options: [
              {
                value: 1,
                text: this.getI18n("bankCurrency.options.hkd"),
              },
              {
                value: 2,
                text: this.getI18n("bankCurrency.options.usd"),
              },
              {
                value: 3,
                text: this.getI18n("bankCurrency.options.rmb"),
              },
              {
                value: 0,
                text: this.getI18n("bankCurrency.options.multiple"),
              },
            ],
          },
        },
      },
    };
  },
  computed: {
    isDisabled() {
      const result = Object.values(this.model).every(
        (val) => String(val).length
      );
      return !result;
    },
  },
  created() {
    this.updateInfo()
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("bankCard", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      // const userInfo = {};
      Object.keys(this.model).forEach((val) => {
        const res = userInfo[val] ? userInfo[val] : this.model[val];
        console.log(val)
        // 处理手机号
        if (val === "bankPhoneNum") {
          if (userInfo[val]) {
            this.handleUpdatePhone(userInfo[val], "bankPhoneNum");
          } else {
            console.log(12312);
            this.handleBankePhoneNum();
          }
        } else {
          this.model[val] = res;
        }
      });
    },
    handleNext(e) {
      // 保存数据&下一步
      const params = {
        step: this.step,
        info: this.model,
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        const {
          idCardValue: idCard = "",
          cnNameValue: userName = "",
        } = this.openInfo;
        const { bankId: bankCode, bankNum, bankPhoneNum: phone } = this.model;

        // 判断手机号是否合法
        if (!validate.isMobile(phone)) {
          const phoneTips = "请输入正确手机号码";
          toast({ type: "error", txt: phoneTips, time: 1000 });
          return reject(new Error(phoneTips));
        }

        // 校验时，去除空格格式
        const bankCard = bankNum.replace(/\s+/g, "");

        // 后台请求四要素校验
        this.$store
          .dispatch("checkBankCard", {
            bankCard,
            idCard,
            userName,
            phone,
          })
          .then((res) => {
            const { verify = false } = res;
            if (verify) {
              resolve(verify);
            } else {
              alert({
                title: this.$t("common.alertTitle"),
                content: this.getI18n("errorTips"),
              });
              reject(verify);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    // 处理手机号
    handleUpdatePhone(info, key) {
      const arr = info.split("-");
      if (arr.length > 1) {
        if (arr[0] === "86") {
          this.model[key] = arr[1];
        }
      } else {
        this.model[key] = arr[0];
      }
    },
    handleBankePhoneNum() {
      this.handleUpdatePhone(this.openProgress.phoneNumber, "bankPhoneNum");
    },
  },
  watch: {},
};
</script>

