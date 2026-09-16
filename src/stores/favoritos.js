import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import universidades from '@/data/universidades.js'
import { useAuthStore } from '@/stores/auth'

export const useFavoritosStore = defineStore('favoritos', () => {
  const idsFavoritos = ref([])

  function chaveStorage(userId) {
    return `favoritos_${userId}`
  }

  function chaveAtual() {
    const authStore = useAuthStore()
    return authStore.isLoggedIn ? chaveStorage(authStore.user.id) : 'favoritos_guest'
  }

  function carregarFavoritos() {
    const salvos = sessionStorage.getItem(chaveAtual())
    idsFavoritos.value = salvos ? JSON.parse(salvos) : []
  }

  function salvarNoStorage() {
    sessionStorage.setItem(chaveAtual(), JSON.stringify(idsFavoritos.value))
  }

  function limparFavoritos() {
    const authStore = useAuthStore()
    if (authStore.user) {
      sessionStorage.removeItem(chaveStorage(authStore.user.id))
    }
    sessionStorage.removeItem('favoritos_guest')
    idsFavoritos.value = []
  }

  function adicionarFavorito(idUni) {
    if (!idsFavoritos.value.includes(idUni)) {
      idsFavoritos.value.push(idUni)
      salvarNoStorage()
    }
  }

  function removerFavorito(idUni) {
    idsFavoritos.value = idsFavoritos.value.filter((id) => id !== idUni)
    salvarNoStorage()
  }

  function isFavorito(idUni) {
    return idsFavoritos.value.includes(idUni)
  }

  const favoritos = computed(() =>
    idsFavoritos.value.map((id) => universidades.find((u) => u.id === id)).filter(Boolean),
  )

  return {
    idsFavoritos,
    favoritos,
    carregarFavoritos,
    limparFavoritos,
    adicionarFavorito,
    removerFavorito,
    isFavorito,
  }
})
