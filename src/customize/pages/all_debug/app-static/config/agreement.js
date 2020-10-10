(function (window) {
    var Global_Config = window._GLOBAL_CONFIG || {};

    var Global_Config_Agreements = Global_Config.agreements = {};
    Global_Config_Agreements.zh_CN = {
        list: [
            { content: '证券协议的一般条款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=general_terms&lang=zh_CN" },
            { content: '保证金账户风险披露', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=disclosure_margin&lang=zh_CN" },
            { content: '衍生产品交易风险披露', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=disclosure_derivative&lang=zh_CN" },
            { content: '关于证券交易的风险披露声明及免责条款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=sec_trade&lang=zh_CN" },
            { content: '关于中华通之下的北向证券交易服务之附加条款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=north_terms&lang=zh_CN" },
            { content: '客户款项常设授权', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=standing_auth&lang=zh_CN" },
            { content: '隐私保护政策', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=privacy_policy&lang=zh_CN" },
            { content: '电子认证服务协议', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=ca_auth&lang=zh_CN" },
        ]
    };
    Global_Config_Agreements.zh_HK = {
        list: [
            { content: '證券協議的一般條款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=general_terms&lang=zh_CN" },
            { content: '保證金帳戶風險披露', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=disclosure_margin&lang=zh_CN" },
            { content: '衍生產品交易風險披露', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=disclosure_derivative&lang=zh_CN" },
            { content: '關於證券交易的風險披露聲明及免責條款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=sec_trade&lang=zh_CN" },
            { content: '關於中華通之下的北向證券交易服務之附加條款', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=north_terms&lang=zh_CN" },
            { content: '客戶款項常設授權', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=standing_auth&lang=zh_CN" },
            { content: '隱私保護政策', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=privacy_policy&lang=zh_CN" },
            { content: '電子認證服務協議', href: window._GLOBAL_ENV_CONFIG.webAgreement + "?key=ca_auth&lang=zh_CN" },
        ]
    };

    window._GLOBAL_CONFIG = Global_Config;
})(window);
