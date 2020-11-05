const router = {
  path: '/',
  name: '/',
  redirect:'/home',
  component: () => import('@/layout/main/MainLayout.vue'),
  meta: {
    title: '首页'
  },
  children: [
    {
      path: '/home',
      name: '/home',
      component: () => import('@/views/Home.vue'),
      meta: {
        title: '首页'
      }
    }
  ]
};
export default router;
