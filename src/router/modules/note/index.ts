const router = {
    path: '/note',
    name: '/note',
    component: () => import('@/layout/public/PublicLayout.vue'),
    children: [
        {
            path: '/addNote',
            name: '/addNote',
            component: () => import('@/views/note/addNote.vue'),
            meta:{
                title:'新增笔记'
            }
        }
    ]
}
export default router;
