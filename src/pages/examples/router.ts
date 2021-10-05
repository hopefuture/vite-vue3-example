import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

// 动态引入
const routes: RouteRecordRaw[] = [
  {
    name: 'home',
    path: '/',
    component: () => import('@/pages/examples/views/home/index.vue')
  },
  {
    name: 'element',
    path: '/element',
    component: () => import('@/pages/examples/views/element/index.vue')
  },
  {
    name: 'about',
    path: '/about',
    component: () => import('@/pages/examples/views/about/index.vue')
  }
]

const router = createRouter({
  history: createWebHistory('examples'),
  routes
})

export default router
