<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useComentariosStore } from '@/stores/comentarios'
import VestibularForm from '@/components/paginaUniversidades/VestibularForm.vue'
import { UniversidadePorId } from '@/utils/universidadesUtils'

const router = useRouter()
const auth = useAuthStore()
const vestibulares = useVestibularesStore()
const comentarios = useComentariosStore()

const filtro = ref('todos')
const mostrarFormulario = ref(false)
const vestibularEditando = ref(null)

const lista = computed(() => {
  return vestibulares
    .getByUniversidade(auth.professorUniversidadeId)
    .filter(item => item.professor_id === auth.user?.id)
    .sort((a, b) => new Date(b.atualizado_em) - new Date(a.atualizado_em))
})

const listaFiltrada = computed(() => {
  if (filtro.value === 'todos') return lista.value
  return lista.value.filter(item => item.status === filtro.value)
})

const principal = computed(() => listaFiltrada.value[0] || null)
const universidade = computed(() => UniversidadePorId(auth.professorUniversidadeId))
const nomeProfessor = computed(() =>
  auth.profile?.full_name ||
  auth.user?.user_metadata?.full_name ||
  auth.user?.email?.split('@')[0] ||
  'Professor',
)

onMounted(() => {
  if (!auth.isLoggedIn || !(auth.isProfessor || auth.profile?.tipo_usuario === 'professor')) {
    router.push('/')
    return
  }

  vestibulares.init()
  comentarios.init()
})

function abrirFormulario() {
  vestibularEditando.value = null
  mostrarFormulario.value = true
}

function abrirEdicao(vestibular) {
  vestibularEditando.value = vestibular
  mostrarFormulario.value = true
}

async function publicarVestibular(vestibular) {
  try {
    await vestibulares.atualizar(vestibular.id, { status: 'publicado' })
    filtro.value = 'todos'
  } catch {
    alert('Não foi possível publicar o vestibular.')
  }
}

async function excluirVestibular(vestibular) {
  if (!window.confirm(`Excluir o vestibular "${vestibular.nome_vestibular}"?`)) return

  try {
    await vestibulares.remover(vestibular.id)
    filtro.value = 'todos'
  } catch {
    alert('Não foi possível excluir o vestibular.')
  }
}

function vestibularSalvo() {
  mostrarFormulario.value = false
  vestibularEditando.value = null
  filtro.value = 'todos'
}
</script>

<template>
  <div class="page">
    <div class="card">
      <div class="topo">
        <p>Painel do professor</p>
        <div class="topo-actions">
          <select v-model="filtro">
            <option value="todos">Todos</option>
            <option value="publicado">Publicado</option>
            <option value="rascunho">Rascunho</option>
            <option value="arquivado">Arquivado</option>
          </select>
          <button class="primary" @click="abrirFormulario">Novo vestibular</button>
        </div>
      </div>

      <section class="perfil">
        <div class="avatar">{{ nomeProfessor.charAt(0).toUpperCase() }}</div>
        <div>
          <small>Professor</small>
          <h2>{{ nomeProfessor }}</h2>
          <p>{{ universidade?.nome || 'Universidade não vinculada' }}</p>
          <span v-if="auth.user?.email">{{ auth.user.email }}</span>
        </div>
      </section>

      <VestibularForm
        v-model="mostrarFormulario"
        :vestibular="vestibularEditando"
        @salvo="vestibularSalvo"
      />

      <div v-if="principal" class="principal">
        <div class="principal-header">
          <div>
            <small>Vestibular principal</small>
            <h1>{{ principal.nome_vestibular }}</h1>
          </div>
        </div>

        <div class="grid">
          <div>
            <span>Tipo</span>
            <strong>{{ principal.tipo }}</strong>
          </div>
          <div>
            <span>Comentários</span>
            <strong>{{ comentarios.count(principal.id) }}</strong>
          </div>
          <div>
            <span>Itens</span>
            <strong>{{ listaFiltrada.length }}</strong>
          </div>
        </div>
      </div>

      <div v-if="listaFiltrada.length" class="lista">
        <h2>Todos os vestibulares</h2>

        <div v-for="item in listaFiltrada" :key="item.id" class="item">
          <div>
            <strong>{{ item.nome_vestibular }}</strong>
            <span>{{ item.tipo }}</span>
          </div>
          <div class="item-acoes">
            <button v-if="item.status === 'rascunho'" class="publish" type="button" @click="publicarVestibular(item)">
              Publicar
            </button>
            <button class="edit" type="button" @click="abrirEdicao(item)">Editar</button>
            <button class="delete" type="button" @click="excluirVestibular(item)">Excluir</button>
          </div>
        </div>
      </div>

      <p v-else class="vazio">Nenhum vestibular encontrado.</p>
    </div>
  </div>
</template>

<style scoped>
* { box-sizing: border-box; }

.page {
  padding: 24px;
  font-family: Arial, sans-serif;
  background: #f4f4f4;
}

.card {
  max-width: 760px;
  margin: 0 auto;
}

.topo {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

.topo p {
  margin: 0;
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: #666;
}

.topo-actions {
  display: flex;
  align-items: center;
  gap: 10px;
}

.perfil {
  display: flex;
  align-items: center;
  gap: 14px;
  padding: 16px;
  margin-bottom: 18px;
  background: white;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
}

.avatar {
  display: grid;
  place-items: center;
  width: 52px;
  height: 52px;
  border-radius: 50%;
  background: #7a0f1a;
  color: white;
  font-size: 22px;
  font-weight: 700;
}

.perfil h2,
.perfil p,
.perfil span {
  margin: 0;
}

.perfil h2 {
  font-size: 20px;
}

.perfil p {
  margin-top: 4px;
  color: #333;
}

.perfil span {
  display: block;
  margin-top: 4px;
  color: #777;
  font-size: 13px;
}

select,
input {
  padding: 9px 12px;
  border: 1px solid #d9d9d9;
  border-radius: 8px;
  background: white;
  color: #222;
}

input {
  width: 100%;
}

button {
  border: none;
  border-radius: 8px;
  padding: 10px 14px;
  font-weight: 600;
  cursor: pointer;
}

.primary {
  background: #1f1f1f;
  color: white;
}

.secondary {
  background: #ececec;
  color: #222;
}

.formulario,
.principal,
.lista,
.vazio {
  background: white;
  border: 1px solid #e4e4e4;
  border-radius: 12px;
  padding: 18px;
  margin-bottom: 18px;
}

.formulario h2,
.lista h2 {
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

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 14px;
}

.principal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  margin-bottom: 18px;
}

small {
  display: block;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: #777;
}

h1 {
  margin: 6px 0 0;
  font-size: 30px;
}

.badge,
.tag {
  display: inline-block;
  padding: 7px 10px;
  border-radius: 999px;
  font-size: 10px;
  font-weight: bold;
  text-transform: uppercase;
}

.badge.publicado,
.tag.publicado {
  background: #eaf9ef;
  color: #1d7a45;
}

.badge.rascunho,
.tag.rascunho {
  background: #fff6dc;
  color: #8d6400;
}

.badge.arquivado,
.tag.arquivado {
  background: #f1f1f1;
  color: #555;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 12px;
}

.grid div {
  background: #f8f8f8;
  border: 1px solid #ededed;
  border-radius: 10px;
  padding: 12px;
}

.grid span {
  display: block;
  margin-bottom: 6px;
  font-size: 11px;
  color: #777;
  text-transform: uppercase;
}

.grid strong {
  font-size: 18px;
  color: #1a1a1a;
}

.item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}

.item:last-child {
  border-bottom: none;
}

.item-acoes {
  display: flex;
  align-items: center;
  gap: 8px;
}

.edit {
  padding: 7px 10px;
  border: 1px solid #d9d9d9;
  background: white;
  color: #333;
  font-size: 12px;
}

.publish {
  padding: 7px 10px;
  background: #1d7a45;
  color: white;
  font-size: 12px;
}

.delete {
  padding: 7px 10px;
  border: 1px solid #fecaca;
  background: #fef2f2;
  color: #991b1b;
  font-size: 12px;
}

.item strong {
  display: block;
  margin-bottom: 4px;
}

.item span {
  color: #666;
  font-size: 13px;
}

.vazio {
  color: #666;
}
</style>

