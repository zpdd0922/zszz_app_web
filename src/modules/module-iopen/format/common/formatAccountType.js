/**
 * 账户市场
 * @param {*} args
 */
export const accountMarkets = (args) => {
    const { isOpenHk, isOpenUs, isOpenOptions, isOpenFutures } = args;

    let selectedMkts = [];
    if (Number(isOpenHk) === 1) {
        selectedMkts.push(1);
    }
    if (Number(isOpenUs) === 1) {
        selectedMkts.push(2);
    }
    if (Number(isOpenOptions) === 1) {
        selectedMkts.push(3);
    }
    if (Number(isOpenFutures) === 1) {
        selectedMkts.push(4);
    }
    return selectedMkts;
};