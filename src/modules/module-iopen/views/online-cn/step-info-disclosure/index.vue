<template>
  <op-wrap
    :isDisabled="isDisableNext"
    :btnText="getI18n('nextBtn')"
    @handleNext="handleNext"
  >
    <div class="olcn-step olcn-step-info-other">
      <cube-form :model="model" class="step-content">
        <head-title :title="titleValues.declareTitle"></head-title>
        <!-- 是否唯一收益拥有人 -->
        <!-- <cube-form-group class="custom-form-group">
          <cube-form-item :field="fieldsAccountOwner.isAccountOwner"></cube-form-item>
        </cube-form-group>-->

        <!-- 是否与本公司员工有关系 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsOurStaffKin.unrelatedToWLSStaff"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotOurStaffKin.isCanFalse &&
                !model.isNotOurStaffKin
            "
          >
            <!-- <cube-form-item
              :field="fieldsOurStaffKin.relatedStaffName"
            ></cube-form-item>
            <cube-form-item
              :field="fieldsOurStaffKin.relationship"
            ></cube-form-item> -->
            <div class="list" v-for="(item, index) in staff" :key="index">
              <div class="list-item">
                <label for="first">{{
                  getI18n("other.ourStaffKinName")
                }}</label>
                <input
                  type="text"
                  name="first"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.ourStaffKinName"
                  :maxlength="maxLength.FIFTY"
                />
              </div>
              <div class="list-item">
                <label for="second">{{
                  getI18n("other.ourStaffKinRelation")
                }}</label>
                <input
                  type="text"
                  name="second"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.ourStaffKinRelation"
                  :maxlength="maxLength.FIFTY"
                />
              </div>
            </div>
            <add-delete-btn
              @handleAdd="addList(staff, staffObj, 'isNotOurStaffKin')"
              @handleDelete="deleteList(staff)"
            ></add-delete-btn>
          </template>
        </cube-form-group>

        <!-- 是否港交所參與者僱員 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsHkexParterStaff.isNotHkexParterStaff"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotHkexParterStaff.isCanFalse &&
                !model.isNotHkexParterStaff
            "
          >
            <!-- <cube-form-item
              :field="fieldsHkexParterStaff.hkexParterName"
            ></cube-form-item>
            <cube-form-item
              :field="fieldsHkexParterStaff.hkexParterCENo"
            ></cube-form-item> -->
            <div
              class="list"
              v-for="(item, index) in hkexParter"
              :key="index"
            >
              <div class="list-item">
                <label for="first">{{ getI18n("other.hkexParterName") }}</label>
                <input
                  type="text"
                  name="first"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.hkexParterName"
                  :maxlength="maxLength.FIFTY"

                />
              </div>
              <div class="list-item">
                <label for="second">{{
                  getI18n("other.hkexParterCENo")
                }}</label>
                <input
                  type="text"
                  name="second"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.hkexParterCENo"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
            </div>
            <add-delete-btn
              @handleAdd="
                addList(hkexParter, hkexParterObj, 'isNotHkexParterStaff')
              "
              @handleDelete="deleteList(hkexParter)"
            ></add-delete-btn>
          </template>
        </cube-form-group>

        <!-- 配偶是否拥有保证金账户 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsConsortWithMargin.isNotConsortWithMargin"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotConsortWithMargin.isCanFalse &&
                !model.isNotConsortWithMargin
            "
          >
            <!-- <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithMargin.withMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithMargin.withMarginAccount"
            ></cube-form-item> -->
            <div class="list" v-for="(item, index) in margin" :key="index">
              <div class="list-item">
                <label for="first">{{ getI18n("other.withMarginName") }}</label>
                <input
                  type="text"
                  name="first"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.withMarginName"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
              <div class="list-item">
                <label for="second">{{
                  getI18n("other.withMarginAccount")
                }}</label>
                <input
                  type="text"
                  name="second"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.withMarginAccount"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
            </div>
            <add-delete-btn
              @handleAdd="addList(margin, marginObj, 'isNotConsortWithMargin')"
              @handleDelete="deleteList(margin)"
            ></add-delete-btn>
          </template>
        </cube-form-group>

        <!-- 本人或配偶是否是其他账户的实际拥有人或担保人 -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsOtherPOorPGWithMargin.isNotBOorPG"
          ></cube-form-item>
          <template
            v-if="disclosureDefine.isNotBOorPG.isCanFalse && !model.isNotBOorPG"
          >
            <!-- <cube-form-item
              class="label-width-5em"
              :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-5em"
              :field="fieldsOtherPOorPGWithMargin.otherPOorBGMarginAccount"
            ></cube-form-item> -->
            <div
              class="list"
              v-for="(item, index) in otherMargin"
              :key="index"
            >
              <div class="list-item">
                <label for="first">{{
                  getI18n("other.otherBOorPGAccountName")
                }}</label>
                <input
                  type="text"
                  name="first"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.otherPOorBGMarginName"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
              <div class="list-item">
                <label for="second">{{
                  getI18n("other.otherBOorPGAccountNumber")
                }}</label>
                <input
                  type="text"
                  name="second"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.otherPOorBGMarginAccount"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
            </div>
            <add-delete-btn
              @handleAdd="addList(otherMargin, otherMarginObj, 'isNotBOorPG')"
              @handleDelete="deleteList(otherMargin)"
            ></add-delete-btn>
          </template>
        </cube-form-group>

        <!-- 是否大于35% -->
        <cube-form-group class="custom-form-group">
          <cube-form-item
            :field="fieldsConsortWithOtherMargin.isNotConsortWithOtherMargin"
          ></cube-form-item>
          <template
            v-if="
              disclosureDefine.isNotConsortWithOtherMargin.isCanFalse &&
                !model.isNotConsortWithOtherMargin
            "
          >
            <!-- <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithOtherMargin.withOtherMarginName"
            ></cube-form-item>
            <cube-form-item
              class="label-width-4em"
              :field="fieldsConsortWithOtherMargin.withOtherMarginAccount"
            ></cube-form-item> -->
            <div
              class="list"
              v-for="(item, index) in withOtherMargin"
              :key="index"
            >
              <div class="list-item">
                <label for="first">{{
                  getI18n("other.withOtherMarginName")
                }}</label>
                <input
                  type="text"
                  name="first"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.withOtherMarginName"
                  :maxlength="maxLength.TWENTY"
                  
                />
              </div>
              <div class="list-item">
                <label for="second">{{
                  getI18n("other.withOtherMarginAccount")
                }}</label>
                <input
                  type="text"
                  name="second"
                  :placeholder="getI18n('other.inputPlaceholder')"
                  v-model="item.withOtherMarginAccount"
                  :maxlength="maxLength.TWENTY"

                />
              </div>
            </div>
            <add-delete-btn
              @handleAdd="
                addList(
                  withOtherMargin,
                  withOtherMarginObj,
                  'isNotConsortWithOtherMargin'
                )
              "
              @handleDelete="deleteList(withOtherMargin)"
            ></add-delete-btn>
          </template>
        </cube-form-group>
        <div class="margin-bottom"></div>

        <!-- 是否美國綠卡 -->
        <section>
          <head-title :title="titleValues.greenCardTitle"></head-title>
          <h3 class="greenCardDeclare">{{ greenCardDeclare }}</h3>
          <cube-form-group class="custom-form-group">
            <cube-form-item :field="fieldUSGreenCard"></cube-form-item>
          </cube-form-group>
        </section>
      </cube-form>
      <div class="margin-bottom"></div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import { disclosureDefine } from "@/modules/module-iopen/format/format-cn/other";
import * as optionsList from "./option-list";
import { MAX_LENGTH } from "@/modules/module-iopen/enums/maxLength";

const emtpy = ["null", "undefined", "", undefined, null];

export default {
  mixins: [onlineMixin],
  components: {},
  data() {
    return {
      maxLength: MAX_LENGTH,
      greenCardDeclare: this.getI18n("other.isNotUsGreenCardHolder.title"),
      model: {
        isAccountOwner: true,

        isNotOurStaffKin: true,
        // ourStaffKinName: "",
        // ourStaffKinRelation: "",

        isNotHkexParterStaff: true,
        // hkexParterName: "",
        // hkexParterCENo: "",

        isNotConsortWithMargin: true,
        // withMarginName: "",
        // withMarginAccount: "",

        isNotBOorPG: true,
        // otherPOorBGMarginName: "",
        // otherPOorBGMarginAccount: "",

        isNotConsortWithOtherMargin: true,
        // withOtherMarginName: "",
        // withOtherMarginAccount: "",

        isNotUsGreenCardHolder: 3,
      },
      //大于一项时数据存放
      staff: [],
      hkexParter: [],
      margin: [],
      otherMargin: [],
      withOtherMargin: [],
      staffObj: {
        ourStaffKinName: '',
        ourStaffKinRelation: '',
      },
      hkexParterObj: {
        hkexParterName: '',
        hkexParterCENo: '',
      },
      marginObj: {
        withMarginName: '',
        withMarginAccount: '',
      },
      otherMarginObj: {
        otherPOorBGMarginName: '',
        otherPOorBGMarginAccount: '',
      },
      withOtherMarginObj: {
        withOtherMarginName: '',
        withOtherMarginAccount: '',
      },
      // 1 是否本账号唯一受益人
      fieldsAccountOwner: {
        isAccountOwner: {
          type: "checkbox",
          modelKey: "isAccountOwner",
          props: {
            option: {
              label: this.getI18n("other.isAccountOwner"),
              value: true,
            },
            shape: "square",
          },
        },
      },
      // 3 是否本公司员工有关
      fieldsOurStaffKin: {
        unrelatedToWLSStaff: {
          type: "checkbox",
          modelKey: "isNotOurStaffKin",
          props: {
            option: {
              label: this.getI18n("other.isNotOurStaffKin"),
              value: true,
            },
            shape: "square",
          },
        },
        relatedStaffName: {
          type: "input",
          modelKey: "ourStaffKinName",
          label: this.getI18n("other.ourStaffKinName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY,

          },
        },
        relationship: {
          type: "input",
          modelKey: "ourStaffKinRelation",
          label: this.getI18n("other.ourStaffKinRelation"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
      },
      // 4
      fieldsHkexParterStaff: {
        isNotHkexParterStaff: {
          type: "checkbox",
          modelKey: "isNotHkexParterStaff",
          props: {
            option: {
              label: this.getI18n("other.isNotHkexParterStaff"),
              value: true,
            },
            shape: "square",
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        hkexParterName: {
          type: "input",
          modelKey: "hkexParterName",
          label: this.getI18n("other.hkexParterName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        hkexParterCENo: {
          type: "input",
          modelKey: "hkexParterCENo",
          label: this.getI18n("other.hkexParterCENo"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
      },
      // 5
      fieldsConsortWithMargin: {
        isNotConsortWithMargin: {
          type: "checkbox",
          modelKey: "isNotConsortWithMargin",
          props: {
            option: {
              label: this.getI18n("other.isNotConsortWithMargin"),
              value: true,
            },
            shape: "square",
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        withMarginName: {
          type: "input",
          modelKey: "withMarginName",
          label: this.getI18n("other.withMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        withMarginAccount: {
          type: "input",
          modelKey: "withMarginAccount",
          label: this.getI18n("other.withMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
      },
      //不是担保人
      fieldsOtherPOorPGWithMargin: {
        isNotBOorPG: {
          type: "checkbox",
          modelKey: "isNotBOorPG",
          props: {
            option: {
              label: this.getI18n("other.isNotBOorPG"),
              value: true,
            },
            shape: "square",

          },
        },
        otherPOorBGMarginName: {
          type: "input",
          modelKey: "otherPOorBGMarginName",
          label: this.getI18n("other.otherBOorPGAccountName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        otherPOorBGMarginAccount: {
          type: "input",
          modelKey: "otherPOorBGMarginAccount",
          label: this.getI18n("other.otherBOorPGAccountNumber"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
      },
      // 6
      fieldsConsortWithOtherMargin: {
        isNotConsortWithOtherMargin: {
          type: "checkbox",
          modelKey: "isNotConsortWithOtherMargin",
          props: {
            option: {
              label: this.getI18n("other.isNotConsortWithOtherMargin"),
              value: true,
            },
            shape: "square",
          },
        },
        withOtherMarginName: {
          type: "input",
          modelKey: "withOtherMarginName",
          label: this.getI18n("other.withOtherMarginName"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
        withOtherMarginAccount: {
          type: "input",
          modelKey: "withOtherMarginAccount",
          label: this.getI18n("other.withOtherMarginAccount"),
          props: {
            placeholder: this.getI18n("other.inputPlaceholder"),
            maxlength: MAX_LENGTH.TWENTY

          },
        },
      },
      // 7
      fieldUSGreenCard: {
        type: "radio-group",
        modelKey: "isNotUsGreenCardHolder",
        props: {
          options: optionsList.getUsGreenCardOptions(),
        },
      },
      disclosureDefine: disclosureDefine,
      addedItemObj: {},
    };
  },
  computed: {
    titleValues() {
      return {
        declareTitle: this.getI18n("other.declareTitle"),
        greenCardTitle: this.getI18n("other.greenCardTitle"),
      };
    },
    // 第一个复选框校验
    // accountOwnerStatusCheck() {
    //   const { isAccountOwner } = this.model;
    //   if (isAccountOwner) {
    //     return true;
    //   }

    //   return false;
    // },
    ourStaffKInStatusCheck() {
      const {
        isNotOurStaffKin,
        // ourStaffKinName,
        // ourStaffKinRelation,
      } = this.model;
      if (isNotOurStaffKin) {
        return true;
      }
      // if (ourStaffKinName && ourStaffKinRelation) {

      //   return true;
      // }
      return this.staff.every((item) => Object.values(item).every((val) => val.trim()))
;
    },
    // 第4个复选框校验
    HKexParternerStaffStatusCheck() {
      const {
        isNotHkexParterStaff,
        // hkexParterName,
        // hkexParterCENo,
      } = this.model;
      if (isNotHkexParterStaff) {
        return true;
      }
      // if (hkexParterName && hkexParterCENo) {
      //   return true;
      // }
      return this.hkexParter.every((item) => Object.values(item).every((val) => val.trim()))

    },
    // 第5个复选框校验
    consortWithMarginStatusCheck() {
      const {
        isNotConsortWithMargin,
        // withMarginName,
        // withMarginAccount,
      } = this.model;
      if (isNotConsortWithMargin) {
        return true;
      }
      // if (withMarginName && withMarginAccount) {
      //   return true;
      // }
      return this.margin.every((item) => Object.values(item).every((val) => val.trim()))

    },
    BOorPGStatusCheck() {
      const {
        isNotBOorPG,
        // otherPOorBGMarginName,
        // otherPOorBGMarginAccount,
      } = this.model;
      if (isNotBOorPG) {
        return true;
      }
      // if (otherPOorBGMarginName && otherPOorBGMarginAccount) {
      //   return true;
      // }
      return this.otherMargin.every((item) => Object.values(item).every((val) => val.trim()))

    },
    // 第五个复选框校验
    consortWithOtherStatusCheck() {
      const {
        isNotConsortWithOtherMargin,
        // withOtherMarginName,
        // withOtherMarginAccount,
      } = this.model;
      if (isNotConsortWithOtherMargin) {
        return true;
      }
      // if (withOtherMarginName && withOtherMarginAccount) {
      //   return true;
      // }
      return this.withOtherMargin.every((item) => Object.values(item).every((val) => val.trim()))

    },
    // 第六个复选框校验
    greenCardStatusCheck() {
      const { isNotUsGreenCardHolder } = this.model;
      if (isNotUsGreenCardHolder) {
        return true;
      }
      return false;
    },
    // 提交按钮是否可点击
    isDisableNext() {
      // const check1 = this.accountOwnerStatusCheck;
      // const check2 = this.statusCheck2;
      const check2 = this.BOorPGStatusCheck;
      const check3 = this.ourStaffKInStatusCheck;
      const check4 = this.HKexParternerStaffStatusCheck;
      const check5 = this.consortWithMarginStatusCheck;
      const check6 = this.consortWithOtherStatusCheck;
      const check7 = this.greenCardStatusCheck;
      if (check2 && check3 && check4 && check5 && check6 && check7) {
        return false;
      }
      return true;
    },
    keyList() {
      let arr = [];
      const objList = Object.values(this.disclosureDefine);
      const list = objList.map((item) => {
        const keys = Object.keys(item);
        keys.map((ele) => {
          const temp = ele.replace(/\d+/, '')
          if (temp === 'disclosureKey') {
            item[ele] && arr.push(item[ele])
          }
        })
      })
      return arr
    },
  },
  methods: {
    getI18n(key, type = "") {
      return this.getStepI18nValue("infoDisclosure", key);
    },
    updateInfo() {
      const userInfo = this.openInfo;
      // 表单信息
      Object.keys(this.model).forEach((val) => {
        if (emtpy.includes(userInfo[val])) {
          this.model[val] = this.model[val];
        } else {
          this.model[val] = userInfo[val];
        }
      });
      //额外表单信息
      const userInfoList = Object.keys(userInfo);
      this.keyList.map((key) => {
        userInfoList.map((str) => {
          if (str.includes(key)) {
            if (str.substring(key.length)) {
              this.addedItemObj[str] = userInfo[str];
            }
          }
        })
      })

      // 额外数据填充
      this.updateForm();
    },
    // 提交方法
    handleNext() {
      // 保存数据&下一步
      // const obj = { ...this.model, ...this.taxModel };
      // 清除填了又关闭选项的数据
      this.cleanDataBeforeSubmit();
      // 增加的条目
      this.handleAddedItem();
      // 校验增加的值
      const result = Object.values(this.addedItemObj).every((item) => {
        return this.checkInfo(item.replace(/\s+/g, ''), this.checkFunc, this.getI18n('warn.info'))
      })
      if (!result) {
        return
      }

      const obj = { ...this.model, ...this.addedItemObj};
      const params = {
        step: this.step,
        info: obj,
      };
      console.log(params);
      this.saveCacheInfo(params).then(() => {
        this.$router.push({ name: this.nextStep });
      });
    },
    handlerCheckAlert(val, key) {
      if (this.disclosureDefine[key].isCanFalse || val) return;
      const content = this.getI18n(`other.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = typeof val === "boolean" ? true : 1;
        },
      });
    },
    handlerCheckAlertForUs(newVal, oldVal, key) {
      if (newVal !== 1) return;
      const content = this.getI18n(`other.${key}Alert`);
      alert({
        title: this.$t("common.alertTitle"),
        content,
        callback: () => {
          this.model[key] = typeof val === "boolean" ? true : oldVal;
        },
      });
    },
    //校验增加条目
    checkFunc(str) {
      const regExp = /^[\u4e00-\u9fa5A-Za-z0-9.·\(\)]+$/;
      return regExp.test(str)
    },
    //增加操作
    addList(list, obj, key) {
      const maxLength = this.disclosureDefine[key].disclosureSize;
      if (list.length < (maxLength)) {
        const addObj = {...obj}
        list.push(addObj)
      } else {
        this.commonToast(`${this.getI18n('warn.maxLengthCommon')}${maxLength}${this.getI18n('warn.lengthUnit')}`)
      }
    },
    // 删除操作
    deleteList(list) {
      if (list.length > 1) {
        list.pop()
      } else {
        this.commonToast(`${this.getI18n('warn.minLengthCommon')}1${this.getI18n('warn.lengthUnit')}`)
      }
    },
    cleanDataBeforeSubmit() {
      const cleanList = [
        {
          ele: this.model.isNotOurStaffKin,
          arr: this.staff,
        },
        {
          ele: this.model.isNotHkexParterStaff,
          arr: this.hkexParter,
        },
        {
          ele: this.model.isNotConsortWithMargin,
          arr: this.margin,
        },
        {
          ele: this.model.isNotBOorPG,
          arr: this.otherMargin,
        },
        {
          ele: this.model.isNotConsortWithOtherMargin,
          arr: this.withOtherMargin,
        },
      ];
      // 清理已经填写的数据
      cleanList.forEach((item) => {this.cleanData(item.ele, item.arr)});
    },
    // 清理数据
    cleanData(key, arr) {
      if (key) {
        while (arr.length) {
          arr.pop();
        }
      }
      //  else {
      //   // 如果两项有一项未填，则去除这列
      //   arr.forEach((item, index) => {
      //     const empty = Object.values(item).some((val) => !val.trim())
      //     if (empty) {
      //       arr.splice(index, 1)
      //     }
      //   })
      // }
    },

    // 将数组转换成对应的key
    handleAddedItem() {
      this.addedItemObj = {};
      this.staff.length && this.staff.map((item, index) => {Object.keys(item).map((key) => {this.addedItemObj[`${key}${index+1}`] = item[key]})})
      this.hkexParter.length && this.hkexParter.map((item, index) => {Object.keys(item).map((key) => {this.addedItemObj[`${key}${index+1}`] = item[key]})})
      this.margin.length && this.margin.map((item, index) => {Object.keys(item).map((key) => {this.addedItemObj[`${key}${index+1}`] = item[key]})})
      this.otherMargin.length && this.otherMargin.map((item, index) => {Object.keys(item).map((key) => {this.addedItemObj[`${key}${index+1}`] = item[key]})})
      this.withOtherMargin.length && this.withOtherMargin.map((item, index) => {Object.keys(item).map((key) => {this.addedItemObj[`${key}${index+1}`] = item[key]})})
    },
    updateForm() {
      const list = Object.keys(this.addedItemObj);
      list.length && list.map((key) => {
        switch (true) {
          case key.includes('ourStaffKinName'):
            const numStaff = key.substring('ourStaffKinName'.length)
            this.staff.push({
              ourStaffKinName: this.addedItemObj[key],
              ourStaffKinRelation: this.addedItemObj[`ourStaffKinRelation${numStaff}`]
            })
            break
          case key.includes('hkexParterName'):
            const numParter = key.substring('hkexParterName'.length)
            this.hkexParter.push({
              hkexParterName: this.addedItemObj[key],
              hkexParterCENo: this.addedItemObj[`hkexParterCENo${numParter}`]
            })
            break
          case key.includes('withMarginName'):
            const numMargin = key.substring('withMarginName'.length)
            this.margin.push({
              withMarginName: this.addedItemObj[key],
              withMarginAccount: this.addedItemObj[`withMarginAccount${numMargin}`]
            })
            break
          case key.includes('otherPOorBGMarginName'):
            const numOtherMargin = key.substring('otherPOorBGMarginName'.length)
            this.otherMargin.push({
              otherPOorBGMarginName: this.addedItemObj[key],
              otherPOorBGMarginAccount: this.addedItemObj[`otherPOorBGMarginAccount${numOtherMargin}`]
            })
            break
          case key.includes('withOtherMarginName'):
            const numWithOtherMargin = key.substring('withOtherMarginName'.length)
            const obj = {
              withOtherMarginName: this.addedItemObj[key],
              withOtherMarginAccount: this.addedItemObj[`withOtherMarginAccount${numWithOtherMargin}`]
            }
            this.withOtherMargin.push(obj)
            break
        }
      })
    }
    // 重置额外添加的字段
    // handleBeforeAdd() {
    //   // const keyList = ['ourStaffKinName', 'ourStaffKinRelation', 'hkexParterName', 'hkexParterCENo', 'withMarginName', 'withMarginAccount',
    //   //   'otherPOorBGMarginName', 'otherPOorBGMarginAccount', 'withOtherMarginName', 'withOtherMarginAccount'
    //   // ]
    //   const keyList = this.keyList
    //   Object.keys(this.model).map((key) => {
    //     const ele = keyList.find(item => key.includes(item))
    //     if (typeof ele !== 'undefined') {
    //       const temp = key.substring(ele.length)
    //       temp && delete(this.model[key]);
    //     }
    //   })
    // }
  },
  created() {
    this.updateInfo();
  },
  watch: {
    // "model.isAccountOwner"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isAccountOwner");
    // },
    // "model.isAccountManager"(newVal, oldVal) {
    //   this.handlerCheckAlert(newVal, "isAccountManager");
    // },
    "model.isNotOurStaffKin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotOurStaffKin");
      if (!newVal && !this.staff.length) {
        this.addList(this.staff, this.staffObj, 'isNotOurStaffKin')
      }
    },
    "model.isNotHkexParterStaff"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotHkexParterStaff");
      if (!newVal && !this.hkexParter.length) {
        this.addList(this.hkexParter, this.hkexParterObj, 'isNotHkexParterStaff')
      }
    },
    "model.isNotConsortWithMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithMargin");
      if (!newVal && !this.margin.length) {
        this.addList(this.margin, this.marginObj, 'isNotConsortWithMargin')
      }
    },
    "model.isNotBOorPG"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotBOorPG");
      if (!newVal && !this.otherMargin.length) {
        this.addList(this.otherMargin, this.otherMarginObj, 'isNotBOorPG')
      }
    },
    "model.isNotConsortWithOtherMargin"(newVal, oldVal) {
      this.handlerCheckAlert(newVal, "isNotConsortWithOtherMargin");
      if (!newVal && !this.withOtherMargin.length) {
        this.addList(this.withOtherMargin, this.withOtherMarginObj, 'isNotConsortWithOtherMargin')
      }
    },
    "model.isNotUsGreenCardHolder"(newVal, oldVal) {
      this.handlerCheckAlertForUs(newVal, oldVal, "isNotUsGreenCardHolder");
    },
  },
};
</script>
