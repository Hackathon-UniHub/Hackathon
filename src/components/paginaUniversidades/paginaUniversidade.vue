<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRoute } from 'vue-router'
import { carregarUniversidade } from '@/utils/filtroUtils.js'

const route = useRoute()
const universidade = ref({})
const loading = ref(true)
const erro = ref('')

async function carregarDados() {
  try {
    universidade.value = await carregarUniversidade(route.params.id)
  } catch (error) {
    console.log('Erro ao carregar universidade:', error)
    erro.value = 'Não foi possível carregar a universidade. Verifique se a API está rodando.'
  }

  loading.value = false
}

onMounted(carregarDados)
</script>

<template>
  <div class="paginaUniversidade">
    <p v-if="loading" class="mensagem">Carregando universidade...</p>
    <p v-else-if="erro" class="mensagem">{{ erro }}</p>
    <p v-else-if="!universidade.nome" class="mensagem">Universidade não encontrada.</p>

    <div v-else class="caixa">
      <RouterLink class="voltar" to="/universidades">Voltar para as universidades</RouterLink>

      <div class="topo">
        <span
          class="categoria"
          :class="universidade.categoria_administrativa === 'Pública' ? 'publica' : 'privada'"
        >
          {{ universidade.categoria_administrativa }}
        </span>
        <span class="nota">Nota {{ universidade.igc }}</span>
      </div>

      <h1 class="nome">{{ universidade.nome }}</h1>
      <p class="local">{{ universidade.sigla }} - {{ universidade.municipio }}/{{ universidade.uf }}</p>
      <p class="descricao" v-if="universidade.descricao">{{ universidade.descricao }}</p>

      <h2 class="titulo">Informações</h2>
      <dl class="informacoes">
        <div>
          <dt>Situação</dt>
          <dd>{{ universidade.situacao }}</dd>
        </div>
        <div v-if="universidade.quantidade_alunos">
          <dt>Alunos</dt>
          <dd>{{ universidade.quantidade_alunos }}</dd>
        </div>
        <div v-if="universidade.quantidade_cursos">
          <dt>Cursos</dt>
          <dd>{{ universidade.quantidade_cursos }}</dd>
        </div>
        <div v-if="universidade.endereco_sede">
          <dt>Endereço</dt>
          <dd>{{ universidade.endereco_sede }}</dd>
        </div>
        <div v-if="universidade.telefone">
          <dt>Telefone</dt>
          <dd>{{ universidade.telefone }}</dd>
        </div>
        <div v-if="universidade.email">
          <dt>E-mail</dt>
          <dd>{{ universidade.email }}</dd>
        </div>
        <div v-if="universidade.site">
          <dt>Site</dt>
          <dd>
            <a
              :href="universidade.site.startsWith('http') ? universidade.site : 'https://' + universidade.site"
              target="_blank"
            >
              {{ universidade.site }}
            </a>
          </dd>
        </div>
      </dl>

      <h2 class="titulo">Cursos oferecidos</h2>
      <ul class="cursos">
        <li v-for="curso in universidade.cursos" :key="curso">{{ curso }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.paginaUniversidade {
  --vermelho: #7a0f1a;
  --vermelho-escuro: #9e1f2e;
  --creme-forte: #faf6ef;
  --borda: #eeeef0;
  --texto: #5d5d6b;

  min-height: 80vh;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem 1rem;
  background: #fff;
}

.mensagem {
  color: var(--texto);
}

.caixa {
  width: 100%;
  max-width: 640px;
  border: 1px solid var(--borda);
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 6px 24px rgba(122, 15, 26, 0.08);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.voltar {
  color: var(--vermelho);
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
}

.voltar:hover {
  color: var(--vermelho-escuro);
}

.topo {
  display: flex;
  justify-content: space-between;
  margin-top: 0.4rem;
}

.categoria {
  font-size: 0.8rem;
  font-weight: 600;
}

.categoria.publica {
  color: #4c4c57;
}

.categoria.privada {
  color: var(--vermelho);
}

.nota {
  font-size: 0.85rem;
  font-weight: 700;
  color: var(--vermelho);
}

.nome {
  font-size: 1.6rem;
  font-weight: 800;
  color: #1c1c22;
  margin: 0;
  line-height: 1.25;
}

.local {
  color: var(--texto);
  margin: 0;
}

.descricao {
  color: var(--texto);
  line-height: 1.55;
  font-size: 0.92rem;
  margin: 0.4rem 0 0;
}

.titulo {
  font-size: 0.78rem;
  font-weight: 700;
  letter-spacing: 1.2px;
  text-transform: uppercase;
  color: var(--vermelho);
  margin: 1rem 0 0.2rem;
}

.informacoes {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
}

.informacoes div {
  display: flex;
  gap: 1rem;
  border-bottom: 1px solid var(--borda);
  padding-bottom: 0.6rem;
}

.informacoes dt {
  width: 90px;
  flex-shrink: 0;
  font-weight: 700;
  font-size: 0.85rem;
  color: #1c1c22;
}

.informacoes dd {
  margin: 0;
  font-size: 0.88rem;
  color: var(--texto);
  word-break: break-word;
}

.informacoes a {
  color: var(--vermelho);
  font-weight: 600;
}

.cursos {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.cursos li {
  background: var(--creme-forte);
  border: 1px solid var(--borda);
  color: var(--texto);
  padding: 0.3rem 0.8rem;
  border-radius: 20px;
  font-size: 0.82rem;
}

@media (max-width: 640px) {
  .caixa {
    padding: 1.2rem;
  }

  .informacoes div {
    flex-direction: column;
    gap: 0.2rem;
  }
}
</style>
