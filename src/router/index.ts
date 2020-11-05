import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
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

export default router
