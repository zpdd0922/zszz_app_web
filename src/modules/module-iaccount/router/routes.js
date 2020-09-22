// import depositRouter from './modules/deposit'
import capitalFlowRouter from "./modules/capital-flow";
import hisRouter from "./modules/history";
import withdrawRouter from "./modules/withdraw";
import companyActRouter from "./modules/company-act";
import depositRouter from "./fund/deposit";
import intoStockRouter from "./modules/into-stock";
import feeStatementRouter from "./modules/fee-statement";
import stockTransferHistory from "./modules/stock-transfer-history";
import statementRouter from "./modules/statement"

const _import = (path, file = "index") => () =>
  import(/* webpackChunkName:"iaccount" */ `../views/${path}/${file}.vue`);

// 路由名称
const getRouterName = () => i18n.t("iAccount.deposit.name");

// 路由配置表
const routes = [
  {
    path: "/sec/",
    redirect: { name: 'sec-home' },
    component: () => import(/* webpackChunkName:"iaccount-common" */ `../views/layout.vue`),
    children: [
      // 主页面
      {
        path: "home",
        name: "sec-home",
        meta: {
          title: "首页",
        },
        component: _import("home"),
      },
      ...capitalFlowRouter,
      ...depositRouter,
      ...hisRouter,
      ...withdrawRouter,
      ...companyActRouter,
      ...intoStockRouter,
      ...feeStatementRouter,
      ...stockTransferHistory,
      ...statementRouter
    ],
  },
];

export default routes;
