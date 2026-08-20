<script setup>
import { RouterLink } from 'vue-router'

const universidadesNoMapa = [
  { sigla: 'USP', cidade: 'São Paulo', cor: '#8f1727' },
  { sigla: 'UNICAMP', cidade: 'Campinas', cor: '#2857a4' },
  { sigla: 'UFRGS', cidade: 'Porto Alegre', cor: '#24604e' },
  { sigla: 'UFRJ', cidade: 'Rio de Janeiro', cor: '#294b7e' },
  { sigla: 'UFMG', cidade: 'Belo Horizonte', cor: '#743038' },
  { sigla: 'UNESP', cidade: 'São Paulo', cor: '#3f712d' },
  { sigla: 'PUC-Rio', cidade: 'Rio de Janeiro', cor: '#a6263a' },
  { sigla: 'UFSC', cidade: 'Florianópolis', cor: '#1c6870' },
]
</script>

<template>
  <div class="mapaPagina">
    <div class="mapaContainer">
      <RouterLink class="voltar" to="/">← Voltar</RouterLink>

      <div class="mapaLayout">
        <aside class="mapaInformacoes">
          <span class="sobretitulo">Exploração</span>
          <h1>Mapa interativo</h1>
          <p class="descricao">
            Clique nos pins para conhecer universidades em todo o Brasil. Filtre depois na página
            Explorar para refinar sua busca.
          </p>

          <div class="aviso">
            <span class="avisoIcone">i</span>
            <p>
              Os pins representam instituições de destaque. Toque para ver o resumo e abrir o perfil
              completo.
            </p>
          </div>

          <div class="listaTitulo">No mapa</div>
          <ul class="universidadesLista">
            <li
              v-for="universidade in universidadesNoMapa"
              :key="universidade.sigla"
              class="universidadeItem"
            >
              <span class="universidadeNome">
                <span
                  class="universidadePonto"
                  :style="{ backgroundColor: universidade.cor }"
                ></span>
                {{ universidade.sigla }}
              </span>
              <span class="universidadeCidade">{{ universidade.cidade }}</span>
            </li>
          </ul>
        </aside>

        <section class="mapaPlaceholder" aria-label="Espaço reservado para o mapa">
          <div class="placeholderConteudo">
            <div class="placeholderIcone">⌖</div>
            <h2>Mapa em breve</h2>
            <p>Este espaço está preparado para receber o mapa interativo.</p>
          </div>
          <span class="contadorMapa"
            >{{ universidadesNoMapa.length }} universidades de exemplo</span
          >
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.mapaPagina {
  min-height: calc(100vh - 88px);
  padding: 42px 0 86px;
  background: #fffcf7;
  color: #1c1c22;
}

.mapaContainer {
  width: min(100% - 40px, 800px);
  margin: 0 auto;
}

.voltar {
  display: inline-block;
  margin-bottom: 18px;
  color: #737384;
  font-size: 0.85rem;
}

.voltar:hover {
  color: #7a0f1a;
}

.mapaLayout {
  display: grid;
  grid-template-columns: minmax(230px, 0.72fr) minmax(0, 1.28fr);
  gap: 28px;
  align-items: start;
}

.mapaInformacoes {
  padding-top: 4px;
}

.sobretitulo,
.listaTitulo {
  color: #9e1f2e;
  font-size: 0.7rem;
  font-weight: 800;
  letter-spacing: 0.1em;
  text-transform: uppercase;
}

.mapaInformacoes h1 {
  margin-top: 8px;
  font-size: clamp(2rem, 3vw, 2.6rem);
  letter-spacing: -0.04em;
  line-height: 1.05;
}

.descricao {
  max-width: 290px;
  margin-top: 14px;
  color: #5d5d6b;
  font-size: 0.9rem;
  line-height: 1.65;
}

.aviso {
  display: flex;
  gap: 12px;
  align-items: flex-start;
  max-width: 300px;
  margin-top: 18px;
  padding: 14px;
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 12px;
  background: #ffffff;
  box-shadow: 0 8px 20px rgba(28, 28, 34, 0.06);
}

.avisoIcone {
  display: grid;
  flex: 0 0 18px;
  place-items: center;
  width: 18px;
  height: 18px;
  border: 1px solid #b83d4a;
  border-radius: 50%;
  color: #b83d4a;
  font-size: 0.7rem;
  font-weight: 800;
}

.aviso p {
  color: #737384;
  font-size: 0.73rem;
  line-height: 1.55;
}

.listaTitulo {
  margin-top: 24px;
  color: #91919f;
  font-size: 0.65rem;
}

.universidadesLista {
  display: grid;
  gap: 14px;
  margin-top: 12px;
  padding: 0;
  list-style: none;
}

.universidadeItem {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
  max-width: 300px;
  color: #41414a;
  font-size: 0.78rem;
}

.universidadeNome {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  white-space: nowrap;
}

.universidadePonto {
  width: 8px;
  height: 8px;
  border-radius: 50%;
}

.universidadeCidade {
  color: #a1a1aa;
  font-size: 0.68rem;
  text-align: right;
}

.mapaPlaceholder {
  position: relative;
  display: grid;
  min-height: 372px;
  place-items: center;
  overflow: hidden;
  border: 1px solid rgba(28, 28, 34, 0.1);
  border-radius: 18px;
  background-color: #ffffff;
  background-image: radial-gradient(#e5e1d9 0.8px, transparent 0.8px);
  background-size: 18px 18px;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.06);
}

.placeholderConteudo {
  position: relative;
  z-index: 1;
  padding: 28px;
  text-align: center;
}

.placeholderIcone {
  display: grid;
  width: 52px;
  height: 52px;
  margin: 0 auto 14px;
  place-items: center;
  border: 1px solid rgba(122, 15, 26, 0.18);
  border-radius: 50%;
  background: #fdf5f5;
  color: #7a0f1a;
  font-size: 1.7rem;
}

.placeholderConteudo h2 {
  font-size: 1.3rem;
}

.placeholderConteudo p {
  max-width: 240px;
  margin-top: 8px;
  color: #91919f;
  font-size: 0.8rem;
  line-height: 1.5;
}

.contadorMapa {
  position: absolute;
  right: 16px;
  bottom: 16px;
  padding: 10px 12px;
  border: 1px solid rgba(28, 28, 34, 0.08);
  border-radius: 10px;
  background: rgba(255, 255, 255, 0.9);
  color: #5d5d6b;
  font-size: 0.68rem;
}

@media (max-width: 700px) {
  .mapaPagina {
    padding-top: 28px;
  }

  .mapaContainer {
    width: min(100% - 32px, 520px);
  }

  .mapaLayout {
    grid-template-columns: 1fr;
  }

  .descricao,
  .aviso,
  .universidadeItem {
    max-width: none;
  }

  .mapaPlaceholder {
    min-height: 300px;
  }
}
</style>
