import universidades from '@/data/universidades.js'

export function getEstados() {
  const estados = universidades.map((e) => e.uf)
  const semRepetir = [...new Set(estados)]
  return semRepetir.sort()
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
