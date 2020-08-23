import customizeI18n from '@/customize/locale/i18n/zh_HK';
import commonI18n from '@/main/locale/i18n/zh_HK';

export default {
    pageName: '投資概況',
    finance: {
        title: '財務狀況',
        income: {
            label: '年收入', placeholder: '請選擇年收入', options: {
                a: '<10萬',
                b: '10~30萬',
                c: '30~50萬',
                d: '50~100萬',
                e: '>100萬',
            }
        },
        investmentHorizon: {
            label: '投資年期', placeholder: '請選擇投資年期', options: {
                a: '少於一年',
                b: '一至三年',
                c: '三年以上'
            }
        },
        capital: {
            label: '資金來源', placeholder: '請選擇資金來源', options: {
                a: '薪金',
                b: '投資利潤',
                c: '商業利潤',
                d: '遺產繼承',
                e: '退休金',
                f: '物業租金',
                oth: '其他',
            }
        },
        investTarget: { label: '投資目標', placeholder: '請選擇投資目標', options: {
            a: '增值',
            b: '保本',
            c: '收入',
            oth: '其他',
        } },
        investTargetOther: { label: '\r', placeholder: '請填寫其他投資目標' },
    },
    assets: {
        title: '財產種類',
        all: { label: '淨資產', placeholder: '請選擇淨資產' , options: {
            a: '<10萬',
            b: '10~50萬',
            c: '50~200萬',
            d: '200~800萬',
            e: '>800萬',
        }},
        real: { label: '房產業權', placeholder: '請選擇房產業權' , options: {
            a: '<50萬',
            b: '50~100萬',
            c: '100~500萬',
            d: '>500萬',
        }},
    },
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