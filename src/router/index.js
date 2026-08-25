import { createRouter, createWebHistory } from 'vue-router'
/*import { useAuthStore } from '@/stores/auth'*/

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/create-account',
    name: 'create-account',
    component: () => import('@/views/CreateAccountView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

/*  Esse trecho faz com que a página de login fique travada se o usuario nao estiver logado  */
/*router.beforeEach((to) => {
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
    (to.name === 'login' || to.name === 'complete-profile')
  ) {
    return { name: 'home' }
  }
})*/

export default router
