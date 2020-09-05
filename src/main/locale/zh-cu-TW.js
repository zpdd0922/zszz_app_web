export default {
  cancel: '取消',
  confirm: '確認',
  ok: '確定',
  prev: '上一步',
  next: '下一步',
  selectText: '請選擇',
  now: '現在',
  selectTime: '選擇時間',
  today: '今日',
  formatDate: 'M月D日',
  hours: '點',
  minutes: '分',
  validator: {
    required: '此為必填項',
    type: {
      string: '請輸入字元',
      number: '請輸入數位',
      array: '資料類型應為數組',
      date: '請選擇有效日期',
      email: '請輸入有效郵箱',
      tel: '請輸入有效的手機號碼',
      url: '請輸入有效網址'
    },
    min: {
      string: '至少輸入{{config}}比特字元',
      number: '不得小於{{config}}',
      array: '請選擇至少{{config}}項',
      date: '請選擇{{config | toLocaleDateString（“yyyy年MM月dd日”）}}之後的時間',
      email: '至少輸入{{config}}比特字元',
      tel: '至少輸入{{config}}比特字元',
      url: '至少輸入{{config}}比特字元'
    },
    max: {
      string: '請勿超過{{config}}比特字元',
      number: '請勿大於{{config}}',
      array: '最多選擇{{config}}項',
      date: '請選擇{{config | toLocaleDateString（“yyyy年MM月dd日”）}}之前的時間',
      email: '請勿超過{{config}}比特字元',
      tel: '請勿超過{{config}}比特字元',
      url: '請勿超過{{config}}比特字元'
    },
    len: {
      string: '請輸入{{config}}比特字元',
      number: '長度應等於{{config}}',
      array: '請選擇{{config}}項',
      date: '請選擇{{config | toLocaleDateString（“yyyy年MM月dd日”）}}之前的時間',
      email: '請輸入{{config}}比特字元',
      tel: '請輸入{{config}}比特字元',
      url: '請輸入{{config}}比特字元'
    },
    pattern: '格式錯誤',
    custom: '未通過校驗',
    notWhitespace: '空白內容無效'
  }
}