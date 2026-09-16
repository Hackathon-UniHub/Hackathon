import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAll, add, update, remove, getStatus } from '@/data/vestibulares.js'
import { useAuthStore } from '@/stores/auth'

export const useVestibularesStore = defineStore('vestibulares', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)

  function init() { list.value = getAll() }
  function inicializar() { list.value = getAll() }
  function reload() { list.value = getAll() }

  const byUni = computed(() => {
    const m = {}
    list.value.forEach(v => { if (!m[v.universidade_id]) m[v.universidade_id] = []; m[v.universidade_id].push(v) })
    return m
  })

  function getByUniversidade(id) { return byUni.value[id] || [] }
  function getPublicados(id) { return (byUni.value[id] || []).filter(v => v.status === 'publicado') }
  function getOne(id) { return list.value.find(v => v.id === Number(id)) }
  const status = v => getStatus(v)

  async function criar(data) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    if (auth.profile?.tipo_usuario !== 'professor') throw new Error('APENAS_PROFESSOR')
    const universidadeId = Number(auth.profile.universidade_id)
    if (!universidadeId || (data.universidade_id && Number(data.universidade_id) !== universidadeId)) {
      throw new Error('UNIVERSIDADE_NAO_VINCULADA')
    }
    const v = { ...data, universidade_id: universidadeId, professor_id: auth.user.id, status: data.status || 'rascunho' }
    const novo = add(v)
    reload()
    return novo
  }

  async function atualizar(id, data) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const v = getOne(id)
    if (!v) throw new Error('VESTIBULAR_NAO_ENCONTRADO')
    if (auth.profile?.tipo_usuario !== 'professor' || v.professor_id !== auth.user.id) throw new Error('SEM_PERMISSAO')
    const r = update(id, { ...data, universidade_id: v.universidade_id })
    reload()
    return r
  }

  async function publicar(id) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const v = getOne(id)
    if (!v) throw new Error('VESTIBULAR_NAO_ENCONTRADO')
    if (auth.profile?.tipo_usuario !== 'professor' || v.professor_id !== auth.user.id) {
      throw new Error('SEM_PERMISSAO')
    }

    const publicado = update(id, { status: 'publicado' })
    reload()
    return publicado
  }

  async function remover(id) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const v = getOne(id)
    if (!v) throw new Error('VESTIBULAR_NAO_ENCONTRADO')
    if (auth.profile?.tipo_usuario !== 'professor' || v.professor_id !== auth.user.id) throw new Error('SEM_PERMISSAO')
    remove(id)
    reload()
    return true
  }

  function canManage(v) {
    const auth = useAuthStore()
    return auth.isLoggedIn && auth.profile?.tipo_usuario === 'professor' && v.professor_id === auth.user.id
  }

  return { list, loading, error, init, inicializar, reload, getByUniversidade, getPublicados, getOne, status, criar, atualizar, publicar, remover, canManage }
})
