<!--
 * @Author: Jim
 * @Date: 2019-12-18 14:18:36
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-06 15:35:39
 * @Description: 
 -->
<template>
  <div class="doc-page-detail">
    <article class="box">
      <header>
        <h3>{{title}}</h3>
        <span>{{time}}</span>
      </header>
      <section v-if="isFetched">
        <div class="content" v-html="content" />
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
import DocApi from "@/modules/module-document/api/doc/index";
import auth from "@/main/request/utils/auth";

export default {
  name: "document-detail",
  data() {
    return {
      title: "",
      time: "",
      content: "",
      isFetched: false,
      key: getURLParameters().key || "",
      lang: getURLParameters().lang || "zh_HK",
    };
  },
  created() {
    this.getArticleDetail();
  },
  computed: {
    isLogin() {
      return auth.getAuthSession().length;
    },
  },
  methods: {
    getArticleDetail() {
      console.log(this.lang)
      DocApi.fetchDocDetail(this.key, this.lang)
        .then((res) => {
          this.isFetched = true;
          if (res && res.documentTitle) {
            const { documentContent, documentTitle, updateTime } = res;
            this.title = documentTitle;
            this.setTitle(documentTitle);
            console.log(updateTime)
            this.time = dateFormat(updateTime, "yyyy-mm-dd HH:MM:SS");
            console.log(this.time)
            this.content = documentContent;
          } else {
            this.title = `Error ID: ${this.key}`;
            this.time = dateFormat(+new Date(), "yyyy-mm-dd HH:MM:SS");
            this.content = `Error code: ${res.code} <br /> Error Msg: ${res.msg}`;
          }
        })
        .catch((e) => {
          this.isFetched = true;
          this.title = `Error ID: ${this.key}`;
          this.time = dateFormat(+new Date(), "yyyy-mm-dd HH:MM:SS");
          this.content = `Error type: ${e.type} <br /> Error Msg: ${e.message}`;
        });
    },
  },
};
</script>
