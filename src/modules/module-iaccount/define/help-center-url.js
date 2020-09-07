/* eslint-disable */
/**
 * 帮助中心 相关链接(H5地址)
 *
 */
const getHelpUrl = (detailId) => {
  if (typeof detailId === 'undefined') return ''

  return window.HOST_URL + `/webstatic/helpCenter1/help.html#detail-${detailId}.html`
}

// 香港卡办理
export const REQUEST_HK_CARD_LINK = getHelpUrl(303);

// 民生银证转账_首次
export const CMBC_DEPOSIT_FIRST = getHelpUrl(401);

// 民生银证转账_指引
export const CMBC_DEPOSIT_HOW = getHelpUrl(406);

// 招商永隆银行银证转账_指引
export const CMB_WLB_DEPOSIT_HOW = getHelpUrl(593);

// 民生_出金
export const CMBC_WITHDRAW_HOW = getHelpUrl(455);

// 支票转账
export const CHECK_DEPOSIT_LINK = '';

// FPS
export const FPS_DEPOSIT_LINK = getHelpUrl(456);