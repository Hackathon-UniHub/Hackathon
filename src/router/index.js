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
    path: '/mapa',
    name: 'mapa',
    component: () => import('@/views/MapaView.vue'),
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
    meta: { requiresAuth: true },
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErroView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) return savedPosition
    return { top: 0 }
  },
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()

  // espera a sessão inicial terminar de carregar antes de decidir qualquer coisa
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
})

export default router
