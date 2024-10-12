import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/Home/Home.vue')
    },
    {
      path: '/detail/:id?',
      name: 'detail',
      component: () => import('../views/Detail/Detail.vue')
    },
    {
      path: '/personal',
      name: 'personal',
      component: () => import('../views/Personal/Personal.vue')
    },
    {
      path:'/login',
      name:'login',
      component: () => import('../views/login.vue')
    },
    {
      path:'/collection',
      name:'collection',
      component: () => import('../views/collection.vue')
    },
  ]
})

export default router
