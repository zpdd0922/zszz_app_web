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
            <input 
              type="text" 
              name="stockName" 
              v-model="stockList[idx].stockName" 
              :placeholder="getI18n('stockNamePlaceholder')"
              readonly="readonly"
              @click="goToSearch(idx)"
            >
          </div>
          <div class="inputColumn">
            <label for="quantity">{{getI18n('quantity')}}</label>
            <input type="text"
             name="quantity" 
             v-model="stockList[idx].quantity" 
             :placeholder="getI18n('quantityPlaceholder')"
             :disabled="!item.isInputActive"
            >
          </div>
          <!-- <cube-form-item :field="numberField"></cube-form-item> -->
          <div class="btn-wrap" @click="handleClick($event, idx)" v-if="!isCanOperate && item.isInputActive">
            <div class="leftBtn" id="cancel">取消</div>
            <div class="rightBtn" id="save">保存</div>
          </div>
          <div class="btn-wrap" @click="handleClick($event, idx)" v-else>
            <div class="leftBtn" id="delete">删除</div>
            <div class="rightBtn" id="edit">编辑</div>
          </div>
        </div>
      </form>
      <transition name="search">
        <div class="search-mask" v-if="isSearch">
          <div class="search">
            <div class="head">
              <div></div>
              <div>股票搜索</div>
              <div @click="closeSearch">关闭</div>
            </div>
            <div class="search-wrap">
              <input type="text"
                v-model="searchStockName" 
                :placeholder="getI18n('search.searchInput')" 
                name="searchStockName"
                :class="{'search-input': !isTyping}"
                @focus="changeStatus"
                @blur="changeStatus"
              >
              <div
                class="clear-input" 
                v-show="this.searchStockName.length !== 0"
                @click="searchStockName = ''"
              ></div>
            </div>
            <div class="history">
              <h3 class="history-title">{{getI18n('search.searchTitle')}}</h3>
              <div class="history-list">
                <div class="stockCodeList"
                  v-for="(item, index) in stockCodeList"
                  :key="index"
                  @click="saveStockCode"
                >
                  <span>{{item.code}}</span>
                  <span>{{item.companyName}}</span>
                </div>
              </div>
              <div class="clear-history">{{getI18n('search.clear')}}</div>
            </div>
          </div>
        </div>
      </transition>
    </div>
  </op-wrap>
</template>

<script>
export default {
  data() {
    return {
      isDisabled:  true, // 下一步按钮状态
      isAddBtnActive: true, // 添加按钮激活状态
      isCanOperate: false, // 全局按钮状态管理
      stockList: [],
      stockTemp: {}, // 临时数据状态存储
      searchStockName: '', // 搜索框输入
      isTyping: false,
      isSearch: false, // 搜索框
      indexSearch: '', // 进入搜索框点击的序号
      stockCodeList: [
        {
          code: 00700,
          companyName: '腾讯控股',
        }
      ]
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
      this.isCanOperate = false;
      const stockItemAdded = {
          stockName: '',
          quantity: '',
          isInputActive: true, //输入框状态
      };
      this.stockList.unshift(stockItemAdded);
    },
    //处理点击事件
    handleClick(e, idx) {
      // 获得点击的按钮
      const id = e.target.id ? e.target.id : null;
      if ( id && id === 'delete') {
        this.deleteStock(idx);
      } else if (id && id === 'edit') {
        this.edit(idx);
      } else if (id && id === 'save') {
        this.saveStock(idx)
      } else if (id && id === 'cancel') {
        this.cancel(idx);
      }
    },
    //删除事件
    deleteStock(idx) {
      this.stockList.splice(idx, 1)
    },
    // 编辑
    edit(idx) {
      // 先将全局输入框及按钮禁用
      this.isCanOperate = false;
      // 保存数据状态
      this.stockTemp = Object.assign({}, this.stockList[idx]);
      // 激活点击窗
      this.stockList[idx].isInputActive = true;
    },
    // 取消
    cancel(idx) {
      const stockItem = this.stockList[idx];
      if (!this.stockTemp.stockName && !this.stockTemp.quantity) {
        this.stockList.shift();
      } else {
        stockItem.stockName = this.stockTemp.stockName;
        stockItem.quantity = this.stockTemp.quantity;
        stockItem.isInputActive = false;
      }
      this.isCanOperate = true;
      this.isAddBtnActive = true;
      this.stockTemp = {};
    },
    // 保存
    saveStock(idx) {
      const stockClicked = this.stockList[idx];
      if (!stockClicked.stockName) {
        this.showNoStockNameWarn();
        return
      }
      if (!stockClicked.quantity) {
        this.showNoQuantityWarn();
        return
      }
      if (this.stockList.length > 1){
        const list = this.stockList.slice(0, idx).concat(this.stockList.slice(idx+1))
        if (list.some(item => item.stockName === stockClicked.stockName)) {
          this.showRepeatWarn();
          return
        }
      }
      stockClicked.isInputActive = false
      //所有按钮激活，输入框禁用
      this.isCanOperate = true;
      this.isAddBtnActive = true;
    },
    // 提示框
    showNoStockNameWarn() {
      const toast = this.$createToast({
        type: 'txt',
        time: 1000,
        txt: this.getI18n('noStockNameWarn')
      });
      toast.show();
    },
    showNoQuantityWarn() {
      const toast = this.$createToast({
        type: 'txt',
        time: 1000,
        txt: this.getI18n('noQuantityWarn')
      });
      toast.show();
    },
    showRepeatWarn() {
      const toast = this.$createToast({
        type: 'txt',
        time: 1000,
        txt: this.getI18n('repeatWarn')
      });
      toast.show();
    },
    changeStatus() {
      this.isTyping = !this.isTyping;
    },
    goToSearch(index) {
      this.isSearch = true;
      this.indexSearch = index;
    },
    closeSearch() {
      this.isSearch = !this.isSearch;
    }
  },
}
</script>

<style scoped lang='scss'>
@import './style.scss';
</style>