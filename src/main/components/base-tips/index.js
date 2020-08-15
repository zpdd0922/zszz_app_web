import Vue from 'vue';
import BaseToast from './toast/';

export const toast = ({
  type = 'normal',
  txt,
  callback,
  time = 2500,
  mask
}) => {
  const ToastTpl = Vue.extend(BaseToast);
  const toast = new ToastTpl({
    propsData: {
      txt,
      type,
      time,
      mask,
      onTimeout: () => {
        callback && callback();
      }
    }
  });
  const tpl = toast.$mount().$el;
  if (!document.body.querySelector(tpl.className)) {
    document.body.appendChild(tpl);
  }
  toast.show();
};
