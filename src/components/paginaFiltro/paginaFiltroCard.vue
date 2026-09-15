<script setup>
import { computed } from 'vue'
import { HugeiconsIcon } from '@hugeicons/vue'
import { HeartIcon } from '@hugeicons/core-free-icons'
import { useFavoritosStore } from '@/stores/favoritos'

const props = defineProps([
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
  'cursoDestaque',
])

const favoritosStore = useFavoritosStore()

const favorito = computed(() => favoritosStore.isFavorito(Number(props.id)))

function alternarFavorito() {
  if (favorito.value) {
    favoritosStore.removerFavorito(Number(props.id))
  } else {
    favoritosStore.adicionarFavorito(Number(props.id))
  }
}
</script>

<template>
  <div class="card">
    <div class="topo">
      <span
        class="categoria"
        :class="categoria?.toLowerCase() === 'publica' ? 'publica' : 'privada'"
      >
        {{ categoria }}
      </span>
      <span class="nota" v-if="rating">Nota {{ rating }}</span>
    </div>

    <h2 class="nome">{{ nome }}</h2>
    <p class="local">{{ municipio }} - {{ uf }}</p>

    <p class="destaque" v-if="cursoDestaque">
      <strong>{{ cursoDestaque.nome }}</strong>
      <span v-if="cursoDestaque.nota"> · Corte ENEM: {{ cursoDestaque.nota }}</span>
    </p>

    <p class="alunos" v-if="quantidade_alunos">{{ quantidade_alunos }}</p>

    <div class="rodape">
      <button
        class="favoritar"
        type="button"
        :aria-label="favorito ? 'Remover dos favoritos' : 'Adicionar aos favoritos'"
        @click="alternarFavorito"
      >
        <HugeiconsIcon
          :icon="HeartIcon"
          :size="24"
          :color="favorito ? 'var(--vermelho)' : 'currentColor'"
          :stroke-width="1.5"
          :class="{ favoritoAtivo: favorito }"
          aria-hidden="true"
        />
      </button>
      <RouterLink class="botao" :to="{ name: 'universidade', params: { id } }">
        Página da universidade
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.card {
  --vermelho: #7a0f1a;
  --vermelho-escuro: #9e1f2e;
  --borda: #eeeef0;
  --texto: #5d5d6b;

  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 1.1rem 1.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  transition: 0.15s;
}

.card:hover {
  border-color: #f0cdd0;
  box-shadow: 0 6px 18px rgba(122, 15, 26, 0.08);
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.categoria {
  font-size: 0.75rem;
  font-weight: 600;
}
.categoria.publica {
  color: #4c4c57;
}
.categoria.privada {
  color: var(--vermelho);
}

.nota {
  font-size: 0.78rem;
  font-weight: 600;
  color: var(--vermelho);
}

.nome {
  font-size: 1.05rem;
  font-weight: 700;
  color: #1c1c22;
  margin: 0;
  line-height: 1.35;
}

.local {
  font-size: 0.85rem;
  color: var(--texto);
  margin: 0;
}

.destaque {
  margin: 0;
  font-size: 0.85rem;
  color: var(--vermelho);
}
.destaque span {
  color: var(--texto);
  font-weight: 400;
}

.alunos {
  font-size: 0.82rem;
  color: var(--texto);
  margin: 0;
}

.rodape {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  margin-top: 0.3rem;
}

.favoritar {
  border: none;
  background: transparent;
  cursor: pointer;
  padding: 0;
  display: flex;
  color: var(--texto);
  transition: color 0.15s ease, transform 0.15s ease;
}

.favoritar:hover {
  color: var(--vermelho);
  transform: scale(1.06);
}

.favoritoAtivo {
  color: var(--vermelho);
}

.botao {
  background: var(--vermelho);
  color: #fff;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.82rem;
  text-decoration: none;
  transition: 0.15s;
}
.botao:hover {
  background: var(--vermelho-escuro);
}
</style>
