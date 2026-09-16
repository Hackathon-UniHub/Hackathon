<script setup>
import { computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useAuthStore } from '@/stores/auth'
import ComentariosSection from './ComentariosSection.vue'

const route = useRoute()
const store = useVestibularesStore()
const auth = useAuthStore()

const uniId = computed(() => Number(route.params.id))
const vestibulares = computed(() => store.getPublicados(uniId.value))

function podeEditar(vestibular) {
  return auth.isProfessor && store.canManage(vestibular)
}

onMounted(() => {
  store.init()
})

function formatDate(date) {
  if (!date) return '—'
  return new Date(date + 'T00:00:00').toLocaleDateString('pt-BR')
}

</script>

<template>
  <section class="lista" v-if="vestibulares.length">
    <div class="cabecalho">
      <h2>Vestibulares</h2>
      <span>{{ vestibulares.length }}</span>
    </div>

    <div class="cards">
      <article v-for="vestibular in vestibulares" :key="vestibular.id" class="card">
        <div class="topo">
          <div>
            <p class="tipo">{{ vestibular.tipo }}</p>
            <h3>{{ vestibular.nome_vestibular }}</h3>
          </div>

        </div>

        <div class="info">
          <p v-if="vestibular.data_inscricao_inicio || vestibular.data_inscricao_fim">
            <strong>Inscrições:</strong>
            {{ formatDate(vestibular.data_inscricao_inicio) }}
            <span v-if="vestibular.data_inscricao_fim">até {{ formatDate(vestibular.data_inscricao_fim) }}</span>
          </p>

          <p v-if="vestibular.data_prova">
            <strong>Prova:</strong> {{ formatDate(vestibular.data_prova) }}
          </p>

          <p v-if="vestibular.data_resultado">
            <strong>Resultado:</strong> {{ formatDate(vestibular.data_resultado) }}
          </p>
        </div>

        <div class="botoes">
          <a
            v-if="vestibular.inscricao_url && vestibular.data_inscricao_fim && new Date(vestibular.data_inscricao_fim + 'T23:59:59') >= new Date()"
            :href="vestibular.inscricao_url"
            target="_blank"
            rel="noopener"
            class="btn primario"
          >
            Inscrever-se
          </a>

          <button v-if="podeEditar(vestibular)" type="button" class="btn editar" @click="$emit('editar', vestibular)">
            Editar
          </button>
        </div>

        <ComentariosSection :vestibular-id="vestibular.id" :contagem="store.count ? store.count(vestibular.id) : 0" />
      </article>
    </div>
  </section>

  <section v-else class="vazia">
    <p>Nenhum vestibular disponível.</p>
  </section>
</template>

<style scoped>
.lista {
  margin-top: 32px;
  background: #faf6ef;
  border: 1px solid #eeeef0;
  box-shadow: none;
  border-radius: 16px;
  padding: 20px;
}

.cabecalho {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
}

.cabecalho h2 {
  margin: 0;
  font-size: 1.3rem;
}

.cabecalho span {
  background: #f9e8e9;
  color: #7a0f1a;
  border-radius: 999px;
  padding: 6px 10px;
  font-size: 0.8rem;
  font-weight: 700;
}

.cards {
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-height: min(620px, 70vh);
  overflow-y: auto;
  scrollbar-width: none;
  overscroll-behavior: contain;
}

.cards::-webkit-scrollbar {
  display: none;
}

.card {
  background: #fff;
  border: 1px solid #eeeef0;
  box-shadow: none;
  border-radius: 12px;
  padding: 16px;
  display: flex;
  flex-direction: column;
}

.topo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 14px;
}

.tipo {
  margin: 0 0 6px;
  font-size: 0.75rem;
  color: #7a0f1a;
  font-weight: 700;
}

.card h3 {
  margin: 0;
  font-size: 1.15rem;
  color: #1c1c22;
}

.status {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  white-space: nowrap;
}

.status.status-aberto,
.status.status-publicado {
  background: #dcfce7;
  color: #166534;
}

.status.status-breve,
.status.status-proximo {
  background: #fef3c7;
  color: #92400e;
}

.status.status-futuro {
  background: #e0e7ff;
  color: #3730a3;
}

.status.status-fechado,
.status.status-encerrado {
  background: #fee2e2;
  color: #991b1b;
}

.status.status-rascunho {
  background: #f3f4f6;
  color: #374151;
}

.info {
  display: grid;
  gap: 6px;
  margin-bottom: 16px;
}

.info p {
  margin: 0;
  font-size: 0.9rem;
  color: #4c4c57;
}

.botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 16px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: none;
  transition: background-color 0.15s ease, color 0.15s ease;
  animation: none;
  border-radius: 10px;
  padding: 9px 14px;
  font-size: 0.85rem;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
}

.btn:hover {
  transform: none;
  box-shadow: none;
}

.btn.link:hover,
.btn.editar:hover {
  background: #f0cdd0;
  color: #650c16;
}

.btn.primario:hover {
  background: #650c16;
}

.btn.link {
  background: #f9e8e9;
  color: #7a0f1a;
}

.btn.primario {
  background: #7a0f1a;
  color: #fff;
}

.btn.editar {
  background: #f9e8e9;
  color: #7a0f1a;
}

.vazia {
  border: 1px solid #e5e7eb;
  background: #f9fafb;
  border-radius: 12px;
  padding: 32px 20px;
  text-align: center;
  color: #6b7280;
}

@media (max-width: 640px) {
  .topo {
    flex-direction: column;
    align-items: flex-start;
  }

  .botoes {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
