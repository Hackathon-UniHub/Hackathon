<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { Search01Icon } from '@hugeicons/core-free-icons'
import { RouterLink, useRoute } from 'vue-router'

const route = useRoute()
</script>

<template>
  <header class="cabecalho">
    <div class="cabecalhoConteudo">
      <RouterLink class="linkLogo" to="/" aria-label="UniHub">
        <img src="../../assets/logo.svg" alt="UniHub" class="imagemLogo" />
      </RouterLink>

      <nav aria-label="Navegação principal">
        <ul class="menuNavegacao">
          <li>
            <RouterLink
              class="linkNavegacao"
              :class="{ ativo: route.name === 'home' }"
              :to="{ name: 'home' }"
            >
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink class="linkNavegacao" :class="{ ativo: route.name === 'mapa' }" to="/mapa">
              Mapa
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="linkNavegacao"
              :class="{ ativo: route.name === 'explorar' }"
              to="/explorar"
            >
              Explorar
            </RouterLink>
          </li>
          <li>
            <RouterLink
              class="linkNavegacao"
              :class="{ ativo: route.name === 'como-funciona' }"
              to="/como-funciona"
            >
              Como funciona
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="areaAcoes">
        <RouterLink class="botaoPesquisa" to="/explorar" aria-label="Explorar">
          <HugeiconsIcon :icon="Search01Icon" :size="22" color="currentColor" :stroke-width="1.8" />
        </RouterLink>
        <RouterLink class="botaoEntrar" to="/entrar">Entrar</RouterLink>
        <RouterLink class="botaoCriarConta" to="/criar-conta">Criar conta</RouterLink>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  position: sticky;
  top: 0;
  z-index: 20;
  background: rgba(255, 255, 255, 0.82);
  backdrop-filter: blur(14px);
  border-bottom: 1px solid rgba(28, 28, 34, 0.08);
}

.cabecalhoConteudo {
  width: min(1200px, calc(100% - 32px));
  margin: 0 auto;
  min-height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
}

.linkLogo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.imagemLogo {
  display: block;
  width: clamp(110px, 10vw, 160px);
  height: auto;
}

.menuNavegacao {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 28px);
  flex: 1;
  list-style: none;
  margin: 0;
  padding: 0;
}

.menuNavegacao li {
  list-style: none;
}

.linkNavegacao {
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

.linkNavegacao:hover {
  color: var(--brand-700);
}

.linkNavegacao.ativo {
  color: var(--brand-700);
}

.linkNavegacao.ativo::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  height: 2px;
  background: var(--brand-700);
  border-radius: 999px;
}

.areaAcoes {
  display: flex;
  align-items: center;
  gap: 12px;
}

.botaoPesquisa {
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

.botaoPesquisa:hover {
  transform: translateY(-1px);
  background: rgba(122, 15, 26, 0.08);
}

.botaoPesquisa svg {
  width: 18px;
  height: 18px;
  stroke: currentColor;
  fill: none;
  stroke-width: 2;
  stroke-linecap: round;
  stroke-linejoin: round;
}

.botaoEntrar,
.botaoCriarConta {
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

.botaoEntrar {
  background: transparent;
  color: var(--ink-800);
  border: 1px solid transparent;
}

.botaoEntrar:hover,
.botaoCriarConta:hover {
  transform: translateY(-1px);
}

.botaoCriarConta {
  background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-600) 100%);
  color: var(--white);
  box-shadow: 0 8px 18px rgba(122, 15, 26, 0.14);
}

@media (max-width: 768px) {
  .cabecalhoConteudo {
    flex-wrap: wrap;
    justify-content: center;
    padding: 14px 0;
    gap: 12px;
  }

  .menuNavegacao {
    width: 100%;
    flex-wrap: wrap;
    gap: 10px 18px;
  }

  .areaAcoes {
    width: 100%;
    justify-content: center;
  }
}
</style>
