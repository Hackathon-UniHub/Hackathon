<script setup>
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useFavoritosStore } from '@/stores/favoritos'
import {
  UniversidadePorId,
  getIniciais,
  getAnoFundacao,
  getSiteOficial,
  temCursosDisponiveis,
  getCursosDaUniversidade,
  getRotuloCurso,
  filtrarCursosDaUniversidade,
  getCorteEnemDoCursoSelecionado,
  selecionarCursoDaUniversidade,
  fecharCursoSelecionado,
} from '@/utils/universidadesUtils.js'

const route = useRoute()
const router = useRouter()
const authStore = useAuthStore()
const favoritosStore = useFavoritosStore()

const universidade = computed(() => UniversidadePorId(route.params.id))

const siteOficial = computed(() => getSiteOficial(universidade.value))
const iniciais = computed(() => getIniciais(universidade.value))
const anoFundacao = computed(() => getAnoFundacao(universidade.value))

const favorito = computed(() =>
  universidade.value ? favoritosStore.isFavorito(Number(universidade.value.id)) : false,
)

function alternarFavorito() {
  if (!authStore.isLoggedIn) {
    router.push({ name: 'login', query: { redirect: route.fullPath } })
    return
  }

  const id = Number(universidade.value.id)
  if (favorito.value) {
    favoritosStore.removerFavorito(id)
  } else {
    favoritosStore.adicionarFavorito(id)
  }
}

const pesquisaCurso = ref('')
const cursoSelecionado = ref(null)

const cursosDaUniversidade = computed(() => getCursosDaUniversidade(universidade.value))
const cursosFiltrados = computed(() =>
  filtrarCursosDaUniversidade(cursosDaUniversidade.value, pesquisaCurso.value),
)
const corteEnemSelecionado = computed(() =>
  getCorteEnemDoCursoSelecionado(universidade.value, cursoSelecionado.value),
)

function onSelecionarCurso(curso) {
  selecionarCursoDaUniversidade(cursoSelecionado, curso)
}

function onFecharCurso() {
  fecharCursoSelecionado(cursoSelecionado)
}
</script>

<template>
  <div class="paginaFundo" v-if="universidade">
    <div class="paginaUniversidade">
      <RouterLink to="/universidades" class="voltar">Voltar ao catálogo</RouterLink>

      <div class="cabecalho">
        <div class="logo">{{ iniciais }}</div>

        <div class="conteudoCabecalho">
          <p class="selos">
            {{ universidade.categoria_administrativa }}
            <span v-if="universidade.situacao" class="situacao"> · {{ universidade.situacao }}</span>
          </p>

          <h1>{{ universidade.nome }}</h1>
          <p class="localizacao">{{ universidade.municipio }}, {{ universidade.uf }}</p>
        </div>

        <div class="acoesCabecalho">
          <div class="nota" v-if="universidade.igc && universidade.igc !== '-'">
            <span class="notaValor">{{ universidade.igc }}</span>
            <span class="notaLegenda">IGC/MEC</span>
          </div>
          <button class="botaoFavoritar" type="button" @click="alternarFavorito">
            {{ favorito ? 'Remover favorito' : 'Favoritar' }}
          </button>
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
          <h3>Informações institucionais</h3>
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

        <div v-if="!authStore.loading && !authStore.isLoggedIn" class="caixaCadastro">
          <h3>Interessado em {{ universidade.sigla || universidade.nome }}?</h3>
          <p>Crie uma conta para salvar favoritos, ver mais instituições e localizalas no mapa.</p>
          <RouterLink to="/criar-conta" class="botaoPrimario">Criar conta grátis</RouterLink>
          <RouterLink to="/universidades" class="botaoSecundario">Outras universidades</RouterLink>
        </div>
      </div>

      <div class="secaoCursos" v-if="temCursosDisponiveis(universidade)">
        <h2>Cursos oferecidos</h2>
        <p class="subtituloCursos">{{ cursosDaUniversidade.length }} cursos disponíveis</p>

        <input v-model="pesquisaCurso" type="text" class="buscaCursoInput" placeholder="Filtrar cursos..." />

        <div class="chipsCursos">
          <button
            class="chipCurso"
            v-for="(curso, indice) in cursosFiltrados"
            :key="`${curso.codigo_curso}-${indice}`"
            :class="{ ativo: cursoSelecionado === curso }"
            @click="onSelecionarCurso(curso)"
          >
            {{ getRotuloCurso(curso) }}
          </button>
          <p class="semResultado" v-if="!cursosFiltrados.length">Nenhum curso encontrado.</p>
        </div>

        <div class="detalheCurso" v-if="cursoSelecionado">
          <div class="detalheCursoCabecalho">
            <div>
              <span class="subtitulo">DETALHES DO CURSO</span>
              <h3>{{ cursoSelecionado.nome_curso }}</h3>
              <p>{{ universidade.nome }}</p>
            </div>
            <button class="fecharDetalheCurso" type="button" @click="onFecharCurso">×</button>
          </div>

          <div class="detalheCursoGrade">
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">GRAU</span>
              <span class="detalheCursoValor">{{ cursoSelecionado.grau || '-' }}</span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">ÁREA</span>
              <span class="detalheCursoValor">
                {{ cursoSelecionado.area_ocde_cine || cursoSelecionado.area_ocde || '-' }}
              </span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">MODALIDADE</span>
              <span class="detalheCursoValor">{{ cursoSelecionado.modalidade || '-' }}</span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">SITUAÇÃO</span>
              <span class="detalheCursoValor">{{ cursoSelecionado.situacao_curso || '-' }}</span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">VAGAS AUTORIZADAS</span>
              <span class="detalheCursoValor">{{ cursoSelecionado.vagas_autorizadas ?? '-' }}</span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">CARGA HORÁRIA</span>
              <span class="detalheCursoValor">
                {{ cursoSelecionado.carga_horaria ? `${cursoSelecionado.carga_horaria}h` : '-' }}
              </span>
            </div>
            <div class="detalheCursoItem">
              <span class="detalheCursoRotulo">LOCAL</span>
              <span class="detalheCursoValor">
                {{ cursoSelecionado.municipio }} - {{ cursoSelecionado.uf }}
              </span>
            </div>
            <div class="detalheCursoItem" v-if="corteEnemSelecionado">
              <span class="detalheCursoRotulo">CORTE ENEM</span>
              <span class="detalheCursoValor destaqueCorte">{{ corteEnemSelecionado }}</span>
            </div>
          </div>
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
.paginaFundo {
  --vermelho: #7a0f1a;
  --vermelho-escuro: #9e1f2e;
  --vermelho-claro: #f9e8e9;
  --creme: #fffcf7;
  --creme-forte: #faf6ef;
  --borda: #eeeef0;
  --texto: #5d5d6b;
  --texto-fraco: #91919f;

  min-height: 100vh;
  background-color: var(--creme);
}

.paginaUniversidade {
  max-width: 1100px;
  margin: 0 auto;
  padding: 2rem 1.5rem 4rem;
  color: #1c1c22;
}

.voltar {
  color: var(--texto);
  text-decoration: none;
  font-size: 0.9rem;
  display: inline-block;
  margin-bottom: 1.5rem;
}
.voltar:hover {
  color: var(--vermelho);
}

.cabecalho {
  display: flex;
  align-items: center;
  gap: 1.5rem;
  background-color: var(--vermelho);
  border-radius: 16px;
  padding: 2rem;
  color: #ffffff;
  flex-wrap: wrap;
}

.logo {
  width: 64px;
  height: 64px;
  min-width: 64px;
  border-radius: 50%;
  border: 2px solid #ffffff;
  color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 1rem;
  letter-spacing: 1px;
}

.conteudoCabecalho {
  flex: 1;
  min-width: 240px;
}

.selos {
  font-size: 0.8rem;
  font-weight: 700;
  color: #ffffff;
  margin: 0 0 0.5rem;
}
.selos .situacao {
  color: rgba(255, 255, 255, 0.75);
  font-weight: 500;
}

.cabecalho h1 {
  margin: 0 0 0.3rem;
  font-size: 1.6rem;
}

.localizacao {
  margin: 0;
  color: rgba(255, 255, 255, 0.85);
  font-size: 0.95rem;
}

.acoesCabecalho {
  display: flex;
  align-items: center;
  gap: 1.2rem;
  flex-wrap: wrap;
}

.nota {
  text-align: center;
}
.notaValor {
  display: block;
  font-size: 1.3rem;
  font-weight: 800;
  color: #ffffff;
}
.notaLegenda {
  font-size: 0.62rem;
  letter-spacing: 0.5px;
  color: rgba(255, 255, 255, 0.75);
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
  border: 1px solid rgba(255, 255, 255, 0.5);
}
.botaoSite {
  background-color: #ffffff;
  color: var(--vermelho);
}

.estatisticas {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin: 1.5rem 0;
}

.caixaEstatistica {
  background-color: var(--creme-forte);
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 1.2rem;
}
.caixaEstatistica:nth-child(odd) {
  background-color: var(--vermelho);
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
  color: var(--texto-fraco);
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

.secao,
.secaoCursos {
  background-color: var(--creme-forte);
  border: 1px solid var(--borda);
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
  border: 1px solid var(--borda);
  color: #4c4c57;
  font-size: 0.8rem;
  font-weight: 600;
  padding: 0.3rem 0.75rem;
  border-radius: 8px;
}

.gradeDiferenciais {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 0.8rem;
}

.itemDiferencial {
  border: 1px solid var(--borda);
  border-radius: 10px;
  padding: 0.8rem;
}
.itemDiferencial:nth-child(odd) {
  background-color: var(--vermelho);
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
  border: 1px solid var(--borda);
  border-radius: 10px;
  padding: 0.9rem;
}
.avaliacaoItem:nth-child(even) {
  background-color: #58141c;
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
  color: var(--texto-fraco);
}
.notaValor {
  margin: 0;
  font-weight: 700;
  font-size: 1.1rem;
}

.listaFontes {
  margin: 0;
  padding-left: 1.2rem;
  color: var(--texto);
  font-size: 0.9rem;
  line-height: 1.7;
}

.secaoCursos {
  margin-top: 1.5rem;
}

.secaoCursos h2 {
  margin: 0 0 0.2rem;
  font-size: 1.1rem;
}

.subtituloCursos {
  margin: 0 0 1rem;
  font-size: 0.85rem;
  color: var(--texto-fraco);
}

.buscaCursoInput {
  width: 100%;
  max-width: 420px;
  padding: 0.7rem 1rem;
  border-radius: 10px;
  border: 1px solid var(--borda);
  background: #fff;
  font-size: 0.9rem;
  outline: 0;
  box-sizing: border-box;
  margin-bottom: 1rem;
  display: block;
}

.buscaCursoInput:focus {
  border-color: #1c1c22;
}

.chipsCursos {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  max-height: 220px;
  overflow-y: auto;
  padding: 4px;
}

.chipCurso {
  background: #fff;
  border: 1px solid var(--borda);
  color: var(--texto);
  padding: 0.4rem 0.9rem;
  border-radius: 999px;
  font-size: 0.8rem;
  cursor: pointer;
}

.chipCurso:hover {
  border-color: #1c1c22;
  color: #1c1c22;
}

.chipCurso.ativo {
  background: var(--vermelho);
  color: #fff;
  border-color: var(--vermelho);
}

.semResultado {
  font-size: 0.85rem;
  color: var(--texto-fraco);
  margin: 0;
}

.detalheCurso {
  margin-top: 1.2rem;
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 14px;
  padding: 1.2rem;
}

.detalheCursoCabecalho {
  display: flex;
  align-items: flex-start;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.detalheCursoCabecalho h3 {
  margin: 0.1rem 0;
  font-size: 1.05rem;
  color: #1c1c22;
}

.detalheCursoCabecalho p {
  margin: 0;
  font-size: 0.82rem;
  color: var(--texto);
}

.fecharDetalheCurso {
  margin-left: auto;
  background: transparent;
  border: none;
  font-size: 1.3rem;
  line-height: 1;
  color: var(--texto-fraco);
  cursor: pointer;
}

.detalheCursoGrade {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 0.8rem;
}

.detalheCursoItem {
  background: var(--creme-forte);
  border: 1px solid var(--borda);
  border-radius: 10px;
  padding: 0.7rem 0.8rem;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}

.detalheCursoRotulo {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.5px;
  color: var(--texto-fraco);
}

.detalheCursoValor {
  font-size: 0.9rem;
  font-weight: 600;
  color: #1c1c22;
}

.destaqueCorte {
  color: var(--vermelho);
}

.caixaInstitucional,
.caixaCadastro {
  background-color: var(--creme-forte);
  border: 1px solid var(--borda);
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
  color: var(--texto-fraco);
}
.dadoValor {
  font-size: 0.88rem;
  color: #1c1c22;
}
.dadoValor.alerta {
  color: var(--vermelho-escuro);
  font-weight: 600;
}

.caixaCadastro {
  background-color: #1c1c22;
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
  background: linear-gradient(135deg, #fffcf7 0%, #faf6ef 100%);
  padding: 20px;
  box-sizing: border-box;
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
  color: #7a0f1a;
  line-height: 1;
  margin-bottom: 16px;
  letter-spacing: -2px;
}

.tituloPrincipal {
  font-size: 32px;
  font-weight: 700;
  color: #1c1c22;
  margin-bottom: 20px;
  line-height: 1.2;
}

.textoDescritivo {
  font-size: 16px;
  color: #5d5d6b;
  line-height: 1.6;
  margin-bottom: 32px;
}

.textoDestacado {
  font-weight: 700;
  color: #7a0f1a;
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
  cursor: pointer;
  border: none;
  min-width: 160px;
}

.erroBotaoPrimario {
  background: linear-gradient(135deg, #7a0f1a 0%, #b83d4a 100%);
  color: #ffffff;
  box-shadow: 0 10px 24px rgba(122, 15, 26, 0.2);
}

.erroBotaoPrimario:hover {
  transform: translateY(-2px);
}

.erroBotaoSecundario {
  background: #ffffff;
  color: #7a0f1a;
  border: 2px solid #7a0f1a;
}

.erroBotaoSecundario:hover {
  background: #faf6ef;
  transform: translateY(-2px);
}
</style>
