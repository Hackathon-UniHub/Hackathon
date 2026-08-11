<template>
  <main class="page-shell">
    <section class="hero-section">
      <div class="container hero-layout">
        <div class="hero-copy">
          <div class="mini-badge">Atualizado agora</div>

          <h1>
            Encontre a sua
            <span>universidade ideal</span>
            no Brasil
          </h1>

          <p>Compare instituições, explore no mapa e tome decisões com confiança.</p>

          <div class="hero-actions">
            <a href="#" class="btn btn-primary">Começar agora</a>
            <a href="#" class="btn btn-secondary">Ver mapa interativo</a>
          </div>

          <div class="stats-grid">
            <article class="stat-card">
              <strong>200+</strong>
              <span>Universidades</span>
            </article>
            <article class="stat-card">
              <strong>5 mil</strong>
              <span>Estudantes</span>
            </article>
            <article class="stat-card">
              <strong>48k</strong>
              <span>Comentários</span>
            </article>
            <article class="stat-card">
              <strong>4.9</strong>
              <span>Ranking</span>
            </article>
          </div>
        </div>

        <div class="hero-visual">
          <div class="photo-card">
            <div class="photo-header">
              <span class="tiny-tag">#1</span>
              <span class="tiny-tag muted">Working</span>
            </div>

            <div class="portrait">
              <div class="portrait-placeholder"></div>
            </div>

            <div class="photo-caption">
              <strong>Hannah</strong>
              <p>“Selecionei a melhor opção para mudar minha vida acadêmica.”</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="universities-section">
      <div class="container">
        <div class="section-header">
          <span class="eyebrow">Universidades</span>
          <h2>Universidades mais buscadas</h2>
          <a href="#">Ver todas</a>
        </div>

        <div class="university-grid">
          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-primary">USP</span>
              <span class="rating">4.9</span>
            </div>
            <h3>Universidade de São Paulo</h3>
            <p>São Paulo, SP</p>
            <div class="card-meta">
              <span>Medicina</span>
              <span>Ensino</span>
            </div>
          </article>

          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-blue">UNICAMP</span>
              <span class="rating">4.8</span>
            </div>
            <h3>Universidade Estadual de Campinas</h3>
            <p>Campinas, SP</p>
            <div class="card-meta">
              <span>Tecnologia</span>
              <span>Pesquisa</span>
            </div>
          </article>

          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-green">UERJ</span>
              <span class="rating">4.7</span>
            </div>
            <h3>Universidade do Estado do Rio de Janeiro</h3>
            <p>Rio de Janeiro, RJ</p>
            <div class="card-meta">
              <span>Direito</span>
              <span>Ciências</span>
            </div>
          </article>

          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-primary">UFRJ</span>
              <span class="rating">4.7</span>
            </div>
            <h3>Universidade Federal do Rio de Janeiro</h3>
            <p>Rio de Janeiro, RJ</p>
            <div class="card-meta">
              <span>Engenharia</span>
              <span>Inovação</span>
            </div>
          </article>

          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-blue">UFMG</span>
              <span class="rating">4.6</span>
            </div>
            <h3>Universidade Federal de Minas Gerais</h3>
            <p>Belo Horizonte, MG</p>
            <div class="card-meta">
              <span>Áreas</span>
              <span>Pesquisa</span>
            </div>
          </article>

          <article class="university-card">
            <div class="card-top">
              <span class="badge badge-green">UFBA</span>
              <span class="rating">4.6</span>
            </div>
            <h3>Universidade Federal da Bahia</h3>
            <p>Salvador, BA</p>
            <div class="card-meta">
              <span>Saúde</span>
              <span>Humanas</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="how-it-works">
      <div class="container how-inner">
        <span class="eyebrow light">Como funciona</span>
        <h2>Como o UniHub funciona?</h2>
        <p>Três passos simples para começar sua jornada acadêmica.</p>

        <div class="steps-grid">
          <article class="step-card">
            <div class="step-number">01</div>
            <h3>Busque e filtre</h3>
            <p>Encontre universidades por curso, localização e avaliação.</p>
          </article>

          <article class="step-card">
            <div class="step-number">02</div>
            <h3>Explore no mapa</h3>
            <p>Veja opções em cada região e compare melhor sua escolha.</p>
          </article>

          <article class="step-card">
            <div class="step-number">03</div>
            <h3>Compare e decida</h3>
            <p>Analise ideias, critérios e tome sua decisão com segurança.</p>
          </article>
        </div>

        <div class="cta-box">
          <a href="#" class="btn btn-primary">Criar conta grátis</a>
        </div>
      </div>
    </section>

    <section class="final-cta">
      <div class="container final-cta-inner">
        <div class="cta-copy">
          <h2>Pronto para encontrar a universidade ideal?</h2>
          <p>Junte-se a milhares de estudantes que já usam o UniHub para planejar o futuro.</p>
        </div>

        <div class="cta-actions">
          <a href="#" class="btn btn-secondary">Explorar universidades</a>
          <a href="#" class="btn btn-primary">Abrir mapa</a>
        </div>
      </div>
    </section>
  </main>
</template>

<style scoped>
.page-shell {
  background: var(--cream-50);
}

.hero-section {
  padding: 52px 0 28px;
}

.hero-layout {
  display: grid;
  grid-template-columns: 1.15fr 0.85fr;
  gap: 36px;
  align-items: center;
}

.hero-copy {
  padding: 16px 0;
}

.mini-badge {
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

.hero-copy h1 {
  margin-top: 20px;
  font-size: clamp(2.4rem, 4vw, 4rem);
  line-height: 1.02;
  letter-spacing: -0.05em;
  color: var(--ink-900);
  max-width: 540px;
}

.hero-copy h1 span {
  display: block;
  color: var(--brand-700);
  font-style: italic;
  font-weight: 700;
}

.hero-copy p {
  margin-top: 18px;
  max-width: 560px;
  color: var(--ink-700);
  font-size: 1.04rem;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 28px;
}

.btn {
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

.btn:hover {
  transform: translateY(-1px);
}

.btn-primary {
  background: linear-gradient(135deg, var(--brand-700), var(--brand-600));
  color: var(--white);
  box-shadow: 0 12px 24px rgba(122, 15, 26, 0.14);
}

.btn-secondary {
  background: rgba(255, 255, 255, 0.4);
  color: var(--ink-900);
  border: 1px solid var(--color-border);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
  margin-top: 28px;
  max-width: 620px;
}

.stat-card {
  background: rgba(255, 255, 255, 0.66);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 18px;
  padding: 18px 14px 16px;
  text-align: center;
  box-shadow: 0 8px 20px rgba(28, 28, 34, 0.03);
}

.stat-card strong {
  display: block;
  color: var(--ink-900);
  font-size: 1.45rem;
  line-height: 1.2;
}

.stat-card span {
  display: block;
  margin-top: 6px;
  color: var(--ink-600);
  font-size: 0.76rem;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.photo-card {
  width: min(100%, 480px);
  background: linear-gradient(135deg, #f5efe9, #ede4dd);
  border: 1px solid rgba(28, 28, 34, 0.06);
  border-radius: 30px;
  padding: 18px 18px 16px;
  box-shadow: 0 18px 36px rgba(28, 28, 34, 0.08);
}

.photo-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 14px;
}

.tiny-tag {
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

.tiny-tag.muted {
  background: rgba(28, 28, 34, 0.06);
  color: var(--ink-700);
}

.portrait {
  border-radius: 20px;
  overflow: hidden;
  background: linear-gradient(135deg, #e6d9d1, #d7dadd);
  min-height: 280px;
}

.portrait-placeholder {
  width: 100%;
  height: 100%;
  min-height: 280px;
  background:
    radial-gradient(circle at 50% 28%, rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0) 20%),
    linear-gradient(180deg, #d5c6ba 0%, #c7c1bc 100%);
  position: relative;
}

.portrait-placeholder::before {
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

.portrait-placeholder::after {
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

.photo-caption {
  margin-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.photo-caption strong {
  color: var(--ink-900);
  font-size: 1rem;
}

.photo-caption p {
  color: var(--ink-700);
  font-size: 0.82rem;
  line-height: 1.5;
}

.universities-section {
  padding: 36px 0 46px;
}

.section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.section-header h2 {
  color: var(--ink-900);
  font-size: clamp(1.8rem, 2vw, 2.4rem);
  letter-spacing: -0.04em;
}

.section-header a {
  color: var(--brand-700);
  font-weight: 700;
  text-decoration: none;
}

.eyebrow {
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

.university-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}

.university-card {
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 20px;
  padding: 18px 18px 16px;
  box-shadow: 0 10px 30px rgba(28, 28, 34, 0.04);
}

.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 16px;
}

.badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 5px 8px;
  border-radius: 8px;
  font-size: 0.62rem;
  font-weight: 800;
  letter-spacing: 0.04em;
}

.badge-primary {
  background: rgba(122, 15, 26, 0.1);
  color: var(--brand-700);
}

.badge-blue {
  background: rgba(59, 130, 246, 0.12);
  color: #1d4ed8;
}

.badge-green {
  background: rgba(34, 197, 94, 0.12);
  color: #15803d;
}

.rating {
  color: var(--brand-700);
  font-weight: 800;
  font-size: 0.8rem;
}

.university-card h3 {
  color: var(--ink-900);
  font-size: 1.06rem;
  line-height: 1.4;
  margin-bottom: 8px;
}

.university-card p {
  color: var(--ink-600);
  font-size: 0.82rem;
  margin-bottom: 14px;
}

.card-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.card-meta span {
  display: inline-flex;
  align-items: center;
  padding: 5px 8px;
  border-radius: 999px;
  background: rgba(28, 28, 34, 0.04);
  color: var(--ink-700);
  font-size: 0.7rem;
}

.how-it-works {
  background: var(--ink-950);
  color: var(--white);
  padding: 54px 0 36px;
}

.how-inner {
  text-align: center;
}

.eyebrow.light {
  background: rgba(255, 255, 255, 0.08);
  color: var(--white);
}

.how-it-works h2 {
  margin-top: 12px;
  font-size: clamp(2rem, 3vw, 2.8rem);
  letter-spacing: -0.04em;
}

.how-it-works p {
  margin-top: 12px;
  color: rgba(255, 255, 255, 0.7);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
  margin-top: 36px;
}

.step-card {
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  border-radius: 20px;
  padding: 22px 18px;
  text-align: left;
}

.step-number {
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

.step-card h3 {
  margin-bottom: 12px;
  color: var(--white);
  font-size: 1.1rem;
}

.step-card p {
  margin: 0;
  color: rgba(255, 255, 255, 0.76);
  line-height: 1.6;
}

.cta-box {
  margin-top: 28px;
  display: flex;
  justify-content: center;
}

.final-cta {
  padding: 42px 0 68px;
}

.final-cta-inner {
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 38px 34px;
  border-radius: 28px;
  background: linear-gradient(135deg, var(--brand-700), var(--brand-500));
  color: var(--white);
  box-shadow: 0 18px 34px rgba(122, 15, 26, 0.12);
}

.cta-copy h2 {
  font-size: clamp(2rem, 3vw, 3rem);
  line-height: 1.1;
  letter-spacing: -0.05em;
}

.cta-copy p {
  margin-top: 12px;
  max-width: 620px;
  color: rgba(255, 255, 255, 0.85);
}

.cta-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

.cta-actions .btn-secondary {
  background: rgba(255, 255, 255, 0.12);
  border-color: rgba(255, 255, 255, 0.3);
  color: var(--white);
}

@media (max-width: 980px) {
  .hero-layout,
  .university-grid,
  .steps-grid {
    grid-template-columns: 1fr;
  }

  .hero-layout {
    display: grid;
  }

  .stats-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {
  .hero-section {
    padding-top: 30px;
  }

  .hero-actions,
  .cta-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .btn {
    width: 100%;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .stats-grid {
    grid-template-columns: 1fr 1fr;
  }

  .final-cta-inner {
    padding: 24px 20px;
  }
}
</style>
