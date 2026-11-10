import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getStatus } from '@/data/vestibulares.js'
import { useAuthStore } from '@/stores/auth'

const API_URL = 'http://localhost:3000/vestibulares'

async function requisitarApi(caminho = '', opcoes = {}) {
  const resposta = await fetch(`${API_URL}${caminho}`, opcoes)

  if (!resposta.ok) {
    throw new Error(`A API de vestibulares respondeu com status ${resposta.status}.`)
  }

  if (resposta.status === 204) return null
  return resposta.json()
}

export const useVestibularesStore = defineStore('vestibulares', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)

  function representanteAtual(auth) {
    return auth.isProfessor || auth.profile?.tipo_usuario === 'professor'
  }

  async function init() {
    loading.value = true
    error.value = null

    try {
      const vestibulares = await requisitarApi()
      if (!Array.isArray(vestibulares)) {
        throw new Error('A API de vestibulares retornou uma lista inválida.')
      }
      list.value = vestibulares
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Não foi possível carregar os vestibulares.'
    } finally {
      loading.value = false
    }
  }

  function inicializar() { return init() }
  function reload() { return init() }

  const byUni = computed(() => {
    const m = {}
    list.value.forEach(v => { if (!m[v.universidade_id]) m[v.universidade_id] = []; m[v.universidade_id].push(v) })
    return m
  })

  function getByUniversidade(id) { return byUni.value[id] || [] }
  function getPublicados(id) { return (byUni.value[id] || []).filter(v => v.status === 'publicado') }
  function getOne(id) { return list.value.find(v => String(v.id) === String(id)) }
  const status = v => getStatus(v)

  async function criar(data) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    if (!representanteAtual(auth)) throw new Error('APENAS_PROFESSOR')
    const universidadeId = Number(auth.profile?.universidade_id)
    if (!universidadeId || (data.universidade_id && Number(data.universidade_id) !== universidadeId)) {
      throw new Error('UNIVERSIDADE_NAO_VINCULADA')
    }
    const agora = new Date().toISOString()
    const v = {
      ...data,
      universidade_id: universidadeId,
      professor_id: auth.user.id,
      status: data.status || 'rascunho',
      criado_em: agora,
      atualizado_em: agora,
    }
    const novo = await requisitarApi('', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(v),
    })
    list.value = [...list.value, novo]
    error.value = null
    return novo
  }

  async function atualizar(id, data) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const v = getOne(id)
    if (!v) throw new Error('VESTIBULAR_NAO_ENCONTRADO')
    if (!representanteAtual(auth) || v.professor_id !== auth.user.id) throw new Error('SEM_PERMISSAO')
    const atualizado = await requisitarApi(`/${encodeURIComponent(id)}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...data,
        universidade_id: v.universidade_id,
        professor_id: v.professor_id,
        atualizado_em: new Date().toISOString(),
      }),
    })
    list.value = list.value.map(item => item.id === atualizado.id ? atualizado : item)
    error.value = null
    return atualizado
  }

  async function publicar(id) {
    return atualizar(id, { status: 'publicado' })
  }

  async function remover(id) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const v = getOne(id)
    if (!v) throw new Error('VESTIBULAR_NAO_ENCONTRADO')
    if (!representanteAtual(auth) || v.professor_id !== auth.user.id) throw new Error('SEM_PERMISSAO')
    await requisitarApi(`/${encodeURIComponent(id)}`, { method: 'DELETE' })
    list.value = list.value.filter(item => item.id !== v.id)
    error.value = null
    return true
  }

  function canManage(v) {
    const auth = useAuthStore()
    return auth.isLoggedIn && representanteAtual(auth) && v.professor_id === auth.user.id
  }

  return { list, loading, error, init, inicializar, reload, getByUniversidade, getPublicados, getOne, status, criar, atualizar, publicar, remover, canManage }
})
