/**
 * 中文 - 簡體
 *
 */
import mainizeI18n from "@/main/locale/i18n/zh_HK";
import customizeI18n from "@/customize/locale/i18n/zh_HK";
import fundsDeposit from "./funds/deposit";

import { BANK_HK, BANK_CN, BANK_OTHER, BANK_TYPE } from "./info-bank";
import { DOLLAR_HK, DOLLAR_US, CURRENCY } from "./info-currency";
import { DEPOSIT_WAY, EDDA_INFO, CHECK_INFO } from "./info-way";

import { DEPOSIT_ACCOUNT_TYPE, BANK_ID_KIND, EDDA_STATUS } from "./edda";

import { STATEMENT_TYPE_LIST, statementExtra} from "./statement";

import { brokerageCalculate } from "./brokerage-calculate";
import { BANK_NAME_OPTIONS } from "./info-remit";
import { intoStock } from "./into-stock";
import { outStock } from "./out-stock";
import { transferHistory } from "./transfer-history";
import { statement } from "./statement";


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

export default {
  ...mainizeI18n,
  ...customizeI18n,
  iAccount: {
    fundsDeposit,
    // 佣金计算
    brokerageCalculate,
    intoStock,
    outStock,
    statementExtra,
    transferHistory,
    nextBtn: "下一步",
    confirmBtn: "確認提交",
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
      pageName: "證券服務",
    },
    home: {
      text_1: "資金管理",
      text_2: "股票管理",
      text_3: "其他服務",
      iconLabel: {
        funds: {
          label: '資金',
          deposit: "存入資金",
          // exchange: "貨幣兌換",
          // funds_history1: "資金調撥",
          withdraw: "取出資金",
          funds_history2: "資金記錄",
          funds_history: "資金流水",
        },
        stocks: {
          label: '股票',
          enter: "轉入股票",
          // exchange: "貨幣兌換",
          // funds_history1: "資金調撥",
          out: "轉出股票",
          history: "股票歷史",
          // ipo: "新股認購",
          // ipo_history: "新股歷史",
        },
        company: {
          label: '公司行動',
          xgxx: "選股選息",
          // sqgg: "申請供股",
        },
        fee: {
          label: '費用',
          quotas: "行情購買",
          statement: "傭金方案",
          // account: "計算傭金",
          dayly: "日月結單",
          // other_fee: "其他費用",
        },
        accounts: {
          label: '賬戶',
          account: "證券賬戶資料",
          password: "修改交易密碼",
          // pro: "專業投資者",
        },
      }
    },
    common: {
      title: "證券服務",
      text_1: "確定",
      text_2: "取消",
      text_3: "關閉",
      text_4: "示例",
      text_5: "打開相冊",
      text_6: "打開相機",
      text_7: "提示",
      text_8: "我知道了",
      text_9: "確認",
      text_10: "已知悉",
      text_11: "再次上傳",
      text_12: "溫馨提示",
      text_13: "暫無記錄",
      text_14: "複製成功",
      text_15: "複製失敗",
      text_16: "重新輸入",
      text_17: "前往解綁",
      text_18: "帳戶已凍結，如有疑問請聯繫香港 ",
      text_19: " 或大陸 ",
      text_20: "獲取圖片失敗，是否選擇另一種方式上傳圖片？",
      text_21: "重置",
      text_22: "更正授權資訊",
      text_23: "刪除",
      text_24: "確定執行此操作嗎？",
      alertWaiting: "功能代開放",
    },
    deposit: {
      name: "存入資金",
      common: {
        text_1: "注意事項",
        text_2: "點擊對應字段即可複製",
        text_3: "已匯款，發起匯款通知",
        text_4: "請使用您本人 {config} 的同名帳戶轉賬",
        text_5:
          "通知收款時需要上傳轉賬記錄截圖作為憑證，同時截取的憑證中一定要有“備案號”，否則可能導致匯款不成功。",
        text_6: "提交",
        text_7: "銀行費用：",
        text_8: "到賬時間：",
        text_9: "可用時間：",
        text_10: "推薦",
        text_11: "檢測到您提交的資訊不完整，請重新入金",
      },
      currency_type: {
        title_1: "請選擇入金幣種",
        text_1: "港幣",
        text_2: "美元",
        title_2: "歷史入金記錄",
        text_3: "再次轉入",
        text_4: "入金幣種",
        text_5: "銀行帳戶",
        text_6: "轉賬方式",
      },
      bank_type: {
        title: "請選擇入金銀行卡類型",
        text_1: "香港銀行卡",
        text_2: "支持銀證轉賬，退回率低",
        text_3: "大陸銀行卡",
        text_4: "查看香港銀行卡辦理指引",
        text_5: "其他地區銀行卡",
      },
      bank_list: {
        title: "請選擇匯出銀行",
        text_1:
          "近期不少客戶反映通過內地銀行存入資金被退回幾率增高，立橋提醒客戶留意相關風險， 入金被退回可能會產生手續費及匯兌損失，如發生資金退回情況，請及時聯絡銀行處理。 立橋證券恕不負責任何銀行向客戶所收取任何形式的手續費或額外收費及任何匯兌損失。 立橋證券建議您通過香港本地銀行卡存入資金。 建議單筆入金額不要超過10萬港幣（或等值美元）。立橋證券現已開通香港本地主流銀行的快速辦理通道，如匯豐銀行、民生銀行、中國銀行香港等，歡迎選用。",
        cmbchk: "民生銀行（香港）",
        cmbwlb: "招商永隆銀行",
      },
      cmbchk: {
        text_1: "銀證轉賬",
        text_2: "預計10分鐘內",
        text_3: "0元",
        text_4: "什麼是銀證轉賬",
        text_5:
          "銀證轉賬是指銀行根據用戶指令，為其提供證券交易時間內個人銀行帳戶與立橋證券資金帳戶之間的資金即時劃轉的金融服務。您可通過銀證轉賬直接將銀行資金轉入立橋證券帳戶。",
        text_6: "如何進行銀證轉賬",
        text_7:
          "通過香港民生手機APP或香港民生電腦網銀：進入【銀證轉賬-轉出轉入-銀行轉至商戶】，填寫扣款帳戶及轉賬金額即可進行轉賬入金，限定交易時間為香港工作日的08:00-16:00。",
        text_8: "查看銀證轉賬指南",
        text_9:
          "1、民生網銀限定的交易時間為香港工作日的08: 00 - 16: 00（北京時間），限定當天首筆入金金額不超過200萬港幣，非工作時間以及週六、周日和香港假期不接受轉賬申請。",
        text_10: "2、銀證轉賬操作則無需在犇犇進行發起匯款通知。",
        text_11: "3、首次進行銀證轉賬需從PC端進行操作，點擊查看",
        text_12: "【民生香港帳戶啟動指引】",
        text_13: "您關聯銀行的證券帳戶：",
      },
      cmbwlb: {
        text_1: "銀證轉賬",
        text_2: "預計10分鐘內",
        text_3: "0元",
        text_4: "什麼是銀證轉賬",
        text_5:
          "銀證轉賬是指銀行根據用戶指令，為其提供證券交易時間內個人銀行帳戶與立橋證券資金帳戶之間的資金即時劃轉的金融服務。您可通過銀證轉賬直接將銀行資金轉入立橋證券帳戶。",
        text_6: "如何進行銀證轉賬",
        text_7:
          "通過招商永隆銀行手機APP，進入【全部-理財-銀證轉賬-轉賬-銀轉證】，輸入轉賬金額即可轉賬入金，限定交易時間為香港工作日08:00-16:00。",
        text_8: "查看銀證轉賬指南",
        text_9:
          "1、招商永隆銀行限定的交易時間為香港工作日的08:00-16:00（北京時間），非工作時間以及週六、周日和香港假期不接受轉賬申請。      ",
        text_10: "2、銀證轉賬操作則無需在犇犇進行發起匯款通知。",
        text_11: "您關聯銀行的證券帳戶：",
      },
      ways: {
        text_1: "請選擇一種轉賬方式入賬",
        text_2: "FPS轉數快",
        text_3: "E-banking網銀轉賬",
        text_4: "支票轉賬",
        text_5: "最快3小時內",
        text_6: "預計2小時",
        text_7: "1-2個工作日",
        text_8: "0元",
        text_9: "請諮詢銀行",
        text_10: "1.立橋證券不接受直接存入現金",
        text_11: "2.需使用本人 {config} 同名帳戶入金",
        text_12: "3.香港卡開戶，首筆入金需≥10000港幣（等值外幣）",
        text_13: "暫未配置該銀行入金方式，請聯繫客服",
      },
      edda: {
        edda_list: {
          title: "請選擇入金銀行帳戶",
          text_1: "添加銀行帳戶",
          text_2: "提示",
          text_3: "確定執行此操作嗎？",
          text_4: "操作成功",
        },
        bind: {
          text_1: "銀行名稱",
          text_2: "銀行戶名",
          text_3: "輸入您的銀行戶名",
          text_4: "*請確保該戶名與您香港銀行帳戶所登記的戶名一致",
          text_5: "銀行帳戶類型",
          text_6: "請選擇",
          text_7: "銀行帳號",
          text_8: "請輸入您的港幣匯款帳號",
          text_9: "銀行開戶證件類型",
          text_10: "證件號碼",
          text_11: "請輸入您的銀行開戶證件號碼",
          text_12: "本人已閱讀、理解並同意接受",
          text_13: "《快捷入金用戶協議》",
          text_14: "確認授權",
          text_15: "授權失敗",
          tips: {
            text_1: "溫馨提示：",
            text_2: "1.請確保所填內容準確無誤，否則會授權失敗。",
            text_3:
              "2.銀行處理您的授權一般需要1~5個工作日，授權結果將會通過短信通知到您。",
            text_4: "1.什麼是港幣帳戶？",
            text_5:
              "資金儲蓄、往來僅支持港幣的帳戶。不同的幣種對應不同的銀行帳戶號碼。",
            text_6: "2.什麼是綜合帳戶？",
            text_7:
              "資金儲蓄、往來支持多個幣種的帳戶。不同的幣種對應同一個銀行帳戶號碼。",
            text_8: "銀行戶名僅支持大寫英文字母和空格",
            text_9: "請確認證件號碼是否正確",
            text_10: `<p>本部份規管立橋證券為客戶提供電子直接付款授權服務及客戶使用電子直接付款授權服務。本部份補充各項立橋證券不時修訂之條款及細則及任何適用於規管立橋證券服務的協議或條款及細則。</p>
          <p>通過在智珠寶移動應用程式上勾選“本人已閱讀、理解並同意接受《快捷入金用戶協議》“即表示您已簽署本條款及細則，並同意受本條款及細則的所有條款的約束。</p>
          <p>1. 在本條款及細則，下列的詞語具下列定義：</p>
          <p>「電子直接付款授權」指使用結算公司快速支付系統以電子方式設置的直接付款授權。</p>
          <p>「電子直接付款授權服務」指由結算公司提供作為結算公司快速支付系統一部份的服務，讓參與者的客戶設置直接付款授權並具有第2(a)條中規定的含義。</p>
          <p>「閣下」及「閣下的」指立橋證券提供證券服務的每位客戶，及如文義允許，包括任何獲客戶授權向立橋證券發出有關使用證券服務的指示或要求的人士。</p>
          <p>「結算公司」指香港銀行同業結算有限公司及其繼承人及受讓人。</p>
          <p>「結算公司快速支付系統」或「快速支付系統」指由結算公司不時提供、管理及運作的快速支付系統及其相關設施及服務，用作(i)處理直接付款及存款、資金轉賬及其他付款交易；及(ii)就電子直接付款授權服務及帳戶綁定服務交換及處理指示。</p>
          <p>「香港」指中華人民共和國香港特別行政區。</p>
          <p>「監管規定」指本公司、銀行、結算公司、任何其他參與者、彼等各自的聯繫公司或集團公司或閣下不時受規限或被期望遵守的任何法律、規例或法庭判令，或由任何監管機構、政府機關(包括稅務機關)、結算或交收銀行、交易所、業界或自律監管團體(不論於香港境內或境外)發出的任何規則、指示、指引、守則、通知或限制(不論是否具有法律效力)。</p>
          <p>2. 電子直接付款授權服務</p>
          <p>(a) 基於立橋證券與銀行的授權與合作，立橋證券將向客戶申請電子直接付款授權服務提供相應服務，即客戶若通過立橋證券向銀行申請電子直接付款授權服務的，立橋證券將協助前述申請指令、資料及資訊按照銀行要求路徑傳送至銀行，授權被銀行批核後，客戶可直接向立橋證券發出指示，進行由銀行至立橋證券的直接付款授權資金轉賬。若該授權申請被銀行拒絕，立橋證券會通知客戶該授權結果，但並不會就該授權結果負任何責任。</p>
          <p>(b) 閣下須以立橋證券不時指定的形式或方法提供或輸入所需資料並完成程式，立橋證券方可協助閣下處理有關向銀行申請設置電子直接付款授權的要求。閣下所輸入的銀行帳戶資料必需為閣下之同名帳戶，立橋證券不接受聯名戶口之申請。</p>
          <p>(c) 如果閣下已經設置了電子直接付款授權，但於長時間內未有根據該授權進行操作，立橋證券有權取消該直接付款授權而無須另行通知閣下，即使該授權尚未到期或未有注明授權到期日或終止日期；銀行亦有可能取消該直接付款授權，如該授權被銀行取消，客戶需自行向銀行查詢。</p>
          <p>(d) 客戶通過立橋證券向銀行申請之電子直接付款授權服務，預設轉賬為每筆，轉賬限額無上限為，協議時長為無期限，如客戶不接受該預設數值，客戶不應繼續透過立橋證券向銀行申請電子直接付款授權。</p>
          <p>(e) 客戶可以透過銀行之銀行服務向銀行發出更改電子直接付款授權轉賬限額及協議時長的指令。</p>
          <p>(f) 電子直接付款授權將持續生效，如閣下要取消或更改電子直接付款授權設置，請閣下聯絡已授權帳戶之所屬銀行處理。</p>
          <p>3. 閣下的責任</p>
          <p>(a) 閣下須負責</p>
          <p>當閣下向立橋證券發出有關使用電子直接付款授權服務的指示或要求，及/或當閣下授權其他人士向立橋證券發出有關使用電子直接付款授權服務的指示或要求（不論閣下為個人、公司、法團、獨資經營或合夥公司或任何其他非法團性質的組織）：</p>
          <p>(i) 閣下須為所有作為及不作為負責，及/或閣下須為每名獲閣下授權的人士的所有作為及不作為負責；</p>
          <p>(ii) 任何立橋證券收到由閣下或任何獲閣下授權的人士發出的指示或要求，均屬不可撤銷並對閣下具有約束力；及</p>
          <p>(iii) 閣下有責任遵守本條款適用的條款，及/或閣下有責任確保每名獲閣下授權的人士均會遵守本條款就其代閣下行事適用的條款。</p>
          <p>4. 閣下的指示具約束力</p>
          <p>當閣下向立橋證券發出申請之電子直接付款授權服務的指示及用已授權的銀行帳戶存入資金的指示，該指示即屬不可撤銷，並對閣下具有約束力。</p>
          <p>閣下確認，明白及接受透過電子直接付款授權服務經其銀行帳戶把有關的金錢或資金存入立橋證券的指定銀行帳戶內以作買入證券或就交易作出結算(“網上存款”)下之風險。如客戶選擇以此方法存入金錢或資金，即表示客戶完全接受當中之風險，同意承擔該風險與及因而產生之一切責任，包括但不限於以下該等風險及責任：</p>
          <p>(i) 閣下須於發出網上存款之有關指示前，自行確保所有有關的程式、步驟、數據、帳戶號碼、繳付帳單號碼、個人悉別號碼、存入之金額及有關存入金錢或資金至立橋證券之資料已被詳細檢查及核實為真實、正確及無誤。當閣下以任何方式發出網上存款之有關指示後，該等指示均不可在並無立橋證券的書面同意下被修訂、撤銷、刪除或取消，並對立橋證券具有效性及效力及對閣下構成絕對及不可推翻的約束力。閣下確認立橋證券不會於任何情況下因網上存款而產生或與之有關之損失、訟費、費用、開支而承擔任何責任，即使客戶於發出該等指示時有錯誤或誤會；</p>
          <p>(ii) 立橋證券有權將閣下就網上存款給予的指示，視為獲閣下全面授權，並對閣下具約束力的指示。立橋證券有權依據及根據該等指示行事，並無須查詢或核實作出或給予該等指示的人士的許可權或身份，亦無須理會給予該等指示之時的當時情況，即使當中有任何錯誤、誤導成分、不清楚、詐騙、偽造或欠缺權力依據等情況；</p>
          <p>(iii) 閣下同意及接受，如立橋證券於其每日指定截數時間之後接獲有關之網上存款指示，該指示將會被視為於下一個營業日被立橋證券接獲，但立橋證券可按其絕對酌情權處理。立橋證券在任何情況下無須對客戶因上述之安排而引致(直接或間接)或就此而蒙受及/或招致的任何損失、損害賠償、開支或任何利潤損失，向客戶承擔法律責任(包括因疏忽招致的法律責任)；及</p>
          <p>(iv) 閣下完全明白及同意，有關網上存款發出的任何指示，會因通訊網絡故障、系統故障、裝置或軟體受到干擾或其他情況而導致受干擾、延誤或未能傳達。閣下同意承擔一切因此而產生之風險及自行對閣下因網上存款而引致(直接或間接)或就此而蒙受及/或招致的任何損失、損害賠償、開支或任何利潤損失承擔法律責任。</p>
          <p>5. 收集及使用閣下資料</p>
          <p>(a) 為了使用電子直接付款授權服務，閣下可能需要不時向立橋證券提供個人資料及其他資料，立橋證券不時就有關證券服務及電子直接付款授權服務獲提供或由立橋證券編制的個人資料及資訊統稱為「客戶資料」。</p>
          <p>(b) 閣下同意（及如適用，閣下代表閣下的每名董事、人員、雇員、獲授權人士及代表同意）立橋證券可為電子直接付款授權服務的用途收集、使用、處理、保留或轉移任何閣下資料。此等用途包括但不限於下列一項或多項：</p>
          <p>(i) 向閣下提供電子直接付款授權服務，維持及運作電子直接付款授權服務</p>
          <p>(ii) 處理及執行閣下不時有關電子直接付款授權服務的指示及要求；</p>
          <p>(iii) 披露或轉移閣下資料予銀行,結算公司及其他參與者，供電子直接付款授權服務的運作使用；</p>
          <p>(iv) 按需遵守的監管規定而作出披露；及</p>
          <p>(v) 及任何與上述有關的用途。</p>
          <p>(c) 閣下明白及同意閣下資料可能被立橋證券、銀行、結算公司、或其他參與者再披露或轉移予其閣下及任何其他使用結算公司快速支付系統的第三者，作為提供及運作電子直接付款授權服務之用。</p>
          <p>(d) 倘閣下資料包括閣下以外其他人士的個人資料，閣下確認閣下已取得該人士同意，就銀行、結算公司、立橋證券及其他參與者按本條款指明的用途使用（包括披露或轉移）其個人資料及其他資料。</p>
          <p>6. 責任限制</p>
          <p>(a) 閣下同意立橋證券無須負責閣下或任何其他人士有關或因使用電子直接付款授權服務，或有關或因處理或執行閣下就有關電子直接付款授權服務或結算公司快速支付系統的指示或要求，而可能引致或蒙受的任何種類的損失、損害或開支，除非任何上述損失、損害或開支屬直接及可合理預見並直接且完全由於立橋證券或立橋證券人員、雇員或代理的疏忽或故意失責引致；</p>
          <p>(b) 閣下同意立橋證券無須負責閣下或任何其他人士因或有關下列一項或多項事宜，而可能引致或蒙受的任何種類的損失、損害或開支：</p>
          <p>(i) 結算公司快速支付系統產生或引致的，或立橋證券可合理控制以外的情況引致的延誤、無法使用、中斷、錯誤或故障；及</p>
          <p>(ii) 在任何情況下，就任何收益損失或任何特別、間接、附帶、相應而生或懲罰性損失或損害賠償（不論是否可預見或可能招致），立橋證券、立橋證券的關聯公司或集團公司、立橋證券的特許人、及上述彼等各自的人員、雇員或代理均無須向閣下或任何其他人士負責。</p>
          <p>7. 免責及責任承擔</p>
          <p>閣下確認及同意，任何因您違反您的陳述或擔保、或您接受並執行任何說明、或應依照相關條款和約定應履行的相關義務，或其他您任何與前述違約行為有關的情形由此給我們及立橋集團項下任何其他成員造成任何損失，損害，責任，成本，索償，要求和其他支出（無論是否基於稅收，關稅或其他事項），您均應承擔全部賠償責任。</p>
          <p>閣下確認及同意，由於您自身原因，包括任何不明確或不完整的說明而導致服務無法執行和/或由於閣下自身的任何錯誤和/或系統故障導致的任何直接損失、損害或費用、間接損失或由此造成的損失，損害或費用概不負責, 並須就因此而直接或間接招致或與此相關的所有費用、索償、債務及開支，全數向立橋證券作出彌償。</p>
          <p>8. 分割性</p>
          <p>倘若本條款所載之任何條文變為不合法，無效或不能強制執行，其餘條文將繼續有約束力及有效。</p>
          <p>9. 修訂</p>
          <p>立橋證券在作出適用的營運守則或操守準則所規定的合理知會下可隨時及不時修訂及/或補充或新增本條款所載之任何條文，該等修訂及新增條文即告生效。倘若客戶於接獲通知後仍繼續使用立橋證券當時提供之服務，該等修訂及/或補充/新增條文在其生效日起被視為獲客戶接納及對客戶立即具約束力。</p>
          <p>10. 第三者權利</p>
          <p>除客戶及立橋證券以外，並無其他人士有權按《合約（第三者權利）條例》（香港法例第623章）強制執行本條款的任何條文，或享有本條款的任何條文下的利益。</p>
          <p>11. 法律及司法管轄</p>
          <p>本條款受香港法律及不時以展示、廣告或其他方式告知客戶至現時仍生效或經修訂、制訂或授用之立橋證券之章程、規例及慣例之管轄，並須按香港法律詮釋。客戶茲服從香港法庭行使非專屬司法管轄權對因上述事項而產生及與之有關的所有爭議及申索之決定、執行及判定。</p>
          `, // text_10: '本部份規管立橋證券為客戶提供電子直接付款授權服務及客戶使用電子直接付款授權服務。本部份補充各項立橋證券不時修訂之條款及細則及任何適用於規管立橋證券服務的協議或條款及細則。通過在智珠寶移動應用程式上勾選“本人已閱讀、理解並同意接受《快捷入金用戶協議》“即表示您已簽署本條款及細則，並同意受本條款及細則的所有條款的約束。', // text_11: '1. 在本條款及細則，下列的詞語具下列定義：', // text_12: `「電子直接付款授權」指使用結算公司快速支付系統以電子方式設置的直接付款授權。 // 「電子直接付款授權服務」指由結算公司提供作為結算公司快速支付系統一部份的服務，讓參與者的客戶設置直接付款授權並具有第2(a)條中規定的含義。 // 「閣下」及「閣下的」指立橋證券提供證券服務的每位客戶，及如文義允許，包括任何獲客戶授權向立橋證券發出有關使用證券服務的指示或要求的人士。 // 「結算公司」指香港銀行同業結算有限公司及其繼承人及受讓人。 // 「結算公司快速支付系統」或「快速支付系統」指由結算公司不時提供、管理及運作的快速支付系統及其相關設施及服務，用作(i)處理直接付款及存款、資金轉賬及其他付款交易；及(ii)就電子直接付款授權服務及帳戶綁定服務交換及處理指示。 // 「香港」指中華人民共和國香港特別行政區。 // 「監管規定」指本公司、銀行、結算公司、任何其他參與者、彼等各自的聯繫公司或集團公司或閣下不時受規限或被期望遵守的任何法律、規例或法庭判令，或由任何監管機構、政府機關(包括稅務機關)、結算或交收銀行、交易所、業界或自律監管團體(不論於香港境內或境外)發出的任何規則、指示、指引、守則、通知或限制(不論是否具有法律效力)。`, // text_13: '2. 電子直接付款授權服務：', // text_14: '(a) 基於立橋證券與銀行的授權與合作，立橋證券將向客戶申請電子直接付款授權服務提供相應服務，即客戶若通過立橋證券向銀行申請電子直接付款授權服務的，立橋證券將協助前述申請指令、資料及資訊按照銀行要求路徑傳送至銀行，授權被銀行批核後，客戶可直接向立橋證券發出指示，進行由銀行至立橋證券的直接付款授權資金轉賬。若該授權申請被銀行拒絕，立橋證券會通知客戶該授權結果，但並不會就該授權結果負任何責', // text_15: '銀行帳號只能輸入數字'
          },
        },
        remit: {
          text_1: "匯款帳號",
          text_2: "請選擇",
          text_3: "存入金額",
          text_4: "港幣",
          text_5: "請輸入金額",
          text_6: "+ 添加銀行帳戶",
          tips: {
            text_1: "1.入金只需要在此頁面提交申請即可，不需要前往銀行端操作。",
            text_2:
              "2.如您已在銀行端解除授權，請勿通過此頁面發起入金申請，並聯系客服400-688-3187更正授權狀態。",
            text_3: "請選擇匯款帳號",
            text_4: "請輸入存入金額",
            text_5:
              "*請確保銀行帳戶有足夠資金，以免資金不足導致扣款失敗，影響您的交易。",
            text_6: "存入金額至少0.01港幣",
            text_7: "存入金額請勿超過單筆限額",
          },
        },
        notify: {
          text_1: "恭喜您，提交成功！",
          text_2:
            "銀行處理您的授權一般需要1~5個工作日，授權結果將會通過短信通知到您。",
          text_3:
            "港股交易時間段最快5分鐘入賬，非港股交易時間段將於下個港股交易日09:00前入賬，具體時間請以短信通知為准。",
          text_4: "查看入金狀態",
        },
        tips: {
          text_1: "1.什麼是快捷入金？",
          text_2:
            "快捷入金是指客戶通過eDDA授權立橋證券從指定的香港銀行帳戶劃撥指定數額的資金至證券帳戶。eDDA即電子直接付款授權，是香港金管局推出的FPS轉數快系統的增值服務。",
          text_3: "2.快捷入金有哪些優勢",
          text_4: "極速到賬、免手續費。通過智珠寶直接入金，無需登錄銀行端。",
        },
      },
      fps: {
        text_1: "立橋證券FPS收款帳戶資料：",
        text_2: "FPS識別碼",
        text_3: "收款銀行",
        text_4: "收款戶名",
        text_5: "FPS轉數快指南",
        tips: {
          text_1: "FPS轉數快簡介",
          text_2:
            "FPS轉數快是香港金融管理局於2018年9月30日推出的全面連接銀行的快速支付系統。",
          text_3: "(1)即時跨行轉賬",
          text_4: "(2)費用全免",
          text_5: "(3)365x24x7轉賬服務",
          text_6: "(4)支持港幣",
          text_7:
            "(5)透過FPS識別碼快速付款，後續將支持QR code掃碼等便捷付款方式。",
          text_8: "FPS轉數快轉賬步驟",
          text_9: "(1)打開所持銀行卡的網銀、手機銀行、第三方支付工具或電子錢包",
          text_10: "(2)找到FPS轉數快入口，選擇“付款/轉賬”",
          text_11: "(3)收款人資訊欄輸入立橋FPS識別碼：{config}",
          text_12: "(4)確認收款人戶名是否為：{config}",
          text_13: "(5)轉賬成功後截圖作為匯款憑證",
          text_14:
            "(6)上傳匯款憑證（可直接點擊），或打開智珠寶App，點擊【我的】-【證券服務】-【存入資金】，進行上傳",
        },
      },
      eBanking: {
        text_1: "立橋證券網銀轉賬收款帳戶資料：",
        text_2: "收款帳號",
        text_3: "銀行中文名",
        text_17: "銀行英文名",
        text_4: "帳號名稱",
        text_5: "SWIFT代碼",
        text_6: "銀行地址",
        text_7: "查看網銀轉賬指南",
        text_8: "帳戶號碼",
        text_9: "帳戶名稱",
        text_10: "帳戶地址",
        text_11: "查看 {config} 匯款指南",
        text_12:
          "收款帳號由立橋證券在星展銀行以您的名義開立,用於接收來自大陸銀行的同名,點擊免費免費獲取收款帳號.請注意,帳號需要至少60分鐘才能生效,一經生效,可永久使用",
        text_13: "獲取收款帳號,至少60分鐘後生效",
        text_14: "申請中",
        text_15: "已申請",
        text_16: "申請異常",
      },
      check: {
        text_1:
          "請使用您本人 {config} 的銀行帳戶匯款，匯款人請填寫證券預留姓名 {config}",
        text_2: "1、支票填寫：",
        text_3: "收款人名稱",
        text_4: "收款人帳號",
        text_5: "2、發起匯款通知：",
        text_6: "在APP發起匯款通知上傳支票的圖片，通知立橋確認支票是否無誤",
        text_7: "3、郵寄支票",
        text_8: "收到立橋短信回復支票無誤再將支票郵寄到以下",
        text_9: "地址：香港，立橋證券有限公司",
        text_10: "電話：",
        text_11: "聯繫人：",
        text_12: "支票轉賬指南",
      },
      remit: {
        text_1: "銀行戶名",
        text_2: "匯款帳號",
        text_3: "確認帳號",
        text_4: "存入金額",
        text_5: "在此輸入帳號",
        text_6: "在此輸入金額",
        text_7: "上傳憑證",
        text_8:
          "根據香港證監會要求，入金必須為同名帳戶，為保證您的資金安全和入賬速度，請確保您上傳的憑證包含匯款銀行名稱、姓名、完整匯款帳號和收款帳號等資訊，如果一張圖片不能同時包含匯款銀行名稱和姓名，可補充上傳銀行結單或截圖輔助證明。",
        text_9: "備註",
        text_10: "請輸入備註（選填）",
        text_11: "確認帳號和匯款帳號需保持一致",
        text_12: "匯款銀行",
        text_13: "在此輸入銀行名稱",
        text_14: "收款銀行",
        text_15: "請選擇收款銀行",
        text_16: "至少上傳一張憑證",
      },
    },
    withdraw: {
      name: "提取資金",
      select_bank: {
        text_1: "出金提示",
        text_2:
          "近期有較多客戶回饋大陸銀行無法接收外匯匯款。如發生退款，已收取的手續費銀行不做退回，並且退款時間較長（5-20個工作日）。立橋正在準備新的出金管道盡力為客戶提供順暢的服務體驗。如您近期有提款需求，建議提前辦理香港銀行卡。",
        text_3: "辦卡指引",
        text_4:
          "民生銀行（香港）卡出金無需提交出金申請，您可直接前往香港民生網銀/ APP申請提取，",
        text_5: "查看民生香港出金指引>>",
        text_6: "民生",
      },
      request: {
        text_1: "提取帳戶",
        text_2: "現金賬戶",
        text_3: "收款帳戶資訊",
        text_4: "收款銀行",
        text_5: "帳戶名稱",
        text_6: "銀行帳號",
        text_7: "請輸入轉出銀行帳號",
        text_8: "確認帳號",
        text_9: "請再次輸入銀行帳號",
        text_10: "swift code",
        text_11: "向您的{name}銀行諮詢swift code",
        text_12:
          "請向您的{name}收款銀行諮詢Swift Code，提供錯誤資訊可能會發生提款延遲及額外費用。",
        text_13: "聯繫地址",
        text_14: "請輸入聯繫地址（非必填）",
        text_15: "資金資訊",
        text_16: "幣種",
        text_17: "提取金額",
        text_18: "在此輸入金額",
        text_19: "可提金額：",
        text_20: "全部提取",
        text_21:
          "200-400港幣（銀行收取), 提取金額1000元以下時立橋證券將收取10港幣手續費",
        text_22: "5-10個銀行工作日",
        text_23: "5-10個銀行工作日",
        text_24: "提取",
        text_25: "請選擇您的提取帳戶",
        text_26: "請選擇您的銀行帳號",
        text_27: "確認帳號和銀行帳號需保持一致",
        text_28: "提取資金需大於等於10港幣",
        text_29: "提取資金不可超過可提資金",
        text_30:
          "您尚未入金或未綁定香港銀行卡，請先入金或綁卡，如有疑問請聯繫客服，點擊撥打",
        text_31: "銀行名稱",
        text_32: "在此輸入銀行名稱",
        text_33: "手續費",
        text_34: "實際提取金額",
        text_35: "抱歉，您的實際提取金額不足",
      },
    },
    notify: {
      text_1: "憑證上傳成功",
      text_2: "我們將儘快核實並同步您的資金資訊",
      text_3: "申請提交成功",
      text_4: "您的提取資金申請已成功提交，我司將在1-2個工作日內處理。",
    },
    my_bank: {
      name: "我的銀行卡",
      text_1: "銀行卡類型",
      text_2: "香港卡",
      text_3: "大陸卡",
      text_4: "刪除",
      text_5: "確定要解除綁定該銀行卡？",
      text_6: "解綁成功",
      text_7: "解綁失敗",
      text_8: "您還沒有綁定銀行卡",
      text_9:
        "1.【我的銀行卡】中記錄了您入金銀行卡相關資訊，立橋證券保證所有資訊只會用於您在立橋證券的出入金等資金操作，不會用於其他任何行為；",
      text_10:
        "2.很抱歉當前不支持香港銀行卡刪除操作，如果有刪除需求請您諮詢客服",
      text_11:
        "立橋證券每個用戶最多可使用三張香港銀行卡入金，您需要解綁至少一張香港銀行卡，才能選擇其他銀行卡入金",
      text_12:
        "立橋證券每個用戶最多可使用三張大陸銀行卡入金，您需要解綁至少一張大陸銀行卡，才能選擇其他銀行卡入金",
      text_13:
        "每人至多使用三張同類型（大陸/香港/其他地區）銀行卡入金，您需要解綁至少一張同類型銀行卡，才能選擇其他銀行卡入金。",
    },
    history: {
      name: "資金申請記錄",
      common: {
        text_1: "入金記錄",
        text_2: "出金記錄",
        text_3: "存入總額",
        text_4:
          "到賬金額為您歷史成功入金金額之和，如果您對統計結果存在疑問，請您諮詢客服",
        text_5: "提取總額",
        text_6:
          "到賬金額為您歷史成功提取金額之和，針對統計結果如果有疑問，請您諮詢客服",
        text_7: "溫馨提示：點擊“處理中”記錄進入詳情頁面即可取消",
        text_8: "所有幣種",
        text_9: "所有狀態",
        text_10: "待審核",
        text_11: "審核中",
        text_12: "已駁回",
        text_13: "已完成",
        text_14: "已取消",
        text_15: "，立橋將確保您的資產的準確和安全。",
        text_16: "已退款",
      },
      funds: {
        text_1: "提交時間",
        text_2: "銀行卡類型",
        text_3: "銀行名稱",
        text_4: "銀行卡帳號",
        text_5: "提取帳戶",
        text_6: "轉賬方式",
        text_7: "存入帳戶",
        text_8: "轉賬憑證",
        text_9: "審核狀態",
        text_10: "駁回時間",
        text_11: "駁回原因",
        text_12: "相同方式再次入金",
        text_13: "取消出金申請",
        text_14: "確認取消該條出金申請嗎？",
        text_15: "取消成功",
        text_16: "存入金額",
        text_17: "提取金額",
        text_18: "存入",
      },
      stock: {
        text_1: "所有兌換類型",
        text_2: "港幣兌換美元",
        text_3: "美元兌換港幣",
      },
    },
    capital: {
      name: "資金流水",
    },
    roll_over_history: {
      name: "轉倉申請記錄",
    },
    stock_history: {
      name: "股票流水",
    },
    into_stock: {
      name: "轉入股票",
    },
    out_stock: {
      name: "轉出股票",
      info_tips:
        "請您至立橋證券官網下載並填寫轉出股票表格，若有疑問，請諮詢客服400-688-3187",
    },
    brokerage: {
      name: "我的傭金",
    },
    statement: {
      name: "我的結單",
    },
    quotes: {
      name: "行情購買",
    },
    capital_flow: {
      name: "資金流水",
      stock_flow_name: "股票流水",
      common: {
        text_1: "入金總額",
        text_2: "出金總額",
        text_3: "篩選條件",
        text_4: "今日",
        text_5: "近一周",
        text_6: "近一個月",
        text_7: "近三個月",
        text_8: "篩選日期",
        text_9: "業務類型",
        text_10: "幣種",
        text_11: "資金流向",
        text_12: "全部",
        text_13: "資金存取",
        text_14: "新股認購",
        text_15: "證券交易",
        text_16: "公司行動",
        text_17: "其他",
        text_34: "全部",
        text_18: "港幣",
        text_19: "美元",
        text_20: "轉入",
        text_21: "轉出",
        text_22: "選擇開始日期",
        text_23: "至",
        text_24: "選擇結束日期",
        text_25: "時間跨度請勿超過兩年",
        text_26: "餘額",
        text_27: "已無更多",
        text_28: "市場",
        text_29: "港股",
        text_30: "美股",
        text_31: "餘量",
        text_32: "證券存取",
        text_33: "證券流向",
      },
    },
    company_act: {
      market: {
        title: "請選擇交易所",
        hk: "香港聯合交易所",
        us: "美國交易所",
      },
      common: {
        text_1: "确定",
        text_2: "取消",
        text_3: "溫馨提示",
        search: "搜索",
      },
      label: {
        asterisk: "為必填項",
        text_1: "交易所",
        text_2: "公司行動名稱",
        text_3: "行動選擇",
        text_4: "其他",
        text_5: "股票股數",
        text_6: "現金股數",
        text_7: "需轉換股數",
        text_8: "部分供股股數",
        text_9: "額外供股股數",
        text_10: "現金收購",
        text_11: "需轉換股數",
        text_12: "附言",
        text_13: "提交",
        text_14: "預覽",
        text_15: "交易所:",
        text_16: "香港聯合交易所",
        text_17: "公司行動名稱:",
        text_18: "公司行動:",
        text_19: "股票股數:",
        text_20: "現金股數:",
        text_21: "需轉換股數:",
        text_22: "部分供股股數:",
        text_23: "額外供股股數（如適用）:",
        text_24: "現金收購:",
        text_25: "需轉換股數:",
        text_26: "附言:",
        text_27: "請確認以上信息無誤。",
        text_28:
          "若您不符合參與該股票公司行動的條件，或於提交時已過本行所規定的該股票",
        text_29: "公司行動回復的截止時間，或填寫有誤，本行將不會進行處理。",
        text_30: "接受收購股數",
        text_31: "提交時間",
        text_32: "返回",
        text_33: "需行使股數",
        text_34: "需行使股數:",
      },
      placeholder: {
        text_1: "請輸入股票代碼/名稱/首字母",
        text_2: "請輸入",
        text_3: "請輸入股票股數",
        text_4: "請輸入現金股數",
        text_5: "請輸入需轉換股數",
        text_6: "請輸入部分供股股數",
        text_7: "請輸入額外供股股數",
        text_8: "請輸入部分供股股數",
        text_9: "請輸入接受收購股數",
        text_10: "請輸入需轉換股數",
        text_11: "請輸入附言",
        text_12: "請選擇股票",
        text_13: "請選擇行動選擇",
        text_14: "請輸入股票股數以及現金股數",
        text_15: "請輸入其他",
        text_16: "請選擇公司行動名稱",
        text_17: "請輸入正整數",
      },
      notice: {
        text_1: "您的申請已提交。",
        text_2:
          "請注意：若您不符合參與該股票公司行動的條件，或於提交時已過本行所規定的該股票公司行動回復的截止時間，或填寫有誤，本行將不會進行處理。",
      },
    },
  },
};
