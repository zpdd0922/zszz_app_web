<!--
 * @Author: Jim
 * @Date: 2019-12-18 14:18:36
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-06 15:35:39
 * @Description: 
 -->
<template>
  <article class="help-center-detail">
    <header>
      <h3>{{title}}</h3>
      <span>{{time}}</span>
    </header>
    <section v-if="isFetched">
      <div v-html="content"/>
    </section>
    <section v-else>
      <com-waiting/>
    </section>
  </article>
</template>

<script>
import { dateFormat } from '@/main/utils/format/date.js';
import { getURLParameters } from '@/main/utils/format/url.js';
import setTitle from '../../utils/set-title';
export default {
  name: 'detail',
  data() {
    return {
      title: '',
      time: '',
      content: '',
      isFetched: false
    };
  },
  created() {
    this.getArticleDetail();
  },
  computed: {},
  methods: {
    getArticleDetail() {
      const { id } = this.$route.query;

      this.ApiHelpCenter.getDetail(id)
        .then(res => {
          this.isFetched = true;
          if (res && res.id) {
            const { content, title, updateTime } = res;
            this.title = title;
            setTitle(title);
            this.time = dateFormat(updateTime, 'yyyy-MM-dd HH:mm:ss');
            this.content = content;
          } else {
            this.title = `Error ID: ${id}`;
            this.time = dateFormat(+new Date(), 'yyyy-MM-dd HH:mm:ss');
            this.content = `Error code: ${res.code} <br /> Error Msg: ${
              res.msg
            }`;
          }
        })
        .catch(e => {
          this.isFetched = true;
          this.title = `Error ID: ${this.$route.query.id}`;
          this.time = dateFormat(+new Date(), 'yyyy-MM-dd HH:mm:ss');
          this.content = `Error type: ${e.type} <br /> Error Msg: ${e.message}`;
        });
    }
  }
};
</script>
