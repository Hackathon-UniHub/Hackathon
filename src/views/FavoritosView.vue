<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { RouterLink } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritosStore } from '@/stores/favoritos'
import { filtrarFavoritosPorTexto } from '@/utils/favoritosUtils'

const favoritosStore = useFavoritosStore()
const authStore = useAuthStore()
const busca = ref('')

function carregarFavoritos() {
  if (!authStore.loading) favoritosStore.carregarFavoritos()
}

onMounted(carregarFavoritos)
watch(() => authStore.loading, carregarFavoritos)

const favoritosFiltrados = computed(() =>
  filtrarFavoritosPorTexto(favoritosStore.favoritos, busca.value),
)
const quantidadeFavoritos = computed(() => favoritosStore.idsFavoritos.length)
const nomeUsuario = computed(
  () =>
    authStore.user?.user_metadata?.full_name || authStore.user?.email?.split('@')[0] || 'Estudante',
)

function remover(idUni) {
  favoritosStore.removerFavorito(idUni)
}
</script>

<template>
  <main class="favoritos-view">
    <div class="favoritos-container">
      <div class="favoritos-topo">
        <div>
          <p class="eyebrow">SUA LISTA</p>
          <h1>Universidades favoritas</h1>
          <p class="saudacao">
            Olá, <strong>{{ nomeUsuario }}</strong> — {{ quantidadeFavoritos }}
            {{ quantidadeFavoritos === 1 ? 'universidade salva' : 'universidades salvas' }}.
          </p>
        </div>
        <RouterLink to="/universidades" class="explorar-link">Explorar mais <span aria-hidden="true">→</span></RouterLink>
      </div>

      <div v-if="quantidadeFavoritos" class="barra-controles">
        <label class="campo-busca">
          <span class="icone-busca" aria-hidden="true">⌕</span>
          <span class="sr-only">Buscar nos favoritos</span>
          <input v-model="busca" type="search" placeholder="Buscar nos favoritos..." />
        </label>
        <span class="contador-lista">{{ favoritosFiltrados.length }} resultado{{ favoritosFiltrados.length === 1 ? '' : 's' }}</span>
      </div>

      <div v-if="favoritosFiltrados.length" class="lista-favoritos">
        <article v-for="uni in favoritosFiltrados" :key="uni.id" class="favorito-card">
          <div class="card-topo">
            <span class="sigla">{{ uni.sigla || uni.nome.slice(0, 3) }}</span>
            <button class="remover" type="button" :aria-label="`Remover ${uni.nome} dos favoritos`" @click="remover(uni.id)">
              <span aria-hidden="true">♥</span>
            </button>
          </div>
          <h2>{{ uni.nome }}</h2>
          <p class="localizacao">⌖ {{ uni.municipio }}, {{ uni.uf }}</p>
          <div class="card-rodape">
            <span v-if="uni.categoria" class="tag">{{ uni.categoria }}</span>
            <RouterLink :to="{ name: 'universidade', params: { id: uni.id } }" class="detalhes">Ver detalhes <span aria-hidden="true">↗</span></RouterLink>
          </div>
        </article>
      </div>

      <div v-else class="estado-vazio">
        <div class="icone-vazio" aria-hidden="true">♡</div>
        <h2>{{ busca ? 'Nenhuma universidade encontrada' : 'Nenhum favorito ainda' }}</h2>
        <p>{{ busca ? 'Tente buscar pelo nome ou limpe o filtro.' : 'Toque no coração nos cards ou no perfil da universidade para salvar aqui.' }}</p>
        <button v-if="busca" class="botao-secundario" type="button" @click="busca = ''">Limpar busca</button>
        <RouterLink v-else to="/universidades" class="botao-primario">Explorar universidades</RouterLink>
      </div>
    </div>
  </main>
</template>

<style scoped>
.favoritos-view {
  min-height: calc(100vh - 76px);
  padding: 3.5rem 1.5rem 5rem;
  background: linear-gradient(180deg, var(--cream-50) 0%, #fffaf3 100%);
  color: var(--ink-900);
}

.favoritos-container { width: min(1000px, 100%); margin: 0 auto; }
.favoritos-topo { display: flex; align-items: flex-end; justify-content: space-between; gap: 2rem; margin-bottom: 2rem; }
.eyebrow { margin: 0 0 0.4rem; color: var(--brand-600); font-size: 0.7rem; font-weight: 800; letter-spacing: 0.12em; }
h1 { margin: 0; font-size: clamp(2rem, 4vw, 3rem); letter-spacing: -0.04em; line-height: 1.05; }
.saudacao { margin-top: 0.7rem; color: var(--ink-600); font-size: 0.9rem; }
.explorar-link { color: var(--brand-700); font-size: 0.85rem; font-weight: 800; white-space: nowrap; }
.barra-controles { display: flex; align-items: center; justify-content: space-between; gap: 1rem; margin-bottom: 1.25rem; }
.campo-busca { display: flex; align-items: center; width: min(100%, 380px); min-height: 44px; padding: 0 0.9rem; border: 1px solid rgba(28, 28, 34, 0.12); border-radius: 10px; background: rgba(255, 255, 255, 0.8); }
.icone-busca { margin-right: 0.5rem; color: var(--ink-500); font-size: 1.25rem; }
.campo-busca input { width: 100%; border: 0; outline: 0; background: transparent; color: var(--ink-900); font: inherit; font-size: 0.85rem; }
.contador-lista { color: var(--ink-500); font-size: 0.8rem; }
.lista-favoritos { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); gap: 1rem; }
.favorito-card { display: flex; min-height: 215px; flex-direction: column; padding: 1.1rem; border: 1px solid rgba(28, 28, 34, 0.08); border-radius: 14px; background: rgba(255, 255, 255, 0.9); box-shadow: 0 10px 26px rgba(28, 28, 34, 0.05); }
.card-topo, .card-rodape { display: flex; align-items: center; justify-content: space-between; gap: 0.75rem; }
.sigla { display: inline-flex; align-items: center; justify-content: center; min-width: 40px; height: 34px; padding: 0 0.5rem; border-radius: 8px; background: var(--brand-700); color: var(--white); font-size: 0.72rem; font-weight: 800; }
.remover { width: 34px; height: 34px; border: 1px solid var(--brand-100); border-radius: 50%; background: var(--brand-50); color: var(--brand-600); cursor: pointer; }
.favorito-card h2 { margin: 1.2rem 0 0.45rem; font-size: 1rem; line-height: 1.35; }
.localizacao { margin: 0; color: var(--ink-500); font-size: 0.8rem; }
.card-rodape { margin-top: auto; padding-top: 1.1rem; border-top: 1px solid rgba(28, 28, 34, 0.07); }
.tag { padding: 0.25rem 0.45rem; border-radius: 4px; background: var(--cream-100); color: var(--ink-600); font-size: 0.68rem; }
.detalhes { color: var(--brand-700); font-size: 0.78rem; font-weight: 800; }
.estado-vazio { display: flex; min-height: 250px; align-items: center; justify-content: center; flex-direction: column; padding: 2rem; border: 1px dashed rgba(28, 28, 34, 0.15); border-radius: 16px; background: rgba(255, 255, 255, 0.55); text-align: center; }
.icone-vazio { display: grid; width: 48px; height: 48px; place-items: center; margin-bottom: 1rem; border-radius: 12px; background: var(--cream-200); color: var(--brand-600); font-size: 1.8rem; }
.estado-vazio h2 { font-size: 1.05rem; }
.estado-vazio p { max-width: 360px; margin: 0.5rem 0 1.2rem; color: var(--ink-500); font-size: 0.8rem; }
.botao-primario, .botao-secundario { display: inline-flex; min-height: 40px; align-items: center; justify-content: center; padding: 0 1rem; border-radius: 999px; font-size: 0.8rem; font-weight: 800; cursor: pointer; }
.botao-primario { background: var(--brand-700); color: var(--white); }
.botao-secundario { border: 1px solid var(--brand-200); background: var(--white); color: var(--brand-700); }
.sr-only { position: absolute; width: 1px; height: 1px; padding: 0; overflow: hidden; clip: rect(0, 0, 0, 0); white-space: nowrap; border: 0; }

@media (max-width: 600px) {
  .favoritos-view { padding-top: 2.5rem; }
  .favoritos-topo, .barra-controles { align-items: flex-start; flex-direction: column; }
  .explorar-link, .campo-busca { width: 100%; }
}
</style>
*** End Patch
