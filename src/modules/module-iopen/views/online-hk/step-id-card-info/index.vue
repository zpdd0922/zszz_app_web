<template>
  <op-wrap :isDisabled="isDisabled" :handleBefore="handleBefore" @handleNext="handleNext">
    <div class="olhk-step olhk-step-id-card-info">
      <div class="step-content user-info">
        <cube-form :model="model">
          <div class="info-wrap">
            <cube-form-group class="custom-form-group">
              <cube-form-item :field="fields[0]">
                <div class="cube-input">
                  <input
                    v-model="model.familyName"
                    class="cube-input-field"
                    :placeholder="familyNamePlaceHolder"
                  />
                </div>
              </cube-form-item>
              <cube-form-item :field="fields[1]">
                <div class="cube-input">
                  <input
                    v-model.trim="model.givenName"
                    class="cube-input-field"
                    :placeholder="givenNamePlaceHolder"
                  />
                </div>
              </cube-form-item>
              <cube-form-item :field="fields[2]"></cube-form-item>
              <cube-form-item :field="fields[3]"></cube-form-item>
              <cube-form-item :field="fields[4]">
                <div class="cube-input">
                  <input
                    :type="fields[4].props.type"
                    v-model="model.idCardValue"
                    class="cube-input-field"
                    maxlength="50"
                    :placeholder="fields[4].props.placeholder"
                  />
                </div>
              </cube-form-item>

              <!-- 证件类型 == 大陆身份证 OCR获取有效期限-->
              <template v-if="isNeedCnName">
                <cube-form-item :field="fields[5]">
                  <cube-textarea
                    v-model="model.addressValue"
                    :placeholder="fields[5].props.placeholder"
                    :maxlength="50"
                    :indicator="false"
                  ></cube-textarea>
                </cube-form-item>
                <cube-form-item :field="fields[6]">
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
              </template>
              <!-- 证件类型 != 大陆身份证 根据身份证获取生日和性别-->
              <template v-else>
                <!-- 当选择护照时候出现有效期（必填） -->
                <template v-if="isPassport">
                  <cube-form-item :field="fields[6]">
                    <div class="custom-date-box">
                      <div @click="showPassPortStartDatePicker" class="custom-form-date">
                        <template v-if="model.passportStartValue">
                          <span>{{model.passportStartValue}}</span>
                        </template>
                        <template v-else>
                          <span
                            class="cube-select-placeholder"
                          >{{getI18n("dateStartValue.startPlaceholder")}}</span>
                        </template>
                      </div>
                      <div class="custom-form-separator">|</div>
                      <div class="custom-form-date">
                        <div @click="showPassPortEndDatePicker">
                          <template v-if="model.passportEndValue">
                            <span>{{model.passportEndValue}}</span>
                          </template>
                          <template v-else>
                            <span
                              class="cube-select-placeholder"
                            >{{getI18n("dateStartValue.endPlaceholder")}}</span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </cube-form-item>
                </template>
                <cube-form-item :field="fields[7]">
                  <div @click="showBrithDatePicker" class="cube-select" :class="isSelectIcon">
                    <template v-if="model.birthday">
                      <span class="cube-select-text">{{model.birthday}}</span>
                    </template>
                    <template v-else>
                      <span class="cube-select-placeholder">{{fields[7].props.placeholder}}</span>
                    </template>
                    <i class="cube-select-icon"></i>
                  </div>
                </cube-form-item>
                <cube-form-item :field="fields[8]"></cube-form-item>
              </template>
            </cube-form-group>
          </div>
        </cube-form>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { getSexFromCard, getBirthFromCard } from "@/main/utils/format/idcard";
import { sexOptions } from "../../../api/params-define";
import { getPreDay } from "@/main/utils/format/date";
import { getAge } from "@/main/utils/format/idcard";
import { toDBC } from "@/main/utils/format/formatter";
import validate from "@/main/utils/format/validate";

export default {
  mixins: [onlineMixin],
  data() {
    return {
      selectIcon: false,
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
        isLonger: false,
        birthday: "",
        sex: "",
        passportStartValue: "", // 护照起始日期
        passportEndValue: "", // 护照截止日期
      },
      fields: [
        {
          type: "input",
          modelKey: "familyName",
          label: this.getI18n("familyName.label"),
          props: {
            placeholder: this.getI18n("familyName.placeholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "givenName",
          label: this.getI18n("givenName.label"),
          props: {
            placeholder: this.getI18n("givenName.placeholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "familyNameSpell",
          label: this.getI18n("familyNameSpell.label"),
          props: {
            placeholder: this.getI18n("familyNameSpell.placeholder"),
            maxlength: 50,
          },
        },
        {
          type: "input",
          modelKey: "givenNameSpell",
          label: this.getI18n("givenNameSpell.label"),
          props: {
            placeholder: this.getI18n("givenNameSpell.placeholder"),
            maxlength: 50,
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
          type: "date",
          modelKey: "birthday",
          label: this.getI18n("birthday.label"),
          props: {
            placeholder: this.getI18n("birthday.placeholder"),
          },
        },
        {
          type: "select",
          modelKey: "sex",
          label: this.getI18n("sex.label"),
          props: {
            placeholder: this.getI18n("sex.placeholder"),
            options: sexOptions,
          },
        },
      ],
    };
  },
  computed: {
    familyNamePlaceHolder() {
      const tips = this.fields[0].props.placeholder;
      return this.isNeedCnName
        ? tips
        : `${tips}${this.getI18n("placeholderMore")}`;
    },
    givenNamePlaceHolder() {
      const tips = this.fields[1].props.placeholder;
      return this.isNeedCnName
        ? tips
        : `${tips}${this.getI18n("placeholderMore")}`;
    },
    isNeedCnName() {
      return this.openInfo.idKindKey === "idCardCn";
    },
    isPassport() {
      return this.openInfo.idKindKey === "passport";
    },
    isSelectIcon() {
      return {
        "cube-select_active": this.selectIcon,
      };
    },
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
      // 增加大陆籍，限制输入两个字以上
      const {
        familyName,
        givenName,
        familyNameSpell,
        givenNameSpell,
        idCardValue,
        addressValue,
        dateStartValue,
        dateEndValue,
        birthday,
        sex,
        passportStartValue,
        passportEndValue,
      } = this.model;
      let arr = [familyNameSpell, givenNameSpell, idCardValue, birthday, sex];

      if (this.isNeedCnName) {
        arr = [
          familyName,
          givenName,
          familyNameSpell,
          givenNameSpell,
          idCardValue,
          addressValue,
          dateStartValue,
          dateEndValue,
        ];
      }
      if (this.isPassport) {
        arr = [
          familyNameSpell,
          givenNameSpell,
          idCardValue,
          birthday,
          sex,
          passportStartValue,
          passportEndValue,
        ];
      }
      const result = arr.every((val) => String(val).length);
      // return this.isNeedCnName ? !(result && cnNameValue.length > 1) : !result
      return !result;
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
      Object.keys(this.model).forEach((val) => {
        const res = userInfo[val] ? userInfo[val] : this.model[val];
        this.model[val] = res;
      });
    },
    handleNext(e) {
      // 大陆身份证 --> 根据身份证来获取出生日期与性别
      if (this.isNeedCnName) {
        // 判断是否已读取信息
        const { sex } = this.openInfo;
        const { idCardValue } = this.model;
        // 性别
        const getSex = sex || getSexFromCard(idCardValue);
        this.$set(this.model, "sex", getSex);
        // 出生日期
        const getBirthday = getBirthFromCard(idCardValue);
        this.$set(this.model, "birthday", getBirthday);
      }

      // 重新赋值 --> 英文字母大写
      const { familyNameSpell, givenNameSpell } = this.model;
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
        const { idKindKey } = this.openInfo;
        const { idCardValue: idCard } = this.model;
        const userName = this.cnName;
        // 判断证件类型 - 大陆身份证
        if (idKindKey === "idCardCn") {
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
        } else {
          // 后台请求校验
          this.$store
            .dispatch("checkIdCard", { idCard, userName, cardType: 0 })
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
          // resolve()
        }
      });
    },
    showBrithDatePicker() {
      if (!this.brithDatePicker) {
        // 最大120岁
        const birthday_min = new Date(getPreDay(365 * 120));
        const birthday_value = this.model.birthday
          ? new Date(this.model.birthday)
          : new Date();
        this.brithDatePicker = this.$createDatePicker({
          title: "出生日期",
          min: birthday_min,
          max: new Date(),
          value: birthday_value,
          onSelect: this.selectHandleBrith,
          onCancel: this.cancelHandle,
        });
      }

      this.selectIcon = true;

      this.brithDatePicker.show();
    },
    selectHandleBrith(date, selectedVal, selectedText) {
      this.selectIcon = false;
      this.model.birthday = selectedVal
        .map((val) => (val >= 10 ? val : "0" + val))
        .join("-");
    },
    cancelHandle() {
      this.selectIcon = false;
    },
    showStartDatePicker() {
      if (!this.startDatePicker) {
        // 50年前
        const startDate_min = new Date(getPreDay(365 * 50));
        const startDate_value = this.model.dateStartValue
          ? new Date(this.model.dateStartValue)
          : new Date();
        this.startDatePicker = this.$createDatePicker({
          title: "起始日期",
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
          title: "结束日期",
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
    // 护照起始日期
    showPassPortStartDatePicker() {
      if (!this.passportstartDatePicker) {
        // 50年前
        const startDate_min = new Date(getPreDay(365 * 50));
        const startDate_value = this.model.passportStartValue
          ? new Date(this.model.passportStartValue)
          : new Date();
        this.passportstartDatePicker = this.$createDatePicker({
          title: "起始日期",
          min: startDate_min,
          max: new Date(),
          value: startDate_value,
          onSelect: (date, selectedVal, selectedText) => {
            this.model.passportStartValue = selectedVal
              .map((val) => (val >= 10 ? val : "0" + val))
              .join("-");
          },
        });
      }
      this.passportstartDatePicker.show();
    },
    // 护照截止日期
    showPassPortEndDatePicker() {
      if (!this.passprotendDatePicker) {
        // 50年后
        const endDate_max = new Date(getPreDay(-365 * 50));
        const endDate_value = this.model.passportEndValue
          ? new Date(this.model.passportEndValue)
          : new Date();
        this.passprotendDatePicker = this.$createDatePicker({
          title: "结束日期",
          min: new Date(),
          max: endDate_max,
          value: endDate_value,
          onSelect: (date, selectedVal, selectedText) => {
            this.model.passportEndValue = selectedVal
              .map((val) => (val >= 10 ? val : "0" + val))
              .join("-");
          },
        });
      }
      this.passprotendDatePicker.show();
    },
    handleIdCardLonger() {
      if (this.model.dateEndValue === this.longerDateText) return false;

      confirm({
        content: "为确保您资料的准确性，请确认您的身份证是否为长期身份证！",
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
        if (this.model.dateEndValue === this.longerDateText) {
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

