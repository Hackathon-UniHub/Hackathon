import { createRouter, createWebHistory } from 'vue-router'
import ErroView from '@/views/ErroView.vue'
import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    alias: ['/explorar', '/como-funciona'],
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    alias: ['/entrar'],
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/create-account',
    name: 'create-account',
    alias: ['/criar-conta'],
    component: () => import('@/views/CreateAccountView.vue'),
  },
  {
    path: '/universidades',
    name: 'filtro',
    component: () => import('@/components/paginaFiltro/paginaFiltroList.vue'),
  },
  {
    path: '/universidade/:id',
    name: 'universidade',
    component: () => import('@/components/paginaUniversidades/paginaUniversidade.vue'),
  },
  {
    path: '/favoritos',
    name: 'favoritos',
    component: () => import('@/views/FavoritosView.vue'),
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErroView,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  if (authStore.loading) {
    await new Promise((resolve) => {
      const unwatch = authStore.$subscribe((mutation, state) => {
        if (!state.loading) {
          unwatch()
          resolve()
        }
      })
    })
  }

  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (authStore.isLoggedIn && (to.name === 'login' || to.name === 'create-account')) {
    return { name: 'home' }
  }
})

export default router
