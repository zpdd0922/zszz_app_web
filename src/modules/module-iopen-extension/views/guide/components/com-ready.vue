<template>
  <div class="op-guide-com op-guide-com-ready">
    <header class="head">
      <img src="~@/customize/assets/images/logo_full.svg" />
      <p>{{$t('iopenExt.guide.ready.ad')}}</p>
    </header>
    <section class="content">
      <!-- <head-title :title="$t('iopenExt.guide.ready.tips.title')"></head-title>
      <ul class="tips">
        <li>
          <em class="icon icon-id-card" />
          <span>{{$t('iopenExt.guide.ready.tips.content[0]')}}</span>
        </li>
        <li>
          <em class="icon icon-bank-card" />
          <span>{{$t('iopenExt.guide.ready.tips.content[1]')}}</span>
        </li>
        <li>
          <em class="icon icon-wifi" />
          <span>{{$t('iopenExt.guide.ready.tips.content[2]')}}</span>
        </li>
      </ul> -->
      <div class="desc">
        <div class="desc-title">{{$t('iopenExt.guide.ready.desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{$t('iopenExt.guide.ready.desc.content[0]')}}</li>
            <!-- <li>{{$t('iopenExt.guide.ready.desc.content[1]')}}</li> -->
          </ul>
        </div>
      </div>
    </section>
    <footer class="foot">
      <cube-button @click="onClick">{{$t('iopenExt.guide.ready.btn')}}</cube-button>
    </footer>
  </div>
</template>

<script >
import { toast } from "@/main/utils/common/tips/";
export default {
  props: {
    skin: {
      // 皮肤
      type: String,
      default: ""
    }
  },
  created() {},
  methods: {
    // 点击跳转'极速开户'
    onClick() {
      this.$emit("click");
    }
  }
};
</script>
<style lang="scss" scoped>
@import './style.scss';
</style>
