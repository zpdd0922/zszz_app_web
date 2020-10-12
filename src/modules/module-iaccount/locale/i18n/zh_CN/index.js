/**
 * 中文 - 简体
 *
 */
import mainizeI18n from "@/main/locale/i18n/zh_CN";
import customizeI18n from "@/customize/locale/i18n/zh_CN";
import fundsDeposit from "./funds/deposit";

import { BANK_HK, BANK_CN, BANK_OTHER, BANK_TYPE } from "./info-bank";
import { DOLLAR_HK, DOLLAR_US, CURRENCY } from "./info-currency";
import { DEPOSIT_WAY, EDDA_INFO, CHECK_INFO } from "./info-way";

import { DEPOSIT_ACCOUNT_TYPE, BANK_ID_KIND, EDDA_STATUS } from "./edda";

import {
  SCRIP_OPTIONS,
  SHARE_EXCHANGE_OPTIONS,
  RIGHTS_SUBSCRIPTION_OPTIONS,
  OPEN_OFFER_SUBSCRIPTION_OPTIONS,
  CASH_OFFER,
  WARRANTS_CONVERSION_OPTIONS,
  PREFERENTIAL_OFFER,
  BOURSE_OPTIONS,
  COMPANY_NAME_OPTIONS,
} from "./company/select-info";

import { STATEMENT_TYPE_LIST, statementExtra } from "./statement";

import { brokerageCalculate } from "./brokerage-calculate";
import { BANK_NAME_OPTIONS } from "./info-remit";
import { intoStock } from "./into-stock";
import { outStock } from "./out-stock";
import { transferHistory } from "./transfer-history";
import { company_act } from './company/index';
import { addLimit } from './add-limit';
// import { statement } from "./statement";

// language: 'zh_CN',

export default {
  ...mainizeI18n,
  ...customizeI18n,
  iAccount: {
    fundsDeposit,
    // 佣金计算
    brokerageCalculate,
    intoStock,
    outStock,
    transferHistory,
    statementExtra,
    company_act,
    addLimit,
    nextBtn: "下一步",
    confirmBtn: "确认提交",
    define: {
      BANK_HK,
      BANK_CN,
      BANK_OTHER,
      BANK_TYPE,
      DOLLAR_HK,
      DOLLAR_US,
      CURRENCY,
      DEPOSIT_WAY,
      EDDA_INFO,
      CHECK_INFO,
      BANK_NAME_OPTIONS,
      DEPOSIT_ACCOUNT_TYPE,
      BANK_ID_KIND,
      EDDA_STATUS,
      SCRIP_OPTIONS,
      SHARE_EXCHANGE_OPTIONS,
      RIGHTS_SUBSCRIPTION_OPTIONS,
      OPEN_OFFER_SUBSCRIPTION_OPTIONS,
      CASH_OFFER,
      WARRANTS_CONVERSION_OPTIONS,
      PREFERENTIAL_OFFER,
      BOURSE_OPTIONS,
      COMPANY_NAME_OPTIONS,
      STATEMENT_TYPE_LIST,
    },
    main: {
      pageName: "证券服务",
    },
    home: {
      text_1: "资金管理",
      text_2: "股票管理",
      text_3: "其他服务",
      iconLabel: {
        funds: {
          label: "资金",
          deposit: "存入资金",
          // exchange: "货币兑换",
          // funds_history1: "资金调拨",
          withdraw: "取出资金",
          funds_history2: "资金记录",
          funds_history: "资金流水",
        },
        stocks: {
          label: "股票",
          enter: "转入股票",
          // exchange: "货币兑换",
          // funds_history1: "资金调拨",
          out: "转出股票",
          history: "股票历史",
          // ipo: "新股认购",
          // ipo_history: "新股历史",
        },
        company: {
          label: "公司行动",
          xgxx: "行动回复",
          // sqgg: "申请供股",
        },
        fee: {
          label: "费用",
          quotas: "行情购买",
          statement: "佣金方案",
          // account: "计算佣金",
          dayly: "日月结单",
          // other_fee: "其他费用",
        },
        accounts: {
          label: "账户",
          account: "证券账户资料",
          password: "修改交易密码",
          margin: '保证金账户增开',
          add_limit: '信用额度提升',
          // pro: "专业投资者",
        },
      },
    },
    common: {
      title: "证券服务",
      text_1: "确定",
      text_2: "取消",
      text_3: "关闭",
      text_4: "示例",
      text_5: "打开相册",
      text_6: "打开相机",
      text_7: "提示",
      text_8: "我知道了",
      text_9: "确认",
      text_10: "已知悉",
      text_11: "再次上传",
      text_12: "温馨提示",
      text_13: "暂无记录",
      text_14: "复制成功",
      text_15: "复制失败",
      text_16: "重新输入",
      text_17: "前往解绑",
      text_18: "账户已冻结，如有疑问请联系香港 ",
      text_19: " 或大陆 ",
      text_20: "获取图片失败，是否选择另一种方式上传图片？",
      text_21: "重置",
      text_22: "更正授权信息",
      text_23: "删除",
      text_24: "确定执行此操作吗？",
      alertWaiting: "功能代开放",
    },
    deposit: {
      name: "存入资金",
      common: {
        text_1: "注意事项",
        text_2: "点击对应字段即可复制",
        text_3: "已汇款，发起汇款通知",
        text_4: "请使用您本人 {config} 的同名账户转账",
        text_5:
          "通知收款时需要上传转账记录截图作为凭证，同时截取的凭证中一定要有“备案号”，否则可能导致汇款不成功。",
        text_6: "提交",
        text_7: "银行费用：",
        text_8: "到账时间：",
        text_9: "可用时间：",
        text_10: "推荐",
        text_11: "检测到您提交的信息不完整，请重新入金",
      },
      currency_type: {
        title_1: "请选择入金币种",
        text_1: "港币",
        text_2: "美元",
        title_2: "历史入金记录",
        text_3: "再次转入",
        text_4: "入金币种",
        text_5: "银行账户",
        text_6: "转账方式",
      },
      bank_type: {
        title: "请选择入金银行卡类型",
        text_1: "香港银行卡",
        text_2: "支持银证转账，退回率低",
        text_3: "大陆银行卡",
        text_4: "查看香港银行卡办理指引",
        text_5: "其他地区银行卡",
      },
      bank_list: {
        title: "请选择汇出银行",
        text_1:
          "近期不少客户反映通过内地银行存入资金被退回几率增高，立桥提醒客户留意相关风险， 入金被退回可能会产生手续费及汇兑损失，如发生资金退回情况，请及时联络银行处理。 立桥证券恕不负责任何银行向客户所收取任何形式的手续费或额外收费及任何汇兑损失。 立桥证券建议您通过香港本地银行卡存入资金。 建议单笔入金额不要超过10万港币（或等值美元）。立桥证券现已开通香港本地主流银行的快速办理通道，如汇丰银行、民生银行、中国银行香港等，欢迎选用。",
        cmbchk: "民生银行（香港）",
        cmbwlb: "招商永隆银行",
      },
      cmbchk: {
        text_1: "银证转账",
        text_2: "预计10分钟内",
        text_3: "0元",
        text_4: "什么是银证转账",
        text_5:
          "银证转账是指银行根据用户指令，为其提供证券交易时间内个人银行账户与立桥证券资金账户之间的资金实时划转的金融服务。您可通过银证转账直接将银行资金转入立桥证券账户。",
        text_6: "如何进行银证转账",
        text_7:
          "通过香港民生手机APP或香港民生计算机网银：进入【银证转账-转出转入-银行转至商户】，填写扣款账户及转账金额即可进行转账入金，限定交易时间为香港工作日的08:00-16:00。",
        text_8: "查看银证转账指南",
        text_9:
          "1、民生网银限定的交易时间为香港工作日的08: 00 - 16: 00（北京时间），限定当天首笔入金金额不超过200万港币，非工作时间以及周六、周日和香港假期不接受转账申请。",
        text_10: "2、银证转账操作则无需在犇犇进行发起汇款通知。",
        text_11: "3、首次进行银证转账需从PC端进行操作，点击查看",
        text_12: "【民生香港账户启动指引】",
        text_13: "您关联银行的证券账户：",
      },
      cmbwlb: {
        text_1: "银证转账",
        text_2: "预计10分钟内",
        text_3: "0元",
        text_4: "什么是银证转账",
        text_5:
          "银证转账是指银行根据用户指令，为其提供证券交易时间内个人银行账户与立桥证券资金账户之间的资金实时划转的金融服务。您可通过银证转账直接将银行资金转入立桥证券账户。",
        text_6: "如何进行银证转账",
        text_7:
          "通过招商永隆银行手机APP，进入【全部-理财-银证转账-转账-银转证】，输入转账金额即可转账入金，限定交易时间为香港工作日08:00-16:00。",
        text_8: "查看银证转账指南",
        text_9:
          "1、招商永隆银行限定的交易时间为香港工作日的08:00-16:00（北京时间），非工作时间以及周六、周日和香港假期不接受转账申请。      ",
        text_10: "2、银证转账操作则无需在犇犇进行发起汇款通知。",
        text_11: "您关联银行的证券账户：",
      },
      ways: {
        text_1: "请选择一种转账方式入账",
        text_2: "FPS转数快",
        text_3: "E-banking网银转账",
        text_4: "支票转账",
        text_5: "最快3小时内",
        text_6: "预计2小时",
        text_7: "1-2个工作日",
        text_8: "0元",
        text_9: "请咨询银行",
        text_10: "1.立桥证券不接受直接存入现金",
        text_11: "2.需使用本人 {config} 同名账户入金",
        text_12: "3.香港卡开户，首笔入金需≥10000港币（等值外币）",
        text_13: "暂未配置该银行入金方式，请联系客服",
      },
      edda: {
        edda_list: {
          title: "请选择入金银行账户",
          text_1: "添加银行账户",
          text_2: "提示",
          text_3: "确定执行此操作吗？",
          text_4: "操作成功",
        },
        bind: {
          text_1: "银行名称",
          text_2: "银行户名",
          text_3: "输入您的银行户名",
          text_4: "*请确保该户名与您香港银行账户所登记的户名一致",
          text_5: "银行账户类型",
          text_6: "请选择",
          text_7: "银行账号",
          text_8: "请输入您的港币汇款账号",
          text_9: "银行开户证件类型",
          text_10: "证件号码",
          text_11: "请输入您的银行开户证件号码",
          text_12: "本人已阅读、理解并同意接受",
          text_13: "《快捷入金用户协议》",
          text_14: "确认授权",
          text_15: "授权失败",
          tips: {
            text_1: "温馨提示：",
            text_2: "1.请确保所填内容准确无误，否则会授权失败。",
            text_3:
              "2.银行处理您的授权一般需要1~5个工作日，授权结果将会通过短信通知到您。",
            text_4: "1.什么是港币账户？",
            text_5:
              "资金储蓄、往来仅支持港币的账户。不同的币种对应不同的银行账户号码。",
            text_6: "2.什么是综合账户？",
            text_7:
              "资金储蓄、往来支持多个币种的账户。不同的币种对应同一个银行账户号码。",
            text_8: "银行户名仅支持大写英文字母和空格",
            text_9: "请确认证件号码是否正确",
            text_10: `<p>本部份规管立桥证券为客户提供电子直接付款授权服务及客户使用电子直接付款授权服务。本部份补充各项立桥证券不时修订之条款及细则及任何适用于规管立桥证券服务的协议或条款及细则。</p>
          <p>通过在智珠宝移动应用程序上勾选“本人已阅读、理解并同意接受《快捷入金用户协议》“即表示您已签署本条款及细则，并同意受本条款及细则的所有条款的约束。</p>
          <p>1. 在本条款及细则，下列的词语具下列定义：</p>
          <p>「电子直接付款授权」指使用结算公司快速支付系统以电子方式设置的直接付款授权。</p>
          <p>「电子直接付款授权服务」指由结算公司提供作为结算公司快速支付系统一部份的服务，让参与者的客户设置直接付款授权并具有第2(a)条中规定的含义。</p>
          <p>「阁下」及「阁下的」指立桥证券提供证券服务的每位客户，及如文义允许，包括任何获客户授权向立桥证券发出有关使用证券服务的指示或要求的人士。</p>
          <p>「结算公司」指香港银行同业结算有限公司及其继承人及受让人。</p>
          <p>「结算公司快速支付系统」或「快速支付系统」指由结算公司不时提供、管理及运作的快速支付系统及其相关设施及服务，用作(i)处理直接付款及存款、资金转账及其他付款交易；及(ii)就电子直接付款授权服务及账户绑定服务交换及处理指示。</p>
          <p>「香港」指中华人民共和国香港特别行政区。</p>
          <p>「监管规定」指本公司、银行、结算公司、任何其他参与者、彼等各自的联系公司或集团公司或阁下不时受规限或被期望遵守的任何法律、规例或法庭判令，或由任何监管机构、政府机关(包括税务机关)、结算或交收银行、交易所、业界或自律监管团体(不论于香港境内或境外)发出的任何规则、指示、指引、守则、通知或限制(不论是否具有法律效力)。</p>
          <p>2. 电子直接付款授权服务</p>
          <p>(a) 基于立桥证券与银行的授权与合作，立桥证券将向客户申请电子直接付款授权服务提供相应服务，即客户若通过立桥证券向银行申请电子直接付款授权服务的，立桥证券将协助前述申请指令、资料及信息按照银行要求路径传送至银行，授权被银行批核后，客户可直接向立桥证券发出指示，进行由银行至立桥证券的直接付款授权资金转账。若该授权申请被银行拒绝，立桥证券会通知客户该授权结果，但并不会就该授权结果负任何责任。</p>
          <p>(b) 阁下须以立桥证券不时指定的形式或方法提供或输入所需资料并完成程序，立桥证券方可协助阁下处理有关向银行申请设置电子直接付款授权的要求。阁下所输入的银行账户资料必需为阁下之同名账户，立桥证券不接受联名户口之申请。</p>
          <p>(c) 如果阁下已经设置了电子直接付款授权，但于长时间内未有根据该授权进行操作，立桥证券有权取消该直接付款授权而无须另行通知阁下，即使该授权尚未到期或未有注明授权到期日或终止日期；银行亦有可能取消该直接付款授权，如该授权被银行取消，客户需自行向银行查询。</p>
          <p>(d) 客户通过立桥证券向银行申请之电子直接付款授权服务，预设转账为每笔，转账限额无上限为，协议时长为无期限，如客户不接受该预设数值，客户不应继续透过立桥证券向银行申请电子直接付款授权。</p>
          <p>(e) 客户可以透过银行之银行服务向银行发出更改电子直接付款授权转账限额及协议时长的指令。</p>
          <p>(f) 电子直接付款授权将持续生效，如阁下要取消或更改电子直接付款授权设置，请阁下联络已授权账户之所属银行处理。</p>
          <p>3. 阁下的责任</p>
          <p>(a) 阁下须负责</p>
          <p>当阁下向立桥证券发出有关使用电子直接付款授权服务的指示或要求，及/或当阁下授权其他人士向立桥证券发出有关使用电子直接付款授权服务的指示或要求（不论阁下为个人、公司、法团、独资经营或合伙公司或任何其他非法团性质的组织）：</p>
          <p>(i) 阁下须为所有作为及不作为负责，及/或阁下须为每名获阁下授权的人士的所有作为及不作为负责；</p>
          <p>(ii) 任何立桥证券收到由阁下或任何获阁下授权的人士发出的指示或要求，均属不可撤销并对阁下具有约束力；及</p>
          <p>(iii) 阁下有责任遵守本条款适用的条款，及/或阁下有责任确保每名获阁下授权的人士均会遵守本条款就其代阁下行事适用的条款。</p>
          <p>4. 阁下的指示具约束力</p>
          <p>当阁下向立桥证券发出申请之电子直接付款授权服务的指示及用已授权的银行账户存入资金的指示，该指示即属不可撤销，并对阁下具有约束力。</p>
          <p>阁下确认，明白及接受透过电子直接付款授权服务经其银行账户把有关的金钱或资金存入立桥证券的指定银行账户内以作买入证券或就交易作出结算(“网上存款”)下之风险。如客户选择以此方法存入金钱或资金，即表示客户完全接受当中之风险，同意承担该风险与及因而产生之一切责任，包括但不限于以下该等风险及责任：</p>
          <p>(i) 阁下须于发出网上存款之有关指示前，自行确保所有有关的程序、步骤、数据、账户号码、缴付账单号码、个人悉别号码、存入之金额及有关存入金钱或资金至立桥证券之资料已被详细检查及核实为真实、正确及无误。当阁下以任何方式发出网上存款之有关指示后，该等指示均不可在并无立桥证券的书面同意下被修订、撤销、删除或取消，并对立桥证券具有效性及效力及对阁下构成绝对及不可推翻的约束力。阁下确认立桥证券不会于任何情况下因网上存款而产生或与之有关之损失、讼费、费用、开支而承担任何责任，即使客户于发出该等指示时有错误或误会；</p>
          <p>(ii) 立桥证券有权将阁下就网上存款给予的指示，视为获阁下全面授权，并对阁下具约束力的指示。立桥证券有权依据及根据该等指示行事，并无须查询或核实作出或给予该等指示的人士的权限或身份，亦无须理会给予该等指示之时的当时情况，即使当中有任何错误、误导成分、不清楚、诈骗、伪造或欠缺权力依据等情况；</p>
          <p>(iii) 阁下同意及接受，如立桥证券于其每日指定截数时间之后接获有关之网上存款指示，该指示将会被视为于下一个营业日被立桥证券接获，但立桥证券可按其绝对酌情权处理。立桥证券在任何情况下无须对客户因上述之安排而引致(直接或间接)或就此而蒙受及/或招致的任何损失、损害赔偿、开支或任何利润损失，向客户承担法律责任(包括因疏忽招致的法律责任)；及</p>
          <p>(iv) 阁下完全明白及同意，有关网上存款发出的任何指示，会因通讯网络故障、系统故障、装置或软件受到干扰或其他情况而导致受干扰、延误或未能传达。阁下同意承担一切因此而产生之风险及自行对阁下因网上存款而引致(直接或间接)或就此而蒙受及/或招致的任何损失、损害赔偿、开支或任何利润损失承担法律责任。</p>
          <p>5. 收集及使用阁下资料</p>
          <p>(a) 为了使用电子直接付款授权服务，阁下可能需要不时向立桥证券提供个人资料及其他资料，立桥证券不时就有关证券服务及电子直接付款授权服务获提供或由立桥证券编制的个人资料及信息统称为「客户资料」。</p>
          <p>(b) 阁下同意（及如适用，阁下代表阁下的每名董事、人员、雇员、获授权人士及代表同意）立桥证券可为电子直接付款授权服务的用途收集、使用、处理、保留或转移任何阁下资料。此等用途包括但不限于下列一项或多项：</p>
          <p>(i) 向阁下提供电子直接付款授权服务，维持及运作电子直接付款授权服务</p>
          <p>(ii) 处理及执行阁下不时有关电子直接付款授权服务的指示及要求；</p>
          <p>(iii) 披露或转移阁下资料予银行,结算公司及其他参与者，供电子直接付款授权服务的运作使用；</p>
          <p>(iv) 按需遵守的监管规定而作出披露；及</p>
          <p>(v) 及任何与上述有关的用途。</p>
          <p>(c) 阁下明白及同意阁下资料可能被立桥证券、银行、结算公司、或其他参与者再披露或转移予其阁下及任何其他使用结算公司快速支付系统的第三者，作为提供及运作电子直接付款授权服务之用。</p>
          <p>(d) 倘阁下资料包括阁下以外其他人士的个人资料，阁下确认阁下已取得该人士同意，就银行、结算公司、立桥证券及其他参与者按本条款指明的用途使用（包括披露或转移）其个人资料及其他资料。</p>
          <p>6. 责任限制</p>
          <p>(a) 阁下同意立桥证券无须负责阁下或任何其他人士有关或因使用电子直接付款授权服务，或有关或因处理或执行阁下就有关电子直接付款授权服务或结算公司快速支付系统的指示或要求，而可能引致或蒙受的任何种类的损失、损害或开支，除非任何上述损失、损害或开支属直接及可合理预见并直接且完全由于立桥证券或立桥证券人员、雇员或代理的疏忽或故意失责引致；</p>
          <p>(b) 阁下同意立桥证券无须负责阁下或任何其他人士因或有关下列一项或多项事宜，而可能引致或蒙受的任何种类的损失、损害或开支：</p>
          <p>(i) 结算公司快速支付系统产生或引致的，或立桥证券可合理控制以外的情况引致的延误、无法使用、中断、错误或故障；及</p>
          <p>(ii) 在任何情况下，就任何收益损失或任何特别、间接、附带、相应而生或惩罚性损失或损害赔偿（不论是否可预见或可能招致），立桥证券、立桥证券的关联公司或集团公司、立桥证券的特许人、及上述彼等各自的人员、雇员或代理均无须向阁下或任何其他人士负责。</p>
          <p>7. 免责及责任承担</p>
          <p>阁下确认及同意，任何因您违反您的陈述或担保、或您接受并执行任何说明、或应依照相关条款和约定应履行的相关义务，或其他您任何与前述违约行为有关的情形由此给我们及立桥集团项下任何其他成员造成任何损失，损害，责任，成本，索偿，要求和其他支出（无论是否基于税收，关税或其他事项），您均应承担全部赔偿责任。</p>
          <p>阁下确认及同意，由于您自身原因，包括任何不明确或不完整的说明而导致服务无法执行和/或由于阁下自身的任何错误和/或系统故障导致的任何直接损失、损害或费用、间接损失或由此造成的损失，损害或费用概不负责, 并须就因此而直接或间接招致或与此相关的所有费用、索偿、债务及开支，全数向立桥证券作出弥偿。</p>
          <p>8. 分割性</p>
          <p>倘若本条款所载之任何条文变为不合法，无效或不能强制执行，其余条文将继续有约束力及有效。</p>
          <p>9. 修订</p>
          <p>立桥证券在作出适用的营运守则或操守准则所规定的合理知会下可随时及不时修订及/或补充或新增本条款所载之任何条文，该等修订及新增条文即告生效。倘若客户于接获通知后仍继续使用立桥证券当时提供之服务，该等修订及/或补充/新增条文在其生效日起被视为获客户接纳及对客户立即具约束力。</p>
          <p>10. 第三者权利</p>
          <p>除客户及立桥证券以外，并无其他人士有权按《合约（第三者权利）条例》（香港法例第623章）强制执行本条款的任何条文，或享有本条款的任何条文下的利益。</p>
          <p>11. 法律及司法管辖</p>
          <p>本条款受香港法律及不时以展示、广告或其他方式告知客户至现时仍生效或经修订、制订或授用之立桥证券之章程、规例及惯例之管辖，并须按香港法律诠释。客户兹服从香港法庭行使非专属司法管辖权对因上述事项而产生及与之有关的所有争议及申索之决定、执行及判定。</p>
          `,
            // text_10: '本部份规管立桥证券为客户提供电子直接付款授权服务及客户使用电子直接付款授权服务。本部份补充各项立桥证券不时修订之条款及细则及任何适用于规管立桥证券服务的协议或条款及细则。通过在智珠宝移动应用程序上勾选“本人已阅读、理解并同意接受《快捷入金用户协议》“即表示您已签署本条款及细则，并同意受本条款及细则的所有条款的约束。',
            // text_11: '1. 在本条款及细则，下列的词语具下列定义：',
            // text_12: `「电子直接付款授权」指使用结算公司快速支付系统以电子方式设置的直接付款授权。
            // 「电子直接付款授权服务」指由结算公司提供作为结算公司快速支付系统一部份的服务，让参与者的客户设置直接付款授权并具有第2(a)条中规定的含义。
            // 「阁下」及「阁下的」指立桥证券提供证券服务的每位客户，及如文义允许，包括任何获客户授权向立桥证券发出有关使用证券服务的指示或要求的人士。
            // 「结算公司」指香港银行同业结算有限公司及其继承人及受让人。
            // 「结算公司快速支付系统」或「快速支付系统」指由结算公司不时提供、管理及运作的快速支付系统及其相关设施及服务，用作(i)处理直接付款及存款、资金转账及其他付款交易；及(ii)就电子直接付款授权服务及账户绑定服务交换及处理指示。
            // 「香港」指中华人民共和国香港特别行政区。
            // 「监管规定」指本公司、银行、结算公司、任何其他参与者、彼等各自的联系公司或集团公司或阁下不时受规限或被期望遵守的任何法律、规例或法庭判令，或由任何监管机构、政府机关(包括税务机关)、结算或交收银行、交易所、业界或自律监管团体(不论于香港境内或境外)发出的任何规则、指示、指引、守则、通知或限制(不论是否具有法律效力)。`,
            // text_13: '2. 电子直接付款授权服务：',
            // text_14: '(a) 基于立桥证券与银行的授权与合作，立桥证券将向客户申请电子直接付款授权服务提供相应服务，即客户若通过立桥证券向银行申请电子直接付款授权服务的，立桥证券将协助前述申请指令、资料及信息按照银行要求路径传送至银行，授权被银行批核后，客户可直接向立桥证券发出指示，进行由银行至立桥证券的直接付款授权资金转账。若该授权申请被银行拒绝，立桥证券会通知客户该授权结果，但并不会就该授权结果负任何责',
            // text_15: '银行账号只能输入数字'
          },
        },
        remit: {
          text_1: "汇款账号",
          text_2: "请选择",
          text_3: "存入金额",
          text_4: "港币",
          text_5: "请输入金额",
          text_6: "+ 添加银行账户",
          tips: {
            text_1: "1.入金只需要在此页面提交申请即可，不需要前往银行端操作。",
            text_2:
              "2.如您已在银行端解除授权，请勿通过此页面发起入金申请，并联系客服400-688-3187更正授权状态。",
            text_3: "请选择汇款账号",
            text_4: "请输入存入金额",
            text_5:
              "*请确保银行账户有足够资金，以免资金不足导致扣款失败，影响您的交易。",
            text_6: "存入金额至少0.01港币",
            text_7: "存入金额请勿超过单笔限额",
          },
        },
        notify: {
          text_1: "恭喜您，提交成功！",
          text_2:
            "银行处理您的授权一般需要1~5个工作日，授权结果将会通过短信通知到您。",
          text_3:
            "港股交易时间段最快5分钟入账，非港股交易时间段将于下个港股交易日09:00前入账，具体时间请以短信通知为准。",
          text_4: "查看入金状态",
        },
        tips: {
          text_1: "1.什么是快捷入金？",
          text_2:
            "快捷入金是指客户通过eDDA授权立桥证券从指定的香港银行账户划拨指定数额的资金至证券账户。eDDA即电子直接付款授权，是香港金管局推出的FPS转数快系统的增值服务。",
          text_3: "2.快捷入金有哪些优势",
          text_4: "极速到账、免手续费。通过智珠宝直接入金，无需登录银行端。",
        },
      },
      fps: {
        text_1: "立桥证券FPS收款账户资料：",
        text_2: "FPS识别码",
        text_3: "收款银行",
        text_4: "收款户名",
        text_5: "FPS转数快指南",
        tips: {
          text_1: "FPS转数快简介",
          text_2:
            "FPS转数快是香港金融管理局于2018年9月30日推出的全面连接银行的快速支付系统。",
          text_3: "(1)实时跨行转账",
          text_4: "(2)费用全免",
          text_5: "(3)365x24x7转账服务",
          text_6: "(4)支持港币",
          text_7:
            "(5)透过FPS识别码快速付款，后续将支持QR code扫码等便捷付款方式。",
          text_8: "FPS转数快转账步骤",
          text_9: "(1)打开所持银行卡的网银、手机银行、第三方支付工具或电子钱包",
          text_10: "(2)找到FPS转数快入口，选择“付款/转账”",
          text_11: "(3)收款人信息栏输入立桥FPS识别码：{config}",
          text_12: "(4)确认收款人户名是否为：{config}",
          text_13: "(5)转账成功后截图作为汇款凭证",
          text_14:
            "(6)上传汇款凭证（可直接点击），或打开智珠宝App，点击【我的】-【证券服务】-【存入资金】，进行上传",
        },
      },
      eBanking: {
        text_1: "立桥证券网银转账收款账户资料：",
        text_2: "收款账号",
        text_3: "银行中文名",
        text_17: "银行英文名",
        text_4: "账号名称",
        text_5: "SWIFT代码",
        text_6: "银行地址",
        text_7: "查看网银转账指南",
        text_8: "账户号码",
        text_9: "账户名称",
        text_10: "账户地址",
        text_11: "查看 {config} 汇款指南",
        text_12:
          "收款账号由立桥证券在星展银行以您的名义开立,用于接收来自大陆银行的同名,点击免费免费获取收款账号.请注意,账号需要至少60分钟才能生效,一经生效,可永久使用",
        text_13: "获取收款账号,至少60分钟后生效",
        text_14: "申请中",
        text_15: "已申请",
        text_16: "申请异常",
      },
      check: {
        text_1:
          "请使用您本人 {config} 的银行账户汇款，汇款人请填写证券预留姓名 {config}",
        text_2: "1、支票填写：",
        text_3: "收款人名称",
        text_4: "收款人账号",
        text_5: "2、发起汇款通知：",
        text_6: "在APP发起汇款通知上传支票的图片，通知立桥确认支票是否无误",
        text_7: "3、邮寄支票",
        text_8: "收到立桥短信回复支票无误再将支票邮寄到以下",
        text_9: "地址：香港，立桥证券有限公司",
        text_10: "电话：",
        text_11: "联系人：",
        text_12: "支票转账指南",
      },
      remit: {
        text_0: "资金账号",
        text_1: "银行户名",
        text_2: "汇款账号",
        text_3: "确认账号",
        text_4: "存入金额",
        text_5: "在此输入账号",
        text_6: "在此输入金额",
        text_7: "上传凭证",
        text_8:
          "根据香港证监会要求，入金必须为同名账户，为保证您的资金安全和入账速度，请确保您上传的凭证包含汇款银行名称、姓名、完整汇款账号和收款账号等信息，如果一张图片不能同时包含汇款银行名称和姓名，可补充上传银行结单或截图辅助证明。",
        text_9: "备注",
        text_10: "请输入备注（选填）",
        text_11: "确认账号和汇款账号需保持一致",
        text_12: "汇款银行",
        text_13: "在此输入银行名称",
        text_14: "收款银行",
        text_15: "请选择收款银行",
        text_16: "至少上传一张凭证",
      },
    },
    withdraw: {
      name: "提取资金",
      select_bank: {
        text_1: "出金提示",
        text_2:
          "近期有较多客户反馈大陆银行无法接收外汇汇款。如发生退款，已收取的手续费银行不做退回，并且退款时间较长（5-20个工作日）。立桥正在准备新的出金管道尽力为客户提供顺畅的服务体验。如您近期有提款需求，建议提前办理香港银行卡。",
        text_3: "办卡指引",
        text_4:
          "民生银行（香港）卡出金无需提交出金申请，您可直接前往香港民生网银/ APP申请提取，",
        text_5: "查看民生香港出金指引>>",
        text_6: "民生",
      },
      request: {
        text_1: "提取账户",
        text_2: "现金账户",
        text_2m: "保证金账户",
        text_3: "收款账户信息",
        text_4: "收款银行",
        text_5: "账户名称",
        text_6: "银行账号",
        text_7: "请输入转出银行账号",
        text_8: "确认账号",
        text_9: "请再次输入银行账号",
        text_10: "swift code",
        text_11: "向您的{name}银行咨询swift code",
        text_12:
          "请向您的{name}收款银行咨询Swift Code，提供错误信息可能会发生提款延迟及额外费用。",
        text_13: "联系地址",
        text_14: "请输入联系地址（非必填）",
        text_15: "资金信息",
        text_16: "币种",
        text_17: "提取金额",
        text_18: "在此输入金额",
        text_19: "可提金额：",
        text_20: "全部提取",
        text_21:
          "200-400港币（银行收取), 提取金额1000元以下时立桥证券将收取10港币手续费",
        text_22: "5-10个银行工作日",
        text_23: "5-10个银行工作日",
        text_24: "提取",
        text_25: "请选择您的提取账户",
        text_26: "请选择您的银行账号",
        text_27: "确认账号和银行账号需保持一致",
        text_28: "提取资金需大于等于10港币",
        text_29: "提取资金不可超过可提资金",
        text_30:
          "您尚未入金或未绑定香港银行卡，请先入金或绑卡，如有疑问请联系客服，点击拨打",
        text_31: "银行名称",
        text_32: "在此输入银行名称",
        text_33: "手续费",
        text_34: "实际提取金额",
        text_35: "抱歉，您的实际提取金额不足",
      },
    },
    notify: {
      text_1: "凭证上传成功",
      text_2: "我们将尽快核实并同步您的资金信息",
      text_3: "申请提交成功",
      text_4: "您的提取资金申请已成功提交，我司将在1-2个工作日内处理。",
    },
    my_bank: {
      name: "我的银行卡",
      text_1: "银行卡类型",
      text_2: "香港卡",
      text_3: "大陆卡",
      text_4: "删除",
      text_5: "确定要解除绑定该银行卡？",
      text_6: "解绑成功",
      text_7: "解绑失败",
      text_8: "您还没有绑定银行卡",
      text_9:
        "1.【我的银行卡】中记录了您入金银行卡相关信息，立桥证券保证所有信息只会用于您在立桥证券的出入金等资金操作，不会用于其他任何行为；",
      text_10:
        "2.很抱歉当前不支持香港银行卡删除操作，如果有删除需求请您咨询客服",
      text_11:
        "立桥证券每个用户最多可使用三张香港银行卡入金，您需要解绑至少一张香港银行卡，才能选择其他银行卡入金",
      text_12:
        "立桥证券每个用户最多可使用三张大陆银行卡入金，您需要解绑至少一张大陆银行卡，才能选择其他银行卡入金",
      text_13:
        "每人至多使用三张同类型（大陆/香港/其他地区）银行卡入金，您需要解绑至少一张同类型银行卡，才能选择其他银行卡入金。",
    },
    history: {
      name: "资金申请记录",
      common: {
        text_1: "入金记录",
        text_2: "出金记录",
        text_3: "存入总额",
        text_4:
          "到账金额为您历史成功入金金额之和，如果您对统计结果存在疑问，请您咨询客服",
        text_5: "提取总额",
        text_6:
          "到账金额为您历史成功提取金额之和，针对统计结果如果有疑问，请您咨询客服",
        text_7: "温馨提示：点击“处理中”记录进入详情页面即可取消",
        text_8: "所有币种",
        text_9: "所有状态",
        text_10: "待审核",
        text_11: "审核中",
        text_12: "已驳回",
        text_13: "已完成",
        text_14: "已取消",
        text_15: "，立桥将确保您的资产的准确和安全。",
        text_16: "已退款",
      },
      funds: {
        text_1: "提交时间",
        text_2: "银行卡类型",
        text_3: "银行名称",
        text_4: "银行卡账号",
        text_5: "提取账户",
        text_6: "转账方式",
        text_7: "存入账户",
        text_8: "转账凭证",
        text_9: "审核状态",
        text_10: "驳回时间",
        text_11: "驳回原因",
        text_12: "相同方式再次入金",
        text_13: "取消出金申请",
        text_14: "确认取消该条出金申请吗？",
        text_15: "取消成功",
        text_16: "存入金额",
        text_17: "提取金额",
        text_18: "存入",
      },
      stock: {
        text_1: "所有兑换类型",
        text_2: "港币兑换美元",
        text_3: "美元兑换港币",
      },
    },
    capital: {
      name: "资金流水",
    },
    roll_over_history: {
      name: "转仓申请记录",
    },
    stock_history: {
      name: "股票流水",
    },
    into_stock: {
      name: "转入股票",
    },
    out_stock: {
      name: "转出股票",
      info_tips:
        "请您至立桥证券官网下载并填写转出股票表格，若有疑问，请咨询客服400-688-3187",
    },
    brokerage: {
      name: "我的佣金",
    },
    statement: {
      name: "我的结单",
    },
    quotes: {
      name: "行情购买",
    },
    capital_flow: {
      name: "资金流水",
      stock_flow_name: "股票流水",
      common: {
        text_1: "入金总额",
        text_2: "出金总额",
        text_3: "筛选条件",
        text_4: "今日",
        text_5: "近一周",
        text_6: "近一个月",
        text_7: "近三个月",
        text_8: "筛选日期",
        text_9: "业务类型",
        text_10: "币种",
        text_11: "资金流向",
        text_12: "全部",
        text_13: "资金存取",
        text_14: "新股认购",
        text_15: "证券交易",
        text_16: "公司行动",
        text_17: "其他",
        text_34: "全部",
        text_18: "港币",
        text_19: "美元",
        text_20: "转入",
        text_21: "转出",
        text_22: "选择开始日期",
        text_23: "至",
        text_24: "选择结束日期",
        text_25: "时间跨度请勿超过两年",
        text_26: "余额",
        text_27: "已无更多",
        text_28: "市场",
        text_29: "港股",
        text_30: "美股",
        text_31: "余量",
        text_32: "证券存取",
        text_33: "证券流向",
      },
    },
  },
};
