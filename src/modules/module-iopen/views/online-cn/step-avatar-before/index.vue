<!--
 * @Author: Jim
 * @Date: 2020-01-15 18:14:26
 * @LastEditors  : Jim
 * @LastEditTime : 2020-01-16 11:32:24
 * @Description: 
 -->
<template>
  <op-wrap :isDisabled="isDisabled" @handleNext="handleNext">
    <section class="olcn-step olcn-step-avatar-before">
      <div class="step-content step-content-avatar-upload">
        <div class="avatar-example-box">
          <i class="avatar-example avatar-example-left"></i>
          <i class="avatar-example avatar-example-center">
            <i class="avatar-example-center-head"></i>
          </i>
          <i class="avatar-example avatar-example-right"></i>
        </div>
        <div class="tips-true">
          <span>{{getI18n('desc.right')}}</span>
        </div>
      </div>
      <div class="margin-bottom"></div>
      <div class="step-content avatar-before-desc">
        <div class="desc-title">{{getI18n('desc.title')}}</div>
        <div class="desc-tips">
          <ul>
            <li>{{getI18n('desc.content[0]')}}</li>
            <li>{{getI18n('desc.content[1]')}}</li>
            <li>{{getI18n('desc.content[2]')}}</li>
            <li>{{getI18n('desc.content[3]')}}</li>
          </ul>
        </div>
        <!-- <div class="desc-list"> -->
        <!-- <ul>
             <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/avatar/avatar-exp-1.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[0]')}}</span>
            </li>
               <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/avatar/avatar-exp-2.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[1]')}}</span>
            </li>
               <li class="list-item">
              <img class="item-img" src="~@/modules/module-iopen/assets/images/avatar/avatar-exp-3.png" />
              <span class="item-txt icon-err">{{getI18n('desc.tips[2]')}}</span>
            </li>
        </ul>-->
        <!-- </div> -->
      </div>
    </section>
  </op-wrap>
</template>

<script type="text/ecmascript-6">
import onlineMixin from "../mixins/online.vue";
import { toast, alert, confirm } from "@/main/utils/common/tips";
export default {
  mixins: [onlineMixin],
  data() {
    return {};
  },
  computed: {
    isDisabled() {
      return false;
    },
  },
  created() {},
  methods: {
    getI18n(key) {
      return this.getStepI18nValue("avatarBefore", key);
    },
    handleNext() {
      // 下一步
      this.$router.push({ name: this.nextStep });
    },
  },
};
</script>


