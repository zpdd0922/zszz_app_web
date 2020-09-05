import { toDBC } from '@/main/utils/format/formatter';
import { professionCodeValue } from '../../views/online-hk/step-info-contact/options-list'
import { bankValue } from "../../views/online-hk/step-bank-card/bankList";

import {
  companyAddress,
  familyAddress,
  contactAddress,
  capitalSourceNew,
  propertyType,
  contactDetailType,
  companyNameSplit,
  familyNameSplit,
  contactNameSplit,
  familyPhone,
  contactPhone,
  companyPhoneNumber,
  otherCompanyRepublic,
  otherFamilyRepublic,
  otherContactRepublic
} from './contact';

import { taxInformation } from './tax';
import { otherDisclosure } from './other';
import { nationalFormat } from './national';
import { companyRepublicNameFunc, familyRepublicNameFunc, contactRepublicNameFunc } from './address';
import { formatPassportStartDate, formatPassportEndDate } from './common';
import { accountMarkets } from '../common/formatAccountType';

import UserAge from '@/main/utils/common/ua-info';

export const formatCommitData = (args, normalData = {}) => {
  // 用户基本数据
  const userCommonInfo = {
    // isBankrupted: 0, // TODO: 你是否曾经破产或被送达要将你破产的申请[0、否   1是]
    openAccountType: 1,
    // language: 1, // TODO:添加语言
    openAccountAccessWay: 1,

    // phoneNumber: toDBC(args.bankPhoneNum), // 手机号 TODO,缓存数据没有手机号码~~~！！！！
  };

  const accountMkts = accountMarkets(args);

  // 账户选择数据： 
  // TODO:检查是否有异常导致提交不了？
  const selectAccount = {
    // 固定数据
    accountType: 1, // 账户类型[0、未知  1、个人账户  2、联名账户   3、公司账户]
    optionsAccUsageScenarios: 1, //证券交易使用场景 [1、互联网交易（默认）   2、全权委托交易]
    futuresAccUsageScenarios: 1, //期货交易使用场景 [1、互联网交易（默认）  2、全权委托交易]

    fundAccountType: args.fundAccountType, // 账户类型 1：现金账户 2：融资账户
    isOpenHkStockMarket: Number(accountMkts.includes(1)), // 港股交易 1 同意 or 0 不同意
    isOpenUsaStockMarket: Number(accountMkts.includes(2)) || 0, // 美股交易 1 同意 or 0 不同意
    isOpenOptions: Number(args.isOpenOptions), //是否开通期权 [0、不同意    1、同意]
    isOpenFutures: Number(args.isOpenFutures),//是否开通期货 [0、不同意    1、同意]

    accountTypeRemarks: '',//账户类型备注
  }

  // 用户身份信息
  const idCardInfo = {
    nationality: nationalFormat(args), // 国籍  0 中国大陆 1 中国香港 2 其他地区
    otherNationality: args.nationality === '2' ? args.otherNationality : '',
    idKind: args.idKind, // 证件类型[0=未知 1=大陆居民身份证 2=香港居民身份证 3=护照 4=驾驶证]
    clientName: toDBC(args.cnNameValue), // 中文名
    familyName: toDBC(args.familyName), // 中文姓氏
    givenName: toDBC(args.givenName), // 中文名字
    clientNameSpell: args.enNameValue && toDBC(args.enNameValue.toUpperCase()), // 英文名（大写）
    familyNameSpell: toDBC(args.familyNameSpell), // 英文姓氏
    givenNameSpell: toDBC(args.givenNameSpell), // 英文名字
    idNo: toDBC(args.idCardValue), // 身份证号码
    birthday: args.birthday, // 生日
    sex: args.sex, // 性别（0，男 1， 女）
    idCardAddress: toDBC(args.addressValue), // 身份证地址
    idCardValidDateStart: args.dateStartValue, // 生效日期
    idCardValidDateEnd: args.dateEndValue, // 失效日期
    maritalStatus: args.maritalStatus, //婚姻状况[1=未婚 2=已婚 3=离婚 4=鳏寡]
    placeOfBirth: nationalFormat(args),
    countryOfBirth: nationalFormat(args),
  };

  // 银行卡信息 - 产品v1.7 去除香港银行卡表单信息
  const bankInfo = {
    bankType: 0, // 银行账户类型 [0-香港账户 1-非香港帐号]
    bankId: args.bankId, // 银行代号（未进行银行卡号强校验）
    bankNo: args.bankNum, // 银行卡号
    otherBankName: args.bankId === bankValue.OTHERS ? args.otherBankName : "", // 选择其他香港银行输入的名称
    bankAccountName: args.bankUserName, // 银行户名
    bankCurrency: args.bankCurrency // 银行币种类型 [0-綜合賬戶 1-港幣賬戶 2-美元賬戶 3-人民币账户]
  };

  // 联系信息
  const infoContact = {
    email: toDBC(args.email.trim()), // 邮箱地址
    educationLevel: args.educationLevel, // 教育程度[0、未知  1、小学   2、中学   3、专上学院   4、大学或以上]
    dStatementReceiveMode: args.dStatementReceiveMode, // 日结单及月结单发送方式[0、未知  1、电子邮箱  2、邮寄到住宅地址  3、邮寄到营业地址]

    // 家庭住址
    familyRepublicName: familyRepublicNameFunc(args), // 住宅地址的国家
    otherFamilyRepublic: otherFamilyRepublic(args), // 住宅地址的国家(其它填写内容)
    familyProvinceName: familyNameSplit(args, 0), // 住址省份
    familyCityName: familyNameSplit(args, 1), // 住址城市
    familyCountyName: familyNameSplit(args, 2), // 住址区域
    familyDetailAddress: toDBC(args.homeAddressDetail + args.homeAddressNumber), // 住址地址详细
    familyAddress: toDBC(familyAddress(args)), // 住址地址（包括省市区+详细地址）
    familyPhone: familyPhone(args), // 住址电话


    // 公司住址
    // companyRepublicName: companyRepublicNameFunc(args), // 公司地址的国家
    // otherCompanyRepublic: otherCompanyRepublic(args), // 公司地址的国家(其它填写内容)
    // companyProvinceName: companyNameSplit(args, 0), // 公司省份
    // companyCityName: companyNameSplit(args, 1), // 公司城市
    // companyCountyName: companyNameSplit(args, 2), // 公司区域
    // companyDetailAddress: toDBC(args.companyAddressDetail), // 公司地址详细
    // companyAddress: toDBC(companyAddress(args)), // 公司地址（包括省市区+详细地址）

    // 通讯地址 可选家庭住址/公司住址/单独提供(contactAddress方法处理)
    contactAddress: toDBC(contactAddress(args)), // 通讯地址

    addressType: args.contactRadio, // 地址类型
    contactRepublicName: contactRepublicNameFunc(args), // 联系地址的国家
    otherContactRepublic: otherContactRepublic(args), // 联系地址的国家(其它填写内容)
    contactProvinceName: contactNameSplit(args, 0), // 通讯地址省份
    contactCityName: contactNameSplit(args, 1), // 通讯地址城市
    contactCountyName: contactNameSplit(args, 2), // 通讯地址区域
    contactDetailAddress: toDBC(contactDetailType(args)), // 通讯地址详细
    phoneNumber: contactPhone(args), // 住址电话

    // 通讯地址(新)
    // familyAddress: args.contactAddress,
    // contactAddress: args.contactAddress,

    // 職業信息
    professionCode: args.professionCode === 'OTH' ? 7 : args.professionCode, // 职业类型
    otherProfession: args.professionCode === 'OTH' ? args.professionCodeOther : '', // 其它职业类型
    companyName: toDBC(args.companyName), // 公司名称
    companyAddress: args.companyAddress,
    companyPhoneNumber: companyPhoneNumber(args), // 办公室电话
    industryRange: args.industryRange, // 所属行业
    workingSeniority: args.workingSeniority, // 从业年限[0、未知  1、1-2年   2、2-5年   3、5-10年   4、>10年]
    jobPosition: args.jobPosition, // 职位级别
    freelanceCode: 0,//自由职业细化类型
    freelanceOther: args.professionCode === 'OTH' ? args.professionCodeOther : '',// 自由职业
  };

  const infoDisclosure = {
    otherDisclosure: otherDisclosure(args), // 身份資料申報
  };

  // 个人申明
  const infoDeclare = {
    isAllowProvidePrivacy: Number(args.isAllowProvidePrivacy), // 同意 or 不同意
    northTrade: Number(args.northTrade), // 北向交易 同意 or 不同意
    taxationInfo: taxInformation(args), // 个人税务列表
    fatca: args.isNotUsGreenCardHolder //是否是美国居民[1=不是 2=美国出生但不是 3=是美国人]
  };

  // 资产相关信息
  // TODO: 投资目标选择其他的逻辑处理
  const infoFinance = {
    annualIncome: args.income, // 年收入
    investmentHorizon: args.investmentHorizon || 0, // 投資年期
    propertyType: propertyType(args), // 财产种类（净资产）
    capitalSource: capitalSourceNew(args), // 资金来源
    investTarget: [args.investTarget], // 投资目标
    investTargetOther: args.investTargetOther,// 其他投资目的
    // investTargetOther: args.investTarget.includes('4') && args.investTargetOther ? args.investTargetOther : '', // 其他投资目标
    residence: args.residence, //住宿选项 [0=无 1=租用物业 2=自制物业 3=按揭物业 4=公司宿舍 5=与家人同住 6=其他]
    otherResidence: args.residenceOther, // 住宿其他描述

    isTradedDerivativeProducts: args.derivative, // 衍生产品交易
    isKnowDerivativeProducts: args.derivative, // 是否了解衍生产品

    // 是否衍生产品学习
    // TODO: 原数据设计为二级选择学习方法
    derivativeProductsStudyType: args.derivative ? Number(args.derivativeCourse) : '',
    derivativeProductsStudyTypeOther: '',

    // 是否在金融机构工作经验
    // TODO: 原数据设计为二级选择经验说明
    financingInstitutionWorkExperienceType: args.derivative ? Number(args.derivativeIndustry) : '',
    financingInstitutionWorkExperienceTypeOther: '',

    // 是否在过去三年曾买卖过至少五次任何衍生产品的交易
    isTradedDerivativeProducts: args.derivative ? Number(args.derivativeTrade) : 0,
  };

  const infoExperience = {
    stocksInvestmentExperienceType: args.stocksInvestmentExperience, // 股票投资经验
    warrantsInvestmentExperienceType: args.warrantsInvestmentExperience, // 认证股权经验
    futuresInvestmentExperienceType: args.futuresInvestmentExperience, // 期货投资经验
    optionsExperience: args.optionsExperience,   // 期权投资经验 [0、未知 1、没有  2、<1年   3、 1-2年   4、>2年]
    ccbcExperience: args.CCBCExperience, //牛熊证投资经验
    unitTrustsExperience: args.unitTrustsExperience || 0, // 单位信托基金/互惠基金[0、未知 1、没有  2、<1年   3、 1-2年   4、>2年]
    otherProductsExperience: args.otherProductsExperience,   //其它投资产品 [0、未知  1、<10年  2、10-40年   3、 >40年]
    otherProductsName: args.otherProductsExperience && args.otherProductsExperience !== 0 ? args.otherProductsName : '', // 其它投资产品名称

    // TODO:互斥條件處理？？
    // tradeWarrantsFrequency: args.tradeWarrantsFrequency,   // //认股证交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
    // tradeStockFrequency: args.tradeStockFrequency,//股票交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
    // tradeOptionsFrequency: args.tradeOptionsFrequency, //期权交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
    // tradeFuturesFrequency: args.tradeFuturesFrequency, //期货交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
    // tradeUnitTrustsFrequency: args.tradeUnitTrustsFrequency, //单位信托基金/互惠基金交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
    // tradeOtherProductsFrequency: args.tradeOtherProductsFrequency, //其它投资产品交易频率次/年 [0、未知 1、<10  2、10-40   3、 >40]
  };


  // 数据汇总
  const formData = {
    ...userCommonInfo,
    ...selectAccount,
    ...idCardInfo,
    ...bankInfo,
    ...infoContact,
    ...infoDisclosure,
    ...infoDeclare,
    ...infoFinance,
    ...infoExperience,
  };

  // 需要单独增加字段（基本上都是一些写死的数据  方便以后拓展用）
  const normal = {
    openType: 3, // 1、线上预约开户，2、香港预约开户，2、线下（开户宝）
    ...normalData,
  };

  const data = {
    ...normal,
    info: JSON.stringify(formData),
  };
  return data;
  // return formData
};
