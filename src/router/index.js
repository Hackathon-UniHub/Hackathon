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
    meta: { hideLayout: true },
  },
  {
    path: '/create-account',
    name: 'create-account',
    alias: ['/criar-conta'],
    component: () => import('@/views/CreateAccountView.vue'),
    meta: { hideLayout: true },
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
    path: '/professor/dashboard',
    name: 'professor-dashboard',
    component: () => import('@/views/ProfessorDashboard.vue'),
    meta: { requiresAuth: true, requiresProfessor: true },
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

  const isProfessorUser =
    authStore.isProfessor ||
    authStore.profile?.tipo_usuario === 'professor' ||
    authStore.user?.user_metadata?.tipo_usuario === 'professor' ||
    authStore.session?.user?.user_metadata?.tipo_usuario === 'professor'

  if (to.meta.requiresProfessor && !isProfessorUser) {
    return { name: 'home' }
  }
})

export default router
