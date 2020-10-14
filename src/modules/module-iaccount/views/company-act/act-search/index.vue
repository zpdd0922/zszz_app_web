<template>
  <div class="search">
    <div class="header border-bottom-1px border-top-1px">
      <div class="input-btn">
        <i class="cubeic-search icon"></i>
        <input
          class="code-input"
          ref="code"
          v-model="value"
          :placeholder="$t('iAccount.company_act.placeholder.text_1')"
          @input="debouncedGetStockList()"
        />
      </div>
      <!-- <div class="search-text">
        {{ $t("iAccount.company_act.common.search") }}
      </div> -->
    </div>
    <div class="list">
      <div>
        <ul>
          <li
            v-for="(item, index) in options"
            :key="index"
            class="item-list"
            @click="handleClick(item)"
          >
            <span>{{ item.id }}</span>
            <span class="name">{{ item.name }}</span>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
import { mapGetters } from 'vuex'
import SecuritiesApi from '@/modules/module-iaccount/api/modules/api-securities'
import { debounce } from "@/modules/module-iaccount/utils/common";


export default {
  data () {
    return {
      value: '',
      options: []
    }
  },
  computed: {
    ...mapGetters([
      'userInfo'
    ])
  },
  methods: {
    handleClick(val) {
      this.$store.dispatch('selectStock', val).then(() => {
        this.$router.push({ name: 'act-form' })
      })
    },
    debouncedGetStockList: debounce(function() {
      this.getStockList();
    }, 500),
    getStockList() {
      if (!this.value) {
        this.options = []
        return
      }
      const params = {
        condition: this.value,
        flag: 1,
        mkt: 'HK',
      }
      SecuritiesApi.findShares(params).then(res => {
        const { stks } = res
        this.options = stks.filter(val => val.id.toUpperCase().endsWith('.HK'))
      })

    }
  },
  watch: {
    // value(val) {
    //   if (!val) {
    //     this.options = []
    //     return
    //   }
    //   // const { uId, UserCode } = this.userInfo
    //   const params = {
    //     condition: this.value,
    //     flag: 1,
    //     mkt: 'HK',
    //     // sessionUserId: uId || UserCode
    //   }
    //   SecuritiesApi.findShares(params).then(res => {
    //     const { stks } = res
    //     this.options = stks.filter(val => val.id.toUpperCase().endsWith('.HK'))
    //   })
    // }
  },
  mounted() {
    this.$nextTick(() => {
      this.$refs.code.focus()
    })
  }
}
</script>

<style scoped lang="scss">
@import "~@/modules/module-iaccount/assets/styles/mixin.scss";

.search {
  .header {
    height: 0.6rem;
    display: flex;
    align-items: center;
    background-color: #fff;
    padding-left: 0.145rem;
    .input-btn {
      display: flex;
      align-items: center;
      height: 0.29rem;
      width: 3.45rem;
      background: rgba(238, 238, 238, 1);
      border-radius: 0.025rem;
      .icon {
        padding: 0 0.09rem;
      }
      .code-input {
        background-color: rgba(238, 238, 238, 1);
        height: 100%;
        width: 90%;
        outline: none;
        font-size: 0.11rem;
        font-family: PingFang SC;
        font-weight: 400;
      }
    }
    .search-text {
      padding: 0 0.1rem;
      white-space: nowrap;
    }
  }
  .list {
    position: absolute;
    top: 0.6rem;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #f5f5f5;
    .item-list {
      height: 0.5rem;
      line-height: 0.5rem;
      padding-left: 0.2rem;
      background-color: #fff;
    }
    .name {
      padding-left: 0.25rem;
    }
  }
}
</style>
