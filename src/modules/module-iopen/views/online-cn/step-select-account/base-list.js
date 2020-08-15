import { getStepI18nValue } from '../mixins/online-tools';

export const secMarkets = [
  {
    label: getStepI18nValue("selectAccount", "secMarkets.marketHK"),
    value: "1",
    disabled: true,
  },
  {
    label: getStepI18nValue("selectAccount", "secMarkets.marketUS"),
    value: "2"
  },
  // {
  //   label: getStepI18nValue("selectAccount", "secMarkets.marketHKOptions"),
  //   value: "2",
  // },
  // {
  //   label: getStepI18nValue("selectAccount", "secMarkets.marketCN"),
  //   value: "3",
  // },
];