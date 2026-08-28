export function filtrarFavoritosPorTexto(favoritos, texto) {
  if (!texto) return favoritos
  const termo = texto.toLowerCase()
  return favoritos.filter((u) => u.nome?.toLowerCase().includes(termo))
}
