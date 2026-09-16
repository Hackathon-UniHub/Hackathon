<script setup>
import { ref, computed } from 'vue'
import paginaFiltroCard from './paginaFiltroCard.vue'
import notasUniversidades from '@/data/notasUniversidades.js'
import {
  getEstados,
  getRatings,
  getCursos,
  getCursosFiltrados,
  getCursoDestaque,
  getRankingUniversidades,
  getUniversidadesFiltradas,
  selecionarEstado,
  selecionarRating,
  selecionarBuscaCurso,
  atualizarNotaEnem,
} from '@/utils/filtroUtils.js'

const estadoAtivo = ref('')
const ratingAtivo = ref('Todas')
const pesquisa = ref('')
const buscaCurso = ref('')
const notaEnem = ref('')

const estados = getEstados()
const ratings = getRatings()
const cursos = getCursos()
const rankingUniversidades = getRankingUniversidades(notasUniversidades, 5)

const cursosFiltrados = computed(() => getCursosFiltrados(cursos, buscaCurso.value))

const universidades = computed(() =>
  getUniversidadesFiltradas({
    estadoAtivo: estadoAtivo.value,
    pesquisa: pesquisa.value,
    ratingAtivo: ratingAtivo.value,
    buscaCurso: buscaCurso.value,
    notaEnem: notaEnem.value,
  }),
)

function onSelecionarEstado(uf) {
  selecionarEstado(estadoAtivo, pesquisa, uf)
}

function onSelecionarRating(rating) {
  selecionarRating(ratingAtivo, pesquisa, rating)
}

function onSelecionarBuscaCurso(curso) {
  selecionarBuscaCurso(buscaCurso, pesquisa, curso)
}

function onAtualizarNotaEnem(evento) {
  atualizarNotaEnem(notaEnem, evento)
}
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
          :class="{ ativo: buscaCurso.toLowerCase() === curso.toLowerCase() }"
          @click="onSelecionarBuscaCurso(curso)"
        >
          {{ curso }}
        </button>
        <p class="semResultado" v-if="!cursosFiltrados.length">Nenhum curso encontrado.</p>
      </div>

      <div class="notaEnem">
        <span class="rotulo">MÉDIA NO ENEM (0 a 1000)</span>
        <input
          type="number"
          min="0"
          max="1000"
          class="notaInput"
          :value="notaEnem"
          @input="onAtualizarNotaEnem($event)"
          placeholder="Ex: 650"
        />
        <p class="dica" v-if="notaEnem !== ''">Cursos com corte até {{ notaEnem }} pontos.</p>
      </div>
    </div>

    <div class="divisao">
      <div class="lateralEstados">
        <div class="pesquisa">
          <div class="filtroEstado">
            <span class="subtitulo">FILTRAR POR ESTADO</span>
            <div class="botoesEstados">
              <button
                class="botao"
                v-for="uf in estados"
                :key="uf"
                :class="{ ativo: estadoAtivo === uf }"
                @click="onSelecionarEstado(uf)"
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
                @click="onSelecionarRating('Todas')"
              >
                Todas
              </button>
              <button
                class="botao"
                v-for="r in ratings"
                :key="r"
                :class="{ ativo: ratingAtivo === r }"
                @click="onSelecionarRating(r)"
              >
                {{ r }}
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="cardsUniversidades">
        <div>
          <paginaFiltroCard
            v-for="universidade in universidades"
            :key="universidade.id"
            :id="universidade.id"
            :nome="universidade.nome"
            :sigla="universidade.sigla"
            :municipio="universidade.municipio"
            :uf="universidade.uf"
            :categoria="universidade.categoria_administrativa"
            :situacao="universidade.situacao"
            :site="universidade.site"
            :rating="universidade.igc"
            :quantidade_alunos="universidade.quantidade_alunos"
            :curso-destaque="getCursoDestaque(universidade.id, buscaCurso)"
          />
        </div>
      </div>
    </div>
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
  background: linear-gradient(135deg, var(--vermelho-escuro), var(--vermelho));
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
  background: linear-gradient(135deg, var(--vermelho-escuro), var(--vermelho));
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

.notaEnem .rotulo {
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  color: var(--vermelho-escuro);
  display: block;
  margin-bottom: 0.5rem;
}

.notaInput {
  max-width: 320px;
  width: 100%;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--borda);
  background: var(--creme-forte);
  font-size: 0.9rem;
  outline: 0;
}

.notaInput:focus {
  border-color: #d06f78;
  background: #fff;
}

.notaEnem .dica {
  font-size: 0.8rem;
  color: var(--vermelho);
  margin: 0.5rem 0 0;
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
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
</style>
