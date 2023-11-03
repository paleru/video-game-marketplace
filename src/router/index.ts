import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import GamePage from '../views/GamePage.vue'
import LoginPage from '../views/LoginPage.vue'
import SortedGamesPage from '../views/SortedGamesPage.vue'
import { authService } from '@/services/directus.service';
import { toastController } from '@ionic/vue';

/* function for navigation guards */
const authenticationRequiredRouteGuard = async () => {
  const userAccessToken = localStorage.getItem("auth_token");

  /* user sent to login-page if no access token */
  if (!userAccessToken) {
    return { name: "Login" }
  }

  /* automatic logout*/
  const userAccessTokenExpiresAt = localStorage.getItem("auth_expires_at") as unknown as number;
  
  /* feedback to user when automatically logged out */
  if (userAccessTokenExpiresAt < new Date().getTime()) {
    
    const loggedOutToast = await toastController.create({
      message: "You have been logged out due to inactivity",
      duration: 3000,
      color: "warning"
    });

    await loggedOutToast.present();

    await authService.logout();
    return { name: "Login"}
  }

}

const preventLoginRouterGuard = async () => {
  const userAccessToken = localStorage.getItem("auth_token");

  if (userAccessToken) {

    const loggedInToast = await toastController.create({
      message: "You are already logged in",
      duration: 3000,
      color: "success"
    });

    await loggedInToast.present();

    return { name: "Home" }
  }
}


const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage,
    beforeEnter: [authenticationRequiredRouteGuard]
  },
  {
    path: '/game/:id',
    name: 'Game',
    component: GamePage,
    beforeEnter: [authenticationRequiredRouteGuard]
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    beforeEnter: [preventLoginRouterGuard]
  },
  {
    path: '/:filter/:value',
    name: 'FilteredGames',
    component: SortedGamesPage,
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
