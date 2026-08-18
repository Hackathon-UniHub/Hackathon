<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const username = ref('')
const fullName = ref(authStore.user?.user_metadata?.full_name || '')
const errorMsg = ref('')
const loading = ref(false)

async function handleSubmit() {
  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.createProfile({
      username: username.value,
      full_name: fullName.value,
    })
    router.push('/')
  } catch {
    errorMsg.value = 'Erro ao salvar perfil. O username pode já estar em uso.'
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="complete-profile">
    <h1>Complete seu cadastro</h1>
    <form @submit.prevent="handleSubmit">
      <input class="dados" v-model="fullName" placeholder="Nome completo" required />
      <input class="dados" v-model="username" placeholder="Nome de usuário" required />
      <button type="submit" :disabled="loading">
        {{ loading ? 'Salvando...' : 'Salvar' }}
      </button>
    </form>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.complete-profile {
  max-width: 320px;
  margin: 80px auto;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

input {
  padding: 10px;
  border-radius: 6px;
  border: 1px solid #ccc;
}
button {
  padding: 10px;
  border-radius: 6px;
  border: none;
  background: #4f46e5;
  color: white;
  cursor: pointer;
}
input.dados{
  background: rgba(255, 255, 255, 0.15); /* Fundo translúcido */
  backdrop-filter: blur(12px) saturate(150%);
  -webkit-backdrop-filter: blur(12px) saturate(150%);

  /* Aplicação da distorção do SVG para simular o líquido */
  filter: url(#glass-distortion);

  border: 1px solid rgba(255, 255, 255, 0.3);
  border-radius: 16px;
  box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.2);

  padding: 24px;
  color: #fff;
}

.error {
  color: red;
  font-size: 14px;
  margin-top: 8px;
}
</style>
