import { getLocal } from '../request';

export default {
  /**
   * 获取资讯详情
   *
   * @param newsId 
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  // fetchDocDetail: data => post('/common_api/fetch_document', data),
  fetchDocDetail: (key, lang) => getLocal(key, lang),
  fetchDocList: ( lang) => getLocal('a_list', lang),
};
