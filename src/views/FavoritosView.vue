<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { supabase } from '@/services/supabase'
import universidades from '@/data/universidades.js'

const authStore = useAuthStore()
const favoritos = ref([])
const carregando = ref(true)
const erro = ref('')

const nomeUsuario = computed(
  () =>
    authStore.user?.user_metadata?.full_name ||
    authStore.user?.email?.split('@')[0] ||
    'Estudante',
)

async function carregarFavoritos() {
  if (!authStore.user) return

  carregando.value = true
  erro.value = ''

  const { data, error } = await supabase
    .from('favoritos')
    .select('id_uni')
    .eq('id_user', authStore.user.id)

  if (error) {
    erro.value = 'Não foi possível carregar seus favoritos.'
  } else {
    const idsSalvos = data.map((item) => item.id_uni)
    favoritos.value = universidades.filter((universidade) => idsSalvos.includes(universidade.id))
  }

  carregando.value = false
}

onMounted(carregarFavoritos)
</script>

<template>
  <section class="paginaFavoritos">
    <div class="containerFavoritos">
      <p class="eyebrow">SUA LISTA</p>
      <h1>Universidades favoritas</h1>
      <p class="saudacao">Olá, <strong>{{ nomeUsuario }}</strong>.</p>

      <p v-if="carregando" class="mensagem">Carregando favoritos...</p>
      <p v-else-if="erro" class="mensagem erro">{{ erro }}</p>
      <p v-else-if="favoritos.length === 0" class="mensagem">
        Você ainda não salvou nenhuma universidade.
        <RouterLink to="/universidades" class="botaoVoltar">Voltar para universidades</RouterLink>
      </p>

      <div v-else class="listaFavoritos">
        <article v-for="universidade in favoritos" :key="universidade.id" class="favorito">
          <h2>{{ universidade.nome }}</h2>
          <p>{{ universidade.municipio }} - {{ universidade.uf }}</p>
          <RouterLink :to="`/universidade/${universidade.id}`">Ver detalhes</RouterLink>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.paginaFavoritos {
  min-height: 70vh;
  padding: 3rem 1.5rem;
  background: #fffcf7;
  color: #1c1c22;
}

.containerFavoritos {
  width: min(1000px, 100%);
  margin: 0 auto;
}

.eyebrow {
  margin: 0;
  color: #9e1f2e;
  font-size: 0.75rem;
  font-weight: 700;
  letter-spacing: 1px;
  background: linear-gradient(135deg, var(--brand-700), var(--brand-600));
  color: var(--white);
  box-shadow: 0 12px 24px rgba(122, 15, 26, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

h1 {
  margin: 0.3rem 0;
}

.saudacao {
  color: #6e6e78;
}

.mensagem {
  padding: 2rem;
  border: 1px dashed #e2e2e8;
  border-radius: 12px;
  background: #fff;
}

.botaoVoltar {
  display: inline-flex;
  margin-top: 1rem;
  padding: 0.7rem 1rem;
  border-radius: 8px;
  background: #7a0f1a;
  color: #fff;
  font-weight: 600;
  text-decoration: none;
}

.erro {
  color: #9e1f2e;
}

.listaFavoritos {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 1rem;
  margin-top: 2rem;
}

.favorito {
  padding: 1.25rem;
  border: 1px solid #eeeef0;
  border-radius: 8px;
  background: #fff;
}

.favorito h2 {
  margin: 0;
  font-size: 1.1rem;
}

.favorito p {
  color: #5d5d6b;
}

.favorito a {
  color: #7a0f1a;
  font-weight: 600;
}
</style>
