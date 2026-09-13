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

export function getCursosDaUniversidade(id) {
  return cursosPorUniversidadeId.get(Number(id)) || []
}

export function getCorteEnemCurso(id, nomeCurso) {
  const curso = getCursosDaUniversidade(id).find((c) => c.nome_curso === nomeCurso)
  return curso ? curso.media_corte_enem : null
}

export function getCursoDestaque(id, cursoAtivo) {
  if (!cursoAtivo) return null
  const curso = getCursosDaUniversidade(id).find((c) => c.nome_curso === cursoAtivo)
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

function atendeFiltroCurso(id, cursoAtivo, notaEnem) {
  const cursos = getCursosDaUniversidade(id)
  if (!cursos.length) return false

  if (cursoAtivo) {
    const curso = cursos.find((c) => c.nome_curso === cursoAtivo)
    if (!curso) return false
    if (notaEnem !== '' && Number(curso.media_corte_enem) > Number(notaEnem)) return false
    return true
  }

  if (notaEnem !== '') {
    return cursos.some((c) => Number(c.media_corte_enem) <= Number(notaEnem))
  }

  return true
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

export function alternarCurso(cursoAtivo, curso) {
  const proximoCurso = cursoAtivo === curso ? '' : curso

  return {
    cursoAtivo: proximoCurso,
    pesquisa: '',
  }
}

export function getUniversidadesFiltradas({
  estadoAtivo = '',
  pesquisa = '',
  ratingAtivo = 'Todas',
  cursoAtivo = '',
  notaEnem = '',
}) {
  const rating = ratingAtivo === 'Todas' ? '' : ratingAtivo
  const resultado = filtrar(estadoAtivo, pesquisa, rating)

  if (!cursoAtivo && notaEnem === '') {
    return resultado
  }

  return resultado.filter((universidade) =>
    atendeFiltroCurso(universidade.id, cursoAtivo, notaEnem),
  )
}

export default {
  getEstados,
  getRatings,
  getCursos,
  getCursosDaUniversidade,
  getCorteEnemCurso,
  getCursoDestaque,
  normalizarNotaEnem,
  filtrar,
  alternarEstado,
  alternarRating,
  alternarCurso,
  getUniversidadesFiltradas,
}
