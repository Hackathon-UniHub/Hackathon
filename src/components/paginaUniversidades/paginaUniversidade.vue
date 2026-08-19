<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { UniversidadePorId } from '@/utils/universidadesUtils.js'

const route = useRoute()
const universidade = computed(() => UniversidadePorId(route.params.id))
</script>

<template>
  <div class="paginaUniversidade">
    <div v-if="universidade">
      <h1>{{ universidade.nome }}</h1>
      <!-- pronto para adicionar outros campos do objeto -->
    </div>
    <div v-else>
      <p>Universidade não encontrada.</p>
    </div>
  </div>
</template>

<style scoped>
.paginaUniversidade {
  padding: 2rem;
}
</style>
