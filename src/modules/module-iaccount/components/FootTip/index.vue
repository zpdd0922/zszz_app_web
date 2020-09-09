<template>
  <div class="foot">
    <div class="foot-title">{{ title || $t('deposit.common.text_1') }}</div>
    <div class="foot-content">
      <ul>
        <li
          v-for="(item, index) in list"
          :key="index">
          <p>
            <slot :item="item">
              <span v-html="$t(item.txt)"></span>
            </slot>
          </p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String
    },
    list: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {}
  },
  computed: {},
  methods: {},
  created() {}
}

</script>

<style lang="scss">
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.foot {
  color: $color-999;
  margin-top: .18rem;
  padding-left: .15rem;
  padding-right: .2rem;
  font-size: .12rem;
  line-height: .22rem;
  text-align: justify;
}
</style>
