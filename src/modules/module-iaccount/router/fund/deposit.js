

import Deposit from '@/modules/module-iaccount/views/funds-deposit/layout.vue'

const _import = (path, file = 'index') => () => import(/* webpackChunkName:"iaccount-funde-deposit" */ `../../views/funds-deposit/${path}/${file}.vue`);

const depositRoute = [
    {
        path: 'funds-deposit',
        name: 'sec-funds-deposit',
        component: Deposit,
        redirect: 'funds-deposit/currency',
        children: [
            {
                name: 'sec-deposit-currency',
                path: 'currency',
                component: _import('currency'),
                meta: {
                    pageName: '',
                    title: 'iAccount.fundsDeposit.currency.title',
                    guide: 'iAccount.fundsDeposit.currency.guide',
                    guideUrl: 'http://106.52.75.112:6003/webstatic/building/index.html',
                }
            },
            {
                name: 'sec-out-bank-type',
                path: 'bank-type',
                component: _import('out-bank-type'),
                meta: {
                    title: 'iAccount.fundsDeposit.outBankType.title'
                }
            },
            {
                name: 'sec-out-bank-hk',
                path: 'hk',
                component: _import('out-bank-hk', "layout"),
                redirect: 'hk/bank-list',
                children: [
                    {
                        name: 'sec-bank-list-hk',
                        path: 'bank-list',
                        component: _import('out-bank-hk/bank-list'),
                        meta: {
                            title: 'iAccount.fundsDeposit.bankList.title'
                        }
                    },
                    {
                        name: 'sec-ways-hk',
                        path: 'ways',
                        component: _import('out-bank-hk/ways'),
                        meta: {
                            title: 'iAccount.fundsDeposit.ways.title'

                        }
                    },
                    {
                        name: 'sec-cmbc-hk',
                        path: 'cmbc',
                        component: _import('out-bank-hk/way', 'cmbc'),
                        meta: {}
                    }, {
                        name: 'sec-cmbwlb-hk',
                        path: 'cmbwlb',
                        component: _import('out-bank-hk/way', 'cmbwlb'),
                        meta: {}
                    },
                    {
                        name: 'sec-fps-hk',
                        path: 'fps',
                        component: _import('out-bank-hk/way', 'fps'),
                        meta: {}
                    }, {
                        name: 'sec-e-banking-hk',
                        path: 'e-banking',
                        component: _import('out-bank-hk/way', 'ebanking'),
                        meta: {}
                    }, {
                        name: 'sec-check-hk',
                        path: 'check',
                        component: _import('out-bank-hk/way', 'check'),
                        meta: {}
                    },
                    // {
                    //     name: 'edda-hk',
                    //     path: 'edda',
                    //     component: BankEdda,
                    //     redirect: '/:lang?/out-bank-hk/way', 'edda/list',
                    //     children: [
                    //         {
                    //             name: 'edda-list',
                    //             path: 'list',
                    //             component: _import('out-bank-hk/way', 'edda/edda-list'),
                    //             meta: {  }
                    //         },
                    //         {
                    //             name: 'edda-bind',
                    //             path: 'bind',
                    //             component: _import('out-bank-hk/way', 'edda/bind'),
                    //             meta: {  }
                    //         },
                    //         {
                    //             name: 'edda-remit',
                    //             path: 'remit',
                    //             component: _import('out-bank-hk/way', 'edda/remit'),
                    //             meta: {  }
                    //         },
                    //         {
                    //             name: 'edda-detail',
                    //             path: 'detail',
                    //             component: _import('out-bank-hk/way', 'edda/detail'),
                    //             meta: {  }
                    //         },
                    //         {
                    //             name: 'edda-notify',
                    //             path: 'notify',
                    //             component: _import('out-bank-hk/way', 'edda/notify'),
                    //             meta: {  }
                    //         }

                    //     ]
                    // },
                    {
                        name: 'sec-remit-hk',
                        path: 'remit',
                        component: _import('out-bank-hk/remit'),
                        meta: {}
                    },
                ]
            },
            {
                name: 'sec-out-bank-cn',
                path: 'cn',
                component: _import('out-bank-cn', "layout"),
                redirect: 'cn/bank-type',
                children: [
                    {
                        name: 'sec-bank-list-cn',
                        path: 'bank-list',
                        component: _import('out-bank-cn/bank-list'),
                        meta: {
                            title: 'iAccount.fundsDeposit.bankList.title'
                        }
                    },

                ]

            },
            {
                name: 'sec-out-bank-other',
                path: 'other',
                component: _import('out-bank-other', "layout"),
                redirect: 'other/bank-list',
                children: [
                    {
                        name: 'sec-bank-list-other',
                        path: 'bank-list',
                        component: _import('out-bank-other/bank-list'),
                        meta: {
                            title: 'iAccount.fundsDeposit.bankList.title'
                        }
                    },
                    {
                        name: 'sec-ways-other',
                        path: 'ways',
                        component: _import('out-bank-other/ways'),
                        meta: {
                            title: 'iAccount.fundsDeposit.ways.title'

                        }
                    },
                    {
                        name: 'sec-cmbc-other',
                        path: 'cmbc',
                        component: _import('out-bank-other/way','cmbc'),
                        meta: {}
                    }, {
                        name: 'sec-fps-other',
                        path: 'fps',
                        component: _import('out-bank-other/way','fps'),
                        meta: {}
                    }, {
                        name: 'sec-e-banking-other',
                        path: 'e-banking',
                        component: _import('out-bank-other/way','e-banking'),
                        meta: {}
                    }, {
                        name: 'sec-check-other',
                        path: 'check',
                        component: _import('out-bank-other/way','check'),
                        meta: {}
                    }, {
                        name: 'sec-remit-other',
                        path: 'remit',
                        component: _import('out-bank-other/remit'),
                        meta: {}
                    }
                ]
            },
            {
                name: 'sec-deposit-notify',
                path: 'notify',
                component: _import('notify'),
                meta: {}
            }
        ]
    },
]

export default depositRoute;