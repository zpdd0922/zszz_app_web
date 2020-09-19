// 联络信息字段(用于校验)
export const contactValidator = [
  { key: 'email' },
  { key: 'educationLevel' },
  { key: 'maritalStatus' },
  { key: 'homeRadio' },
  { key: 'homeCity' },
  { key: 'homeAddressDetail' },
  // { key: 'homeAddressNumber' },
  { key: 'homeOtherCountry' },
  { key: 'homeOtherProvince' },
  { key: 'homeOtherCity' },
  { key: 'homeOtherArea' },
  { key: 'otherFamilyRepublic' },
  { key: 'contactRadio' },
  { key: 'contactCity' },
  { key: 'contactOhterCountry' },
  { key: 'contactOtherProvince' },
  { key: 'contactOtherCity' },
  { key: 'contactOtherArea' },
  { key: 'contactAddressDetail' },
  // { key: 'contactAddressNumber' },
  { key: 'otherContactRepublic' } 
];

// 验证职业类型字段(用于校验)
export const professionValidator = [
  'professionCode',
  'companyName',
  'companyAddress',
  'industryRange',
  'jobPosition',
];
