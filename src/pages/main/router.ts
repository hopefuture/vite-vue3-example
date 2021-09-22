import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import About from '@/pages/main/views/about/index.vue'

const routes: RouteRecordRaw[] = [
  // 动态引入
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/main/views/home/index.vue')
  },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
