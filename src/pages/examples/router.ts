import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'

const Home = { template: '<div>Home</div>' }
const About = { template: '<div>About</div>' }

const routes: RouteRecordRaw[] = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  // 动态引入
  // {
  //   path: '/',
  //   component: () => import("../views/home/index.vue")
  // },
];

const router = createRouter({
  history: createWebHistory('examples'),
  routes
})

export default router

