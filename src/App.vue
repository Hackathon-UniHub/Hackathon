<script setup>
import AppFooter from './components/layout/AppFooter.vue'
import AppHeader from './components/layout/AppHeader.vue'
import { RouterView } from 'vue-router'
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>
