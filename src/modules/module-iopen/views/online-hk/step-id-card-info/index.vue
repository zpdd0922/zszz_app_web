<template>
  <op-wrap
    :isDisabled="isDisabled"
    :handleBefore="handleBefore"
    @handleNext="handleNext"
  >
    <div class="olhk-step olhk-step-id-card-info">
      <div class="step-content user-info">
        <cube-form :model="model">
          <div class="info-wrap">
            <cube-form-group
              class="custom-form-group"
              :legend="getI18n('tips')"
            >
              <cube-form-item :field="fields.familyName">
                <div class="cube-input">
                  <input
                    v-model="model.familyName"
                    class="cube-input-field"
                    :placeholder="familyNamePlaceHolder"
                  />
                </div>
              </cube-form-item>
              <cube-form-item :field="fields.givenName">
                <div class="cube-input">
                  <input
                    v-model.trim="model.givenName"
                    class="cube-input-field"
                    :placeholder="givenNamePlaceHolder"
                  />
                </div>
              </cube-form-item>
              <cube-form-item :field="fields.familyNameSpell"></cube-form-item>
              <cube-form-item :field="fields.givenNameSpell"></cube-form-item>
              <cube-form-item :field="fields.idCardValue">
                <div class="cube-input">
                  <input
                    :type="fields.idCardValue.props.type"
                    v-model="model.idCardValue"
                    class="cube-input-field"
                    maxlength="50"
                    :placeholder="fields.idCardValue.props.placeholder"
                  />
                </div>
              </cube-form-item>
              <!-- 证件类型 == 大陆身份证 OCR获取有效期限-->
              <template v-if="isChina">
                <cube-form-item :field="fields.addressValue">
                  <cube-textarea
                    v-model="model.addressValue"
                    :placeholder="fields.addressValue.props.placeholder"
                    :maxlength="50"
                    :indicator="false"
                  ></cube-textarea>
                </cube-form-item>
                <cube-form-item :field="fields.dateStartValue">
                  <div class="custom-date-box">
                    <div @click="showStartDatePicker" class="custom-form-date">
                      <template v-if="model.dateStartValue">
                        <span>{{ model.dateStartValue }}</span>
                      </template>
                      <template v-else>
                        <span class="cube-select-placeholder">{{
                          getI18n("dateStartValue.startPlaceholder")
                        }}</span>
                      </template>
                    </div>
                    <div class="custom-form-separator">|</div>
                    <div class="custom-form-date">
                      <template v-if="model.isLonger">
                        <span>{{ longerDateText }}</span>
                      </template>
                      <template v-else>
                        <div @click="showEndDatePicker">
                          <template v-if="model.dateEndValue">
                            <span>{{ model.dateEndValue }}</span>
                          </template>
                          <template v-else>
                            <span class="cube-select-placeholder">{{
                              getI18n("dateStartValue.endPlaceholder")
                            }}</span>
                          </template>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="custom-form-switch">
                    <div class="cube-switch" @click="showLonger">
                      <cube-switch v-model="model.isLonger"> </cube-switch>
                      <span class="longer" :class="{ on: model.isLonger }">{{
                        longerDateText
                      }}</span>

                      <!-- <input
                        v-model="model.isLonger"
                        type="checkbox"
                        class="cube-switch-input"
                      />
                      <i class="cube-switch-ui">{{ longerDateText }}</i> -->
                    </div>
                  </div>
                </cube-form-item>
              </template>
              <!-- 证件类型 != 大陆身份证 根据身份证获取生日和性别-->
              <template v-else>
                <!-- 当选择护照时候出现有效期（必填） -->
                <template v-if="isPassport">
                  <cube-form-item :field="fields.dateStartValue">
                    <div class="custom-date-box">
                      <div
                        @click="showPassPortStartDatePicker"
                        class="custom-form-date"
                      >
                        <template v-if="model.passportStartValue">
                          <span>{{ model.passportStartValue }}</span>
                        </template>
                        <template v-else>
                          <span class="cube-select-placeholder">{{
                            getI18n("dateStartValue.startPlaceholder")
                          }}</span>
                        </template>
                      </div>
                      <div class="custom-form-separator">|</div>
                      <div class="custom-form-date">
                        <div @click="showPassPortEndDatePicker">
                          <template v-if="model.passportEndValue">
                            <span>{{ model.passportEndValue }}</span>
                          </template>
                          <template v-else>
                            <span class="cube-select-placeholder">{{
                              getI18n("dateStartValue.endPlaceholder")
                            }}</span>
                          </template>
                        </div>
                      </div>
                    </div>
                  </cube-form-item>
                </template>
                <cube-form-item :field="fields.birthday">
                  <div
                    @click="showBrithDatePicker"
                    class="cube-select"
                    :class="isSelectIcon"
                  >
                    <template v-if="model.birthday">
                      <span class="cube-select-text">{{ model.birthday }}</span>
                    </template>
                    <template v-else>
                      <span class="cube-select-placeholder">{{
                        fields.birthday.props.placeholder
                      }}</span>
                    </template>
                    <i class="cube-select-icon"></i>
                  </div>
                </cube-form-item>
                <cube-form-item :field="fields.sex"></cube-form-item>
              </template>
              <cube-form-item :field="fields.birthCountry"></cube-form-item>
              <cube-form-item
                v-if="model.birthCountry === 'OTH'"
                :field="fields.birthCountryTxt"
              ></cube-form-item>
              <cube-form-item :field="fields.birthArea"></cube-form-item>
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
import * as optionsList from "./options-list";
import { modelValidator } from "./validator";

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
        birthCountry: "", //出生国家
        birthCountryTxt: "", //出生国家
        birthArea: "", //出生地区
      },
      fields: {
        familyName: {
          type: "input",
          modelKey: "familyName",
          label: this.getI18n("familyName.label"),
          props: {
            placeholder: this.getI18n("familyName.placeholder"),
            maxlength: 50,
          },
        },
        givenName: {
          type: "input",
          modelKey: "givenName",
          label: this.getI18n("givenName.label"),
          props: {
            placeholder: this.getI18n("givenName.placeholder"),
            maxlength: 50,
          },
        },
        familyNameSpell: {
          type: "input",
          modelKey: "familyNameSpell",
          label: this.getI18n("familyNameSpell.label"),
          props: {
            placeholder: this.getI18n("familyNameSpell.placeholder"),
            maxlength: 50,
          },
        },
        givenNameSpell: {
          type: "input",
          modelKey: "givenNameSpell",
          label: this.getI18n("givenNameSpell.label"),
          props: {
            placeholder: this.getI18n("givenNameSpell.placeholder"),
            maxlength: 50,
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
        birthday: {
          type: "date",
          modelKey: "birthday",
          label: this.getI18n("birthday.label"),
          props: {
            placeholder: this.getI18n("birthday.placeholder"),
          },
        },
        sex: {
          type: "select",
          modelKey: "sex",
          label: this.getI18n("sex.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("sex.placeholder"),
            options: sexOptions,
          },
        },
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
      },
    };
  },
  computed: {
    familyNamePlaceHolder() {
      const tips = this.fields.familyName.props.placeholder;
      return this.isChina ? tips : `${tips}${this.getI18n("placeholderMore")}`;
    },
    givenNamePlaceHolder() {
      const tips = this.fields.givenName.props.placeholder;
      return this.isChina ? tips : `${tips}${this.getI18n("placeholderMore")}`;
    },
    // 香港永久身份
    isRealHK() {
      return this.openInfo.idKindKey === "idCardHk";
    },
    // 中国大陆国籍
    isChina() {
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
      return familyNameSpell + " " + givenNameSpell;
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
        birthCountryTxt,
      } = this.model;
      let arr = [
        familyNameSpell,
        givenNameSpell,
        idCardValue,
        birthday,
        sex,
        birthCountryTxt,
      ];

      if (this.isChina) {
        arr = [
          familyName,
          givenName,
          familyNameSpell,
          givenNameSpell,
          idCardValue,
          addressValue,
          dateStartValue,
          dateEndValue,
          birthCountryTxt,
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
          birthCountryTxt,
        ];
      }
      // idcard长度校验
      const idResult = idCardValue.length && idCardValue.length > 6
      const result = arr.every((val) => String(val).length);
      // return this.isChina ? !(result && cnNameValue.length > 1) : !result
      return !result || !idResult;
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
      // 大陆身份证 --> 根据身份证来获取出生日期与性别
      if (this.isChina) {
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
            const cardTips = this.getI18n('cardError');
            toast({ type: "error", txt: cardTips });
            return reject(new Error(cardTips));
          }
          // 大于70岁不允许线上开户
          if (age >= 70 && window.IS_CHECK_AGE) {
            const ageTips = this.getI18n('ageError');
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
                  title: this.getI18n('warmTips'),
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
                  title: this.getI18n('warmTips'),
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
          title: this.getI18n('bornDate'),
          cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
          confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
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
          title: this.getI18n('startDate'),
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
          title: this.getI18n('endDate'),
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
    // 护照起始日期
    showPassPortStartDatePicker() {
      if (!this.passportstartDatePicker) {
        // 50年前
        const startDate_min = new Date(getPreDay(365 * 50));
        const startDate_value = this.model.passportStartValue
          ? new Date(this.model.passportStartValue)
          : new Date();
        this.passportstartDatePicker = this.$createDatePicker({
          title: this.getI18n('startDate'),
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
          title: this.getI18n('endDate'),
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
        content: this.getI18n('longerConfirm'),
        confirmCallback: () => {
          this.model.dateEndValue = this.longerDateText;
        },
        cancelCallback: () => {
          this.model.isLonger = false;
        },
      });
    },
    showLonger() {
      !this.model.isLonger && this.handleIdCardLonger();
      this.model.dateEndValue = '';
    }
  },
  watch: {
    // "model.isLonger": function (newVal, oldVal) {
    //   if (newVal) {
    //     this.handleIdCardLonger();
    //   } else {
    //     if (this.model.dateEndValue === this.longerDateText) {
    //       this.model.dateEndValue = "";
    //     }
    //   }
    // },
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
      const w = newVal.split('').pop()
      // 校验输入值为非法字符
      if (w && !/^[A-Za-z0-9\(\)]+$/.test(w)) {
        // 香港身份证有括号
          this.model.idCardValue = oldVal
      } else {
        this.model.idCardValue = toDBC(newVal);
      }
    },
  },
};
</script>
