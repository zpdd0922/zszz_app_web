const _import = (path, file = "index") => () =>
  import(/* webpackChunkName:"iaccount" */ `../../views/${path}/${file}.vue`);

const stockTransferHistory = [
  {
    path: "/:lang?/stock-transfer-history",
    name: "stock-transfer-history",
    component: _import("stock-transfer-history"),
    meta: { title: () => i18n.t("iAccount.history.name") },
  },
];

export default stockTransferHistory;
