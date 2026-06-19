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
          <button>Ver como funciona</button><img src="../components/icons/seta.svg" alt="">
        </div>
      </div>
      <div class="image">
        <img src="../components/icons/image-removebg-preview (6) 1.png" alt="Estudante" />
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
  background-color: white;
}

.banner {
  background-color: red;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 2vw 8vw;
}
.banner h1 {
  font-size: 5rem;
  width: 80%;
  color: white;
  letter-spacing: -5px;
}
.banner h1 span {
  color: #DDBC64;
}
.banner p {
  font-size: 1.1rem;
  margin: 1vw 0;
  width: 45%;
}
.banner .button {
  display: flex;
  gap: 1vw;
  margin: 3vw 8vw;
}
.banner .button button {
  padding: 8px 18px;
  text-decoration: none;
  border: none;
  background-color: transparent;
  color: white;
  font-size: 1.01rem;
}
.banner .button img {
  width: 3%;
}
</style>
