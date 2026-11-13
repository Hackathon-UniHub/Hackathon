const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '')
const pendingCreations = new Map()

async function request(path, options = {}, notFoundIsNull = false) {
  let response

  try {
    response = await fetch(`${API_URL}${path}`, {
      ...options,
      headers: {
        ...(options.body ? { 'Content-Type': 'application/json' } : {}),
        ...options.headers,
      },
    })
  } catch (error) {
    throw new Error(`Não foi possível conectar à API (${API_URL}).`, { cause: error })
  }

  if (notFoundIsNull && response.status === 404) return null
  if (!response.ok) {
    throw new Error(`A API respondeu com erro HTTP ${response.status} em ${path}.`)
  }
  if (response.status === 204) return null

  return response.json()
}

export function listarUsuarios(authUserId) {
  const query = authUserId ? `?auth_user_id=${encodeURIComponent(authUserId)}` : ''
  return request(`/usuarios${query}`)
}

export function buscarUsuario(id) {
  return request(`/usuarios/${encodeURIComponent(id)}`, {}, true)
}

export async function buscarUsuarioPorAuthId(authUserId) {
  const users = await listarUsuarios(authUserId)
  return users[0] || null
}

export function criarUsuario(usuario) {
  const pendingRequest = pendingCreations.get(usuario.auth_user_id)
  if (pendingRequest) return pendingRequest

  const requestPromise = request('/usuarios', {
    method: 'POST',
    body: JSON.stringify(usuario),
  })
  pendingCreations.set(usuario.auth_user_id, requestPromise)
  requestPromise.then(
    () => pendingCreations.delete(usuario.auth_user_id),
    () => pendingCreations.delete(usuario.auth_user_id),
  )
  return requestPromise
}

export function atualizarUsuario(id, atualizacoes) {
  return request(`/usuarios/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(atualizacoes),
  })
}

export function excluirUsuario(id) {
  return request(`/usuarios/${encodeURIComponent(id)}`, { method: 'DELETE' })
}
