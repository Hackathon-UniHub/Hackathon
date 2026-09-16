import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { getAll, countByVestibular, addComentario, addResposta, editComentario, deleteComentario, deleteResposta, canModerate, canEdit } from '@/data/comentarios.js'
import { useAuthStore } from '@/stores/auth'

export const useComentariosStore = defineStore('comentarios', () => {
  const list = ref([])
  const loading = ref(false)
  const error = ref(null)

  function init() { list.value = getAll() }
  function reload() { list.value = getAll() }

  const byVestibular = computed(() => {
    const m = {}
    list.value.forEach(c => { if (!m[c.vestibular_id]) m[c.vestibular_id] = []; m[c.vestibular_id].push(c) })
    return m
  })

  function getByVest(vid) { return (byVestibular.value[vid] || []).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em)) }
  function count(vid) { return countByVestibular(vid) }

  async function criarComentario(vid, texto) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const c = addComentario({ vestibular_id: vid, user_id: auth.user.id, user_nome: auth.profile?.full_name || auth.user.email?.split('@')[0] || 'Estudante', user_tipo: auth.profile?.tipo_usuario || 'estudante', user_universidade_id: auth.profile?.universidade_id || null, conteudo: texto })
    reload()
    return c
  }

  async function criarResposta(cid, texto, oficial) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const c = list.value.find(x => x.id === cid)
    if (!c) throw new Error('COMENTARIO_NAO_ENCONTRADO')
    const isOficial = oficial && auth.profile?.tipo_usuario === 'professor' && auth.profile?.universidade_id === c.user_universidade_id
    const r = addResposta({ comentario_id: cid, user_id: auth.user.id, user_nome: auth.profile?.full_name || auth.user.email?.split('@')[0] || 'Usuário', user_tipo: auth.profile?.tipo_usuario || 'estudante', user_universidade_id: auth.profile?.universidade_id || null, conteudo: texto, is_oficial: isOficial })
    reload()
    return r
  }

  async function editar(id, texto) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    const c = editComentario(id, auth.user.id, { conteudo: texto })
    if (!c) throw new Error('SEM_PERMISSAO_OU_NAO_ENCONTRADO')
    reload()
    return c
  }

  async function remover(id) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    if (!deleteComentario(id, auth.user.id)) throw new Error('SEM_PERMISSAO_OU_NAO_ENCONTRADO')
    reload()
    return true
  }

  async function removerResposta(cid, rid) {
    const auth = useAuthStore()
    if (!auth.isLoggedIn) throw new Error('USUARIO_NAO_LOGADO')
    if (!deleteResposta(cid, rid, auth.user.id)) throw new Error('SEM_PERMISSAO_OU_NAO_ENCONTRADO')
    reload()
    return true
  }

  function podeModerar(c) {
    const auth = useAuthStore()
    return canModerate(c, { id: auth.user?.id, tipo_usuario: auth.profile?.tipo_usuario, universidade_id: auth.profile?.universidade_id })
  }

  function podeEditar(c) { return canEdit(c, { id: useAuthStore().user?.id }) }
  function isProfDaCasa(c) { const auth = useAuthStore(); return auth.profile?.tipo_usuario === 'professor' && auth.profile?.universidade_id === c.user_universidade_id }

  return { list, loading, error, init, reload, getByVest, count, criarComentario, criarResposta, editar, remover, removerResposta, podeModerar, podeEditar, isProfDaCasa }
})