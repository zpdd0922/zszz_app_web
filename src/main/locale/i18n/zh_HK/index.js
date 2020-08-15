import landProvinceList from './address/land-province-list';
import landAreaList from './address/land-area-list';
import landCityList from './address/land-city-list';
import { hkProvinceList, hkAreaList, hkCityList } from './address/hk-list';

export default {
  language: 'zh_HK',
  common: {
    defaultNavigator: '',
    alertTitle: "溫馨提示",
    toast: {
      success: '調用成功',
      failBusy: '網絡繁忙，請稍後再試',
      failLogin: '登錄信息已失效，請先登錄',
      failOvertime: '網絡請求超時，請稍後重試錄',
    },
    comfire: {
      cancelTxt: '否',
      confirmTxt: '是',
    },
    picker: {
      placeholder: '請選擇省市區',
    },
    cubeComponents: {
      select: {
        title: '請選擇',
        cancelTxt: '取消',
        confirmTxt: '確認',
      }
    }
  },
  landProvinceList, landAreaList, landCityList,
  hkProvinceList, hkAreaList, hkCityList
};
