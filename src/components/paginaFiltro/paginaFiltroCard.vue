<script setup>
defineProps(['id', 'nome', 'sigla', 'municipio', 'uf', 'categoria', 'situacao', 'site', 'rating'])
</script>

<template>
  <div class="card">
    <h2 class="nome">{{ nome }}</h2>
    <!--<a v-if="site" :href="site" target="_blank">Ver site</a>-->
    <p>Nota: {{ rating }}</p>
    <p>{{ municipio }} - {{ uf }}</p>
    <button class="botao" @click="Favoritar">Favoritar</button>
  </div>
</template>

<style scoped>
.card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(18, 18, 22, 0.05);
  border: 1px solid #eeeef0; /* ink-100 */
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  transition: transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease;
}

.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(122, 15, 26, 0.08);
  border-color: #f0cdd0;
}

.nome {
  font-size: 1.1rem;
  font-weight: 700;
  color: #1c1c22;
  margin: 0;
  line-height: 1.4;
}

.card p {
  font-size: 0.9rem;
  color: #5d5d6b;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 0.3rem;
}

.card .botao {
  background-color: #7A0F1A;
  color: #ffffff;
  border: none;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  align-self: flex-start;
  transition: background-color 0.2s ease, transform 0.1s ease;
}

.card .botao:hover {
  background-color: #9e1f2e; 
}

.card .botao:active {
  transform: scale(0.98);
}
</style>
