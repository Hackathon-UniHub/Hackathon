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
    idsFavoritos.value = salvos ? JSON.parse(salvos).map(String) : []
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
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) return false

    const id = String(idUni)
    if (!idsFavoritos.value.includes(id)) {
      idsFavoritos.value.push(id)
      salvarNoStorage()
    }
    return true
  }

  function removerFavorito(idUni) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) return false

    const id = String(idUni)
    idsFavoritos.value = idsFavoritos.value.filter((favoritoId) => favoritoId !== id)
    salvarNoStorage()
    return true
  }

  function isFavorito(idUni) {
    return idsFavoritos.value.includes(String(idUni))
  }

  const favoritos = computed(() =>
    idsFavoritos.value
      .map((id) => universidades.find((universidade) => String(universidade.id) === id))
      .filter(Boolean),
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
