<template>
  <div class="base-form-list">
    <div class="form-item" v-for="(item, key) in formList" :key="key">
      <template v-if="!item.disable">
        <base-input-phone v-if="item.type === 'phone'" v-model.trim="formData[key]" :placeholder="item.placeholder"
          :handleSetCountry="item.handleSetCountry" />
        <base-input-code v-else-if="item.type === 'code'" v-model.trim="formData[key]" :placeholder="item.placeholder"
          :handleSendCode="item.handleSendCode" :handleCheckTrue="item.handleCheckTrue" :isCanSend="item.isCanSend" :timesOut="item.timesOut" />
        <base-input-captcha v-else-if="item.type === 'captcha'" v-model.trim="formData[key]" :placeholder="item.placeholder"
          :captchaSrc="item.captchaSrc" :handleCaptchaSrc="item.handleCaptchaSrc" />
        <base-input-password v-else-if="item.type === 'password'" v-model.trim="formData[key]" :placeholder="item.placeholder" />
        <div class="base-input" v-else>
          <input v-model.trim="formData[key]" :type="item.type" :placeholder="item.placeholder">
        </div>
        <div class="item-tips error-msg">{{formRules[key].tips}}</div>
      </template>
    </div>
  </div>
</template>

<script>
  import BaseInputPhone from './input/phone';
  import BaseInputCode from './input/code';
  import BaseInputCaptcha from './input/captcha';
  import BaseInputPassword from './input/password';

  export default {
    props: {
      formList: {
        type: Object,
        default: () => ({})
      },
      formRules: {
        type: Object,
        default: () => ({})
      }
    },
    components: {
      BaseInputPhone,
      BaseInputCode,
      BaseInputCaptcha,
      BaseInputPassword,
    },
    data() {
      return {
        formData: {},
        test: '',
      };
    },
    created() {},
    watch: {
      'formData': {
        handler(newValue) {
          this.$emit('updateData', newValue);
        },
        deep: true
      },
    },
    computed: {
     
    },
    methods: {
    
    }
  };
</script>
