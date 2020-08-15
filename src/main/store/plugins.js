/*
 * @Author: Jim
 * @Date: 2019-12-17 13:17:12
 * @LastEditors  : Jim
 * @LastEditTime : 2019-12-18 15:16:53
 * @Description:
 */
import BroadCast, { BROADCAST_ENUMS } from '@/main/utils/common/broadcast';

function fetchPlugin(store) {
  BroadCast.onmessage(BROADCAST_ENUMS.UPDATE_FETCH_STATUS, ({ isFetching = false }) => {
    store.commit('updateLoadingStatus', { isLoading: isFetching });
  });
};

export default ([fetchPlugin]);
