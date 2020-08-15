<template>
  <div class="help-center-home">
    <header class="search">
      <help-search
        :onClick="toSearch"
        :disabled="true"
        placeholder="请输入问题关键字"
      />
    </header>
    <section v-if="isFetched">
      <ul class="classify-box">
        <li
          v-for="classify in classifyList"
          :key="classify.id"
          class="classify-item"
          @click="gotoList(classify.id)"
        >
          <img
            :src="classify.picon"
            alt
          >
          <span>{{classify.name}}</span>
        </li>
      </ul>
      <div class="frequently-box">
        <h5 class="frequently-title">常见问题</h5>
        <ul class="frequently-list">
          <li
            class="frequently-item"
            v-for="frequently in frequentlyList"
            :key="frequently.id"
            @click.stop="gotoDetail(frequently.id)"
          >{{frequently.title}}</li>
        </ul>
      </div>
      <footer>
        <p class="copyright">{{APP_DEFINE_GLOBAL.COPY_RIGHT}}</p>
      </footer>
    </section>
    <template v-else>
      <section>
        <com-waiting />
      </section>
      <footer>
        <p class="copyright">{{APP_DEFINE_GLOBAL.COPY_RIGHT}}</p>
      </footer>
    </template>
  </div>
</template>

<script>
  import setTitle from '../../utils/set-title';
  export default {
    name: 'home',
    components: {},
    props: {},
    data() {
      return {
        isFetched: false,
        classifyList: [],
        frequentlyList: []
      };
    },
    created() {
      setTitle('帮助中心');
      this.getIndexList();
    },
    watch: {},
    computed: {},
    mounted() {},
    methods: {
      getIndexList() {
        const key = 'ApiHelpCenter.getIndexList';
        const d = this.Storage.getJson(key);
        if (d) {
          this.isFetched = true;
          this.setIndexList(d);
        }
        this.ApiHelpCenter.getList().then(result => {
          this.isFetched = true;
          this.formatCacheData(key, result);
          this.setIndexList(result);
        });
      },
      formatCacheData(key, result) {
        const data = result.data.map(item => ({
          id: item.id,
          name: item.name,
          picon: item.picon
        }));
        const commonData = result.commonData.map(item => ({
          id: item.id,
          title: item.title
        }));

        this.Storage.setJson(key, {
          data,
          commonData
        });
      },
      setIndexList(result) {
        const {
          data = [], commonData = []
        } = result;
        this.classifyList = data;
        this.frequentlyList = commonData;
      },
      gotoList(id) {
        this.$router.push({
          path: 'list',
          query: {
            id
          }
        });
      },
      gotoDetail(id) {
        this.$router.push({
          path: 'detail',
          query: {
            id
          }
        });
      },
      toSearch() {
        this.$router.push({
          path: 'search'
        });
      }
    }
  };
</script>
