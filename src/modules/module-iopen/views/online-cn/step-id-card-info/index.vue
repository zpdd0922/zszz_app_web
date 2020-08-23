<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olcn-step olcn-step-id-card-info">
      <div class="step-content user-info">
        <cube-form :model="model">
          <div class="info-wrap">
            <cube-form-group class="custom-form-group" :legend="getI18n('tips')">
              <cube-form-item :field="{label: getI18n('name.label')}">
                <div class="custom-date-box">
                  <div class="custom-form-separator">{{fields[0].label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.familyName"
                      class="cube-input-field"
                      :placeholder="fields[0].props.placeholder"
                    />
                  </div>
                  <div class="custom-form-separator">{{fields[1].label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.givenName"
                      class="cube-input-field"
                      :placeholder="fields[1].props.placeholder"
                    />
                  </div>
                </div>
              </cube-form-item>
              <cube-form-item :field="{label: getI18n('nameSpell.label')}">
                <div class="custom-date-box">
                  <div class="custom-form-separator">{{fields[2].label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.familyNameSpell"
                      class="cube-input-field"
                      :placeholder="fields[2].props.placeholder"
                    />
                  </div>
                  <div class="custom-form-separator">{{fields[3].label}}</div>
                  <div class="custom-form-date">
                    <input
                      v-model="model.givenNameSpell"
                      class="cube-input-field"
                      :placeholder="fields[3].props.placeholder"
                    />
                  </div>
                </div>
              </cube-form-item>
              <cube-form-item :field="fields[4]"></cube-form-item>
              <cube-form-item :field="fields[5]"></cube-form-item>
              <cube-form-item :field="fields[6]">
                <cube-textarea
                  v-model="model.addressValue"
                  :placeholder="fields[6].props.placeholder"
                  :maxlength="50"
                  :indicator="false"
                ></cube-textarea>
              </cube-form-item>
              <cube-form-item :field="fields[7]">
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
                <div class="custom-form-switch">
                  <div class="cube-switch">
                    <input v-model="model.isLonger" type="checkbox" class="cube-switch-input" />
                    <i class="cube-switch-ui">{{longerDateText}}</i>
                  </div>
                </div>
              </cube-form-item>
              <cube-form-item :field="fields[8]"></cube-form-item>
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
        idCardValue: "",
        addressValue: "",
        dateStartValue: "",
        dateEndValue: "",
        authority: "",
        nation: "",
        isLonger: false,
      },
      fields: [
        {
          type: "input",
          modelKey: "familyName",
          label: this.getI18n("name.familyNameLabel"),
          props: {
            placeholder: this.getI18n("name.familyNamePlaceholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "givenName",
          label: this.getI18n("name.givenNameLabel"),
          props: {
            placeholder: this.getI18n("name.givenNamePlaceholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "familyNameSpell",
          label: this.getI18n("nameSpell.familyNameLabel"),
          props: {
            placeholder: this.getI18n("nameSpell.familyNamePlaceholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "givenNameSpell",
          label: this.getI18n("nameSpell.givenNameLabel"),
          props: {
            placeholder: this.getI18n("nameSpell.givenNamePlaceholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "nation",
          label: this.getI18n("nation.label"),
          props: {
            placeholder: this.getI18n("nation.placeholder"),
            maxlength: 20,
          },
        },
        {
          type: "input",
          modelKey: "idCardValue",
          label: this.getI18n("idCardValue.label"),
          props: {
            placeholder: this.getI18n("idCardValue.placeholder"),
          },
        },
        {
          modelKey: "addressValue",
          label: this.getI18n("addressValue.label"),
          props: {
            placeholder: this.getI18n("addressValue.placeholder"),
            maxlength: 50,
          },
        },
        {
          modelKey: "dateStartValue",
          label: this.getI18n("dateStartValue.label"),
        },
        {
          type: "input",
          modelKey: "authority",
          label: this.getI18n("authority.label"),
          props: {
            placeholder: this.getI18n("authority.placeholder"),
            maxlength: 20,
          },
        },
      ],
    };
  },
  computed: {
    // 组合中文姓名用以签名信息以及传递给CUBP
    cnName() {
      const { familyName, givenName } = this.model;
      return familyName + givenName;
    },
    // 组合中文姓名拼音用以签名信息以及传递给CUBP
    enName() {
      const { familyNameSpell, givenNameSpell } = this.model;
      return familyNameSpell + givenNameSpell;
    },
    isDisabled() {
      // 限制名字与地址至少两个字以上
      const { addressValue } = this.model;
      const result = Object.values(this.model).every(
        (val) => String(val).length
      );
      return !(result && addressValue.length > 2);
    },
  },
  created() {
    this.updateInfo();
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
            const { isValid = false, remark = "" } = res;
            if (isValid) {
              resolve(isValid);
            } else {
              alert({
                title: "温馨提示",
                content: remark,
              });
              reject(isValid);
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
          min: new Date(),
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

