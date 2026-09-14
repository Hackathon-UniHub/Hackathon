<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({ modelValue: Boolean, vestibular: Object })
const emit = defineEmits(['update:modelValue', 'salvo'])

const store = useVestibularesStore()
const auth = useAuthStore()

const loading = ref(false)
const error = ref(null)
const tab = ref('basico')

const form = ref({
  nome_vestibular: '', tipo: 'Vestibular Próprio',
  data_inscricao_inicio: '', data_inscricao_fim: '',
  data_prova: '', data_resultado: '',
  edital_url: '', inscricao_url: '',
  descricao: '', status: 'rascunho'
})

const tipos = ['Vestibular Próprio','SISU','ENEM','PAS','Outro']
const hoje = new Date().toISOString().split('T')[0]
const editing = computed(() => !!props.vestibular)

watch(() => props.modelValue, v => {
  if (v) {
    if (props.vestibular) form.value = { ...props.vestibular }
    else Object.assign(form.value, { nome_vestibular:'', tipo:'Vestibular Próprio', data_inscricao_inicio:'', data_inscricao_fim:'', data_prova:'', data_resultado:'', edital_url:'', inscricao_url:'', descricao:'', status:'rascunho' })
    tab.value = 'basico'; error.value = null
  }
})

async function save() {
  if (!form.value.nome_vestibular.trim() || !form.value.data_inscricao_inicio || !form.value.data_inscricao_fim) { error.value = 'Preencha campos obrigatórios'; return }
  loading.value = true; error.value = null
  try {
    const data = { ...form.value, edital_url: form.value.edital_url.trim()||null, inscricao_url: form.value.inscricao_url.trim()||null, data_prova: form.value.data_prova||null, data_resultado: form.value.data_resultado||null }
    editing.value ? await store.atualizar(props.vestibular.id, data) : await store.criar(data)
    emit('salvo'); close()
  } catch(e) { error.value = e.message==='USUARIO_NAO_LOGADO'?'Faça login':e.message==='APENAS_PROFESSOR'?'Apenas professores':e.message==='SEM_PERMISSAO'?'Sem permissão':'Erro ao salvar' }
  finally { loading.value = false }
}

function close() { emit('update:modelValue', false) }
function kd(e) { if (e.key==='Escape') close() }
onMounted(() => document.addEventListener('keydown', kd))
onUnmounted(() => document.removeEventListener('keydown', kd))
</script>

<template>
  <Transition name="modal">
    <div class="overlay" v-if="modelValue" @click.self="close" role="dialog" aria-modal="true" aria-labelledby="mt">
      <div class="box">
        <header><h2 id="mt">{{ editing ? '✏️ Editar' : '➕ Novo' }} Vestibular</h2><button class="x" @click="close">×</button></header>
        <div class="tabs">
          <button v-for="t in [{id:'basico',l:'📋 Básico'},{id:'datas',l:'📅 Datas'},{id:'links',l:'🔗 Links'},{id:'extra',l:'📝 Detalhes'}]" :key="t.id" class="tb" :class="{on:tab===t.id}" @click="tab=t.id">{{t.l}}</button>
        </div>
        <div class="body">
          <div v-if="error" class="err">{{error}}</div>
          <div v-show="tab==='basico'" class="tab">
            <label>Nome *<input v-model="form.nome_vestibular" placeholder="Vestibular 2025.1" maxlength="100"></label>
            <label>Tipo *<select v-model="form.tipo"><option v-for="t in tipos" :key="t" :value="t">{{t}}</option></select></label>
            <label>Status<div class="rad"><label><input type="radio" v-model="form.status" value="rascunho"> 📝 Rascunho</label><label><input type="radio" v-model="form.status" value="publicado"> 🌍 Publicado</label></div></label>
          </div>
          <div v-show="tab==='datas'" class="tab">
            <div class="row"><label>Início insc. *<input type="date" v-model="form.data_inscricao_inicio" :min="hoje"></label><label>Fim insc. *<input type="date" v-model="form.data_inscricao_fim" :min="form.data_inscricao_inicio||hoje"></label></div>
            <div class="row"><label>Prova<input type="date" v-model="form.data_prova" :min="form.data_inscricao_fim||hoje"></label><label>Resultado<input type="date" v-model="form.data_resultado" :min="form.data_prova||form.data_inscricao_fim||hoje"></label></div>
            <p class="hint">💡 SISU/ENEM: deixe "Prova" vazio. Datas passadas viram status automático.</p>
          </div>
          <div v-show="tab==='links'" class="tab">
            <label>URL Edital<input type="url" v-model="form.edital_url" placeholder="https://exemplo.com/edital.pdf"></label>
            <label>URL Inscrição<input type="url" v-model="form.inscricao_url" placeholder="https://vestibular.exemplo.com"></label>
            <p class="hint">Botão "Inscrever-se" aparece se houver URL + inscrições abertas.</p>
          </div>
          <div v-show="tab==='extra'" class="tab">
            <label>Descrição (Markdown)<textarea v-model="form.descricao" rows="8" placeholder="Prova de conhecimentos gerais + específicas..."></textarea></label>
          </div>
        </div>
        <footer><button class="btn" @click="close" :disabled="loading">Cancelar</button><button class="btn prim" @click="save" :disabled="loading">{{loading?'Salvando...':(editing?'Atualizar':'Criar')}}</button></footer>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.overlay { position:fixed; inset:0; background:rgba(28,28,34,.6); backdrop-filter:blur(4px); display:flex; align-items:center; justify-content:center; padding:1rem; z-index:2000; animation:fi .2s }
@keyframes fi { from{opacity:0} to{opacity:1} }
.box { background:#fff; border-radius:16px; width:100%; max-width:680px; max-height:90vh; overflow:hidden; display:flex; flex-direction:column; box-shadow:0 24px 48px rgba(28,28,34,.2); animation:su .25s }
@keyframes su { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
header { display:flex; justify-content:space-between; align-items:center; padding:1.25rem 1.5rem; border-bottom:1px solid #eeeef0 }
header h2 { margin:0; font-size:1.15rem; color:#1c1c22 }
.x { width:36px; height:36px; border-radius:50%; border:none; background:#f7f7f8; color:#5d5d6b; font-size:1.5rem; cursor:pointer; display:flex; align-items:center; justify-content:center }
.x:hover { background:#fee2e2; color:#9e1f2e }
.tabs { display:flex; gap:.25rem; padding:0 1.5rem .5rem; border-bottom:1px solid #eeeef0; overflow-x:auto }
.tb { padding:.5rem 1rem; border:none; background:none; color:#5d5d6b; font-weight:600; font-size:.8rem; border-radius:8px 8px 0 0; cursor:pointer; white-space:nowrap }
.tb:hover { background:#fdfaf4; color:#7a0f1a }
.tb.on { background:#fff; color:#7a0f1a; border-bottom:2px solid #7a0f1a; margin-bottom:-1px }
.body { flex:1; overflow:auto; padding:1.5rem }
.tab { animation:fi .15s }
.err { background:#fef2f2; border:1px solid #fecaca; color:#991b1b; padding:.75rem 1rem; border-radius:10px; margin-bottom:1rem; font-size:.85rem }
label { display:flex; flex-direction:column; gap:.4rem; margin-bottom:1.25rem; font-size:.8rem; font-weight:600; color:#41414a }
label > span { margin-bottom:.4rem }
input, select, textarea { padding:.65rem .85rem; border:1px solid #eeeef0; border-radius:10px; font:inherit; font-size:.9rem; color:#1c1c22; background:#fdfaf4; transition:border-color .15s,background .15s,box-shadow .15s }
input:focus, select:focus, textarea:focus { outline:none; border-color:#9e1f2e; background:#fff; box-shadow:0 0 0 3px rgba(158,31,46,.1) }
textarea { resize:vertical; min-height:100px }
.row { display:grid; grid-template-columns:1fr 1fr; gap:1rem }
.rad { display:flex; flex-direction:column; gap:.5rem }
.rad label { display:flex; align-items:center; gap:.5rem; padding:.75rem 1rem; border:1px solid #eeeef0; border-radius:10px; cursor:pointer; background:#fdfaf4; margin:0 }
.rad label:hover { border-color:#e8e8ed }
.rad input:checked + span { color:#7a0f1a }
.rad input { accent-color:#7a0f1a; width:18px; height:18px }
.hint { font-size:.75rem; color:#91919f; line-height:1.6; margin:.5rem 0 0; padding:.75rem; background:#fdfaf4; border-radius:8px; border:1px solid #f7f7f8 }
footer { display:flex; justify-content:flex-end; gap:.75rem; padding:1rem 1.5rem; border-top:1px solid #eeeef0; background:#faf6ef }
.btn { padding:.65rem 1.5rem; border-radius:999px; font-weight:600; font-size:.85rem; cursor:pointer; transition:all .15s; border:none }
.btn { background:transparent; color:#5d5d6b; border:1px solid #eeeef0 }
.btn:hover:not(:disabled) { background:#f7f7f8; color:#1c1c22 }
.btn.prim { background:linear-gradient(135deg,#7a0f1a,#9e1f2e); color:#fff }
.btn.prim:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 6px 16px rgba(122,15,26,.3) }
.btn:disabled { opacity:.5; cursor:not-allowed }
@media (max-width:640px) { .box{max-height:95vh;border-radius:16px 16px 0 0} .row{grid-template-columns:1fr} .body{padding:1rem} header,footer{padding:1rem} .tabs{padding:0 1rem .5rem} }
</style>