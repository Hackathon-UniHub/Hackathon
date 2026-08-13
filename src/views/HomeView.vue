<template>
  <main class="pagina">
    <section class="secao-principal">
      <div class="container layout-principal">
        <div class="texto-principal">
          <h1>
            Encontre a sua
            <span>universidade ideal</span>
            no Brasil
          </h1>

          <p>Compare instituições, explore no mapa e tome decisões com confiança.</p>

          <div class="acoes-principal">
            <a href="#" class="botao botao-primario">Começar agora</a>
            <a href="#" class="botao botao-secundario">Ver mapa interativo</a>
          </div>

          <div class="grade-estatisticas">
            <article class="cartao-estatistica">
              <strong>200+</strong>
              <span>Universidades</span>
            </article>
            <article class="cartao-estatistica">
              <strong>5 mil</strong>
              <span>Estudantes</span>
            </article>
            <article class="cartao-estatistica">
              <strong>48k</strong>
              <span>Comentários</span>
            </article>
            <article class="cartao-estatistica">
              <strong>4.9</strong>
              <span>Ranking</span>
            </article>
          </div>
        </div>

        <div class="visual-principal">
          <div class="cartao-foto">
            <div class="cabecalho-foto">
              <span class="etiqueta-pequena">#1</span>
              <span class="etiqueta-pequena etiqueta-pequena-muted">Working</span>
            </div>

            <div class="retrato">
              <div class="placeholder-retrato"></div>
            </div>

            <div class="legenda-foto">
              <strong>Hannah</strong>
              <p>“Selecionei a melhor opção para mudar minha vida acadêmica.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="secao-universidades">
      <div class="container">
        <div class="cabecalho-secao">
          <span class="destaque">Universidades</span>
          <h2>Universidades mais buscadas</h2>
          <a href="#">Ver todas</a>
        </div>

        <div class="grade-universidades"></div>
      </div>
    </section>

    <section class="como-funciona">
      <div class="container conteudo-como-funciona">
        <span class="destaque destaque-claro">Como funciona</span>
        <h2>Como o <span class="texto-destaque">UniHub</span> funciona?</h2>
        <p>Três passos simples para começar sua jornada acadêmica.</p>

        <div class="grade-passos">
          <article class="cartao-passo">
            <div class="numero-passo">01</div>
            <h3>Busque e filtre</h3>
            <p>Encontre universidades por curso, localização e avaliação.</p>
          </article>

          <article class="cartao-passo">
            <div class="numero-passo">02</div>
            <h3>Explore no mapa</h3>
            <p>Veja opções em cada região e compare melhor sua escolha.</p>
          </article>

          <article class="cartao-passo">
            <div class="numero-passo">03</div>
            <h3>Compare e decida</h3>
            <p>Analise ideias, critérios e tome sua decisão com segurança.</p>
          </article>
        </div>

        <div class="caixa-acao">
          <a href="#" class="botao botao-primario">Criar conta grátis</a>
        </div>
      </div>
    </section>

    <section class="chamada-final">
      <div class="container conteudo-chamada-final">
        <div class="texto-chamada">
          <h2>Pronto para encontrar a universidade ideal?</h2>
          <p>Junte-se a milhares de estudantes que já usam o UniHub para planejar o futuro.</p>
        </div>

        <div class="acoes-chamada">
          <a href="#" class="botao botao-secundario">Explorar universidades</a>
          <a href="#" class="botao botao-primario">Abrir mapa</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.pagina {
  background: var(--cream-50);
}

.secao-principal {
  padding: 52px 0 28px;
}

.layout-principal {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 36px;
  align-items: center;
}

.texto-principal {
  padding: 16px 0;
}

.etiqueta-mini {
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

.texto-principal h1 {
  margin-top: 20px;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
  color: var(--ink-900);
  max-width: 540px;
}

.texto-principal h1 span {
  display: block;
  color: var(--brand-700);
  font-style: italic;
  font-weight: 400;
  font-family: 'Georgia', 'Times New Roman', serif;
}

.texto-principal p {
  margin-top: 18px;
  max-width: 560px;
  color: var(--ink-700);
  font-size: 1.04rem;
}

.acoes-principal {
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

.botao-primario {
  background: linear-gradient(135deg, var(--brand-700), var(--brand-600));
  color: var(--white);
  box-shadow: 0 12px 24px rgba(122, 15, 26, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.botao-secundario {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
  border: 1px solid rgba(255, 255, 255, 0.22);
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.15);
}

.grade-estatisticas {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
  max-width: 620px;
}

.cartao-estatistica {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 18px;
  padding: 18px 14px 16px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(28, 28, 34, 0.03);
}

.cartao-estatistica strong {
  display: block;
  color: var(--ink-900);
  font-size: 1.45rem;
  line-height: 1.2;
}

.cartao-estatistica span {
  display: block;
  margin-top: 6px;
  color: var(--ink-600);
  font-size: 0.76rem;
}

.visual-principal {
  display: flex;
  justify-content: center;
}

.cartao-foto {
  width: min(100%, 480px);
  background: linear-gradient(135deg, #f5efe9, #ede4dd);
  border: 1px solid rgba(28, 28, 34, 0.06);
  border-radius: 30px;
  padding: 18px 18px 16px;
  box-shadow: 0 18px 36px rgba(28, 28, 34, 0.08);
}

.cabecalho-foto {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.etiqueta-pequena {
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

.etiqueta-pequena-muted {
  background: rgba(28, 28, 34, 0.06);
  color: var(--ink-700);
}

.retrato {
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #e6d9d1, #d7dadd);
  min-height: 280px;
}

.placeholder-retrato {
  width: 100%;
  height: 100%;
  min-height: 280px;
  background:
    radial-gradient(circle at 50% 28%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 20%),
    linear-gradient(180deg, #d5c6ba 0%, #c7c1bc 100%);
  position: relative;
}

.placeholder-retrato::before {
  content: '';
  position: absolute;
  width: 140px;
  height: 140px;
  border-radius: 50%;
  background: linear-gradient(180deg, #f5d9c7 0%, #e7c7af 100%);
  left: 50%;
  top: 20%;
  transform: translateX(-50%);
  box-shadow: 0 18px 0 -10px rgba(255, 255, 255, 0.25);
}

.placeholder-retrato::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: 0;
  transform: translateX(-50%);
  width: 220px;
  height: 150px;
  border-radius: 50% 50% 0 0;
  background: linear-gradient(180deg, #1d1a22, #2f2a32);
}

.legenda-foto {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.legenda-foto strong {
  color: var(--ink-900);
  font-size: 1rem;
}

.legenda-foto p {
  color: var(--ink-700);
  font-size: 0.82rem;
  line-height: 1.5;
}

.secao-universidades {
  padding: 36px 0 46px;
}

.cabecalho-secao {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.cabecalho-secao h2 {
  color: var(--ink-900);
  font-size: clamp(1.8rem, 2vw, 2.4rem);
  letter-spacing: -0.04em;
}

.cabecalho-secao a {
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

.destaque-claro {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
}

.grade-universidades {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.cartao-universidade {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 20px;
  padding: 18px 18px 16px;
  box-shadow: 0 10px 30px rgba(28, 28, 34, 0.04);
}

.topo-cartao {
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

.marca-primaria {
  background: rgba(122, 15, 26, 0.1);
  color: var(--brand-700);
}

.marca-azul {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}

.marca-verde {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.avaliacao {
  color: var(--brand-700);
  font-weight: 800;
  font-size: 0.8rem;
}

.cartao-universidade h3 {
  color: var(--ink-900);
  font-size: 1.06rem;
  line-height: 1.4;
  margin-bottom: 8px;
}

.cartao-universidade p {
  color: var(--ink-600);
  font-size: 0.82rem;
  margin-bottom: 14px;
}

.meta-cartao {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.meta-cartao span {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(28, 28, 34, 0.04);
  color: var(--ink-700);
  font-size: 0.7rem;
}

.como-funciona {
  background: linear-gradient(180deg, var(--ink-950) 0%, #1a1a22 100%);
  color: var(--white);
  padding: 54px 0 36px;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.conteudo-como-funciona {
  text-align: center;
}

.como-funciona h2 {
  margin-top: 12px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.04em;
}

.texto-destaque {
  color: var(--brand-400);
  font-weight: 700;
}

.como-funciona p {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.grade-passos {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 36px;
}

.cartao-passo {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(122, 15, 26, 0.05));
  border-radius: 20px;
  padding: 22px 18px;
  text-align: left;
  box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.04);
}

.numero-passo {
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

.cartao-passo h3 {
  margin-bottom: 12px;
  color: var(--white);
  font-size: 1.1rem;
}

.cartao-passo p {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.6;
}

.caixa-acao {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.chamada-final {
  padding: 60px 0 82px;
}

.conteudo-chamada-final {
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

.texto-chamada h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.texto-chamada p {
  margin-top: 12px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.85);
}

.acoes-chamada {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.acoes-chamada .botao-secundario {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--white);
}

@media (max-width: 980px) {
  .layout-principal,
  .grade-universidades,
  .grade-passos {
    grid-template-columns: 1fr;
  }

  .layout-principal {
    display: grid;
  }

  .grade-estatisticas {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .secao-principal {
    padding-top: 30px;
  }

  .acoes-principal,
  .acoes-chamada {
    flex-direction: column;
    align-items: stretch;
  }

  .botao {
    width: 100%;
  }

  .cabecalho-secao {
    align-items: flex-start;
    flex-direction: column;
  }

  .grade-estatisticas {
    grid-template-columns: 1fr 1fr;
  }

  .conteudo-chamada-final {
    padding: 24px 20px;
  }
}
</style>
