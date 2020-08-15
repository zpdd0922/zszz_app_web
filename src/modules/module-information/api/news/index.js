import { post } from '../request';

export default {
  /**
   * 获取资讯详情
   *
   * @param newsId 
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  fetchNewsDetail: data => post('/mktinfo_api/fetch_news_detail', data),
 
};
