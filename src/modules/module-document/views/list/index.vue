<template>
  <div class="page-document-list">
    <header class="header">平台文档列表</header>
    <section v-if="isFetched">
      <div class="frequently-box">
        <ul class="frequently-list">
          <li class="frequently-item" v-for="item in frequentlyList" :key="item.key">
            <h2>{{item.label}}</h2>
            <p>
              <a :href="`./index.html?key=${item.key}&lang=zh_CN`" target="_blank">跳转简体中文地址</a>
            </p>
            <p>
              <a :href="`./index.html?key=${item.key}&lang=zh_HK`" target="_blank">跳转繁体中文地址</a>
            </p>
          </li>
        </ul>
      </div>
    </section>
    <template v-else>
      <section>
        <base-waiting />
      </section>
    </template>
  </div>
</template>

<script>
import BaseCopyright from "@/main/components/base-copyright/";
import { getURLParameters } from "@/main/utils/format/url.js";
import DocApi from "@/modules/module-document/api/doc/index";
import auth from "@/main/request/utils/auth";

export default {
  name: "home",
  components: { BaseCopyright },
  props: {},
  data() {
    return {
      isFetched: false,
      classifyList: [],
      frequentlyList: [],
      lang: getURLParameters().lang || "zh_HK",
    };
  },
  created() {
    this.setTitle("平台文档列表");
    this.getList();
  },
  watch: {},
  computed: {},
  mounted() {},
  methods: {
    getList() {
      DocApi.fetchDocList(this.lang).then((result) => {
        this.isFetched = true;
        this.frequentlyList = result;
      });
    },
    gotoDetail(id) {},
  },
};
</script>
<style scoped lang="scss">
@import "./style.scss";
</style>
