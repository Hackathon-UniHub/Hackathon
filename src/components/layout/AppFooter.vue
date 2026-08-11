<template>
  <footer class="site-footer">
    <div class="container footer-content">
      <div class="brand-block">
        <div class="brand-row">
          <img src="../../assets/logo.svg" alt="UniHub" class="brand-logo" />
        </div>

        <p class="brand-copy">
          Encontre a universidade ideal para o seu futuro. Compare instituições, explore no mapa e
          tome decisões com confiança.
        </p>

        <div class="socials" aria-label="Redes sociais">
          <a href="#" aria-label="Instagram">◎</a>
          <a href="#" aria-label="Facebook">f</a>
          <a href="#" aria-label="X">x</a>
        </div>
      </div>

      <div class="footer-links">
        <div class="link-group">
          <h4>Produto</h4>
          <ul>
            <li><a href="#">Mapa interativo</a></li>
            <li><a href="#">Explorar</a></li>
            <li><a href="#">Como funciona</a></li>
          </ul>
        </div>

        <div class="link-group">
          <h4>Conta</h4>
          <ul>
            <li><a href="#">Entrar</a></li>
            <li><a href="#">Criar conta</a></li>
          </ul>
        </div>

        <div class="link-group">
          <h4>Contato</h4>
          <ul>
            <li><a href="mailto:contato@unihub.com.br">contato@unihub.com.br</a></li>
            <li><a href="tel:+5511998764321">+55 (11) 98765-4321</a></li>
            <li><a href="#">São Paulo, Brasil</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container footer-bottom">
      <span>© 2026 UniHub. Todos os direitos reservados.</span>
      <div class="bottom-links">
        <a href="#">Privacidade</a>
        <a href="#">Termos</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.site-footer {
  background: var(--ink-950);
  color: var(--white);
  padding-top: 64px;
}

.footer-content {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  padding-bottom: 36px;
}

.brand-block {
  max-width: 360px;
  flex: 1;
}

.brand-row {
  display: inline-flex;
  align-items: center;
  margin-bottom: 18px;
}

.brand-logo {
  display: block;
  width: 124px;
  height: auto;
  filter: brightness(0) invert(1);
}

.brand-copy {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  line-height: 1.7;
  margin-bottom: 22px;
}

.socials {
  display: flex;
  gap: 10px;
}

.socials a {
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

.socials a:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, minmax(170px, 1fr));
  gap: 36px;
  flex: 1.2;
}

.link-group h4 {
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.link-group ul {
  list-style: none;
  display: grid;
  gap: 10px;
}

.link-group li a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.96rem;
  transition: color 0.2s ease;
}

.link-group li a:hover {
  color: var(--white);
}

.footer-bottom {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.bottom-links {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.bottom-links a {
  color: rgba(255, 255, 255, 0.7);
}

.bottom-links a:hover {
  color: var(--white);
}

@media (max-width: 900px) {
  .footer-content {
    flex-direction: column;
    gap: 28px;
  }

  .footer-links {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .site-footer {
    padding-top: 44px;
  }

  .footer-links {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .footer-bottom {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
