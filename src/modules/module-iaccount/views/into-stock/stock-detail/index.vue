<template>
  <div>
    <template v-if="isUpdating">
      <loading />
    </template>
    <template v-else>
      <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
        <div class="stock-detail" ref="stock-detail">
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
                <label for="sharesCode">{{getI18n('sharesCode')}}</label>
                <input 
                  type="text" 
                  name="sharesCode" 
                  v-model="stockList[idx].sharesCode" 
                  :placeholder="getI18n('stockNamePlaceholder')"
                  readonly="readonly"
                  @click="goToSearch(idx)"
                >
              </div>
              <div class="inputColumn">
                <label for="sharesNum">{{getI18n('sharesNum')}}</label>
                <input type="text"
                name="sharesNum" 
                v-model="stockList[idx].sharesNum" 
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
                  <div class="search-input-wrap">
                    <input type="text"
                      v-model="searchStockName" 
                      :placeholder="getI18n('search.searchInput')" 
                      name="searchStockName"
                      :class="{'search-input': isTyping}"
                      @focus="isTyping = false"
                      @blur="isTyping = true"
                      @keyup="getStockList"
                    >
                    <div
                      class="clear-input" 
                      v-show="this.searchStockName.length !== 0"
                      @click="clearSearchInput"
                    ></div>
                  </div>
                  <div class="search-list" v-if="searchStockList.length > 0">
                    <div class="search-line"
                      v-for="(item, index) in searchStockList"
                      :key="index"
                      @click="saveStockCode($event, item)"
                    >
                      <!-- 图标要根据值变化 -->
                      <span>图标</span>
                      <span class="code">{{item.id | formatCode}}</span>
                      <span class="name">{{item.name}}</span>
                    </div>
                  </div>
                  <div class="no-result" v-if="this.searchStockName.length>0 && this.searchStockList.length === 0">
                    无搜索结果
                  </div>
                  <div class="history" v-if="isTyping">
                    <h3 class="history-title">{{getI18n('search.searchTitle')}}</h3>
                    <div class="search-list">
                      <div class="search-line"
                        v-for="(item, index) in searchHistory"
                        :key="index"
                        @click="saveStockCode($event, item)"
                      >
                        <!-- 图标要根据值变化 -->
                        <span>图标</span>
                        <span class="code">{{item.id | formatCode}}</span>
                        <span class="name">{{item.name}}</span>
                      </div>
                    </div>
                    <div class="clear-history" @click="clearHistory">{{getI18n('search.clear')}}</div>
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </op-wrap>
    </template>
  </div>
</template>
<script>
import commonMixin from '@/modules/module-iaccount/mixins/common';
import { mapGetters } from 'vuex';
import Storage from '@/main/utils/cache/localstorage';

export default {
  data() {
    return {
      isUpdating: false, // 刷新状态
      searchStockList: [],// 搜索结果
      isAddBtnActive: true, // 添加按钮激活状态
      isCanOperate: false, // 全局按钮状态管理
      stockList: [],  // 展示的list
      stockCacheList: [], // 缓存的list
      stockTemp: {}, // 临时数据状态存储
      searchStockName: '', // 搜索框输入
      isTyping: false,
      isSearch: false, // 搜索框
      indexSearch: '', // 进入搜索框点击的序号
      metaInfo: {
        step: 2,
        state: 2,
      },
      stockItemAdded: {
        sharesCode: '',
        sharesNum: '',
        sharesName: '',
        isInputActive: true, //输入框状态
      },
      searchHistory: [],
    }
  },
  created() {
    this.initInfo();
  },
  props: {
    isRefresh: {
      type: Boolean,
      default: true,
    },
    updateInfo: {
      type: Function,
    },
  },
  computed: {
    ...mapGetters([
      'isShares',
      'stockTransferredUS',
      'stockTransferredHK',
      'secAccountInfo',
      'isHistoryShares',
      'sharesList',
      // 'searchStockList',
    ]),
    isDisabled() {
      if (this.stockList.length !== 0 && this.isCanOperate) {
        return true
      } 
    },
  },
  filters: {
    formatCode(code) {
      return code.split('.')[0]
    },
  },
  methods: {
    clearSearchInput() {
      this.searchStockName = '';
      this.searchStockList = [];
    },
    //搜索股票
    getStockList() {
      let data = {};
      if (this.searchStockName.length === 0) {
        this.searchStockList = [];
        return 
      } else {
        data = {
          params: {
            mkt: '',
            flag: 1,
            condition: this.searchStockName
          }
        }
      }
      data.params.mkt = this.isShares === 1 ? 'HK':'US'
      this.$store.dispatch('getSearchStockList', data).then((res) => {
        this.searchStockList = res.stks;
      })
    },
    // 对比用户选择和历史选择
    initInfo() {
      if (this.sharesList.length > 0){
         this.sharesList.forEach((item) => {
           const itemAdded = Object.assign({isInputActive: false}, item)
           this.stockList.unshift(itemAdded);
         })
         this.isCanOperate = !this.stockList.some((item) => {
             return !item.sharesCode || !item.sharesNum
         })
       }
       this.searchHistory = Storage.get('TRANSFERRED_SEARCH_HISTROY') || [];
    },
    getI18n(key) {
      return this.$t(`iAccount.intoStock.stockDetail.${key}`)
    },
    handleNext() {
      //存本地缓存
      this.$store.commit('SET_SHARES_LIST', {sharesList: this.stockList});

      const stockListTemp = this.stockList.map((item) => {
        return {
          stockName: item.sharesName,
          stockCode: item.sharesCode,
          transferNumber: item.sharesNum,
        }
      })
      const data = {
        ...this.metaInfo,
        info: '',
        shares: [
          ...stockListTemp,
        ]
      }
      this.$store.dispatch('sendTransferredStockCache', data);
      this.$router.push({name: 'infoConfirm', params: {isRefresh: false}})
    },
    // 增加
    addStock() {
      if (!this.isAddBtnActive) {
        return
      }
      this.isAddBtnActive = false;
      this.isCanOperate = false;
      const added = {...this.stockItemAdded}
      this.stockList.unshift(added);
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
      if (!this.stockTemp.sharesCode && !this.stockTemp.sharesNum) {
        this.stockList.shift();
      } else {
        stockItem.sharesCode = this.stockTemp.sharesCode;
        stockItem.sharesNum = this.stockTemp.sharesNum;
        stockItem.isInputActive = false;
      }
      this.isCanOperate = true;
      this.isAddBtnActive = true;
      this.stockTemp = {};
    },
    // 保存
    saveStock(idx) {
      const stockClicked = this.stockList[idx];
      if (!stockClicked.sharesCode) {
        this.showNoStockNameWarn();
        return
      }
      if (!stockClicked.sharesNum) {
        this.showNoQuantityWarn();
        return
      }
      if (this.stockList.length > 1){
        const list = this.stockList.slice(0, idx).concat(this.stockList.slice(idx+1))
        if (list.some(item => item.sharesCode === stockClicked.sharesCode)) {
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
    goToSearch(index) {
      if (!this.isCanOperate && this.stockList[index].isInputActive) {
        this.isSearch = true;
        this.indexSearch = index;     
      }
    },
    closeSearch() {
      this.isSearch = false
    },
    saveStockCode(e, item) {
      this.stockList[this.indexSearch].sharesCode = item.id.split('.')[0];
      this.stockList[this.indexSearch].sharesName= item.name;
      this.isSearch = false;
      //存在本地
      const isPush = this.searchHistory.some((obj) => {
        return obj.id === item.id
      })
      if (!isPush) {
        this.searchHistory.push(item)
        Storage.set('TRANSFERRED_SEARCH_HISTROY', this.searchHistory)
      }
      this.searchStockName = '';
      this.searchStockList = [];
    },
    clearHistory() {
      while (this.searchHistory.length > 0) {
        this.searchHistory.pop();
      }
      Storage.remove('TRANSFERRED_SEARCH_HISTROY');
    }
  },
}
</script>

<style scoped lang='scss'>
@import './style.scss';
</style>