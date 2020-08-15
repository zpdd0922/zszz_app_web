<template>
  <div v-show="false">
    <a ref="nodeA" :href="nodeAHref" v-if="isUseNodeA"></a>
    <iframe ref="nodeIframe" :src="nodeIframeSrc" v-if="isUseNodeIframe" frameborder="0"></iframe>
  </div>
</template>

<script>
export default {
  name: "base-open-app",
  props: {
    node: {
      type: String,
      default: ""
    },
    url: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      isUseNodeA: false,
      nodeAHref: "",
      isUseNodeIframe: false,
      nodeIframeSrc: ""
    };
  },
  methods: {
    open() {
      if (!this.url || this.url === "") this.$emit("error");

      console.log(this.url, this.node);
      let activeNode = "";
      if (this.node === "a") {
        this.isUseNodeA = true;
        activeNode = "nodeA";
      } else if (this.node === "iframe") {
        this.isUseNodeIframe = true;
        activeNode = "nodeIframe";
      } else {
        this.$emit("error");
      }
      this.$nextTick(function() {
        if (activeNode === "") {
          this.$emit("error");
        }
        console.log(this.$refs);
        const dom = this.$refs[activeNode];
        if (activeNode === "nodeA") {
          dom.href = this.url;
          dom.click();
        } else {
          dom.src = this.url;
        }
        this.$emit("success");
      });
    }
  }
};
</script>