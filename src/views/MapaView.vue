<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ComponenteMapa from '@/components/ComponenteMapa.vue'
import universidades from '@/data/universidades.js'
import { coordenadasMapa } from '@/data/coordenadasMapa.js'
import {
  getCursos,
  getCursosDaUniversidade,
  getCursosFiltrados,
} from '@/utils/filtroUtils.js'
import {
  agruparUniversidadesPorEstado,
  alternarEstado,
  criarManipuladorAberturaUniversidade,
  estadoEstaAberto,
  filtrarUniversidades,
  filtrarUniversidadesPorCurso,
  selecionarUniversidade,
} from '@/utils/mapaUtils.js'
import { HugeiconsIcon } from '@hugeicons/vue'
import { XIcon, FilterIcon } from '@hugeicons/core-free-icons'

const router = useRouter()

const universidadesNoMapa = universidades
  .filter((universidade) => coordenadasMapa[universidade.sigla])
  .map((universidade) => ({
    ...universidade,
    ...coordenadasMapa[universidade.sigla],
  }))

const componenteMapaRef = ref(null)
const estadosExpandidos = reactive({})
const busca = ref('')
const buscaCurso = ref('')
const cursos = getCursos()
const painelAberto = ref(false)

const cursosFiltrados = computed(() => getCursosFiltrados(cursos, buscaCurso.value))

const universidadesFiltradas = computed(() => {
  const resultadoBusca = filtrarUniversidades(universidadesNoMapa, busca.value)
  return filtrarUniversidadesPorCurso(resultadoBusca, buscaCurso.value, getCursosDaUniversidade)
})

const universidadesDestacadas = computed(() => {
  const destacadas = new Set()
  const universidadesComCurso = buscaCurso.value
    ? filtrarUniversidadesPorCurso(universidadesNoMapa, buscaCurso.value, getCursosDaUniversidade)
    : []

  universidadesComCurso.forEach((universidade) => destacadas.add(universidade.sigla))

  universidadesNoMapa.forEach((universidade) => {
    if (estadosExpandidos[universidade.uf]) {
      destacadas.add(universidade.sigla)
    }
  })

  return [...destacadas]
})

function selecionarCurso(curso) {
  buscaCurso.value = buscaCurso.value.toLowerCase() === curso.toLowerCase() ? '' : curso
  busca.value = ''
}

const universidadesPorEstado = computed(() =>
  agruparUniversidadesPorEstado(universidadesFiltradas.value),
)
const aoAbrirUniversidade = criarManipuladorAberturaUniversidade(router)

function alternarPainel() {
  painelAberto.value = !painelAberto.value
}

function fecharPainel() {
  painelAberto.value = false
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
      <ComponenteMapa
        ref="componenteMapaRef"
        :universidades="universidadesNoMapa"
        :universidades-destacadas="universidadesDestacadas"
      />
    </section>

    <button
      class="botaoTogglePainel"
      type="button"
      @click="alternarPainel"
      :aria-expanded="painelAberto"
      aria-label="Alternar painel de informações"
      aria-controls="mapaInformacoes"
    >
      <HugeiconsIcon v-if="!painelAberto" :icon="FilterIcon" :size="24" color="currentColor" :stroke-width="2" />
      <HugeiconsIcon v-else :icon="XIcon" :size="24" color="currentColor" :stroke-width="2" />
    </button>

    <aside
      id="mapaInformacoes"
      class="mapaInformacoes"
      :class="{ aberto: painelAberto }"
      aria-label="Informações do mapa"
    >
      <div class="mapaInformacoesCabecalho">
        <button class="voltar" type="button" @click="fecharPainel">← Voltar</button>

        <span class="sobretitulo">Exploração</span>
        <h1>Mapa interativo</h1>
        <p class="descricao">
          Busque ou clique num estado para expandir e ir até a universidade no mapa.
        </p>

        <div class="buscaContainer">
          <input
            v-model="busca"
            type="text"
            class="buscaInput"
            placeholder="Buscar universidade, sigla ou cidade..."
          />
          <button
            v-if="busca"
            class="buscaLimpar"
            type="button"
            @click="busca = ''"
            aria-label="Limpar busca"
          >
            ×
          </button>
        </div>

        <div class="filtroCurso">
          <span class="rotuloCurso">BUSCAR POR CURSO</span>
          <input
            v-model="buscaCurso"
            type="text"
            class="buscaInput"
            placeholder="Ex: Medicina, Engenharia, Direito..."
          />

          <div class="chipsCursos">
            <button
              v-for="curso in cursosFiltrados"
              :key="curso"
              class="chipCurso"
              type="button"
              :class="{ ativo: buscaCurso.toLowerCase() === curso.toLowerCase() }"
              @click="selecionarCurso(curso)"
            >
              {{ curso }}
            </button>
            <p v-if="!cursosFiltrados.length" class="semResultadoCurso">
              Nenhum curso encontrado.
            </p>
          </div>
        </div>
      </div>

      <div class="mapaInformacoesLista">
        <ul class="estadosLista">
          <li v-for="grupo in universidadesPorEstado" :key="grupo.uf" class="estadoItem">
            <button
              class="estadoCabecalho"
              type="button"
              @click="alternarEstado(estadosExpandidos, grupo.uf)"
            >
              <span
                class="estadoSeta"
                :class="{
                  estadoSetaAberta: estadoEstaAberto(estadosExpandidos, busca, grupo.uf),
                }"
                >▸</span
              >
              <span class="estadoNome">{{ grupo.uf }}</span>
              <span class="estadoContagem">{{ grupo.universidades.length }}</span>
            </button>

            <ul
              v-if="estadoEstaAberto(estadosExpandidos, busca, grupo.uf)"
              class="universidadesLista"
            >
              <li
                v-for="universidade in grupo.universidades"
                :key="universidade.id"
                class="universidadeItem"
              >
                <button
                  class="universidadeBotao"
                  type="button"
                  @click="selecionarUniversidade(componenteMapaRef, universidade)"
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

        <p v-if="universidadesPorEstado.length === 0" class="semResultados">
          Nenhuma universidade encontrada para os filtros selecionados.
        </p>
      </div>
    </aside>

    <div
      v-if="painelAberto"
      class="overlayPainel"
      @click="fecharPainel"
      aria-hidden="true"
    ></div>
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
  bottom: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  width: 350px;
  height: calc(100% - 40px);
  overflow: hidden;
  border: 1px solid rgba(28, 28, 34, 0.1);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.12);
  transform: translateX(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.mapaInformacoesCabecalho {
  flex: 0 0 auto;
  padding: 20px 20px 14px;
}

.mapaInformacoesLista {
  flex: 1 1 auto;
  min-height: 0;
  overflow-y: auto;
  padding: 0 20px 16px;
}

.voltar {
  display: inline-block;
  margin-bottom: 14px;
  padding: 0;
  border: 0;
  background: transparent;
  color: #737384;
  font-size: 0.85rem;
  cursor: pointer;
}

.voltar:hover {
  color: #7a0f1a;
}

.sobretitulo {
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

.buscaContainer {
  position: relative;
  margin-top: 16px;
}

.buscaInput {
  width: 100%;
  padding: 9px 32px 9px 12px;
  border: 1px solid rgba(28, 28, 34, 0.14);
  border-radius: 10px;
  background: #fdfaf4;
  color: #1c1c22;
  font-size: 0.8rem;
  outline: none;
  transition: border-color 0.15s ease;
}

.buscaInput::placeholder {
  color: #a1a1aa;
}

.buscaInput:focus {
  border-color: #9e1f2e;
  background: #ffffff;
}

.buscaLimpar {
  position: absolute;
  top: 50%;
  right: 6px;
  display: grid;
  width: 22px;
  height: 22px;
  transform: translateY(-50%);
  place-items: center;
  border: none;
  border-radius: 50%;
  background: none;
  color: #91919f;
  font-size: 1rem;
  cursor: pointer;
}

.buscaLimpar:hover {
  color: #7a0f1a;
}

.filtroCurso {
  margin-top: 14px;
}

.rotuloCurso {
  color: #737384;
  font-size: 0.65rem;
  font-weight: 800;
  letter-spacing: 0.08em;
}

.chipsCursos {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 5px;
  max-height: 112px;
  margin-top: 8px;
  overflow-y: auto;
}

.chipCurso {
  min-width: 0;
  overflow: hidden;
  padding: 5px 8px;
  border: 1px solid rgba(122, 15, 26, 0.14);
  border-radius: 999px;
  background: #fdfaf4;
  color: #737384;
  font-size: 0.65rem;
  cursor: pointer;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.chipCurso:hover,
.chipCurso.ativo {
  border-color: #9e1f2e;
  background: #9e1f2e;
  color: #ffffff;
}

.semResultadoCurso {
  margin: 4px 0;
  color: #91919f;
  font-size: 0.7rem;
}

.estadosLista {
  margin: 0;
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
  flex-shrink: 0;
}

.universidadeCidade {
  overflow: hidden;
  color: #a1a1aa;
  font-size: 0.68rem;
  text-align: right;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.semResultados {
  padding: 16px 4px;
  color: #91919f;
  font-size: 0.78rem;
  text-align: center;
}

.botaoTogglePainel {
  display: none;
}

.overlayPainel {
  display: none;
}

/* === RESPONSIVO === */
@media (max-width: 900px) {
  .mapaInformacoes {
    width: 320px;
  }
}

@media (max-width: 700px) {
  .botaoTogglePainel {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    position: fixed;
    bottom: 20px;
    right: 20px;
    z-index: 999;
    width: 52px;
    height: 52px;
    border-radius: 50%;
    background: #7a0f1a;
    border: none;
    color: #ffffff;
    box-shadow: 0 8px 24px rgba(122, 15, 26, 0.3);
    cursor: pointer;
  }

  .botaoTogglePainel:hover {
    background: #9e1f2e;
  }

  .mapaInformacoes {
    top: 0;
    bottom: 0;
    left: auto;
    right: 0;
    width: 320px;
    max-width: 85vw;
    height: 100%;
    border-radius: 0;
    border-left: 1px solid rgba(28, 28, 34, 0.1);
    border-bottom: none;
    border-top: none;
    transform: translateX(100%);
    box-shadow: -12px 0 28px rgba(28, 28, 34, 0.15);
  }

  .mapaInformacoes.aberto {
    transform: translateX(0);
  }

  .overlayPainel {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 998;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
  }
}

@media (max-width: 480px) {
  .mapaInformacoes {
    width: 100%;
    max-width: 100%;
  }
}
</style>
