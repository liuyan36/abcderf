import { LoadingBar } from 'view-design'
import router from './router'
import store from './store'
import createRoutes from '@/utils/createRoutes'
import { getDocumentTitle, resetTokenAndClearUser } from './utils'
// 获取最终数组
import menuTemporary from './utils/merge'

// 是否有菜单数据
let hasMenus = false
router.beforeEach(async (to, from, next) => {
    document.title = getDocumentTitle(to.meta.title)
    LoadingBar.start()
    if (localStorage.getItem('token')) {
        if (to.path === '/login') {
            next({ path: '/' })
        } else if (hasMenus) {
            next()
        } else {
            try {
                console.log('查看引入', menuTemporary)
                // 这里可以用 await 配合请求后台数据来生成路由
                // const data = await axios.get('xxx')
                // const routes = createRoutes(data)
                var routes = createRoutes(menuTemporary)

                // 动态添加路由
                router.addRoutes(routes)
                hasMenus = true
                next({ path: to.path || '/' })
            } catch (error) {
                resetTokenAndClearUser()
                next(`/login`)
            }
        }
    } else {
        hasMenus = false
        if (to.path === '/login') {
            next()
        } else {
            next(`/login`)
        }
    }
})

router.afterEach(() => {
    LoadingBar.finish()
})
