import { createRouter, createWebHistory } from 'vue-router'
<<<<<<< HEAD
import HomeView from '../views/HomeView.vue'
import paginaFiltroList from '@/components/paginaFiltro/paginaFiltroList.vue'
import paginaUniversidade from '@/components/paginaUniversidades/paginaUniversidade.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/universidades',
      name: 'filtro',
      component: paginaFiltroList,
    },
    {
      path: '/universidade/:id',
      name: 'universidade',
      component: paginaUniversidade,
    },
  ],
  component: () => import('../views/AboutView.vue'),
=======
//import { useAuthStore } from '@/stores/auth'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/auth/LoginView.vue'),
  },
  {
    path: '/complete-profile',
    name: 'complete-profile',
    component: () => import('@/views/CompleteProfileView.vue'),
    meta: { requiresAuth: true },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
>>>>>>> dev
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
