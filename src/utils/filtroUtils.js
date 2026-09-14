import universidades from '@/data/universidades.js'
import enem from '@/data/enem.js'

const cursosPorUniversidadeId = new Map()
for (const item of enem) {
  cursosPorUniversidadeId.set(item.id, item.cursos)
}

function getCursosDaUniversidade(id) {
  const cursos = cursosPorUniversidadeId.get(id)
  if (!cursos) return []
  return cursos
}

export function getEstados() {
  const lista = []

  for (const universidade of universidades) {
    if (!lista.includes(universidade.uf)) {
      lista.push(universidade.uf)
    }
  }

  lista.sort()
  return lista
}

export function getRatings() {
  return [1, 2, 3, 4, 5]
}

export function getCursos() {
  const lista = []

  for (const item of enem) {
    for (const curso of item.cursos) {
      if (!lista.includes(curso.nome_curso)) {
        lista.push(curso.nome_curso)
      }
    }
  }

  lista.sort()
  return lista
}

export function getCursosFiltrados(cursos, busca) {
  if (!busca) return cursos

  const resultado = []
  for (const curso of cursos) {
    if (curso.toLowerCase().includes(busca.toLowerCase())) {
      resultado.push(curso)
    }
  }
  return resultado
}

export function getCursoDestaque(id, busca) {
  if (!busca) return null

  const cursos = getCursosDaUniversidade(id)
  for (const curso of cursos) {
    if (curso.nome_curso.toLowerCase().includes(busca.toLowerCase())) {
      return { nome: curso.nome_curso, nota: curso.media_corte_enem }
    }
  }
  return null
}

function normalizarNotaEnem(valor) {
  if (valor === '') return ''

  const numero = Number(valor)
  if (isNaN(numero)) return ''
  if (numero < 0) return 0
  if (numero > 1000) return 1000
  return numero
}

export function getRankingUniversidades(notas, quantidade) {
  const comNota = []
  for (const universidade of notas) {
    if (!isNaN(universidade.Nota)) {
      comNota.push(universidade)
    }
  }

  comNota.sort((a, b) => b.Nota - a.Nota)

  return comNota.slice(0, quantidade)
}

function filtrar(uf, pesquisa, rating) {
  const resultado = []

  for (const universidade of universidades) {
    if (uf && universidade.uf !== uf) continue
    if (pesquisa && !universidade.nome.toLowerCase().includes(pesquisa.toLowerCase())) continue
    if (rating && Math.round(universidade.igc) !== Number(rating)) continue

    resultado.push(universidade)
  }

  return resultado
}

function temCursoQueCabe(id, busca, notaEnem) {
  const cursos = getCursosDaUniversidade(id)

  for (const curso of cursos) {
    if (busca && !curso.nome_curso.toLowerCase().includes(busca.toLowerCase())) continue
    if (notaEnem !== '' && curso.media_corte_enem > notaEnem) continue
    return true
  }

  return false
}

export function getUniversidadesFiltradas(filtros) {
  const uf = filtros.estadoAtivo
  const pesquisa = filtros.pesquisa
  const busca = filtros.buscaCurso
  const notaEnem = filtros.notaEnem
  const rating = filtros.ratingAtivo === 'Todas' ? '' : filtros.ratingAtivo

  const resultado = filtrar(uf, pesquisa, rating)

  if (!busca && notaEnem === '') {
    return resultado
  }

  const comCurso = []
  for (const universidade of resultado) {
    if (temCursoQueCabe(universidade.id, busca, notaEnem)) {
      comCurso.push(universidade)
    }
  }
  return comCurso
}

export function selecionarEstado(estadoRef, pesquisaRef, uf) {
  if (estadoRef.value === uf) {
    estadoRef.value = ''
  } else {
    estadoRef.value = uf
  }
  pesquisaRef.value = ''
}

export function selecionarRating(ratingRef, pesquisaRef, rating) {
  if (ratingRef.value === rating) {
    ratingRef.value = 'Todas'
  } else {
    ratingRef.value = rating
  }
  pesquisaRef.value = ''
}

export function selecionarBuscaCurso(buscaRef, pesquisaRef, curso) {
  if (buscaRef.value.toLowerCase() === curso.toLowerCase()) {
    buscaRef.value = ''
  } else {
    buscaRef.value = curso
  }
  pesquisaRef.value = ''
}

export function atualizarNotaEnem(notaRef, evento) {
  notaRef.value = normalizarNotaEnem(evento.target.value)
}

export default {
  getEstados,
  getRatings,
  getCursos,
  getCursosFiltrados,
  getCursoDestaque,
  getRankingUniversidades,
  getUniversidadesFiltradas,
  selecionarEstado,
  selecionarRating,
  selecionarBuscaCurso,
  atualizarNotaEnem,
}
