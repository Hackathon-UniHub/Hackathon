<script setup>
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useAuthStore } from '@/stores/auth'
import { UniversidadePorId } from '@/utils/universidadesUtils'

const props = defineProps({
  modelValue: Boolean,
  vestibular: Object,
})

const emit = defineEmits(['update:modelValue', 'salvo'])
const store = useVestibularesStore()
const auth = useAuthStore()

const loading = ref(false)
const error = ref('')

const form = ref({
  nome_vestibular: '',
  tipo: 'Vestibular Próprio',
  data_inscricao_inicio: '',
  data_inscricao_fim: '',
  data_prova: '',
  data_resultado: '',
  edital_url: '',
  inscricao_url: '',
  descricao: '',
  status: 'rascunho',
})

const tipos = ['Vestibular Próprio', 'SISU', 'ENEM', 'PAS', 'Outro']
const editing = computed(() => !!props.vestibular)
const universidade = computed(() => UniversidadePorId(auth.professorUniversidadeId))

function resetForm() {
  if (props.vestibular) {
    form.value = { ...props.vestibular }
    return
  }

  form.value = {
    nome_vestibular: '',
    tipo: 'Vestibular Próprio',
    data_inscricao_inicio: '',
    data_inscricao_fim: '',
    data_prova: '',
    data_resultado: '',
    edital_url: '',
    inscricao_url: '',
    descricao: '',
    status: 'rascunho',
  }
}

watch(
  () => props.modelValue,
  (value) => {
    if (value) {
      resetForm()
      error.value = ''
    }
  },
)

function close() {
  emit('update:modelValue', false)
}

async function salvar() {
  if (!form.value.nome_vestibular.trim()) {
    error.value = 'Digite o nome do vestibular.'
    return
  }

  if (!form.value.data_inscricao_inicio || !form.value.data_inscricao_fim) {
    error.value = 'Preencha as datas de inscrição.'
    return
  }

  loading.value = true
  error.value = ''

  try {
    const payload = {
      ...form.value,
      universidade_id: auth.professorUniversidadeId,
      nome_vestibular: form.value.nome_vestibular.trim(),
      edital_url: form.value.edital_url?.trim() || null,
      inscricao_url: form.value.inscricao_url?.trim() || null,
      data_prova: form.value.data_prova || null,
      data_resultado: form.value.data_resultado || null,
    }

    if (editing.value) {
      await store.atualizar(props.vestibular.id, payload)
    } else {
      await store.criar(payload)
    }

    emit('salvo')
    close()
  } catch (e) {
    if (e.message === 'USUARIO_NAO_LOGADO') {
      error.value = 'Faça login antes de salvar.'
    } else if (e.message === 'APENAS_PROFESSOR') {
      error.value = 'Apenas professores podem cadastrar.'
    } else if (e.message === 'SEM_PERMISSAO') {
      error.value = 'Você não pode alterar este vestibular.'
    } else if (e.message === 'UNIVERSIDADE_NAO_VINCULADA') {
      error.value = 'Seu perfil não está vinculado a uma universidade.'
    } else {
      error.value = 'Erro ao salvar vestibular.'
    }
  } finally {
    loading.value = false
  }
}

function fecharComTecla(event) {
  if (event.key === 'Escape') {
    close()
  }
}

onMounted(() => document.addEventListener('keydown', fecharComTecla))
onUnmounted(() => document.removeEventListener('keydown', fecharComTecla))
</script>

<template>
  <div class="fundo" v-if="modelValue" @click.self="close">
    <div class="modal">
      <div class="topo">
        <h2>{{ editing ? 'Editar vestibular' : 'Novo vestibular' }}</h2>
        <button type="button" class="fechar" @click="close">×</button>
      </div>

      <div v-if="error" class="erro">{{ error }}</div>

      <div class="campo">
        <label>Universidade da prova</label>
        <input :value="universidade?.nome || 'Universidade não vinculada'" type="text" readonly />
      </div>

      <div class="campo">
        <label>Nome</label>
        <input v-model="form.nome_vestibular" type="text" placeholder="Vestibular 2025.1" />
      </div>

      <div class="linha">
        <div class="campo">
          <label>Tipo</label>
          <select v-model="form.tipo">
            <option v-for="tipo in tipos" :key="tipo" :value="tipo">{{ tipo }}</option>
          </select>
        </div>

        <div class="campo">
          <label>Status</label>
          <select v-model="form.status">
            <option value="rascunho">Rascunho</option>
            <option value="publicado">Publicado</option>
          </select>
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <label>Início das inscrições</label>
          <input v-model="form.data_inscricao_inicio" type="date" />
        </div>

        <div class="campo">
          <label>Fim das inscrições</label>
          <input v-model="form.data_inscricao_fim" type="date" />
        </div>
      </div>

      <div class="linha">
        <div class="campo">
          <label>Data da prova</label>
          <input v-model="form.data_prova" type="date" />
        </div>

        <div class="campo">
          <label>Data do resultado</label>
          <input v-model="form.data_resultado" type="date" />
        </div>
      </div>

      <div class="campo">
        <label>URL do edital</label>
        <input v-model="form.edital_url" type="url" placeholder="https://..." />
      </div>

      <div class="campo">
        <label>URL da inscrição</label>
        <input v-model="form.inscricao_url" type="url" placeholder="https://..." />
      </div>

      <div class="campo">
        <label>Descrição</label>
        <textarea v-model="form.descricao" rows="3" placeholder="Descreva o vestibular..."></textarea>
      </div>

      <div class="botoes">
        <button type="button" class="btn secundario" @click="close">Cancelar</button>
        <button type="button" class="btn principal" :disabled="loading" @click="salvar">
          {{ loading ? 'Salvando...' : editing ? 'Salvar' : 'Criar' }}
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.fundo {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
  z-index: 1000;
}

.modal {
  width: 100%;
  max-width: 640px;
  max-height: calc(100vh - 32px);
  overflow-y: auto;
  background: white;
  border-radius: 12px;
  padding: 16px;
}

.topo {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.topo h2 {
  margin: 0;
  font-size: 1.4rem;
  color: #1f2937;
}

.fechar {
  border: none;
  background: #f3f4f6;
  width: 36px;
  height: 36px;
  border-radius: 999px;
  font-size: 1.5rem;
  cursor: pointer;
  box-shadow: none;
  transition: none;
}

.fechar:hover {
  background: #e5e7eb;
}

.erro {
  background: #fef2f2;
  color: #b91c1c;
  border: 1px solid #fecaca;
  border-radius: 10px;
  padding: 10px 12px;
  margin-bottom: 10px;
  font-size: 0.9rem;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 5px;
  margin-bottom: 10px;
}

.linha {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 12px;
}

label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #374151;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 10px;
  padding: 10px 12px;
  font: inherit;
  box-sizing: border-box;
  background: #fff;
}

textarea {
  resize: vertical;
  min-height: 72px;
}

.botoes {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 12px;
}

.btn {
  border: none;
  border-radius: 10px;
  padding: 10px 18px;
  font-weight: 600;
  cursor: pointer;
  box-shadow: none;
  transition: none;
}

.btn:disabled {
  opacity: 0.6;
  cursor: wait;
}

.btn.secundario {
  background: #f3f4f6;
  color: #374151;
}

.btn.secundario:hover {
  background: #e5e7eb;
}

.btn.principal {
  background: #7a0f1a;
  color: white;
}

.btn.principal:hover {
  background: #620c15;
}

@media (max-width: 640px) {
  .linha {
    grid-template-columns: 1fr;
  }

  .botoes {
    flex-direction: column-reverse;
  }

  .btn {
    width: 100%;
  }
}
</style>
