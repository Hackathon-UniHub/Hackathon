<script setup>
import { ref } from 'vue'

defineProps([
  'id',
  'nome',
  'sigla',
  'municipio',
  'uf',
  'categoria',
  'situacao',
  'site',
  'rating',
  'quantidade_alunos',
])

const favorito = ref(false)
</script>

<template>
  <div class="card">
    <div class="cardTopo">
      <div class="logoCard">{{ sigla ? sigla.slice(0, 3) : nome.slice(0, 3) }}</div>
      <span
        class="Categoria"
        :class="categoria?.toLowerCase() === 'publica' ? 'publica' : 'privada'"
      >
        {{ categoria }}
      </span>
    </div>

    <h2 class="nome">{{ nome }}</h2>
    <p>
      Nota: {{ rating }} <img class="img" src="/src/components/icons/estrela.svg" alt="rating" />
    </p>
    <p>
      {{ municipio }} - {{ uf }}
      <img class="imgUm" src="/src/components/icons/pingo.svg" alt="localização" />
    </p>
    <p v-if="quantidade_alunos" class="alunos">{{ quantidade_alunos }}</p>

    <div class="botoes">
      <button class="botaoCor" type="button" @click="favorito = !favorito">
        <img
          v-if="!favorito"
          class="imgDois"
          src="/src/components/icons/favoritoVazio.svg"
          alt="Favoritar"
        />
        <img
          v-else
          class="imgTres"
          src="/src/components/icons/favoritoCheio.svg"
          alt="Favoritado"
        />
      </button>
      <RouterLink class="botao" :to="{ name: 'universidade', params: { id } }">
        Página da universidade
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.imgTres {
  border-radius: 35px;
  width: 38px;
  height: 38px;
}
.imgDois {
  border-radius: 40px;
  width: 40px;
  height: 40px;
}
.imgUm {
  width: 16px;
  height: 16px;
}
.img {
  width: 20px;
  height: 20px;
}
.cardTopo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logoCard {
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: #7a0f1a;
  color: #fff;
  font-size: 0.7rem;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.Categoria {
  font-size: 0.7rem;
  font-weight: 600;
  padding: 0.2rem 0.55rem;
  border-radius: 999px;
}
.Categoria.publica {
  background-color: #e2f2e8;
  color: #1f8a4c;
}
.Categoria.privada {
  background-color: #f7e8d8;
  color: #a86a1f;
}

.alunos {
  font-size: 0.85rem;
  color: #7a7a86;
}

.botaoCor {
  color: #ffffff;
  border: none;
}
.botaoCor:hover {
  background-color: #f4e3e4;
}
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
