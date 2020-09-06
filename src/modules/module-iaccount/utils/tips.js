/***************************
 * 处理cube-UI 弹框信息
 ***************************/
import Vue from 'vue'
const vm = new Vue()

export const toast = ({ type = 'txt', txt, onTimeout, time, mask }) => {
  const toast = vm.$createToast({
    txt,
    type,
    time,
    mask,
    onTimeout
  })
  toast.show()
}

export const alert = ({ title, content, confirmTxt = '确定', onConfirm, icon, type = 'alert', render }) => {
  const alert = vm.$createDialog({
    icon,
    title,
    content,
    type,
    onConfirm,
    confirmBtn: {
      text: confirmTxt,
      active: true
    }
  }, render)
  alert.show()
}

export const confirm = ({ title, content, confirmTxt = '确定', cancelTxt = '取消', onConfirm, onCancel, type = 'confirm', render }) => {
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
      active: true,
      disabled: false,
      href: 'javascript:;'
    },
    onConfirm,
    onCancel
  }, render)
  confirm.show()
}

export const jfDialog = ({ content, onConfirm, render, ...params }) => {
  const instance = vm.$createJfDialog({
    show: true,
    content,
    ...params
  }, render)

  // 销毁实例
  const remove = () => instance.remove()

  instance.$on('onConfirm', (e) => {
    onConfirm && onConfirm(e)
    remove()
  })
}
