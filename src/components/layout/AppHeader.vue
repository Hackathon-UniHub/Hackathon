<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { /*Search01Icon,*/ HeartAddIcon, BriefcaseIcon, Menu, XIcon } from '@hugeicons/core-free-icons'
import { RouterLink } from 'vue-router'
import { computed, onMounted, watch, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFavoritosStore } from '@/stores/favoritos'

const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()

const quantidadeFavoritos = computed(() => favoritosStore.idsFavoritos.length)

const isProfessor = computed(() => authStore.isProfessor)

async function sairDaConta() {
  await authStore.logout()
}

const userInitial = computed(() => {
  const name = authStore.user?.user_metadata?.full_name || authStore.user?.email || ''

  return name.trim().charAt(0).toUpperCase() || '?'
})

function carregarFavoritos() {
  if (!authStore.loading) favoritosStore.carregarFavoritos()
}

const menuAberto = ref(false)

function alternarMenu() {
  menuAberto.value = !menuAberto.value
}

function fecharMenu() {
  menuAberto.value = false
}

onMounted(carregarFavoritos)
watch(() => authStore.loading, carregarFavoritos)
</script>

<template>
  <header class="cabecalho">
    <div class="cabecalhoConteudo">
      <RouterLink class="linkLogo" to="/" aria-label="UniHub">
        <img src="../../assets/logo.svg" alt="UniHub" class="imagemLogo" />
      </RouterLink>

      <button
        class="botaoMenu"
        type="button"
        @click="alternarMenu"
        :aria-expanded="menuAberto"
        aria-label="Alternar menu de navegação"
        aria-controls="menuNavegacao"
      >
        <HugeiconsIcon v-if="!menuAberto" :icon="Menu" :size="24" color="currentColor" :stroke-width="2" />
        <HugeiconsIcon v-else :icon="XIcon" :size="24" color="currentColor" :stroke-width="2" />
      </button>

      <nav aria-label="Navegação principal" id="menuNavegacao" :class="['menuNavegacao', { aberto: menuAberto }]">
        <ul>
          <li>
            <RouterLink class="linkNavegacao" to="/" exact-active-class="ativo" @click="fecharMenu">
              Início
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/universidades" class="linkNavegacao" exact-active-class="ativo" @click="fecharMenu">
              Universidades
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/mapa" class="linkNavegacao" exact-active-class="ativo" @click="fecharMenu">
              Mapa
            </RouterLink>
          </li>
          <li v-if="!authStore.isLoggedIn" class="itemContaMobile">
            <RouterLink class="linkNavegacao" to="/create-account" @click="fecharMenu">Criar conta</RouterLink>
          </li>
          <li v-if="authStore.isLoggedIn && isProfessor" class="itemContaMobile">
            <RouterLink class="linkNavegacao" to="/professor/dashboard" @click="fecharMenu">
              Painel do professor
            </RouterLink>
          </li>
          <li v-if="authStore.isLoggedIn" class="itemContaMobile">
            <button class="linkNavegacao acaoNavegacao" type="button" @click="sairDaConta(); fecharMenu()">
              Sair
            </button>
          </li>
        </ul>
      </nav>

      <div class="areaAcoes">
        <template v-if="authStore.isLoggedIn && isProfessor">
          <RouterLink
            class="botaoPesquisa botaoPainelProfessor"
            to="/professor/dashboard"
            aria-label="Painel do Professor"
            title="Painel do Professor"
            @click="fecharMenu"
          >
            <HugeiconsIcon :icon="BriefcaseIcon" :size="22" color="currentColor" :stroke-width="1.8" />
          </RouterLink>
        </template>
        <!--<RouterLink class="botaoPesquisa" to="/explorar" aria-label="Explorar">
          <HugeiconsIcon :icon="Search01Icon" :size="22" color="currentColor" :stroke-width="1.8" />
        </RouterLink> -->
        <RouterLink
          class="botaoPesquisa"
          :to="{ name: 'favoritos' }"
          aria-label="Favoritos"
          @click="fecharMenu"
        >
          <HugeiconsIcon :icon="HeartAddIcon" :size="22" color="currentColor" :stroke-width="1.8" />
          <span v-if="quantidadeFavoritos" class="contadorFavoritos">
            {{ quantidadeFavoritos > 99 ? '99+' : quantidadeFavoritos }}
          </span>
        </RouterLink>
        <template v-if="authStore.isLoggedIn">
          <div class="avatarUsuario" :aria-label="`Usuário: ${userInitial}`" role="img">
            {{ userInitial }}
          </div>
          <button class="botaoSair" type="button" @click="sairDaConta">Sair</button>
        </template>
        <template v-else>
          <RouterLink class="botaoEntrar" to="/entrar" @click="fecharMenu">Entrar</RouterLink>
          <RouterLink class="botaoCriarConta" to="/create-account" @click="fecharMenu">Criar conta</RouterLink>
        </template>
      </div>
    </div>
  </header>
</template>

<style scoped>
.cabecalho {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  width: 100%;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: blur(8px);
  border-bottom: 1px solid var(--color-border);
  transition:
    box-shadow 0.25s ease,
    background 0.25s ease;
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
  text-decoration: none;
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

.menuNavegacao ul {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(14px, 2vw, 28px);
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
  padding-bottom: 4px;
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
  bottom: -1px;
  height: 2px;
  background: var(--brand-700);
  border-radius: 999px;
}

.areaAcoes {
  display: flex;
  align-items: center;
  gap: 12px;
}

.botaoMenu {
  display: none;
}

.botaoPesquisa {
  position: relative;
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

.contadorFavoritos {
  position: absolute;
  top: -5px;
  right: -5px;
  min-width: 18px;
  height: 18px;
  padding: 0 4px;
  border: 2px solid var(--white);
  border-radius: 999px;
  background: var(--brand-700);
  color: var(--white);
  font-size: 0.65rem;
  font-weight: 800;
  line-height: 14px;
  text-align: center;
}

.avatarUsuario {
  width: 42px;
  height: 42px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: var(--brand-700);
  color: var(--white);
  font-size: 1rem;
  font-weight: 700;
  line-height: 1;
}

.botaoSair {
  min-height: 42px;
  padding: 0.7rem 1rem;
  border: 1px solid rgba(122, 15, 26, 0.18);
  border-radius: 10px;
  background: transparent;
  color: var(--brand-700);
  cursor: pointer;
  font-weight: 700;
}

.botaoSair:hover {
  background: rgba(122, 15, 26, 0.06);
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

.itemContaMobile {
  display: none;
}

@media (max-width: 768px) {
  .botaoMenu {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    flex: 0 0 44px;
    width: 44px;
    height: 44px;
    border-radius: 50%;
    background: rgba(122, 15, 26, 0.05);
    border: 1px solid rgba(122, 15, 26, 0.12);
    color: var(--brand-700);
    transition:
      transform 0.2s ease,
      background 0.2s ease;
  }

  .botaoMenu:hover {
    transform: translateY(-1px);
    background: rgba(122, 15, 26, 0.08);
  }

  .menuNavegacao {
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0.98);
    backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--color-border);
    padding: 16px 0;
    opacity: 0;
    visibility: hidden;
    transform: translateY(-8px);
    transition:
      opacity 0.25s ease,
      visibility 0.25s ease,
      transform 0.25s ease;
    box-shadow: 0 12px 24px rgba(28, 28, 34, 0.1);
  }

  .menuNavegacao.aberto {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
  }

  .menuNavegacao ul {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
    width: 100%;
  }

  .linkNavegacao {
    width: 100%;
    padding: 12px 24px;
    font-size: 1rem;
    border-radius: 8px;
  }

  .linkNavegacao:hover {
    background: rgba(122, 15, 26, 0.08);
  }

  .linkNavegacao.ativo::after {
    display: none;
  }

  .cabecalhoConteudo {
    gap: 12px;
  }

  .itemContaMobile {
    display: list-item;
  }

  .botaoCriarConta,
  .botaoPainelProfessor,
  .avatarUsuario,
  .botaoSair {
    display: none;
  }

  .acaoNavegacao {
    border: 0;
    background: transparent;
    cursor: pointer;
    font: inherit;
    text-align: left;
  }
}

@media (max-width: 480px) {
  .cabecalhoConteudo {
    gap: 8px;
  }

  .areaAcoes {
    gap: 8px;
  }

  .botaoEntrar,
  .botaoCriarConta {
    min-height: 38px;
    padding: 0.65rem 0.85rem;
  }

  .botaoSair {
    min-height: 38px;
    padding: 0.6rem 0.8rem;
  }
}

html,
body,
div,
span,
applet,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
a,
abbr,
acronym,
address,
big,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
s,
samp,
small,
strike,
strong,
sub,
sup,
tt,
var,
b,
u,
i,
center,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
/* HTML5 display-role reset for older browsers */
article,
aside,
canvas,
details,
embed,
figure,
figcaption,
footer,
header,
hgroup,
menu,
nav,
output,
ruby,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
  text-decoration: none;
}
article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}
body {
  line-height: 1;
}
ol,
ul {
  list-style: none;
}
blockquote,
q {
  quotes: none;
}
blockquote:before,
blockquote:after,
q:before,
q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
header {
  background-color: white;
}

.container {
  /* === RESET === */
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.1rem 2vw;
}

.logo img {
  height: 72px;
  width: auto;
}

nav ul li > a,
.login ul li > a {
  display: inline-block;
  color: #000000;
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

nav ul li > a:hover,
.login ul li > a:hover {
  transform: translateY(-2px);
  opacity: 0.9;
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
  padding: 2px 1vw;
  border-radius: 10px;
  display: inline-block;
  transition: all 0.2s ease-in-out;
}

.nav-border:hover,
.login-border:hover {
  cursor: pointer;
  background-color: #e4c369;
  transform: scale(1.05);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
}

a {
  text-decoration: none;
  color: #000;
  font-size: 1.1rem;
  font-weight: 400;
}

a:hover {
  transition: font-weight 0.1s;
  cursor: pointer;
}
</style>
