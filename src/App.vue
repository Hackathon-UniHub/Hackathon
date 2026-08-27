<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <div class="cabecalhoReserva">
    <AppHeader />
  </div>
  <main>
    <RouterView />
  </main>
  <AppFooter />
</template>

<style scoped>
.cabecalhoReserva {
  height: 76px;
}

/* === RESPONSIVO === */
@media (max-width: 768px) {
  .cabecalhoReserva {
    height: 140px;
  }
}

@media (max-width: 480px) {
  .cabecalhoReserva {
    height: 190px;
  }
}
</style>
