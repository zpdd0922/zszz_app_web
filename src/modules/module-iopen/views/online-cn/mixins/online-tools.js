import i18n from '@/modules/module-iopen/locale/';

export const getStepI18nValue = (step, key) => {
    return i18n.t(`openAccount.openCn.${step}.${key}`);
}