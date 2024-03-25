import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView,
    },
    {
      path: '/favorites',
      name: 'Favorites',
      component: () => import('../views/FavoritesView/index.vue'),
    },
  ],
})

export default router
