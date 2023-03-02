import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const commonRoutes = [
    {
        path: '/login',
        name: 'login',
        meta: { title: '登录' },
        component: () => import('../components/Login.vue'),
    },
    { path: '/', redirect: '/home' },
]

// 本地所有的页面 需要配合后台返回的数据生成页面
export const asyncRoutes = {
    // ---------- 首页 ----------
    home: {
        path: 'home',
        name: 'home',
        meta: { title: '首页' },
        component: () => import('../views/home/home.vue'),
    },

    // -----------交易管理----------------

    transactionMarket: { // 交易管理 销售订单列表
        path: 'transactionMarket',
        name: 'transactionMarket',
        meta: { title: '交易管理' },
        component: () => import('../views/transaction/market-order.vue'),
    },
    marketOrderdetail: { // 交易管理 销售订单列表
        path: 'marketOrderdetail',
        name: 'marketOrderdetail',
        meta: { title: '销售订单详情' },
        component: () => import('../views/transaction/market-order-detail.vue'),
    },
    transactionIntegral: { // 交易管理 积分订单
        path: 'transactionIntegral',
        name: 'transactionIntegral',
        meta: { title: '积分订单列表' },
        component: () => import('../views/transaction/Integral-order.vue'),
    },
    integralOrderdetail: { // 交易管理 积分订单详情
        path: 'integralOrderdetail',
        name: 'integralOrderdetail',
        meta: { title: '积分订单详情' },
        component: () => import('../views/transaction/integral-order-detail.vue'),
    },

    transactionAfter: { // 交易管理 售后订单
        path: 'transactionAfter',
        name: 'transactionAfter',
        meta: { title: '售后订单列表' },
        component: () => import('../views/transaction/after-order.vue'),
    },
    afterSaledetail: { // 交易管理 售后详情页
        path: 'afterSaledetail',
        name: 'afterSaledetail',
        meta: { title: '售后订单详情' },
        component: () => import('../views/transaction/after-sale-detail.vue'),
    },
    // -----------  404页面  --------
    roleError: {
        path: 'roleError',
        name: 'roleError',
        meta: { title: '404错误' },
        component: () => import('../components/404.vue'),
    },

}

const createRouter = () => new Router({
    routes: commonRoutes,
})

const router = createRouter()

export function resetRouter() {
    const newRouter = createRouter()
    router.matcher = newRouter.matcher
}

export default router
