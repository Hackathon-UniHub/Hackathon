const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '')
const pendingCreations = new Map()
const CAMPOS_API = {
  auth_user_id: 'id_usuario_autenticado',
  full_name: 'nome_completo',
  avatar_url: 'url_avatar',
  created_at: 'criado_em',
  updated_at: 'atualizado_em',
}
const CAMPOS_APP = Object.fromEntries(
  Object.entries(CAMPOS_API).map(([campoApp, campoApi]) => [campoApi, campoApp]),
)

function converterCampos(usuario, campos) {
  return Object.fromEntries(
    Object.entries(usuario).map(([campo, valor]) => [campos[campo] || campo, valor]),
  )
}

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

export async function listarUsuarios(authUserId) {
  const query = authUserId
    ? `?id_usuario_autenticado=${encodeURIComponent(authUserId)}`
    : ''
  const usuarios = await request(`/usuarios${query}`)
  return usuarios.map((usuario) => converterCampos(usuario, CAMPOS_APP))
}

export async function buscarUsuario(id) {
  const usuario = await request(`/usuarios/${encodeURIComponent(id)}`, {}, true)
  return usuario && converterCampos(usuario, CAMPOS_APP)
}

export async function buscarUsuarioPorAuthId(authUserId) {
  const users = await listarUsuarios(authUserId)

  return users.reduce((latest, user) => {
    if (!latest) return user

    const latestDate = Date.parse(latest.updated_at || latest.created_at || '') || 0
    const userDate = Date.parse(user.updated_at || user.created_at || '') || 0
    return userDate >= latestDate ? user : latest
  }, null)
}

export function criarUsuario(usuario) {
  const pendingRequest = pendingCreations.get(usuario.auth_user_id)
  if (pendingRequest) return pendingRequest

  const requestPromise = request('/usuarios', {
    method: 'POST',
    body: JSON.stringify(converterCampos(usuario, CAMPOS_API)),
  }).then((registro) => converterCampos(registro, CAMPOS_APP))
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
    body: JSON.stringify(converterCampos(atualizacoes, CAMPOS_API)),
  }).then((registro) => converterCampos(registro, CAMPOS_APP))
}

export function excluirUsuario(id) {
  return request(`/usuarios/${encodeURIComponent(id)}`, { method: 'DELETE' })
}

export async function excluirUsuariosPorAuthId(authUserId, profileId) {
  const usuarios = await listarUsuarios(authUserId)
  const ids = new Set(
    usuarios
      .filter((usuario) => usuario.auth_user_id === authUserId)
      .map((usuario) => usuario.id),
  )
  ids.add(profileId)

  for (const id of ids) {
    await excluirUsuario(id)
  }
}
