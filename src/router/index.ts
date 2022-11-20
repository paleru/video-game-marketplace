import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'

  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: GamePage
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
