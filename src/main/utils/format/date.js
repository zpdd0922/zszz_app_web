/***************************
处理Date相关的一些常规方法
***************************/
/**
 * 说明
 * 日期类型字段
 * date: (String) 'yyyy-mm-dd' / 'yyyy/mm/dd'
 * time: (String) 'HH:MM:SS'
 * datetime: (String) 'yyyy-mm-dd HH:MM:SS'
 * timestamp: (Number) 1594018426304
 * realdate: (Date)Mon Jul 06 2020 14:53:25 GMT+0800 (中国标准时间)
 * dategap: (String) 'yyyyMMdd'
 * date: (Number) 'yyyyMMdd'
 * format: (String) 'yyyy-mm-dd HH:MM:SS'
 */

/**
 * 转换日期格式
 * @param {*} d
 * @param {*} format
 */
export function dateFormat(t, format) {
  if (!t) return '';

  let rd = t;
  // 转化 yyyy-mm-dd -> yyyy/mm/dd
  if (typeof t === 'string') rd = t.replace(/-/g, '/');

  const rdate = new Date(rd);

  if (!rdate.getDate() || isNaN(rdate.getDate())) return '';

  if (!format || format === "realdate") return rdate;
  if (format === "timestamp") return Date.parse(rdate); // 剔除ms

  const dict = {
    yyyy: rdate.getFullYear(),
    m: rdate.getMonth() + 1,
    d: rdate.getDate(),
    H: rdate.getHours(),
    M: rdate.getMinutes(),
    S: rdate.getSeconds(),
    mm: (`${rdate.getMonth() + 101}`).substr(1),
    dd: (`${rdate.getDate() + 100}`).substr(1),
    HH: (`${rdate.getHours() + 100}`).substr(1),
    MM: (`${rdate.getMinutes() + 100}`).substr(1),
    SS: (`${rdate.getSeconds() + 100}`).substr(1)
  };

  try {
    return format.replace(/(yyyy|MM?|dd?|HH?|mm?|ss?)/g, f => dict[f]);
  } catch (e) {
    return rdate;
  }
}


/**
 *  将时间转换为时间戳
 * @param {传入的时间} t
 * Example: format2realdate("2020-07-06 15:10:34", true) -> Mon Jul 06 2020 15:10:34 GMT+0800 (中国标准时间)
 */
export function format2realdate(t) {
  return dateFormat(t);
}

/**
 *  将时间戳转换为日期
 * "使用Date(), 将时间戳转换转换为可读格式)."
 * @param {传入的时间戳} t
 * @param {返回的格式 (1:yyyy-mm-dd或者2: yyyy/mm/dd)} formatType
 * Example1: format2datetime(1489525200000) -> "2017-03-15 05:00:00"
 * Example2: format2datetime(1489525200000,2) -> "15/03/2017 05:00:00"
 */
export function format2datetime(t, formatType = 1) {
  switch (formatType) {
    case 1:
      return dateFormat(t, 'yyyy-mm-dd HH:MM:SS');
    case 2:
      return dateFormat(t, 'yyyy/mm/dd HH:MM:SS');
  }

  return '';
}

/**
 *  将时间戳转换为日期
 * "使用Date(), 将时间戳转换转换为可读格式)."
 * @param {传入的时间戳} t
 * @param {返回的格式 (1:yyyy-mm-dd或者2: yyyy/mm/dd)} formatType
 * Example1: format2date(1489525200000) -> "2017-03-15"
 * Example2: format2date(1489525200000, 2) -> "15/03/2017"
 */
export function format2date(t, formatType = 1) {
  switch (formatType) {
    case 1:
      return dateFormat(t, 'yyyy-mm-dd');
    case 2:
      return dateFormat(t, 'yyyy/mm/dd');
  }

  return '';
}

/**
 *  将时间戳转换为日期
 * "使用Date(), 将时间戳转换转换为可读格式)."
 * @param {传入的时间戳} t
 * Example1: format2time(1489525200000) -> "05:00:00"
 * Example2: format2time(1489525200000,2) -> "05:00:00"
 */
export function format2time(t) {
  return dateFormat(t, 'HH:MM:SS');
}

/**
 * 根据日期返回星期几
 * @param {传入的日期} t
 * Example: format2week('2018-05-04') -> "Fri"
 */
export const format2week = t => {
  const realdate = format2realdate(t);
  if (realdate === '') return '';
  return ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'][realdate.getDay()];
};

/**
 * 根据日期返回星期几
 * @param {传入的日期} t
 * Example: format2weekcn('2018-05-04') -> "星期五"
 * Example: format2weekcn('2018-05-04', '周') -> "周五"
 */
export const format2weekcn = (t, pre = '星期') => {
  const realdate = format2realdate(t);
  if (realdate === '') return '';
  return pre + '日一二三四五六'.charAt(realdate.getDay());
};

export function dateymd2date(year, month, day) {
  if (typeof year !== 'string' || year === '' || isNaN(parseInt(year, 10))) return '';
  if (typeof month !== 'string' || month === '' || isNaN(parseInt(month, 10))) return '';
  if (typeof day !== 'string' || day === '' || isNaN(parseInt(day, 10))) return '';
  return dateFormat(`${year}-${month}-${day}`, 'yyyy-mm-dd');
}

export function dategap2date(dateStr) {
  const t = ('' + time).replace(/[^0-9]/ig, '');
  if (typeof t !== 'string' || t === '' || isNaN(parseInt(t, 10))) return '';

  const day = t % 100 + '';

  const month = parseInt(t / 100, 10) % 100 + '';

  const year = parseInt(t / 10000, 10) + '';

  return dateymd2date(year, month, day);
}

/**
 *  返回两个日期之间的差异 (以天为值)。
 * "计算Date对象之间的差异 (以天为单位)。"
 * @param {传入日期对象} obj
 * Example: getDaysDiffBetweenDates('2018-05-05', '2018-05-14') -> 9
 */
export const getDaysDiffBetweenDates = (dateInitial, dateFinal) => {
  const date1 = format2date(d1);
  const date2 = format2date(d2);
  if (date1 === '' || date2 === '') return '';
  return (new Date(date1) - new Date(date2)) / (1000 * 3600 * 24);
};

/**
 * 比较两个日期是否同一天
 * @param {any} d1  "2007-2-2 7:30"
 * @param {any} d2  "2007-1-31 8:30"
 * @returns Boolean
 * Example1: isSameDay('2007-2-2 7:30', '2007-1-31 8:30') -> false
 * Example2: isSameDay('2007-2-2 7:30', '2007-2-2 16:30') -> true
 */
export function isSameDay(d1, d2) {
  const diffDay = getDaysDiffBetweenDates(d1, d2);
  if (diffDay === '') return false;
  return diffDay === 0;
}

/**
 * 比较两个日期是否早于
 * @param {any} d1  较早的日期："2007-2-2 7:30"
 * @param {any} d2  较晚的日期："2007-1-31 8:30"
 * @returns Boolean
 * Example1: isBeforeDay('2007-2-2 7:30', '2007-1-31 8:30') -> false
 * Example2: isBeforeDay('2007-2-2 7:30', '2007-2-2 16:30') -> false
 * Example3: isBeforeDay('2007-1-2 7:30', '2007-2-2 16:30') -> true
 */
export function isBeforeDay(d1, d2) {
  const diffDay = getDaysDiffBetweenDates(d1, d2);
  if (diffDay === '') return false;
  return diffDay < 0;
}


/**
 * 比较两个日期是否晚于
 * @param {any} d1  较晚的日期："2007-2-2 7:30"
 * @param {any} d2  较早的日期："2007-1-31 8:30"
 * @returns Boolean
 * Example1: isAfterDay('2007-2-2 7:30', '2007-1-31 8:30') -> true
 * Example2: isAfterDay('2007-2-2 7:30', '2007-2-2 16:30') -> false
 * Example3: isAfterDay('2007-1-2 7:30', '2007-2-2 16:30') -> false
 */
export function isAfterDay(d1, d2) {
  const diffDay = getDaysDiffBetweenDates(d1, d2);
  if (diffDay === '') return false;
  return diffDay > 0;
}

/**
 * 是否早于今天
 * @param {any} d  日期："2007-2-2 7:30"
 * @returns Boolean
 * Example: isBeforeToday('2007-2-2 7:30') -> true
 */
export function isToday(d) {
  return isSameDay(d, new Date());
}

/**
 * 是否早于今天
 * @param {any} d  日期："2007-2-2 7:30"
 * @returns Boolean
 * Example: isBeforeToday('2007-2-2 7:30') -> true
 */
export function isBeforeToday(d) {
  return isBeforeDay(d, new Date());
}

/**
 * 是否晚于今天
 * @param {any} d  日期："2007-2-2 7:30"
 * @returns Boolean
 * Example: isAfterToday('2007-2-2 7:30') -> false
 */
export function isAfterToday(d) {
  return isAfterDay(d, new Date());
}


/**
 * 十位补零
 * @param num (Number)
 * @returns coverTime(0) -> '00'
 */
export const coverTime = (num) => num < 10 ? '0' + num : num;

/**
 * 获取今天的日期
 * @returns '2018-05-04'
 * Example: getToday() -> '2018-05-04'
 */
export const getToday = (format = 'yyyy-mm-dd') => {
  const now = new Date();
  return dateFormat(now, format);
};

/**
 * 获取上一个的日期,默认前1天的
 * @param {前几天的} pre
 * @returns '2018-05-04'
 * Example: getPreDay() -> '2018-05-03'
 */
export const getPreDay = (pre = 1, format = "yyyy-mm-dd") => {
  const now = new Date();
  const oneDayTime = 24 * 60 * 60 * 1000;
  const preDayTime = pre * oneDayTime;
  const preDay = new Date(now - preDayTime);
  return dateFormat(preDay, format);
};

/**
 * 获取上一周的日期,默认1周前的
 * @param {前几周的} pre
 * @returns '2018-05-04'
 * Example: getPreWeekDay() -> '2018-04-27'
 * Example: getPreWeekDay(2) -> '2018-04-20'
 */
export const getPreWeekDay = (pre = 1, format = "yyyy-mm-dd") => {
  const preWeekDays = pre * 7;
  return getPreDay(preWeekDays, format);
};

/**
 * 获取上一周的日期,默认1周前的
 * @param {前几年的} pre
 * @returns '2018-05-04'
 * Example: getPreWeekDay() -> '2018-04-27'
 * Example: getPreWeekDay(2) -> '2018-04-20'
 */
export const getPreYearDay = (pre = 1, format = "yyyy-mm-dd") => {
  const now = new Date();
  const preYears = now.getFullYear - pre;

  const preYearDay = preYears + '-' + coverTime((now.getMonth() + 1)) + '-' + coverTime(now.getDate());

  return dateFormat(preYearDay, format);
};

// /**
//  * 获取两个日期范围
//  * @param start: 开始时间(string:“2018-11-11”)
//  * @param end: 结束时间(string:“2018-11-15”)
//  * @returns 返回包含起止日期之间的所有日期的数组
//  * Example: getBetweenDateScope('2018-04-27','2018-04-29') -> ["2018-04-27", "2018-04-28", "2018-04-29"]
//  */
// export const getBetweenDateScope = (start, end) => {
//   start = format2timestamp(start); // 将日期转为时间戳
//   end = format2timestamp(end); // 将日期转为时间戳
//   let oneDay = 24 * 60 * 60 * 1000;
//   let arr = [];

//   if (start > end) throw Error('1参日期晚于2参日期');
//   for (let i = start; i <= end;) {
//     arr.push(format2date(i));
//     i += oneDay;
//   }
//   return arr;
// };

// /**
//  * 获取倒推两个时间段的日期
//  * @param count  指定几天之间, 默认是2，返回昨天和今天
//  * @param startDate  开始日期，默认是“今天”
//  * @returns targetDay:"2018-01-01", today:"2018-01-12"
//  *  Example:getDateRange(2) ->{today: "2018-05-05", targetDay: "2018-05-04"}
//  */
// export const getDateRange = (count = 2, start = getToday()) => {
//   let today = new Date(start);
//   let targetDay = new Date();
//   let oneDay = 24 * 60 * 60 * 1000;
//   today.setTime(today.getTime());
//   targetDay.setTime(targetDay.getTime() - (oneDay * (count - 1)));
//   today = format2date(today);
//   targetDay = format2date(targetDay);
//   return { today, targetDay };
// };

// /**
//  * [ 获取指定之前几个月的跨度，根据传入的参数Number，返回一个包含每个月所有日期的二维数组]
//  * @param  {[Number]} number [数字]
//  * @param  {[String]} date   [可选，日期（'2018-02-20'）]
//  * @return {[Array]}
//  *  Example:getPreMontAllDate(2) ->[ ["2018-04-01", ...., "2018-04-30"],["2018-03-01", ...."2018-03-31"]]
//  */
// export const getPreMontAllDate = (number = 0, date) => {
//   let result = [];
//   let tempDate = date || format2date(new Date());

//   for (let i = 0; i <= number; i++) {
//     let newDate = new Date(tempDate.replace(/\d+$/g, '1'));
//     let unixTemp = newDate.setMonth(newDate.getMonth() - i);
//     let tempArr = getMonthStartEnd(format2date(new Date(unixTemp)));
//     const { firstDay, lastDay } = tempArr;
//     result.push(getBetweenDateScope(firstDay, lastDay));
//   }

//   if (number > 0) {
//     result.shift();
//   }
//   return result;
// };

// /**
//  * 获取倒推几周的每个礼拜一和礼拜日
//  * @param count 传入几周就返回几周，默认是上一周
//  * @returns 返回数组
//  * Example:getPreWeeks(2)->[{monday: "2018-04-23", sunday: "2018-04-29"},{monday: "2018-04-16", sunday: "2018-04-22"}]
//  */
// export const getPreWeeks = (count = 1) => {
//   let thisWeek = 8; // 因为包含"今天"，所以第一周算8天
//   let days = [];
//   let lastWeekDays = [];

//   for (let i = 0; i < count; i++) {
//     days.push(thisWeek + 7 * i);
//   }
//   lastWeekDays = days.map(item => getDateRange(item).targetDay);
//   return lastWeekDays.map(item => {
//     const { monday, sunday } = getWeekStartEnd(item);
//     return { monday, sunday };
//   });
// };

// /**
//  * 获取当前日期所在星期的的礼拜一和礼拜日
//  * @param {string} [date='2018-01-01']  传入日期
//  * @returns  { monday, sunday } 礼拜一和礼拜日
//  * Example:getWeekStartEnd('2018-05-05')->{monday: "2018-04-30", sunday: "2018-05-06"}
//  */
// export const getWeekStartEnd = (date = '2018-01-01') => {
//   if (!date) return;
//   let now = new Date(date);
//   let nowTime = now.getTime();
//   let day = now.getDay();
//   let oneDayTime = 24 * 60 * 60 * 1000;
//   let MondayTime = nowTime - (day - 1) * oneDayTime;
//   let SundayTime = nowTime + (7 - day) * oneDayTime;
//   let monday = new Date(MondayTime); // 礼拜一
//   let sunday = new Date(SundayTime); // 礼拜日
//   monday.setTime(monday.getTime());
//   sunday.setTime(sunday.getTime());

//   monday = format2date(monday);
//   sunday = format2date(sunday);
//   return { monday, sunday };
// };

// /**
//  * 获取当月的第一天和最后一天
//  * @param {string} [date='2018-01-01']  传入日期
//  * @returns {firstDay, lastDay}  第一天和最后一天
//  * Example: getMonthStartEnd('2018-05-05')->{firstDay: "2018-05-01", lastDay: "2018-05-31"}
//  */
// export const getMonthStartEnd = (date = '2018-01-01') => {
//   let firstDay = new Date(date); // 第一天
//   let lastDay = new Date(date); // 最后一天

//   firstDay.setDate(1);
//   lastDay.setMonth(lastDay.getMonth() + 1);
//   lastDay.setDate(0);

//   firstDay.setTime(firstDay.getTime());
//   lastDay.setTime(lastDay.getTime());

//   firstDay = format2date(firstDay);
//   lastDay = format2date(lastDay);
//   return { firstDay, lastDay };
// };
