import universidades from '@/data/universidades.js'
import enem from '@/data/enem.js'

const cursosPorUniversidadeId = new Map()
for (const item of enem) {
  cursosPorUniversidadeId.set(item.id, item.cursos)
}

export function UniversidadePorId(id) {
  const numero = Number(id)

  for (const universidade of universidades) {
    if (universidade.id === numero) {
      return universidade
    }
  }

  return null
}

export function getIniciais(universidade) {
  if (!universidade) return ''
  if (universidade.sigla) return universidade.sigla.slice(0, 3)
  return universidade.nome.slice(0, 3)
}

export function getAnoFundacao(universidade) {
  if (!universidade || !universidade.data_criacao_ies) return null
  return universidade.data_criacao_ies.split('-')[0]
}

export function UniversidadePublica(universidade) {
  if (!universidade || !universidade.categoria) return false
  return universidade.categoria.toLowerCase() === 'publica'
}

export function getSiteOficial(universidade) {
  if (!universidade || !universidade.site) return '#'

  const site = universidade.site

  if (site.startsWith('http://') || site.startsWith('https://')) {
    return site
  }
  if (site.startsWith('//')) {
    return 'https:' + site
  }
  return 'https://' + site
}

export function temCursosDisponiveis(universidade) {
  if (!universidade || !universidade.cursos_pda) return false
  return universidade.cursos_pda.length > 0
}

export function getCursosDaUniversidade(universidade) {
  if (!universidade || !universidade.cursos_pda) return []
  return universidade.cursos_pda
}

export function getRotuloCurso(curso) {
  if (!curso) return ''
  if (curso.municipio && curso.uf) {
    return curso.nome_curso + ' — ' + curso.municipio + '/' + curso.uf
  }
  return curso.nome_curso
}

export function normalizarNome(nome) {
  return nome
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]/g, '')
}

export function filtrarCursosDaUniversidade(cursos, pesquisa) {
  if (!pesquisa) return cursos

  const resultado = []
  for (const curso of cursos) {
    if (curso.nome_curso.toLowerCase().includes(pesquisa.toLowerCase())) {
      resultado.push(curso)
    }
  }
  return resultado
}

export function getCorteEnemDoCursoSelecionado(universidade, curso) {
  if (!universidade || !curso) return null

  const cursos = cursosPorUniversidadeId.get(universidade.id)
  if (!cursos) return null

  for (const item of cursos) {
    if (item.nome_curso === curso.nome_curso) {
      return item.media_corte_enem
    }
  }

  return null
}

export function selecionarCursoDaUniversidade(cursoRef, curso) {
  if (cursoRef.value === curso) {
    cursoRef.value = null
  } else {
    cursoRef.value = curso
  }
}

export function fecharCursoSelecionado(cursoRef) {
  cursoRef.value = null
}

export default {
  UniversidadePorId,
  getIniciais,
  getAnoFundacao,
  UniversidadePublica,
  getSiteOficial,
  temCursosDisponiveis,
  getCursosDaUniversidade,
  getRotuloCurso,
  normalizarNome,
  filtrarCursosDaUniversidade,
  getCorteEnemDoCursoSelecionado,
  selecionarCursoDaUniversidade,
  fecharCursoSelecionado,
}
