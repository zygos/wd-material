import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'About',
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/signup',
      name: 'Signup',
      component: () => import('../views/SignupView/SignupView.vue')
    },
    {
      path: '/signup-success',
      name: 'SignupSuccess',
      component: () => import('../views/SignupSuccessView/SignupSuccessView.vue')
    }
  ]
})

export default router
