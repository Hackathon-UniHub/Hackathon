import universidades from '@/data/universidades.js'

export function getEstados() {
  const estados = universidades.map((e) => e.uf)
  return [...new Set(estados)].sort()
}

export function getRatings() {
  return [1, 2, 3, 4, 5]
}

export function filtrar(uf = '', pesquisa = '', rating = '') {
  return universidades
    .filter((e) => !uf || e.uf === uf)
    .filter((e) => !pesquisa || e.nome.toLowerCase().includes(pesquisa.toLowerCase()))
    .filter((e) => !rating || Math.round(Number(e.igc)) === Number(rating))
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

export function getUniversidadesFiltradas({
  estadoAtivo = '',
  pesquisa = '',
  ratingAtivo = 'Todas',
}) {
  const rating = ratingAtivo === 'Todas' ? '' : ratingAtivo
  return filtrar(estadoAtivo, pesquisa, rating)
}

export default {
  getEstados,
  getRatings,
  filtrar,
  alternarEstado,
  alternarRating,
  getUniversidadesFiltradas,
}
