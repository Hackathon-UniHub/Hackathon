<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  UniversidadePorId,
  getIniciais,
  getAnoFundacao,
  UniversidadePublica,
} from '@/utils/universidadesUtils.js'

const route = useRoute()
const universidade = computed(() => UniversidadePorId(route.params.id))

const siteOficial = computed(() => {
  const site = universidade.value?.site

  if (!site) return '#'
  if (/^https?:\/\//i.test(site)) return site
  if (site.startsWith('//')) return `https:${site}`

  return `https://${site}`
})

const iniciais = computed(() => getIniciais(universidade.value))
const anoFundacao = computed(() => getAnoFundacao(universidade.value))
const isPublica = computed(() => UniversidadePublica(universidade.value))
</script>

<template>
  <div class="paginaFundo" v-if="universidade">
    <div class="paginaUniversidade">
      <RouterLink to="/universidades" class="voltar">Voltar ao catálogo</RouterLink>

      <div class="cabecalho">
        <div class="logo">{{ iniciais }}</div>

        <div class="conteudoCabecalho">
          <div class="selos">
            <span class="selo" :class="isPublica ? 'seloPublica' : 'seloPrivada'">
              {{ universidade.categoria_administrativa }}
            </span>
            <span class="selo seloSituacao" v-if="universidade.situacao">
              {{ universidade.situacao }}
            </span>
          </div>

          <h1>{{ universidade.nome }}</h1>
          <p class="localizacao">{{ universidade.municipio }}, {{ universidade.uf }}</p>
        </div>

        <div class="acoesCabecalho">
          <div class="nota" v-if="universidade.igc && universidade.igc !== '-'">
            {{ universidade.igc }}
            <span class="notaLegenda">IGC/MEC</span>
          </div>
          <button class="botaoFavoritar">Favoritar</button>
          <a class="botaoSite" :href="siteOficial" target="_blank" rel="noopener noreferrer">
            Site oficial
          </a>
        </div>
      </div>

      <div class="estatisticas">
        <div class="caixaEstatistica" v-if="universidade.quantidade_alunos">
          <p class="valorEstatistica">{{ universidade.quantidade_alunos }}</p>
          <p class="rotuloEstatistica">Alunos</p>
        </div>
        <div class="caixaEstatistica" v-if="universidade.quantidade_cursos">
          <p class="valorEstatistica">{{ universidade.quantidade_cursos }}</p>
          <p class="rotuloEstatistica">Cursos</p>
        </div>
      </div>

      <div class="conteudo">
        <div class="secoesSuperiores">
          <div class="secao" v-if="universidade.descricao">
            <h2>Sobre a instituição</h2>
            <p class="descricao">{{ universidade.descricao }}</p>

            <div class="etiquetas" v-if="universidade.principais_graduacoes?.length">
              <span
                class="etiqueta"
                v-for="curso in universidade.principais_graduacoes"
                :key="curso"
              >
                {{ curso }}
              </span>
              <img class="graduacao" src="/src/components/icons/graduacao.svg" alt="Graduação" />
            </div>
          </div>

          <div class="secao" v-if="universidade.diferenciais?.length">
            <h2>Diferenciais</h2>
            <div class="gradeDiferenciais">
              <div class="itemDiferencial" v-for="dif in universidade.diferenciais" :key="dif">
                <p>{{ dif }}</p>
              </div>
            </div>
          </div>

          <div class="secao">
            <h2>Avaliações do MEC</h2>
            <div class="gradeAvaliacoes">
              <div class="avaliacaoItem" v-if="universidade.ci && universidade.ci !== '-'">
                <p class="notaRotulo">Conceito Institucional (Presencial)</p>
                <p class="notaValor">
                  {{ universidade.ci }}
                  <span v-if="universidade.ano_ci">({{ universidade.ano_ci }})</span>
                </p>
              </div>
              <div class="avaliacaoItem" v-if="universidade.ci_ead && universidade.ci_ead !== '-'">
                <p class="notaRotulo">Conceito Institucional (EAD)</p>
                <p class="notaValor">
                  {{ universidade.ci_ead }}
                  <span v-if="universidade.ano_ci_ead">({{ universidade.ano_ci_ead }})</span>
                </p>
              </div>
              <div class="avaliacaoItem" v-if="universidade.igc && universidade.igc !== '-'">
                <p class="notaRotulo">Índice Geral de Cursos (IGC)</p>
                <p class="notaValor">
                  {{ universidade.igc }}
                  <span v-if="universidade.ano_igc">({{ universidade.ano_igc }})</span>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="caixaInstitucional">
          <div class="tituloInstitucional">
            <h3>Informações institucionais</h3>
            <img class="medalha" src="/src/components/icons/medalha.svg" alt="medalha" />
          </div>
          <div class="linhaDado" v-if="universidade.razao_social">
            <span class="dadoRotulo">Razão social</span>
            <span class="dadoValor">{{ universidade.razao_social }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.cnpj">
            <span class="dadoRotulo">CNPJ</span>
            <span class="dadoValor">{{ universidade.cnpj }}</span>
          </div>
          <div class="linhaDado" v-if="anoFundacao">
            <span class="dadoRotulo">Fundação</span>
            <span class="dadoValor">{{ anoFundacao }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.natureza_juridica">
            <span class="dadoRotulo">Natureza jurídica</span>
            <span class="dadoValor">{{ universidade.natureza_juridica }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.organizacao_academica">
            <span class="dadoRotulo">Organização acadêmica</span>
            <span class="dadoValor">{{ universidade.organizacao_academica }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.tipo_credenciamento">
            <span class="dadoRotulo">Credenciamento</span>
            <span class="dadoValor">{{ universidade.tipo_credenciamento }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.endereco_sede">
            <span class="dadoRotulo">Endereço</span>
            <span class="dadoValor">{{ universidade.endereco_sede }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.site">
            <span class="dadoRotulo">Site</span>
            <span class="dadoValor">{{ universidade.site }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.telefone">
            <span class="dadoRotulo">Telefone</span>
            <span class="dadoValor">{{ universidade.telefone }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.email">
            <span class="dadoRotulo">E-mail</span>
            <span class="dadoValor">{{ universidade.email }}</span>
          </div>
          <div class="linhaDado" v-if="universidade.sinalizacoes_vigentes">
            <span class="dadoRotulo">Sinalizações vigentes</span>
            <span class="dadoValor alerta">{{ universidade.sinalizacoes_vigentes }}</span>
          </div>
        </div>

        <div class="secao" v-if="universidade.fontes_pesquisa?.length">
          <h2>Fontes de pesquisa</h2>
          <ul class="listaFontes">
            <li v-for="fonte in universidade.fontes_pesquisa" :key="fonte">{{ fonte }}</li>
          </ul>
        </div>

        <div class="caixaCadastro">
          <h3>Interessado em {{ universidade.sigla || universidade.nome }}?</h3>
          <p>Crie uma conta para salvar favoritos, ver mais instituições e localizalas no mapa.</p>
          <button class="botaoPrimario">Criar conta grátis</button>
          <RouterLink to="/universidades" class="botaoSecundario">Outras universidades</RouterLink>
        </div>
      </div>
    </div>
  </div>

  <div class="paginaFundo" v-else>
    <div class="paginaErro">
      <div class="conteudoErro">
        <h1 class="codigoStatus">404</h1>
        <h2 class="tituloPrincipal">Universidade não encontrada</h2>

        <p class="textoDescritivo">
          O site oficial dessa instituição não está disponível no momento ou não foi informado
          corretamente. Volte para a listagem e explore outras opções no
          <span class="textoDestacado">UniHub</span>.
        </p>

        <div class="grupoBotoes">
          <RouterLink to="/" class="erroBotao erroBotaoPrimario">Voltar ao Início</RouterLink>
          <RouterLink to="/universidades" class="erroBotao erroBotaoSecundario">
            Explorar Universidades
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.graduacao {
  width: 40px;
  height: 40px;
  margin-left: 0.3rem;
}
.tituloInstitucional {
  display: flex;
  gap: 0.5rem;
}
.tituloInstitucional h3 {
  margin: 20px 0 0 0;
}
.medalha {
  width: 40px;
  height: 40px;
  margin: 0rem 0 0px 0;
}
.estrela {
  width: 16px;
  height: 16px;
  margin-left: 0.3rem;
}
.paginaFundo {
  min-height: 100vh;
  background-color: #fffcf7;
}

.paginaUniversidade {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  font-family: inherit;
  color: #1c1c22;
}

.voltar {
  color: #5d5d6b;
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1.5rem;
}
.voltar:hover {
  color: #7a0f1a;
}

.cabecalho {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background: linear-gradient(135deg, #30070c, #121216);
  border-radius: 16px;
  padding: 2rem;
  color: #ffffff;
  flex-wrap: wrap;
}

.logo {
  width: 80px;
  height: 80px;
  min-width: 80px;
  border-radius: 14px;
  background-color: #7a0f1a;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1.3rem;
  letter-spacing: 1px;
}

.conteudoCabecalho {
  flex: 1;
  min-width: 240px;
}

.selos {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 0.6rem;
}

.selo {
  font-size: 0.75rem;
  font-weight: 600;
  padding: 0.25rem 0.65rem;
  border-radius: 999px;
}
.seloPublica {
  background-color: #41414a;
  color: #eeeef0;
}
.seloPrivada {
  background-color: #58141c;
  color: #f0cdd0;
}
.seloSituacao {
  background-color: #4c4c57;
  color: #f7f7f8;
}

.cabecalho h1 {
  margin: 0 0 0.3rem;
  font-size: 1.6rem;
}

.localizacao {
  margin: 0;
  color: #d9d9de;
  font-size: 0.95rem;
}

.acoesCabecalho {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-wrap: wrap;
}

.nota {
  background-color: #41414a;
  padding: 0.5rem 0.9rem;
  border-radius: 10px;
  text-align: center;
  font-weight: 700;
}
.notaLegenda {
  display: block;
  font-size: 0.65rem;
  font-weight: 400;
  color: #91919f;
}

.botaoFavoritar,
.botaoSite {
  padding: 0.6rem 1.1rem;
  border-radius: 999px;
  font-weight: 600;
  font-size: 0.85rem;
  cursor: pointer;
  border: none;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
}
.botaoFavoritar {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #4c4c57;
}
.botaoSite {
  background-color: #ffffff;
  color: #1c1c22;
}

.estatisticas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.caixaEstatistica {
  background-color: #faf6ef;
  border: 1px solid #eeeef0;
  border-radius: 14px;
  padding: 1.2rem;
}
.caixaEstatistica:nth-child(odd) {
  background: linear-gradient(135deg, #9e1f2e, #7a0f1a);
  border: none;
  color: #ffffff;
}
.caixaEstatistica:nth-child(odd) .rotuloEstatistica {
  color: #f0cdd0;
}

.valorEstatistica {
  font-size: 1.1rem;
  font-weight: 700;
  margin: 0 0 0.2rem;
  word-break: break-word;
}
.rotuloEstatistica {
  margin: 0;
  font-size: 0.8rem;
  color: #91919f;
}

.conteudo {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

.secoesSuperiores {
  grid-column: 1;
  grid-row: 1;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}
.secoesSuperiores > *:last-child {
  flex-grow: 1;
}

.caixaInstitucional {
  grid-column: 2;
  grid-row: 1;
}

.conteudo > .secao {
  grid-column: 1;
  grid-row: 2;
}

.caixaCadastro {
  grid-column: 2;
  grid-row: 2;
}

@media (max-width: 800px) {
  .conteudo {
    grid-template-columns: 1fr;
  }
  .secoesSuperiores {
    grid-column: 1;
    grid-row: 1;
  }
  .conteudo > .secao {
    grid-column: 1;
    grid-row: 2;
  }
  .caixaInstitucional {
    grid-column: 1;
    grid-row: 3;
  }
  .caixaCadastro {
    grid-column: 1;
    grid-row: 4;
  }
}

.secao {
  background-color: #faf6ef;
  border: 1px solid #eeeef0;
  border-radius: 16px;
  padding: 1.5rem;
}

.secao h2 {
  font-size: 1.1rem;
  margin: 0 0 1rem;
}

.descricao {
  color: #4c4c57;
  line-height: 1.6;
  margin: 0 0 1rem;
}

.etiquetas {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}
.etiqueta {
  background-color: #f9e8e9;
  color: #7a0f1a;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.35rem 0.75rem;
  border-radius: 999px;
}

.gradeDiferenciais {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
}

.itemDiferencial {
  border: 1px solid #eeeef0;
  border-radius: 10px;
  padding: 0.8rem;
}
.itemDiferencial:nth-child(odd) {
  background: linear-gradient(135deg, #7a0f1a, #68121b);
  border: none;
}
.itemDiferencial:nth-child(odd) p {
  color: #ffffff;
}

.itemDiferencial p {
  margin: 0;
  font-size: 0.9rem;
  color: #41414a;
}

.gradeAvaliacoes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.8rem;
}
.avaliacaoItem {
  border: 1px solid #eeeef0;
  border-radius: 10px;
  padding: 0.9rem;
}
.avaliacaoItem:nth-child(even) {
  background: linear-gradient(135deg, #68121b, #58141c);
  border: none;
}
.avaliacaoItem:nth-child(even) .notaRotulo {
  color: #f0cdd0;
}
.avaliacaoItem:nth-child(even) .notaValor {
  color: #ffffff;
}
.notaRotulo {
  margin: 0 0 0.3rem;
  font-size: 0.78rem;
  color: #91919f;
}
.notaValor {
  margin: 0;
  font-weight: 700;
  font-size: 1.1rem;
}

.listaFontes {
  margin: 0;
  padding-left: 1.2rem;
  color: #5d5d6b;
  font-size: 0.9rem;
  line-height: 1.7;
}

.caixaInstitucional,
.caixaCadastro {
  background-color: #faf6ef;
  border: 1px solid #eeeef0;
  border-radius: 16px;
  padding: 1.5rem;
}

.caixaInstitucional h3 {
  margin: 0 0 1rem;
  font-size: 1rem;
}

.linhaDado {
  display: flex;
  flex-direction: column;
  gap: 0.15rem;
  padding: 0.6rem 0;
  border-bottom: 1px solid #f7f7f8;
}
.linhaDado:last-child {
  border-bottom: none;
}
.dadoRotulo {
  font-size: 0.75rem;
  color: #91919f;
}
.dadoValor {
  font-size: 0.88rem;
  color: #1c1c22;
}
.dadoValor.alerta {
  color: #9e1f2e;
  font-weight: 600;
}

.caixaCadastro {
  background: linear-gradient(135deg, #30070c, #121216);
  color: #ffffff;
}
.caixaCadastro h3 {
  margin: 0 0 0.6rem;
}
.caixaCadastro p {
  font-size: 0.85rem;
  color: #d9d9de;
  margin: 0 0 1.2rem;
}
.botaoPrimario,
.botaoSecundario {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 0.55rem;
  border-radius: 999px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  margin-bottom: 0.6rem;
  box-sizing: border-box;
  text-decoration: none;
}
.botaoPrimario {
  background-color: #ffffff;
  color: #1c1c22;
}
.botaoSecundario {
  background-color: transparent;
  color: #ffffff;
  border: 1px solid #4c4c57;
}

.paginaErro {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, var(--cream-50) 0%, var(--cream-100) 100%);
  padding: 20px;
  box-sizing: border-box;
  font-family: 'Inter', sans-serif;
}

.conteudoErro {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  max-width: 500px;
  width: 100%;
}

.codigoStatus {
  font-size: 120px;
  font-weight: 800;
  color: var(--brand-700);
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.tituloPrincipal {
  font-size: 32px;
  font-weight: 700;
  color: var(--ink-900);
  margin-bottom: 20px;
  line-height: 1.2;
}

.textoDescritivo {
  font-size: 16px;
  color: var(--ink-600);
  line-height: 1.6;
  margin-bottom: 32px;
}

.textoDestacado {
  font-weight: 700;
  color: var(--brand-700);
}

.grupoBotoes {
  display: flex;
  gap: 12px;
  justify-content: center;
  align-items: center;
  width: 100%;
  flex-wrap: wrap;
}

.erroBotao {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 28px;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
  border-radius: 999px;
  transition: all 0.3s ease;
  cursor: pointer;
  border: none;
  min-width: 160px;
}

.erroBotaoPrimario {
  background: linear-gradient(135deg, var(--brand-700) 0%, var(--brand-500) 100%);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(122, 15, 26, 0.2);
}

.erroBotaoPrimario:hover {
  transform: translateY(-2px);
  box-shadow: 0 14px 32px rgba(122, 15, 26, 0.3);
}

.erroBotaoSecundario {
  background: #ffffff;
  color: var(--brand-700);
  border: 2px solid var(--brand-700);
  box-shadow: 0 4px 12px rgba(122, 15, 26, 0.08);
}

.erroBotaoSecundario:hover {
  background: var(--cream-100);
  transform: translateY(-2px);
}
</style>
