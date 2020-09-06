<template>
  <div class="Captcha">
    <div class="captcha-title">
      <div class="content">
        <h5 class="title">交易密码验证</h5>
      </div>
    </div>

    <div class="captcha-codebox">
      <div class="box" @click="_autoFocus">
        <span
          v-for="(item, index) in codeboxLen"
          :key="index"
          :class="`box-item ${index === code.length && focused ? 'is-active' : ''} ${code.charAt(index) !== '' ? 'is-filled' : ''}`">
          <!-- 已输入值 -->
          <template v-if="code.charAt(index)">
            <!-- 掩码展示 -->
            <template v-if="mask">
              <i class="codebox-dot"></i>
            </template>
            <!-- 全展示 -->
            <template v-else>
              {{code.charAt(index)}}
            </template>
          </template>

          <!-- 聚焦点 -->
          <template v-if="index === code.length && focused">
            <i class="codebox-blink"></i>
          </template>
        </span>
      </div>
      <footer class="footer">
        <div class="brief">密码输错五次，您的账户将被锁定</div>
      </footer>
      <!-- 仅限系统键盘输入值 -->
      <div class="form">
        <input
          ref="inputNode"
          class="codebox-input"
          v-model="code"
          :type="mask ? 'password' : 'text'"
          :maxLength="maxlength"
        />
      </div>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    mask: {
      type: Boolean,
      default: true
    },
    maxlength: {
      type: [Number, String],
      default: 8
    },
    title: {
      type: String,
      default: '交易密码验证'
    }
  },
  data () {
    return {
      code: '',
      focused: true
    }
  },
  created() {
  },
  mounted() {
    this._autoFocus()
  },
  computed: {
    codeboxLen() {
      return new Array(this.maxlength).fill('')
    }
  },
  methods: {
    _autoFocus() {
      this.$refs.inputNode && this.$refs.inputNode.focus()
    }
  },
  watch: {
    code(newVal) {
      // 去除空格 - 以及小数点
      const val = newVal.replace(/\s+/g, '').replace(/\.+/g, '')
      this.code = val
      // 限制长度
      const max = parseFloat(this.maxlength)
      if (max < 0 || val.length === max) {
        console.log('submit', val)
        this.$emit('submit', val)
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';


.Captcha {
  width: 100%;
  height: 100%;
  padding-top: .05rem;
  .captcha-title {
    font-size: .14rem;
    line-height: 1.2;
    text-align: center;
    margin-bottom: .15rem;

    .title {
      color: #111a34;
      font-size: .18rem;
      font-weight: 400;
      line-height: 1.15;
      margin: 0 0 .05rem;

    }
  }

  .captcha-codebox {
    .box {
      @include flex-box($row: center);
      position: relative;

      .box-item {
        @include flex-box($row: center, $col: center);
        font-size: .18rem;
        flex: 1 1 0%;
        position: relative;
        width: .3rem;
        height: .3rem;
        font-weight: 400;
        line-height: 1.2;
        color: #111a34;
        border: 1px solid #c5cad5;
        border-right: none;
        &:last-child {
          border-right: 1px solid #c5cad5;
        }
      }

      .codebox-dot {
        display: block;
        background-color: #111a34;
        width: .1rem;
        height: .1rem;
        border-radius: 50%;
      }

      .codebox-blink {
        display: block;
        background-color: #111a34;
        width: .01rem;
        height: .16rem;
        animation: codebox-flash 1s steps(2) infinite;
      }

    }

    .codebox-input {
      position: absolute;
      left: -99.99em;
      opacity: 0;
    }

    .footer {
      @include flex-box($row: space-between, $col: center);
      font-size: .12rem;
      margin-top: .1rem;

      .brief {
        color: #858b9c;
        flex: 1 1 0%;

        .error {
          color: #ff5257;
        }
      }

      .btn {
        display: inline-block;
        color: #2f86f6;
        padding: 0;
        margin: 0 0 0 .06rem;
        border: 0;
        border-radius: 0;
        background: none;
      }
    }
  }
}

@keyframes codebox-flash {
  0% {
    opacity: 0;
  }

  100% {
    opacity: 1;
  }
}
</style>
