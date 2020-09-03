import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '投資概況',
    finance: {
        title: '財務狀況',
        income: {
            label: '年收入', placeholder: '請選擇年收入', options: {
                ltTwentyK: '<20萬港幣',
                twentyToFiftyK: '20~50萬港幣',
                fiftyToOneHundredK: '50~100萬港幣',
                mtOneHundredK: '>100萬港幣',
            }
        },
        totalAssets: {
            label: '總淨資產', placeholder: '總淨資產', options: {
                ltOneMillion: '<100萬港幣',
                oneToFiveMillion: '100~500萬港幣',
                fiveToTenMillion: '500~1000萬港幣',
                mtTenMillion: '>1000萬港幣',
            }
        },
        capital: {
            label: '資金來源', placeholder: '請選擇資金來源', options: {
                salary: '薪金',
                investment: '投資利潤',
                profit: '業務收入',
                commission: '傭金',
                saving: '储蓄',
                pension: '退休金',
                rent: '物業租金',
                other: '其他',
            }
        },
        investTarget: { label: '投資目標', placeholder: '請選擇投資目的', options: {
            shortTerm: '短線',
            longTerm: '中長線',
            speculation: '投機',
            hedging: '對沖',
            other: '其他',
        } },
        investTargetOther: { label: '\r', placeholder: '請填寫其他投資目的' },
        residence: { label: '住宿', placeholder: '請選擇住宿', options: {
            rented: '租用物業',
            selfOwned: '自置物業',
            mortgage: '按揭物業',
            companyQuarter: '公司宿舍',
            withFamily: '與家人同住',
            other: '其他',
        } },
        residenceOther: { label: '\r', placeholder: '請填寫其他住宿方式' },

    },
    // assets: {
    //     title: '財產種類',
    //     all: { label: '淨資產', placeholder: '請選擇淨資產' , options: {
    //         a: '<10萬',
    //         b: '10~50萬',
    //         c: '50~200萬',
    //         d: '200~800萬',
    //         e: '>800萬',
    //     }},
    //     real: { label: '房產業權', placeholder: '請選擇房產業權' , options: {
    //         a: '<50萬',
    //         b: '50~100萬',
    //         c: '100~500萬',
    //         d: '>500萬',
    //     }},
    // },
    derivative: {
        title: '衍生品投資',
        derivative: '是否有結構性及衍生產品之認識？',
        yes: '是',
        no: '否',
        derivativeCourse: '本人曾接受過衍生品的培訓或修讀相關課程；',
        derivativeIndustry: '本人現時或過去擁有衍生品有關的工作經驗；',
        derivativeTrade: '本人過去三年曾執行過五次或以上有關衍生品交易（無論是否在交易所買賣）；',
    },
};