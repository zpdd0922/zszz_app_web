import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '投资概况',
    finance: {
        title: '财务状况',
        income: {
            label: '年收入', placeholder: '请选择年收入', options: {
                ltTwentyK: '<20万港币',
                twentyToFiftyK: '20~50万港币',
                fiftyToOneHundredK: '50~100万港币',
                mtOneHundredK: '>100万港币',
            }
        },
        totalAssets: {
            label: '总净资产', placeholder: '请选择总净资产', options: {
                ltOneMillion: '<100万港币',
                oneToFiveMillion: '100~500万港币',
                fiveToTenMillion: '500~1000万港币',
                mtTenMillion: '>1000万港币',
            }
        },
        // investmentHorizon: {
        //     label: '投资年期', placeholder: '请选择投资年期', options: {
        //         a: '少于一年',
        //         b: '一至三年',
        //         c: '三年以上'
        //     }
        // },
        capital: {
            label: '资金来源', placeholder: '请选择资金来源', options: {
                salary: '薪金',
                investment: '投资利润',
                profit: '业务收入',
                commission: '佣金',
                saving: '储蓄',
                pension: '退休金',
                rent: '物业租金',
                other: '其他',
            }
        },
        investTarget: { label: '投资目的', placeholder: '请选择投资目的', options: {
            shortTerm: '短线',
            longTerm: '中长线',
            speculation: '投机',
            hedging: '对冲',
            other: '其他',
        } },
        investTargetOther: { label: '\r', placeholder: '请填写其他投资目的' },
        residence: { label: '住宿', placeholder: '请选择住宿', options: {
            rented: '租用物业',
            selfOwned: '自置物业',
            mortgage: '按揭物业',
            companyQuarter: '公司宿舍',
            withFamily: '与家人同住',
            other: '其他',
        } },
        residenceOther: { label: '\r', placeholder: '请填写其他住宿方式' },
    },
    // assets: {
    //     title: '财产种类',
    //     all: { label: '净资产', placeholder: '请选择净资产' , options: {
    //         a: '<10万',
    //         b: '10~50万',
    //         c: '50~200万',
    //         d: '200~800万',
    //         e: '>800万',
    //     }},
    //     real: { label: '房产业权', placeholder: '请选择房产业权' , options: {
    //         a: '<50万',
    //         b: '50~100万',
    //         c: '100~500万',
    //         d: '>500万',
    //     }},
    // },
    derivative: {
        title: '衍生品投资',
        derivative: '是否有结构性及衍生产品之认识？',
        yes: '是',
        no: '否',
        derivativeCourse: '本人曾接受过衍生品的培训或修读相关课程；',
        derivativeIndustry: '本人现时或过去拥有衍生品有关的工作经验；',
        derivativeTrade: '本人过去三年曾执行过五次或以上有关衍生品交易（无论是否在交易所买卖）；',
    },
};