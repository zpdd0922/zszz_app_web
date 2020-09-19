<template>
  <op-wrap :isDisabled="!isDisabled" @handleNext="handleNext">
    <div class="sec-stock-into-detail" ref="stock-detail">
      <head-title :title="getI18n('title')" class="stock-detail-title"></head-title>
      <div :class="{'addBtn': true, 'addBtn-active': isAddBtnActive }" @click.stop="addStock">+ 添加</div>
      <ul v-if="stockList.length !== 0">
        <li v-for="(item, idx) in stockList" :key="idx" class="form">
          <div class="item-column">
            <label for="sharesCode">{{getI18n('sharesCode')}}</label>
            <input
              type="text"
              name="sharesCode"
              v-model="stockList[idx].sharesCode"
              autocomplete="off"
              :placeholder="getI18n('stockNamePlaceholder')"
              @focus="goToSearch(idx)"
              @blur="closeSearch"
              @keyup="getStockList(idx)"
              :disabled="!item.isInputActive"
            />
            <div class="list-box" v-if="isSearch && item.isInputActive">
              <!-- TODO:看看后续要不要加loading -->
              <!-- <template v-if="isSearchLoading">
                <loading />
              </template>-->
              <template>
                <div class="search-list" v-if="searchStockList.length > 0">
                  <div
                    class="search-line"
                    v-for="(item, index) in searchStockList"
                    :key="index"
                    @click.stop="saveStockCode($event, idx,item)"
                  >
                    <!-- 图标要根据值变化 -->
                    <span>图标</span>
                    <span class="code">{{item.id | formatCode}}</span>
                    <span class="name">{{item.name}}</span>
                  </div>
                </div>
              </template>
            </div>
          </div>
          <div class="item-column">
            <label for="sharesNum">{{getI18n('sharesNum')}}</label>
            <input
              type="text"
              name="sharesNum"
              v-model="stockList[idx].sharesNum"
              :placeholder="getI18n('quantityPlaceholder')"
              :disabled="!item.isInputActive"
            />
          </div>
          <!-- <cube-form-item :field="numberField"></cube-form-item> -->
          <div
            class="btn-wrap"
            @click.stop="handleClick($event, idx)"
            v-if="!isCanOperate && item.isInputActive"
          >
            <div class="leftBtn" id="cancel">取消</div>
            <div class="rightBtn" id="save">保存</div>
          </div>
          <div class="btn-wrap" @click.stop="handleClick($event, idx)" v-else>
            <div class="leftBtn" id="delete">{{getI18n('delete')}}</div>
            <div class="rightBtn" id="edit">{{getI18n('edit')}}</div>
          </div>
        </li>
      </ul>
      <transition name="search"></transition>
    </div>
  </op-wrap>
</template>
<script>
import commonMixin from "@/modules/module-iaccount/mixins/common";
import { mapGetters } from "vuex";
import Storage from "@/main/utils/cache/localstorage";

export default {
  data() {
    return {
      isUpdating: false, // 刷新状态
      searchStockList: [], // 搜索结果
      isAddBtnActive: true, // 添加按钮激活状态
      isCanOperate: true, // 全局按钮状态管理
      stockList: [], // 展示的list
      stockCacheList: [], // 缓存的list
      stockTemp: {}, // 临时数据状态存储
      searchStockName: "", // 搜索框输入
      isTyping: false,
      isSearch: false, // 搜索框
      indexSearch: "", // 进入搜索框点击的序号
      metaInfo: {
        step: 2,
        state: 2,
      },
      stockItemAdded: {
        sharesCode: "",
        sharesNum: "",
        sharesName: "",
        isInputActive: false, //输入框状态
      },
      searchHistory: [],
      // isSearchLoading: false, // 搜索框搜索状态
    };
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
      "isShares",
      "stockTransferredUS",
      "stockTransferredHK",
      "secAccountInfo",
      "isHistoryShares",
      "sharesList",
      // 'searchStockList',
    ]),
    isDisabled() {
      return this.stockList.length !== 0 && this.isCanOperate;
    },
  },
  filters: {
    formatCode(code) {
      return code.split(".")[0];
    },
  },
  methods: {
    clearSearchInput() {
      this.searchStockName = "";
      this.searchStockList = [];
    },
    //搜索股票
    getStockList(idx) {
      let data = {};
      const inputVal = this.stockList[idx].sharesCode;
      if (inputVal.length === 0) {
        this.searchStockList = [];
        return;
      } else {
        // this.isSearchLoading = true;
        data = {
          params: {
            mkt: "",
            flag: 1,
            condition: inputVal,
          },
        };
      }
      data.params.mkt = Number(this.isShares) === 1 ? "HK" : "US";
      this.$store.dispatch("getSearchStockList", data).then((res) => {
        if (res) {
          this.searchStockList = res.stks;
        } else {
          this.searchStockList = [];
        }
        // this.isSearchLoading = false
      });
    },
    // 对比用户选择和历史选择
    initInfo() {
      if (this.sharesList.length > 0) {
        this.sharesList.forEach((item) => {
          const itemAdded = Object.assign({ isInputActive: false }, item);
          this.stockList.push(itemAdded);
        });
        this.isCanOperate = true;
      }
      this.searchHistory = Storage.get("TRANSFERRED_SEARCH_HISTROY") || [];
    },
    getI18n(key) {
      return this.$t(`iAccount.intoStock.stockDetail.${key}`);
    },
    handleNext() {
      //存本地缓存
      this.$store.commit("SET_SHARES_LIST", { sharesList: this.stockList });

      const stockListTemp = this.stockList.map((item) => {
        return {
          stockName: item.sharesName,
          stockCode: item.sharesCode,
          transferNumber: item.sharesNum,
        };
      });
      const data = {
        ...this.metaInfo,
        info: "",
        shares: [...stockListTemp],
      };
      this.$store.dispatch("sendTransferredStockCache", data).then(() => {
        this.$router.push({
          name: "infoConfirm",
          params: { isRefresh: false },
        });
      });
    },
    // 增加
    addStock() {
      if (!this.isAddBtnActive || !this.isCanOperate) {
        return;
      }
      this.isAddBtnActive = false;
      this.isCanOperate = false;
      const added = { ...this.stockItemAdded };
      added.isInputActive = true;
      this.stockList.unshift(added);
    },
    //处理点击事件
    handleClick(e, idx) {
      // 获得点击的按钮
      const id = e.target.id ? e.target.id : null;
      if (id && id === "delete") {
        this.deleteStock(idx);
      } else if (id && id === "edit") {
        this.edit(idx);
      } else if (id && id === "save") {
        this.saveStock(idx);
      } else if (id && id === "cancel") {
        this.cancel(idx);
      }
    },
    //删除事件
    deleteStock(idx) {
      if (!this.isCanOperate) {
        return;
      }
      this.stockList.splice(idx, 1);
    },
    // 编辑
    edit(idx) {
      if (!this.isCanOperate) {
        return;
      }
      // 先将全局输入框及按钮禁用
      this.isAddBtnActive = false;
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
        return;
      }
      if (!stockClicked.sharesNum) {
        this.showNoQuantityWarn();
        return;
      }
      if (this.stockList.length > 1) {
        const list = this.stockList
          .slice(0, idx)
          .concat(this.stockList.slice(idx + 1));
        if (list.some((item) => item.sharesCode === stockClicked.sharesCode)) {
          this.showRepeatWarn();
          return;
        }
      }
      this.stockList[idx].isInputActive = false;
      //所有按钮激活，输入框禁用
      this.isCanOperate = true;
      this.isAddBtnActive = true;
    },
    // 提示框
    showNoStockNameWarn() {
      const toast = this.$createToast({
        type: "txt",
        time: 1000,
        txt: this.getI18n("noStockNameWarn"),
      });
      toast.show();
    },
    showNoQuantityWarn() {
      const toast = this.$createToast({
        type: "txt",
        time: 1000,
        txt: this.getI18n("noQuantityWarn"),
      });
      toast.show();
    },
    showRepeatWarn() {
      const toast = this.$createToast({
        type: "txt",
        time: 1000,
        txt: this.getI18n("repeatWarn"),
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
      this.isSearch = false;
    },
    saveStockCode(e, idx, item) {
      this.stockList[idx].sharesCode = item.id.split(".")[0];
      this.stockList[idx].sharesName = item.name;
      this.isSearch = false;
      //存在本地
      const isPush = this.searchHistory.some((obj) => {
        return obj.id === item.id;
      });
      if (!isPush) {
        this.searchHistory.push(item);
        Storage.set("TRANSFERRED_SEARCH_HISTROY", this.searchHistory);
      }
      this.searchStockName = "";
      this.searchStockList = [];
    },
    clearHistory() {
      while (this.searchHistory.length > 0) {
        this.searchHistory.pop();
      }
      Storage.remove("TRANSFERRED_SEARCH_HISTROY");
    },
  },
};
</script>