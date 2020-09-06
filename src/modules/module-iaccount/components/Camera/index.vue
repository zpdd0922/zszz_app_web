<template>
  <div class="camera">
    <div class="camera-inner">

      <!-- 已上传 -->
      <template v-if="getCompFile">
        <img class="file-img" :src="getCompFile" @click="_showImgPreview">
        <!-- 上传进度 -->
        <template v-if="isUploading">
          <div class="file-rate">{{ uploadPercent }} %</div>
        </template>
        <div v-if="showAction" class="file-action">
          <!-- 上传成功 -->
          <template v-if="isSuccess">
            <jf-icon name="del" @click="_clickDelImg"></jf-icon>
          </template>
          <!-- 上传失败 -->
          <template v-if="isError">
            <span class="file-reload" @click="_clickReUpload">{{$t('common.text_11')}}</span>
          </template>
          <!-- 上传示例 -->
          <template v-if="isExample">
            <span>{{ $t('common.text_4') }}</span>
          </template>
        </div>
      </template>

      <!-- 未上传 - 显示上传按钮 -->
      <template v-else>
        <span @click="_clickShowAction" class="btn-cross"></span>
      </template>
    </div>

    <jf-action-sheet
      ref="jfActionSheet"
      :items="btns"
      @clickItem="_clickHandle"></jf-action-sheet>
  </div>
</template>

<script>
// import ajaxUpload, { STATUS_UPLOADING, STATUS_SUCCESS, STATUS_ERROR } from '@/api/axios/upload'
import { postImg } from '@/modules/module-iaccount/api/request'
import { STATUS_UPLOADING, STATUS_SUCCESS, STATUS_ERROR } from '@/main/request/axios/upload'
import UploadTools, { BASE64, CAMERA_TYPE, openJsCameraJF, openWalletCamera } from './upload-tools'
import JfIcon from '../JfIcon'
import userAgent from '@/main/utils/common/ua-info'
import * as tips from '@/main/utils/common/tips'

const COMPONENT_TYPE = ['upload', 'example']

const CAMERA_WAYS = [{
  // 相册
  title: 'common.text_5',
  type: 'album'
}, {
  // 相机
  title: 'common.text_6',
  type: 'camera'
}]

export default {
  props: {
    /* 组件类型 */
    compType: {
      type: String,
      default: COMPONENT_TYPE[0],
      validator: value => {
        return COMPONENT_TYPE.indexOf(value) !== -1
      }
    },
    /* 底部状态展示 */
    showAction: {
      type: Boolean,
      default: true
    },
    /* 上传图片地址 */
    target: {
      type: String
    },
    /* 上传参数 */
    params: {
      type: [Object, Function],
      default: () => {
        return {}
      }
    },
    // 1.对应Android交互时 isLocal是否展示拍照及相册面板选择
    // 2.对应H5处理图片上传 capture="camera"是否直接拍照
    isCanSelect: {
      type: Boolean,
      default: false
    },
    /* 拍照参数  */
    cameraType: {
      default: CAMERA_TYPE.SYSTEM_CAMERA,
      validator: value => {
        return Object.values(CAMERA_TYPE).indexOf(value) !== -1
      }
    },
    /* 图片标识key */
    picKey: {
      type: String,
      required: true
    },
    /* 已存在文件 */
    file: {
      type: String,
      default: ''
    },
    /* 操作按钮 */
    btns: {
      type: Array,
      default: () => CAMERA_WAYS
    }
  },
  data () {
    return {
      uploadFile: '', // 图片文件
      uploadPercent: 0, // 上传进度
      uploadStatus: '' // 上传状态
    }
  },
  created() {
    this.initUpload()
  },
  computed: {
    getCompFile() {
      return this.uploadFile || this.file
    },
    isExample() {
      return this.compType === COMPONENT_TYPE[1]
    },
    isSuccess() {
      return this.uploadStatus === STATUS_SUCCESS
    },
    isError() {
      return this.uploadStatus === STATUS_ERROR
    },
    isUploading() {
      return this.uploadStatus === STATUS_UPLOADING
    }
  },
  methods: {
    _showImgPreview() {
      if (!this.getCompFile) return false
      const imgs = [this.getCompFile]
      this.$createImagePreview({ imgs }).show()
    },
    _clickShowAction() {
      if (!this.showAction) return
      this.$refs.jfActionSheet.open()
    },
    _clickHandle(item, index) {
      this.$refs.jfActionSheet.close()
      console.log(item, index)
      switch (item.type) {
      case 'album':
        if (userAgent.isApp() && userAgent.isAndroid()) {
          this.handleOpenAlbumAndroid()
        } else {
          this.handleOpenAlbum()
        }
        break
      case 'camera':
        this.handleCamera()
        break
      // no default
      }
    },
    // 文件上传回调
    callback(e, key) {
      this.uploadStatus = e.status
      this.uploadPercent = e.percent
      console.log(key, e.status, e.percent)
    },
    // 初始化拍照组件
    initUpload() {
      const defaultUpload = {
        uploadBefore: idFlag => {
          console.log('uploadBefore', idFlag)
          this.$emit('uploadBefore', idFlag)
        },
        localLoad: (file, idFlag) => {
          console.log('localLoad', file, idFlag)
          this.$emit('localLoad', file, idFlag)
        },
        upload: (file, idFlag) => {
          this._upload(file, idFlag)
        },
        fail: (res, msg = '操作失败，请稍后重试') => {
          tips.toast({ type: 'error', txt: msg })
        },
        cameraType: this.cameraType,
        isCanSelect: false
      }
      this.uploadTools = new UploadTools(defaultUpload)
    },
    // 拍照
    handleCamera() {
      const tempKey = this.picKey
      this.uploadTools.openCamera(tempKey)
    },
    // APP内安卓 则调用相册 -- 主要兼容华为
    handleOpenAlbumAndroid(key) {
      const tempKey = this.picKey

      const defaultOptions = {
        success: (res, msg) => {
          // base64位转换
          const { data = '' } = res
          const file = `${BASE64}${data}`
          this._upload(file, tempKey)
        },
        fail: (res, msg) => {
          // 弹框提醒用户是否选择H5相册
          tips.confirm({
            confirmTxt: this.$t('common.text_1'),
            cancelTxt: this.$t('common.text_2'),
            content: this.$t('common.text_20'),
            onConfirm: () => {
              this.handleOpenAlbum(false)
            }
          })
        },
        complete: msg => {
        }
      }
      window.JFSTOCK.openAlbumApp(defaultOptions)
    },
    // H5调用
    handleOpenAlbum(isCanSelect = true) {
      const tempKey = this.picKey

      const defaultOptions = {
        idFlag: tempKey,
        isCanSelect: isCanSelect,
        uploadBefore: idFlag => {
          this.$emit('uploadBefore', idFlag)
        },
        localLoad: (file, idFlag) => {
          this.$emit('localLoad', file, idFlag)
        },
        upload: (file, idFlag) => {
          this._upload(file, idFlag)
        },
        fail: (res, msg = '操作失败，请稍后重试') => {
          tips.toast({ type: 'error', txt: msg })
        }
      }
      openJsCameraJF(defaultOptions)
      // 判断是否在钱包app内，调用钱包原生相机方法
      // if (userAgent.isWalletApp()) {
      //   const cameraParams = {
      //     quality: 25,
      //     // eslint-disable-next-line
      //     destinationType: Camera.DestinationType.DATA_URL, // 设置图片返回base64 string格式数据
      //     // eslint-disable-next-line
      //     sourceType: Camera.PictureSourceType.PHOTOLIBRARY // 从相册里选取
      //   }
      //   const type = Object.assign({}, defaultOptions, { cameraParams })
      //   openWalletCamera(type)
      // } else {
      //   openJsCameraJF(defaultOptions)
      // }
    },
    // 删除图片 - 重置
    _clickDelImg() {
      this.uploadFile = ''
      this.uploadStatus = ''
      this.uploadPercent = 0
      this.$emit('del', this.picKey)
    },
    // 再次上传
    _clickReUpload() {
      console.log('再次上传')
      this._upload(this.uploadFile, this.picKey)
    },
    // 接口请求-上传文件
    _upload(file, key) {
      this.uploadFile = file
      const tempParams = typeof this.params === 'function' ? this.params(file, key) : { imgBase64: file, ...this.params }
      postImg(this.target, { imgType: key, callback: this.callback, ...tempParams })
        .then(res => {
          this.$emit('upload', key, res)
        })
        .catch(err => {
          this.$emit('fail', key, err)
        })
    }
  },
  components: {
    JfIcon
  }
}

</script>

<style lang='scss' scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';

.camera {
  @include border-1px();
  width: 1.08rem;
  height: 1.13rem;
  border-radius: .02rem;
  overflow: hidden;
  position: relative;
  box-sizing: border-box;
  .camera-inner {
    width: 100%;
    height: 100%;
    position: relative;
  }
  .btn-cross {
    display: grid;
    width: 100%;
    height: 100%;
    background: $color-upload-bg;
    &:before, &:after {
      content: "";
      position: absolute;;
      top: 50%;
      left: 50%;
      width: .32rem;
      height: .02rem;
      background-color: $color-upload-cross;
      transform: translate(-50%,-50%);
    };
    &:after {
      transform: translate(-50%,-50%) rotate(90deg);
    }
  }
  .file-img {
    width: 100%;
    margin: auto;
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
  };
  .file-rate {
    position: absolute;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    z-index:2;
    text-align: center;
    line-height: 1.13rem;
    background :rgba(51, 51, 51, .7);
    color: $color-theme;
    font-size: .25rem;
  };
  .file-action {
    color: $color-theme;
    background: $color-upload-action-bg;
    font-size: .12rem;
    height: .22rem;
    line-height: .22rem;
    text-align: center;
    border-radius: 0px 0px 4px 4px;
    opacity: 0.6;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 3;
  }
}
</style>
