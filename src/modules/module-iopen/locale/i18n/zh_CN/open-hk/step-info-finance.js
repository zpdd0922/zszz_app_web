import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '投资概况',
    finance: {
        title: '财务状况',
        income: {
            label: '年收入', placeholder: '请选择年收入', options: {
                a: '<10万',
                b: '10~30万',
                c: '30~50万',
                d: '50~100万',
                e: '>100万',
            }
        },
        investmentHorizon: {
            label: '投资年期', placeholder: '请选择投资年期', options: {
                a: '少于一年',
                b: '一至三年',
                c: '三年以上'
            }
        },
        capital: {
            label: '资金来源', placeholder: '请选择资金来源', options: {
                a: '薪金',
                b: '投资利润',
                c: '商业利润',
                d: '遗产继承',
                e: '退休金',
                f: '物业租金',
                oth: '其他',
            }
        },
        investTarget: { label: '投资目标', placeholder: '请选择投资目标', options: {
            a: '增值',
            b: '保本',
            c: '收入',
            oth: '其他',
        } },
        investTargetOther: { label: '\r', placeholder: '请填写其他投资目标' },
    },
    assets: {
        title: '财产种类',
        all: { label: '净资产', placeholder: '请选择净资产' , options: {
            a: '<10万',
            b: '10~50万',
            c: '50~200万',
            d: '200~800万',
            e: '>800万',
        }},
        real: { label: '房产业权', placeholder: '请选择房产业权' , options: {
            a: '<50万',
            b: '50~100万',
            c: '100~500万',
            d: '>500万',
        }},
    },
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