<template>
  <part-card :title="$t('deposit.remit.text_7')">
    <div class="upload-wrap">
      <div class="wrap-camera">
        <div class="camera-item" key="upload-accImgId">
          <camera
            picKey="accImgId"
            :target="uploadUrl"
            :params="_getParams"
            @upload="_getUpload"
            @del="_delImg"></camera>
        </div>
        <div class="camera-item" key="upload-accImgIdA">
          <camera
            picKey="accImgIdA"
            :target="uploadUrl"
            :params="_getParams"
            @upload="_getUpload"
            @del="_delImg"></camera>
        </div>
        <div class="camera-item" key="upload-example">
          <camera picKey="exampleImg" compType="example" :file="exampleImg"></camera>
        </div>
      </div>
    </div>
  </part-card>
</template>

<script>
// import { InterFaceUrl_SEC } from '@/modules/module-iaccount/api/config'
import { DepositImg, IMAGE_REQUEST_LIST } from '@/modules/module-iaccount/api/params/params-define'
// import paramsWrap from '@/modules/module-iaccount/api/params/params-wrap'
import paramsWrap from '@/main/request/utils/wrap';
export default {
  props: {
    exampleImg: {
      type: null,
      required: true
    }
  },
  data () {
    return {
      // uploadUrl: InterFaceUrl_SEC('/sec_api/save_img')
      uploadUrl: '/sec_api/save_img'
    }
  },
  computed: {
  },
  methods: {
    _getParams(file) {
      return paramsWrap.COMMON({ imgBase64: file, ...IMAGE_REQUEST_LIST[DepositImg] })
    },
    _getUpload(key, res) {
      console.log('上传成功', key, res)
      this.$emit('upload', key, res)
    },
    _delImg(key) {
      console.log('删除图片', key)
      this.$emit('del', key)
    }
  }
}

</script>

<style lang="scss" scoped>
@import '~@/modules/module-iaccount/assets/styles/variable.scss';
@import '~@/modules/module-iaccount/assets/styles/mixin.scss';


.upload-wrap {
  padding: 0 .15rem 0;
  background :$color-theme;
  .wrap-camera {
    @include clearfix();
    padding-top: .23rem;
    padding-bottom: .18rem;
  }
  .camera-item {
    float: left;
    margin-right: .1rem;
    &:last-child {
      margin-right: 0;
    }
  }
}
</style>
