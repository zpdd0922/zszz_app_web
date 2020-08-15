<template>
  <section class="op-page-wrap op-page-wrap-ow">
    <header class="op-page-title">{{$t('iOpen.authWay.pageName')}}</header>
    <ul class="ow-ways">
      <li v-for="item in ways" :key="item.type" class="ow-way-item" @click="handleNext(item)">
        <em :class="`ow-icon ow-icon-${item.type}`" />
        <span>{{item.label}}</span>
      </li>
    </ul>
  </section>
</template>

<script type="text/ecmascript-6">
import { userMakePhone, getMobileInfo } from "@/main/utils/native-app/";
import { alert } from "@/main/utils/common/tips";
import validate from "@/main/utils/format/validate";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      offlineOptions: window.OFFLINE_CONTACT,
      selectWay: "",
    };
  },
  created() {
    // TODO: 新增ip判斷，進行邏輯處理？
    // this.queryAddressIP();
  },
  computed: {
    ...mapGetters(["openInfo", "openProgress"]),
    // 判断当前路由环境
    origin() {
      return this.UaInfo.isApp() ? "app" : "h5";
    },
    isCanOpenCn() {
      // const phone = this.openProgress.phone;
      // return validate.isCnMobile(phone);
      return true;
    },
    ways() {
      if (this.isCanOpenCn) {
        return [
          {
            type: "cn",
            code: 1,
            label: this.$t("iOpen.authWay.wayCN"),
            nextRoute: "opaOnlineCn",
          },
          {
            type: "hk",
            code: 2,
            label: this.$t("iOpen.authWay.wayHK"),
            nextRoute: "opaOnlineHk",
          },
          // {
          //   type: "other",
          //   code: 3,
          //   label: this.$t("iOpen.authWay.wayOther"),
          //   nextRoute: "",
          // },
        ];
      }
      return [
        {
          type: "hk",
          code: 2,
          label: this.$t("iOpen.authWay.wayHK"),
          nextRoute: "opaOnlineHk",
        },
        {
          type: "other",
          code: 3,
          label: this.$t("iOpen.authWay.wayOther"),
          nextRoute: "",
        },
      ];
    },
  },
  methods: {
    // 打电话
    handleCallPhone(phone) {
      userMakePhone({ phone });
    },
    // 查询用户IP
    // queryAddressIP() {
    //   this.$store.dispatch('isMediaShow').then(res => {
    //     const { is_show } = res;
    //     if (is_show === 1) {
    //       // this.ways = [{ txt: '我有', route: 'online-hk', type: 'hk' }]
    //       this.ways = [
    //         // 有香港银行卡
    //         { txt: '我有', route: 'online-hk', type: 'hk' }
    //       ];
    //     }
    //   });
    // },
    // 下一页
    handleNext(item) {
      if (item.nextRoute !== "") {
        // 进入下一流程
        this.$router.push({
          name: item.nextRoute,
          params: { origin: this.origin },
        });
      } else {
        alert({
          title: "温馨提示",
          content: "攻城狮正在加速开发中~敬请期待！",
        });
      }
    },
  },
};
</script>

