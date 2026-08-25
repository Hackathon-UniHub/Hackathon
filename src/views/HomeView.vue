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
          <span class="destaque">Universidades</span>
          <h2>Universidades mais buscadas</h2>
          <RouterLink to="/explorar">Ver todas</RouterLink>
        </div>

        <div class="gradeUniversidades"></div>
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
          <RouterLink to="/explorar" class="botao botaoSecundario"
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
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
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

.secaoUniversidades {
  padding: 36px 0 46px;
}

.cabecalhoSecao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.cabecalhoSecao h2 {
  color: var(--ink-900);
  font-size: clamp(1.8rem, 2vw, 2.4rem);
  letter-spacing: -0.04em;
}

.cabecalhoSecao a {
  color: var(--brand-700);
  font-weight: 700;
  text-decoration: none;
}

.destaque {
  display: inline-flex;
  align-items: center;
  padding: 6px 10px;
  border-radius: 999px;
  background: rgba(122, 15, 26, 0.08);
  color: var(--brand-700);
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.destaqueClaro {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
}

.gradeUniversidades {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.cartaoUniversidade {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 20px;
  padding: 18px 18px 16px;
  box-shadow: 0 10px 30px rgba(28, 28, 34, 0.04);
}

.topoCartao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.marca {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.marcaPrimaria {
  background: rgba(122, 15, 26, 0.1);
  color: var(--brand-700);
}

.marcaAzul {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}

.marcaVerde {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.avaliacao {
  color: var(--brand-700);
  font-weight: 800;
  font-size: 0.8rem;
}

.cartaoUniversidade h3 {
  color: var(--ink-900);
  font-size: 1.06rem;
  line-height: 1.4;
  margin-bottom: 8px;
}

.cartaoUniversidade p {
  color: var(--ink-600);
  font-size: 0.82rem;
  margin-bottom: 14px;
}

.metaCartao {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.metaCartao span {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(28, 28, 34, 0.04);
  color: var(--ink-700);
  font-size: 0.7rem;
}

.comoFunciona {
  background: linear-gradient(180deg, var(--ink-950) 0%, #1a1a22 100%);
  color: var(--white);
  padding: 54px 0 36px;
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
  font-weight: 700;
}

.comoFunciona p {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.gradePassos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 36px;
}

.cartaoPasso {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(122, 15, 26, 0.05));
  border-radius: 20px;
  padding: 22px 18px;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
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
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.chamadaFinal {
  padding: 60px 0 82px;
}

.conteudoChamadaFinal {
  display: flex;
  flex-direction: column;
  gap: 24px;
  justify-content: center;
  min-height: 260px;
  padding: 46px 34px;
  border-radius: 30px;
  background: linear-gradient(135deg, var(--brand-700), var(--brand-500));
  color: var(--white);
  box-shadow:
    0 20px 40px rgba(122, 15, 26, 0.14),
    inset 0 1px 0 rgba(255, 255, 255, 0.18);
}

.textoChamada h2 {
  font-size: clamp(2rem, 3vw, 3rem);
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

@media (max-width: 640px) {
  .acoesChamada {
    flex-direction: column;
    align-items: stretch;
  }

  .botao {
    width: 100%;
  }

  .cabecalhoSecao {
    align-items: flex-start;
    flex-direction: column;
  }

  .gradeEstatisticas {
    grid-template-columns: 1fr 1fr;
  }

  .conteudoChamadaFinal {
    padding: 24px 20px;
  }
}
</style>
