<!-- filepath: /home/tempz/Documentos/Hackathon/src/components/layout/AppHeader.vue -->
<script setup>
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="header">
    <div class="container">
      <a class="logo-link" href="/" aria-label="UniHub">
        <img src="../../assets/logo.svg" alt="UniHub" class="logo-image" />
      </a>

      <nav class="nav" aria-label="Navegação principal">
        <RouterLink
          class="nav-link"
          :class="{ active: route.name === 'home' }"
          :to="{ name: 'home' }"
        >
          Home
        </RouterLink>
        <a href="/about" class="nav-link">Sobre</a>
        <a href="/services" class="nav-link">Serviços</a>
        <a href="/contact" class="nav-link">Contato</a>
      </nav>

      <a class="btn" href="/contact">Fale conosco</a>
    </div>
  </header>
</template>

<style scoped>
.header {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.container {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.logo-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
}

.logo-image {
  display: block;
  width: clamp(110px, 10vw, 160px);
  height: auto;
}

.nav {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 28px);
  flex: 1;
}

.nav-link {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding-bottom: 8px;
  color: var(--ink-800);
  text-decoration: none;
  font-size: 0.95rem;
  font-weight: 600;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;
}

.nav-link:hover {
  color: var(--brand-700);
}

.nav-link.active {
  color: var(--brand-700);
}

.nav-link.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--brand-700);
  border-radius: 999px;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.8rem 1.35rem;
  border-radius: 10px;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 700;
  line-height: 1;
  background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-600) 100%);
  color: var(--white);
  box-shadow: 0 8px 18px rgba(122, 15, 26, 0.14);
}

@media (max-width: 768px) {
  .container {
    flex-wrap: wrap;
    justify-content: center;
    padding: 14px 0;
    gap: 12px;
  }

  .nav {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px 18px;
  }
}
</style>
