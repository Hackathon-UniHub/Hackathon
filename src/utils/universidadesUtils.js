import universidades from '@/data/universidades.js'
import enem from '@/data/enem.js'

const cursosEnemPorUniversidadeId = new Map(enem.map((item) => [Number(item.id), item.cursos]))

export function UniversidadePorId(id) {
  if (id == null) return null
  const num = Number(id)
  return universidades.find((u) => Number(u.id) === num) || null
}

export function getUniversidadePorRota(route) {
  return UniversidadePorId(route?.params?.id)
}

export function getIniciais(universidade) {
  if (!universidade) return ''
  return universidade.sigla ? universidade.sigla.slice(0, 3) : universidade.nome.slice(0, 3)
}

export function getAnoFundacao(universidade) {
  if (!universidade?.data_criacao_ies) return null
  return universidade.data_criacao_ies.split('-')[0]
}

export function UniversidadePublica(universidade) {
  return universidade?.categoria?.toLowerCase() === 'publica'
}

export function getSiteOficial(universidade) {
  const site = universidade?.site

  if (!site) return '#'
  if (/^https?:\/\//i.test(site)) return site
  if (site.startsWith('//')) return `https:${site}`

  return `https://${site}`
}

export function temCursosDisponiveis(universidade) {
  return Boolean(universidade?.cursos_pda?.length)
}

export function getCursosDaUniversidade(universidade) {
  return universidade?.cursos_pda || []
}

export function getRotuloCurso(curso) {
  if (!curso) return ''
  const local = curso.municipio && curso.uf ? ` — ${curso.municipio}/${curso.uf}` : ''
  return `${curso.nome_curso}${local}`
}

export function normalizarNome(nome) {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

export function filtrarCursosDaUniversidade(cursos, pesquisa = '') {
  if (!pesquisa) return cursos
  const termo = normalizarNome(pesquisa)
  return cursos.filter((curso) => normalizarNome(curso.nome_curso || '').includes(termo))
}

export function getCorteEnemCurso(universidadeId, nomeCurso) {
  const cursos = cursosEnemPorUniversidadeId.get(Number(universidadeId)) || []
  const curso = cursos.find((c) => c.nome_curso === nomeCurso)
  return curso ? curso.media_corte_enem : null
}

export function getCorteEnemDoCursoSelecionado(universidade, curso) {
  if (!universidade || !curso) return null
  return getCorteEnemCurso(universidade.id, curso.nome_curso)
}

export function selecionarCursoDaUniversidade(cursoSelecionadoRef, curso) {
  cursoSelecionadoRef.value = cursoSelecionadoRef.value === curso ? null : curso
}

export function fecharCursoSelecionado(cursoSelecionadoRef) {
  cursoSelecionadoRef.value = null
}

export default {
  UniversidadePorId,
  getUniversidadePorRota,
  getIniciais,
  getAnoFundacao,
  UniversidadePublica,
  getSiteOficial,
  temCursosDisponiveis,
  getCursosDaUniversidade,
  getRotuloCurso,
  normalizarNome,
  filtrarCursosDaUniversidade,
  getCorteEnemCurso,
  getCorteEnemDoCursoSelecionado,
  selecionarCursoDaUniversidade,
  fecharCursoSelecionado,
}
