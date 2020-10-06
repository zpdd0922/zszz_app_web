<template>
  <div>
    <template v-if="isFetching">
      <loading />
    </template>
    <template v-else>
      <ul class="list-wrap">
        <li
          class="list-item"
          v-for="(item, index) in addLimitHistoryList"
          :key="index"
        >
          <div class="top">
            <span>{{ item.createTime | timeFormatter }}</span>
            <span :class="statusClass(item.status)">{{ statusFormatter(item.status) }}</span>
          </div>
          <div class="detail">
            <div class="mkt">
              <span class="title">{{ getI18n("mktTitle") }}</span>
              <span>{{ getI18n("mktHK") }}</span>
            </div>
            <div class="originLimit">
              <span class="title">{{ getI18n("originLimitTitle") }}</span>
              <span>{{ item.lineCredit }}</span>
            </div>
            <div class="curLimit">
              <span class="title">{{ getI18n("curLimitTitle") }}</span>
              <span>{{ item.lineCredit }}</span>
            </div>
          </div>
        </li>
      </ul>
      <div class="noMore">{{getI18n('noMore')}}</div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { format2datetime } from "@/main/utils/format/date.js";

export default {
  data() {
    return {
      // statusClass: {
      //   unProcessed:
      // }
    };
  },
  created() {
    // this.$store.dispatch('fetchingAddLimitHistory').then(()=>{
    //   this.isFetching = false;
    // })
    this.setTitle(this.$t("iAccount.addLimit.history.pageName"));
  },
  computed: {
    ...mapGetters(["isFetching", "addLimitHistoryList"]),
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.addLimit.history.${key}`);
    },
    statusClass(status) {
      switch (status) {
        case 0:
          return 'unProcessed';
        case 1:
          return "processing";
        case 2:
          return "success";
        case 3:
          return "backed";
      }
    },
    statusFormatter(status) {
      switch (status) {
        case 0:
          return this.getI18n("status.unProcessed");
        case 1:
          return this.getI18n("status.processing");
        case 2:
          return this.getI18n("status.success");
        case 3:
          return this.getI18n("status.backed");
      }
    },
  },
  filters: {
    timeFormatter(time) {
      return time && format2datetime(time, 1);
    },
  },
};
</script>

<style lang="scss" scoped>
@import "./style.scss";
</style>
