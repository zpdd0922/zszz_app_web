import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '個人聲明',
    nextBtn: '我確認以上申明，下一步',
    agreen: "同意",
    notAgreen: "不同意",
    isAllowProvidePrivacy: {
        title: "個人資料用於直接促銷聲明",
        tips: "查看更多 >",
        tipsContent: "本人謹此承認並確定已獲得按照本人所選語言（中文或英文）的個人資料（私隱）條例有關收集及使用個人資料用於直接促銷的通知並獲得其解釋，以及本人已獲邀請細閱該通知，提出問題及如有意願，徵求獨立意見。本人確認已經保留該通知副本乙份，以作備考之用。本人：",
        content: `${customizeI18n.customize.company.securityName}將本人之個人資料被使用作該通知列明的直接促銷用途。`,
        // content:`本人的個人資料被${customizeI18n.customize.company.securityFullName}及其聯繫公司使用作該通知列明的直接促銷用途。`,
    },
    northTrade: {
        title: "北向交易聲明",
        tips: "查看更多 >",
        tipsContent: `本人確認本人已閱讀並了解個人資料收集用於中華通北向交易的內容。通過勾選以下的方框及簽署，本人：`,
        content: `${customizeI18n.customize.company.securityName}將本人之個人資料用於個人資料收集聲明所載的目的。`,
    },
    // fatca: {
    //   title:"FATCA聲明",
    //   tips:"收集及使用個人資料用於直接促銷聲明",
    //   tipsContent: `本人確認為美國國家稅務局定義之美國人士。`,
    //   content: `本人確認及保證本人並非美國國家稅務局定義之美國人士。`,
    // },
    tax: {
        title: "稅務信息",
        taxCn: '中國大陸',
        taxHk: '中國香港',
        add: "添加新的稅務信息",
        remove: "刪除上個稅務信息",
        tips: '警告：根據《稅務條例》第80(2E)條，如任何人在作出自我證明時，在明知壹項陳述在要項上屬具誤導性、虛假或不正確，或罔顧壹項陳述是否在要項上屬具誤導性、虛假或不正確下，作出該項陳述，即屬犯罪。壹經定罪，可處第3級（即港幣$10,000）罰款。有關定罪及處罰按不時修訂的法例為準。',
        min:'最少填報1個稅務信息',
        max:'最多填報5個稅務信息',
        countryKey: {
            label: '司法管轄區',
            placeholder: '請輸入司法管轄區'
        },
        privacyNum: {
            label: '稅務編號',
            placeholder: '請輸入稅務編號',
            canOffer: '能提供編號',
            cannotOffer: '不能提供編號',
            reasonA: '理由A：帳戶持有人的居留司法管轄區並沒有向其居民發出稅務編號。',
            reasonB: '理由 B：帳戶持有人不能取得稅務編號。如選取這壹理由，解釋帳戶持有人不能取得稅務編號的原因。',
            reasonBPlaceholder: '請輸入理由，200字以內',
            reasonC: '理由 C : 帳戶持有人毋須提供稅務編號。居留司法管轄區的主管機關不需要帳戶持有人披露稅務編號。',
        }
    },
}