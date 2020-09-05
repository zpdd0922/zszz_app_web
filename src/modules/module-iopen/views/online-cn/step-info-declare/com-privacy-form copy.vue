<template>
  <div class="wrapper">
    <div :key="index" v-for="(val, index) in privacy" class="custom-form-group privacy-block-group">
      <div class="cube-form-item privacy-block-item border-bottom-1px">
        <em :class="['triangle-icon', `triangle-icon-${index + 2}`]" />
        <label class="cube-form-label">{{$t('iOpen.openCn.infoDeclare.tax.countryKey.label')}}</label>
        <div class="cube-form-field">
          <input
            class="cube-input-field"
            type="text"
            maxlength="50"
            :placeholder="$t('iOpen.openCn.infoDeclare.tax.countryKey.placeholder')"
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
        <label class="cube-form-label">{{$t('iOpen.openCn.infoDeclare.tax.privacyNum.label')}}</label>
        <div class="cube-form-field">
          <cube-radio-group
            position="left"
            :horizontal="true"
            @input="changeOfferNum($event, index)"
            :value="val.offerPrivacyKey"
            :options="[{
              label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.canOffer'),
              value: 'can'
            },
            {
              label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.cannotOffer'),
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
            :placeholder="$t('iOpen.openCn.infoDeclare.tax.privacyNum.placeholder')"
          />
        </div>
      </div>
      <div class="cube-form-item privacy-block-item" v-if="val.offerPrivacyKey === 'cannot'">
        <div class="cube-form-field">
          <cube-radio-group
            position="left"
            @input="changeNoOfferNum($event, index)"
            :value="val.noOfferPrivacyKey"
            v-model="reasonIndex"
            :options="options"
          >
            <cube-radio

            >

            </cube-radio>
            <!-- <cube-radio
              :hollow-style="true"
              :option="{
                label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonA'),
                value: 'A'
              }"
              :value="val.noOfferPrivacyKey"
            />
            <cube-radio
              :hollow-style="true"
              :option="{
                label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonB'),
                value: 'B'
              }"
              :value="val.noOfferPrivacyKey"
            />
            <div class="big-text-area-wrap border-bottom-1px" v-if="val.noOfferPrivacyKey === 'B'">
              <textarea
                class="big-text-area"
                maxlength="200"
                :placeholder="$t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonBPlaceholder')"
                :value="val.reasonDescKey"
                @input="changeReasonDesc($event, index)"
              />
            </div>
            <cube-radio
              :hollow-style="true"
              :option="{
                label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonC'),
                value: 'C'
              }"
              :value="val.noOfferPrivacyKey"
            /> -->
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
      reasonIndex: null,
      options: [
        {
          label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonA'),
          value: 'A'
        },
        {
          label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonB'),
          value: 'B'
        },
        {
          label: $t('iOpen.openCn.infoDeclare.tax.privacyNum.reasonC'),
          value: 'C'
        }
      ]
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

