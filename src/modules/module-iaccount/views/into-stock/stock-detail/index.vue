<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="stock-detail">
      <head-title :title="getI18n('title')"></head-title>
      <div
        :class="{'addBtn': true, 'addBtn-active': isAddBtnActive }"
        @click="addStock"
      >+ 添加</div>
      <cube-form 
        v-if="model.stockList.length !== 0"
        :model="model"
      >
        <div
          v-for="item in model.stockList" 
          :key="item.id"
          class="form"
        >
          <cube-form-item :field="stockField" :disabled="!isAddBtnActive && activeStockId === item.id"></cube-form-item>
          <cube-form-item :field="numberField" :disabled="!isAddBtnActive && activeStockId === item.id"></cube-form-item>
          <div class="btn-wrap" v-if="isAddBtnActive" @click="handleClick($event, item.id)"
          >
            <div
              class="leftBtn"
              id="delete"
            >删除</div>
            <div
              class="rightBtn"
              id="edit"
            >编辑</div>
          </div>
          <div class="btn-wrap" @click="handleClick($event, item.id)" v-else >
            <div
              class="leftBtn"
              id="cancel"
            >取消</div>
            <div
              class="rightBtn"
              id="save"
            >保存</div>
          </div>
        </div>
      </cube-form>
    </div>
  </op-wrap>
</template>

<script>
export default {
  data() {
    return {
      isAddBtnActive: true,
      activeStockId: '',
      number: 0,
      activeIdx: 0,
      isAdd:false,
      model: {
        stockName: "",
        quantity: 0,
        stockList: []
      },
      stockField: {
        type: "input",
        modelKey: "stockName",
        label: this.getI18n('stockName'),
        props: {
          placeholder: this.getI18n('stockNamePlaceholder'),
        },
        rules: {
          required: false
        }
      },
      numberField: {
        type: "input",
        modelKey: "quantity",
        label: this.getI18n('quantity'),
        props: {
          placeholder: this.getI18n('quantityPlaceholder'),
        },
        rules: {
          required: false
        }
      }
    }
  },
  computed: {
    isDisabled() {
      return false
    },
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.stockDetail.${key}`)
    },
    handleNext() {

    },
    // 增加税务信息
    addStock() {
      if (!this.isAddBtnActive) {
        return
      }
      const list = this.model.stockList;
      this.model.stockList = [
        {
        id: this.number++,
        stockName: '',
        quatity: '',
      },
      ...list
      ]
      // this.model.stockList.push({
      //   id: ++this.number,
      //   stockName: '',
      //   quatity: '',
      // });
      this.isAddBtnActive = false;
    },
    //处理点击事件
    handleClick(e, itemId) {
      const id = e.target.id ? e.target.id : null;
      if ( id && id === 'delete') {
        this.deleteStock(itemId);
      } else if (id && id === 'edit') {
        this.edit(itemId);
      } else if (id && id === 'save') {
        this.saveStock(itemId)
      } else if (id && id === 'cancel') {
        this.cancel();
      }
    },
    deleteStock(itemId) {
      const idx= null;
      this.model.stockList.find((itemId, index) => {
        if (item.id === itemId) {
          idx = index;
          return true
        }
      });
      this.model.stockList.splice(idx, 1);
    },
    edit(id) {

      this.activeStockId = id;

    },
    cancel() {
      this.model.stockList.pop();
      this.number--;
      this.isAddBtnActive = true;
    },
    saveStock(itemId) {
      const obj = this.model.stockList.find((item) => {
        if (item.id === itemId) {
          item.stockName = this.model.stockName;
          item.quantity = this.model.quantity;
        }
        return true;
      })
      console.log(obj)
     if (!obj.stockName) {
        console.log(1)
        return
      }
      if (!obj.quantity) {
        //放出提醒，请输入数量
        console.log(2)
        return
      }
      console.log(1)
      this.isAddBtnActive = true;
      this.isDisabled = true;
    },
  },
}
</script>

<style scoped lang='scss'>
@import './style.scss';
</style>