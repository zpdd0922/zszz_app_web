<template>
  <div class="container">
    <div style="width: 80%; margin: auto; padding: 20px; text-align: center">
      <div class="border" style="padding:10px;">{{$t('demo.main.content')}}</div>
    </div>
  
  </div>
</template>

<script type="text/ecmascript-6">

export default {
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout').then(() => {
        // location.reload();
      });
    },
  }
};
</script>

<style scoped lang="scss">
.container {
  background: #fff;
  overflow: hidden;

  .slide-wrapper {
    width: 100%;
    height: 450px;

    .slide-item {
      .img {
        display: block;
        width: 100%;
      }
    }
  }

  .btn {
    width: 375px;
  }

  .btn2 {
    margin: 15px 0;
    width: 150px;
  }
}
</style>





