import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import universidades from '@/data/universidades.js'
import { useAuthStore } from '@/stores/auth'

export const useFavoritosStore = defineStore('favoritos', () => {
  const idsFavoritos = ref([])

  function chaveStorage(userId) {
    return `favoritos_${userId}`
  }

  function carregarFavoritos() {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      idsFavoritos.value = []
      return
    }

    const salvos = sessionStorage.getItem(chaveStorage(authStore.user.id))
    idsFavoritos.value = salvos ? JSON.parse(salvos) : []
  }

  function salvarNoStorage() {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) return

    sessionStorage.setItem(
      chaveStorage(authStore.user.id),
      JSON.stringify(idsFavoritos.value)
    )
  }

  function limparFavoritos() {
    const authStore = useAuthStore()
    if (authStore.user) {
      sessionStorage.removeItem(chaveStorage(authStore.user.id))
    }
    idsFavoritos.value = []
  }

  function adicionarFavorito(idUni) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      throw new Error('USUARIO_NAO_LOGADO')
    }

    if (!idsFavoritos.value.includes(idUni)) {
      idsFavoritos.value.push(idUni)
      salvarNoStorage()
    }
  }

  function removerFavorito(idUni) {
    const authStore = useAuthStore()
    if (!authStore.isLoggedIn) {
      throw new Error('USUARIO_NAO_LOGADO')
    }

    idsFavoritos.value = idsFavoritos.value.filter((id) => id !== idUni)
    salvarNoStorage()
  }

  function isFavorito(idUni) {
    return idsFavoritos.value.includes(idUni)
  }

  const favoritos = computed(() =>
    idsFavoritos.value
      .map((id) => universidades.find((u) => u.id === id))
      .filter(Boolean)
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
