<template>
  <op-wrap
    :isDisabled="isDisabled"
    :handleBefore="handleBefore"
    @handleNext="handleNext"
  >
    <div class="olcn-step olcn-step-info-contact">
      <!-- 联系信息 -->
      <cube-form :model="model">
        <cube-form-group class="step-content custom-form-group">
          <head-title :title="titleValues.contactTitle"></head-title>
          <!-- 郵箱 -->
          <cube-form-item :field="fieldsContact.email"></cube-form-item>
          <!-- 教育程度 -->
          <cube-form-item
            :field="fieldsContact.educationLevel"
          ></cube-form-item>
          <!-- 婚姻状况 -->
          <cube-form-item :field="fieldsContact.maritalStatus"></cube-form-item>
          <!-- 住宅地址选择 -->
          <cube-form-item :field="fieldsContact.homeRadio"></cube-form-item>
          <!-- 住址地址选择省市区 -->
          <template v-if="model.homeRadio !== radioListValue.company">
            <template v-if="model.homeRadio !== radioListValue.oth">
              <cube-form-item :field="fieldsContact.homeCity">
                <!-- 住址地址大陆省市区 -->
                <template
                  v-if="model.homeRadio === optionsList.radioListValue.cn"
                >
                  <CascadePicker
                    :defaultCityText="defaultHomeText"
                    :defaultCity="defaultHomeCity"
                    v-model="model.homeCity"
                  ></CascadePicker>
                </template>
                <!-- 住址地址香港省市区 -->
                <template
                  v-if="model.homeRadio === optionsList.radioListValue.hk"
                >
                  <CascadePickerAreaHk
                    :defaultCityText="defaultHomeText"
                    :defaultCity="defaultHomeCity"
                    v-model="model.homeCity"
                  ></CascadePickerAreaHk>
                </template>
              </cube-form-item>
            </template>
            <!-- 住宅地址选择其他国家 -->
            <template v-else>
              <cube-form-item
                :field="fieldsHomeOther.homeOtherCountry"
              ></cube-form-item>
              <template v-if="model.homeOtherCountry === 'OTH'">
                <!-- <cube-form-item
                  :field="fieldsHomeOther.otherFamilyRepublic"
                  class="custom-form-enName"
                >
                  <div class="cube-input">
                    <input
                      v-model.trim="model.otherFamilyRepublic"
                      class="cube-input-field"
                      :placeholder="fieldsHomeOther.otherFamilyRepublic.props.placeholder"
                    />
                  </div>
                </cube-form-item> -->
                <cube-form-item
                  :field="fieldsHomeOther.otherFamilyRepublic"
                ></cube-form-item>
              </template>
              <cube-form-item
                :field="fieldsHomeOther.homeOtherProvince"
              ></cube-form-item>
              <cube-form-item
                :field="fieldsHomeOther.homeOtherCity"
              ></cube-form-item>
              <cube-form-item
                :field="fieldsHomeOther.homeOtherArea"
              ></cube-form-item>
            </template>
            <!-- 详细地址 -->
            <cube-form-item
              :field="fieldsContact.homeAddressDetail"
            ></cube-form-item>
            <template v-if="model.homeRadio !== optionsList.radioListValue.oth">
              <!-- 门牌号 -->
              <!-- <cube-form-item :field="fieldsContact.homeAddressNumber"></cube-form-item> -->
            </template>
          </template>
          <cube-form-item :field="fieldsContact.homeTelePhone"></cube-form-item>

          <!-- 通訊地址 -->
          <!-- TODO:可以做一个选择同现时住址的显示框 -->
          <cube-form-item :field="fieldsContact.contactRadio"></cube-form-item>
          <template v-if="isContactAddress">
            <cube-form-item
              :field="fieldsContact.contactCity"
              v-if="model.contactRadio !== 3"
            >
              <!-- 大陆省市区 -->
              <template
                v-if="model.contactRadio === optionsList.radioListValue.cn"
              >
                <CascadePicker
                  :defaultCityText="defaultContactText"
                  :defaultCity="defaultContactCity"
                  :title="fieldsContact.contactCity.props.title"
                  :cancelTxt="fieldsContact.contactCity.props.cancelTxt"
                  :confirmTxt="fieldsContact.contactCity.props.confirmTxt"
                  :placeholder="fieldsContact.contactCity.props.placeholder"
                  v-model="model.contactCity"
                ></CascadePicker>
              </template>
              <!-- 香港区域选择 -->
              <template
                v-if="model.contactRadio === optionsList.radioListValue.hk"
              >
                <CascadePickerAreaHk
                  :defaultCityText="defaultContactText"
                  :defaultCity="defaultContactCity"
                  :title="fieldsContact.contactCity.props.title"
                  :cancelTxt="fieldsContact.contactCity.props.cancelTxt"
                  :confirmTxt="fieldsContact.contactCity.props.confirmTxt"
                  :placeholder="fieldsContact.contactCity.props.placeholder"
                  v-model="model.contactCity"
                ></CascadePickerAreaHk>
              </template>
            </cube-form-item>

            <!-- 联系地址选择其他国家 -->
            <template
              v-if="model.contactRadio === optionsList.radioListValue.oth"
            >
              <cube-form-item
                :field="fieldsContactOther.contactOhterCountry"
              ></cube-form-item>
              <template v-if="model.contactOhterCountry === 'OTH'">
                <cube-form-item
                  :field="fieldsContactOther.otherContactRepublic"
                  class="custom-form-enName"
                >
                  <div class="cube-input">
                    <input
                      v-model.trim="model.otherContactRepublic"
                      class="cube-input-field"
                      :placeholder="
                        fieldsContactOther.otherContactRepublic.props
                          .placeholder
                      "
                    />
                  </div>
                </cube-form-item>
                <!-- <cube-form-item :field="fieldsContactOther.otherContactRepublic"></cube-form-item> -->
              </template>
              <cube-form-item
                :field="fieldsContactOther.contactOtherProvince"
              ></cube-form-item>
              <cube-form-item
                :field="fieldsContactOther.contactOtherCity"
              ></cube-form-item>
              <cube-form-item
                :field="fieldsContactOther.contactOtherArea"
              ></cube-form-item>
            </template>

            <!-- 详细地址 -->
            <cube-form-item
              :field="fieldsContact.contactAddressDetail"
            ></cube-form-item>

            <template v-if="model.contactRadio !== 3">
              <!-- 门牌号 -->
              <!-- <cube-form-item :field="fieldsContact.contactAddressNumber"></cube-form-item> -->
            </template>
            <cube-form-item
              :field="fieldsContact.contactTelePhone"
            ></cube-form-item>
          </template>
          <!-- <p class="tips" v-html="dStatementReceiveModeWarning"></p> -->
          <!-- 收取节单方式 -->
          <!-- <cube-form-item :field="fieldsContact.dStatementReceiveMode"></cube-form-item> -->
        </cube-form-group>
      </cube-form>
      <div class="margin-bottom"></div>
      <!-- 职业类型 -->
      <cube-form :model="professionModel">
        <cube-form-group class="step-content custom-form-group">
          <head-title :title="titleValues.professionTitle"></head-title>
          <cube-form-item
            :field="fieldsProfession.professionCode"
          ></cube-form-item>
          <template
            v-if="
              professionModel.professionCode ===
              optionsList.professionCodeValue.other
            "
          >
            <cube-form-item
              :field="fieldsProfession.professionCodeOther"
            ></cube-form-item>
          </template>
          <template
            v-if="
              professionModel.professionCode ===
                optionsList.professionCodeValue.employed ||
              professionModel.professionCode ===
                optionsList.professionCodeValue.selfEmployed
            "
          >
            <cube-form-item
              :field="fieldsProfession.companyName"
            ></cube-form-item>

            <cube-form-item
              :field="fieldsProfession.industryRange"
            ></cube-form-item>
            <!-- <template v-if="professionModel.professionCode === 1"> -->
            <cube-form-item
              :field="fieldsProfession.jobPosition"
            ></cube-form-item>
            <!-- </template> -->
            <cube-form-item
              :field="fieldsProfession.workingSeniority"
            ></cube-form-item>
            <cube-form-item
              :field="fieldsProfession.companyTelePhone"
            ></cube-form-item>
            <!-- 公司地址 -->
            <cube-form-item
              :field="fieldsProfession.companyAddress"
              v-if="professionModel.areaType !== 3"
            >
              <cube-textarea
                v-model="professionModel.companyAddress"
                :placeholder="fieldsProfession.companyAddress.props.placeholder"
                :maxlength="50"
                :indicator="false"
              ></cube-textarea>
            </cube-form-item>
          </template>
        </cube-form-group>
      </cube-form>
      <div class="last-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import * as optionsList from "./options-list";
import * as validForm from "./validator";
import { deepClone } from "@/main/utils/format/object";
import { getAge } from "@/main/utils/format/idcard";
import { toDBC } from "@/main/utils/format/formatter";
import validate from "@/main/utils/format/validate";

export default {
  mixins: [onlineMixin],
  data() {
    return {
      optionsList,
      // validity: {},
      // valid: undefined,
      // msg: "",
      // bankBlur: false, // 银行存款失去焦点
      // stockBlur: false,
      // realBlur: false,
      defaultContactValue: {},
      defaultProfessionValue: {},
      radioListValue: optionsList.radioListValue,
      model: {
        // 联络信息字段
        email: "", // 邮箱地址
        educationLevel: "", //
        maritalStatus: "", //
        homeRadio: optionsList.radioListValue.cn, // 住宅地址单选
        homeCity: [], // 住宅地址省市区
        homeAddressDetail: "", // 住宅地址省市区详细
        homeAddressNumber: "", // 住宅地址门牌号
        homeOtherCountry: "", // 选择其他国家
        otherFamilyRepublic: "", // 选择其他国际其他
        homeOtherCountryLabel: "", // 选择其他国家中文
        homeOtherProvince: "", // 选择其他国家省
        homeOtherCity: "", // 选择其他国家市
        homeOtherArea: "", // 选择其他国家区
        homeTelePhone: "", // 住址电话

        contactRadio: optionsList.radioListValue.home, // 通讯地址单选
        contactCity: [], // 通讯地址省市区
        contactAddressDetail: "", // 通讯地址省市区详细
        contactAddressNumber: "", // 通讯地址门牌号
        otherContactRepublic: "", // 选择其他国家
        contactOhterCountry: "", // 选择其他国家
        contactOhterCountryLable: "", // 选择其他国家中文名
        contactOtherProvince: "", // 选择其他国家省
        contactOtherCity: "", // 选择其他国家市
        contactOtherArea: "", // 选择其他国家区域
        contactTelePhone: "", // 选择其他国家区
        dStatementReceiveMode: "1", //收取节点及书信方式
      },
      dStatementReceiveModeWarning: this.getI18n(
        "contact.dStatementReceiveModeWarning"
      ),
      // 职业类型字段
      professionModel: {
        professionCode: 0, // 职业类型选择
        professionCodeOther: "", // 其他职业
        companyName: "", // 公司名称
        companyAddress: "", // 公司地址详细
        companyTelePhone: "", // 辦公室電話
        workingSeniority: "", // 從業年限
        industryRange: "", // 所属行业
        jobPosition: "", // 职位级别
      },
      // 联络信息
      fieldsContact: {
        email: {
          type: "input",
          modelKey: "email",
          label: this.getI18n("contact.email.label"),
          props: {
            placeholder: this.getI18n("contact.email.placeholder"),
            maxlength: 50,
          },
          trigger: "blur",
        },
        educationLevel: {
          type: "select",
          modelKey: "educationLevel",
          label: this.getI18n("contact.educationLevel.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.educationLevel.placeholder"),
            options: optionsList.educationLevelOptions(),
          },
          rules: {
            required: false,
          },
        },
        maritalStatus: {
          type: "select",
          modelKey: "maritalStatus",
          label: this.getI18n("contact.maritalStatus.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.maritalStatus.placeholder"),
            options: optionsList.maritalStatusOptions(),
          },
          rules: {
            required: false,
          },
        },
        homeRadio: {
          type: "select",
          modelKey: "homeRadio",
          label: this.getI18n("contact.homeRadio.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.homeRadio.placeholder"),
            options: optionsList.homeRadioOptions(),
          },
          events: {
            change: (args) => {
              this.changeHomeArea(args);
            },
          },
          rules: {
            required: false,
          },
        },
        homeCity: {
          modelKey: "homeCity",
          label: this.getI18n("contact.addressCity.label"),
          rules: {
            required: false,
          },
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            defaultCity: [3, 0, 0],
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.addressCity.placeholder"),
          },
          messages: {
            required: this.$t("common.cubeComponents.select.title"),
          },
        },
        homeAddressDetail: {
          type: "input",
          modelKey: "homeAddressDetail",
          label: this.getI18n("contact.addressDetail.label"),
          props: {
            placeholder: this.getI18n("contact.addressDetail.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        homeAddressNumber: {
          type: "input",
          modelKey: "homeAddressNumber",
          label: this.getI18n("contact.addressNumber.label"),
          props: {
            placeholder: this.getI18n("contact.addressNumber.placeholder"),
            maxlength: 20,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        homeTelePhone: {
          type: "input",
          modelKey: "homeTelePhone",
          label: this.getI18n("contact.homeTelePhone.label"),
          props: {
            placeholder: this.getI18n("contact.homeTelePhone.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        contactRadio: {
          type: "select",
          modelKey: "contactRadio",
          label: this.getI18n("contact.contactRadio.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.contactRadio.placeholder"),
            options: optionsList.contactRadioOptions(),
          },
          events: {
            change: (args) => {
              this.changeContactArea(args);
            },
          },
          rules: {
            required: false,
          },
        },
        contactCity: {
          modelKey: "contactCity",
          label: this.getI18n("contact.addressCity.label"),
          rules: {
            required: false,
          },
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            defaultCity: [3, 0, 0],
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("contact.addressCity.placeholder"),
          },
          messages: {
            required: this.$t("common.cubeComponents.select.title"),
          },
        },
        contactAddressDetail: {
          type: "input",
          modelKey: "contactAddressDetail",
          label: this.getI18n("contact.addressDetail.label"),
          props: {
            placeholder: this.getI18n("contact.addressDetail.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        contactAddressNumber: {
          type: "input",
          modelKey: "contactAddressNumber",
          label: this.getI18n("contact.addressNumber.label"),
          props: {
            placeholder: this.getI18n("contact.addressNumber.placeholder"),
            maxlength: 20,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        contactTelePhone: {
          type: "input",
          modelKey: "contactTelePhone",
          label: this.getI18n("contact.contactTelePhone.label"),
          props: {
            placeholder: this.getI18n("contact.contactTelePhone.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        dStatementReceiveMode: {
          type: "select",
          modelKey: "dStatementReceiveMode",
          label: this.getI18n("contact.dStatementReceiveMode.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "contact.dStatementReceiveMode.placeholder"
            ),
            options: optionsList.dStatementReceiveModeOptions(),
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
      },
      // 住址选择其他
      fieldsHomeOther: {
        homeOtherCountry: {
          type: "select",
          modelKey: "homeOtherCountry",
          label: this.getI18n("contact.addressOtherCountry.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "contact.addressOtherCountry.placeholder"
            ),
            options: [],
          },
          events: {
            change: (args, idx, text) => {
              this.model.homeOtherCountryLabel = text;
            },
          },
        },
        homeOtherProvince: {
          type: "input",
          modelKey: "homeOtherProvince",
          label: this.getI18n("contact.addressOtherProvince.label"),
          props: {
            placeholder: this.getI18n(
              "contact.addressOtherProvince.placeholder"
            ),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        homeOtherCity: {
          type: "input",
          modelKey: "homeOtherCity",
          label: this.getI18n("contact.addressOtherCity.label"),
          props: {
            placeholder: this.getI18n("contact.addressOtherCity.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        homeOtherArea: {
          type: "input",
          modelKey: "homeOtherArea",
          label: this.getI18n("contact.addressOtherArea.label"),
          props: {
            placeholder: this.getI18n("contact.addressOtherArea.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },

        otherFamilyRepublic: {
          type: "input",
          modelKey: "otherFamilyRepublic",
          label: this.getI18n("contact.addressOtherRepublic.label"),
          props: {
            placeholder: this.getI18n(
              "contact.addressOtherRepublic.placeholder"
            ),
            maxlength: 50,
          },
          trigger: "blur",
        },
      },
      // 联系地址选择其他
      fieldsContactOther: {
        contactOhterCountry: {
          type: "select",
          modelKey: "contactOhterCountry",
          label: this.getI18n("contact.addressOtherCountry.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "contact.addressOtherCountry.placeholder"
            ),
            options: [],
          },
          events: {
            change: (args, idx, text) => {
              this.model.contactOhterCountryLable = text;
            },
          },
        },
        contactOtherProvince: {
          type: "input",
          modelKey: "contactOtherProvince",
          label: this.getI18n("contact.addressOtherProvince.label"),
          props: {
            placeholder: this.getI18n(
              "contact.addressOtherProvince.placeholder"
            ),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        contactOtherCity: {
          type: "input",
          modelKey: "contactOtherCity",
          label: this.getI18n("contact.addressOtherCity.label"),
          props: {
            placeholder: this.getI18n("contact.addressOtherCity.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        contactOtherArea: {
          type: "input",
          modelKey: "contactOtherArea",
          label: this.getI18n("contact.addressOtherArea.label"),
          props: {
            placeholder: this.getI18n("contact.addressOtherArea.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        otherContactRepublic: {
          type: "input",
          modelKey: "otherContactRepublic",
          label: this.getI18n("contact.addressOtherRepublic.label"),
          props: {
            placeholder: this.getI18n(
              "contact.addressOtherRepublic.placeholder"
            ),
            maxlength: 50,
          },
          trigger: "blur",
        },
      },
      fieldsProfession: {
        professionCode: {
          type: "select",
          modelKey: "professionCode",
          label: this.getI18n("profession.professionCode.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("profession.professionCode.placeholder"),
            options: optionsList.professionCodeOptions(),
          },
          events: {
            change: (args) => {
              this.changeProfess(args);
            },
          },
          rules: {
            required: false,
          },
        },
        professionCodeOther: {
          type: "input",
          modelKey: "professionCodeOther",
          label: this.getI18n("profession.professionCodeOther.label"),
          props: {
            placeholder: this.getI18n(
              "profession.professionCodeOther.placeholder"
            ),
          },
          rules: {
            required: false,
          },
        },
        companyName: {
          type: "input",
          modelKey: "companyName",
          label: this.getI18n("profession.companyName.label"),
          props: {
            placeholder: this.getI18n("profession.companyName.placeholder"),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        companyAddress: {
          modelKey: "companyAddress",
          label: this.getI18n("profession.companyAddress.label"),
          props: {
            placeholder: this.getI18n("profession.companyAddress.placeholder"),
            maxlength: 50,
          },
        },
        industryRange: {
          type: "input",
          modelKey: "industryRange",
          label: this.getI18n("profession.industryRange.label"),
          props: {
            placeholder: this.getI18n("profession.industryRange.placeholder"),
          },
          rules: {
            required: false,
          },
        },
        jobPosition: {
          type: "select",
          modelKey: "jobPosition",
          label: this.getI18n("profession.jobPosition.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n("profession.jobPosition.placeholder"),
            options: optionsList.jobPositionOptions(),
          },
          rules: {
            required: false,
          },
        },
        companyTelePhone: {
          type: "input",
          modelKey: "companyTelePhone",
          label: this.getI18n("profession.companyTelePhone.label"),
          props: {
            placeholder: this.getI18n(
              "profession.companyTelePhone.placeholder"
            ),
            maxlength: 50,
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
        workingSeniority: {
          type: "select",
          modelKey: "workingSeniority",
          label: this.getI18n("profession.workingSeniority.label"),
          props: {
            title: this.$t("common.cubeComponents.select.title"),
            cancelTxt: this.$t("common.cubeComponents.select.cancelTxt"),
            confirmTxt: this.$t("common.cubeComponents.select.confirmTxt"),
            placeholder: this.getI18n(
              "profession.workingSeniority.placeholder"
            ),
            options: optionsList.workingSeniorityOptions(),
          },
          rules: {
            required: false,
          },
          trigger: "blur",
        },
      },
    };
  },
  computed: {
    // 返回title
    titleValues() {
      return {
        contactTitle: this.getI18n("contact.title"),
        professionTitle: this.getI18n("profession.title"),
      };
    },
    // 验证联络信息
    validContact() {
      const data = this.model;
      const status = validForm.contactValidator.map((val) => {
        // 住址地址同身份证
        if (data.homeRadio === this.radioListValue.idCard) {
          if (
            val.key === "homeCity" ||
            val.key === "homeAddressDetail" ||
            val.key === "homeAddressNumber"
          ) {
            return true;
          }
        }
        // 通讯地址选择同公司，同住宅
        if (
          data.contactRadio === this.radioListValue.company ||
          data.contactRadio === this.radioListValue.home
        ) {
          if (
            val.key === "contactCity" ||
            val.key === "contactAddressDetail" ||
            val.key === "contactAddressNumber"
          ) {
            return true;
          }
        }

        // 选择其他地区
        if (
          data.homeRadio === this.radioListValue.oth ||
          data.contactRadio === this.radioListValue.oth
        ) {
          // 门牌号非必填
          if (
            val.key === "homeAddressNumber" ||
            val.key === "contactAddressNumber"
          ) {
            return true;
          }

          if (
            data.homeOtherCountry !== "OTH" &&
            val.key === "otherFamilyRepublic"
          ) {
            return true;
          }

          if (
            data.contactOhterCountry !== "OTH" &&
            val.key === "otherContactRepublic"
          ) {
            return true;
          }
        }

        if (data.homeRadio !== this.radioListValue.oth) {
          // 选择其他地区时候验证字段
          const otherContry = [
            "homeOtherCountry",
            "homeOtherProvince",
            "homeOtherCity",
            "homeOtherArea",
            "otherFamilyRepublic",
          ];
          if (otherContry.includes(val.key)) {
            return true;
          }
        }

        if (data.contactRadio !== this.radioListValue.oth) {
          // 选择其他地区时候验证字段
          const otherContry = [
            "contactOhterCountry",
            "contactOtherProvince",
            "contactOtherCity",
            "contactOtherArea",
            "otherContactRepublic",
          ];

          if (otherContry.includes(val.key)) {
            return true;
          }
        }

        // 区分省市联动为数组对象
        if (typeof data[val.key] === "object") {
          if (
            data.homeRadio === this.radioListValue.oth &&
            val.key === "homeCity"
          ) {
            return true;
          }
          if (
            data.contactRadio === this.radioListValue.oth &&
            val.key === "contactCity"
          ) {
            return true;
          }
          return Boolean(data[val.key].length);
        }
        return Boolean(data[val.key]);
      });
      return !status.includes(false) && Boolean(data.dStatementReceiveMode);
    },
    // 验证职业类型
    validProfession() {
      const data = this.professionModel;
      const status = validForm.professionValidator.map((val) => {
        const item = data[val];
        if (!data.professionCode) return false;
        // 职业类型选择受雇
        if (data.professionCode === 1) {
          if (typeof item === "object") {
            return Boolean(item.length);
          }
          return Boolean(item);
          // 职业类型选择自营
        } else if (data.professionCode === 2) {
          if (typeof item === "object") {
            return Boolean(item.length);
          }
          if (val === "jobPosition") {
            // 自营不需要填写职位
            return true;
          }
          return Boolean(item);
        } else if (
          data.professionCode === this.optionsList.professionCodeValue.others
        ) {
          return !!(
            data.professionCodeOther && data.professionCodeOther.trim().length
          );
        }
        // 其余职业
        return true;
      });
      return !status.includes(false);
    },
    // 验证提交按钮
    isDisabled() {
      const status = this.validProfession && this.validContact;
      return !status;
    },
    // 默认显示上一次选择城市下拉框的值(家庭地址)
    defaultHomeCity() {
      return this.model.homeCity.map((val) => val.index);
    },
    // 默认显示上一次选择城市输入框的值(家庭地址)
    defaultHomeText() {
      return this.model.homeCity.map((val) => val.text);
    },
    // 默认显示上一次选择城市下拉框的值(联络地址)
    defaultContactCity() {
      return this.model.contactCity.map((val) => val.index);
    },
    // 默认显示上一次选择城市输入框的值(联络地址)
    defaultContactText() {
      return this.model.contactCity.map((val) => val.text);
    },
    // 通讯地址选择同公司地址 || 同住址地址
    isContactAddress() {
      const { contactRadio } = this.model;
      if (
        contactRadio === this.radioListValue.company ||
        contactRadio === this.radioListValue.home
      ) {
        return false;
      }
      return true;
    },
  },
  methods: {
    // 电话号码验证，只验证了全数字和长度不大于11
    validPhoneNumMsg() {
      const phoneList = [
        {
          val: this.model.homeTelePhone,
          label: this.getI18n("contact.homeTelePhone.label"),
        },
        {
          val: this.model.contactTelePhone,
          label: this.getI18n("contact.contactTelePhone.label"),
        },
        {
          val: this.professionModel.companyTelePhone,
          label: this.getI18n("profession.companyTelePhone.label"),
        },
      ];
      const errorTipsPre = this.getI18n("errorTipsPre");
      let errorTips = "";
      phoneList.some((item) => {
        const isReal = item.val === "" || validate.isNumber(item.val);
        if (!isReal) {
          errorTips = errorTipsPre + item.label;
        }
        return !isReal;
      });

      return errorTips;
    },
    getI18n(key, type = "") {
      return this.getStepI18nValue("infoContact", key);
    },
    // 住址地址选择地区
    changeHomeArea(args) {
      this.model.homeCity = [];
      this.model.homeAddressDetail = "";
      this.model.homeAddressNumber = "";
      if (args === this.radioListValue.oth) {
        this.fieldsContact.homeAddressDetail.props.placeholder = this.getI18n(
          "contact.addressDetail.placeholderOther"
        );
      } else {
        this.fieldsContact.homeAddressDetail.props.placeholder = this.getI18n(
          "contact.addressDetail.placeholder"
        );
      }
    },
    // 通讯地址选择地区
    changeContactArea(args) {
      this.model.contactCity = [];
      this.model.contactAddressDetail = "";
      this.model.contactAddressNumber = "";
      if (args === this.radioListValue.oth) {
        this.fieldsContact.contactAddressDetail.props.placeholder = this.getI18n(
          "contact.addressDetail.placeholderOther"
        );
      } else {
        this.fieldsContact.contactAddressDetail.props.placeholder = this.getI18n(
          "contact.addressDetail.placeholder"
        );
      }
    },
    changeProfess(args) {
      const userInfo = this.openInfo;
      const defaultData = this.professionModel;

      // 切换职业类型清空数据以及数据回填
      if (userInfo.professionCode === args) {
        // 初始化赋值
        // TODO: 修改，不需要重置联系信息
        Object.keys(defaultData).forEach((val) => {
          defaultData[val] = userInfo[val] ? userInfo[val] : defaultData[val];
        });
      } else {
        this.professionModel = deepClone(this.defaultProfessionValue);
        this.professionModel.professionCode = args;
      }
    },
    // 空字符校验字符
    validateEmpty() {
      if (this.professionModel.professionCode === optionsList.professionCodeValue.employed || this.professionModel.professionCode === optionsList.professionCodeValue.selfEmployed) {
        const {
          companyName,
          companyAddress,
          industryRange,
        } = this.professionModel
        return companyName.replace(/\s+/g, '') && companyAddress.replace(/\s+/g, '') && industryRange.replace(/\s+/g, '')
      } else {
        return true
      }
    },
    // 验证邮箱的准确性
    validEmail() {
      const { email } = this.model;
      const em = email.trim();
      return /^[a-z0-9._-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)+$/i.test(em);
    },
    // 达到45岁渲染退休选项
    // showRetire() {
    //   const { birthday = "" } = this.openInfo;
    //   const age = getAge(birthday);
    //   if (age < 45) {
    //     this.fieldsProfession.professionCode.props.options = optionsList.industryRange.filter(
    //       (item) => item.value !== 5
    //     );
    //   }
    // },
    // 获取所属行业选项
    // async fetchOptionsIndustry() {
    //   await this.$store.dispatch("getDictionary", WEB_OCCUPATION_TYPE);
    //   this.fieldsProfession.industryRange.props.options = this.openIndustry;
    // },
    // 获取后台数据字典
    async fetchDataDesin() {
      const result = await this.$store.dispatch(
        "getDictionary",
        this.$t("iOpen.common.nationlityCode")
      );
      // const result = optionsList.countryTest
      const list = result
        .map((res) => ({ text: res.name, value: res.value }))
        .filter((v) => v.value !== "0" && v.value !== "2");
      // this.fieldsProfession[7].props.options = list;
      this.fieldsHomeOther.homeOtherCountry.props.options = list;
      this.fieldsContactOther.contactOhterCountry.props.options = list;
    },
    // 数据回填
    initData() {
      this.defaultContactValue = deepClone(this.model); // 深拷贝初始值
      this.defaultProfessionValue = deepClone(this.professionModel); // 深拷贝初始值

      const openInfo = this.openInfo;

      const defaultData = this.model;
      const defaultProfessionData = this.professionModel;

      // 初始化重置数据
      Object.keys(defaultData).forEach((val) => {
        defaultData[val] = openInfo[val] ? openInfo[val] : defaultData[val];
      });

      Object.keys(defaultProfessionData).forEach((val) => {
        defaultProfessionData[val] = openInfo[val]
          ? openInfo[val]
          : defaultProfessionData[val];
      });
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        const {
          idCardValue: idCard = "",
          cnNameValue: userName = "",
        } = this.openInfo;

        // 校验邮箱格式
        if (!this.validEmail()) {
          const errorTips = this.getI18n("errorTipsEmail");
          toast({ type: "error", txt: errorTips, time: 1000 });
          return reject(new Error(errorTips));
        }

        const validPhoneTips = this.validPhoneNumMsg();
        if (validPhoneTips != "") {
          toast({ type: "error", txt: validPhoneTips, time: 1000 });
          return reject(new Error(validPhoneTips));
        }
        if (!this.validateEmpty()) {
          const errorTips = this.getI18n('empty');
          toast({ type: "error", txt: errorTips, time: 1000 });
          return reject(new Error(errorTips));
        }

        // 检查邮箱唯一性
        this.$store
          .dispatch("checkEmail", { email: this.model.email })
          .then((res) => {
            resolve();
          })
          .catch((err) => {
            toast({ type: "error", txt: err.message, time: 1000 });
            reject(err);
          });
      });
    },
    // 下一步
    handleNext(e) {
      e.preventDefault();
      // 保存数据&下一步
      const params = {
        step: this.step,
        info: { ...this.model, ...this.professionModel },
      };
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
  },
  watch: {
    "model.email"(newVal, oldVal) {
      this.model.email = toDBC(newVal).toLowerCase();
    },
  },
  created() {
    // this.fetchOptionsIndustry();
    this.fetchDataDesin();
    // this.showRetire();
  },
  mounted() {
    this.initData();
  },
};
</script>


