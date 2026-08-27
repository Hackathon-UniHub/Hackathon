<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ComponenteMapa from '@/components/ComponenteMapa.vue'
import { universidades } from '@/data/universidades.js'

const router = useRouter()

const universidadesNoMapa = universidades.filter(
  (universidade) => universidade.latitude && universidade.longitude,
)

const componenteMapaRef = ref(null)
const estadosExpandidos = reactive({})

const universidadesPorEstado = computed(() => {
  const grupos = {}

  universidadesNoMapa.forEach((universidade) => {
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
})

function alternarEstado(uf) {
  estadosExpandidos[uf] = !estadosExpandidos[uf]
}

function selecionarUniversidade(universidade) {
  componenteMapaRef.value?.focarUniversidade(universidade.sigla)
}

function aoAbrirUniversidade(evento) {
  const sigla = evento.detail
  router.push({ name: 'universidade', params: { sigla } })
}

onMounted(() => {
  window.addEventListener('abrir-universidade', aoAbrirUniversidade)
})

onUnmounted(() => {
  window.removeEventListener('abrir-universidade', aoAbrirUniversidade)
})
</script>

<template>
  <div class="mapaPagina">
    <section class="mapaArea" aria-label="Mapa interativo de universidades">
      <ComponenteMapa ref="componenteMapaRef" :universidades="universidadesNoMapa" />
    </section>

    <aside class="mapaInformacoes">
      <RouterLink class="voltar" to="/">← Voltar</RouterLink>

      <span class="sobretitulo">Exploração</span>
      <h1>Mapa interativo</h1>
      <p class="descricao">
        Clique num estado para expandir e depois clique numa universidade para ir até ela no mapa.
      </p>

      <div class="listaTitulo">Estados</div>
      <ul class="estadosLista">
        <li v-for="grupo in universidadesPorEstado" :key="grupo.uf" class="estadoItem">
          <button class="estadoCabecalho" type="button" @click="alternarEstado(grupo.uf)">
            <span
              class="estadoSeta"
              :class="{ estadoSetaAberta: estadosExpandidos[grupo.uf] }"
              >▸</span
            >
            <span class="estadoNome">{{ grupo.uf }}</span>
            <span class="estadoContagem">{{ grupo.universidades.length }}</span>
          </button>

          <ul v-if="estadosExpandidos[grupo.uf]" class="universidadesLista">
            <li
              v-for="universidade in grupo.universidades"
              :key="universidade.sigla"
              class="universidadeItem"
            >
              <button
                class="universidadeBotao"
                type="button"
                @click="selecionarUniversidade(universidade)"
              >
                <span class="universidadeNome">
                  <span
                    class="universidadePonto"
                    :style="{ backgroundColor: universidade.cor }"
                  ></span>
                  {{ universidade.sigla }}
                </span>
                <span class="universidadeCidade">{{ universidade.municipio }}</span>
              </button>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  </div>
</template>

<style scoped>
.mapaPagina {
  position: relative;
  height: calc(100vh - 88px);
  overflow: hidden;
  background: #fffcf7;
  color: #1c1c22;
}

.mapaArea {
  position: absolute;
  inset: 0;
}

.mapaInformacoes {
  position: absolute;
  top: 20px;
  left: 20px;
  z-index: 1000;
  width: 280px;
  max-height: calc(100% - 40px);
  overflow-y: auto;
  padding: 20px;
  border: 1px solid rgba(28, 28, 34, 0.1);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.12);
}

.voltar {
  display: inline-block;
  margin-bottom: 14px;
  color: #737384;
  font-size: 0.85rem;
}

.voltar:hover {
  color: #7a0f1a;
}

.sobretitulo,
.listaTitulo {
  color: #9e1f2e;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mapaInformacoes h1 {
  margin-top: 8px;
  font-size: 1.6rem;
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.descricao {
  margin-top: 12px;
  color: #5d5d6b;
  font-size: 0.85rem;
  line-height: 1.6;
}

.listaTitulo {
  margin-top: 20px;
  color: #91919f;
  font-size: 0.65rem;
}

.estadosLista {
  margin-top: 10px;
  padding: 0;
  list-style: none;
}

.estadoItem {
  border-bottom: 1px solid rgba(28, 28, 34, 0.06);
}

.estadoCabecalho {
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
  padding: 10px 4px;
  border: none;
  background: none;
  color: #41414a;
  font-size: 0.85rem;
  font-weight: 600;
  text-align: left;
  cursor: pointer;
}

.estadoCabecalho:hover {
  color: #7a0f1a;
}

.estadoSeta {
  display: inline-block;
  color: #9e1f2e;
  font-size: 0.65rem;
  transition: transform 0.15s ease;
}

.estadoSetaAberta {
  transform: rotate(90deg);
}

.estadoContagem {
  margin-left: auto;
  padding: 2px 7px;
  border-radius: 999px;
  background: #f2ede4;
  color: #91919f;
  font-size: 0.65rem;
  font-weight: 700;
}

.universidadesLista {
  display: grid;
  gap: 4px;
  margin: 2px 0 10px 20px;
  padding: 0;
  list-style: none;
}

.universidadeItem {
  display: block;
}

.universidadeBotao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  width: 100%;
  padding: 6px 8px;
  border: none;
  border-radius: 8px;
  background: none;
  color: #41414a;
  font-size: 0.78rem;
  text-align: left;
  cursor: pointer;
}

.universidadeBotao:hover {
  background: #fdf5f5;
  color: #7a0f1a;
}

.universidadeNome {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.universidadePonto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.universidadeCidade {
  color: #a1a1aa;
  font-size: 0.68rem;
  text-align: right;
}

@media (max-width: 700px) {
  .mapaInformacoes {
    top: auto;
    bottom: 16px;
    left: 16px;
    right: 16px;
    width: auto;
    max-height: 45%;
  }
}
</style>