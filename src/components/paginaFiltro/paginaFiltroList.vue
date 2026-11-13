<script setup>
import { computed, onMounted, ref } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import paginaFiltroCard from './paginaFiltroCard.vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { XIcon, FilterIcon } from '@hugeicons/core-free-icons'
import {
  carregarUniversidades,
  deletarUniversidade,
  getEstados,
  getCursos,
  getCursosFiltrados,
  getUniversidadesFiltradas,
  getRankingUniversidades,
} from '@/utils/filtroUtils.js'

const auth = useAuthStore()
const universidades = ref([])
const loading = ref(true)
const erro = ref('')

const estadoAtivo = ref('')
const ratingAtivo = ref('Todas')
const pesquisa = ref('')
const buscaCurso = ref('')
const painelFiltrosAberto = ref(false)

const ratings = [1, 2, 3, 4, 5]
const rankingUniversidades = getRankingUniversidades(5)

async function carregarDados() {
  loading.value = true
  erro.value = ''

  try {
    universidades.value = await carregarUniversidades()
  } catch (error) {
    console.log('Erro ao carregar universidades:', error)
    erro.value = 'Não foi possível carregar as universidades. Verifique se a API está rodando.'
  }

  loading.value = false
}

async function excluirUniversidade(id) {
  const confirmarExclusao = window.confirm('Deseja realmente excluir a universidade?')

  if (confirmarExclusao) {
    try {
      await deletarUniversidade(id)
      window.alert('Universidade excluída com sucesso!')
      await carregarDados()
    } catch (error) {
      console.log('Erro ao excluir universidade:', error)
      window.alert('Erro ao excluir a universidade. Verifique se a API está rodando.')
    }
  }
}

const estados = computed(() => getEstados(universidades.value))
const cursos = computed(() => getCursos(universidades.value))

const cursosFiltrados = computed(() => getCursosFiltrados(cursos.value, buscaCurso.value))

const universidadesFiltradas = computed(() =>
  getUniversidadesFiltradas(universidades.value, {
    estado: estadoAtivo.value,
    pesquisa: pesquisa.value,
    rating: ratingAtivo.value,
    curso: buscaCurso.value,
  }),
)

onMounted(carregarDados)
</script>

<template>
  <div class="paginaFiltro">
    <div>
      <h1>Tudo que você precisa em <span class="colorUm">um só lugar</span></h1>
    </div>

    <div class="containerQuatro">
      <div class="containerEsquerdo">
        <div class="containerDois">
          <h2>Busca inteligente por estado e curso</h2>
          <p>Filtre por estado, cidade, área de conhecimento e tipo de instituição.</p>
          <p>Encontre exatamente o que procura em segundos, sem complicação.</p>
        </div>
        <div class="containerUm">
          <div class="divUm">
            <h2>Totalmente gratuito</h2>
            <p>Acesso completo sem pagar nada.</p>
            <p>Crie sua conta e explore à vontade.</p>
          </div>
          <div class="divDois">
            <h2>Lista de favoritos</h2>
            <p>Salve instituições que gostou e</p>
            <p>compare lado a lado.</p>
          </div>
        </div>
      </div>
      <div class="containerTres">
        <h2>Rankings atualizados</h2>
        <p>
          Ranking baseado nas notas do Ranking Universitário Folha (RUF), da Folha de S.Paulo/UOL.
        </p>

        <div class="listaRanking">
          <div
            v-for="(universidade, indice) in rankingUniversidades"
            :key="universidade.Ranking"
            class="itemRanking"
          >
            <span class="posicaoRanking">{{ indice + 1 }}º</span>
            <span class="siglaRanking" :title="universidade.Universidade">
              {{ universidade.Universidade }}
            </span>
            <span class="notaRanking">{{ universidade.Nota.toFixed(2) }}</span>
          </div>
        </div>
      </div>
    </div>

    <div class="pesquisa">
      <div class="barraPesquisa">
        <div class="cabecalhoPesquisa">
          <span class="subtitulo">EXPLORAR</span>
          <h2>Encontre sua <span>universidade ideal</span></h2>
        </div>
        <div class="input">
          <input v-model="pesquisa" type="text" placeholder="Pesquise por universidades..." />
        </div>
      </div>
    </div>

    <div class="filtroCurso">
      <span class="rotulo">BUSCAR POR CURSO</span>
      <p class="dica">Digite ou clique num curso abaixo.</p>

      <input
        v-model="buscaCurso"
        type="text"
        class="buscaInput"
        placeholder='Ex: "Medicina", "Engenharia Civil", "Direito"...'
      />

      <div class="chips">
        <button
          class="chip"
          v-for="curso in cursosFiltrados"
          :key="curso"
          :class="{ ativo: buscaCurso === curso }"
          @click="buscaCurso = buscaCurso === curso ? '' : curso"
        >
          {{ curso }}
        </button>
        <p class="semResultado" v-if="!cursosFiltrados.length">Nenhum curso encontrado.</p>
      </div>

    </div>

    <button
      class="botaoToggleFiltros"
      type="button"
      @click="painelFiltrosAberto = !painelFiltrosAberto"
      :aria-expanded="painelFiltrosAberto"
      aria-label="Alternar filtros"
      aria-controls="lateralEstados"
    >
      <HugeiconsIcon v-if="!painelFiltrosAberto" :icon="FilterIcon" :size="22" color="currentColor" :stroke-width="2" />
      <HugeiconsIcon v-else :icon="XIcon" :size="22" color="currentColor" :stroke-width="2" />
      <span class="textoBotaoFiltros">Filtros</span>
    </button>

    <div class="divisao">
      <aside
        id="lateralEstados"
        class="lateralEstados"
        :class="{ aberta: painelFiltrosAberto }"
        aria-label="Filtros laterais"
      >
        <div class="pesquisa">
          <div class="filtroEstado">
            <span class="subtitulo">FILTRAR POR ESTADO</span>
            <div class="botoesEstados">
              <button
                class="botao"
                v-for="uf in estados"
                :key="uf"
                :class="{ ativo: estadoAtivo === uf }"
                @click="estadoAtivo = estadoAtivo === uf ? '' : uf"
              >
                {{ uf }}
              </button>
            </div>
          </div>

          <div class="filtroEstado" style="margin-top: 1rem">
            <span class="subtitulo">FILTRAR POR AVALIAÇÃO</span>
            <div class="botoesEstados">
              <button
                class="botao"
                :class="{ ativo: ratingAtivo === 'Todas' }"
                @click="ratingAtivo = 'Todas'"
              >
                Todas
              </button>
              <button
                class="botao"
                v-for="rating in ratings"
                :key="rating"
                :class="{ ativo: ratingAtivo === rating }"
                @click="ratingAtivo = ratingAtivo === rating ? 'Todas' : rating"
              >
                {{ rating }}
              </button>
            </div>
          </div>
        </div>
      </aside>

      <div class="cardsUniversidades">

        <p v-if="loading" class="mensagem">Carregando universidades...</p>

        <div v-else-if="erro" class="mensagem">
          <p class="alerta" role="alert">{{ erro }}</p>
          <button class="botaoTentar" type="button" @click="carregarDados">
            Tentar novamente
          </button>
        </div>

        <div v-else>
          <paginaFiltroCard
            v-for="universidade in universidadesFiltradas"
            :key="universidade.id"
            :universidade="universidade"
            @excluir="excluirUniversidade"
          />

          <RouterLink v-if="auth.isProfessor" class="cardAdicionar" :to="{ name: 'formulario' }">
            <span class="cardAdicionarMais" aria-hidden="true">+</span>
            <span class="cardAdicionarTexto">Adicionar universidade</span>
          </RouterLink>
        </div>
      </div>
    </div>

    <div
      v-if="painelFiltrosAberto"
      class="overlayFiltros"
      @click="painelFiltrosAberto = false"
      aria-hidden="true"
    ></div>
  </div>
</template>

<style scoped>
.paginaFiltro {
  --vermelho: #7a0f1a;
  --vermelho-escuro: #9e1f2e;
  --creme: #fffcf7;
  --creme-forte: #faf6ef;
  --borda: #eeeef0;
  --texto: #5d5d6b;
  --texto-fraco: #91919f;

  min-height: 100vh;
  background: var(--creme);
  padding: 3rem 1.5rem;
  color: #1c1c22;
}

h1 {
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
  color: var(--vermelho);
}

.colorUm {
  color: #58141c;
}

.containerQuatro,
.pesquisa,
.divisao,
.filtroCurso {
  width: 95%;
  max-width: 1180px;
  margin: 0 auto;
}

.containerQuatro {
  display: flex;
  gap: 20px;
  margin-bottom: 3rem;
}

.containerEsquerdo,
.containerUm {
  display: flex;
  gap: 20px;
}

.containerEsquerdo {
  flex: 2.2;
  flex-direction: column;
}

.containerUm {
  justify-content: space-between;
}

.containerDois,
.containerTres,
.divUm,
.divDois {
  padding: 2.2rem 1.2rem;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
}

.containerDois,
.divDois {
  background: #fff;
  box-shadow: 0 4px 20px #1212160d;
  border: 1px solid var(--borda);
}

.containerDois {
  padding: 2.8rem 2rem;
}

.containerDois h2,
.divDois h2 {
  color: #320102;
}

.containerDois p,
.divDois p {
  color: var(--texto);
  margin: 0;
}

.divUm {
  background: #58141c;
  color: #fff;
}

.divUm p {
  color: #f0cdd0;
  margin: 0;
}

.containerTres {
  background: var(--vermelho-escuro);
  color: #fff;
  padding: 2.8rem 2rem;
  justify-content: space-between;
  box-shadow: 0 8px 24px #7a0f1a26;
}

.containerTres p {
  color: #e3a3a8;
  margin: 0;
}

h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.6rem;
  color: inherit;
}

.containerDois h2,
.containerTres h2 {
  font-size: 1.5rem;
  margin-bottom: 0.8rem;
}

.listaRanking {
  display: grid;
  width: 100%;
  gap: 0.55rem;
  margin-top: 1.2rem;
}

.itemRanking {
  display: grid;
  grid-template-columns: 2rem 1fr auto;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
  padding: 0.45rem 0.6rem;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  text-align: left;
}

.posicaoRanking {
  color: #f0cdd0;
  font-weight: 700;
}

.siglaRanking {
  overflow: hidden;
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.notaRanking {
  color: #fff;
  font-size: 0.85rem;
  font-weight: 700;
}

.pesquisa {
  background: var(--vermelho);
  color: #fff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  margin-bottom: 2rem;
  box-shadow: 0 12px 32px #7a0f1a33;
}

.cabecalhoPesquisa h2 {
  font-size: 2rem;
  color: #fff;
  margin-top: 0.2rem;
}

.cabecalhoPesquisa span {
  color: #e3a3a8;
}

.subtitulo {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #e3a3a8;
  display: block;
}

.input input {
  width: 100%;
  padding: 1rem 1.5rem;
  background: #ffffff1f;
  border: 1px solid #ffffff33;
  border-radius: 12px;
  color: #fff;
  font-size: 1rem;
  outline: 0;
}

.input input::placeholder {
  color: #ffffff99;
}

.input input:focus {
  border-color: #fff;
  background: #ffffff2e;
}

.filtroCurso {
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 16px;
  padding: 1.5rem 1.6rem;
  box-shadow: 0 4px 20px #1212160d;
  margin-bottom: 2rem;
}

.filtroCurso .rotulo {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--vermelho-escuro);
}

.filtroCurso .dica {
  font-size: 0.82rem;
  color: var(--texto-fraco);
  margin: 0.2rem 0 1rem;
}

.buscaInput {
  width: 100%;
  padding: 0.8rem 1.1rem;
  border-radius: 10px;
  border: 1px solid var(--borda);
  background: var(--creme-forte);
  font-size: 0.9rem;
  outline: 0;
  box-sizing: border-box;
  margin-bottom: 1rem;
}

.buscaInput:focus {
  border-color: #d06f78;
  background: #fff;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  max-height: 200px;
  overflow-y: auto;
  padding: 4px;
  margin-bottom: 1.2rem;
}

.chip {
  background: var(--creme-forte);
  border: 1px solid var(--borda);
  color: var(--texto);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
}

.chip:hover {
  border-color: #f0cdd0;
  color: var(--vermelho);
}

.chip.ativo {
  background: var(--vermelho);
  color: #fff;
  border-color: var(--vermelho);
}

.semResultado {
  font-size: 0.85rem;
  color: var(--texto-fraco);
  margin: 0;
}

.divisao {
  display: flex;
  gap: 2rem;
  align-items: flex-start;
}

.lateralEstados {
  width: 280px;
  flex-shrink: 0;
  background: #fff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px #1212160d;
  border: 1px solid var(--borda);
}

.lateralEstados .pesquisa {
  background: 0 0;
  padding: 0;
  box-shadow: none;
  margin: 0;
  width: 100%;
}

.lateralEstados .subtitulo {
  color: var(--texto-fraco);
  margin-bottom: 0.8rem;
}

.filtroEstado {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.botoesEstados {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 8px;
}

.botoesEstados .botao {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  min-height: 36px;
  background: var(--creme-forte);
  border: 1px solid var(--borda);
  color: var(--texto);
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  cursor: pointer;
}

.botoesEstados .botao:hover {
  border-color: #f0cdd0;
  color: var(--vermelho);
}

.botoesEstados .botao.ativo {
  background: var(--vermelho);
  color: #fff;
  border-color: var(--vermelho);
  font-weight: 600;
}

.cardsUniversidades {
  flex: 1;
  max-height: 680px;
  overflow-y: auto;
  padding: 4px 8px 4px 4px;
}

.cardsUniversidades > div {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 420px));
  align-items: stretch;
  gap: 1.25rem;
}

@media (max-width: 700px) {
  .cardsUniversidades > div {
    grid-template-columns: 1fr;
  }
}

.botaoToggleFiltros {
  display: none;
}

.overlayFiltros {
  display: none;
}

@media (max-width: 1024px) {
  .containerQuatro {
    flex-direction: column;
  }

  .containerEsquerdo {
    flex-direction: row;
    flex-wrap: wrap;
  }

  .containerDois,
  .divUm,
  .divDois {
    flex: 1;
    min-width: 280px;
  }

  .containerTres {
    width: 100%;
    max-width: 100%;
  }
}

@media (max-width: 900px) {
  .divisao {
    flex-direction: column;
  }

  .lateralEstados {
    width: 100%;
    max-width: 100%;
    position: relative;
  }
}

@media (max-width: 768px) {
  .paginaFiltro {
    padding: 2rem 1rem;
  }

  .containerQuatro,
  .pesquisa,
  .divisao,
  .filtroCurso {
    width: 100%;
    max-width: 100%;
  }

  .containerEsquerdo {
    flex-direction: column;
  }

  .containerUm {
    flex-direction: column;
  }

  .filtroCurso {
    padding: 1.2rem;
  }

  .chips {
    max-height: 180px;
  }

  .botaoToggleFiltros {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    width: 100%;
    padding: 12px 16px;
    margin-bottom: 1rem;
    border: 1px solid var(--borda);
    border-radius: 12px;
    background: var(--creme-forte);
    color: var(--vermelho);
    font-weight: 700;
    font-size: 0.9rem;
    cursor: pointer;
    transition: all 0.2s ease;
  }

  .botaoToggleFiltros:hover {
    background: var(--vermelho);
    color: #fff;
    border-color: var(--vermelho);
  }

  .textoBotaoFiltros {
    display: inline;
  }

  .lateralEstados {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    width: 100%;
    max-width: 320px;
    height: 100vh;
    border-radius: 0;
    border-right: 1px solid var(--borda);
    box-shadow: 12px 0 28px rgba(28, 28, 34, 0.15);
    transform: translateX(-100%);
    transition: transform 0.3s ease;
    overflow-y: auto;
    padding: 1.5rem;
    padding-top: 6rem;
  }

  .lateralEstados.aberta {
    transform: translateX(0);
  }

  .overlayFiltros {
    display: block;
    position: fixed;
    inset: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    backdrop-filter: blur(2px);
  }

  .lateralEstados .pesquisa {
    background: 0 0;
    padding: 0;
    box-shadow: none;
    margin: 0;
    width: 100%;
  }

  .lateralEstados .subtitulo {
    color: var(--texto-fraco);
    margin-bottom: 0.8rem;
  }

  .botoesEstados {
    display: grid;
    grid-template-columns: repeat(4, minmax(0, 1fr));
    gap: 8px;
  }

  .botoesEstados .botao {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-height: 36px;
    background: var(--creme-forte);
    border: 1px solid var(--borda);
    color: var(--texto);
    padding: 0.4rem 0.85rem;
    border-radius: 20px;
    font-size: 0.85rem;
    cursor: pointer;
  }
}

@media (max-width: 480px) {
  .botoesEstados {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .h1 {
    font-size: clamp(1.8rem, 4vw, 2.5rem);
  }

  .cardsUniversidades > div {
    grid-template-columns: 1fr;
  }
}

.mensagem {
  text-align: center;
  color: var(--texto);
  padding: 2rem 1rem;
  margin: 0;
}

.alerta {
  background: #fdecee;
  border: 1px solid #f0cdd0;
  color: var(--vermelho);
  padding: 0.8rem 1rem;
  border-radius: 10px;
  font-size: 0.9rem;
  margin: 0 0 1rem;
}

.botaoTentar {
  background: var(--vermelho);
  color: #fff;
  border: none;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
}

.botaoTentar:hover {
  background: var(--vermelho-escuro);
}

.cardAdicionar {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  width: 80%;
  justify-self: center;
  align-self: center;
  min-height: 64px;
  padding: 0.6rem 1rem;
  background: var(--creme-forte);
  border: 2px solid var(--vermelho);
  border-radius: 12px;
  color: var(--vermelho);
  text-decoration: none;
  text-align: center;
  cursor: pointer;
  transition:
    background 0.15s ease,
    color 0.15s ease,
    box-shadow 0.15s ease;
}

.cardAdicionar:hover,
.cardAdicionar:focus-visible {
  background: var(--vermelho);
  color: #fff;
  box-shadow: 0 8px 22px rgba(122, 15, 26, 0.2);
  outline: 0;
}

.cardAdicionarMais {
  font-size: 1.8rem;
  line-height: 1;
  font-weight: 300;
}

.cardAdicionarTexto {
  font-size: 1rem;
  font-weight: 700;
}
</style>
