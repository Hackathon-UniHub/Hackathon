import notasUniversidades from '@/data/notasUniversidades.js'

const API_URL = 'http://localhost:3000'

export const ufs = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA',
  'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
]

export async function carregarUniversidades() {
  const resposta = await fetch(`${API_URL}/universidades`)
  return await resposta.json()
}

export async function cadastrarUniversidade(novaUniversidade) {
  await fetch(`${API_URL}/universidades`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(novaUniversidade),
  })
}

export function getEstados(universidades) {
  const lista = []

  for (const universidade of universidades) {
    if (!lista.includes(universidade.uf)) {
      lista.push(universidade.uf)
    }
  }

  lista.sort()
  return lista
}

export function getCursos(universidades) {
  const lista = []

  for (const universidade of universidades) {
    for (const curso of universidade.cursos) {
      if (!lista.includes(curso)) {
        lista.push(curso)
      }
    }
  }

  lista.sort()
  return lista
}

export function getCursosFiltrados(cursos, busca) {
  const resultado = []

  for (const curso of cursos) {
    if (curso.toLowerCase().includes(busca.toLowerCase())) {
      resultado.push(curso)
    }
  }

  return resultado
}

export function getUniversidadesFiltradas(universidades, filtros) {
  const resultado = []

  for (const universidade of universidades) {
    let passa = true

    if (filtros.estado && universidade.uf !== filtros.estado) {
      passa = false
    }

    if (filtros.pesquisa && !universidade.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())) {
      passa = false
    }

    if (filtros.rating !== 'Todas' && Math.round(Number(universidade.igc)) !== filtros.rating) {
      passa = false
    }

    let temCurso = false
    for (const curso of universidade.cursos) {
      if (curso.toLowerCase().includes(filtros.curso.toLowerCase())) {
        temCurso = true
      }
    }
    if (filtros.curso && !temCurso) {
      passa = false
    }

    if (passa) {
      resultado.push(universidade)
    }
  }

  return resultado
}

export function getRankingUniversidades(quantidade) {
  const comNota = []

  for (const universidade of notasUniversidades) {
    if (!isNaN(universidade.Nota)) {
      comNota.push(universidade)
    }
  }

  comNota.sort((a, b) => b.Nota - a.Nota)
  return comNota.slice(0, quantidade)
}
