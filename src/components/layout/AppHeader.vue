<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <div class="logo">
        <RouterLink><img src="../icons/UniHub.png" alt="Logo UniHub" /></RouterLink>
      </div>
      <nav>
        <ul>
          <li><RouterLink>Home</RouterLink></li>
          <li><RouterLink>Favoritos</RouterLink></li>
          <li><RouterLink>Sobre Nós</RouterLink></li>
          <li><span class="nav-border"><RouterLink>Explore pelo Mapa!</RouterLink></span></li>
        </ul>
        <div class="login">
          <ul>
            <li><RouterLink>Entrar</RouterLink></li>
            <li><span class="login-border"><RouterLink>Criar Conta</RouterLink></span></li>
          </ul>
        </div>
      </nav>
    </div>
  </header>
</template>

<style scoped>
  header {
    background-color: white;
  }
  header .container {
    display: flex;
    justify-content: space-between;
  }
  header .container nav {
    display: flex;
    justify-content: space-between;
  }
</style>
