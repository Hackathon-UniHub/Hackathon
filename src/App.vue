<script setup>
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div id="app">
    <router-view v-if="!authStore.loading" />
    <div v-else class="loading">Carregando...</div>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: system-ui, sans-serif;
}

.loading {
  text-align: center;
  margin-top: 100px;
}
</style>
