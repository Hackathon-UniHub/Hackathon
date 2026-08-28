export function normalizar(texto) {
	return (texto || '')
		.toString()
		.normalize('NFD')
		.replace(/[\u0300-\u036f]/g, '')
		.toLowerCase()
}

export function filtrarUniversidades(universidades, busca) {
	const buscaNormalizada = normalizar(busca.trim())

	if (!buscaNormalizada) return universidades

	return universidades.filter((universidade) => {
		return (
			normalizar(universidade.sigla).includes(buscaNormalizada) ||
			normalizar(universidade.nome).includes(buscaNormalizada) ||
			normalizar(universidade.municipio).includes(buscaNormalizada)
		)
	})
}

export function agruparUniversidadesPorEstado(universidades) {
	const grupos = {}

	universidades.forEach((universidade) => {
		if (!grupos[universidade.uf]) {
			grupos[universidade.uf] = []
		}
		grupos[universidade.uf].push(universidade)
	})

	return Object.keys(grupos)
		.sort()
		.map((uf) => ({
			uf,
			universidades: grupos[uf],
		}))
}

export function alternarEstado(estadosExpandidos, uf) {
	estadosExpandidos[uf] = !estadosExpandidos[uf]
}

export function estadoEstaAberto(estadosExpandidos, busca, uf) {
	if (normalizar(busca.trim())) return true
	return !!estadosExpandidos[uf]
}

export function selecionarUniversidade(componenteMapa, universidade) {
	componenteMapa?.focarUniversidade(universidade.sigla)
}

export function criarManipuladorAberturaUniversidade(router) {
	return (evento) => {
		router.push({ name: 'universidade', params: { id: evento.detail } })
	}
}
