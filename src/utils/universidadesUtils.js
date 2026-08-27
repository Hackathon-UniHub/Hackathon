import universidades from '@/data/universidades.js'

export function UniversidadePorId(id) {
  if (id == null) return null
  const num = Number(id)
  return universidades.find((u) => Number(u.id) === num) || null
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

export function getUniversidadePorRota(route) {
  return UniversidadePorId(route?.params?.id)
}

export default {
  UniversidadePorId,
  getIniciais,
  getAnoFundacao,
  UniversidadePublica,
  getUniversidadePorRota,
}
