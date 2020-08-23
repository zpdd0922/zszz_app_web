<template>
  <div class="wrapper">
    <div :key="index" v-for="(val, index) in privacy" class="custom-form-group privacy-block-group">
      <div class="cube-form-item privacy-block-item border-bottom-1px">
        <em :class="['triangle-icon', `triangle-icon-${index + 2}`]" />
        <label class="cube-form-label">司法管辖区</label>
        <div class="cube-form-field">
          <input
            class="cube-input-field"
            type="text"
            maxlength="50"
            placeholder="请输入司法管辖区"
            :value="val.countryKey"
            @input="countryDesc($event, index)"
          />
          <!-- <cube-select
            placeholder="请输入司法管辖区"
            :value="val.countryKey"
            @change="countryDesc($event, index)"
            :options="areaList"
          ></cube-select>-->
        </div>
      </div>
      <div class="cube-form-item privacy-block-item border-bottom-1px">
        <label class="cube-form-label">税务编号</label>
        <div class="cube-form-field">
          <cube-radio-group
            position="left"
            :hollow-style="true"
            :investmentHorizontal="true"
            @input="changeOfferNum($event, index)"
            :value="val.offerPrivacyKey"
            :options="[{
              label: '能提供编号',
              value: 'can'
            },
            {
              label: '不能提供编号',
              value: 'cannot'
            }]"
          />
        </div>
      </div>
      <div class="cube-form-item privacy-block-item" v-if="val.offerPrivacyKey === 'can'">
        <div class="cube-form-field">
          <input
            class="cube-input-field"
            maxlength="18"
            type="text"
            :value="val.canPrivacyNumKey"
            @input="changeCanNum($event, index)"
            placeholder="请输入税务编号"
          />
        </div>
      </div>
      <div class="cube-form-item privacy-block-item" v-if="val.offerPrivacyKey === 'cannot'">
        <div class="cube-form-field">
          <cube-radio-group
            position="left"
            @input="changeNoOfferNum($event, index)"
            :value="val.noOfferPrivacyKey"
          >
            <cube-radio
              :hollow-style="true"
              :option="{
                label: '理由A：帐户持有人的居留司法管辖区并没有向其居民发出税务编号。',
                value: 'A'
              }"
              :value="val.noOfferPrivacyKey"
            />
            <cube-radio
              :hollow-style="true"
              :option="{
                label: '理由 B：帐户持有人不能取得税务编号。如选取这一理由，解释帐户持有人不能取得税务编号的原因。',
                value: 'B'
              }"
              :value="val.noOfferPrivacyKey"
            />
            <div class="big-text-area-wrap border-bottom-1px" v-if="val.noOfferPrivacyKey === 'B'">
              <textarea
                class="big-text-area"
                maxlength="200"
                placeholder="请输入理由，200字以内"
                :value="val.reasonDescKey"
                @input="changeReasonDesc($event, index)"
              />
            </div>
            <cube-radio
              :hollow-style="true"
              :option="{
                label: '理由 C : 帐户持有人毋须提供税务编号。居留司法管辖区的主管机关不需要帐户持有人披露税务编号。',
                value: 'C'
              }"
              :value="val.noOfferPrivacyKey"
            />
          </cube-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    privacy: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      reasonIndex: null
    };
  },
  watch: {},
  computed: {},
  methods: {
    // 国籍填写
    countryDesc(e, index) {
      this.$emit('countryDesc', e, index);
    },

    // 选择是否可以提供税务编号
    changeOfferNum(type, index) {
      console.log(type, index);
      this.$emit('changeOfferNum', type, index);
    },

    // 输入税号
    changeCanNum(e, index) {
      this.$emit('changeCanNum', e, index);
    },

    // 不能提供税号的理由
    changeNoOfferNum(type, index) {
      this.$emit('changeNoOfferNum', index, type);
    },

    // 理由填写
    changeReasonDesc(e, index) {
      console.log(e);
      this.$emit('changeReasonDesc', e, index);
    }
  }
};
</script>

