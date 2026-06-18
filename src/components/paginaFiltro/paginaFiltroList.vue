<script setup>
import paginaFiltroCard from './paginaFiltroCard.vue'
import universidades from '@/data/universidades.js'
console.log(universidades)
</script>

<template>
  <h1>Tudo que você precisa em um só lugar</h1>
  <div class="lista-produtos">
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

<style scoped></style>
