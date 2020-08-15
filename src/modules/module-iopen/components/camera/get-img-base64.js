/* eslint-disable */

import EXIF from 'exif-js';
import userAgentInfo from '@/main/utils/common/ua-info';

/**
 * 头像默认大小
 * @type {number}
 */
// const formatImgSize = 800;
const formatImgSize = 1200;
/**
 * dom元素缓存
 */
const cached = {
  input: null,
  img: null,
  canvas: null
};

/**
 * 图片压缩 -- 并修正ios拍照角度问题
 * @param {*} img
 * @param {*} orientation
 */
function compress(img, orientation) {
  let degree = 0;
  let drawWidth = img.width;
  let drawHeight = img.height;
  // 以下改变一下图片大小
  let maxSide = Math.max(drawWidth, drawHeight);
  if (maxSide > formatImgSize) {
    let minSide = Math.min(drawWidth, drawHeight);
    minSide = (minSide / maxSide) * formatImgSize;
    maxSide = formatImgSize;
    if (drawWidth > drawHeight) {
      drawWidth = maxSide;
      drawHeight = minSide;
    } else {
      drawWidth = minSide;
      drawHeight = maxSide;
    }
  }
  let canvas = cached.canvas;
  canvas.width = drawWidth;
  const width = drawWidth;
  const height = drawHeight;
  canvas.height = drawHeight;
  let context = canvas.getContext('2d');
  // 判断图片方向，重置canvas大小，确定旋转角度，iphone默认的是home键在右方的横屏拍摄方式
  if (userAgentInfo.isIOS()) {
    switch (orientation) {
      // iphone横屏拍摄，此时home键在左侧
      case 3:
        degree = 180;
        drawWidth = -width;
        drawHeight = -height;
        break;
      // iphone竖屏拍摄，此时home键在下方(正常拿手机的方向)
      case 6:
        canvas.width = height;
        canvas.height = width;
        degree = 90;
        drawWidth = width;
        drawHeight = -height;
        break;
      // iphone竖屏拍摄，此时home键在上方
      case 8:
        canvas.width = height;
        canvas.height = width;
        degree = 270;
        drawWidth = -width;
        drawHeight = height;
        break;
    }
  }
  // 使用canvas旋转校正
  context.rotate((degree * Math.PI) / 180);
  context.drawImage(img, 0, 0, drawWidth, drawHeight); // 压缩0.5就是压缩百分之50
  const base64data = canvas.toDataURL('image/jpeg');
  canvas = null;
  context = null;

  cached.img.onload = null;
  cached.input.onchange = null;

  cached.img = null;
  cached.input = null;
  cached.canvas = null;

  return base64data;
}

/**
 * 让用户选择或拍照图片
 * @return {Promise} resolve后返回数据
 */
export default function getImageInBase64({ uploadBefore, isCanSelect }) {
  if (!cached.input) {
    cached.input = document.createElement('input');
  }

  if (!cached.img) {
    cached.img = document.createElement('img');
  }
  if (!cached.canvas) {
    cached.canvas = document.createElement('canvas');
  }
  cached.input.type = 'file';
  cached.input.accept = 'image/*';

  if (!isCanSelect) {
    cached.input.capture = 'camera'
  } else {
    cached.input.removeAttribute('capture')
  }

  return new Promise((resolve) => {
    cached.input.onchange = function onInputChange(event) {
      typeof uploadBefore === 'function' && uploadBefore();

      const files = event.target.files;
      let file;
      if (files && files.length > 0) {
        file = files[0];
      }
      const fileReader = new FileReader();
      fileReader.onload = function onFileReaderload(e) {
        const url = e.target.result;
        cached.img.onload = () => {
          EXIF.getData(file, function () {
            const orientation = EXIF.getTag(this, 'Orientation');
            resolve(compress(cached.img, orientation));
          });
        };
        cached.img.src = url;
      };
      fileReader.readAsDataURL(file);
    };
    cached.input.click();
  });
}
