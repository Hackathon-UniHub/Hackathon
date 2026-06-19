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
        
      </div>
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

</style>
