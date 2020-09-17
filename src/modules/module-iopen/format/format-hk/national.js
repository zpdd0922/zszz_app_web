export const nationalFormat = (args) => {
  const { idKindKey, nationType } = args;
  if (idKindKey === 'idCardCn') {
    return 0;
  }
  if (idKindKey === 'idCardHk' || idKindKey === 'idCardHkTemp') {
    return 2;
  }
  if (idKindKey === 'passport') {
    return `nationType`;
  }

  return 0;
};
