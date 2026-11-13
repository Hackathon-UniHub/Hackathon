import notasUniversidades from '@/data/notasUniversidades.js'

const API_URL = 'http://localhost:3000'

export const ufs = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
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

export async function carregarUniversidade(id) {
  const resposta = await fetch(`${API_URL}/universidades/${id}`)
  return await resposta.json()
}

export async function deletarUniversidade(id) {
  await fetch(`${API_URL}/universidades/${id}`, {
    method: 'DELETE',
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
  const universidadesLista = Array.isArray(universidades) ? universidades : [universidades]

  for (const universidade of universidadesLista) {
    const cursosDaUniversidade = Array.isArray(universidade?.cursos)
      ? universidade.cursos
      : Array.isArray(universidade?.principais_graduacoes)
        ? universidade.principais_graduacoes
        : Array.isArray(universidade?.cursos_pda)
          ? universidade.cursos_pda.map((curso) => curso?.nome_curso ?? curso)
          : []

    for (const curso of cursosDaUniversidade) {
      const nomeCurso = typeof curso === 'string' ? curso : (curso?.nome_curso ?? curso?.nome ?? '')
      if (!nomeCurso || lista.includes(nomeCurso)) continue
      lista.push(nomeCurso)
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

    if (
      filtros.pesquisa &&
      !universidade.nome.toLowerCase().includes(filtros.pesquisa.toLowerCase())
    ) {
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

  comNota.sort((anterior, proxima) => proxima.Nota - anterior.Nota)
  return comNota.slice(0, quantidade)
}
