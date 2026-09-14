<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useVestibularesStore } from '@/stores/vestibulares'
import { useAuthStore } from '@/stores/auth'
import { useComentariosStore } from '@/stores/comentarios'
import VestibularForm from '@/components/paginaUniversidades/VestibularForm.vue'
import universidades from '@/data/universidades.js'

const router = useRouter()
const vStore = useVestibularesStore()
const cStore = useComentariosStore()
const auth = useAuthStore()

const modal = ref(false)
const editing = ref(null)
const tab = ref('meus')
const filter = ref('todos')
const loading = ref(false)

const myUni = computed(() => auth.professorUniversidadeId ? universidades.find(u => u.id === auth.professorUniversidadeId) : null)
const mine = computed(() => {
  let l = vStore.getByUniversidade(auth.professorUniversidadeId)
  if (filter.value !== 'todos') l = l.filter(v => v.status === filter.value)
  return l.sort((a,b) => new Date(b.atualizado_em) - new Date(a.atualizado_em))
})
const stats = computed(() => {
  const all = vStore.getByUniversidade(auth.professorUniversidadeId)
  return { total: all.length, pub: all.filter(v=>v.status==='publicado').length, rasc: all.filter(v=>v.status==='rascunho').length, arch: all.filter(v=>v.status==='arquivado').length, views: all.reduce((s,v)=>s+(v.visualizacoes||0),0), com: all.reduce((s,v)=>s+cStore.count(v.id),0) }
})
const labels = { publicado:'Publicado', rascunho:'Rascunho', arquivado:'Arquivado' }
const sClass = { publicado:'pub', rascunho:'rasc', arquivado:'arch' }

onMounted(() => {
  if (!auth.isLoggedIn || !auth.isProfessor) { router.push('/'); return }
  vStore.init(); cStore.init()
})

function status(v) {
  if (v.status !== 'publicado') return { label: labels[v.status], class: 'st-' + sClass[v.status] }
  const now = new Date(); now.setHours(0,0,0,0)
  const ini = v.data_inscricao_inicio ? new Date(v.data_inscricao_inicio) : null
  const fim = v.data_inscricao_fim ? new Date(v.data_inscricao_fim) : null
  const prov = v.data_prova ? new Date(v.data_prova) : null
  ini?.setHours(0,0,0,0); fim?.setHours(23,59,59,999); prov?.setHours(0,0,0,0)
  if (ini && fim && now>=ini && now<=fim) return { label:'🟢 Inscrições Abertas', class:'st-open' }
  if (fim && now>fim && prov && now<prov) return { label:'🔴 Inscrições Encerradas', class:'st-closed' }
  if (prov && now>=prov) { if (v.data_resultado) { const r=new Date(v.data_resultado); r.setHours(0,0,0,0); if (now>=r) return { label:'📊 Resultado', class:'st-res' } } return { label:'📝 Prova Realizada', class:'st-exam' } }
  if (ini && now<ini) { const d=Math.ceil((ini-now)/864e5); return { label:d<=30?'🟡 Em Breve':'⚪ Futuro', class:d<=30?'st-soon':'st-later' } }
  return { label:'⚪ Futuro', class:'st-later' }
}

function fmt(d) { return d ? new Date(d+'T00:00:00').toLocaleDateString('pt-BR') : '—' }

function novo() { editing.value = null; modal.value = true }
function edit(v) { editing.value = v; modal.value = true }
async function dup(v) { if (!confirm('Duplicar?')) return; try { await vStore.criar({...v, nome_vestibular:v.nome_vestibular+' (Cópia)', status:'rascunho', criado_em:new Date().toISOString(), atualizado_em:new Date().toISOString()}) } catch(e) { alert(e.message) } }
async function arch(v) { if (!confirm('Arquivar?')) return; try { await vStore.atualizar(v.id, {status:'arquivado'}) } catch(e) { alert(e.message) } }
async function rest(v) { try { await vStore.atualizar(v.id, {status:'rascunho'}) } catch(e) { alert(e.message) } }
async function del(v) { if (!confirm('Excluir "'+v.nome_vestibular+'"?')) return; try { await vStore.remover(v.id) } catch(e) { alert(e.message) } }
function view(v) { router.push({name:'universidade', params:{id:v.universidade_id}}) }
function saved() { modal.value = false; editing.value = null }
</script>

<template>
  <div class="dash">
    <header>
      <div class="hc">
        <div><h1>🏫 Painel do Professor</h1><p v-if="myUni" class="uni">{{myUni.nome}} ({{myUni.sigla}})</p></div>
        <router-link to="/universidades" class="back">← Ver como estudante</router-link>
      </div>
    </header>
    <div class="stats">
      <div class="sc"><span>{{stats.total}}</span><span>Total</span></div>
      <div class="sc pub"><span>{{stats.pub}}</span><span>Publicados</span></div>
      <div class="sc rasc"><span>{{stats.rasc}}</span><span>Rascunhos</span></div>
      <div class="sc arch"><span>{{stats.arch}}</span><span>Arquivados</span></div>
      <div class="sc"><span>{{stats.views}}</span><span>Visualizações</span></div>
      <div class="sc"><span>{{stats.com}}</span><span>Comentários</span></div>
    </div>
    <div class="toolbar">
      <div class="tabs">
        <button v-for="t in [{id:'meus',l:'Meus Vestibulares'},{id:'coments',l:'Comentários Recentes'}]" :key="t.id" class="tb" :class="{on:tab===t.id}" @click="tab=t.id">{{t.l}}</button>
      </div>
      <div v-if="tab==='meus'" class="filters">
        <select v-model="filter" class="sel"><option value="todos">Todos</option><option value="publicado">🌍 Publicados</option><option value="rascunho">📝 Rascunhos</option><option value="arquivado">📦 Arquivados</option></select>
        <button class="btn" @click="novo">+ Novo</button>
      </div>
    </div>
    <div class="content">
      <div v-if="tab==='meus'">
        <div v-if="mine.length" class="table-wrap">
          <table>
            <thead><tr><th>Vestibular</th><th>Tipo</th><th>Inscrições</th><th>Prova</th><th>Status</th><th>Interações</th><th>Ações</th></tr></thead>
            <tbody>
              <tr v-for="v in mine" :key="v.id" :class="status(v).class">
                <td><div class="vn">{{v.nome_vestibular}}</div><div class="vi">ID: {{v.id}}</div></td>
                <td><span class="tag">{{v.tipo}}</span></td>
                <td v-if="v.data_inscricao_inicio||v.data_inscricao_fim">{{fmt(v.data_inscricao_inicio)}} → {{fmt(v.data_inscricao_fim)}}</td><td v-else class="nd">Não definidas</td>
                <td>{{fmt(v.data_prova)}}</td>
                <td><span class="st" :class="status(v).class">{{status(v).label}}</span><span v-if="v.status!=='publicado'" class="adm">({{labels[v.status]}})</span></td>
                <td><div class="int"><span>👁️ {{v.visualizacoes||0}}</span><span>💬 {{cStore.count(v.id)}}</span></div></td>
                <td>
                  <div class="acts">
                    <button class="a vw" @click="view(v)" title="Ver">👁️</button>
                    <button class="a ed" @click="edit(v)" title="Editar">✏️</button>
                    <button class="a dp" @click="dup(v)" title="Duplicar">📋</button>
                    <button v-if="v.status==='publicado'||v.status==='rascunho'" class="a ar" @click="arch(v)" title="Arquivar">📦</button>
                    <button v-if="v.status==='arquivado'" class="a rs" @click="rest(v)" title="Restaurar">♻️</button>
                    <button class="a dl" @click="del(v)" title="Excluir">🗑️</button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div v-else class="empty">📅<h3>Nenhum vestibular</h3><p>Crie o primeiro para sua instituição.</p><button class="btn big" @click="novo">+ Criar</button></div>
      </div>
      <div v-else>
        <div v-if="cStore.list.length" class="coms">
          <div class="cc" v-for="c in cStore.list.slice(0,20)" :key="c.id">
            <div class="ch"><div class="au"><span class="av">{{c.user_nome.split(' ').map(n=>n[0]).join('').toUpperCase().slice(0,2)}}</span><div><span class="n">{{c.user_nome}}</span><span class="t" :class="c.user_tipo">{{c.user_tipo==='professor'?'👨‍🏫':'🎓'}}</span></div></div><span class="ti">{{new Date(c.criado_em).toLocaleDateString('pt-BR')}}</span></div>
            <p>{{c.conteudo}}</p>
            <div class="cm"><span>{{vStore.getOne(c.vestibular_id)?.nome_vestibular||'ID '+c.vestibular_id}}</span><span>{{c.respostas?.length||0}} respostas</span></div>
          </div>
        </div>
        <div v-else class="empty">💬<h3>Sem comentários</h3><p>Comentários dos estudantes aparecerão aqui.</p></div>
      </div>
    </div>
  </div>
  <VestibularForm v-model="modal" :vestibular="editing" @salvo="saved" />
</template>

<style scoped>
.dash { min-height:100vh; background:#fffcf7; color:#1c1c22 }
header { background:linear-gradient(135deg,#30070c,#121216); color:#fff; padding:2rem 1.5rem }
.hc { max-width:1200px; margin:0 auto; display:flex; justify-content:space-between; align-items:center; gap:1rem; flex-wrap:wrap }
header h1 { margin:0 0 .25rem; font-size:1.75rem }
.uni { margin:0; opacity:.8; font-size:1rem }
.back { display:inline-flex; align-items:center; gap:.5rem; padding:.6rem 1.2rem; border-radius:999px; background:rgba(255,255,255,.1); color:#fff; text-decoration:none; font-weight:600; border:1px solid rgba(255,255,255,.2) }
.back:hover { background:rgba(255,255,255,.2) }
.stats { max-width:1200px; margin:0 auto; padding:1.5rem; display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:1rem }
.sc { background:#fff; border:1px solid #eeeef0; border-radius:14px; padding:1.25rem; text-align:center }
.sc:hover { box-shadow:0 8px 20px rgba(28,28,34,.06) }
.sc.pub { border-left:4px solid #22c55e }
.sc.rasc { border-left:4px solid #9ca3af }
.sc.arch { border-left:4px solid #6b7280 }
.sc span:first-child { display:block; font-size:2rem; font-weight:800; color:#1c1c22; line-height:1 }
.sc span:last-child { display:block; margin-top:.5rem; font-size:.75rem; color:#91919f; text-transform:uppercase; letter-spacing:.05em }
.toolbar { max-width:1200px; margin:0 auto 1.5rem; padding:0 1.5rem; display:flex; flex-direction:column; gap:1rem }
.tabs { display:flex; gap:.5rem; border-bottom:1px solid #eeeef0; padding-bottom:.5rem }
.tb { padding:.5rem 1rem; border:none; background:none; color:#5d5d6b; font-weight:600; font-size:.85rem; border-radius:8px; cursor:pointer }
.tb:hover { background:#fdfaf4; color:#7a0f1a }
.tb.on { background:#fff; color:#7a0f1a; box-shadow:0 2px 8px rgba(28,28,34,.08) }
.filters { display:flex; align-items:center; justify-content:space-between; gap:1rem; flex-wrap:wrap }
.sel { padding:.5rem 1rem; border:1px solid #eeeef0; border-radius:10px; background:#fdfaf4; font-size:.85rem; color:#1c1c22; cursor:pointer }
.sel:focus { outline:none; border-color:#9e1f2e }
.btn { display:inline-flex; align-items:center; gap:.5rem; padding:.6rem 1.2rem; border-radius:999px; background:linear-gradient(135deg,#7a0f1a,#9e1f2e); color:#fff; font-weight:600; font-size:.85rem; border:none; cursor:pointer }
.btn:hover { transform:translateY(-1px); box-shadow:0 6px 16px rgba(122,15,26,.3) }
.btn.big { padding:.85rem 2rem; font-size:1rem }
.content { max-width:1200px; margin:0 auto; padding:0 1.5rem 2rem }
.table-wrap { overflow-x:auto }
table { width:100%; border-collapse:collapse; background:#fff; border:1px solid #eeeef0; border-radius:12px; overflow:hidden }
th,td { padding:1rem; text-align:left; border-bottom:1px solid #eeeef0 }
th { background:#faf6ef; font-weight:700; font-size:.75rem; color:#91919f; text-transform:uppercase; letter-spacing:.05em }
tbody tr:last-child td { border-bottom:none }
tbody tr:hover { background:#fdfaf4 }
tr.st-open td:first-child { border-left:4px solid #22c55e }
tr.st-soon td:first-child { border-left:4px solid #f59e0b }
tr.st-later td:first-child { border-left:4px solid #6366f1 }
tr.st-closed td:first-child { border-left:4px solid #ef4444 }
tr.st-exam td:first-child { border-left:4px solid #8b5cf6 }
tr.st-res td:first-child { border-left:4px solid #06b6d4 }
tr.st-rasc td:first-child { border-left:4px solid #9ca3af }
tr.st-arch td:first-child { border-left:4px solid #6b7280 }
.vn { font-weight:600; color:#1c1c22 }
.vi { font-size:.7rem; color:#91919f; margin-top:.2rem }
.tag { display:inline-block; padding:.2rem .6rem; border-radius:999px; background:#f9e8e9; color:#7a0f1a; font-size:.7rem; font-weight:600 }
.nd { color:#91919f; font-size:.8rem }
.st { display:inline-block; padding:.3rem .7rem; border-radius:999px; font-size:.7rem; font-weight:700 }
.st.st-open { background:#dcfce7; color:#166534 }
.st.st-soon { background:#fef3c7; color:#92400e }
.st.st-later { background:#e0e7ff; color:#3730a3 }
.st.st-closed { background:#fee2e2; color:#991b1b }
.st.st-exam { background:#f3e8ff; color:#6b21a8 }
.st.st-res { background:#cffafe; color:#155e75 }
.st.st-rasc { background:#f3f4f6; color:#374151 }
.st.st-arch { background:#f3f4f6; color:#374151 }
.adm { display:block; font-size:.65rem; color:#91919f; margin-top:.2rem }
.int { display:flex; flex-direction:column; gap:.2rem; font-size:.8rem; color:#5d5d6b }
.acts { display:flex; gap:.35rem; flex-wrap:wrap }
.a { width:32px; height:32px; border-radius:8px; border:none; background:#f7f7f8; cursor:pointer; font-size:.9rem; display:flex; align-items:center; justify-content:center; transition:all .15s }
.a:hover { background:#eeeef0; transform:scale(1.05) }
.a.vw:hover { background:#dcfce7 }
.a.ed:hover { background:#e0e7ff }
.a.dp:hover { background:#fef3c7 }
.a.ar:hover { background:#f3f4f6 }
.a.rs:hover { background:#dcfce7 }
.a.dl:hover { background:#fee2e2 }
.coms { display:flex; flex-direction:column; gap:1rem }
.cc { background:#fff; border:1px solid #eeeef0; border-radius:12px; padding:1rem }
.ch { display:flex; justify-content:space-between; margin-bottom:.5rem }
.ch .au { display:flex; align-items:center; gap:.5rem }
.ch .av { width:32px; height:32px; border-radius:50%; background:linear-gradient(135deg,#7a0f1a,#9e1f2e); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.75rem }
.n { font-weight:600; font-size:.85rem }
.t { font-size:.65rem; padding:.15rem .4rem; border-radius:999px }
.t.professor { background:#f3e8ff; color:#6b21a8 }
.t.estudante { background:#e0e7ff; color:#3730a3 }
.ch .ti { font-size:.75rem; color:#91919f }
.cc p { margin:0 0 .5rem; color:#41414a; line-height:1.5 }
.cm { display:flex; gap:1rem; font-size:.75rem; color:#91919f }
.empty { text-align:center; padding:4rem 2rem; color:#5d5d6b }
.empty h3 { margin:0 0 .5rem; font-size:1.25rem; color:#1c1c22 }
.empty p { margin:0 0 1.5rem; font-size:.95rem }
@media (max-width:900px) { th:nth-child(6),td:nth-child(6),th:nth-child(3),td:nth-child(3){display:none} }
@media (max-width:640px) { .hc{flex-direction:column;align-items:flex-start} .toolbar{padding:0 1rem} .content{padding:0 1rem 2rem} .filters{flex-direction:column;align-items:stretch} .sel,.btn{width:100%} th:nth-child(4),td:nth-child(4){display:none} }
</style>