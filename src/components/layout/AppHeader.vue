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
          <li>
            <span class="nav-border"><RouterLink>Explore pelo Mapa!</RouterLink></span>
          </li>
        </ul>
      </nav>

      <div class="login">
        <ul>
          <li><RouterLink>Entrar</RouterLink></li>
          <li>
            <span class="login-border"><RouterLink>Criar Conta</RouterLink></span>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<style scoped>
header {
  background-color: white;
}
.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 2vw;
}
nav ul {
  display: flex;
  align-items: center;
  gap: 2.5vw;
  list-style: none;
  margin: 0;
  padding: 0;
}
nav ul li {
  font-size: 16px;
  font-weight: 500;
}
.login ul {
  display: flex;
  align-items: center;
  gap: 24px;
  list-style: none;
  margin: 0;
  padding: 0;
}
.login ul li {
  font-size: 16px;
  font-weight: 500;
}
.nav-border,
.login-border {
  background-color: #e4c97d;
  padding: 5px 1vw;
  border-radius: 10px;
  display: inline-block;
}
.nav-border:hover,
.login-border:hover {
  cursor: pointer;
  transition: background-color 0.2s;
  background-color: #e4c369;
}
a {
  text-decoration: none;
  color: #000;
  font-size: 1.1rem;
}
a:hover {
  font-weight: 500;
  transition: font-weight 0.1s;
  cursor: pointer;
}
</style>
