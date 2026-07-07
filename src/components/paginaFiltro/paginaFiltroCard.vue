<script setup>

defineProps(['id', 'nome', 'sigla', 'municipio', 'uf', 'categoria', 'situacao', 'site', 'rating'])
</script>

<template>
  <div>
    <h2>{{ nome }}</h2>
    <p>{{ sigla }} — {{ municipio }}</p>
    <p>{{ categoria }}</p>
    <p>Nota: {{ rating }}</p>
    <a v-if="site" :href="site" target="_blank">Ver site</a>
  </div>
</template>

