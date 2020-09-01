import { getStepI18nValue } from '../mixins/online-tools';

export const getUsGreenCardOptions = () => ({
  notGreenCardHolder: {value: 1, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.notGreenCardHolder')},
  notAmericanBornInUS: {value: 2, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.notAmericanBornInUS')},
  greenCardHolder: {value: 3, label: getStepI18nValue('infoDisclosure', 'other.isNotUsGreenCardHolder.usGreenCardHoldStatusOptions.greenCardHolder')},
})