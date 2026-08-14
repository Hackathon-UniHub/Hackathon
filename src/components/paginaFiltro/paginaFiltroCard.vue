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
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.25rem;
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin: 0; /* Remove a margem de 18vw que estava quebrando o layout */
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.nome {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a1a;
  margin: 0;
  line-height: 1.35;
}

.card p {
  font-size: 0.9rem;
  color: #666666;
  margin: 0;
}

.card .botao {
  background-color: #651c1f;
  color: #ffffff;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  align-self: flex-start;
  transition: opacity 0.2s;
}

.card .botao:hover {
  opacity: 0.9;
}
</style>
