import universidades from '@/data/universidades.js'

export function UniversidadePorId(id) {
  if (id == null) return null
  const num = Number(id)
  return universidades.find((u) => Number(u.id) === num) || null
}

export default {
  UniversidadePorId,
}
