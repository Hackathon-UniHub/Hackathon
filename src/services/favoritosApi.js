const API_URL = (import.meta.env.VITE_API_URL || 'http://localhost:3001').replace(/\/+$/, '')

async function request(path, options = {}) {
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
    throw new Error(`Não foi possível conectar à API (${API_URL}). Verifique se o JSON Server está rodando.`, {
      cause: error,
    })
  }

  if (!response.ok) {
    throw new Error(`Erro HTTP ${response.status} ao acessar ${path}.`)
  }

  if (response.status === 204) return null
  return response.json()
}

// READ (Listar todos os favoritos do usuário)
export async function listarFavoritosPorUsuario(usuarioId) {
  return request(`/favoritos?usuario_id=${encodeURIComponent(usuarioId)}`)
}

// READ BY ID (Consultar um registro de favorito específico pelo ID)
export async function buscarFavoritoPorId(id) {
  return request(`/favoritos/${encodeURIComponent(id)}`)
}

// CREATE (Cadastrar novo favorito)
export async function criarFavorito(novoFavorito) {
  return request('/favoritos', {
    method: 'POST',
    body: JSON.stringify(novoFavorito),
  })
}

// UPDATE (Atualizar anotação ou prioridade de um favorito existente)
export async function atualizarFavorito(id, dadosAtualizados) {
  return request(`/favoritos/${encodeURIComponent(id)}`, {
    method: 'PATCH',
    body: JSON.stringify(dadosAtualizados),
  })
}

// DELETE (Excluir favorito pelo ID)
export async function excluirFavorito(id) {
  return request(`/favoritos/${encodeURIComponent(id)}`, {
    method: 'DELETE',
  })
}
