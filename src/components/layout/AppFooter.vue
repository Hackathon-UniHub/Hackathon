<script setup>
import { HugeiconsIcon } from '@hugeicons/vue'
import { InstagramIcon, Facebook01Icon, NewTwitterIcon } from '@hugeicons/core-free-icons'
</script>

<template>
  <footer class="rodape">
    <div class="container rodape-conteudo">
      <div class="bloco-marca">
        <div class="linha-marca">
          <img src="../../assets/logo.svg" alt="UniHub" class="logo-marca" />
        </div>

        <p class="texto-marca">
          Encontre a universidade ideal para o seu futuro. Compare instituições, explore no mapa e
          tome decisões com confiança.
        </p>

        <div class="redes-sociais" aria-label="Redes sociais">
          <a href="#" aria-label="Instagram">
            <HugeiconsIcon
              :icon="InstagramIcon"
              :size="20"
              color="currentColor"
              :stroke-width="1.8"
            />
          </a>
          <a href="#" aria-label="Facebook">
            <HugeiconsIcon
              :icon="Facebook01Icon"
              :size="20"
              color="currentColor"
              :stroke-width="1.8"
            />
          </a>
          <a href="#" aria-label="X">
            <HugeiconsIcon
              :icon="NewTwitterIcon"
              :size="20"
              color="currentColor"
              :stroke-width="1.8"
            />
          </a>
        </div>
      </div>

      <div class="links-rodape">
        <div class="grupo-links">
          <h4>Produto</h4>
          <ul>
            <li><a href="#">Mapa interativo</a></li>
            <li><a href="#">Explorar</a></li>
            <li><a href="#">Como funciona</a></li>
          </ul>
        </div>

        <div class="grupo-links">
          <h4>Conta</h4>
          <ul>
            <li><a href="#">Entrar</a></li>
            <li><a href="#">Criar conta</a></li>
          </ul>
        </div>

        <div class="grupo-links">
          <h4>Contato</h4>
          <ul>
            <li><a href="mailto:contato@unihub.com.br">contato@unihub.com.br</a></li>
            <li><a href="tel:+5511998764321">+55 (11) 98765-4321</a></li>
            <li><a href="#">São Paulo, Brasil</a></li>
          </ul>
        </div>
      </div>
    </div>

    <div class="container rodape-inferior">
      <span>© 2026 UniHub. Todos os direitos reservados.</span>
      <div class="links-inferiores">
        <a href="#">Privacidade</a>
        <a href="#">Termos</a>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.rodape {
  background: var(--ink-950);
  color: var(--white);
  padding-top: 64px;
}

.rodape-conteudo {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
  padding-bottom: 36px;
}

.bloco-marca {
  max-width: 360px;
  flex: 1;
}

.linha-marca {
  display: inline-flex;
  align-items: center;
  margin-bottom: 18px;
}

.logo-marca {
  display: block;
  width: 124px;
  height: auto;
  filter: brightness(0) invert(1);
}

.texto-marca {
  color: rgba(255, 255, 255, 0.82);
  font-size: 0.96rem;
  line-height: 1.7;
  margin-bottom: 22px;
}

.redes-sociais {
  display: flex;
  gap: 10px;
}

.redes-sociais a {
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

.redes-sociais a:hover {
  transform: translateY(-1px);
  background: rgba(255, 255, 255, 0.1);
}

.links-rodape {
  display: grid;
  grid-template-columns: repeat(3, minmax(170px, 1fr));
  gap: 36px;
  flex: 1.2;
}

.grupo-links h4 {
  margin-bottom: 16px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.grupo-links ul {
  list-style: none;
  display: grid;
  gap: 10px;
}

.grupo-links li a {
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.96rem;
  transition: color 0.2s ease;
}

.grupo-links li a:hover {
  color: var(--white);
}

.rodape-inferior {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 18px 0 26px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  color: rgba(255, 255, 255, 0.7);
  font-size: 0.9rem;
}

.links-inferiores {
  display: inline-flex;
  align-items: center;
  gap: 18px;
}

.links-inferiores a {
  color: rgba(255, 255, 255, 0.7);
}

.links-inferiores a:hover {
  color: var(--white);
}

@media (max-width: 900px) {
  .rodape-conteudo {
    flex-direction: column;
    gap: 28px;
  }

  .links-rodape {
    width: 100%;
  }
}

@media (max-width: 640px) {
  .rodape {
    padding-top: 44px;
  }

  .links-rodape {
    grid-template-columns: 1fr;
    gap: 22px;
  }

  .rodape-inferior {
    flex-direction: column;
    gap: 12px;
    align-items: flex-start;
  }
}
</style>
