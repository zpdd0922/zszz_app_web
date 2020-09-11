<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="stock-detail">
      <head-title :title="getI18n('title')" class="stock-detail-title"></head-title>
      <div
        :class="{'addBtn': true, 'addBtn-active': isAddBtnActive }"
        @click="addStock"
      >+ 添加</div>
      <form
        v-if="stockList.length !== 0"
      >
        <div
          v-for="(item, idx) in stockList" 
          :key="idx"
          class="form"
        >
          <div class="inputColumn">
            <label for="stockName">{{getI18n('stockName')}}</label>
            <input type="text" name="stockName" v-model="stockList[idx].stockName" :placeholder="getI18n('stockNamePlaceholder')">
          </div>
          <div class="inputColumn">
            <label for="quantity">{{getI18n('quantity')}}</label>
            <input type="text" name="quantity" v-model="stockList[idx].quantity" :placeholder="getI18n('quantityPlaceholder')">
          </div>
          <!-- <cube-form-item :field="numberField"></cube-form-item> -->
          <div class="btn-wrap" @click="handleClick($event, idx)" v-if="!item.isInputActive">
            <div class="leftBtn" id="delete">删除</div>
            <div class="rightBtn" id="edit">编辑</div>
          </div>
          <div class="btn-wrap" @click="handleClick($event, idx)" v-else >
            <div class="leftBtn" id="cancel">取消</div>
            <div class="rightBtn" id="save">保存</div>
          </div>
        </div>
      </form>
    </div>
  </op-wrap>
</template>

<script>
export default {
  data() {
    return {
      isDisabled:  true, //下一步按钮状态
      isAddBtnActive: true, //添加按钮激活状态
      number: 0, //记录最后一个数组元素的index
      // activeIndex: 0,
      // stockName: "",
      // quantity: "",
      stockList: [],
  

      stockField: {
        type: "input",
        modelKey: `stockName`,
        label: this.getI18n('stockName'),
        props: {
          placeholder: this.getI18n('stockNamePlaceholder'),
          disabled : this.isInputDisabled,
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
          disabled : this.isInputDisabled,
        },
        rules: {
          required: false
        }
      }
    }
  },
  computed: {
    isInputDisabled() {
      // return isAddBtnActive && this.stockList.
      return true
    }
    // isDisabled() {
    //   return false
    // },
  },
  methods: {
    getI18n(key) {
      return this.$t(`iAccount.intoStock.stockDetail.${key}`)
    },
    handleNext() {
      this.$router.push({name: 'infoConfirm'})
    },
    // 增加
    addStock() {
      console.log(this.stockList, 1)
      if (!this.isAddBtnActive) {
        return
      }
      this.isAddBtnActive = false;
      //先将其他股票按钮禁用
      if (this.stockList.length > 1) {
        this.stockList.forEach((item) => {
          item.isInputActive = false;
          item.isOperateBtnActive = false;
        });
      }
      const stockItemAdded = {
          id: this.number,
          stockName: '',
          quantity: '',
          isInputActive: true, //输入框状态
          isOperateBtnActive: true, //操作按钮状态
      };
      const list = this.stockList;
      this.stockList = [stockItemAdded, ...list];
      console.log(this.stockList, 2);
      // this.stockList.push(stockItemAdded); 
      // this.stockList.push({
      //   id: ++this.number,
      //   stockName: '',
      //   quantity: '',
      // });
    },
    //处理点击事件
    handleClick(e, itemId) {
      // 获得点击的按钮
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
    //删除事件
    deleteStock(itemId) {
      this.stockList.splice(itemId, 1)
      // const idx = null;
      // this.stockList.forEach((itemId) => {
      //   if (item.id === itemId) {
      //     idx = index;
      //   }
      // });
      // this.stockList.splice(idx, 1);
    },
    // 编辑
    edit(itemId) {
      this.stockList.forEach((item) => {
        if (item.id === itemId) {
          item.isOperateBtnActive = true;
          item.isInputActive = true;
        } else {
          item.isOperateBtnActive = false;
          item.isInputActive = false;
        }
      })
    },
    // 取消
    cancel(itemId) {
      const stockItem = this.getClickedStockItem(itemId);
      if (!stockItem.stockName && !quantity) {
        this.stockList.pop();
      }
      // 激活所有按钮状态,禁止输入框
      this.stockList.forEach((item) => {
        item.isOperateBtnActive = true;
        item.isInputActive = false;
      })
      this.cleanInputedData();
      this.isAddBtnActive = true;
    },
    // 保存
    saveStock(itemId) {
      const stockItem = this.getClickedStockItem(itemId);
      if (!stockItem.stockName) {
        console.log('请输入股票')
        return
      }
      if (!stockItem.quantity) {
        //放出提醒，请输入数量
        console.log('请输入数量')
        return
      }
      //所有按钮激活，输入框禁用
      this.stockList.forEach((item) => {
        item.isInputActive = false;
        item.isOperateBtnActive = true;
      });
      this.number++;
      this.isAddBtnActive = true;
    },
    //获取点击的股票信息块
    getClickedStockItem(itemId) {
      return this.stockList.find((item) => {
        return item.id === itemId
      })
    },
    // 清除输入框已有的数据
    cleanInputedData() {
    }
  },
}
</script>

<style scoped lang='scss'>
@import './style.scss';
</style>