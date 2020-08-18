<template>
  <div class="help-center-list">
    <ul v-if="isFetched">
      <li class="list-item" v-for="listItem in list" :key="listItem.id">
        <h3 :class="{active: listActive.includes(listItem.id)}" @click="toggleList(listItem.id)">
          <span>{{listItem.name}}</span>
          <i></i>
        </h3>
        <dl v-if="subList[listItem.id]" v-show="listActive.includes(listItem.id)">
          <dt
            class="item"
            v-for="item in subList[listItem.id] || []"
            :key="`${listItem.id}-${item.id}`"
            @click="gotoDetail(item.id)"
          >{{item.title}}</dt>
        </dl>
      </li>
    </ul>
    <div v-else>
      <base-waiting/>
    </div>
  </div>
</template>

<script>
import setTitle from '../../utils/set-title';
export default {
  name: 'list',
  data() {
    return {
      isFetched: false,
      list: [],
      listActive: [],
      subList: {}
    };
  },
  created() {
    setTitle('帮助中心');
    this.getClassifyList();
  },
  computed: {},
  methods: {
    getClassifyList() {
      const { id } = this.$route.query;
      this.ApiHelpCenter.getList(id)
        .then(res => {
          this.isFetched = true;
          this.list = res;
          this.getSubList();
        })
        .catch(e => {
          this.isFetched = true;
          console.error(e);
        });
    },
    getSubList() {
      this.list.forEach(item => {
        const { id } = item;
        this.ApiHelpCenter.getSubList(id)
          .then(res => {
            this.isFetched = true;
            this.subList[id] = res;
          })
          .catch(e => {
            this.isFetched = true;
            console.error(e);
          });
      });
    },
    toggleList(id) {
      if (this.listActive.includes(id)) {
        this.listActive = this.listActive.filter(i => i !== id);
      } else {
        this.listActive.push(id);
      }
    },
    gotoDetail(id) {
      this.$router.push({ path: 'detail', query: { id } });
    }
  }
};
</script>
