<template>
  <div class="help-center-search">
    <header>
      <div class="search">
        <help-search
          :onSearch="doSearch"
          :autoFoucs="true"
          :placeholder="$t('helpCenter.search.placeholder')"
          :onCancel="doCancel"
        />
      </div>
      <p class="info">
        {{$t('helpCenter.search.searched')}}
        <span class="color-highlight">{{list.length}}</span> 
        {{$t('helpCenter.search.unit')}} "<span class="color-highlight">{{searchTxt}}</span>" {{$t('helpCenter.search.relatedContent')}}
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
      <p v-show="list.length === 0" class="empty">{{$t('helpCenter.search.noData')}}</p>
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
    setTitle(this.$t('helpCenter.title'));
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
