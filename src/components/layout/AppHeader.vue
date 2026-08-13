<!-- filepath: /home/tempz/Documentos/Hackathon/src/components/layout/AppHeader.vue -->
<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="cabecalho">
    <div class="cabecalho-conteudo">
      <a class="link-logo" href="/" aria-label="UniHub">
        <img src="../../assets/logo.svg" alt="UniHub" class="imagem-logo" />
      </a>

      <nav class="menu-navegacao" aria-label="Navegação principal">
        <RouterLink
          class="link-navegacao"
          :class="{ ativo: route.name === 'home' }"
          :to="{ name: 'home' }"
        >
          Home
        </RouterLink>
        <a href="/mapa" class="link-navegacao">Mapa</a>
        <a href="/explorar" class="link-navegacao">Explorar</a>
        <a href="/como-funciona" class="link-navegacao">Como funciona</a>
      </nav>

      <div class="area-acoes">
        <a class="botao-pesquisa" href="/explorar" aria-label="Explorar">
          <HugeiconsIcon :icon="Search01Icon" :size="22" color="currentColor" :stroke-width="1.8" />
        </a>
        <a class="botao-entrar" href="/entrar">Entrar</a>
        <a class="botao-criar-conta" href="/criar-conta">Criar conta</a>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
}

.cabecalho-conteudo {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.link-logo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  text-decoration: none;
}

.imagem-logo {
  display: block;
  width: clamp(110px, 10vw, 160px);
  height: auto;
}

.menu-navegacao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 28px);
  flex: 1;
}

.link-navegacao {
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

.link-navegacao:hover {
  color: var(--brand-700);
}

.link-navegacao.ativo {
  color: var(--brand-700);
}

.link-navegacao.ativo::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--brand-700);
  border-radius: 999px;
}

.area-acoes {
  display: flex;
  align-items: center;
  gap: 12px;
}

.botao-pesquisa {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: rgba(122, 15, 26, 0.05);
  border: 1px solid rgba(122, 15, 26, 0.12);
  color: var(--brand-700);
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.botao-pesquisa:hover {
  transform: translateY(-1px);
  background: rgba(122, 15, 26, 0.08);
}

.botao-pesquisa svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.botao-entrar,
.botao-criar-conta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 42px;
  padding: 0.8rem 1.2rem;
  border-radius: 10px;
  text-decoration: none;
  white-space: nowrap;
  font-weight: 700;
  line-height: 1;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.botao-entrar {
  background: transparent;
  color: var(--ink-800);
  border: 1px solid transparent;
}

.botao-entrar:hover,
.botao-criar-conta:hover {
  transform: translateY(-1px);
}

.botao-criar-conta {
  background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-600) 100%);
  color: var(--white);
  box-shadow: 0 8px 18px rgba(122, 15, 26, 0.14);
}

@media (max-width: 768px) {
  .cabecalho-conteudo {
    flex-wrap: wrap;
    justify-content: center;
    padding: 14px 0;
    gap: 12px;
  }

  .menu-navegacao {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px 18px;
  }

  .area-acoes {
    width: 100%;
    justify-content: center;
  }
}
</style>
