import { post, postRegister } from '../request';

export default {
  needCaptcha: data => post('capt/needCaptcha', data),
  /**
   * 发送短信验证码
   *
   * @param certType 默认类型 --> 手机：0
   * @param certCode 手机号码
   * @param type 验证码类型
   *
   * @return JSON { code: integer, message: string, result: {eventId}}
   */
  fetchCaptcha: data => post('/user_api/reg_valcode', data, data.certCode),
  /**
   * 登录
   *
   * @param certType 类型
   * 0-其他系统账号 
   * 1-手机 
   * 2-邮箱 
   * 3-用户账号 
   * 4-交易账号
   * @param certCode 账号/手机
   * @param passwordType 密码类型 0-其他 | 1-验证码 | 2-密码
   * @param password 密码 | 验证码 | 第三方登录凭证
   * @param captchaId 验证码Id
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  login: data => post('/user_api/user_login', data, data.certCode),

  /**
   * 登出
   *
   * @return JSON { code: integer, message: string, result: {} }
   */
  logout: () => post('/sign/logout'),

  register: data => postRegister('/user_api/user_register', data),
};
