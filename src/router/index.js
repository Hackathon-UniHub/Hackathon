import { createRouter, createWebHistory } from 'vue-router'
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
      path: '/universidadesfiltro',
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
})

export default router
