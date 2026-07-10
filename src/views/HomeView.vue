<script setup></script>

<template>
  <main>
    <section class="banner">
      <div class="conteudo">
        <h1>Encontre a sua <span>universidade</span> ideal no Brasil</h1>
        <p>
          Filtre por estado, cidade, curso. Ou até mesmo você procure pelo mapa interativo e compare
          universidades.
        </p>
        <div class="button">
          <button>Ver como funciona<img src="../components/icons/seta.svg" alt="Seta" /></button>
        </div>
      </div>
      <div class="image">
        <img src="../components/icons/image-removebg-preview (6) 1.png" alt="Estudante" />
      </div>
    </section>

    <section class="uniMaisEscolhidas">
      <h2>Universidades mais escolhidas!</h2>
      <div class="universidades">
        <ul>
          <li><button><img src="../components/icons/UFRJ.png" alt="UFRJ"></button></li>
          <li><button><img src="../components/icons/UNICAMP.png" alt="UNICAMP"></button></li>
          <li><button><img src="../components/icons/UFRGS.png" alt="UFRGS"></button></li>
          <li><button><img src="../components/icons/USP.png" alt="USP"></button></li>
          <li><button><img src="../components/icons/PUC_SP.png" alt="PUC-SP"></button></li>
        </ul>
      </div>
    </section>

    <section class="estatisticas">
      <ul>
        <li class="unicadastrada">
          <p>+206 Universidades cadastradas</p>
          <img src="../components/icons/capelo.png" alt="Capelo">
        </li>
        <li class="certificado">
          <p>+150 Alunos orientados</p>
          <img src="../components/icons/verificacao.png" alt="Certificados">
        </li>
        <li class="estado">
          <p>26 Estados</p>
          <img src="../components/icons/mapa-brasil.png" alt="mapa do Brasil">
        </li>
        <li class="avaliacao">
          <p>8.5/10 Avaliações</p>
          <img src="../components/icons/estrela.png" alt="Avaliações">
        </li>
      </ul>
    </section>
  </main>
</template>

<style scoped>
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

main {
  background-color: #FAF5D1;
}

.banner {
  background: linear-gradient(90deg, #6b0f1a 0%, #b21f2d 100%);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 4vw 8vw;
  position: relative;
  min-height: 70vh;
  overflow: hidden;
}

.conteudo {
  z-index: 2;
  position: relative;
}

.banner h1 {
  font-size: 5rem;
  max-width: 700px;
  color: white;
  letter-spacing: -5px;
  line-height: 1.05;
}

.banner h1 span {
  color: #ddbc64;
}

.banner p {
  font-size: 1.1rem;
  margin: 1vw 0;
  max-width: 600px;
  color: white;
  line-height: 1.5;
}

.banner .button {
  display: flex;
  gap: 1vw;
  margin: 3vw 0;
}

.banner .button button {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  padding: 8px 18px;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1.01rem;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

.banner .button button:hover {
  opacity: 0.8;
}

.banner .button button img {
  width: 22px;
  height: auto;
  filter: brightness(0) invert(1);
  transition: transform 0.2s ease;
}

.banner .button button:hover img {
  transform: translateX(5px);
}

.banner .button img {
  width: 22px;
  filter: brightness(0) invert(1);
}

.image {
  position: absolute;
  right: 5vw;
  bottom: 0;
  z-index: 1;
}

.image img {
  height: 65vh;
  max-height: 700px;
  object-fit: contain;
  display: block;
}




section.uniMaisEscolhidas {
  padding: 4vw 8vw;
}

.uniMaisEscolhidas h2 {
  font-size: 2.5rem;
  text-align: center;
  margin-bottom: 2vw;
  font-weight: bold;
  color: #6b0f1a;
}

.uniMaisEscolhidas button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.uniMaisEscolhidas img {

  transition: transform 0.2s ease;
}

.uniMaisEscolhidas img:hover{
  transform: translateX(5px);
}

.uniMaisEscolhidas ul {
  display: flex;
  justify-content: center;
  gap: 2vw;
  flex-wrap: wrap;
}



section.estatisticas {
  background-color: #FFEECF;
  padding: 4vw 8vw;
}

.estatisticas ul {
  display: flex;
  justify-content: center; /* Centraliza o bloco inteiro de itens */
  flex-wrap: wrap;
  gap: 10vw; /* Dá um respiro legal entre os itens */
  align-items: flex-start; /* Alinha todos pelo topo do texto */
}

.estatisticas li {
  display: flex;
  flex-direction: column; /* Coloca o texto em cima e a imagem embaixo */
  align-items: center; /* Centraliza tudo horizontalmente no item */
  text-align: center; /* Garante que o texto fique centralizado nas quebras de linha */
  max-width: 200px; /* Limita a largura para o texto quebrar igual ao protótipo */
}

.estatisticas p {
  font-size: 1.2rem;
  font-weight: bold;
  color: #6b0f1a;
  line-height: 1.3;
  margin-bottom: 1.5rem; /* Espaço entre o texto e a imagem */
  min-height: 3.2rem; /* <-- ADICIONADO: Garante que o texto sempre tenha o espaço de 2 linhas */
}

.estatisticas li img {
  object-fit: contain;
}

.estatisticas .certificado img {
  transform: translateY(-20px); /* Move o broche para cima sem alterar o tamanho */
}
</style>
