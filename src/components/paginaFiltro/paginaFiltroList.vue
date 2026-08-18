<script setup>
import { ref, computed } from 'vue'
import paginaFiltroCard from './paginaFiltroCard.vue'
import { getEstados, getRatings, filtrar } from '@/utils/filtroUtils.js'

const estadoAtivo = ref('')
const ratingAtivo = ref('Todas')
const pesquisa = ref('')

const estados = getEstados()
const ratings = getRatings()

const universidades = computed(() =>
  filtrar(
    estadoAtivo.value,
    pesquisa.value,
    ratingAtivo.value === 'Todas' ? '' : ratingAtivo.value,
  ),
)

function selecionarEstado(uf) {
  if (estadoAtivo.value === uf) {
    estadoAtivo.value = ''
    pesquisa.value = ''
  } else {
    estadoAtivo.value = uf
    pesquisa.value = ''
  }
}

function selecionarRating(r) {
  if (ratingAtivo.value === r) {
    ratingAtivo.value = 'Todas'
    pesquisa.value = ''
  } else {
    ratingAtivo.value = r
    pesquisa.value = ''
  }
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
        <p>Baseados nos principais índices nacionais: RUF, IGC, ENADE e Folha Universitária.</p>
        <strong>Top 100</strong>
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
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paginaFiltro {
  min-height: 100vh;
  width: 100%;
  background-color: #fffcf7;
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
  font-weight: 800;
  color: #58141c;
}

.containerQuatro {
  display: flex;
  justify-content: center;
  align-items: stretch;
  gap: 20px;
  width: 95%;
  max-width: 1180px;
  margin: 0 auto 3rem auto;
}

.containerEsquerdo {
  flex: 2.2;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.containerUm {
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  gap: 20px;
}

.containerDois {
  background-color: #ffffff;
  color: #1c1c22;
  padding: 2.8rem 2rem;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 20px rgba(18, 18, 22, 0.05);
  border: 1px solid #eeeef0;
}

.containerDois h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 0.8rem 0;
  color: #1c1c22;
}

.containerDois p {
  font-size: 1rem;
  color: #5d5d6b;
  margin: 0;
}

.containerTres {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #7a0f1a;
  color: #ffffff;
  padding: 2.8rem 2rem;
  border-radius: 16px;
  text-align: center;
  align-items: center;
  box-shadow: 0 8px 24px rgba(122, 15, 26, 0.15);
}

.containerTres h2 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0 0 1rem 0;
  color: #ffffff;
}

.containerTres p {
  font-size: 1rem;
  color: #e3a3a8;
  margin: 0;
}

.containerTres strong {
  font-size: 1.8rem;
  font-weight: 700;
  color: #fffcf7;
}

.divUm {
  background-color: #58141c;
  color: #ffffff;
  padding: 2.2rem 1.2rem;
  text-align: center;
  border-radius: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.divUm h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
  color: #ffffff;
}

.divUm p {
  font-size: 0.95rem;
  color: #f0cdd0;
  margin: 0;
}

.divDois {
  background-color: #ffffff;
  color: #1c1c22;
  padding: 2.2rem 1.2rem;
  text-align: center;
  border-radius: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 4px 20px rgba(18, 18, 22, 0.05);
  border: 1px solid #eeeef0;
}

.divDois h2 {
  font-size: 1.3rem;
  font-weight: 700;
  margin: 0 0 0.6rem 0;
  color: #1c1c22;
}

.divDois p {
  font-size: 0.95rem;
  color: #5d5d6b;
  margin: 0;
}

.pesquisa {
  background-color: #7a0f1a;
  color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  width: 95%;
  max-width: 1180px;
  margin: 0 auto 2rem auto;
  box-shadow: 0 12px 32px rgba(122, 15, 26, 0.2);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cabecalhoPesquisa h2 {
  font-size: 2rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0.2rem 0 0 0;
}

.cabecalhoPesquisa h2 span {
  color: #e3a3a8;
}

.subtitulo {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #e3a3a8;
  text-transform: uppercase;
  display: block;
}

.input input {
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: rgba(255, 255, 255, 0.12);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1rem;
  outline: none;
  transition: all 0.2s ease;
}

.input input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input input:focus {
  border-color: #ffffff;
  background-color: rgba(255, 255, 255, 0.18);
}

.divisao {
  display: flex;
  gap: 2rem;
  width: 95%;
  max-width: 1180px;
  margin: 0 auto;
  align-items: flex-start;
}

.lateralEstados {
  width: 280px;
  flex-shrink: 0;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(18, 18, 22, 0.05);
  border: 1px solid #eeeef0;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.lateralEstados .pesquisa {
  background-color: transparent;
  padding: 0;
  box-shadow: none;
  margin: 0;
  width: 100%;
}

.lateralEstados .subtitulo {
  color: #91919f;
  font-size: 0.75rem;
  font-weight: 700;
  margin-bottom: 0.8rem;
}

.filtroEstado {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.botoesEstados {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.botoesEstados .botao {
  background-color: #f7f7f8;
  border: 1px solid #eeeef0;
  color: #5d5d6b;
  padding: 0.4rem 0.85rem;
  border-radius: 20px;
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
}

.botoesEstados .botao:hover {
  background-color: #f9e8e9;
  color: #7a0f1a;
  border-color: #f0cdd0;
}

.botoesEstados .botao.ativo {
  background-color: #7a0f1a;
  color: #ffffff;
  border-color: #7a0f1a;
  font-weight: 600;
}

.cardsUniversidades {
  flex: 1;
}

.cardsUniversidades > div {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.25rem;
}
</style>
