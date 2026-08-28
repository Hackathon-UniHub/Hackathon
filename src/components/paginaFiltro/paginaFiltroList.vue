 <script setup>
import { ref, computed } from 'vue'
import paginaFiltroCard from './paginaFiltroCard.vue'
import notasUniversidades from '@/data/notasUniversidades.js'
import {
  getEstados,
  getRatings,
  getUniversidadesFiltradas,
  alternarEstado,
  alternarRating,
} from '@/utils/filtroUtils.js'

const estadoAtivo = ref('')
const ratingAtivo = ref('Todas')
const pesquisa = ref('')

const estados = getEstados()
const ratings = getRatings()

const rankingUniversidades = computed(() => {
  return [...notasUniversidades]
    .filter((universidade) => Number.isFinite(Number(universidade.Nota)))
    .sort((primeira, segunda) => Number(segunda.Nota) - Number(primeira.Nota))
    .slice(0, 5)
})

const universidades = computed(() =>
  getUniversidadesFiltradas({
    estadoAtivo: estadoAtivo.value,
    pesquisa: pesquisa.value,
    ratingAtivo: ratingAtivo.value,
  }),
)

function selecionarEstado(uf) {
  const proximoEstado = alternarEstado(estadoAtivo.value, uf)
  estadoAtivo.value = proximoEstado.estadoAtivo
  pesquisa.value = proximoEstado.pesquisa
}

function selecionarRating(r) {
  const proximoRating = alternarRating(ratingAtivo.value, r)
  ratingAtivo.value = proximoRating.ratingAtivo
  pesquisa.value = proximoRating.pesquisa
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
        <p>Ranking baseado nas notas do Ranking Universitário Folha (RUF), da Folha de S.Paulo/UOL.</p>

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
                @click="selecionarEstado(uf)"
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
                @click="selecionarRating('Todas')"
              >
                Todas
              </button>
              <button
                class="botao"
                v-for="r in ratings"
                :key="r"
                :class="{ ativo: ratingAtivo === r }"
                @click="selecionarRating(r)"
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
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

.paginaFiltro {
  min-height: 100vh;
  background: #fffcf7;
  padding: 3rem 1.5rem;
  color: #1c1c22;
}

h1 {
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  font-weight: 800;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #7a0f1a;
}

.colorUm {
  color: #58141c;
}

.containerQuatro,
.pesquisa,
.divisao {
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
  border: 1px solid #eeeef0;
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
  color: #5d5d6b;
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
  background: linear-gradient(135deg, #9e1f2e, #7a0f1a);
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

.pesquisa {
  background: linear-gradient(135deg, #9e1f2e, #7a0f1a);
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
  transition: 0.2s;
}

.input input::placeholder {
  color: #ffffff99;
}

.input input:focus {
  border-color: #fff;
  background: #ffffff2e;
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
  border: 1px solid #eeeef0;
}

.lateralEstados .pesquisa {
  background: 0 0;
  padding: 0;
  box-shadow: none;
  margin: 0;
  width: 100%;
}

.lateralEstados .subtitulo {
  color: #91919f;
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
  background: #f7f7f8;
  border: 1px solid #eeeef0;
  color: #5d5d6b;
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: 0.2s;
}

.botoesEstados .botao:hover {
  background: #f9e8e9;
  color: #7a0f1a;
  border-color: #f0cdd0;
}

.botoesEstados .botao.ativo {
  background: #7a0f1a;
  color: #fff;
  border-color: #7a0f1a;
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
