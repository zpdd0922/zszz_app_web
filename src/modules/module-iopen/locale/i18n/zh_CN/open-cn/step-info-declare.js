import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '个人声明',
    nextBtn: '我确认以上申明，下一步',
    agreen: "同意",
    notAgreen: "不同意",
    isAllowProvidePrivacy: {
        title: "个人资料用于直接促销声明",
        tips: "查看更多 >",
        tipsContent: "本人谨此承认并确定已获得按照本人所选语言（中文或英文）的个人资料（隐私）条例有关收集及使用个人资料用于直接促销的通知并获得其解释，以及本人已获邀请细阅该通知，提出问题及如有意愿，征求独立意见。本人确认已经保留该通知副本一份，以作备考之用。本人：",
        content: `${customizeI18n.customize.company.securityName}将本人之个人资料被使用作该通知列明的直接促销用途。`,
        // content:`本人的个人资料被${customizeI18n.customize.company.securityFullName}及其联系公司使用作该通知列明的直接促销用途。`,
    },
    northTrade: {
        title: "北向交易声明",
        tips: "查看更多 >",
        tipsContent: `本人确认本人已阅读并了解个人资料收集用于中华通北向交易的内容。通过勾选以下的方框及签署，本人：`,
        content: `${customizeI18n.customize.company.securityName}将本人之个人资料用于个人资料收集声明所载的目的。`,
    },
    // fatca: {
    //   title:"FATCA声明",
    //   tips:"收集及使用个人资料用于直接促销声明",
    //   tipsContent: `本人确认为美国国家税务局定义之美国人士。`,
    //   content: `本人确认及保证本人并非美国国家税务局定义之美国人士。`,
    // },
    tax: {
        title: "税务信息",
        taxCn: '中国大陆',
        taxHk: '中国香港',
        add: "添加新的税务信息",
        remove: "删除上个税务信息",
        tips: '警告：根据《税务条例》第80(2E)条，如任何人在作出自我证明时，在明知壹项陈述在要项上属具误导性、虚假或不正确，或罔顾壹项陈述是否在要项上属具误导性、虚假或不正确下，作出该项陈述，即属犯罪。壹经定罪，可处第3级（即港币$10,000）罚款。有关定罪及处罚按不时修订的法例为准。',
        min:'最少填报1个税务信息',
        max:'最多填报5个税务信息',
        countryKey: {
            label: '司法管辖区',
            placeholder: '请输入司法管辖区'
        },
        privacyNum: {
            label: '税务编号',
            placeholder: '请输入税务编号',
            canOffer: '能提供编号',
            cannotOffer: '不能提供编号',
            reasonA: '理由A：账户持有人的居留司法管辖区并没有向其居民发出税务编号。',
            reasonB: '理由 B：账户持有人不能取得税务编号。如选取这壹理由，解释账户持有人不能取得税务编号的原因。',
            reasonBPlaceholder: '请输入理由，200字以内',
            reasonC: '理由 C : 账户持有人毋须提供税务编号。居留司法管辖区的主管机关不需要账户持有人披露税务编号。',
        }
    },
}