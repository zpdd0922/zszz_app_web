import landProvinceList from './address/land-province-list';
import landAreaList from './address/land-area-list';
import landCityList from './address/land-city-list';
import { hkProvinceList, hkAreaList, hkCityList } from './address/hk-list';


export default {
  language: 'zh_CN',
  common: {
    defaultNavigator: '',
    alertTitle: "温馨提示",
    toast: {
      success: '调用成功',
      failBusy: '网络繁忙，请稍后再试',
      failLogin: '登录信息已失效，请先登录',
      failOvertime: '网络请求超时，请稍后重试录',
    },
    comfire: {
      cancelTxt: '否',
      confirmTxt: '是',
    },
    picker: {
      placeholder: '请选择省市区',
    },
    cubeComponents: {
      select: {
        title: '请选择',
        cancelTxt: '取消',
        confirmTxt: '确认',
      }
    }
  },
  landProvinceList, landAreaList, landCityList,
  hkProvinceList, hkAreaList, hkCityList
};
