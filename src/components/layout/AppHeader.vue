<script setup>
import { RouterLink } from 'vue-router'
</script>

<template>
  <header>
    <div class="container">
      <div class="logo">
        <RouterLink><img src="../icons/UniHub.png" alt="Logo UniHub" /></RouterLink>
      </div>

      <nav>
        <ul>
          <li><RouterLink>Home</RouterLink></li>
          <li><RouterLink>Favoritos</RouterLink></li>
          <li><RouterLink>Sobre Nós</RouterLink></li>
          <li>
            <span class="nav-border"><RouterLink>Explore pelo Mapa!</RouterLink></span>
          </li>
        </ul>
      </nav>

      <div class="login">
        <ul>
          <li><RouterLink>Entrar</RouterLink></li>
          <li>
            <span class="login-border"><RouterLink>Criar Conta</RouterLink></span>
          </li>
        </ul>
      </div>
    </div>
  </header>
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

header {
  background-color: white;
}

.container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1px 2vw;
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
  padding: 5px 1vw;
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
