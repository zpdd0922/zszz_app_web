import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '身份披露',
    nextBtn: '下一步',
    other: {
        declareTitle: '身份资料申报',
        greenCardTitle: '美国居民身份申报',
        isAccountOwner: '本人是该账户之最终实益拥有人。',
        otherOwnerName: '姓名',
        otherOwnerCardType: '证件类型',
        otherOwnerCardTypeOptions: ['身份证', '护照'],
        otherOwnerCardNum: '证件号码',
        otherOwnerAddress: '联系地址',

        isAccountManager: '本人是该账户之最初负责发出交易指示的人士。',
        otherManagerName: '姓名',
        otherManagerCardType: '证件类型',
        otherManagerCardTypeOptions: ['身份证', '护照'],
        otherManagerCardNum: '证件号码',
        otherManagerAddress: '联系地址',

        // isNotOurStaff: `本人不是${customizeI18n.customize.company.securityFullName}及其联系公司的董事、雇员或持牌代表。`,
        // ourStaffJob: '职位',

        isNotOurStaffKin: `本人与${customizeI18n.customize.company.securityFullName}及其关联公司之董事/员工无关。`,
        ourStaffKinName: '董事/员工',
        ourStaffKinRelation: '与本人关系',

        // isNotExchangeParter: '本人不是任何证券或期货交易所的注册人士或参与者，不受任何政府或监管机构所规管或监管。',
        // exchangeParterName: '监管机构名称',
        // exchangeParterNation: '国家地区',

        isNotHkexParterStaff: '本人不是香港证券及期货事务监察委员会的持牌或注册人士，或任何持牌或注册机构的董事、员工、代表或代理人。',
        hkexParterName: '姓名',
        hkexParterCENo: '中央编号',
        // hkexParterCompany: '公司名称',
        // hkexParterStaffJob: '职位',

        isNotConsortWithMargin: `本人的配偶不是${customizeI18n.customize.company.securityFullName}的保证金客户。`,
        withMarginName: '姓名',
        withMarginAccount: '账号',

        isNotBOorPG: `本人及本人的配偶不是${customizeI18n.customize.company.securityFullName}其他保证金账户的实际拥有人或担保人`,
        otherBOorPGAccountName: '账户名称',
        otherBOorPGAccountNumber: '账户号码',

        isNotConsortWithOtherMargin: `本人及本人的配偶没有${customizeI18n.customize.company.securityFullName}任何保证金客户中控制其百分之三十五或以上股权或表决权。`,
        withOtherMarginName: '姓名',
        withOtherMarginAccount: '账号',
        
        usGreenCardCode: '美国纳税人识别号码',
        
        // isNotCompanyController: '本人不是任何上市公司的董事、首席执行官或主要股东。',
        // companyControllerName: '公司/机构名称',
        // companyControllerJob: '职位',
        // companyControllerExchange: '交易所/市场',
        // companyControllerCode: '股份代码',
        
        isAccountOwnerAlert: `${customizeI18n.customize.company.securityName}暂不支持非本证券账户之最终实益拥有人提供线上开户业务。`,
        isAccountManagerAlert: `${customizeI18n.customize.company.securityName}暂不支持非本证券账户之最初负责发出交易指示的人士提供线上开户业务。`,
        // isNotOurStaffAlert: `${customizeI18n.customize.company.securityName}暂不支持本公司及其联系公司的董事、雇员或持牌代表提供线上开户业务。`,
        isNotOurStaffKinAlert: `${customizeI18n.customize.company.securityName}暂不支持本公司及其联系公司之董事/员工的直系家庭成员提供线上开户业务。`,
        // isNotExchangeParterAlert: `${customizeI18n.customize.company.securityName}暂不支持对证券或期货交易所的注册人士或参与者提供线上开户业务。`,
        isNotHkexParterStaffAlert: `${customizeI18n.customize.company.securityName}暂不支持对香港证券及期货事务监察委员会的持牌或注册人士，或任何持牌或注册机构的董事、员工、代表或代理人提供线上开户业务。`,
        // isNotCompanyControllerAlert: `${customizeI18n.customize.company.securityName}暂不支持对上市公司的董事、首席执行官或主要股东提供线上开户业务。`,
        isNotConsortWithMarginAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户之配偶提供线上开户业务。`,
        isNotPOorBGAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户实际拥有人或者担保人提供线上开户业务。`,
        isNotConsortWithMarginOtherAlert: `${customizeI18n.customize.company.securityName}暂不支持对本公司保证金客户中控制其百分之三十五或以上股权或表决权之人士及其配偶提供线上开户业务。`,
        isNotUsGreenCardHolderAlert: `${customizeI18n.customize.company.securityName}暂不支持对美国居民或美国税务居民提供线上开户业务。`,
        inputPlaceholder: '请输入',
        selectPlaceholder: '请选择',
        add: '继续添加',
        remove: '删除上条',

        isNotUsGreenCardHolder: {
            title: '请选择下列选项之一：',
            usGreenCardHoldStatusOptions: {
                greenCardHolder: '本人就课税目的而言为美国公民或美国居民。',
                notAmericanBornInUS: '本人在美国出生但不再属于美国公民，原因是本人自愿放弃本人的公民身份，并以美国【丧失原有国籍证明】为凭证。',
                notGreenCardHolder: '本人就课税目的而言不是美国公民或者美国居民。'
            },

        }
    },
    warn: {
        info: '请填写正确格式的信息',
        lengthCommon: '此项最多填写',
        lengthUnit: '条',
    }
};