import { post } from '../request';

export default {
  /**
   * 是否登录
   *
   * @return JSON/Boolean
   */
  // checkLogin: data => post('/user_api/is_login', data),

  /**
   * 登录
   *
   * @param certCode 犇犇号/手机
   * @param pwd 密码
   * @param invUserId int 推荐人id,默认：1
   * @param captcha 验证码
   * @param sourceCode 活动渠道
   * @param certType 类型
   * 0 手机 | 1 邮箱 | 2 微信APP openId
   * 3 微博 | 4 QQ   | 5 微信uniconid
   * 6 微信公众号 |  7 交易账号 | 8 犇犇号
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  login: data => post('/user_api/login', data, data.certCode),

  /**
   * 登出
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  logout: () => post('/user_api/loginOut'),

  /**
   * 是否需要图形验证码
   *
   * @return JSON { code: integer, message: string, result: true/false}
   */
  needCaptcha: data => post('/capt/needCaptcha', data),

  /**
   * 注册
   *
   * @param certCode 手机号码
   * @param certType --> 0：手机
   * @param pwd 登录密码
   * @param captcha  验证码
   * @param eventId    验证码相关ID
   * @param userSourceChannelId  用户注册来源ID
   * @param invUserId  邀请人
   * @param regSourceType  注册来源
   * @param regSource  渠道
   * @param sourceCode  活动渠道
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  register: data => post('/user_api/register', data, data.certCode),

  /**
   * 检查手机号码是否可用
   *
   * @param phoneNum 新手机号码
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  checkMobile: data => post('/user_api/valid_phone', data),

  /**
   * 发送短信验证码
   *
   * @param certType 默认类型 --> 手机：0
   * @param phoneNum 手机号码
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  fetchCaptcha: data => post('/user_api/fetch_captcha', data),

  /**
   * 检查验证码是否可用
   *
   * @param phoneNum 手机号码
   * @param eventId  验证码相关ID
   * @param captcha  验证码
   * @param certType 默认类型 --> 手机：0
   *
   */
  checkCode: data => post('/user_api/repeat_valid_captcha', data),

  /**
   * 更换手机 --> 绑定手机
   *
   * @param phoneNum 新手机号码
   * @param certType 默认类型 --> 手机：0
   * @param captcha  验证码
   * @param pwd      登录密码
   * @param eventId   验证码相关ID
   * @param requestSrc  请求来源 --> 'H5':'APP'
   * @param sessionId  用户状态ID
   *
   * @return JSON { code: integer, message: string, result: {}}
   */
  updateMobile: data => post('/user_api/update_user_phone_num', data),

  /**
   * 修改登录密码
   *
   * @param pwd 旧密码
   * @param newPwd 新密码
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  updatePassword: data => post('/user_api/update_pwd', data),

  /**
   * 修改交易密码
   *
   * @param pwd 旧密码
   * @param newPwd 新密码
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  updateTradePassword: data => post('/user_api/update_trade_pwd', data),

  /**
   * 获取用户渠道类别
   * @method POST/JSON user_api/find_chl_skip
   * @return JSON { code: integer, message: string, result }
   */
  getUserType: data => post('/user_api/find_chl_skip', data),

  /**
   * 忘记密码 --> 重置登录密码
   *
   * @param phoneNum 手机号码
   * @param captcha 验证码
   * @param newPwd 新密码
   * @param eventId   验证码相关ID
   */
  resetPassword: data => post('/user_api/user_back_pwd', data)
}
