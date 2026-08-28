<script setup>
import { computed, onMounted } from 'vue'
import { RouterLink } from 'vue-router'
import notasUniversidades from '@/data/notasUniversidades.js'
import universidades from '@/data/universidades.js'
import { normalizarNome } from '@/utils/universidadesUtils.js'

const universidadesMaisBemRanqueadas = computed(() => {
  return [...notasUniversidades]
    .sort((primeira, segunda) => primeira.Ranking - segunda.Ranking)
    .slice(0, 6)
    .map((nota) => {
      const nomeNormalizado = normalizarNome(nota.Universidade)
      const universidade = universidades.find(
        (item) => {
          const nomeItemNormalizado = normalizarNome(item.nome)
          return (
            nomeItemNormalizado === nomeNormalizado ||
            nomeItemNormalizado.startsWith(nomeNormalizado)
          )
        },
      )

      return universidade ? { ...universidade, notaRuf: nota.Nota, rankingRuf: nota.Ranking } : null
    })
    .filter(Boolean)
})

onMounted(() => {
  const elementosAnimados = document.querySelectorAll('.pagina > section')

  const observador = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('visivel')
          observador.unobserve(entrada.target)
        }
      })
    },
    { threshold: 0.18 },
  )

  elementosAnimados.forEach((elemento) => observador.observe(elemento))
})
</script>

<template>
  <main class="pagina">
    <section class="secaoPrincipal">
      <div class="container layoutPrincipal">
        <div class="textoPrincipal">
          <h1>
            Encontre a sua
            <span>universidade ideal</span>
            no Brasil
          </h1>

          <p>Compare instituições, explore no mapa e tome decisões com confiança.</p>

          <div class="acoesPrincipal">
            <RouterLink to="/explorar" class="botao botaoPrimario">Começar agora</RouterLink>
            <RouterLink to="/mapa" class="botao botaoSecundario">Ver mapa interativo</RouterLink>
          </div>

          <div class="gradeEstatisticas">
            <article class="cartaoEstatistica">
              <strong>200+</strong>
              <span>Universidades</span>
            </article>
            <article class="cartaoEstatistica">
              <strong>5 mil</strong>
              <span>Estudantes</span>
            </article>
            <article class="cartaoEstatistica">
              <strong>48k</strong>
              <span>Comentários</span>
            </article>
            <article class="cartaoEstatistica">
              <strong>4.9</strong>
              <span>Ranking</span>
            </article>
          </div>
        </div>

        <div class="visualPrincipal">
          <div class="cartaoFoto">
            <div class="cabecalhoFoto">
              <span class="etiquetaPequena">#1</span>
              <span class="etiquetaPequena etiquetaPequenaMuted">Working</span>
            </div>

            <div class="retrato">
              <img
                src="../components/image/foto-estudante.jpeg"
                alt="Estudante com mochila"
                class="imagemEstudante"
              />
            </div>

            <div class="legendaFoto">
              <strong>Miguel</strong>
              <p>“Selecionei a melhor opção para mudar minha vida acadêmica.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="secaoUniversidades">
      <div class="container">
        <div class="cabecalhoSecao">
          <div class="eyebrowLinha">
            <span class="linhaEyebrow"></span>
            <span class="destaque">Destaques · Ranking RUF</span>
          </div>

          <div class="tituloELink">
            <h2>Universidades mais buscadas</h2>
            <RouterLink to="/universidades" class="verTodasLink">
              Ver todas <span class="setaLink">→</span>
            </RouterLink>
          </div>
        </div>

        <div class="gradeUniversidades">
          <article
            v-for="(universidade, indice) in universidadesMaisBemRanqueadas"
            :key="universidade.id"
            class="cartaoUniversidade"
          >
            <div class="topoCartao">
              <span class="selo">{{ universidade.sigla }}</span>
              <span class="numeroRanking">{{ String(indice + 1).padStart(2, '0') }}</span>
            </div>

            <h3>{{ universidade.nome }}</h3>
            <p class="localCartao">{{ universidade.municipio }}, {{ universidade.uf }}</p>

            <div class="metaCartao">
              <span class="notaCartao"> {{ universidade.notaRuf.toFixed(2) }}</span>
              <span class="separadorMeta">·</span>
              <span>{{ universidade.categoria }}</span>
              <span class="separadorMeta">·</span>
              <span>Nº{{ universidade.rankingRuf }} no RUF</span>
            </div>

            <RouterLink
              class="linkCartao"
              :to="{ name: 'universidade', params: { id: universidade.id } }"
            >
              Ver detalhes <span class="setaLink">→</span>
            </RouterLink>
          </article>
        </div>
      </div>
    </section>

    <section class="comoFunciona">
      <div class="container conteudoComoFunciona">
        <span class="destaque destaqueClaro">Como funciona</span>
        <h2>Como o <span class="textoDestaque">UniHub</span> funciona?</h2>
        <p>Três passos simples para começar sua jornada acadêmica.</p>

        <div class="gradePassos">
          <article class="cartaoPasso">
            <div class="numeroPasso">01</div>
            <h3>Busque e filtre</h3>
            <p>Encontre universidades por curso, localização e avaliação.</p>
          </article>

          <article class="cartaoPasso">
            <div class="numeroPasso">02</div>
            <h3>Explore no mapa</h3>
            <p>Veja opções em cada região e compare melhor sua escolha.</p>
          </article>

          <article class="cartaoPasso">
            <div class="numeroPasso">03</div>
            <h3>Compare e decida</h3>
            <p>Analise ideias, critérios e tome sua decisão com segurança.</p>
          </article>
        </div>

        <div class="caixaAcao">
          <RouterLink to="/criar-conta" class="botao botaoPrimario">Criar conta grátis</RouterLink>
        </div>
      </div>
    </section>

    <section class="chamadaFinal">
      <div class="container conteudoChamadaFinal">
        <div class="textoChamada">
          <h2>Pronto para encontrar a universidade ideal?</h2>
          <p>Junte-se a milhares de estudantes que já usam o UniHub para planejar o futuro.</p>
        </div>

        <div class="acoesChamada">
          <RouterLink to="/universidades" class="botao botaoSecundario"
            >Explorar universidades</RouterLink
          >
          <RouterLink to="/mapa" class="botao botaoPrimario">Abrir mapa</RouterLink>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pagina {
  background: var(--cream-50);
}

.pagina > section {
  opacity: 0.96;
  transform: translateY(10px);
  transition:
    opacity 0.45s ease,
    transform 0.45s ease;
}

.pagina > section.visivel {
  opacity: 1;
  transform: translateY(0);
}

.secaoPrincipal {
  padding: 52px 0 28px;
}

.layoutPrincipal {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 36px;
  align-items: center;
}

.textoPrincipal {
  padding: 16px 0;
}

.etiquetaMini {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(122, 15, 26, 0.08);
  color: var(--brand-700);
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.04em;
  text-transform: uppercase;
}

.textoPrincipal h1 {
  margin-top: 20px;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
  color: var(--ink-900);
  max-width: 540px;
}

.textoPrincipal h1 span {
  display: block;
  color: var(--brand-700);
  font-style: italic;
  font-weight: 400;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.textoPrincipal p {
  margin-top: 18px;
  max-width: 560px;
  color: var(--ink-700);
  font-size: 1.04rem;
}

.acoesPrincipal {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.botao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0.8rem 1.4rem;
  border-radius: 999px;
  font-weight: 700;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
  text-decoration: none;
}

.botao:hover {
  transform: translateY(-1px);
}

.botaoPrimario {
  background: linear-gradient(135deg, var(--brand-700), var(--brand-600));
  color: var(--white);
  box-shadow: 0 12px 24px rgba(122, 15, 26, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.botaoSecundario {
  background: var(--white);
  color: var(--brand-700);
  border: 1px solid rgba(122, 15, 26, 0.24);
  box-shadow: 0 8px 18px rgba(122, 15, 26, 0.08);
}

.gradeEstatisticas {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
  max-width: 620px;
}

.cartaoEstatistica {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 18px;
  padding: 18px 14px 16px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(28, 28, 34, 0.03);
}

.cartaoEstatistica strong {
  display: block;
  color: var(--ink-900);
  font-size: 1.45rem;
  line-height: 1.2;
}

.cartaoEstatistica span {
  display: block;
  margin-top: 6px;
  color: var(--ink-600);
  font-size: 0.76rem;
}

.visualPrincipal {
  display: flex;
  justify-content: center;
}

.cartaoFoto {
  width: min(100%, 480px);
  background: linear-gradient(135deg, #f5efe9, #ede4dd);
  border: 1px solid rgba(28, 28, 34, 0.06);
  border-radius: 30px;
  padding: 18px 18px 8px;
  box-shadow: 0 18px 36px rgba(28, 28, 34, 0.08);
}

.cabecalhoFoto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.etiquetaPequena {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 4px 8px;
  border-radius: 999px;
  background: rgba(122, 15, 26, 0.12);
  color: var(--brand-700);
  font-size: 0.65rem;
  font-weight: 700;
}

.etiquetaPequenaMuted {
  background: rgba(28, 28, 34, 0.06);
  color: var(--ink-700);
}

.retrato {
  position: relative;
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #f3efe9, #e5e8ea);
  min-height: 480px;
  height: 80%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.imagemEstudante {
  display: block;
  width: 100%;
  height: 100%;
  min-height: 480px;
  object-fit: cover;
  object-position: center top;
  transform: scale(1.02);
}

.legendaFoto {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.legendaFoto strong {
  color: var(--ink-900);
  font-size: 1rem;
}

.legendaFoto p {
  color: var(--ink-700);
  font-size: 0.82rem;
  line-height: 1.35;
}

/* === UNIVERSIDADES MAIS BUSCADAS === */

.secaoUniversidades {
  padding: 44px 0 56px;
}

.cabecalhoSecao {
  margin-bottom: 34px;
}

.eyebrowLinha {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.linhaEyebrow {
  display: none;
}

.destaque {
  color: var(--brand-700);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.destaqueClaro {
  color: rgba(255, 255, 255, 0.7);
}

.tituloELink {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  gap: 20px;
}

.cabecalhoSecao h2 {
  color: var(--ink-900);
  font-size: clamp(1.7rem, 2.2vw, 2.2rem);
  letter-spacing: -0.03em;
  line-height: 1.1;
}

.verTodasLink {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--ink-600);
  font-weight: 600;
  font-size: 0.82rem;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.15s ease;
}

.verTodasLink:hover {
  color: var(--brand-700);
}

.setaLink {
  display: inline-block;
  transition: transform 0.15s ease;
}

.verTodasLink:hover .setaLink,
.linkCartao:hover .setaLink {
  transform: translateX(2px);
}

.gradeUniversidades {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 16px;
}

.cartaoUniversidade {
  display: flex;
  flex-direction: column;
  background: var(--cream-50);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 14px;
  padding: 28px 24px;
  box-shadow: 0 8px 20px rgba(28, 28, 34, 0.04);
  transition: background 0.15s ease;
}

.cartaoUniversidade:hover {
  background: var(--white);
}

.topoCartao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.selo {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 30px;
  padding: 0 10px;
  border-radius: 4px;
  background-color: #851420;
  color: var(--white);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.02em;
}

.numeroRanking {
  color: var(--ink-600);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}

.cartaoUniversidade h3 {
  color: var(--ink-900);
  font-size: 1.02rem;
  font-weight: 600;
  line-height: 1.35;
  letter-spacing: -0.01em;
  margin-bottom: 6px;
  min-height: 2.7em;
}

.localCartao {
  color: var(--ink-600);
  font-size: 0.8rem;
  margin-bottom: 20px;
}

.metaCartao {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  margin-bottom: 16px;
  color: var(--ink-600);
  font-size: 0.76rem;
}

.notaCartao {
  color: var(--ink-900);
  font-weight: 700;
}

.separadorMeta {
  color: rgba(28, 28, 34, 0.25);
}

.linkCartao {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  color: var(--brand-700);
  font-size: 0.8rem;
  font-weight: 700;
}

.linkCartao:hover {
  color: var(--brand-900);
}

.comoFunciona {
  background: linear-gradient(180deg, var(--ink-950) 0%, #1a1a22 100%);
  color: var(--white);
  padding: clamp(72px, 10vh, 112px) 0;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.conteudoComoFunciona {
  text-align: center;
}

.comoFunciona h2 {
  margin-top: 12px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.04em;
}

.textoDestaque {
  color: var(--brand-400);
}

.comoFunciona p {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.gradePassos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: clamp(42px, 6vh, 72px);
}

.cartaoPasso {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(122, 15, 26, 0.05));
  border-radius: 20px;
  min-height: 196px;
  padding: 24px 20px;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
  transition: border-color 0.2s ease;
}

.cartaoPasso:hover {
  border-color: rgba(208, 111, 120, 0.5);
}

.numeroPasso {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  font-weight: 800;
  margin-bottom: 16px;
}

.cartaoPasso h3 {
  margin-bottom: 12px;
  color: var(--white);
  font-size: 1.1rem;
}

.cartaoPasso p {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.6;
}

.caixaAcao {
  margin-top: clamp(36px, 5vh, 56px);
  display: flex;
  justify-content: center;
}

.chamadaFinal {
  padding: clamp(72px, 10vh, 112px) 0;
}

.conteudoChamadaFinal {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  justify-content: center;
  min-height: min(460px, 66vh);
  padding: clamp(48px, 8vh, 92px) clamp(28px, 6vw, 84px);
  border-radius: 30px;
  background: linear-gradient(135deg, var(--brand-700), var(--brand-500));
  color: var(--white);
  box-shadow:
    0 20px 40px rgba(122, 15, 26, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.textoChamada h2 {
  max-width: 680px;
  font-size: clamp(2.2rem, 4vw, 4rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.textoChamada p {
  margin-top: 12px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.85);
}

.acoesChamada {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chamadaFinal .botaoPrimario {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

/* === RESPONSIVO === */
@media (max-width: 640px) {
  .comoFunciona,
  .chamadaFinal {
    padding: 64px 0;
  }

  .conteudoChamadaFinal {
    min-height: 440px;
    gap: 28px;
    padding: 32px 20px;
  }

  .botao {
    width: 100%;
  }

  .tituloELink {
    align-items: flex-start;
    flex-direction: column;
    gap: 10px;
  }

  .gradeEstatisticas {
    grid-template-columns: 1fr 1fr;
  }

  .acoesChamada {
    min-width: 0;
  }
}

@media (max-width: 900px) {
  .layoutPrincipal {
    grid-template-columns: 1fr;
    gap: 48px;
  }

  .textoPrincipal {
    max-width: 680px;
    margin-inline: auto;
    text-align: center;
  }

  .textoPrincipal h1,
  .textoPrincipal p {
    margin-inline: auto;
  }

  .acoesPrincipal,
  .gradeEstatisticas {
    margin-inline: auto;
  }

  .visualPrincipal {
    order: -1;
  }

  .gradeUniversidades,
  .gradePassos {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .secaoPrincipal {
    padding-top: 36px;
  }

  .layoutPrincipal {
    gap: 32px;
  }

  .acoesPrincipal {
    flex-direction: column;
    align-items: stretch;
  }

  .cartaoFoto {
    padding: 12px 12px 8px;
    border-radius: 22px;
  }

  .retrato,
  .imagemEstudante {
    min-height: 360px;
  }

  .gradeUniversidades,
  .gradePassos {
    grid-template-columns: 1fr;
  }

  .cartaoPasso {
    min-height: 0;
  }
}

@media (prefers-reduced-motion: reduce) {
  .pagina > section {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>