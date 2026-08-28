<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { supabase } from '@/services/supabase' 
import { useAuthStore } from '@/stores/auth'
import { universidades } from '@/data/universidades'

const authStore = useAuthStore()

const favoritos = ref([])
const carregando = ref(true)

const estaAutenticado = computed(() => !!authStore.user)
const nomeUsuario = computed(() => authStore.user?.user_metadata?.full_name || authStore.user?.email?.split('@')[0] || 'Estudante')
const quantidadeFavoritos = computed(() => favoritos.value.length)

async function carregarFavoritos() {
  carregando.value = true

  let userId = authStore.user?.id

  if (!userId) {
    const { data: { session } } = await supabase.auth.getSession()
    userId = session?.user?.id
  }

  if (!userId) {
    favoritos.value = []
    carregando.value = false
    return
  }

  const { data, error } = await supabase
    .from('favoritos')
    .select('id_uni')
    .eq('id_user', userId)

  if (error) {
    console.error('Erro ao buscar favoritos:', error.message)
    carregando.value = false
    return
  }

  const idsSalvos = data.map(item => item.id_uni)
  favoritos.value = universidades.filter(uni => idsSalvos.includes(uni.id))

  carregando.value = false
}


onMounted(() => {
  carregarFavoritos()

  supabase.auth.onAuthStateChange((_event, session) => {
    if (session?.user) {
      authStore.user = session.user
    } else {
      authStore.user = null
    }
    carregarFavoritos()
  })
})

watch(estaAutenticado, () => {
  carregarFavoritos()
})
</script>

<template>
  <div class="paginaFundo">
    <div class="container">

      <div v-if="!estaAutenticado" class="estadoCaixa">
        <div class="iconeCoracao">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7a0f1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
        </div>
        <h2>Seus favoritos</h2>
        <p class="subtitulo">Entre na sua conta para ver e gerenciar as universidades que você favoritou.</p>
        <div class="acoesCentradas">
          <RouterLink to="/login" class="botaoEntrar">Entrar</RouterLink>
          <RouterLink to="/create-account" class="botaoCriarConta">Criar conta</RouterLink>
        </div>
      </div>

      <template v-else>
        <div class="cabecalhoSecao">
          <div>
            <span class="tagLista">SUA LISTA</span>
            <h1>Universidades favoritas</h1>
            <p class="saudacao">Olá, <strong>{{ nomeUsuario }}</strong> — {{ quantidadeFavoritos }} universidades salvas.</p>
          </div>
          <RouterLink to="/universidades" class="linkExplorar">Explorar mais &rarr;</RouterLink>
        </div>

        <div v-if="carregando" class="carregando">
          <p>Carregando favoritos...</p>
        </div>

        <div v-else-if="favoritos.length === 0" class="caixaVazia">
          <div class="iconeCoracao">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#7a0f1a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
          </div>
          <h3>Nenhum favorito ainda</h3>
          <p>Toque no coração nos cards ou no perfil da universidade para salvar aqui.</p>
          <RouterLink to="/universidades" class="botaoExplorar">Explorar universidades</RouterLink>
        </div>

        <div v-else class="gridUniversidades">
          <div v-for="uni in favoritos" :key="uni.id" class="cardUni">
            <h4>{{ uni.nome }}</h4>
            <p>{{ uni.municipio }} - {{ uni.uf }}</p>
            <RouterLink :to="`/universidade/${uni.id}`" class="linkDetalhes">Ver detalhes</RouterLink>
          </div>
        </div>
      </template>

    </div>
  </div>
</template>

<style scoped>
.paginaFundo {
  min-height: 80vh;
  background-color: #fffcf7;
  padding: 3rem 1.5rem;
  font-family: inherit;
  color: #1c1c22;
}

.container {
  max-width: 1000px;
  margin: 0 auto;
}

.tagLista {
  font-size: 0.75rem;
  font-weight: 700;
  color: #9e1f2e;
  letter-spacing: 1px;
}

.cabecalhoSecao {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 2rem;
}

.cabecalhoSecao h1 {
  font-size: 2rem;
  margin: 0.2rem 0;
}

.saudacao {
  color: #6e6e78;
  margin: 0;
}

.linkExplorar {
  color: #7a0f1a;
  text-decoration: none;
  font-weight: 600;
}

.estadoCaixa, .caixaVazia {
  background: #ffffff;
  border: 1px dashed #e2e2e8;
  border-radius: 16px;
  padding: 4rem 2rem;
  text-align: center;
  max-width: 600px;
  margin: 2rem auto;
}

.iconeCoracao {
  width: 56px;
  height: 56px;
  background-color: #f9e8e9;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 1.2rem;
}

.subtitulo {
  color: #6e6e78;
  font-size: 0.95rem;
  margin-bottom: 1.5rem;
}

.acoesCentradas {
  display: flex;
  gap: 1rem;
  justify-content: center;
}

.botaoEntrar, .botaoExplorar {
  background-color: #7a0f1a;
  color: #ffffff;
  padding: 0.75rem 1.8rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
  display: inline-block;
}

.botaoCriarConta {
  border: 1px solid #d0d0d8;
  color: #1c1c22;
  padding: 0.75rem 1.8rem;
  border-radius: 999px;
  text-decoration: none;
  font-weight: 600;
}

.gridUniversidades {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.cardUni {
  background: #ffffff;
  border: 1px solid #eeeef0;
  border-radius: 12px;
  padding: 1.5rem;
}
</style>
