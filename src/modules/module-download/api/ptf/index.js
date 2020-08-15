import { post } from '../request';

export default {
  /**
   * 获取资讯详情
   *
   * @param newsId 
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  fetchPtfNoteList: data => post('/ptf_api/get_ptf_note', data),
  fetchPtfNoteInfo: data => post('/ptf_api/get_note_info', data),
 
};
