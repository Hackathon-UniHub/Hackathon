<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import ComponenteMapa from '@/components/ComponenteMapa.vue'
import universidades from '@/data/universidades.js'
import { coordenadasMapa } from '@/data/coordenadasMapa.js'
import {
  agruparUniversidadesPorEstado,
  alternarEstado,
  criarManipuladorAberturaUniversidade,
  estadoEstaAberto,
  filtrarUniversidades,
  selecionarUniversidade,
} from '@/data/mapaUtils.js'

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

const universidadesFiltradas = computed(() => filtrarUniversidades(universidadesNoMapa, busca.value))

const universidadesPorEstado = computed(() =>
  agruparUniversidadesPorEstado(universidadesFiltradas.value),
)
const aoAbrirUniversidade = criarManipuladorAberturaUniversidade(router)

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
      <div class="mapaInformacoesCabecalho">
        <RouterLink class="voltar" to="/">← Voltar</RouterLink>

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
          Nenhuma universidade encontrada para "{{ busca }}".
        </p>
      </div>
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
  display: flex;
  flex-direction: column;
  width: 310px;
  max-height: 600px;
  overflow: hidden;
  border: 1px solid rgba(28, 28, 34, 0.1);
  border-radius: 16px;
  background: #ffffff;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.12);
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
  color: #737384;
  font-size: 0.85rem;
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

@media (max-width: 700px) {
  .mapaInformacoes {
    top: auto;
    bottom: 16px;
    left: 16px;
    right: 16px;
    width: auto;
    max-height: 50%;
  }
}
</style>