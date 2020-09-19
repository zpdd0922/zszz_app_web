export const nationalFormat = (args) => {
  const { idKindKey, nationType } = args;
  if (idKindKey === 'idCardCn') {
    return 0;
  }
  if (idKindKey === 'idCardHk' || idKindKey === 'idCardHkTemp') {
    return 2;
  }
  if (idKindKey === 'passport') {
    return nationType;
  }

  return 0;
};

// export const nationalTxt = () => {
//   const { idKindKey, nationType, nationTxt } = args;
//   const nationInfo = {
//     txt: '中国',
//     area: '', 
//   };
//   if (idKindKey === 'idCardCn') {
//     return "中国";
//   }
//   if (idKindKey === 'idCardHk' || idKindKey === 'idCardHkTemp') {
//     return "中国";
//   }
//   if (idKindKey === 'passport') {
//     if (nationType === "MAC" || )
//       return ``;
//   }

//   return 0;

// }