const router = {
    path: '/note',
    name: '/note',
    component: () => import('@/layout/public/PublicLayout.vue'),
    children: [
        {
            path: '/note/addNote',
            name: '/addNote',
            component: () => import('@/views/note/addNote.vue'),
            meta: {
                title: '新增笔记'
            }
        },
        {
            path: '/note/noteDetail',
            name: '/noteDetail',
            component: () => import('@/views/note/noteDetailBase.vue'),
            meta: {
                title: '笔记详情'
            }
        },
        {
            path: '/note/editeNote',
            name: '/editeNote',
            component: () => import('@/views/note/addNote.vue'),
            meta: {
                title: '编辑笔记'
            }
        }
    ]
}
export default router;
