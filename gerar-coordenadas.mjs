// Script para geocodificar os endereços das universidades e gerar o coordenadasMapa.js
//
// COMO USAR:
// 1. Coloque este arquivo na raiz do seu projeto (mesma pasta do package.json)
// 2. Rode: node gerar-coordenadas.mjs
// 3. Aguarde (leva uns 3-4 minutos pra 208 universidades, é 1 request por segundo
//    porque o serviço gratuito do OpenStreetMap bloqueia se for mais rápido que isso)
// 4. O arquivo src/data/coordenadasMapa.js vai ser criado/atualizado automaticamente
//
// Se alguma universidade não for encontrada, ela aparece no final como aviso
// no terminal, e você pode completar manualmente depois.

import universidades from './src/data/universidades.js'
import { writeFileSync } from 'fs'

const CORES_POR_ESTADO = {}

const PALETA = [
  '#8f1727', '#2857a4', '#24604e', '#294b7e', '#743038',
  '#3f712d', '#a6263a', '#1c6870', '#5a3d8f', '#0f6e5c',
  '#b5651d', '#2f4f6f', '#6b8e23', '#7a3b69', '#1f6f8b',
  '#946b1f', '#3a5f0b', '#8b3a62', '#2e4a7d', '#9b5a1f',
]

function corParaEstado(uf) {
  if (!CORES_POR_ESTADO[uf]) {
    CORES_POR_ESTADO[uf] = { indice: 0 }
  }
  const grupo = CORES_POR_ESTADO[uf]
  const cor = PALETA[grupo.indice % PALETA.length]
  grupo.indice += 1
  return cor
}

function limparEndereco(endereco, municipio, uf) {
  // remove o CEP (o Nominatim geocodifica melhor sem ele às vezes atrapalhar)
  const semCep = endereco.replace(/CEP:\s*[\d-]+/i, '').trim()
  return `${semCep}, ${municipio}, ${uf}, Brasil`
}

async function geocodificar(endereco) {
  const url = `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(endereco)}`

  const resposta = await fetch(url, {
    headers: {
      'User-Agent': 'UniHub-App/1.0 (uso educacional - geocodificacao de universidades)',
    },
  })

  if (!resposta.ok) return null

  const dados = await resposta.json()
  if (!dados || dados.length === 0) return null

  return {
    latitude: parseFloat(dados[0].lat),
    longitude: parseFloat(dados[0].lon),
  }
}

function aguardar(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function main() {
  const resultado = {}
  const naoEncontradas = []

  console.log(`Geocodificando ${universidades.length} universidades...\n`)

  for (let i = 0; i < universidades.length; i++) {
    const universidade = universidades[i]
    const enderecoCompleto = limparEndereco(
      universidade.endereco_sede,
      universidade.municipio,
      universidade.uf,
    )

    process.stdout.write(
      `[${i + 1}/${universidades.length}] ${universidade.sigla}... `,
    )

    try {
      let coordenada = await geocodificar(enderecoCompleto)

      // se não achou com endereço completo, tenta só cidade + estado (fallback)
      if (!coordenada) {
        const enderecoSimples = `${universidade.municipio}, ${universidade.uf}, Brasil`
        coordenada = await geocodificar(enderecoSimples)
      }

      if (coordenada) {
        resultado[universidade.sigla] = {
          latitude: Number(coordenada.latitude.toFixed(4)),
          longitude: Number(coordenada.longitude.toFixed(4)),
          cor: corParaEstado(universidade.uf),
        }
        console.log(`OK (${coordenada.latitude.toFixed(4)}, ${coordenada.longitude.toFixed(4)})`)
      } else {
        naoEncontradas.push(universidade.sigla)
        console.log('NÃO ENCONTRADA')
      }
    } catch (erro) {
      naoEncontradas.push(universidade.sigla)
      console.log('ERRO: ' + erro.message)
    }

    // respeita o limite de 1 requisição por segundo do Nominatim
    await aguardar(1100)
  }

  const linhas = Object.entries(resultado)
    .map(([sigla, dados]) => {
      const chave = /^[A-Z0-9_]+$/.test(sigla) ? sigla : `'${sigla}'`
      return `  ${chave}: { latitude: ${dados.latitude}, longitude: ${dados.longitude}, cor: '${dados.cor}' },`
    })
    .join('\n')

  const conteudoArquivo = `export const coordenadasMapa = {\n${linhas}\n}\n`

  writeFileSync('./src/data/coordenadasMapa.js', conteudoArquivo, 'utf-8')

  console.log(`\n\nPronto! ${Object.keys(resultado).length} universidades geocodificadas.`)
  console.log('Arquivo gerado em: src/data/coordenadasMapa.js')

  if (naoEncontradas.length > 0) {
    console.log(`\n${naoEncontradas.length} não encontradas (adicione manualmente):`)
    naoEncontradas.forEach((sigla) => console.log(`  - ${sigla}`))
  }
}

main()
