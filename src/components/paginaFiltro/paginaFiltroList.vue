<script setup>
import { ref, computed } from 'vue'
import paginaFiltroCard from './paginaFiltroCard.vue'
import { getEstados, filtrar } from '@/utils/filtroUtils.js'

const estadoAtivo = ref('')
const pesquisa = ref('')

const estados = getEstados()

const universidades = computed(() => filtrar(estadoAtivo.value, pesquisa.value))

function selecionarEstado(uf) {
  if (estadoAtivo.value === uf) {
    estadoAtivo.value = ''
    pesquisa.value = ''
  } else {
    estadoAtivo.value = uf
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
      <div class="cabecalhoPesquisa">
        <span class="subtitulo">EXPLORAR</span>
        <h2>Encontre sua <span>universidade ideal</span></h2>
      </div>

      <div class="input">
        <input
          v-model="pesquisa"
          type="text"
          placeholder="Pesquise por universidades..."
        />
      </div>
      <div class="filtroEstado">
        <span class="subtitulo">FILTRAR POR ESTADO</span>
        <div class="botoesEstados">
          <button
            v-for="uf in estados"
            :key="uf"
            :class="{ ativo: estadoAtivo === uf }"
            @click="selecionarEstado(uf)"
          >
            {{ uf }}
          </button>
        </div>
      </div>
    </div>



    <div v-if="estadoAtivo">
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
</template>

<style scoped>
.pesquisa {
  background-color: #651c1f;
  color: #ffffff;
  padding: 2.5rem 2rem;
  border-radius: 16px;
  width: 95%;
  max-width: 1180px;
  margin: 0 auto 2rem auto;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.cabecalhoPesquisa h2 {
  font-size: 2.2rem;
  font-weight: bold;
  color: #ffffff;
  margin: 0.2rem 0 0 0;
}

.cabecalhoPesquisa h2 span {
  color: #dfd89f;
}

.subtitulo {
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  color: #dfd89f;
  text-transform: uppercase;
  display: block;
}

.input input {
  width: 100%;
  padding: 1rem 1.5rem;
  background-color: rgba(0, 0, 0, 0.15);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  color: #ffffff;
  font-size: 1.1rem;
  outline: none;
  transition: border-color 0.3s;
}
.input input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
.input input:focus {
  border-color: #dfd89f;
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
.botoesEstados button {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: #ffffff;
  padding: 0.4rem 1rem;
  border-radius: 20px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: all 0.2s ease;
}
.botoesEstados button:hover {
  background-color: rgba(255, 255, 255, 0.15);
  border-color: #dfd89f;
}
.botoesEstados button.ativo {
  background-color: #dfd89f;
  color: #651c1f;
  border-color: #dfd89f;
  font-weight: bold;
}
.paginaFiltro {
  min-height: 100vh;
  width: 100%;
  background-color: #dfd89f;
  padding: 3rem 1.5rem;
}

h1 {
  font-size: clamp(2.2rem, 3.8vw, 3.2rem);
  font-weight: bold;
  text-align: center;
  margin-bottom: 2.5rem;
  color: #920205;
}

.colorUm {
  font-weight: bold;
  color: #640203;
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
  color: #320102;
  padding: 2.8rem 2rem;
  border-radius: 16px;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(50, 1, 2, 0.15);
}

.containerDois h2 {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
}

.containerDois p {
  font-size: 1.05rem;
  font-weight: bold;
  margin: 0;
}

.containerTres {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  background-color: #651C1F;
  color: #320102;
  padding: 2.8rem 2rem;
  border-radius: 16px;
  text-align: center;
  align-items: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.3), 0 6px 12px rgba(50, 1, 2, 0.2);
}

.containerTres h2 {
  font-size: 1.6rem;
  font-weight: bold;
  margin: 0 0 1rem 0;
  color: #FAF5D1;
}

.containerTres p {
  font-size: 1.05rem;
  font-weight: bold;
  color: #DFD89F;
  margin: 0;
}

.containerTres strong {
  font-size: 1.8rem;
  font-weight: bold;
  color: #FAF5D1;
}

.divUm {
  background-color: #920205;
  color: #ebe3ad;
  padding: 2.2rem 1.2rem;
  text-align: center;
  border-radius: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.28), 0 6px 12px rgba(50, 1, 2, 0.2);
}

.divUm h2 {
  font-size: 1.35rem;
  font-weight: bold;
  margin: 0 0 0.8rem 0;
}

.divUm p {
  font-size: 0.95rem;
  font-weight: bold;
  margin: 0;
}

.divDois {
  background-color: #ffffff;
  color: #320102;
  padding: 2.2rem 1.2rem;
  text-align: center;
  border-radius: 16px;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 16px 32px rgba(0, 0, 0, 0.25), 0 6px 12px rgba(50, 1, 2, 0.15);
}

.divDois h2 {
  font-size: 1.35rem;
  font-weight: bold;
  margin: 0 0 0.8rem 0;
}

.divDois p {
  font-size: 0.95rem;
  font-weight: bold;
  margin: 0;
}
</style>
