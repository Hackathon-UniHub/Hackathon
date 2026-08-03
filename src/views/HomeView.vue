<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="home">
    <h1>Bem-vindo, {{ authStore.profile?.full_name || authStore.user?.email }}!</h1>
    <button @click="authStore.logout()">Sair</button>
  </div>
</template>

<style scoped>
.home {
  max-width: 500px;
  margin: 80px auto;
  text-align: center;
}

button {
  margin-top: 16px;
  padding: 10px 20px;
  border-radius: 6px;
  border: none;
  background: #ef4444;
  color: white;
  cursor: pointer;
}
</style>
