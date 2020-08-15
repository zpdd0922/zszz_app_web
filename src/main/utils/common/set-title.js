/*
 * @Author: Jim
 * @Date: 2019-12-16 17:41:56
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:16:41
 * @Description:
 */
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';
import _ from 'lodash';

const envConfig = window._GLOBAL_ENV_CONFIG || {};

function setTitle(title, isShare) {
  const preTitle = _.get(envConfig, 'preTitle', '');
  let t = title;
  if (preTitle.length) t = `${preTitle}-${title}`;
  document.title = t;
  BroadCast.send(BROADCAST_ENUMS.UPDATE_TITLE, {
    title: t
  });
}

export default setTitle;
