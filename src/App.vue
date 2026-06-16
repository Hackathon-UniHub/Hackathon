<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { RouterView } from 'vue-router' // Importe o RouterView aqui
</script>

<template>
  <AppHeader />
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped></style>
