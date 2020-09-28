<template>
  <op-wrap
    :isDisabled="isDisabled"
    :btnText="getI18n('btn')"
    :handleBefore="handleBefore"
    @handleNext="handleNext"
  >
    <div class="olhk-step olhk-step-protocol-confirm">
      <div class="step-content step-content-sign-list">
        <h3 class="sign-title">{{getI18n('tips')}}</h3>
        <div ref="signBox" class="sign-box" @click.prevent="handleNext">
          <template v-if="upload[idFlag] && upload[fileName]">
            <img :src="upload[idFlag]" />
          </template>
          <template v-else>
            <div class="sign-img">
              <template v-if="upload[fileName]">
                <img ref="signImgDom" :src="upload[fileName]" />
              </template>
              <template v-else>
                <span class="sign-img-txt">{{getI18n('tipsSign')}}</span>
              </template>
            </div>
            <div class="sign-content">
              <ul>
                <li v-for="(item, ind) in formList" :key="ind">
                  <span>{{item.label}}： {{item.value}}</span>
                </li>
              </ul>
            </div>
          </template>
        </div>
      </div>
      <div>
        <h3 class="pwdTitle">{{ getI18n("setPwd") }}</h3>
        <div class="rule">{{ getI18n("pwdRule") }}</div>
      </div>
      <div class="trade-pwd">
        <div class="warn" v-if="showWarn" :class="{suc: pwdSuccess}">
          <span>{{ warnText }}</span>
        </div>
        <cube-form :model="model">
          <cube-input
            type="password"
            :clearable="clearable"
            :eye="eye"
            :placeholder="getI18n('tradePwd')"
            v-model="model.pwd"
            class="pwd"
            @blur="checkPwd"
            @focus="showWarn = true"
          >
          </cube-input>
          <cube-input
            type="password"
            :clearable="clearable"
            :eye="eye"
            :placeholder="getI18n('tradePwdConfirm')"
            v-model="model.password"
            class="pwd"
            @input="checkPwd"
            :readonly="!pwd1Status"
          ></cube-input>
        </cube-form>
      </div>

    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
import {
  SUFFIX,
  BASE64,
  Signature,
  SignatureInfo,
} from "../../../api/params-define";
import { saveImg } from "@/main/utils/native-app/";
import screenshot from "@/main/utils/dom/screenshot";
import storage from "@/main/utils/cache/localstorage";
import UserAge from "@/main/utils/common/ua-info";
import { getURLParameters } from "@/main/utils/format/url";

const fileName = `${Signature}${SUFFIX}`;
const idFlag = `${SignatureInfo}${SUFFIX}`;

export default {
  mixins: [onlineMixin],
  beforeRouteEnter(to, from, next) {
    // 判断是否来自签名页
    const isFromSign = from.fullPath.indexOf("signature") > -1;
    if (isFromSign) {
      next((vm) => vm.scrollBottom());
    } else {
      next();
    }
  },
  data() {
    return {
      clearable: {
        visible: true,
        blurHidden: true,
      },
      eye: {
        open: false,
        reverse: false
      },
      idFlag,
      fileName,
      file: {},
      upload: {},
      checked: false,
      formList: [
        {
          label: this.getI18n("content.nameCn"),
          value: "",
          key: "cnNameValue",
        },
        {
          label: this.getI18n("content.nameEn"),
          value: "",
          key: "enNameValue",
        },
        {
          label: this.getI18n("content.idCard"),
          value: "",
          key: "idCardValue",
        },
        { label: this.getI18n("content.phone"), value: "", key: "phoneNum" },
        { label: this.getI18n("content.email"), value: "", key: "email" },
      ],
      model: {
        pelCheck: false,
        pwd: '',
        password: '',
      },
      warnText: '',
      pwd1Status: false,
      showWarn: false,
      pwdSuccess: false,
    };
  },
  computed: {
    signatureStep() {
      return this.$route.meta.signatureStep;
    },
    // 是否签名
    isDisabled() {
      return Object.values(this.upload).length <= 0 || !this.pwdSuccess;
    },
  },
  methods: {
    checkPwd() {
      const [p1, p2] = [this.model.pwd, this.model.password];
      if (!this.pwd1Status) {
        if (p1.length === 8 && /^[A-Za-z0-9]{8}$/.test(p1)) {
          this.pwd1Status = true;
          this.pwdSuccess = false;
        } else {
          this.warnText = this.getI18n('illegal');
          this.pwd1Status =false;
          this.pwdSuccess = false;
        }
      } else {
        if (p2 === p1) {
          this.pwdSuccess =true;
          this.warnText = this.getI18n('pwdSuccess');
        } else {
          this.warnText = this.getI18n('notSame');
          this.pwd1Status = true;
          this.pwdSuccess = false;
        }
      }
    },
    getI18n(key) {
      return this.getStepI18nValue("protocolConfirm", key);
    },
    // 数据回填
    updateInfo() {
      const userInfo = this.openInfo;
      // 更新签名框下面用户信息列表
      this.formList.forEach((item) => {
        const { key, value } = item;
        // 名字中间加个空格
        // if (key == "cnNameValue") {
        //   item.value = userInfo[key]
        //     ? `${userInfo["familyName"]} ${userInfo["givenName"]}`
        //     : value;
        //   return;
        // }
        // if (key == "enNameValue") {
        //   item.value = userInfo[key]
        //     ? `${userInfo["givenNameSpell"]} ${userInfo["familyNameSpell"]}`
        //     : value;
        //   return;
        // }
        if (key == "phoneNum") {
          item.value = this.openProgress.phoneNumber;
        } else {
          item.value = userInfo[key] ? userInfo[key] : value;
        }
      });

      // 更新图片 - 优先本地，其次服务端
      // const signImgData = this.openImg[fileName];
      const signImgData = storage.get(fileName) || this.openImg[fileName]
      // 若存在签名图
      if (signImgData) {
        this.$set(this.upload, fileName, signImgData);
      }
    },
    handleBefore() {
      return new Promise((resolve, reject) => {
        // 保存数据&下一步
        const {pwd, ...obj} = this.model;
        const params = {
          step: this.step,
          info: obj,
        };
        this.saveCacheInfo(params).then(() => {
          resolve();
        });
      });
    },
    handleNext(e) {
      // 当前点击元素类名集合 - 用于判断进入路由
      const elClass = e.target.classList;
      if (!elClass.contains("cube-btn")) {
        // 签名页
        this.$router.replace({ name: this.signatureStep });
      } else {
        // 活动中心过来的用户会带此活动id ，在大陆开户中最后一步提交会使用到
        const {
          activeId = "0",
          channelId = "",
          inviteId = "0",
        } = getURLParameters();

        const normalData = {
          actId: activeId,
          sourceChannelId: channelId,
          inviterId: inviteId,
          lang: this.$t("customize.languageValue"),
        };

        const data = this.formatCommitData(
          { ...this.openInfo, phoneNumber: this.openProgress.phoneNumber },
          normalData
        );

        this.toCommitAllDataHK(data).then((res) => {
          toast({
            type: "correct",
            txt: this.getI18n("success"),
            time: 1000,
            callback: () => {
              this.$router.push({ name: "opaGuide" });
            },
          });
        });
      }
    },
  },
  created() {
    this.updateInfo();
  },
};
</script>
