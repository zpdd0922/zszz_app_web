<template>
  <div class="help-center-home">
    <header class="search">
      <help-search :onClick="toSearch" :placeholder="$t('helpCenter.search.placeholder')" />
    </header>
    <section v-if="isFetched">
      <ul class="classify-box">
        <li
          v-for="classify in classifyList"
          :key="classify.id"
          class="classify-item"
          @click="gotoList(classify.id)"
        >
          <img :src="classify.picon" alt />
          <span>{{classify.name}}</span>
        </li>
      </ul>
      <div class="frequently-box">
        <h5 class="frequently-title">{{$t('helpCenter.faqs')}}</h5>
        <ul class="frequently-list">
          <li
            class="frequently-item"
            v-for="frequently in frequentlyList"
            :key="frequently.id"
            @click.stop="gotoDetail(frequently.id)"
          >{{frequently.title}}</li>
        </ul>
      </div>
    </section>
    <template v-else>
      <section>
        <base-waiting />
      </section>
    </template>
    <footer>
      <base-copyright :content="$t('customize.company.copyright')" />
    </footer>
  </div>
</template>

<script>
import setTitle from "../../utils/set-title";
import BaseCopyright from "@/main/components/base-copyright/";
export default {
  name: "home",
  components: { BaseCopyright },
  props: {},
  data() {
    return {
      isFetched: false,
      classifyList: [],
      frequentlyList: [],
    };
  },
  created() {
    setTitle(this.$t('helpCenter.title'));
    this.getIndexList();
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    getIndexList() {
      const key = "ApiHelpCenter.getIndexList";
      const d = this.Storage.get(key);
      if (d) {
        this.isFetched = true;
        this.setIndexList(d);
      }
      this.ApiHelpCenter.getList().then((result) => {
        this.isFetched = true;
        this.formatCacheData(key, result);
        this.setIndexList(result);
      });
    },
    formatCacheData(key, result) {
      const data = result.data.map((item) => ({
        id: item.id,
        name: item.name,
        picon: item.picon,
      }));
      const commonData = result.commonData.map((item) => ({
        id: item.id,
        title: item.title,
      }));

      this.Storage.set(key, {
        data,
        commonData,
      });
    },
    setIndexList(result) {
      const { data = [], commonData = [] } = result;
      this.classifyList = data;
      this.frequentlyList = commonData;
    },
    gotoList(id) {
      this.$router.push({
        path: "list",
        query: {
          id,
        },
      });
    },
    gotoDetail(id) {
      this.$router.push({
        path: "detail",
        query: {
          id,
        },
      });
    },
    toSearch() {
      this.$router.push({
        path: "search",
      });
    },
  },
};
</script>
