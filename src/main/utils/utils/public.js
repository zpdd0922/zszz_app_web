
// 价格、数量的精度、科学计数法格式化
export default {
  install(Vue) {
    Vue.prototype._P = {
      fixRate: function (price, exrate, market) { // 转法币
        let lang = localStorage.getItem('lan') || 'en_US';
        let larate = exrate[lang] || exrate['en_US'];
        if (!larate) {
          return '--';
        }
        let pric = larate[market] * price;
        if (parseFloat(pric) + '' !== 'NaN') {
          return `${larate['lang_logo']}${this.fixD(pric, larate['coin_precision'])}`;
        } else {
          return '--';
        }
      },
      formatTime: function (dateTime) {
        let date = new Date(dateTime);
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let seconds = date.getSeconds();
        function s(t) {
          return t < 10 ? '0' + t : t;
        }
        return year + '-' + s(month) + '-' + s(day) + ' ' + s(hours) + ':' + s(minutes) + ':' + s(seconds);
      },
      fixD: function (num, precision) {
        // num初始化
        if (num + '' === '0') { return num; }
        if (!num) { return '--'; }
        let newnum = parseFloat(num) + '';
        if (newnum === 'NaN') { return '--'; }
        let fixNum = newnum;
        if (Number(num) === parseInt(Number(num))) {
          if (Number(precision) === 0) {
            return num;
          } else {
            return `${Number(num)}.${'0'.repeat(precision)}`;
          }
        }
        // 科学计数法计算
        if (newnum.toLowerCase().indexOf('e') > -1) {
          let a = newnum.toLowerCase().split('e');
          let b = a[0];
          let c = Math.abs(parseFloat(a[1]));
          let d = '';
          let h = b.length;
          let i;
          if (a[0].split('.')[1]) {
            b = a[0].split('.')[0] + a[0].split('.')[1];
            h = a[0].split('.')[0].length;
          }
          for (i = 0; i < c - h; i++) {
            d = d + '0';
          }
          fixNum = '0.' + d + b;
        }
        // 精度格式化
        // precision初始化
        if (!precision) { return fixNum; }
        if (parseFloat(num) + '' === 'NaN') { return fixNum; }
        let fNum = fixNum.split('.');
        if (!fNum[1]) {
          return parseFloat(fixNum).toFixed(precision);
        }
        if (precision >= 0 && fNum[1]) {
          if (fNum[1].length > precision) {
            let s = parseFloat(fixNum).toFixed(precision + 1);
            fixNum = precision === 0 ? parseInt(s) : s.slice(0, s.length - 1);
          } else {
            fixNum = parseFloat(fixNum).toFixed(precision);
          }
        }
        return fixNum;
      },
      fixDInput: function (num, precision) {
        // num初始化
        if (num + '' === '0') { return num; }
        if (!num) { return ''; }
        let newnum = num + '';
        if (newnum === 'NaN') { return ''; }
        let fixNum = newnum;
        // 科学计数法计算
        if (newnum.toLowerCase().indexOf('e') > -1) {
          let a = newnum.toLowerCase().split('e');
          let b = a[0];
          let c = Math.abs(parseFloat(a[1]));
          let d = '';
          let h = b.length;
          let i;
          if (a[0].split('.')[1]) {
            b = a[0].split('.')[0] + a[0].split('.')[1];
            h = a[0].split('.')[0].length;
          }
          for (i = 0; i < c - h; i++) {
            d = d + '0';
          }
          fixNum = '0.' + d + b;
        }
        // 精度格式化
        // precision初始化
        if (!precision) { return fixNum; }
        if (parseFloat(num) + '' === 'NaN') {
          return fixNum;
        }
        let fNum = fixNum.split('.');
        if (precision >= 0 && fNum[1]) {
          if (fNum[1].length > precision) {
            let s = parseFloat(fixNum).toFixed(precision + 1);
            fixNum = precision === 0 ? parseInt(s) : s.slice(0, s.length - 1);
          } else {
            // fixNum = parseFloat(fixNum).toFixed(precision)
          }
        }
        if (fixNum.length > 14) {
          fixNum = fixNum.slice(0, 14);
          if (fixNum.indexOf('.') === 13) {
            fixNum = fixNum.slice(0, 13);
          }
        }
        return fixNum;
      }
    };
  }
};
