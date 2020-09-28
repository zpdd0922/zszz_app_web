import _ from 'lodash';
import { timestampToTime } from '@/modules/module-iaccount/utils/date'

export const getStatementsData = (list) => {
  if (!list) return [];
  const group = _.groupBy(list, (item) => {
    const date = _.get(item, ['date']);
    const year = timestampToTime(date, 'YYYY');
    const month = timestampToTime(date, 'MM');
    return `${year}-${month}`;
  });

  // const rem = document.documentElement.style.fontSize.replace(/[^0-9+-Ee.]|,/g, '');

  return _.reduce(_.toPairsIn(group), (re, pre) => {
    // const preLen = re.length > 0 ? re[re.length - 1][1].length : 0;
    // const preH = re.length > 0 ? re[re.length - 1][2] : 0;
    // const item = [...pre, ((re.length * 0.32) + (preLen * 0.5)) * rem + preH]; // eslint-disable-line
    // const item = [...pre, ((re.length * 0.32) + (preLen * 0.5)) * rem + preH]; // eslint-disable-line
    const item = [...pre]; // eslint-disable-line
    re.push(item);
    return re;
  }, []);
};