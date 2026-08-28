<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { /*Search01Icon,*/ HeartAddIcon } from '@hugeicons/core-free-icons'
import { RouterLink } from 'vue-router'
import { computed, onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/auth'
import { useFavoritosStore } from '@/stores/favoritos'

const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()

const quantidadeFavoritos = computed(() => favoritosStore.idsFavoritos.length)

async function sairDaConta() {
  await authStore.logout()
}

const userInitial = computed(() => {
  const name =
    authStore.user?.user_metadata?.full_name ||
    authStore.user?.email ||
    ''

  return name.trim().charAt(0).toUpperCase() || '?'
})

function carregarFavoritos() {
  if (!authStore.loading) favoritosStore.carregarFavoritos()
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

      <nav aria-label="Navegação principal">
        <ul class="menuNavegacao">
          <li>
            <RouterLink class="linkNavegacao" :to="{ name: 'home' }" exact-active-class="ativo">
              Início
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/universidades" class="linkNavegacao" exact-active-class="ativo">
              Universidades
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/mapa" class="linkNavegacao" exact-active-class="ativo">
              Mapa
            </RouterLink>
          </li>
        </ul>
      </nav>

      <div class="areaAcoes">
        <!--<RouterLink class="botaoPesquisa" to="/explorar" aria-label="Explorar">
          <HugeiconsIcon :icon="Search01Icon" :size="22" color="currentColor" :stroke-width="1.8" />
        </RouterLink> -->
        <RouterLink
          class="botaoPesquisa"
          :to="authStore.isLoggedIn ? { name: 'favoritos' } : { name: 'login' }"
          :aria-label="authStore.isLoggedIn ? 'Favoritos' : 'Entrar para ver favoritos'"
        >
          <HugeiconsIcon :icon="HeartAddIcon" :size="22" color="currentColor" :stroke-width="1.8" />
          <span v-if="authStore.isLoggedIn && quantidadeFavoritos" class="contadorFavoritos">
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
          <RouterLink class="botaoEntrar" to="/entrar">Entrar</RouterLink>
          <RouterLink class="botaoCriarConta" to="/create-account">Criar conta</RouterLink>
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

/* === RESPONSIVO === */
@media (max-width: 768px) {
  .cabecalhoConteudo {
    display: grid;
    grid-template-columns: 1fr auto;
    padding: 10px 0;
    gap: 8px 16px;
  }

  .menuNavegacao {
    grid-column: 1 / -1;
    grid-row: 2;
    width: 100%;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px 18px;
  }

  .areaAcoes {
    grid-column: 2;
    grid-row: 1;
    justify-content: center;
  }
}

@media (max-width: 480px) {
  .cabecalhoConteudo {
    display: flex;
    flex-direction: column;
    padding: 10px 0 12px;
    gap: 10px;
  }

  .menuNavegacao,
  .areaAcoes {
    width: 100%;
  }

  .areaAcoes {
    flex-wrap: wrap;
  }

  .botaoEntrar,
  .botaoCriarConta {
    min-height: 38px;
    padding: 0.65rem 0.85rem;
  }
}

/* === RESET === */
/* http://meyerweb.com/eric/tools/css/reset/
   v2.0 | 20110126
   License: none (public domain)
*/

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
/* HTML5 display-role reset for older browsers */
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
/* === RESET === */

header {
  background-color: white;
}

.container {
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
