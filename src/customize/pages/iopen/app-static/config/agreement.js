(function (window) {
    var Global_Config = window._GLOBAL_CONFIG || {};

    var Global_Config_Agreements = Global_Config.agreements = {};
    Global_Config_Agreements.zh_CN = {
        list: [
            { content: '客戶須知', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '證券交易委託風險揭示書', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '風險披露聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '個人資料（隱私）條例', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '客戶聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '個人稅收居民身份聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: 'W-8BEN表格', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '中華通北向交易個人資料收集聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
        ]
    };
    Global_Config_Agreements.zh_HK = {
        list: [
            { content: '客戶須知', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '證券交易委託風險揭示書', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '風險披露聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '個人資料（隱私）條例', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '客戶聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '個人稅收居民身份聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '電子認證服務協議', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: 'W-8BEN表格', href: window._GLOBAL_ENV_CONFIG.webAgreement },
            { content: '中華通北向交易個人資料收集聲明', href: window._GLOBAL_ENV_CONFIG.webAgreement },
        ]
    };

    window._GLOBAL_CONFIG = Global_Config;
})(window);
