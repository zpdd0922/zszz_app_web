<template>
  <div class="base-input">
    <input type="text" v-bind:value="value" v-bind="$attrs" v-on="inputListeners">
    <img class="input-captcha" :src="captchaSrc" @click="handleCaptchaSrc">
  </div>
</template>

<script>
  export default {
    inheritAttrs: false,
    props: {
      value: {},
      captchaSrc: {
        type: String,
        default: '',
      },
      handleCaptchaSrc: {
        type: Function,
        default: () => {}
      }
    },
    data() {
      return {};
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
    },
    methods: {}
  };
</script>
