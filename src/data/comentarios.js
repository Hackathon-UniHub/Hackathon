const comentarios = [
  { id: 1, vestibular_id: 1, user_id: 'user-1', user_nome: 'Maria Silva', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Alguém sabe se a prova de redação é dissertativa ou proposta de intervenção? O edital não ficou muito claro pra mim.', criado_em: '2025-01-12T14:30:00Z', atualizado_em: null, respostas: [ { id: 1, user_id: 'prof-1', user_nome: 'João Professor', user_tipo: 'professor', user_universidade_id: 1, conteudo: 'A redação segue o modelo ENEM: dissertativo-argumentativo com proposta de intervenção. Tem 30 linhas. O tema sempre é de ordem social, científica ou cultural.', criado_em: '2025-01-12T15:45:00Z', is_oficial: true }, { id: 2, user_id: 'user-2', user_nome: 'Pedro Santos', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Valeu João! E a prova de específicas? Tem peso diferente por curso?', criado_em: '2025-01-12T16:10:00Z', is_oficial: false } ] },
  { id: 2, vestibular_id: 1, user_id: 'user-3', user_nome: 'Ana Costa', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Consegui isenção da taxa! Quem for do CadÚnico, corre pra solicitar até 31/01. Processo bem rápido pelo site.', criado_em: '2025-01-10T09:15:00Z', atualizado_em: null, respostas: [ { id: 3, user_id: 'user-4', user_nome: 'Lucas Oliveira', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Vou tentar também. Precisa de algum documento específico?', criado_em: '2025-01-10T10:30:00Z', is_oficial: false }, { id: 4, user_id: 'prof-1', user_nome: 'João Professor', user_tipo: 'professor', user_universidade_id: 1, conteudo: 'Só o NIS atualizado. O sistema cruza automaticamente com a base do CadÚnico. Se der erro, anexa comprovante de residência e declaração escolar.', criado_em: '2025-01-10T11:00:00Z', is_oficial: true } ] },
  { id: 3, vestibular_id: 2, user_id: 'user-5', user_nome: 'Carla Mendes', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Minha nota no ENEM 2024 foi 720. Alguém sabe qual a nota de corte aproximada pra Medicina na UNIGRANRIO pelo SISU?', criado_em: '2025-01-16T18:20:00Z', atualizado_em: null, respostas: [ { id: 5, user_id: 'user-6', user_nome: 'Rafael Lima', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Ano passado foi 745 pra ampla concorrência. Mas varia muito. Fica de olho nas parciais!', criado_em: '2025-01-16T19:00:00Z', is_oficial: false } ] },
  { id: 4, vestibular_id: 4, user_id: 'user-7', user_nome: 'Fernanda Rocha', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'A UDESC tem campus em Joinville? Vi que tem Design lá, mas não sei se é o mesmo vestibular.', criado_em: '2025-01-08T11:00:00Z', atualizado_em: null, respostas: [ { id: 6, user_id: 'prof-2', user_nome: 'Profa. Carolina', user_tipo: 'professor', user_universidade_id: 2, conteudo: 'Sim! A UDESC tem 13 campi. O vestibular é unificado, mas você escolhe o campus/curso na inscrição. Design em Joinville é o mesmo edital de Florianópolis.', criado_em: '2025-01-08T14:00:00Z', is_oficial: true } ] },
  { id: 5, vestibular_id: 6, user_id: 'user-8', user_nome: 'Gabriel Souza', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'FUVEST 2025: a 1ª fase foi dia 17/11. Alguém fez? Como acharam o nível?', criado_em: '2024-11-18T08:00:00Z', atualizado_em: null, respostas: [ { id: 7, user_id: 'user-9', user_nome: 'Juliana Alves', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'Fiz! Achei a prova de Humanas bem tranquila, mas Exatas tava puxada. Química orgânica caiu muito.', criado_em: '2024-11-18T09:30:00Z', is_oficial: false }, { id: 8, user_id: 'prof-3', user_nome: 'Prof. Marcelo USP', user_tipo: 'professor', user_universidade_id: 3, conteudo: 'Gabarito oficial sai dia 19/11 no site da FUVEST. 2ª fase dias 15 e 16/12. Boa sorte a todos!', criado_em: '2024-11-18T10:00:00Z', is_oficial: true } ] },
  { id: 6, vestibular_id: 8, user_id: 'user-10', user_nome: 'Beatriz Santos', user_tipo: 'estudante', user_universidade_id: null, conteudo: 'UNICAMP: alguém sabe se o bônus de escola pública é automático ou precisa solicitar?', criado_em: '2024-09-20T16:00:00Z', atualizado_em: null, respostas: [ { id: 9, user_id: 'prof-4', user_nome: 'Prof. Ricardo UNICAMP', user_tipo: 'professor', user_universidade_id: 4, conteudo: 'É automático no ato da inscrição se você marcar que cursou todo o ensino médio em escola pública. O sistema valida pelo CPF. Não precisa enviar documento.', criado_em: '2024-09-20T17:30:00Z', is_oficial: true } ] },
]

let nextComentarioId = 7
let nextRespostaId = 10

function load() {
  try {
    const stored = localStorage.getItem('comentarios_local')
    if (stored) return JSON.parse(stored)
  } catch (e) {}
  return []
}

function save(list) {
  localStorage.setItem('comentarios_local', JSON.stringify(list))
}

export function getAll() {
  const stored = load()
  const merged = [...comentarios]
  stored.forEach(s => { if (!merged.some(c => c.id === s.id)) merged.push(s) })
  return merged
}

export function getByVestibular(vid) {
  return getAll().filter(c => c.vestibular_id === vid).sort((a, b) => new Date(b.criado_em) - new Date(a.criado_em))
}

export function countByVestibular(vid) {
  const list = getAll().filter(c => c.vestibular_id === vid)
  let total = list.length
  list.forEach(c => total += (c.respostas?.length || 0))
  return total
}

export function addComentario({ vestibular_id, user_id, user_nome, user_tipo, user_universidade_id, conteudo }) {
  const list = getAll()
  const novo = { id: nextComentarioId++, vestibular_id, user_id, user_nome, user_tipo, user_universidade_id, conteudo, criado_em: new Date().toISOString(), atualizado_em: null, respostas: [] }
  list.push(novo)
  save(list)
  return novo
}

export function addResposta({ comentario_id, user_id, user_nome, user_tipo, user_universidade_id, conteudo, is_oficial = false }) {
  const list = getAll()
  const c = list.find(x => x.id === comentario_id)
  if (!c) return null
  const r = { id: nextRespostaId++, user_id, user_nome, user_tipo, user_universidade_id, conteudo, criado_em: new Date().toISOString(), is_oficial }
  c.respostas.push(r)
  save(list)
  return r
}

export function editComentario(id, user_id, data) {
  const list = getAll()
  const c = list.find(x => x.id === id && x.user_id === user_id)
  if (!c) return null
  Object.assign(c, data, { atualizado_em: new Date().toISOString() })
  save(list)
  return c
}

export function deleteComentario(id, user_id) {
  const list = getAll()
  const i = list.findIndex(x => x.id === id && x.user_id === user_id)
  if (i === -1) return false
  list.splice(i, 1)
  save(list)
  return true
}

export function deleteResposta(cid, rid, user_id) {
  const list = getAll()
  const c = list.find(x => x.id === cid)
  if (!c) return false
  const i = c.respostas.findIndex(r => r.id === rid && r.user_id === user_id)
  if (i === -1) return false
  c.respostas.splice(i, 1)
  save(list)
  return true
}

export function canModerate(c, user) {
  if (!user) return false
  if (c.user_id === user.id) return true
  return user.tipo_usuario === 'professor' && user.universidade_id === c.user_universidade_id
}

export function canEdit(c, user) {
  return user && c.user_id === user.id
}