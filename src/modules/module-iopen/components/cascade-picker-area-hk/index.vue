<template>
  <div
    class="cube-select"
    @click="showPicker"
    :class="{ 'cube-select_active': active, 'cube-select_disabled': disabled }"
  >
    <span
      v-if="selectValueByCustom && this.defaultCity.length"
      class="cube-select-text"
    >{{ selectValueByCustom }}</span>
    <span v-else class="cube-select-placeholder">{{ placeholder }}</span>
    <i class="cube-select-icon"></i>
  </div>
</template>

<script type="text/ecmascript-6">
import {
  provinceList,
  cityList,
  areaList,
} from "@/main/define/province-city-area-hk";

const EVENT_INPUT = "input"; // only used for v-modal
const EVENT_PICKER_SHOW = "picker-show";
const EVENT_PICKER_HIDE = "picker-hide";

// const addressData = provinceList;
// addressData.forEach((province) => {
//   province.children = cityList[province.value];
//   province.children.forEach((city) => {
//     city.children = areaList[city.value];
//   });
// });

export default {
  name: "CascadePickerAreaHk",
  props: {
    value: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultCity: {
      type: Array,
      default() {
        return [];
      },
    },
    defaultCityText: {
      type: Array,
      default() {
        return [];
      },
    },
    placeholder: {
      type: String,
      default() {
        return this.$t("common.picker.placeholder");
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    title: {
      type: String,
      default() {
        return this.$t("common.cubeComponents.select.title");
      },
    },
    cancelTxt: {
      type: String,
      default() {
        return this.$t("common.cubeComponents.select.cancelTxt");
      },
    },
    confirmTxt: {
      type: String,
      default() {
        return this.$t("common.cubeComponents.select.confirmTxt");
      },
    },
  },
  data() {
    return {
      selected: [],
      active: false,
    };
  },
  mounted() {
    const addressData = this.addressProvinceList;
    const city = this.addressCityList;
    const area = this.addressAreaList;
    addressData.forEach((province) => {
      province.children = city[province.value];
      province.children.forEach((city) => {
        city.children = area[city.value];
      });
    });

    this.picker = this.$createCascadePicker({
      data: addressData,
      onSelect: this.selectHandler,
      $props: {
        title: "title",
        cancelTxt: "cancelTxt",
        confirmTxt: "confirmTxt",
      },
      $events: {
        cancel: this.hided,
      },
    });
    // 重置选择列表
    this.picker.setData(addressData, this.defaultCity);
  },
  computed: {
    addressProvinceList() {
      return this.$t("hkProvinceList");
    },
    addressCityList() {
      return this.$t("hkCityList");
    },
    addressAreaList() {
      return this.$t("hkAreaList");
    },
    // 在输入框显示所选择的的城市
    selectValueByCustom() {
      if (this.selected.length) {
        return this.selected.join("/");
      }
      return this.defaultCityText.join("/");
    },
  },
  methods: {
    showPicker() {
      this.picker.show();
      this.active = true;
      this.$emit(EVENT_PICKER_SHOW);
    },
    hided() {
      this.active = false;
      this.$emit(EVENT_PICKER_HIDE);
    },
    selectHandler(selectedVal, selectedIndex, selectedTxt) {
      this.hided();
      this.selected = selectedTxt;
      // 筛选城市列表
      const selectValue = selectedIndex.map((val, idx) => {
        return {
          index: selectedIndex[idx],
          text: selectedTxt[idx],
        };
      });
      this.$emit(EVENT_INPUT, selectValue);
    },
  },
};
</script>

