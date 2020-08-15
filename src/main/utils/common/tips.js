/***************************
 * 处理cube-UI 弹框信息
 ***************************/
import Vue from 'vue';
const vm = new Vue();

export const toast = ({ type = 'txt', txt, callback, time, mask }) => {
  const toast = vm.$createToast({
    txt,
    type,
    time,
    mask,
    onTimeout: () => {
      callback && callback();
    }
  });
  toast.show();
};

export const customTopToast = ({ txt, callback, time }) => {
  const customTopToast = vm.$createCustomTopToast({
    txt,
    time,
    onTimeout: () => {
      callback && callback();
    }
  });
  customTopToast.show();
};

export const alert = ({ type = 'alert', confirmTxt = '确定', callback, ...opts }, ...args) => {
  const alert = vm.$createDialog({
    type,
    confirmBtn: {
      text: confirmTxt,
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm: () => {
      callback && callback();
    },
    ...opts,
  }, ...args);
  alert.show();
};

export const confirm = ({ title, content, confirmTxt = '是', cancelTxt = '否', confirmCallback, cancelCallback, type = 'confirm' }) => {
  const confirm = vm.$createDialog({
    type,
    title,
    content,
    confirmBtn: {
      text: confirmTxt,
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    cancelBtn: {
      text: cancelTxt,
      active: false,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm: () => {
      confirmCallback && confirmCallback();
    },
    onCancel: () => {
      cancelCallback && cancelCallback();
    }
  });
  confirm.show();
};

export const customAlert = ({ title, content, confirmTxt, callback }, render) => {
  const alert = vm.$createCustomAlert({
    title,
    content,
    confirmTxt,
    onConfirm: () => {
      callback && callback();
    }
  }, render);
  alert.$on('confirm', (e) => {
    // 销毁实例
    alert.remove();
  });
};

// 主要方便签名页横向的问题
export const customToast = ({ type, txt, time, styleObj, callback }) => {
  const tips = vm.$createCustomToast({
    type,
    txt,
    time,
    styleObj,
    onTimeout: () => {
      callback && callback();
    }
  });
  tips.show();
};
