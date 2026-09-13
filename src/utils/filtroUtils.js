import universidades from '@/data/universidades.js'
import enem from '@/data/enem.js'

const cursosPorUniversidadeId = new Map(enem.map((item) => [Number(item.id), item.cursos]))

export function getEstados() {
  const estados = universidades.map((e) => e.uf)
  return [...new Set(estados)].sort()
}

export function getRatings() {
  return [1, 2, 3, 4, 5]
}

export function getCursos() {
  const nomesCursos = enem.flatMap((item) => item.cursos.map((curso) => curso.nome_curso))
  return [...new Set(nomesCursos)].sort()
}

export function getCursosFiltrados(cursos, busca = '') {
  if (!busca) return cursos
  const termo = busca.toLowerCase()
  return cursos.filter((curso) => curso.toLowerCase().includes(termo))
}

export function getRankingUniversidades(notas, limite = 5) {
  return [...notas]
    .filter((universidade) => Number.isFinite(Number(universidade.Nota)))
    .sort((primeira, segunda) => Number(segunda.Nota) - Number(primeira.Nota))
    .slice(0, limite)
}

export function getCursosDaUniversidade(id) {
  return cursosPorUniversidadeId.get(Number(id)) || []
}

export function getCursoDestaque(id, busca) {
  if (!busca) return null
  const termo = busca.toLowerCase()
  const curso = getCursosDaUniversidade(id).find((c) => c.nome_curso.toLowerCase().includes(termo))
  return curso ? { nome: curso.nome_curso, nota: curso.media_corte_enem } : null
}

export function normalizarNotaEnem(valor) {
  if (valor === '' || valor === null || valor === undefined) return ''
  const numero = Number(valor)
  if (Number.isNaN(numero)) return ''
  return Math.min(1000, Math.max(0, numero))
}

export function filtrar(uf = '', pesquisa = '', rating = '') {
  return universidades
    .filter((e) => !uf || e.uf === uf)
    .filter((e) => !pesquisa || e.nome.toLowerCase().includes(pesquisa.toLowerCase()))
    .filter((e) => !rating || Math.round(Number(e.igc)) === Number(rating))
}

function atendeFiltroCurso(id, busca, notaEnem) {
  const cursos = getCursosDaUniversidade(id)
  if (!cursos.length) return false

  const termo = busca.toLowerCase()
  const cursosCorrespondentes = busca
    ? cursos.filter((c) => c.nome_curso.toLowerCase().includes(termo))
    : cursos

  if (busca && !cursosCorrespondentes.length) return false

  if (notaEnem !== '') {
    return cursosCorrespondentes.some((c) => Number(c.media_corte_enem) <= Number(notaEnem))
  }

  return true
}

export function getUniversidadesFiltradas({
  estadoAtivo = '',
  pesquisa = '',
  ratingAtivo = 'Todas',
  buscaCurso = '',
  notaEnem = '',
}) {
  const rating = ratingAtivo === 'Todas' ? '' : ratingAtivo
  const resultado = filtrar(estadoAtivo, pesquisa, rating)

  if (!buscaCurso && notaEnem === '') {
    return resultado
  }

  return resultado.filter((universidade) =>
    atendeFiltroCurso(universidade.id, buscaCurso, notaEnem),
  )
}

export function alternarEstado(estadoAtivo, uf) {
  const proximoEstado = estadoAtivo === uf ? '' : uf

  return {
    estadoAtivo: proximoEstado,
    pesquisa: '',
  }
}

export function alternarRating(ratingAtivo, rating) {
  const proximoRating = ratingAtivo === rating ? 'Todas' : rating

  return {
    ratingAtivo: proximoRating,
    pesquisa: '',
  }
}

export function alternarBuscaCurso(buscaAtual, curso) {
  const proximaBusca = buscaAtual.toLowerCase() === curso.toLowerCase() ? '' : curso

  return {
    buscaCurso: proximaBusca,
    pesquisa: '',
  }
}

export function selecionarEstado(estadoAtivoRef, pesquisaRef, uf) {
  const proximo = alternarEstado(estadoAtivoRef.value, uf)
  estadoAtivoRef.value = proximo.estadoAtivo
  pesquisaRef.value = proximo.pesquisa
}

export function selecionarRating(ratingAtivoRef, pesquisaRef, rating) {
  const proximo = alternarRating(ratingAtivoRef.value, rating)
  ratingAtivoRef.value = proximo.ratingAtivo
  pesquisaRef.value = proximo.pesquisa
}

export function selecionarBuscaCurso(buscaCursoRef, pesquisaRef, curso) {
  const proximo = alternarBuscaCurso(buscaCursoRef.value, curso)
  buscaCursoRef.value = proximo.buscaCurso
  pesquisaRef.value = proximo.pesquisa
}

export function atualizarNotaEnem(notaEnemRef, evento) {
  notaEnemRef.value = normalizarNotaEnem(evento.target.value)
}

export default {
  getEstados,
  getRatings,
  getCursos,
  getCursosFiltrados,
  getRankingUniversidades,
  getCursosDaUniversidade,
  getCursoDestaque,
  normalizarNotaEnem,
  filtrar,
  getUniversidadesFiltradas,
  alternarEstado,
  alternarRating,
  alternarBuscaCurso,
  selecionarEstado,
  selecionarRating,
  selecionarBuscaCurso,
  atualizarNotaEnem,
}
