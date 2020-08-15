/**
 * Created by kuncent on 2018/8/1.
 */
export function getValInAssetId(val, type) {
  // type 1:code  2 市场
  let [...arr] = val.split('.');
  if (type === 1) {
    return arr[0];
  } else if (type === 2) {
    return arr.length > 0 ? arr[arr.length - 1] : '';
  }
}

export function getColorClass(num) {
  // num > 0 红色  num = 0 灰色  num < 0  绿色
  num = Number(num);
  if (num > 0) {
    return 'red';
  } else if (num === 0) {
    return 'gray';
  } else {
    return 'green';
  }
}
