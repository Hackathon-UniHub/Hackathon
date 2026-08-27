import { createRouter, createWebHistory } from 'vue-router'
import ErroView from '@/views/ErroView.vue'

//import { useAuthStore } from '@/stores/auth'

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
    alias: ['/entrar', '/criar-conta'],
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/mapa',
    name: 'mapa',
    component: () => import('@/views/MapaView.vue'),
  },
  {
    path: '/complete-profile',
    name: 'complete-profile',
    component: () => import('@/views/CompleteProfileView.vue'),
    meta: { requiresAuth: true },
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
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: ErroView,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

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

