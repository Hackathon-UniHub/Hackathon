<template>
  <div ref="containerMapa" class="mapa"></div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

const iconesUniversidade = new Map()

function obterIconeUniversidade(zoom) {
  const tamanho = Math.round(Math.min(65, Math.max(38, 38 + (zoom - 4) * 3.375)))
  const iconeExistente = iconesUniversidade.get(tamanho)
  if (iconeExistente) return iconeExistente

  const proporcao = tamanho / 65
  const icone = L.icon({
    iconUrl: '/gemini-svg%201.svg',
    iconSize: [tamanho, tamanho],
    iconAnchor: [tamanho / 2, Math.round(54 * proporcao)],
    popupAnchor: [0, -Math.round(54 * proporcao)],
  })

  iconesUniversidade.set(tamanho, icone)
  return icone
}

const props = defineProps({
  universidades: {
    type: Array,
    default: () => [],
  },
})

const containerMapa = ref(null)
let mapa = null
const marcadores = {}

function iniciaisDaSigla(sigla) {
  return sigla.replace(/[^A-Z]/gi, '').slice(0, 2).toUpperCase()
}

function descricaoResumida(universidade) {
  if (!universidade.descricao) {
    return `${universidade.categoria_administrativa || 'Instituição de ensino'} em ${universidade.municipio}/${universidade.uf}.`
  }

  const limite = 120
  if (universidade.descricao.length <= limite) return universidade.descricao

  return universidade.descricao.slice(0, limite).trim() + '...'
}

function notaIgc(universidade) {
  if (!universidade.igc || universidade.igc === '-') return 'IGC não informado'
  return `IGC ${universidade.igc}/5`
}

function montarPopup(universidade) {
  return `
    <div class="popupUniversidade">
      <div class="popupCabecalho">
        <span class="popupSelo" style="background:${universidade.cor}">
          ${iniciaisDaSigla(universidade.sigla)}
        </span>
        <div>
          <strong class="popupSigla">${universidade.sigla}</strong>
          <div class="popupCidade">${universidade.municipio}/${universidade.uf}</div>
        </div>
      </div>
      <p class="popupDescricao">${descricaoResumida(universidade)}</p>
      <div class="popupRodape">
        <span class="popupIgc">${notaIgc(universidade)}</span>
        <button class="popupBotao" type="button" onclick="window.dispatchEvent(new CustomEvent('abrir-universidade', { detail: '${universidade.sigla}' }))">
          Ver mais
        </button>
      </div>
    </div>
  `
}

onMounted(() => {
  mapa = L.map(containerMapa.value).setView([-15.7801, -47.9292], 4)

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; OpenStreetMap contributors',
  }).addTo(mapa)

  props.universidades.forEach((universidade) => {
    if (universidade.latitude && universidade.longitude) {
      const marcador = L.marker([universidade.latitude, universidade.longitude])
        .setIcon(obterIconeUniversidade(mapa.getZoom()))
        .addTo(mapa)
        .bindPopup(montarPopup(universidade), { maxWidth: 260 })

      marcadores[universidade.sigla] = marcador
    }
  })

  mapa.on('zoom', () => {
    const icone = obterIconeUniversidade(mapa.getZoom())
    Object.values(marcadores).forEach((marcador) => marcador.setIcon(icone))
  })
})

function focarUniversidade(sigla) {
  const universidade = props.universidades.find((item) => item.sigla === sigla)
  const marcador = marcadores[sigla]

  if (!mapa || !universidade || !marcador) return

  mapa.flyTo([universidade.latitude, universidade.longitude], 12, {
    duration: 1.2,
  })
  marcador.openPopup()
}

defineExpose({
  focarUniversidade,
})

onUnmounted(() => {
  if (mapa) {
    mapa.remove()
  }
})
</script>

<style scoped>
.mapa {
  height: 100%;
  width: 100%;
}
</style>

<style>
.popupUniversidade {
  min-width: 210px;
  font-family: inherit;
}

.popupCabecalho {
  display: flex;
  align-items: center;
  gap: 10px;
}

.popupSelo {
  display: grid;
  flex: 0 0 36px;
  place-items: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  color: #ffffff;
  font-size: 0.7rem;
  font-weight: 800;
}

.popupSigla {
  font-size: 0.9rem;
}

.popupCidade {
  color: #91919f;
  font-size: 0.7rem;
}

.popupDescricao {
  margin-top: 8px;
  color: #5d5d6b;
  font-size: 0.75rem;
  line-height: 1.5;
}

.popupRodape {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 10px;
}

.popupIgc {
  padding: 3px 8px;
  border-radius: 999px;
  background: #f2ede4;
  color: #7a0f1a;
  font-size: 0.65rem;
  font-weight: 700;
}

.popupBotao {
  padding: 5px 10px;
  border: none;
  border-radius: 8px;
  background: #7a0f1a;
  color: #ffffff;
  font-size: 0.68rem;
  font-weight: 700;
  cursor: pointer;
}

.popupBotao:hover {
  background: #5c0a13;
}
</style>