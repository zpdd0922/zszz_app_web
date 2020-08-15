<template>
  <div class="help-center-search">
    <header>
      <div class="search">
        <help-search
          :onSearch="doSearch"
          :autoFoucs="true"
          placeholder="请输入问题关键字"
          :onCancel="doCancel"
        />
      </div>
      <p class="info">
        搜索到
        <span class="color-highlight">{{list.length}}</span> 
        条 "<span class="color-highlight">{{searchTxt}}</span>" 相关内容
      </p>
    </header>
    <section>
      <ul class="list">
        <li
          class="item"
          v-for="item in list"
          :key="item.id"
          @click.stop="gotoDetail(item.id)"
        >{{item.title}}</li>
      </ul>
      <p v-show="list.length === 0" class="empty">无匹配的数据</p>
    </section>
  </div>
</template>

<script>
import setTitle from '../../utils/set-title';
export default {
  name: 'list',
  data() {
    return {
      isFocus: false,
      searchTxt: '',
      isFetched: false,
      list: [],
      listActive: [],
      subList: {}
    };
  },
  created() {
    setTitle('帮助中心');
  },
  computed: {},
  methods: {
    doSearch(searchTxt) {
      this.searchTxt = searchTxt;
      this.ApiHelpCenter.getSearchList(searchTxt)
        .then(res => {
          this.isFetched = true;
          this.list = res;
        })
        .catch(e => {
          this.isFetched = true;
          console.error(e);
        });
    },
    doCancel() {
      this.$router.back();
    },
    gotoDetail(id) {
      this.$router.push({ path: 'detail', query: { id } });
    }
  }
};
</script>
