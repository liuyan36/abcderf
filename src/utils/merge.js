import store from '@/store'

// 左侧菜单栏数据
var menuArray = store.state.menuItems
console.log('左侧菜单栏数据', menuArray)

// 手动添加临时路由
var menuTemporary = [
    {
        name: 'home', // 要跳转的路由名称 不是路径
        type: 'el-icon-nav_icon_sy', // icon类型
        text: '首页', // 文本内容
    },
    {
        text: '交易管理',
        type: 'el-icon-nav_icon_jy',
        children: [
            {
                type: 'el-icon-nav_icon_yh',
                name: 'marketOrderdetail',
                text: '销售订单详情',
            },
            {
                type: 'el-icon-nav_icon_yh',
                name: 'afterSaledetail',
                text: '售后订单详情',
            },
            {
                type: 'el-icon-nav_icon_yh',
                name: 'integralOrderdetail',
                text: '积分订单详情',
            },
        ]
    },
    {
        text: '商品管理',
        type: 'el-icon-nav_icon_sp',
        children: [
            {
                type: 'el-icon-nav_icon_yh',
                name: 'secondClassify',
                text: '二级分类查看',
            },
            {
                type: 'el-icon-nav_icon_yh',
                name: 'commodityAdd',
                text: '商品添加',
            },
        ],
    },
    {
        text: '活动设置管理',
        type: 'el-icon-nav_icon_hd',
        children: []
    },
    {
        text: '营销中心',
        type: 'el-icon-nav_icon_yx',
        children: [
            {
                type: 'el-icon-nav_icon_yh',
                name: 'marketingFirstclassifi',
                text: '金刚区商品添加',
            },
            {
                type: 'el-icon-nav_icon_yh',
                name: 'marketingSecondclassifi',
                text: '二级分类设置',
            },
            {
                type: 'el-icon-nav_icon_yh',
                name: 'marketingSecondcommdityclassifi',
                text: '二级分类商品设置',
            },
        ]
    },
    {
        text: '供应商管理',
        type: 'el-icon-nav_icon_gys',
        children: [{
            type: 'el-icon-nav_icon_yh',
            name: 'supplierFreightset',
            text: '运费模板设置',
        },]
    },
    {
        text: '基础设置',
        type: 'el-icon-nav_icon_sz',
        children: [],
    },
    // 用户管理
    {
        text: '用户管理',
        type: 'el-icon-nav_icon_yh',
        children: [
            {
                type: 'el-icon-nav_icon_yh',
                name: 'userDetails',
                text: '用户详情',
            }
        ],
    },
    // 角色管理
    {
        text: '团队管理',
        type: 'el-icon-nav_icon_js',
        children: [
            // 404 页面
            {
                name: 'roleError', // 要跳转的路由名称 不是路径
                type: 'el-icon-nav_icon_yh', // icon类型
                text: '404错误', // 文本内容
            },
            // 添加角色
            {
                name: 'roleAdd', // 要跳转的路由名称 不是路径
                type: 'el-icon-nav_icon_yh', // icon类型
                text: '添加角色', // 文本内容
            },
        ],
    },
]

for (let i = 0; i < menuArray.length; i++) {
    // 临时路径 获取 判断
    // 开始一层判断  首先判断有没有有没有多种页面
    if (menuArray[i].children) {
        // 开始二层判断  判断名称是否一致
        if (menuArray[i].text == menuTemporary[i].text) {
            console.log('获取二者的text', menuArray[i].text, menuTemporary[i].text)


            // 开始三层添加  把手动路径加入默认路由内部
            menuTemporary[i].children.push(...menuArray[i].children)


            console.log('获取合并后的数组路由', menuTemporary)
        }
    }
}

export default menuTemporary;
