<script setup>
defineProps(['id', 'nome', 'sigla', 'municipio', 'uf', 'categoria', 'situacao', 'site', 'rating'])
</script>

<template>
  <div class="card">
    <h2 class="nome">{{ nome }}</h2>
    <p>Nota: {{ rating }}</p>
    <p>{{ municipio }} - {{ uf }}</p>
    <div class="botoes">
      <button class="botao" @click="Favoritar">Favoritar</button>
      <RouterLink class="botao" :to="{ name: 'universidade', params: { id } }">
        Pagina da universidade
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.botoes {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.card {
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: 0 4px 16px rgba(18, 18, 22, 0.05);
  border: 1px solid #eeeef0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 1rem;
  margin: 0;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;
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
  background-color: #7a0f1a;
  color: #ffffff;
  border: none;
  padding: 0.55rem 1.1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.85rem;
  font-family: inherit;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  text-decoration: none;
  line-height: 1;
  transition:
    background-color 0.2s ease,
    transform 0.1s ease;
}

.card .botao:hover {
  background-color: #9e1f2e;
}

.card .botao:active {
  transform: scale(0.98);
}
</style>
