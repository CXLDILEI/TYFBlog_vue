const router = {
    path: '/mainLayOut/note',
    name: '/mainLayOut/note',
    component: () => import('@/layout/main/MainLayout.vue'),
    children: [
        {
            path: '/mainLayOut/note/noteDetail',
            name: '/noteDetail',
            component: () => import('@/views/note/noteDetailBase.vue'),
            meta: {
                title: '笔记详情'
            }
        },
    ]
}
export default router;
