<script setup>
import { computed, onMounted, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useComentariosStore } from '@/stores/comentarios'

const props = defineProps({ vestibularId: Number, universidadeId: Number })
const store = useComentariosStore()
const auth = useAuthStore()
const aberto = ref(false)
const texto = ref('')
const comentarios = computed(() => props.universidadeId
  ? store.getByUniversidade(props.universidadeId)
  : store.getByVest(props.vestibularId))

onMounted(() => store.init())

async function publicar() {
  if (!texto.value.trim()) return

  if (props.universidadeId) {
    await store.criarComentarioUniversidade(props.universidadeId, texto.value.trim())
  } else {
    await store.criarComentario(props.vestibularId, texto.value.trim())
  }
  texto.value = ''
}

async function excluir(id) {
  if (!window.confirm('Excluir este comentário?')) return
  await store.remover(id)
}
</script>

<template>
  <section class="comentarios">
        <button type="button" class="abrir" @click="aberto = !aberto">
      {{ aberto ? 'Ocultar comentários' : 'Ver comentários' }}
    </button>

    <div v-if="aberto" class="conteudo">
      <p v-if="!comentarios.length" class="vazio">Ainda não há comentários.</p>

      <article v-for="comentario in comentarios" :key="comentario.id" class="comentario">
        <div class="cabecalho">
          <strong>{{ comentario.user_nome }}</strong>
          <span>{{ new Date(comentario.criado_em).toLocaleDateString('pt-BR') }}</span>
          <button v-if="store.podeModerar(comentario) || store.podeEditar(comentario)" class="excluir" type="button" @click="excluir(comentario.id)">
            Excluir
          </button>
        </div>
        <p>{{ comentario.conteudo }}</p>
      </article>

      <form v-if="auth.isEstudante || auth.isProfessor" class="formulario" @submit.prevent="publicar">
        <textarea v-model="texto" rows="3" placeholder="Escreva um comentário..."></textarea>
        <button type="submit" :disabled="!texto.trim()">Comentar</button>
      </form>

      <p v-else class="login">Faça login para participar dos comentários.</p>
    </div>
  </section>
</template>

<style scoped>
.comentarios {
  width: 100%;
  flex: 0 0 100%;
  align-self: stretch;
  box-sizing: border-box;
  margin-top: 16px;
  border-top: 1px solid #e5e7eb;
  padding-top: 16px;
}

.abrir {
  width: 100%;
  padding: 10px 14px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  background: #fff;
  color: #374151;
  cursor: pointer;
  font-weight: 600;
}

.conteudo {
  display: grid;
  gap: 12px;
  margin-top: 12px;
}

.comentario,
.formulario {
  padding: 12px;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
}

.cabecalho {
  display: flex;
  align-items: center;
  gap: 8px;
}

.cabecalho span {
  color: #6b7280;
  font-size: 0.8rem;
}

.cabecalho .excluir {
  margin-left: auto;
}

.comentario p {
  margin: 8px 0 0;
  color: #374151;
}

textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 10px;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  resize: vertical;
}

.formulario button,
.excluir {
  border: 0;
  border-radius: 6px;
  padding: 8px 12px;
  cursor: pointer;
}

.formulario button {
  margin-top: 8px;
  background: #7a0f1a;
  color: #fff;
}

.excluir {
  background: #fef2f2;
  color: #991b1b;
  font-size: 0.8rem;
}

.vazio,
.login {
  margin: 0;
  color: #6b7280;
  text-align: center;
}
</style>
