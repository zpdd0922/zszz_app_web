<template>
  <div class="btn-wrap"
    
  >
    <button type="button" class="btn"  @click="addList">{{$t('iOpen.components.addDeleteBtn.add')}}</button>
    <button type="button" class="btn"  @click="deleteList">{{$t('iOpen.components.addDeleteBtn.delete')}}</button>
  </div>
</template>

<script>
import I18n from '@/modules/module-iopen/locale/index.js'

export default {
  name: 'addDeleteBtn',
  props: {
    list: {
      type: Array,
      default: ()=>[],
    },
    listObj: {
      type: Object,
      default: ()=>{},
    }
  },
  methods: {
    //处理按钮点击
    addList() {
      this.$emit('handleAdd')
    },
    deleteList() {
      this.$emit('handleDelete')
    },
  }
}
</script>

<style lang="scss">
@import '~@/customize/theme/_val_white.scss';

.btn-wrap {
  display: flex;
  justify-content: space-evenly;
  width: 100%;
  height: 100%;
  padding: .1rem;

  .btn {
    width: 20%;
    padding: .05rem 0;
    text-align: center;
    background-color: $color-main-sub;
    color: $color-bg;
    border-radius: .05rem
  }
}
</style>