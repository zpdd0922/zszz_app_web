<template>
  <div class="base-input">
    <input ref="input" v-bind:value="value" :type="passwordType" v-bind="$attrs" v-on="inputListeners">
    <span class="input-icon" @click="handleTogglePassword">
      <i :class="iconEyeClass"></i>
    </span>
  </div>
</template>

<script>
  const defaultPassword = 'password';

  export default {
    inheritAttrs: false,
    props: ['value'],
    data() {
      return {
        passwordType: defaultPassword,
      };
    },
    created() {},
    computed: {
      inputListeners() {
        const vm = this;
        return Object.assign({},
          this.$listeners, {
            input: function () {
              vm.$emit('input', event.target.value);
            }
          }
        );
      },
      iconEyeClass() {
        const hide = this.passwordType === defaultPassword;
        return {
          'icon-eye': true,
          'icon-eye-close': hide,
          'icon-eye-open': !hide
        };
      }
    },
    methods: {
      // 2.切换登录密码是否明文
      handleTogglePassword() {
        if (this.passwordType === defaultPassword) {
          this.passwordType = 'text';
        } else {
          this.passwordType = defaultPassword;
        }
        this.$refs.input.focus();
      },
    }
  };
</script>
