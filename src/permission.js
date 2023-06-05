import router from './router'
import { getToken } from '@/utils/token';

router.beforeEach((to, from, next) => {
    if (getToken()) {
        if (to.path === '/login') {
            next({ path: '/' })
        }
        next()
    } else {
        if (to.path === '/register') {
            // 直接进入
            next()
        }
        // 没有token
        else if (to.path === '/login') {
            // 直接进入
            next()
        } else {
            next('/login') // 否则全部重定向到登录页
        }
    }
})

router.afterEach(() => {

})
