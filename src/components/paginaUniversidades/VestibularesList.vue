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

function statusDoVestibular(vestibular) {
  return store.status(vestibular)
}

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
  <section class="lista">
    <div class="cabecalho">
      <div>
        <p class="sobretitulo">OPORTUNIDADES DE INGRESSO</p>
        <h2>Vestibulares</h2>
        <p class="descricaoCabecalho">
          Acompanhe os processos seletivos e as datas importantes desta universidade.
        </p>
      </div>
      <span class="contador">{{ vestibulares.length }} {{ vestibulares.length === 1 ? 'processo' : 'processos' }}</span>
    </div>

    <p class="avisoDemonstracao">
      Dados fictícios para demonstração. Consulte os canais oficiais da universidade antes de se inscrever.
    </p>

    <p v-if="store.loading" class="vazia">Carregando vestibulares...</p>
    <p v-else-if="store.error" class="vazia erro" role="alert">{{ store.error }}</p>

    <div v-else-if="vestibulares.length" class="cards">
      <article v-for="vestibular in vestibulares" :key="vestibular.id" class="card">
        <div class="topo">
          <div>
            <p class="tipo">{{ vestibular.tipo }}</p>
            <h3>{{ vestibular.nome_vestibular }}</h3>
          </div>
          <span class="status" :class="statusDoVestibular(vestibular).class">
            {{ statusDoVestibular(vestibular).label }}
          </span>
        </div>

        <div class="info">
          <div v-if="vestibular.data_inscricao_inicio || vestibular.data_inscricao_fim" class="dataItem">
            <span class="rotuloData">PERÍODO DE INSCRIÇÃO</span>
            <strong>
              {{ formatDate(vestibular.data_inscricao_inicio) }}
              <span v-if="vestibular.data_inscricao_fim"> até {{ formatDate(vestibular.data_inscricao_fim) }}</span>
            </strong>
          </div>
          <div v-if="vestibular.data_prova" class="dataItem">
            <span class="rotuloData">DATA DA PROVA</span>
            <strong>{{ formatDate(vestibular.data_prova) }}</strong>
          </div>
          <div v-if="vestibular.data_resultado" class="dataItem">
            <span class="rotuloData">RESULTADO</span>
            <strong>{{ formatDate(vestibular.data_resultado) }}</strong>
          </div>
        </div>

        <p v-if="vestibular.descricao" class="descricaoVestibular">
          {{ vestibular.descricao }}
        </p>

        <div class="botoes">
          <a
            v-if="!auth.isProfessor && vestibular.inscricao_url && vestibular.data_inscricao_fim && new Date(vestibular.data_inscricao_fim + 'T23:59:59') >= new Date()"
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

    <p v-else class="vazia">Nenhum vestibular publicado para esta universidade.</p>
  </section>
</template>

<style scoped>
.lista {
  margin-top: 32px;
  background: #fffcf7;
  border: 1px solid #eeeef0;
  border-radius: 16px;
  padding: 24px;
}

.cabecalho {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 16px;
}

.cabecalho h2 {
  margin: 4px 0;
  color: #1c1c22;
  font-size: 1.4rem;
}

.sobretitulo {
  margin: 0;
  color: #7a0f1a;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
}

.descricaoCabecalho {
  margin: 0;
  color: #5d5d6b;
  font-size: 0.9rem;
}

.contador {
  flex: 0 0 auto;
  background: #f9e8e9;
  color: #7a0f1a;
  border-radius: 999px;
  padding: 7px 12px;
  font-size: 0.78rem;
  font-weight: 700;
}

.avisoDemonstracao {
  margin: 0 0 16px;
  padding: 10px 12px;
  border-left: 3px solid #7a0f1a;
  border-radius: 0 8px 8px 0;
  background: #faf6ef;
  color: #5d5d6b;
  font-size: 0.82rem;
  line-height: 1.5;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 340px), 1fr));
  gap: 14px;
  max-height: min(760px, 75vh);
  overflow-y: auto;
  padding: 2px;
  overscroll-behavior: contain;
}

.card {
  min-width: 0;
  padding: 18px;
  background: #fff;
  border: 1px solid #eeeef0;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
}

.topo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.tipo {
  margin: 0 0 6px;
  color: #7a0f1a;
  font-size: 0.72rem;
  font-weight: 800;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.card h3 {
  margin: 0;
  color: #1c1c22;
  font-size: 1.05rem;
  line-height: 1.4;
}

.status {
  flex: 0 0 auto;
  border-radius: 999px;
  padding: 5px 9px;
  font-size: 0.68rem;
  font-weight: 700;
  text-align: center;
}

.status-aberto,
.status-publicado {
  background: #dcfce7;
  color: #166534;
}

.status-breve,
.status-proximo {
  background: #fef3c7;
  color: #92400e;
}

.status-futuro {
  background: #e0e7ff;
  color: #3730a3;
}

.status-fechado,
.status-encerrado,
.status-resultado,
.status-prova {
  background: #f3f4f6;
  color: #4b5563;
}

.status-rascunho {
  background: #f3f4f6;
  color: #374151;
}

.info {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 8px;
  margin-bottom: 12px;
}

.dataItem {
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 10px;
  background: #faf6ef;
  border-radius: 8px;
}

.rotuloData {
  color: #91919f;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.06em;
}

.dataItem strong {
  color: #383840;
  font-size: 0.8rem;
  line-height: 1.45;
}

.descricaoVestibular {
  margin: 0 0 14px;
  color: #5d5d6b;
  font-size: 0.85rem;
  line-height: 1.55;
}

.botoes {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-top: auto;
  margin-bottom: 14px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border: 0;
  border-radius: 9px;
  padding: 9px 13px;
  font-size: 0.82rem;
  font-weight: 700;
  text-decoration: none;
  cursor: pointer;
  transition: background-color 0.15s ease;
}

.btn.primario {
  background: #7a0f1a;
  color: #fff;
}

.btn.primario:hover {
  background: #650c16;
}

.btn.editar {
  background: #f9e8e9;
  color: #7a0f1a;
}

.btn.editar:hover {
  background: #f0cdd0;
}

.vazia {
  border: 1px solid #eeeef0;
  background: #fff;
  border-radius: 12px;
  padding: 28px 20px;
  text-align: center;
  color: #5d5d6b;
}

.vazia.erro {
  color: #b91c1c;
  background: #fef2f2;
  border-color: #fecaca;
}

@media (max-width: 640px) {
  .lista {
    padding: 16px;
  }

  .cabecalho {
    flex-direction: column;
  }

  .topo {
    flex-direction: column;
    align-items: stretch;
  }

  .status {
    align-self: flex-start;
  }

  .botoes {
    flex-direction: column;
  }

  .btn {
    width: 100%;
  }
}
</style>
