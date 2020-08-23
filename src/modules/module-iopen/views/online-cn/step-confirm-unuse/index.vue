<template>
  <op-wrap :isDisabled="isDisabled" :btnText="'确认是本人签名'" @handleNext="handleNext">
    <div class="olcn-step olcn-step-confirm">
      <div class="step-content step-content-avatar">
        <div class="avatar-img-box">
          <template v-if="file[avatarFile]">
            <img class="step-confirm-img" :src="file[avatarFile]" />
          </template>
        </div>
        <p class="tips">我已阅读全部开户文件,了解相关风险并自愿在智珠证券开户。</p>
      </div>
      <!-- <div class="margin-bottom"></div> -->

      <div class="step-content step-content-signature">
        <div class="signature-img-box">
          <template v-if="file[signFile]">
            <img class="step-confirm-img" :src="file[signFile]" />
          </template>
        </div>
      </div>
    </div>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import { getURLParameters } from "@/main/utils/format/url";
import { mapGetters } from "vuex";
import UserAge from "@/main/utils/common/ua-info";
import { formatCommitData } from "@/modules/module-iopen/format/format-cn/index";
import { SUFFIX, AvatarHead, Signature } from "../../../api/params-define";
import { toast } from "@/main/utils/common/tips";

const updateImg = [AvatarHead, Signature];

const avatarFile = `${AvatarHead}${SUFFIX}`;
const signFile = `${Signature}${SUFFIX}`;

export default {
  metaInfo() {
    return {
      title: this.$route.meta.title
    };
  },
  data() {
    return {
      file: {},
      signFile,
      avatarFile
    };
  },
  computed: {
    ...mapGetters(["openInfo", "openImg", "openSt"]),
    isDisabled() {
      const result = Object.values(this.file).every(val => val.length);
      return !result;
    }
  },
  created() {
    this.updateInfo();
  },
  methods: {
    updateInfo() {
      const userImg = this.openImg;
      updateImg.forEach(key => {
        const tempKey = `${key}${SUFFIX}`;
        const tempVal = userImg[tempKey] || "";
        this.$set(this.file, tempKey, tempVal);
      });
    },
    handleNext() {
      // 活动中心过来的用户会带此活动id ，在大陆开户中最后一步提交会使用到
      const { actId = "" } = getURLParameters();
      const data = formatCommitData(this.openInfo);
      const paramsInfo = {
        info: data, // 表单信息
        // actId, // 活动ID
        openType: 1 // 1、线上预约开户，2、线下（开户宝）3、香港预约开户
      };

      // 扫描信息 -- 线上开户，且是APP环境内，需要传递后台
      const paramsSt = { infoSt: JSON.stringify(this.openSt) };
      const params = UserAge.isApp()
        ? Object.assign({}, paramsInfo, paramsSt)
        : paramsInfo;

      this.$store.dispatch("toCommitAllData", params).then(res => {
        toast({
          type: "correct",
          txt: "保存成功，请等待通知",
          time: 1000,
          callback: () => {
            this.$router.push({ name: "guide" });
          }
        });
      });
    }
  }
};
</script>


