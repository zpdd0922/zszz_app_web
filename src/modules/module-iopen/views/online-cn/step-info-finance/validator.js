// 验证财务状况字段(用于校验)
export const capitalValidator = [
  'income',
  'totalAssets',
  // 'investmentHorizon',
  'capital',
  'investTarget',
];

// 验证财务状况字段(用于校验)
// export const capitalValidator = [
//   'income',
//   'assets',
//   'capital',
//   'investTarget',
// ];

// 财产种类字段(用于校验)
export const assetValidator = [
  { key: 'allCheck', valueKey: 'allValue' },
  { key: 'realCheck', valueKey: 'realValue' }
];

// // 财产种类字段(用于校验)
// export const assetValidator = [
//   { key: 'bankCheck', valueKey: 'bankValue' },
//   { key: 'stockCheck', valueKey: 'stockValue' },
//   { key: 'realCheck', valueKey: 'realValue' }
// ];
