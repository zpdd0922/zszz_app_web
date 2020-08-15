/* eslint-disable */
// 配置rem单位
const setRem = () => {
  console.log('================ Resize ================');
  const clientWidth = document.documentElement.clientWidth;
  const clientHeight = document.documentElement.clientHeight;

  let fontSize = 100;
  if (window.orientation === 90 || window.orientation === -90) {
    fontSize = clientHeight / 375 * 100 
  } else {
    fontSize = clientWidth / 375 * 100
  }

  if (fontSize > 130) {
    fontSize = 130;
  }

  if (fontSize < 85) {
    fontSize = 85;
  }

  document.getElementsByTagName('html')[0].style.fontSize = fontSize  + 'px';
}

const addSetRemMessage = () => {
  if (document.addEventListener) {
    const resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';
    window.removeEventListener(resizeEvt, setRem);
    window.addEventListener(resizeEvt, setRem, false);
    document.addEventListener('DOMContentLoaded', setRem, false);
  }
}

addSetRemMessage();