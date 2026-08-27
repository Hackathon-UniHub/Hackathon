<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const authStore = useAuthStore()
const errorMsg = ref('Error. Por favor tente novamente mais tarde.')

async function handleGoogleLogin() {
  try {
    await authStore.loginWithGoogle()
  } catch (error) {
    errorMsg.value = 'Erro ao fazer login com Google. Tente novamente.'
    console.error(error)
  }
}
</script>

<template>
  <div class="login-container">
    <h1>Entrar</h1>
    <button class="google-btn" @click="handleGoogleLogin">Entrar com Google</button>
    <p v-if="errorMsg" class="error">{{ errorMsg }}</p>
  </div>
</template>

<style scoped>
.login-container {
  max-width: 320px;
  margin: 80px auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.google-btn {
  padding: 12px 20px;
  border-radius: 6px;
  border: 1px solid #ccc;
  background: white;
  cursor: pointer;
  font-weight: 600;
}

.google-btn:hover {
  background: #f5f5f5;
}

.error {
  color: red;
  font-size: 14px;
}
</style>
