<script setup>
import { ref, computed, onMounted } from 'vue'
import { useComentariosStore } from '@/stores/comentarios'
import { useAuthStore } from '@/stores/auth'

const props = defineProps({ vestibularId: Number, contagem: Number })
const store = useComentariosStore()
const auth = useAuthStore()
const open = ref(false)
const newComment = ref('')
const replyingTo = ref(null)
const replyText = ref({})
const loading = ref(false)
const error = ref(null)

const comments = computed(() => store.getByVest(props.vestibularId))
const total = computed(() => { let t = comments.value.length; comments.value.forEach(c => t += c.respostas?.length || 0); return t })

onMounted(() => store.init())

function fmt(d) { const diff = Date.now() - new Date(d); const m = Math.floor(diff/6e4), h = Math.floor(diff/36e5), d_ = Math.floor(diff/864e5); return m<1?'agora':m<60?m+'min':h<24?h+'h':d_<7?d_+'d':new Date(d).toLocaleDateString('pt-BR') }
function init(n) { return n.split(' ').map(x=>x[0]).join('').toUpperCase().slice(0,2) }
function isProf(c) { return auth.isProfessor && auth.professorUniversidadeId === c.user_universidade_id && c.user_tipo === 'professor' }

async function sendComment() {
  if (!newComment.value.trim() || !auth.isLoggedIn) { error.value = 'Faça login para comentar'; setTimeout(()=>error.value=null,3e3); return }
  loading.value = true
  try { await store.criarComentario(props.vestibularId, newComment.value.trim()); newComment.value = '' } catch { error.value = 'Erro ao comentar' } finally { loading.value = false }
}

async function sendReply(cid) {
  const txt = replyText.value[cid]?.trim()
  if (!txt) return
  const isOficial = auth.isProfessor && auth.professorUniversidadeId === comments.value.find(c=>c.id===cid)?.user_universidade_id
  loading.value = true
  try { await store.criarResposta(cid, txt, isOficial); replyText.value[cid] = ''; replyingTo.value = null } catch { /* ignore */ } finally { loading.value = false }
}

async function delComment(id) { if (confirm('Excluir?')) { try { await store.remover(id) } catch { error.value='Erro'; setTimeout(()=>error.value=null,3e3) } } }
async function delReply(cid, rid) { if (confirm('Excluir?')) { try { await store.removerResposta(cid, rid) } catch { error.value='Erro'; setTimeout(()=>error.value=null,3e3) } } }

function canDel(c) { return store.podeModerar(c) || store.podeEditar(c) }
</script>

<template>
  <div class="comments">
    <button class="toggle" @click="open=!open" :aria-expanded="open">
      <span class="ico">{{ open ? '▲' : '▼' }}</span>
      <span>💬 {{ total }} comentário{{ total!==1?'s':'' }}</span>
    </button>
    <div class="content" v-show="open">
      <div class="list" v-if="comments.length">
        <article v-for="c in comments" :key="c.id" class="card">
          <header class="head">
            <div class="author" :class="{ prof: isProf(c) }">
              <span class="av">{{ init(c.user_nome) }}</span>
              <div>
                <div class="name">{{ c.user_nome }}</div>
                <div class="meta">
                  <span v-if="isProf(c)" class="tag prof">🏫 Professor da casa</span>
                  <span v-else-if="c.user_tipo==='professor'" class="tag prof">👨‍🏫 Professor</span>
                  <span v-else class="tag est">🎓 Estudante</span>
                  <span class="time">{{ fmt(c.criado_em) }}</span>
                </div>
              </div>
            </div>
            <button v-if="canDel(c)" class="del" @click="delComment(c.id)" title="Excluir">🗑️</button>
          </header>
          <p class="txt">{{ c.conteudo }}</p>
          <footer class="foot">
            <button class="reply" @click="replyingTo=c.id" :disabled="!auth.isLoggedIn">Responder</button>
          </footer>
          <div v-if="replyingTo===c.id" class="reply-form">
            <textarea v-model="replyText[c.id]" placeholder="Sua resposta..." rows="2" @keydown.enter.exact="sendReply(c.id)"></textarea>
            <div class="rb"><button class="btn" @click="replyingTo=null">Cancelar</button><button class="btn prim" @click="sendReply(c.id)" :disabled="loading">{{loading?'Enviando...':'Responder'}}</button></div>
          </div>
          <div class="replies" v-if="c.respostas?.length">
            <div v-for="r in c.respostas" :key="r.id" class="reply">
              <div class="rh">
                <span class="av sm">{{ init(r.user_nome) }}</span>
                <div>
                  <div class="name">{{ r.user_nome }}</div>
                  <div class="meta">
                    <span v-if="r.is_oficial" class="tag off">✅ Oficial</span>
                    <span v-else-if="isProf({user_universidade_id:r.user_universidade_id,user_tipo:r.user_tipo})" class="tag prof">🏫 Professor da casa</span>
                    <span v-else-if="r.user_tipo==='professor'" class="tag prof">👨‍🏫 Professor</span>
                    <span v-else class="tag est">🎓 Estudante</span>
                    <span class="time">{{ fmt(r.criado_em) }}</span>
                  </div>
                </div>
                <button v-if="r.user_id===auth.user?.id" class="del" @click="delReply(c.id, r.id)">🗑️</button>
              </div>
              <p class="txt">{{ r.conteudo }}</p>
            </div>
          </div>
        </article>
      </div>
      <div v-else class="empty">Nenhum comentário ainda. Seja o primeiro! 👇</div>
      <div v-if="auth.isLoggedIn" class="new">
        <textarea v-model="newComment" placeholder="Escreva seu comentário..." rows="3" @keydown.enter.exact="sendComment"></textarea>
        <div class="nb"><span v-if="error" class="err">{{error}}</span><button class="btn prim" @click="sendComment" :disabled="loading||!newComment.trim()">{{loading?'Publicando...':'Comentar'}}</button></div>
      </div>
      <div v-else class="login">🔒 <a href="/login">Faça login</a> para participar.</div>
    </div>
  </div>
</template>

<style scoped>
.comments { margin-top:1.25rem; padding-top:1.25rem; border-top:1px solid #f7f7f8 }
.toggle { display:flex; align-items:center; justify-content:center; gap:.5rem; width:100%; padding:.5rem 1rem; background:#fdfaf4; border:1px solid #eeeef0; border-radius:999px; font-size:.85rem; font-weight:600; color:#41414a; cursor:pointer }
.toggle:hover { background:#f5efe9; color:#7a0f1a }
.ico { font-size:.7rem; transition:transform .2s }
.content { margin-top:1rem; animation:slide .2s }
@keyframes slide { from{opacity:0;transform:translateY(-8px)} to{opacity:1;transform:translateY(0)} }
.list { display:flex; flex-direction:column; gap:1rem }
.card { background:#fff; border:1px solid #eeeef0; border-radius:12px; padding:1rem }
.head { display:flex; justify-content:space-between; gap:1rem; margin-bottom:.75rem; flex-wrap:wrap }
.author { display:flex; gap:.75rem; flex:1 }
.author.prof { background:linear-gradient(90deg,rgba(122,15,26,.05),transparent); padding:.5rem; margin:-.5rem -.5rem .5rem -.5rem; border-radius:8px 8px 0 0; border-left:3px solid #7a0f1a }
.av { width:36px; height:36px; border-radius:50%; background:linear-gradient(135deg,#7a0f1a,#9e1f2e); color:#fff; display:flex; align-items:center; justify-content:center; font-weight:700; font-size:.85rem; flex-shrink:0 }
.av.sm { width:28px; height:28px; font-size:.7rem }
.name { font-weight:600; font-size:.9rem; color:#1c1c22 }
.meta { display:flex; align-items:center; gap:.5rem; flex-wrap:wrap }
.time { font-size:.7rem; color:#91919f }
.tag { font-size:.6rem; font-weight:700; padding:.15rem .5rem; border-radius:999px }
.tag.prof { background:#f3e8ff; color:#6b21a8 }
.tag.est { background:#e0e7ff; color:#3730a3 }
.tag.off { background:#dcfce7; color:#166534 }
.del { background:none; border:none; cursor:pointer; font-size:.9rem; padding:.25rem; border-radius:6px; opacity:.5 }
.del:hover { opacity:1; background:#fee2e2 }
.txt { margin:0 0 .75rem; color:#41414a; line-height:1.6; font-size:.9rem }
.foot { display:flex; justify-content:flex-end; margin-bottom:.75rem }
.reply { background:none; border:none; color:#7a0f1a; font-size:.8rem; font-weight:600; cursor:pointer; padding:.25rem .5rem; border-radius:6px }
.reply:hover { background:#f9e8e9 }
.reply:disabled { color:#91919f; cursor:not-allowed }
.reply-form { padding:.75rem; background:#fdfaf4; border:1px solid #eeeef0; border-radius:8px; margin-top:.5rem }
.reply-form textarea { width:100%; padding:.5rem; border:1px solid #eeeef0; border-radius:8px; font-family:inherit; font-size:.85rem; resize:vertical; box-sizing:border-box }
.reply-form textarea:focus { border-color:#9e1f2e; background:#fff }
.rb { display:flex; justify-content:flex-end; gap:.5rem; margin-top:.5rem }
.replies { margin-top:1rem; padding-left:1.5rem; border-left:2px solid #f2ede4; display:flex; flex-direction:column; gap:.75rem }
.reply { background:#faf6ef; border:1px solid #eeeef0; border-radius:10px; padding:.75rem }
.rh { display:flex; align-items:center; justify-content:space-between; gap:.5rem; margin-bottom:.5rem; flex-wrap:wrap }
.replies .txt { margin:0; color:#41414a; line-height:1.5; font-size:.85rem }
.empty { text-align:center; padding:2rem; color:#91919f; font-size:.9rem }
.new { margin-top:1.5rem; padding-top:1.5rem; border-top:1px solid #f7f7f8 }
.new textarea { width:100%; padding:.75rem; border:1px solid #eeeef0; border-radius:10px; font-family:inherit; font-size:.9rem; resize:vertical; box-sizing:border-box }
.new textarea:focus { border-color:#9e1f2e; background:#fff }
.nb { display:flex; justify-content:space-between; margin-top:.75rem; flex-wrap:wrap; gap:.5rem }
.err { color:#9e1f2e; font-size:.8rem }
.btn { padding:.5rem 1.25rem; border-radius:999px; font-weight:600; font-size:.85rem; cursor:pointer; transition:all .15s; border:none }
.btn.prim { background:linear-gradient(135deg,#7a0f1a,#9e1f2e); color:#fff }
.btn.prim:hover:not(:disabled) { transform:translateY(-1px); box-shadow:0 4px 12px rgba(122,15,26,.3) }
.btn.prim:disabled { opacity:.5; cursor:not-allowed }
.login { margin-top:1.5rem; padding:1.5rem; background:#fdfaf4; border:1px dashed #eeeef0; border-radius:10px; text-align:center; color:#5d5d6b; font-size:.9rem }
.login a { color:#7a0f1a; font-weight:600 }
@media (max-width:640px) { .head{flex-direction:column;align-items:flex-start} .del{align-self:flex-end} .replies{padding-left:1rem} .nb{flex-direction:column-reverse;align-items:stretch} .btn.prim{width:100%} }
</style>
