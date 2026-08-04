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
      <input v-model="fullName" placeholder="Nome completo" required />
      <input v-model="username" placeholder="Nome de usuário" required />
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

.error {
  color: red;
  font-size: 14px;
  margin-top: 8px;
}
</style>
