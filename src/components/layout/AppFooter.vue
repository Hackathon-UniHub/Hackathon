<script setup></script>

<template>
  <footer>
    <div class="container">
      <nav class="redes-sociais">
        <ul>
          <li>
            <RouterLink><img src="../icons/instagram.svg" alt="Instagram" /></RouterLink>
          </li>
          <li>
            <RouterLink><img src="../icons/x.svg" alt="X" /></RouterLink>
          </li>
          <li>
            <RouterLink><img src="../icons/tiktok.svg" alt="TikTok" /></RouterLink>
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
  transition: transform 0.2s ease, opacity 0.2s ease;
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
