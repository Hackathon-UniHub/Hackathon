<script setup></script>

<template>
  <footer>
    <div class="container">
      <nav>
        <ul>
          <li>
            <RouterLink><img src="" alt="Instagram" /></RouterLink>
          </li>
          <li>
            <RouterLink><img src="" alt="X" /></RouterLink>
          </li>
          <li>
            <RouterLink><img src="" alt="TikTok" /></RouterLink>
          </li>
        </ul>
      </nav>
      <div class="contato">
        <h2>Nos contate para mais informaões!</h2>
        <p>+55 47 99708-5431</p>
      </div>
      <div class="copyright">
        <p>&copy; 2026 UniHub - Todos os direitos reservados.</p>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: black;
}
.container nav {
  text-align: center;
}
.container nav ul {
  display: flex;
}
a {
  text-decoration: none;
}
</style>
