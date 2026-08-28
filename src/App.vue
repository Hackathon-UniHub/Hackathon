<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { RouterView } from 'vue-router'
import { computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const ocultarLayout = computed(() => route.meta.hideLayout === true)
</script>

<template>
  <div v-if="!ocultarLayout" class="cabecalhoReserva">
    <AppHeader />
  </div>
  <main>
    <RouterView />
  </main>
  <AppFooter v-if="!ocultarLayout" />
</template>

<style scoped>
.cabecalhoReserva {
  height: 76px;
}

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
