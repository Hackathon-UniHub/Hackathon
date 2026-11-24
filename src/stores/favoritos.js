import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import universidades from '@/data/universidades.js'
import { useAuthStore } from '@/stores/auth'
import {
  listarFavoritosPorUsuario,
  criarFavorito,
  excluirFavorito,
} from '@/services/favoritosApi'

export const useFavoritosStore = defineStore('favoritos', () => {
  const registrosFavoritos = ref([])
  const loading = ref(false)
  const error = ref('')

  const idsFavoritos = computed(() =>
    registrosFavoritos.value.map((item) => String(item.universidade_id)),
  )

  const favoritos = computed(() =>
    registrosFavoritos.value
      .map((registro) => {
        const uni = universidades.find(
          (u) => String(u.id) === String(registro.universidade_id),
        )
        if (!uni) return null

        return {
          ...uni,
          favoritoId: registro.id,
        }
      })
      .filter(Boolean),
  )

  async function carregarFavoritos() {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn || !authStore.user?.id) {
      registrosFavoritos.value = []
      return
    }

    loading.value = true
    error.value = ''

    try {
      registrosFavoritos.value = await listarFavoritosPorUsuario(authStore.user.id)
    } catch (err) {
      error.value = err.message || 'Erro ao carregar favoritos.'
    } finally {
      loading.value = false
    }
  }

  async function adicionarFavorito(idUni) {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn || !authStore.user?.id) return false

    const jaExiste = registrosFavoritos.value.find(
      (item) => String(item.universidade_id) === String(idUni),
    )
    if (jaExiste) return true

    error.value = ''

    try {
      const criado = await criarFavorito({
        usuario_id: authStore.user.id,
        universidade_id: Number(idUni) || idUni,
      })
      registrosFavoritos.value.push(criado)
      return true
    } catch (err) {
      error.value = err.message || 'Erro ao favoritar universidade.'
      throw err
    }
  }

  async function removerFavorito(idUniOuFavorito) {
    const authStore = useAuthStore()

    if (!authStore.isLoggedIn) return false

    const registro = registrosFavoritos.value.find(
      (item) =>
        String(item.id) === String(idUniOuFavorito) ||
        String(item.universidade_id) === String(idUniOuFavorito),
    )
    if (!registro) return false

    error.value = ''

    try {
      await excluirFavorito(registro.id)
      registrosFavoritos.value = registrosFavoritos.value.filter(
        (item) => item.id !== registro.id,
      )
      return true
    } catch (err) {
      error.value = err.message || 'Erro ao remover favorito.'
      throw err
    }
  }

  function limparFavoritos() {
    registrosFavoritos.value = []
    error.value = ''
  }

  function isFavorito(idUni) {
    return idsFavoritos.value.includes(String(idUni))
  }

  return {
    registrosFavoritos,
    idsFavoritos,
    favoritos,
    loading,
    error,
    carregarFavoritos,
    adicionarFavorito,
    removerFavorito,
    limparFavoritos,
    isFavorito,
  }
})
