<script setup>

defineProps(['id', 'nome', 'sigla', 'municipio', 'uf', 'categoria', 'situacao', 'site', 'rating'])
</script>

<template>
  <div class="card">
      <h2 class="nome">{{ nome }}</h2>
      <!--<a v-if="site" :href="site" target="_blank">Ver site</a>-->
    <p>Nota: {{ rating }}</p>
    <p>{{ municipio }}</p>
    <button class="botao" @click="Favoritar">Favoritar</button>
  </div>
</template>

<style scoped>
  .card {
    display: flex;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    padding: 16px;
    margin-bottom: 16px;
    transition: transform 0.2s ease-in-out;
    margin: 2vw 18vw;
    gap: 4rem;
    font-size: 1.5rem;
  }
  .nome {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 8px;
  }
</style>
