<!--
 * @Author: Jim
 * @Date: 2019-12-18 14:18:36
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-06 15:35:39
 * @Description: 
 -->
<template>
  <div class="info-page-detail">
    <article class="box">
      <header>
        <h3>{{title}}</h3>
        <span>{{time}}</span>
        <i>{{source}}</i>
      </header>
      <section v-if="isFetched">
        <div class="content" v-html="content" />
        <p class="risk-tips">
          {{$t("information.riskTips.title")}}
          {{$t("information.riskTips.content")}}
        </p>
      </section>
      <section v-else>
        <base-waiting />
      </section>
    </article>
  </div>
</template>

<script>
import { dateFormat } from "@/main/utils/format/date.js";
import { getURLParameters } from "@/main/utils/format/url.js";
import NewsApi from "@/modules/module-information/api/news/index";
import auth from "@/main/request/utils/auth";

export default {
  name: "information-detail",
  data() {
    return {
      title: "",
      time: "",
      source: "",
      content: "",
      readNum: 0, // 閲讀次數
      laudNum: 0, // 收藏
      favorNum: 0, // 点赞
      isFetched: false,
      newsId: getURLParameters().newsId || getURLParameters().newid || ""
    };
  },
  created() {
    this.getArticleDetail();
  },
  computed: {
    isLogin() {
      return auth.getAuthSession().length;
    }
  },
  methods: {
    formatNum(val) {
      if (!val) return 0;
      return Number(val) > 100000 ? "10万+" : val;
    },
    getArticleDetail() {
      NewsApi.fetchNewsDetail({ newsId: this.newsId })
        .then(res => {
          this.isFetched = true;
          if (res && res.title) {
            const {
              content,
              title,
              date,
              media = "",
              readNum = 0,
              laudNum = 0,
              favorNum = 0
            } = res;
            this.title = title;
            this.setTitle(title);
            this.time = dateFormat(date, "yyyy-mm-dd HH:MM:SS");
            this.source = media;
            this.content = content;
            this.readNum = readNum;
            this.laudNum = laudNum;
            this.favorNum = favorNum;
          } else {
            this.title = `Error ID: ${this.newsId}`;
            this.time = dateFormat(+new Date(), "yyyy-mm-dd HH:MM:SS");
            this.content = `Error code: ${res.code} <br /> Error Msg: ${res.msg}`;
          }
        })
        .catch(e => {
          this.isFetched = true;
          this.title = `Error ID: ${this.newsId}`;
          this.time = dateFormat(+new Date(), "yyyy-mm-dd HH:MM:SS");
          this.content = `Error type: ${e.type} <br /> Error Msg: ${e.message}`;
        });
    }
  }
};
</script>
