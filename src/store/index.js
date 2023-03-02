import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        // 左侧菜单栏数据
        menuItems: [
            // 首页
            {
                name: 'home', // 要跳转的路由名称 不是路径
                type: 'el-icon-nav_icon_sy', // icon类型
                text: '首页', // 文本内容
            },
            // 交易管理
            {
                text: '交易管理',
                type: 'el-icon-nav_icon_jy',
                children: [
                    {
                        type: 'el-icon-nav_icon_jy',
                        name: 'transactionMarket',
                        text: '销售订单',
                    },
                    {
                        type: 'el-icon-nav_icon_jy',
                        name: 'transactionIntegral',
                        text: '积分订单',
                    },
                    {
                        type: 'el-icon-nav_icon_jy',
                        name: 'transactionAfter',
                        text: '售后订单',
                    },
                ],
            },
            // 商品管理
            {
                text: '商品管理',
                type: 'el-icon-nav_icon_sp',
                children: [
                    {
                        type: 'el-icon-nav_icon_sp',
                        name: 'commodityClassify',
                        text: '商品分类',
                    },
                    {
                        type: 'el-icon-nav_icon_sp',
                        name: 'commodityMarket',
                        text: '销售商品',
                    },
                    {
                        type: 'el-icon-nav_icon_sp',
                        name: 'commodityIntegral',
                        text: '积分商品',
                    }
                ],
            },
            // 活动设置管理
            {
                text: '活动设置管理',
                type: 'el-icon-nav_icon_hd',
                children: [
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'trochaldiskSet',
                        text: '大轮盘设置',
                    },
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'trochaldiskDetail',
                        text: '大轮盘中奖明细',
                    },
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'conversionredSet',
                        text: '兑换红包设置',
                    },
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'conversionredDetail',
                        text: '兑换红包明细',
                    },
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'everydayExplosive',
                        text: '每日爆品',
                    },
                    {
                        type: 'el-icon-nav_icon_hd',
                        name: 'timelimitSeckill',
                        text: '限时秒杀',
                    },
                    // {
                    //     type: 'el-icon-nav_icon_hd',
                    //     name: 'overflowDiscount',
                    //     text: '超值折扣',
                    // }
                ],
            },
            // 营销中心
            {
                text: '营销中心',
                type: 'el-icon-nav_icon_yx',
                children: [
                    {
                        type: 'el-icon-nav_icon_yx',
                        name: 'marketingShop',
                        text: '首页轮播图',
                    },
                    {
                        type: 'el-icon-nav_icon_yx',
                        name: 'marketingKongkim',
                        text: '金刚区管理',
                    }
                ],
            },
            // 供应商管理
            {
                text: '供应商管理',
                type: 'el-icon-nav_icon_gys',
                children: [
                    {
                        type: 'el-icon-nav_icon_gys',
                        name: 'supplierManagement',
                        text: '供应商管理',
                    }
                ],
            },
            // 基础设置
            {
                text: '基础设置',
                type: 'el-icon-nav_icon_sz',
                children: [
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'system',
                        text: '系统通知',
                    }
                    ,
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'about',
                        text: '关于我们',
                    }
                    ,
                    // {
                    //     type: 'el-icon-nav_icon_sz',
                    //     name: 'basicSetting',
                    //     text: '基础设置',
                    // },
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'help',
                        text: '帮助中心',
                    }
                    ,
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'agreement',
                        text: '协议管理',
                    },
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'sensitive',
                        text: '敏感词屏蔽',
                    },
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'call',
                        text: '联系我们',
                    },
                    {
                        type: 'el-icon-nav_icon_sz',
                        name: 'search',
                        text: '搜索设置',
                    }

                ],
            },
            // 用户管理
            {
                text: '用户管理',
                type: 'el-icon-nav_icon_yh',
                children: [
                    {
                        type: 'el-icon-nav_icon_yh',
                        name: 'userExamine',
                        text: '用户查看',
                    },
                    {
                        type: 'el-icon-nav_icon_yh',
                        name: 'userDataStatistics',
                        text: '用户数据统计',
                    }
                ],
            },
            // 角色管理
            {
                text: '团队管理',
                type: 'el-icon-nav_icon_js',
                children: [
                    {
                        type: 'el-icon-nav_icon_js',
                        name: 'roleManagement',
                        text: '角色管理',
                    },
                    {
                        type: 'el-icon-nav_icon_js',
                        name: 'roleAdministratorLog',
                        text: '管理员日志',
                    }
                ],
            },

        ],
        // 页面路径总和名称
        pathTotal: [
            {
                key: 'MARKET_ORDER_SHOW', // 销售订单页面展示
                value: 'transactionMarket'
            },
            {
                key: 'MARKET_ORDER_FUNC', // 销售订单功能
                value: 'transactionMarket'
            },
            {
                key: 'INTEGRAL_ORDER_SHOW', // 积分订单页面展示
                value: 'transactionIntegral'
            },
            {
                key: 'INTEGRAL_ORDER_FUNC', // 积分订单功能
                value: 'transactionIntegral'
            },
            {
                key: 'AFTER_ORDER_SHOW', // 售后订单页面展示
                value: 'transactionAfter'
            },
            {
                key: 'AFTER_ORDER_FUNC', // 售后订单功能
                value: 'transactionAfter'
            },
            {
                key: 'COMMONDITY_CLASSFIY_SHOW', // 商品分类页面展示
                value: 'commodityClassify'
            },
            {
                key: 'COMMONDITY_CLASSFIY_FUNC', //  商品分类功能
                value: 'commodityClassify'
            },
            {
                key: 'MARKET_COMMONDITY_SHOW', // 销售商品页面展示
                value: 'commodityMarket'
            },
            {
                key: 'MARKET_COMMONDITY_FUNC', // 销售商品功能
                value: 'commodityMarket'
            },

            {
                key: 'INTEGRAL_COMMONDITY_SHOW', // 积分商品页面展示
                value: 'commodityIntegral'
            },
            {
                key: 'INTEGRAL_COMMONDITY_FUNC', // 积分商品功能
                value: 'commodityIntegral'
            },

            {
                key: 'WHEEL_SET_SHOW', // 大转盘设置页面展示
                value: 'trochaldiskSet'
            },
            {
                key: 'WHEEL_SET_FUNC', // 大转盘设置功能
                value: 'trochaldiskSet'
            },
            {
                key: 'WHEEL_DETAIL_SHOW', // 大转盘中奖明细页面展示
                value: 'trochaldiskDetail'
            },
            {
                key: 'WHEEL_DETAIL_FUNC', // 大转盘中奖明细功能
                value: 'trochaldiskDetail'
            },

            {
                key: 'INTEGRAL_RED_SHOW', // 积分兑换红包设置页面展示
                value: 'conversionredSet'
            },
            {
                key: 'INTEGRAL_RED_FUNC', // 积分红包兑换设置功能
                value: 'conversionredSet'
            },
            {
                key: 'INTEGRAL_RED_DETAIL_SHOW', // 积分红包兑换明细页面展示
                value: 'conversionredDetail'
            },
            {
                key: 'INTEGRAL_RED_DETAIL_FUNC', // 积分红包兑换明细页面展示
                value: 'conversionredDetail'
            },
            {
                key: 'DAY_EXPLOSIVE_SHOW', // 每日爆品页面展示
                value: 'everydayExplosive'
            },
            {
                key: 'DAY_EXPLOSIVE_FUNC', // 每日爆品功能
                value: 'everydayExplosive'
            },
            {
                key: 'TIME_SECKIL_SHOW', // 限时秒杀页面展示
                value: 'timelimitSeckill'
            },
            {
                key: 'TIME_SECKIL_FUNC', //  限时秒杀功能
                value: 'timelimitSeckill'
            },
            {
                key: 'HOME_SWIPER_SHOW', //  首页轮播图页面展示
                value: 'marketingShop'
            },
            {
                key: 'HOME_SWIPER_FUNC', // 首页轮播图功能
                value: 'marketingShop'
            },
            {
                key: 'KONG_KIM_SHOW', // 金刚区管理页面展示
                value: 'marketingKongkim'
            },
            {
                key: 'KONG_KIM_FUNC', // 金刚区管理功能
                value: 'marketingKongkim'
            },
            {
                key: 'SUPPLIER_ADMINISTRATION_SHOW', // 供应商管理页面展示
                value: 'supplierManagement'
            },
            {
                key: 'SUPPLIER_ADMINISTRATION_FUNC', // 供应商管理功能
                value: 'supplierManagement'
            },
            {
                key: 'SYSTEMATIC_NOTIFICATION_SHOW', //  系统通知页面展示
                value: 'system'
            },
            {
                key: 'SYSTEMATIC_NOTIFICATION_FUNC', // 系统通知功能
                value: 'system'
            },
            {
                key: 'ABOUT_US_SHOW', // 关于我们页面展示
                value: 'about'
            },
            {
                key: 'ABOUT_US_FUNC', // 关于我们功能
                value: 'about'
            },

            {
                key: 'HELP_CENTER_SHOW', //  帮助中心页面展示
                value: 'help'
            },
            {
                key: 'HELP_CENTER_FUNC', // 帮助中心功能
                value: 'help'
            },
            {
                key: 'AGREEMENT_ADMINISTRATION_SHOW', // 协议管理页面展示
                value: 'agreement'
            },

            {
                key: 'AGREEMENT_ADMINISTRATION_FUNC', // 协议管理功能
                value: 'agreement'
            },
            {
                key: 'SENSITIVE_MASKING_SHOW', // 敏感词屏蔽管理页面展示
                value: 'sensitive'
            },
            {
                key: 'SENSITIVE_MASKING_FUNC', // 敏感词屏蔽管理功能
                value: 'sensitive'
            },
            {
                key: 'CONTACT_US_SHOW', //联系我们页面展示
                value: 'call'
            },
            {
                key: 'CONTACT_US_FUNC', // 联系我们功能
                value: 'call'
            },
            {
                key: 'SEARCH_ADMINISTRATION_SHOW', // 搜索设置管理页面展示
                value: 'search'
            },
            {
                key: 'SEARCH_ADMINISTRATION_FUNC', // 搜索设置管理功能
                value: 'search'
            },
            {
                key: 'USER_CHECK_SHOW', //  用户查看页面展示
                value: 'userExamine'
            },
            {
                key: 'USER_CHECK_FUNC',// 用户查看功能
                value: 'userExamine'
            },
            {
                key: 'USER_STATISTICS_SHOW', // 用户数据统计页面展示
                value: 'userDataStatistics'
            },
        ],
        // 页面功能是否开启使用
        pageFunctionShow: false
    },
    mutations: {
        setMenus(state, items) {
            state.menuItems.push(items)
        },
        setLoading(state, isShowLoading) {
            state.isShowLoading = isShowLoading
        },
        //  判断当前页面功能是否完善使用
        setPerfect(state, perfeactshow) {
            console.log('实时修改更换', perfeactshow)
            state.pageFunctionShow = perfeactshow
        }
    },
})

export default store
