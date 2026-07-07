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

  <div>
    <button
      v-for="uf in estados"
      :key="uf"
      @click="selecionarEstado(uf)"
    >
      {{ uf }}
    </button>
  </div>

  <div v-if="estadoAtivo">
    <input
      v-model="pesquisa"
      type="text"
      placeholder="Pesquise por universidades..."
    />
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
</template>
