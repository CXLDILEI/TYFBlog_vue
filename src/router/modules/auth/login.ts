const router = {
    path: '/auth',
    name: '/auth',
    component: () => import('@/layout/public/PublicLayout.vue'),
    children: [
        {
            path: '/login',
            name: '/login',
            component: () => import('@/views/auth/login.vue'),
            meta: {
                title: '登录',
                hideBG: true, //是否隐藏背景图
            }
        }
    ]
};
export default router;
