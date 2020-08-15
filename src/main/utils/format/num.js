/**
 * Created by fighterzhou on 2018/4/11.
 */
import { Decimal } from 'decimal.js';

export function getCelNum(number) {
  const num = number || 0;
  return Decimal.isDecimal(num) ? new Decimal(0) : new Decimal(num);
}

export function plus(a, b) {
  return Decimal.add(getCelNum(a), getCelNum(b)).toNumber();
}

export function minus(a, b) {
  return getCelNum(a).minus(getCelNum(b)).toNumber();
}

export function mul(a, b) {
  return Decimal.mul(getCelNum(a), getCelNum(b)).toNumber();
}

export function div(a, b = 1) {
  return Decimal.div(getCelNum(a), getCelNum(b)).toNumber();
}

export function gt(a, b) {
  return getCelNum(a).gt(getCelNum(b));
}

export function gte(a, b) {
  return getCelNum(a).gte(getCelNum(b));
}

export function equals(a, b = 0) {
  return getCelNum(a).equals(getCelNum(b));
}

export function formatNum(number, decimals = 2, roundType = '') {
  const num = getCelNum(number);
  const pre = getCelNum(decimals).toNumber();

  let n = num.toFixed(pre).valueOf();

  if (roundType === 'ceil') {
    n = num.toFixed(pre, Decimal.ROUND_UP).valueOf();
  }

  if (roundType === 'floor') {
    n = num.toFixed(pre, Decimal.ROUND_DOWN).valueOf();
  }

  return n.valueOf();
}

export function formatMoney(number, decimals = 2, roundType = '') {
  const num = (`${number}`).replace(/[^0-9+-Ee.]|,/g, '');

  const n = formatNum(num, decimals, roundType);

  const s = n.split('.');
  const re = /(-?\d+)(\d{3})/;
  while (re.test(s[0])) {
    s[0] = s[0].replace(re, '$1' + ',' + '$2'); // eslint-disable-line
  }

  return s.join('.');
}

export function formatNumber(n) {
  return Number(n);
}

export function formatMaxNum(number, decimals = 2, roundType = '') {
  const num = (`${number}`).replace(/[^0-9+-Ee.]|,/g, '');

  const n = formatNum(num, decimals, roundType);

  if (gt(n, 100000000)) {
    return `${formatNumber(formatNum(div(n, 100000000), decimals, roundType))}亿`;
  }

  // if (gt(n, 10000000)) {
  //   return `${formatMoney(div(n, 10000000), decimals, roundType)}千万`;
  // }

  // if (gt(n, 1000000)) {
  //   return `${formatMoney(div(n, 1000000), decimals, roundType)}百万`;
  // }

  // if (gt(n, 100000)) {
  //   return `${formatMoney(div(n, 100000), decimals, roundType)}十万`;
  // }

  if (gt(n, 10000)) {
    return `${formatNumber(formatNum(div(n, 10000), decimals, roundType))}万`;
  }
  // if (gt(n, 1000)) {
  //   return `${formatMoney(div(n, 1000), decimals, roundType)}千`;
  // }

  return `${formatNumber(formatNum(div(n, 1), decimals, roundType))}`;
}
