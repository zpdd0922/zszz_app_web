<template>
  <div class="base-input">
    <span @click="handleShowCountryList" class="input-country">+{{currentCode}}</span>
    <input type="tel" v-bind:value="value" v-bind="$attrs" v-on="inputListeners">
    <country-list v-if="showCountryList" @selectItem="selectItem" />
  </div>
</template>

<script>
  import CountryList from '../../country-list/';

  export default {
    inheritAttrs: false,
    components: {
      CountryList
    },
    props: {
      value: {},
      handleSetCountry: {
        type: Function,
        default: () => {}
      },
    },
    data() {
      return {
        currentCode: '86',
        showCountryList: false,
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
    },
    methods: {
      handleShowCountryList() {
        this.showCountryList = true;
      },
      selectItem(item) {
        const {
          value
        } = item;
        this.currentCode = value;
        typeof this.handleSetCountry === 'function' && this.handleSetCountry(value);
        this.showCountryList = false;
      },
    }
  };
</script>
