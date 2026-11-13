<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import universidades from '@/data/universidades.js'

const auth = useAuthStore()
const router = useRouter()
const profile = ref(null)
const fullName = ref('')
const universidadeId = ref('')
const loading = ref(true)
const saving = ref(false)
const deleting = ref(false)
const error = ref('')
const success = ref('')
const profileRemoved = ref(false)

async function carregarPerfil() {
  loading.value = true
  error.value = ''

  try {
    const profiles = await auth.listProfiles()
    const ownProfile = profiles.find(
      (item) =>
        item.auth_user_id === auth.user?.id &&
        item.id === auth.profile?.id,
    )
    if (!ownProfile) {
      error.value = 'Seu perfil não foi encontrado na API.'
      return
    }

    profile.value = await auth.getProfileById(ownProfile.id)
    fullName.value = profile.value.full_name
    universidadeId.value = profile.value.universidade_id == null
      ? ''
      : String(profile.value.universidade_id)
  } catch (requestError) {
    error.value = requestError.message || 'Não foi possível carregar seu perfil.'
  } finally {
    loading.value = false
  }
}

async function salvarPerfil() {
  if (!fullName.value.trim()) {
    error.value = 'Informe seu nome.'
    return
  }

  if (profile.value?.tipo_usuario === 'professor' && !universidadeId.value) {
    error.value = 'Selecione sua universidade.'
    return
  }

  saving.value = true
  error.value = ''
  success.value = ''

  try {
    const updates = { full_name: fullName.value.trim() }
    if (profile.value.tipo_usuario === 'professor') {
      updates.universidade_id = Number(universidadeId.value)
    }
    profile.value = await auth.updateProfile(updates)
    fullName.value = profile.value.full_name
    universidadeId.value = profile.value.universidade_id == null
      ? ''
      : String(profile.value.universidade_id)
    success.value = 'Perfil atualizado com sucesso.'
  } catch (requestError) {
    error.value = requestError.message || 'Não foi possível atualizar seu perfil.'
  } finally {
    saving.value = false
  }
}

async function excluirPerfil() {
  if (!window.confirm('Excluir seu perfil do UniHub? Sua conta e senha do Supabase continuarão ativas.')) {
    return
  }

  deleting.value = true
  error.value = ''

  try {
    await auth.deleteProfile()
    profileRemoved.value = true
    profile.value = null
    success.value = 'Perfil excluído. Sua conta de autenticação continua ativa.'
    try {
      await auth.logout()
    } catch (logoutError) {
      error.value = `Perfil excluído, mas não foi possível encerrar a sessão: ${logoutError.message}`
    }
  } catch (requestError) {
    error.value = requestError.message || 'Não foi possível excluir seu perfil.'
  } finally {
    deleting.value = false
  }
}

onMounted(carregarPerfil)
</script>

<template>
  <main class="conta-page">
    <section class="conta-card">
      <h1>Meu perfil</h1>
      <p class="descricao">
        Os dados de perfil são armazenados na API do UniHub. A senha e a autenticação continuam no
        Supabase.
      </p>

      <p v-if="loading" class="mensagem" role="status">Carregando perfil...</p>
      <p v-else-if="error" class="mensagem erro" role="alert">{{ error }}</p>
      <p v-if="success" class="mensagem sucesso" role="status">{{ success }}</p>

      <template v-if="profile && !profileRemoved">
        <form @submit.prevent="salvarPerfil">
          <label for="profile-name">Nome completo</label>
          <input id="profile-name" v-model="fullName" type="text" required maxlength="120" />

          <label for="profile-email">Email da conta</label>
          <input id="profile-email" :value="auth.user?.email" type="email" disabled />

          <label for="profile-role">Tipo de usuário</label>
          <input id="profile-role" :value="profile.tipo_usuario" type="text" disabled />

          <template v-if="profile.tipo_usuario === 'professor'">
            <label for="profile-university">Universidade vinculada</label>
            <select
              id="profile-university"
              v-model="universidadeId"
              required
              :disabled="saving || deleting"
            >
              <option value="" disabled>Selecione sua universidade</option>
              <option
                v-for="universidade in universidades"
                :key="universidade.id"
                :value="String(universidade.id)"
              >
                {{ universidade.sigla }} - {{ universidade.nome }}
              </option>
            </select>
          </template>

          <button type="submit" :disabled="saving || deleting">
            {{ saving ? 'Salvando...' : 'Salvar alterações' }}
          </button>
        </form>

        <div class="acoes-exclusao">
          <h2>Excluir perfil</h2>
          <p>Isso remove os dados do perfil da API, mas não exclui sua conta de autenticação.</p>
          <button
            class="botao-excluir"
            type="button"
            :disabled="deleting || saving"
            @click="excluirPerfil"
          >
            {{ deleting ? 'Excluindo...' : 'Excluir meu perfil' }}
          </button>
        </div>
      </template>

      <button v-if="profileRemoved" class="botao-voltar" type="button" @click="router.push('/')">
        Voltar ao início
      </button>
    </section>
  </main>
</template>

<style scoped>
.conta-page {
  min-height: calc(100vh - 150px);
  padding: 48px 20px;
  background: #f7f7f7;
}

.conta-card {
  width: min(100%, 560px);
  margin: 0 auto;
  padding: 32px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0 8px 28px #00000012;
}

h1,
h2 {
  color: #2c0102;
}

h1 {
  margin-top: 0;
}

.descricao,
.acoes-exclusao p {
  color: #555;
  line-height: 1.5;
}

form {
  display: grid;
  gap: 10px;
  margin-top: 24px;
}

label {
  margin-top: 8px;
  font-weight: 600;
}

input,
select {
  box-sizing: border-box;
  width: 100%;
  min-height: 42px;
  padding: 8px 12px;
  border: 1px solid #ccc;
  border-radius: 8px;
  font: inherit;
}

select {
  height: 42px;
  background-color: #fff;
  color: #2c0102;
  cursor: pointer;
}

input:disabled,
select:disabled {
  background: #f0f0f0;
}

select:disabled {
  cursor: wait;
}

button {
  min-height: 42px;
  padding: 8px 16px;
  border: 0;
  border-radius: 8px;
  background: #920205;
  color: #fff;
  font: inherit;
  font-weight: 600;
  cursor: pointer;
}

button:disabled {
  cursor: wait;
  opacity: 0.65;
}

form button {
  margin-top: 12px;
}

.acoes-exclusao {
  margin-top: 32px;
  padding-top: 20px;
  border-top: 1px solid #e4e4e4;
}

.acoes-exclusao h2 {
  margin: 0;
  font-size: 1.1rem;
}

.botao-excluir {
  background: #8d1c1c;
}

.mensagem {
  margin: 16px 0;
}

.erro {
  color: #a00000;
}

.sucesso {
  color: #176b36;
}

@media (max-width: 520px) {
  .conta-card {
    padding: 24px 18px;
  }
}
</style>
