<script>
export default {
  name: 'ErroView',
}
</script>

<template>
  <div class="paginaErro">
    <div class="conteudoErro">
      <h1 class="codigoStatus">404</h1>
      <h2 class="tituloPrincipal">Página não encontrada</h2>

      <p class="textoDescritivo">
        Parece que você tentou acessar uma página que não existe no
        <span class="textoDestacado">UniHub</span>. Volte ao início e explore nossas universidades.
      </p>

      <div class="grupoBotoes">
        <RouterLink to="/" class="botao botaoPrimario">Voltar ao Início</RouterLink>
        <RouterLink to="/explorar" class="botao botaoSecundario">Explorar Universidades</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
.paginaErro {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--cream-50) 0%, var(--cream-100) 100%);
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.conteudoErro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.codigoStatus {
  font-size: 120px;
  font-weight: 800;
  color: var(--brand-700);
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.tituloPrincipal {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-900);
  margin-bottom: 20px;
  line-height: 1.2;
}

.textoDescritivo {
  font-size: 16px;
  color: var(--ink-600);
  line-height: 1.6;
  margin-bottom: 32px;
}

.textoDestacado {
  font-weight: 700;
  color: var(--brand-700);
}

.grupoBotoes {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  min-width: 160px;
}

.botaoPrimario {
  background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-500) 100%);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(122, 15, 26, 0.2);
}

.botaoPrimario:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(122, 15, 26, 0.3);
}

.botaoSecundario {
  background: #ffffff;
  color: var(--brand-700);
  border: 2px solid var(--brand-700);
  box-shadow: 0 4px 12px rgba(122, 15, 26, 0.08);
}

.botaoSecundario:hover {
  background: var(--cream-100);
  transform: translateY(-2px);
}

.botao:active {
  transform: scale(0.97);
}

@media (max-width: 480px) {
  .codigoStatus {
    font-size: 80px;
  }

  .tituloPrincipal {
    font-size: 24px;
  }

  .grupoBotoes {
    flex-direction: column;
    width: 100%;
    gap: 12px;
  }

  .botao {
    width: 100%;
  }
}
</style>
