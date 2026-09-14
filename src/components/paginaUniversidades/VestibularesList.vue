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
const canManage = computed(() => auth.isProfessor && auth.professorUniversidadeId === uniId.value)

onMounted(() => store.init())

function fmt(d) { return d ? new Date(d + 'T00:00:00').toLocaleDateString('pt-BR') : '—' }
function icon(t) { const m = { 'Vestibular Próprio': '🎓', SISU: '🏛️', ENEM: '📝', PAS: '📚' }; return m[t] || '📋' }
</script>

<template>
  <section class="vestibulares" v-if="vestibulares.length">
    <header class="head">
      <h2>📅 Vestibulares Programados</h2>
      <span class="count">{{ vestibulares.length }}</span>
    </header>
    <div class="grid">
      <article v-for="v in vestibulares" :key="v.id" class="card" :class="store.status(v).class">
        <div class="top">
          <div>
            <span class="tag">{{ icon(v.tipo) }} {{ v.tipo }}</span>
            <h3>{{ v.nome_vestibular }}</h3>
          </div>
          <span class="badge" :class="store.status(v).class">{{ store.status(v).label }}</span>
        </div>
        <div class="dates">
          <div v-if="v.data_inscricao_inicio || v.data_inscricao_fim" class="d">
            <span class="lbl">📝 Inscrições</span>
            <span>{{ fmt(v.data_inscricao_inicio) }}<span v-if="v.data_inscricao_fim"> → {{ fmt(v.data_inscricao_fim) }}</span></span>
          </div>
          <div v-if="v.data_prova" class="d"><span class="lbl">📋 Prova</span><span>{{ fmt(v.data_prova) }}</span></div>
          <div v-if="v.data_resultado" class="d"><span class="lbl">📄 Resultado</span><span>{{ fmt(v.data_resultado) }}</span></div>
        </div>
        <div class="actions">
          <a v-if="v.edital_url" :href="v.edital_url" target="_blank" rel="noopener" class="btn link">📄 Edital</a>
          <a v-if="v.inscricao_url && v.data_inscricao_fim && new Date(v.data_inscricao_fim + 'T23:59:59') >= new Date()" :href="v.inscricao_url" target="_blank" rel="noopener" class="btn primary">Inscrever-se</a>
          <button v-if="canManage" class="btn secondary" @click="$emit('editar', v)">✏️ Editar</button>
        </div>
        <ComentariosSection :vestibular-id="v.id" :contagem="store.count ? store.count(v.id) : 0" />
      </article>
    </div>
  </section>
  <section class="vestibulares empty" v-else>
    <div class="empty">📅<p>Nenhum vestibular programado.</p><p class="hint">Professores cadastrados podem adicionar pelo painel.</p></div>
  </section>
</template>

<style scoped>
.vestibulares { background:#faf6ef; border:1px solid #eeeef0; border-radius:16px; padding:1.5rem }
.head { display:flex; justify-content:space-between; align-items:center; margin-bottom:1.5rem; padding-bottom:1rem; border-bottom:1px solid #eeeef0 }
.head h2 { margin:0; font-size:1.1rem; display:flex; gap:.5rem; align-items:center }
.count { background:#f2ede4; color:#91919f; font-size:.75rem; font-weight:700; padding:.25rem .75rem; border-radius:999px }
.grid { display:flex; flex-direction:column; gap:1.25rem }
.card { background:#fff; border:1px solid #eeeef0; border-radius:12px; padding:1.25rem }
.card:hover { box-shadow:0 8px 20px rgba(28,28,34,.06); border-color:#e8e8ed }
.top { display:flex; justify-content:space-between; gap:1rem; margin-bottom:1rem; flex-wrap:wrap; align-items:flex-start }
.tag { display:inline-flex; gap:.35rem; font-size:.7rem; font-weight:600; color:#7a0f1a; background:#f9e8e9; padding:.2rem .6rem; border-radius:999px; margin-bottom:.5rem }
.card h3 { margin:0; font-size:1.05rem; font-weight:600; color:#1c1c22; line-height:1.3 }
.badge { padding:.35rem .75rem; border-radius:999px; font-size:.7rem; font-weight:700; white-space:nowrap; flex-shrink:0 }
.badge.status-aberto { background:#dcfce7; color:#166534 }
.badge.status-breve { background:#fef3c7; color:#92400e }
.badge.status-futuro { background:#e0e7ff; color:#3730a3 }
.badge.status-fechado { background:#fee2e2; color:#991b1b }
.badge.status-prova { background:#f3e8ff; color:#6b21a8 }
.badge.status-resultado { background:#cffafe; color:#155e75 }
.badge.status-rascunho { background:#f3f4f6; color:#374151 }
.badge.status-arquivado { background:#f3f4f6; color:#374151 }
.dates { display:grid; grid-template-columns:repeat(auto-fit,minmax(140px,1fr)); gap:.75rem; margin-bottom:1rem; padding:1rem; background:#fdfaf4; border-radius:10px; border:1px solid #f7f7f8 }
.d { display:flex; flex-direction:column; gap:.2rem }
.lbl { font-size:.65rem; font-weight:600; color:#91919f; text-transform:uppercase; letter-spacing:.04em }
.dates span:last-child { font-size:.85rem; color:#1c1c22; font-weight:500 }
.actions { display:flex; flex-wrap:wrap; gap:.5rem; padding-top:1rem; border-top:1px solid #f7f7f8 }
.btn { display:inline-flex; align-items:center; justify-content:center; gap:.35rem; padding:.5rem 1rem; border-radius:999px; font-size:.8rem; font-weight:600; text-decoration:none; cursor:pointer; transition:all .15s; border:none }
.btn.link { color:#7a0f1a; background:#f9e8e9 } .btn.link:hover { background:#f0d5d7 }
.btn.primary { color:#fff; background:linear-gradient(135deg,#7a0f1a,#9e1f2e) } .btn.primary:hover { transform:translateY(-1px); box-shadow:0 4px 12px rgba(122,15,26,.3) }
.btn.secondary { color:#7a0f1a; background:transparent; border:1px solid #d9b8bc } .btn.secondary:hover { background:#fdf5f5 }
.empty { text-align:center; padding:3rem 2rem; color:#5d5d6b }
.empty p { margin:.5rem 0; font-size:.95rem }
.hint { font-size:.85rem !important; color:#91919f !important }
@media (max-width:640px) { .top { flex-direction:column; align-items:flex-start } .badge { align-self:flex-start } .dates { grid-template-columns:1fr } .actions { flex-direction:column } .btn { width:100% } }
</style>