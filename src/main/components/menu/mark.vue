<template>
  <div id="com-mark">
    <transition name="com-Lmark">
      <section @touchmove.prevent
               class="mark"
               v-show="flag">
        <div class="close"
             @click.stop="setMarkFlag(false)">{{'&#10005'}}</div>
        <div class="userOptions-fr">
          <div class="userOptions">
            <div class="page"><img src="./../../assets/img/nologin.png"
                   alt=""></div>
            <div class="name">
              <p v-if='isLogin'
                 class="isLogin">
                <span>{{ baseData.user.nickName}}</span>
                <span class="unx-score">UNX：<span class="red">{{getUnxAvailScore || 0}}</span></span>
              </p>
              <span v-else
                    class="noLogin"
                    @click="setMarkFlag(false)">
                <!-- 注册 -->
                <a href="javascript:;"
                   @click="toRegister">{{ Internationalization.register }}</a>
                <!-- 登录 -->
                <a href="javascript:;"
                   @click="toLogin">{{ Internationalization.login }}</a>
              </span>
            </div>
          </div>
        </div>
        <div id="mark-list-menu">
          <div class="mark-list">
            <!-- 首页 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/index'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-home"></i>{{ Internationalization.home }}</router-link>
              <a href="/index"
                 :class="isActiveUrl('/index')?'router-link-active':''"
                 v-else><i class="ticon-img-home"></i>{{ Internationalization.home }}</a>
            </div>
            <!-- 交易中心 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/tradingCenter'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-tradeCenter"></i>{{ Internationalization.transaction }}</router-link>
              <a href="/tradingCenter"
                 :class="isActiveUrl('/tradingCenter')?'router-link-active':''"
                 v-else><i class="ticon-img-tradeCenter"></i>{{ Internationalization.transaction }}</a>
            </div>
            <!-- 资金管理 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/capital'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-captal"></i>{{ Internationalization.management }}</router-link>
              <a href="/capital"
                 :class="isActiveUrl('/capital')?router-link-active:''"
                 v-else><i class="ticon-img-captal"></i>{{ Internationalization.management }}</a>
            </div>
            <!-- 我的UNX -->
            <div @click="isOpenUnx = !isOpenUnx"
                 class="tli unx-li">
              <a :class="markType === 'unx'?'router-link-active':''">
                <i class="ticon-img-stone"></i>{{Internationalization.unxCenter.title}}
                <i class="icon-down"
                   :class="isOpenUnx?'open':''"></i>
              </a>
            </div>
            <template v-if="isOpenUnx">
              <div @click="setMarkFlag(false)"
                   class="tli sub-li"
                   v-for="(item,index) in unxUrl">
                <router-link :to="{path:item}"
                             active-class="sub-active"
                             v-if="markType === 'unx'">
                  <i class="ticon-img-stone"
                     style="visibility:hidden;"></i>{{Internationalization.unxCenter.subTitle[index]}}
                </router-link>
                <a :href="'/h/unx/#'+item"
                   v-else>
                  <i class="ticon-img-stone"
                     style="visibility:hidden;"></i>{{Internationalization.unxCenter.subTitle[index]}}
                </a>
              </div>
            </template>

            <!-- 用户中心 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/userCenter'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-userCenter"></i>{{ Internationalization.userCenter }}</router-link>
              <a href="/userCenter"
                 :class="isActiveUrl('/userCenter')?'router-link-active':''"
                 v-else><i class="ticon-img-userCenter"></i>{{ Internationalization.userCenter }}</a>
            </div>
            <!-- 订单管理 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/order'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-orderMng"></i>{{ Internationalization.order }}</router-link>
              <a href="/order"
                 :class="isActiveUrl('/order')?'router-link-active':''"
                 v-else><i class="ticon-img-orderMng"></i>{{ Internationalization.order }}</a>
            </div>
            <!-- 切换语言 -->
            <div class="tli"
                 @click="setMarkFlag(false)">
              <router-link :to="{path: '/lang'}"
                           v-if="markType === 'main'">
                <i class="ticon-img-lan"></i>{{ $t('options.mark.lan') }}</router-link>
              <a :href="langPageUrl()"
                 :class="isActiveUrl('/lang')?'router-link-active':''"
                 v-else><i class="ticon-img-lan"></i>{{ $t('options.mark.lan') }}</a>
            </div>
          </div>
        </div>

        <!-- 退出登录 -->
        <div class="out-fr"
             v-if='isLogin'>
          <div class="out"
               @click='out'>{{ Internationalization.clode }}</div>
        </div>

      </section>
    </transition>
    <div class="right"
         @touchmove.prevent
         @click.stop.prevent="setMarkFlag(false)"
         v-if="flag"></div>
  </div>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex';
import { BetterScroll } from 'cube-ui';
export default {
  name: 'com-mark',
  props: {
    markType: {
      // 侧边栏菜单当前所处的项目
      type: String,
      default: 'main'
    }
  },
  data() {
    return {
      isOpenUnx: false,
      unxUrl: [
        '/mallList', '/unxTask', '/mUnx'
      ],
    };
  },
  computed: {
    ...mapState({
      flag({ options: { markFlag } }) {
        return markFlag;
        // return true
      },
      baseData({ baseData }) {
        return baseData;
      },
      isLogin({ baseData }) {
        return baseData.isLogin;
      }
    }),
    ...mapGetters(['getUnxAvailScore']),
    Internationalization() {
      return {
        login: this.$t('options.mark.login'), // 登录
        register: this.$t('options.mark.register'), // 注册
        home: this.$t('options.mark.home'), // 首页
        transaction: this.$t('options.mark.transaction'), // 币币交易
        management: this.$t('options.mark.management'), // 资金管理
        unxCenter: {
          title: this.$t('options.mark.unxCenter.title'),
          subTitle: this.$t('options.mark.unxCenter.subTitle')
        },
        userCenter: this.$t('options.mark.userCenter'), // 用户中心
        order: this.$t('options.mark.order'), // 订单管理
        clode: this.$t('options.mark.clode'), // 退出登录
        cut: this.$t('options.mark.cut') // 成功退出
      };
    },
  },
  watch: {
    flag(v) {
      if (v) {
        this.initScroll();
      }
    }
  },
  mounted() {
    this.initScroll();
    this.freshData();
    if (window.hunxInterval) {
      clearInterval(window.hunxInterval);
      window.hunxInterval = null;
    }
    window.hunxInterval = setInterval(() => {
      this.freshData();
    }, 30000);
  },
  methods: {
    ...mapActions([
      'setMarkFlag', 'syncUsdtTask', 'getAvailUnx'
    ]),
    initScroll() {
      if (!this.scroll) {
        if (this.flag) {
          setTimeout(() => {
            let wrapper = document.getElementById('mark-list-menu');
            this.scroll = new BetterScroll(wrapper, {
              scrollY: true,
              click: true
            });
            this.scroll.refresh();
            // console.log('init', this.scroll);
          }, 300);
        }
      } else {
        this.scroll.refresh();
        // console.log('refresh', this.scroll);
      }
    },
    langPageUrl() {
      let tempUrl = encodeURIComponent(location.pathname + location.hash);
      return `/lang?redirect=${tempUrl}`;
    },
    freshData() {
      if (!this.isLogin) {
        return;
      }
      this.syncUsdtTask();
      this.getAvailUnx();
    },
    out() {
      // 退出登录
      this.axios({
        method: 'post',
        url: 'user/login_out'
      }).then(e => {
        if (e.code !== '0') {
          this.$store._mutations.ALERT[0](e.msg);
        } else {
          this.$store._mutations.ALERT[0](this.Internationalization.cut);
          this.$store.state.baseData.isLogin = false;
          localStorage.exchangeSession = '';
          this.setMarkFlag(false);
          // TODO: 页面需要登录，跳转到首页
          setTimeout(() => {
            if (this.markType === 'main') {
              this.$router.push('/index');
            } else {
              location.href = '/index';
            }
          }, 500);
        }
      });
    },
    toRegister() {
      // 去注册
      if (this.markType === 'main') {
        this.$router.push('/register');
      } else {
        location.href = '/register';
      }
    },
    toLogin() {
      // 去登陆
      if (this.markType === 'main') {
        this.$router.push('/login');
      } else {
        location.href = '/login';
      }
    },
    isActiveUrl(curUrl) {
      // 当前页面是否 active
      if (location.pathname.indexOf(curUrl) > -1) {
        return true;
      } else {
        return false;
      }
    },
  }
};
</script>
