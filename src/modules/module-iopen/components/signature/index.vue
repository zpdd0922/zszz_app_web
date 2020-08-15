<template>
  <div class="op-com-signature">
    <header class="top">
      <p class="tip">{{$t('iOpen.comSignature.title')}}</p>
    </header>
    <section class="content">
      <section class="canvas-wrapper">
        <div class="canvas-border" ref="canvasWrapper">
          <canvas class="canvas" :style="canvasStyle" ref="canvas"></canvas>
        </div>
      </section>
      <div class="sign-tips">
        <section class="tips" v-show="isShowTips">
          <p class="text">
            {{$t('iOpen.comSignature.tipsContent')[0]}}
            <mark
              class="mark"
            >{{$t('iOpen.comSignature.tipsContent')[1]}}</mark>
            {{$t('iOpen.comSignature.tipsContent')[2]}}
            <mark
              class="mark"
            >{{$t('iOpen.comSignature.tipsContent')[3]}}</mark>
            {{$t('iOpen.comSignature.tipsContent')[4]}}{{userName}}
            <br />
            {{$t('iOpen.comSignature.tipsContent')[5]}}
          </p>
          <p class="user-name">{{userName}}</p>
        </section>
      </div>
    </section>
    <footer ref="bottom" class="bottom">
      <section class="btn-wrapper">
        <cube-button
          class="btn btn-clear"
          :outline="true"
          @click="handleClearSign"
        >{{$t('iOpen.comSignature.btnClear')}}</cube-button>
        <cube-button
          class="btn"
          :disabled="!isDraw"
          @click="handleConfirmSign"
        >{{$t('iOpen.comSignature.btnConfirm')}}</cube-button>
      </section>
    </footer>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SignaturePad from "@/modules/module-iopen/assets/lib/signature_pad.js";
import { Signature } from "@/modules/module-iopen/api/params-define";
import { customToast } from "@/main/utils/common/tips";

export default {
  props: {
    userName: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      signaturePad: null,
      isShowTips: true,
      isDraw: false,
    };
  },
  computed: {
    ...mapGetters(["openInfo", "openInfoHK"]),
    canvasStyle() {
      return this.isShowTips ? "" : "opacity: 0.6";
    },
    canvas() {
      return this.$refs.canvas;
    },
    resizeEvt() {
      return "onorientationchange" in window ? "orientationchange" : "resize";
    },
  },
  methods: {
    // 初始化canvas
    initSignaturePad() {
      this.signaturePad = new SignaturePad(this.canvas, {
        backgroundColor: "#fff",
        onBegin: () => {
          this.startDraw();
        },
        onEnd: () => {
          this.canvas.addEventListener(
            "touchmove",
            (e) => this.handleDraw(e),
            false
          );
        },
      });

      // 设置canvas宽高
      this.$nextTick(() => {
        // 先执行一次
        this.initResize();
        // 事件触发
        window.addEventListener(this.resizeEvt, this.initResize);
        // 退出后摧毁实例
        this.$once("hook:beforeDestroy", function () {
          window.removeEventListener(this.resizeEvt, this.initResize);
        });
      });
    },
    // 更新尺寸图片
    initResize() {
      // 触发时效性，需要延迟
      setTimeout(() => {
        this.resizeCanvas();
        // this.initBtnStyle();
        this.handleClearSign();
      }, 30);
    },
    // 初始
    resizeCanvas() {
      const ratio = Math.max(window.devicePixelRatio || 1, 1);
      this.canvas.width = this.canvas.offsetWidth * ratio;
      this.canvas.height = this.canvas.offsetHeight * ratio;
      this.canvas.getContext("2d").scale(ratio, ratio);
      this.signaturePad.clear();
    },
    // 开始绘制
    startDraw() {
      this.isShowTips = false;
      this.isDraw = true;
    },
    // 绘制中
    handleDraw(e) {
      const pageX = e.changedTouches[0].pageX;
      const pageY = e.changedTouches[0].pageY;
      const {
        left,
        right,
        top,
        bottom,
      } = this.$refs.canvasWrapper.getBoundingClientRect();
      if (pageX < left || pageX > right || pageY < top || pageY > bottom) {
        // 弹框转向样式
        const styleObj = {
          "-webkit-transform": "rotate(90deg)",
          transform: "rotate(90deg)",
        };
        // 超出范围弹出警告
        customToast({
          txt: "签名超过虚线区域，可能导致开户审核失败",
          type: "warn",
          time: 1000,
          styleObj,
        });
      }
    },
    // 重置签名
    handleClearSign() {
      this.signaturePad.clear();
      this.isShowTips = true;
      this.isDraw = false;
    },
    // 确认签名
    handleConfirmSign() {
      this.handleRotateSign().then((imgBase64) => {
        const params = { imgType: Signature, imgBase64 };

        // 向父组件暴露参数
        this.$emit("confirm", params);
      });
    },
    // 获取签名base64，提交至后台
    handleRotateSign() {
      return new Promise((resolve, reject) => {
        const imgBase64 = this.signaturePad.toDataURL("image/jpeg");
        const img = new Image();
        img.src = imgBase64;
        img.onload = () => {
          resolve(this.handleCompress(img, window.orientation));
        };
      });
    },
    // 处理转向 并压缩图片
    handleCompress(img, orientation) {
      let degree = 0;
      let drawWidth = img.width;
      let drawHeight = img.height;

      // 压缩图片大小 - 已注释
      // 最大签名图
      // const MAX_SIGNATURE_SIZE = 800
      // let maxSide = Math.max(drawWidth, drawHeight)
      // if (maxSide > MAX_SIGNATURE_SIZE) {
      //   let minSide = Math.min(drawWidth, drawHeight)
      //   minSide = (minSide / maxSide) * MAX_SIGNATURE_SIZE
      //   maxSide = MAX_SIGNATURE_SIZE
      //   if (drawWidth > drawHeight) {
      //     drawWidth = maxSide
      //     drawHeight = minSide
      //   } else {
      //     drawWidth = minSide
      //     drawHeight = maxSide
      //   }
      // }
      const width = drawWidth;
      const height = drawHeight;

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      switch (orientation) {
        // iphone竖屏签名，此时home键在下方(正常拿手机的方向)
        case 0:
          canvas.width = height;
          canvas.height = width;
          degree = 270;
          drawWidth = -width;
          drawHeight = height;
          break;
      }
      ctx.rotate((degree * Math.PI) / 180);

      ctx.drawImage(img, 0, 0, drawWidth, drawHeight);

      const imgBase = canvas.toDataURL("image/jpeg", 1);
      return imgBase;
    },
    // 处理底部按钮样式
    // initBtnStyle() {
    //   const height = document.documentElement.clientHeight;
    //   this.$refs.bottom.style.width = `${height}px`;
    // }
  },
  mounted() {
    this.initSignaturePad();
  },
  destroyed() {
    this.signaturePad.off();
  },
};
</script>
