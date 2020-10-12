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
      <div class="warn" v-if="showWarnText" :class="{suc: pwdSuccess}">
        <span>{{ warnText }}</span>
      </div>
      <div class="trade-pwd">
        <cube-form :model="model">
          <cube-input
            type="password"
            :clearable="clearable"
            :eye="eye"
            :placeholder="getI18n('tradePwd')"
            v-model.trim="model.pwd"
            class="pwd"
          >
          </cube-input>
          <cube-input
            type="password"
            :clearable="clearable"
            :eye="eye"
            :placeholder="getI18n('tradePwdConfirm')"
            v-model.trim="model.password"
            class="pwd"
            v-if="pwdStatus"
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
import validate from '@/main/utils/format/validate';

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
      pwdStatus: false,
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
    //文字状态显示
    warnText() {
      const [p1, p2] = [this.model.pwd, this.model.password];
      // 密码1不存在
      // 密码2存在，显示非法 密码2不存在则不显示
      if (!p1) {
        if (p2) {
          return this.showWarnText('illegal')
        } else {
          return this.showWarnText('');
        }
      } else {
        // 密码1存在
        // 密码1校验不成功始终显示非法
        if (!this.pwd1Checked) {
          return this.showWarnText('illegal')
        } else {
          //密码1校验成功
          // 是否一样
          if (this.isPwdSame) {
            return this.showWarnText('pwdSuccess')
          } else {
            // 不一样判断p2是否为空
            if (p2) {
              return this.showWarnText('notSame')
            } else {
              return this.showWarnText('')
            }
          }
        }
      }
    },
    //判断两次密码是否一样
    isPwdSame() {
      return this.model.pwd === this.model.password;
    },
    //判断密码1是否正确
    pwd1Checked() {
      const pwd = this.model.pwd
      return pwd && validate.isTradePwd(pwd)
    },
    //判断密码2是否正确
    pwd2Checked() {
      const pwd = this.model.password
      return pwd && validate.isTradePwd(pwd)
    },
  },
  methods: {
    checkPwd() {
      const [p1, p2] = [this.model.pwd, this.model.password];
      if (!this.pwd1Status) {
        if (p1.length === 8 && /^[A-Za-z0-9]{8}$/.test(p1)) {
          console.log(1);
          this.pwd1Status = true;
          this.pwdSuccess = false;
          this.warnText = '';
        } else {
                    console.log(2);

          this.warnText = this.getI18n('illegal');
          this.pwd1Status =false;
          this.pwdSuccess = false;
        }
      } else {
        if (p2 === p1) {
                    console.log(3);

          this.pwdSuccess =true;
          this.warnText = this.getI18n('pwdSuccess');
        } else {
                    console.log(4);

          this.warnText = this.getI18n('notSame');
          this.pwd1Status = false;
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
        console.log(key, value)
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
    //提示信息文字状态
    showWarnText(val) {
      switch (val) {
        case 'illegal': 
          return this.getI18n('illegal')
        case 'notSame': 
          return this.getI18n('notSame')
        case 'pwdSuccess': 
          return this.getI18n('pwdSuccess')
        default :
          return ''
      }
    },
  },
  created() {
    this.updateInfo();
  },
  watch: {
    "model.pwd"(newVal, oldVal) {
      if (this.pwd1Checked) {
        //首次校验通过显示第二个输入框
        this.pwdStatus = true
        this.pwdSuccess = this.isPwdSame ? true : false
      } else {
        this.pwdSuccess = false
      }
    },
    "model.password"(newVal, oldVal) {
      if (this.pwd2Checked) {
        this.pwdSuccess = this.isPwdSame ? true : false
      } else {
        this.pwdSuccess = false
      }
    },
  }
};
</script>
