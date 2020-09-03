import customizeI18n from '@/customize/locale/i18n/zh_CN';
import commonI18n from '@/main/locale/i18n/zh_CN';

export default {
    pageName: '资料填写',
    contact: {
        title: '联系信息',
        radioOptions: {
            cn: '大陆地区',
            hk: '香港地区',
            oth: '其他地区',
            idCard: '同身份证地址',
            company: '同公司地址',
            home: '同现时住址',
        },
        email: {
            label: '邮箱',
            placeholder: '请填写您的电子邮箱'
        },
        // educationLevel: {
        //     label: '教育程度',
        //     placeholder: '请选择教育程度',
        //     options: {
        //         a: '小学',
        //         b: '中学',
        //         c: '专上学院',
        //         d: '大学或以上',
        //     }
        // },
        homeRadio: {
            label: '现时住址',
            placeholder: '请选择',
        },
        homeTelePhone: {
            label: '住址电话',
            placeholder: '现时住址联系电话(选填)'
        },
        contactRadio: {
            label: '通讯地址',
            placeholder: '请选择',

        },
        contactTelePhone: {
            label: '通讯电话',
            placeholder: '通讯地址联系电话(选填)'
        },
        addressCity: {
            label: '省市区',
            placeholder: '请选择省市区'
        },
        addressDetail: {
            label: '街道地址',
            placeholder: '详细地址(楼层/门牌号请写在下方)',
            placeholderOther: '请填写详细地址信息',
        },
        addressNumber: {
            label: '楼层/门牌号',
            placeholder: '详细楼层/门牌号，如几栋几楼和房号',
        },
        addressOtherCountry: {
            label: '国家/地区',
            placeholder: '请选择国家/地区'
        },
        addressOtherRepublic: {
            label: '国家/地区',
            placeholder: '请用英文输入国家/地区'
        },
        addressOtherProvince: {
            label: '省份',
            placeholder: '请输入省份'
        },
        addressOtherCity: {
            label: '城市',
            placeholder: '请输入城市'
        },
        addressOtherArea: {
            label: '区域',
            placeholder: '请输入区域'
        },
        modeOfCorrespondenceWarning: '若客户选择通过<span>居住地址</span>或<span>通讯地址</span>接收交易确认通知书或账户结单，将收取每月<span>五十元</span>服务费',
        modeOfCorrespondence: {
            label: '收取接单及书信方式',
            placeholder: '请选择',
            options: {
                email: '电邮',
                residentalAddress: '居住地址',
                correspondenceAddress: '通讯地址',
            }
        },
    },
    profession: {
        title: '工作状况',
        professionCode: {
            label: '就业情况',
            placeholder: '请选择',
            options: {
                employed: '受雇',
                selfEmployed: '自雇',
                retired: '退休',
                // others: '其他',
                housewife: '家庭主妇',
                student: '学生',
                umemployed: '待业',
            }
        },
        professionCodeOther: { label: '其他就业情况', placeholder: '请填写' },
        companyName: { label: '公司名称', placeholder: '请填写您的公司名称' },
        industryRange: { label: '营业范围', placeholder: '请填写营业范围' },
        jobPosition: {
            label: '职位级别',
            placeholder: '请选择职位级别',
            options: {
                topManagement: '高层管理',
                middleManagement: '中层管理',
                generalStaff: '普通员工',
            }
        },
        workingSeniority: {
            label: '从业年限',
            placeholder: '请选择',
            options: {
                ltFive: '少于5年',
                fiveToTen: '5-10年',
                mtTen: '10年以上',
            }
        },
        companyTelePhone: { label: '办公室电话', placeholder: '请填写(选填)' },
        companyAddress: { label: '公司地址', placeholder: '请填写' },
    },
}