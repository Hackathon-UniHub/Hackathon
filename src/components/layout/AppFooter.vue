<script setup>
</script>

<template>
  <footer class="rodape">
    <div class="container rodapeConteudo">
      <div class="blocoMarca">
        <div class="linhaMarca">
          <img src="../../assets/logo.svg" alt="UniHub" class="logoMarca" />
        </div>

        <p class="textoMarca">
          Encontre a universidade ideal para o seu futuro. Compare instituições, explore no mapa e
          tome decisões com confiança.
        </p>

        <div class="redesSociais" aria-label="Redes sociais">
          <a href="https://instagram.com" target="_blank" rel="noreferrer" aria-label="Instagram">
            <img src="../icons/instagram.svg" alt="" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" aria-label="Facebook">
            <span aria-hidden="true">f</span>
          </a>
          <a href="https://x.com" target="_blank" rel="noreferrer" aria-label="X">
            <img src="../icons/x.svg" alt="" />
          </a>
        </div>
      </div>

      <div class="linksRodape">
        <div class="grupoLinks">
          <h4>Produto</h4>
          <ul>
            <li><RouterLink to="/mapa">Mapa interativo</RouterLink></li>
            <li><RouterLink to="/explorar">Explorar</RouterLink></li>
            <li><RouterLink to="/como-funciona">Como funciona</RouterLink></li>
          </ul>
        </div>

        <div class="grupoLinks">
          <h4>Conta</h4>
          <ul>
            <li><RouterLink to="/entrar">Entrar</RouterLink></li>
            <li><RouterLink to="/criar-conta">Criar conta</RouterLink></li>
          </ul>
        </div>

        <div class="grupoLinks">
          <h4>Contato</h4>
          <ul>
            <li><a href="mailto:contato@unihub.com.br">contato@unihub.com.br</a></li>
            <li><a href="tel:+5511998764321">+55 (11) 98765-4321</a></li>
            <li><a href="#">São Paulo, Brasil</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container rodapeInferior">
      <span>© 2026 UniHub. Todos os direitos reservados.</span>
      <div class="linksInferiores">
        <RouterLink to="/">Privacidade</RouterLink>
        <RouterLink to="/">Termos</RouterLink>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  background: var(--ink-950);
  color: var(--white);
  padding-top: 64px;
}

.rodapeConteudo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  padding-bottom: 36px;
}

.blocoMarca {
  max-width: 360px;
  flex: 1;
}

.linhaMarca {
  display: inline-flex;
  align-items: center;
  margin-bottom: 18px;
}

.logoMarca {
  display: block;
  width: 124px;
  height: auto;
  filter: brightness(0) invert(1);
}

.textoMarca {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  line-height: 1.7;
  margin-bottom: 22px;
}

.redesSociais {
  display: flex;
  gap: 10px;
}

.redesSociais a {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: var(--white);
  font-weight: 700;
  font-size: 1.05rem;
  line-height: 1;
  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.redesSociais a:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.linksRodape {
  display: grid;
  grid-template-columns: repeat(3, minmax(170px, 1fr));
  gap: 36px;
  flex: 1.2;
}

.grupoLinks h4 {
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.grupoLinks ul {
  list-style: none;
  display: grid;
  gap: 10px;
}

.grupoLinks li a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.96rem;
  transition: color 0.2s ease;
}

.grupoLinks li a:hover {
  color: var(--white);
}

.rodapeInferior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.linksInferiores {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.linksInferiores a {
  color: rgba(255, 255, 255, 0.7);
}

.linksInferiores a:hover {
  color: var(--white);
}

@media (max-width: 900px) {
  .rodapeConteudo {
    flex-direction: column;
    gap: 28px;
  }

  .linksRodape {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .rodape {
    padding-top: 44px;
  }

  .linksRodape {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .rodapeInferior {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
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

footer {
  background-color: black;
  padding: 6vw 2vw;
}

.container {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.redes-sociais {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 35px;
}

.redes-sociais::before,
.redes-sociais::after {
  content: '';
  flex: 1;
  height: 2px;
  background-color: rgba(255, 255, 255, 0.466);
}

.redes-sociais ul {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 24px;
  padding: 0 40px;
}

.redes-sociais img {
  width: 24px;
  height: auto;
  display: block;
  filter: invert(1);
  transition:
    transform 0.2s ease,
    opacity 0.2s ease;
}

.redes-sociais img:hover {
  cursor: pointer;
  transform: translateY(-4px);
  opacity: 0.6;
}

.contato {
  text-align: center;
  color: white;
}

.contato h2 {
  font-size: 1.2rem;
  font-weight: 400;
  margin-bottom: 8px;
}

.contato p {
  font-size: 1.1rem;
}
</style>
