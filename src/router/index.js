import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/auth/LoginView.vue'
import CompleteProfileView from '@/views/CompleteProfileView.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: HomeView,
  },
  {
    path: '/explorar',
    name: 'explorar',
    component: HomeView,
  },
  {
    path: '/como-funciona',
    name: 'como-funciona',
    component: HomeView,
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/entrar',
    name: 'entrar',
    component: LoginView,
  },
  {
    path: '/criar-conta',
    name: 'criar-conta',
    component: LoginView,
  },
  {
    path: '/complete-profile',
    name: 'complete-profile',
    component: CompleteProfileView,
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const authStore = useAuthStore()

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login' }
  }

  if (authStore.isLoggedIn && !authStore.hasProfile && to.name !== 'complete-profile') {
    return { name: 'complete-profile' }
  }

  if (
    authStore.isLoggedIn &&
    authStore.hasProfile &&
    (to.name === 'login' ||
      to.name === 'complete-profile' ||
      to.name === 'entrar' ||
      to.name === 'criar-conta')
  ) {
    return { name: 'home' }
  }
})

export default router
