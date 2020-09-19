<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olcn-step olcn-step-id-card-info">
      <div class="step-content user-info">
        <cube-form :model="model">
          <div class="info-wrap">
            <cube-form-group class="custom-form-group" :legend="getI18n('tips')">
              <!-- <cube-form-group class="custom-form-group"> -->
              <cube-form-item :field="{label: getI18n('name.label')}">
                <div class="custom-date-box">
                  <div class="custom-form-separator">{{fields.familyName.label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.familyName"
                      class="cube-input-field"
                      :placeholder="fields.familyName.props.placeholder"
                    />
                  </div>
                  <div class="custom-form-separator">{{fields.givenName.label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.givenName"
                      class="cube-input-field"
                      :placeholder="fields.givenName.props.placeholder"
                    />
                  </div>
                </div>
              </cube-form-item>
              <cube-form-item :field="{label: getI18n('nameSpell.label')}">
                <div class="custom-date-box">
                  <div class="custom-form-separator">{{fields.familyNameSpell.label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.familyNameSpell"
                      class="cube-input-field"
                      :placeholder="fields.familyNameSpell.props.placeholder"
                    />
                  </div>
                  <div class="custom-form-separator">{{fields.givenNameSpell.label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.givenNameSpell"
                      class="cube-input-field"
                      :placeholder="fields.givenNameSpell.props.placeholder"
                    />
                  </div>
                </div>
              </cube-form-item>
              <!-- 民族 -->
              <!-- <cube-form-item :field="fields.nation"><span style="color: red">待定</span></cube-form-item> -->
              <!-- 国籍 -->
              <!-- <cube-form-item :field="fields.nation"></cube-form-item> -->
              <!-- 身份证号 -->
              <cube-form-item :field="fields.idCardValue"></cube-form-item>
              <!-- 证件地址 -->
              <cube-form-item :field="fields.addressValue">
                <cube-textarea
                  v-model="model.addressValue"
                  :placeholder="fields.addressValue.props.placeholder"
                  :maxlength="50"
                  :indicator="false"
                ></cube-textarea>
              </cube-form-item>
              <!-- 有效期限 -->
              <cube-form-item :field="fields.dateStartValue">
                <div class="custom-date-box">
                  <div @click="showStartDatePicker" class="custom-form-date">
                    <template v-if="model.dateStartValue">
                      <span>{{model.dateStartValue}}</span>
                    </template>
                    <template v-else>
                      <span
                        class="cube-select-placeholder"
                      >{{getI18n("dateStartValue.startPlaceholder")}}</span>
                    </template>
                  </div>
                  <div class="custom-form-separator">|</div>
                  <div class="custom-form-date">
                    <template v-if="model.isLonger">
                      <span>{{longerDateText}}</span>
                    </template>
                    <template v-else>
                    <!-- <template> -->
                      <div @click="showEndDatePicker">
                        <template v-if="model.dateEndValue">
                          <span>{{model.dateEndValue}}</span>
                        </template>
                        <template v-else>
                          <span
                            class="cube-select-placeholder"
                          >{{getI18n("dateStartValue.endPlaceholder")}}</span>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
                <!-- 切换长期身份证按钮 -->
                <div class="custom-form-switch">
                  <div class="cube-switch">
                    <input v-model="model.isLonger" type="checkbox" class="cube-switch-input" />
                    <i class="cube-switch-ui">{{longerDateText}}</i>
                  </div>
                </div>
              </cube-form-item>
              <!-- 签发机关 -->
              <cube-form-item :field="fields.authority"></cube-form-item>
              <cube-form-item :field="fields.birthCountry"></cube-form-item>
              <cube-form-item v-if="model.birthCountry === 'OTH'" :field="fields.birthCountryTxt"></cube-form-item>
              <cube-form-item :field="fields.birthArea"></cube-form-item>
            </cube-form-group>
          </div>
        </cube-form>
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
import * as optionsList from "./options-list";
import { modelValidator } from "./validator";

// TODO: 減少了民族字段

export default {
  mixins: [onlineMixin],
  data() {
    return {
      longerDateText: this.getI18n("dateStartValue.endForerver"),
      model: {
        familyName: "", // 中文姓氏
        givenName: "", // 中文名字
        familyNameSpell: "", // 英文姓氏
        givenNameSpell: "", // 英文名字
        idCardValue: "", //身份证号码
        addressValue: "", //证件地址
        dateStartValue: "",
        dateEndValue: "", //证件有效期
        authority: "", //证件签发地
        // nation: "", //民族
        isLonger: false,
        birthCountry: "", //出生国家
        birthCountryTxt: "", //出生国家
        birthArea: "", //出生地区
      },
      fields: {
        familyName: {
          type: "input",
          modelKey: "familyName",
          label: this.getI18n("name.familyNameLabel"),
          props: {
            placeholder: this.getI18n("name.familyNamePlaceholder"),
            maxlength: 50,
          },
        },
        givenName: {
          type: "input",
          modelKey: "givenName",
          label: this.getI18n("name.givenNameLabel"),
          props: {
            placeholder: this.getI18n("name.givenNamePlaceholder"),
            maxlength: 50,
          },
        },
        familyNameSpell: {
          type: "input",
          modelKey: "familyNameSpell",
          label: this.getI18n("nameSpell.familyNameLabel"),
          props: {
            placeholder: this.getI18n("nameSpell.familyNamePlaceholder"),
            maxlength: 50,
          },
        },
        givenNameSpell: {
          type: "input",
          modelKey: "givenNameSpell",
          label: this.getI18n("nameSpell.givenNameLabel"),
          props: {
            placeholder: this.getI18n("nameSpell.givenNamePlaceholder"),
            maxlength: 50,
          },
        },
        // {
        //   type: "input",
        //   modelKey: "nationality",
        //   label: this.getI18n("nationality.label"),
        //   props: {
        //     placeholder: this.getI18n("nationality.placeholder"),
        //     maxlength: 20,
        //   },
        // },
        // nation: {
        //   type: "input",
        //   modelKey: "nation",
        //   label: this.getI18n("nation.label"),
        //   props: {
        //     placeholder: this.getI18n("nation.placeholder"),
        //     maxlength: 20,
        //   },
        // },
        birthCountry: {
          type: "select",
          modelKey: "birthCountry",
          label: this.getI18n("birthCountry.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("birthCountry.placeholder"),
            options: [],
          },
          events: {
            change: (value, index, text) => {
              if (value !== "OTH") {
                this.model.birthCountryTxt = text;
              } else {
                this.model.birthCountryTxt = "";
              }
            },
          },
          rules: {
            required: false,
          },
        },
        birthCountryTxt: {
          type: "input",
          modelKey: "birthCountryTxt",
          label: this.getI18n("birthCountryTxt.label"),
          props: {
            placeholder: this.getI18n("birthCountryTxt.placeholder"),
          },
          rules: {
            required: false,
          },
        },
        birthArea: {
          type: "input",
          modelKey: "birthArea",
          label: this.getI18n("birthArea.label"),
          props: {
            placeholder: this.getI18n("birthArea.placeholder"),
          },
          rules: {
            required: false,
          },
        },
        idCardValue: {
          type: "input",
          modelKey: "idCardValue",
          label: this.getI18n("idCardValue.label"),
          props: {
            placeholder: this.getI18n("idCardValue.placeholder"),
          },
        },
        addressValue: {
          modelKey: "addressValue",
          label: this.getI18n("addressValue.label"),
          props: {
            placeholder: this.getI18n("addressValue.placeholder"),
            maxlength: 50,
          },
        },
        dateStartValue: {
          modelKey: "dateStartValue",
          label: this.getI18n("dateStartValue.label"),
        },
        authority: {
          type: "input",
          modelKey: "authority",
          label: this.getI18n("authority.label"),
          props: {
            placeholder: this.getI18n("authority.placeholder"),
            maxlength: 20,
          },
        },
      },
    };
  },
  computed: {
    // 组合中文姓名用以签名信息以及传递给BPM
    cnName() {
      const { familyName, givenName } = this.model;
      return familyName + givenName;
    },
    // 组合中文姓名拼音用以签名信息以及传递给BPM
    enName() {
      const { familyNameSpell, givenNameSpell } = this.model;
      return familyNameSpell + " " +givenNameSpell;
    },
    isDisabled() {
      // 限制名字与地址至少两个字以上
      const { addressValue } = this.model;
      const result = modelValidator.every((val) => {
        return String(this.model[val]).length;
      });
      return !(result && addressValue.length > 2);
    },
  },
  created() {
    this.updateInfo();
    this.fetchDataDesin();
  },
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("idCardInfo", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      console.log(userInfo);
      Object.keys(this.model).forEach((val) => {
        const res = userInfo[val] ? userInfo[val] : this.model[val];
        this.model[val] = res;
      });
    },
    // 获取后台数据字典
    async fetchDataDesin() {
      const result = await this.$store.dispatch(
        "getDictionary",
        this.$t("iOpen.common.nationlityCode")
      );
      let cnData = {
        value: "",
        text: "",
      };
      const list = result
        .map((res) => {
          const data = { text: res.name, value: res.value };
          if (data.value === "0") {
            cnData = data;
          }
          return data;
        })
        .filter((v) => !["2", "6", "MAC"].includes(v.value));
      this.fields.birthCountry.props.options = list;
      this.model.birthCountry = cnData.value;
      this.model.birthCountryTxt = cnData.text;
    },
    handleNext(e) {
      // 判断是否已读取信息
      const { sex } = this.openInfo;
      const { idCardValue, familyNameSpell, givenNameSpell } = this.model;
      // 性别
      const getSex = sex || getSexFromCard(idCardValue);
      this.$set(this.model, "sex", getSex);
      // 出生日期
      const getBirthday = getBirthFromCard(idCardValue);
      this.$set(this.model, "birthday", getBirthday);
      // 重新赋值 --> 英文字母大写
      // this.model.enNameValue = enNameValue.toUpperCase()
      this.model.familyNameSpell = familyNameSpell.toUpperCase();
      this.model.givenNameSpell = givenNameSpell.toUpperCase();
      // 因CUBP需要全称，顾这里手动设置方便存储利用
      this.$set(this.model, "cnNameValue", this.cnName);
      this.$set(this.model, "enNameValue", this.enName);

      // 保存数据&下一步
      const params = {
        step: this.step,
        info: this.model,
      };
      console.log(params);
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        const { idCardValue: idCard } = this.model;
        const userName = this.cnName;
        const age = getAge(getBirthFromCard(idCard));
        // 校验身份证
        if (!validate.isIdCard(idCard)) {
          const cardTips = "请输入正确身份证号码";
          toast({ type: "error", txt: cardTips });
          return reject(new Error(cardTips));
        }
        // 大于70岁不允许线上开户
        if (age >= 70 && window.IS_CHECK_AGE) {
          const ageTips = "70岁以上暂不能开户，非常抱歉";
          toast({ type: "error", txt: ageTips });
          return reject(new Error(ageTips));
        }

        // 后台请求校验
        this.$store
          .dispatch("checkIdCard", { idCard, userName, cardType: 1 })
          .then((res) => {
            const { verify = false, remark = "" } = res;
            if (verify) {
              resolve(verify);
            } else {
              alert({
                title: "温馨提示",
                content: remark,
              });
              reject(verify);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
    showStartDatePicker() {
      if (!this.startDatePicker) {
        // 50年前
        const startDate_min = new Date(getPreDay(365 * 50));
        const startDate_value = this.model.dateStartValue
          ? new Date(this.model.dateStartValue)
          : new Date();
        this.startDatePicker = this.$createDatePicker({
          title: this.getI18n("dateStartValue.startPlaceholder"),
          min: startDate_min,
          max: new Date(),
          value: startDate_value,
          onSelect: this.selectHandleStart,
        });
      }

      this.startDatePicker.show();
    },
    selectHandleStart(date, selectedVal, selectedText) {
      this.model.dateStartValue = selectedVal
        .map((val) => (val >= 10 ? val : "0" + val))
        .join("-");
    },
    showEndDatePicker() {
      if (!this.endDatePicker) {
        // 50年后
        const endDate_max = new Date(getPreDay(-365 * 50));
        const endDate_value = this.model.dateEndValue
          ? new Date(this.model.dateEndValue)
          : new Date();
        this.endDatePicker = this.$createDatePicker({
          title: this.getI18n("dateStartValue.endPlaceholder"),
          min: new Date(getPreDay(-1)),
          max: endDate_max,
          value: endDate_value,
          onSelect: this.selectHandleEnd,
        });
      }

      this.endDatePicker.show();
    },
    selectHandleEnd(date, selectedVal, selectedText) {
      this.model.dateEndValue = selectedVal
        .map((val) => (val >= 10 ? val : "0" + val))
        .join("-");
    },
    handleIdCardLonger() {
      console.log(this.model.dateEndValue);
      if (this.model.dateEndValue !== "") return false;

      confirm({
        content: this.getI18n("dateStartValue.edfFoerverTips"),
        confirmCallback: () => {
          this.model.dateEndValue = this.longerDateText;
        },
        cancelCallback: () => {
          this.model.isLonger = false;
        },
      });
    },
  },
  watch: {
    "model.isLonger": function (newVal, oldVal) {
      if (newVal) {
        this.handleIdCardLonger();
      } else {
        if (this.model.dateEndValue !== "") {
          this.model.dateEndValue = "";
        }
      }
    },
    "model.givenName": function (newVal, oldVal) {
      if (!validate.isChinese(newVal)) {
        this.model.givenName = "";
      } else {
        this.model.givenName = toDBC(newVal);
      }
    },
    "model.familyName": function (newVal, oldVal) {
      if (!validate.isChinese(newVal)) {
        this.model.familyName = "";
      } else {
        this.model.familyName = toDBC(newVal);
      }
    },
    "model.familyNameSpell": function (newVal, oldVal) {
      if (validate.isChinese(newVal)) {
        this.model.familyNameSpell = "";
      } else {
        this.model.familyNameSpell = toDBC(newVal);
      }
    },
    "model.givenNameSpell": function (newVal, oldVal) {
      if (validate.isChinese(newVal)) {
        this.model.givenNameSpell = "";
      } else {
        this.model.givenNameSpell = toDBC(newVal);
      }
    },
    "model.idCardValue": function (newVal, oldVal) {
      if (validate.isChinese(newVal)) {
        this.model.idCardValue = "";
      } else {
        this.model.idCardValue = toDBC(newVal);
      }
    },
  },
};
</script>

