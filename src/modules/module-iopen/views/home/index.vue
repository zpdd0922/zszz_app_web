<template>
  <div class="container">
    <router-link :to="{name: 'opaGuide'}">
      <cube-button>点我 ==> 进入开户</cube-button>
    </router-link>
    <div style="width: 80%; margin: auto; padding: 20px; text-align: center">
      <div class="border" style="padding:10px;">↑ 新版开户 ↑</div>
    </div>
    <router-link :to="{name: 'login'}">
      <cube-button>登录验证</cube-button>
    </router-link>
    <cube-button @click="handleLogout">用户登出</cube-button>
  </div>
</template>

<script type="text/ecmascript-6">
// import * as CATools from '@/modules/module-iopen/assets/lib/build.js';
const {
  createKeypair,
  formatSubject,
  createPKCS1,
  createPKCS10
} = require('@/modules/module-iopen/assets/lib/index.js');

export default {
  metaInfo() {
    return {
      title: this.$route.meta.title
    };
  },
  data() {
    return {};
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('logout').then(() => {
        // location.reload();
      });
    },
    log(obj) {
      console.log(' ----------- ');
      Object.entries(obj).forEach(([
        k, v
      ]) => {
        console.log(k);
        console.log(v);
      });
      console.log(' ----------- ');
    },
    test() {
      const MOCK = {
        CERT_DN:
          'CN=张李四,OU=441522199402230052,OU=1,O=0,L=深圳市,ST=广东省,C=CN',
        FILE_HASH:
          '5LiJMRLic55yBMQswCQYDVQQGDAJDTjCCASIwDQYJKoZIhvcNAQEBBQADggEPADCCAQoCggEBAJ78OpFaCOB8YyB3c'
      };

      const bits = 2048;
      const workers = 2;
      const startTime = new Date().getTime();
      // 创建公私钥对
      createKeypair(bits, workers)
        .then(keyPair => {
          console.log(
            `生成 keypair 耗时= ${new Date().getTime() - startTime} ms`
          );

          const certDN = MOCK.CERT_DN; // 请求得到的主题，此处使用 mock 数据

          const subject = formatSubject(certDN);
          const certP10 = createPKCS10(keyPair, subject); // 根据主题生成 p10

          this.log({ certP10 });

          const fileHash = MOCK.FILE_HASH; // 请求得到的文件哈希，此处使用 mock 数据

          const p1SignData = createPKCS1(keyPair, fileHash); // 签名完生成的 p1, 发送请求给后端

          this.log({ p1SignData });
        })
        .catch(err => console.error(err));
    }
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
