/*
 * @Author: Jim
 * @Date: 2020-01-06 19:47:58
 * @LastEditors: Jim
 * @LastEditTime: 2020-01-16 10:10:17
 * @Description: 
 */
import html2canvas from 'html2canvas';

/**
 * Converts canvas to an image
 * @param {object} canvas 对象
 */
function convertCanvasToImage(canvas) {
  const base64 = canvas.toDataURL('image/jpeg', 1.0);
  return base64;
}

/**
 * 截图 // screenshot
 * @param {String} el 元素容器
 */
function screenshot(el) {
  const opts = {
    // scale: 2, // 添加的scale 参数
    logging: true, // 日志开关，便于查看html2canvas的内部执行流程
    backgroundColor: '#fff', // 绘制底色图
    useCORS: true // 需要服务器支持跨域
  };

  return new Promise((resolve, reject) => {
    html2canvas(el, opts).then(function (canvas) {
      const context = canvas.getContext('2d');
      context.mozImageSmoothingEnabled = false;
      context.webkitImageSmoothingEnabled = false;
      context.msImageSmoothingEnabled = false;
      context.imageSmoothingEnabled = false;

      const capture = convertCanvasToImage(canvas);
      resolve(capture);
    });
  });
}

export default screenshot;
