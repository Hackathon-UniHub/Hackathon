import universidades from '@/data/universidades.js'

export function getEstados() {
  const estados = universidades.map(e => e.uf)
  const semRepetir = [...new Set(estados)]
  return semRepetir.sort()
}

export function filtrar(uf, pesquisa) {
  return universidades
  .filter(e => e.uf === uf)
  .filter(e => e.nome.toLowerCase().includes(pesquisa.toLowerCase()))
}
