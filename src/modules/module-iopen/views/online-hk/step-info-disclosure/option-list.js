import { getStepI18nValue } from '../mixins/online-tools';

export const getUsGreenCardOptions = () => [
  {value: 1, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.notGreenCardHolder')},
  {value: 2, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.notAmericanBornInUS')},
  {value: 3, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.greenCardHolder')},
]