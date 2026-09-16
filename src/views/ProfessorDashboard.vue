<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useComentariosStore } from '@/stores/comentarios'

const router = useRouter()
const auth = useAuthStore()
const vestibulares = useVestibularesStore()
const comentarios = useComentariosStore()
const filtro = ref('todos')
const mostrarFormulario = ref(false)
const novoVestibular = ref({
  nome_vestibular: '',
  tipo: 'ENEM'
})

const lista = computed(() => {
  return vestibulares
    .getByUniversidade(auth.professorUniversidadeId)
    .sort((a, b) => new Date(b.atualizado_em) - new Date(a.atualizado_em))
})

const listaFiltrada = computed(() => {
  if (filtro.value === 'todos') return lista.value
  return lista.value.filter(item => item.status === filtro.value)
})

const cardPrincipal = computed(() => listaFiltrada.value[0] || null)

onMounted(() => {
  if (!auth.isLoggedIn || !(auth.isProfessor || auth.profile?.tipo_usuario === 'professor')) {
    router.push('/')
    return
  }

  vestibulares.init()
  comentarios.init()
})

function abrirFormulario() {
  mostrarFormulario.value = true
}

async function criarVestibular() {
  const nome = novoVestibular.value.nome_vestibular.trim()

  if (!nome) {
    alert('Digite o nome do vestibular.')
    return
  }

  try {
    await vestibulares.criar({
      ...novoVestibular.value,
      nome_vestibular: nome,
      status: 'rascunho',
      criado_em: new Date().toISOString(),
      atualizado_em: new Date().toISOString()
    })

    novoVestibular.value = { nome_vestibular: '', tipo: 'ENEM' }
    mostrarFormulario.value = false
    filtro.value = 'todos'
  } catch (error) {
    alert(error.message || 'Erro ao criar vestibular.')
  }
}
</script>

<template>
  <div class="dashboard">
    <div class="toolbar">
      <div>
        <p class="label">Painel do professor</p>
      </div>
      <div class="toolbar-actions">
        <select v-model="filtro">
          <option value="todos">Todos</option>
          <option value="publicado">Publicado</option>
          <option value="rascunho">Rascunho</option>
          <option value="arquivado">Arquivado</option>
        </select>
        <button class="new-button" @click="abrirFormulario">Novo vestibular</button>
      </div>
    </div>

    <div v-if="mostrarFormulario" class="form-card">
      <h2>Criar vestibular</h2>
      <div class="field">
        <label>Nome</label>
        <input v-model="novoVestibular.nome_vestibular" placeholder="Ex: Vestibular 2026" />
      </div>
      <div class="field">
        <label>Tipo</label>
        <input v-model="novoVestibular.tipo" placeholder="Ex: ENEM" />
      </div>
      <div class="form-actions">
        <button class="cancel-button" @click="mostrarFormulario = false">Cancelar</button>
        <button class="save-button" @click="criarVestibular">Salvar</button>
      </div>
    </div>

    <div v-if="cardPrincipal" class="main-card">
      <div class="header">
        <div class="title-wrap">
          <p class="mini-label">Vestibular principal</p>
          <h1>{{ cardPrincipal.nome_vestibular }}</h1>
        </div>
        <span class="badge" :class="cardPrincipal.status">{{ cardPrincipal.status }}</span>
      </div>

      <div class="info-grid">
        <div>
          <span class="title">Tipo</span>
          <strong>{{ cardPrincipal.tipo }}</strong>
        </div>
        <div>
          <span class="title">Comentários</span>
          <strong>{{ comentarios.count(cardPrincipal.id) }}</strong>
        </div>
        <div>
          <span class="title">Itens</span>
          <strong>{{ listaFiltrada.length }}</strong>
        </div>
      </div>
    </div>

    <div v-if="listaFiltrada.length" class="list-card">
      <h2>Todos os vestibulares</h2>
      <div v-for="item in listaFiltrada" :key="item.id" class="list-item">
        <div>
          <strong>{{ item.nome_vestibular }}</strong>
          <span>{{ item.tipo }}</span>
        </div>
        <span class="small-badge" :class="item.status">{{ item.status }}</span>
      </div>
    </div>

    <p v-else class="empty">Nenhum vestibular encontrado.</p>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.dashboard {
  padding: 24px;
  font-family: Arial, sans-serif;
  background: #f5f5f5;
}

.toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 18px;
  max-width: 700px;
}

.toolbar-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.label,
.mini-label {
  margin: 0;
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #777;
}

select, input {
  padding: 8px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: white;
  color: #222;
  min-width: 150px;
}

input {
  width: 100%;
}

.new-button,
.save-button,
.cancel-button {
  border: none;
  border-radius: 8px;
  padding: 9px 14px;
  font-weight: 600;
  cursor: pointer;
}

.new-button,
.save-button {
  background: #1a1a1a;
  color: white;
}

.cancel-button {
  background: #f0f0f0;
  color: #333;
}

.form-card {
  background: white;
  border: 1px solid #e5e5e5;
  border-radius: 12px;
  padding: 18px;
  max-width: 700px;
  margin-bottom: 18px;
}

.form-card h2 {
  margin: 0 0 16px;
  font-size: 20px;
}

.field {
  margin-bottom: 12px;
}

.field label {
  display: block;
  margin-bottom: 6px;
  font-size: 12px;
  color: #666;
  text-transform: uppercase;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 16px;
}

.main-card {
  background: linear-gradient(180deg, #ffffff 0%, #fafafa 100%);
  border: 1px solid #e5e5e5;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.04);
  max-width: 700px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 22px;
}

.title-wrap {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

h1 {
  margin: 0;
  font-size: 30px;
  color: #1a1a1a;
  line-height: 1.2;
}

.badge {
  display: inline-block;
  padding: 8px 12px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: bold;
  text-transform: uppercase;
  white-space: nowrap;
}

.badge.publicado {
  background: #eaf9ef;
  color: #1d7a45;
}

.badge.rascunho {
  background: #fff6dc;
  color: #8d6400;
}

.badge.arquivado {
  background: #f1f1f1;
  color: #555;
}

.info-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 14px;
}

.info-grid div {
  background: #f9f9f9;
  border: 1px solid #ececec;
  border-radius: 10px;
  padding: 14px 12px;
}

.title {
  display: block;
  margin-bottom: 8px;
  color: #777;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.06em;
}

strong {
  font-size: 18px;
  color: #1e1e1e;
}

.list-card {
  margin-top: 18px;
  background: #fff;
  border: 1px solid #e5e5e5;
  border-radius: 14px;
  padding: 18px;
  max-width: 700px;
}

.list-card h2 {
  margin: 0 0 14px;
  font-size: 18px;
}

.list-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.list-item:last-child {
  border-bottom: none;
}

.list-item strong {
  display: block;
  font-size: 16px;
  margin-bottom: 4px;
}

.list-item span {
  color: #666;
  font-size: 13px;
}

.small-badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.small-badge.publicado {
  background: #eaf9ef;
  color: #1d7a45;
}

.small-badge.rascunho {
  background: #fff6dc;
  color: #8d6400;
}

.small-badge.arquivado {
  background: #f1f1f1;
  color: #555;
}

.empty {
  color: #666;
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 10px;
  padding: 20px;
  max-width: 700px;
}
</style>

