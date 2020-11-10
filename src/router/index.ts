import {createRouter, createWebHistory, RouteRecordRaw, _RouteLocationBase} from 'vue-router';
import {getToken} from '@/util/auth'
import store from '@/store'

const requireRouter = (require as any).context(
    // 其组件目录的相对路径
    './modules',
    // 是否查询其子目录
    true,
    // 匹配基础组件文件名的正则表达式
    /\w+\.ts$/
);
const routes: Array<RouteRecordRaw> = requireRouter.keys().map((fileName: string) => {
    // 获取组件配置
    return requireRouter(fileName).default || requireRouter(fileName);
});

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})
router.beforeEach(async (to: _RouteLocationBase, from: _RouteLocationBase, next: any) => {
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    if (to.path.startsWith('/register') || to.path.startsWith('/login')) {
        return next();
    }
    const accessToken = getToken();
    if (!accessToken) {
        return toLogin();
    }

    await store.dispatch('user/logged', accessToken);
});

// 登录
export function toLogin() {
    router.push({
        name: '/login'
    })
}

export default router
