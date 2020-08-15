/**
 * 账户市场
 * @param {*} args
 */
export const accountMarkets = (args) => {
    const { fundAccountType, fundAccountCashMarkets, fundAccountMarginMarkets } = args;
    
    let selectedMkts = [];
    if (fundAccountType === 1) {
        selectedMkts = fundAccountCashMarkets;
    }
    if (fundAccountType === 2) {
        selectedMkts = fundAccountMarginMarkets;
    }

    return selectedMkts;

    // const isOpenHkStockMarket = selectedMkts.includes('1') ? 1 : 0;
    // const isOpenUsaStockMarket = selectedMkts.includes('2') ? 1 : 0;
    // const northTrade = selectedMkts.includes('3') ? 1 : 0;

    // return { northTrade, isOpenHkStockMarket, isOpenUsaStockMarket };
};