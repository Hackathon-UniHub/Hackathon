<script setup>
import { onMounted, ref } from 'vue'
import { RouterLink, useRouter } from 'vue-router'
import { ufs, carregarUniversidades, cadastrarUniversidade, getCursos } from '@/utils/filtroUtils.js'

const router = useRouter()

const novaUniversidade = ref({
  nome: '',
  sigla: '',
  municipio: '',
  uf: '',
  categoria_administrativa: '',
  situacao: 'Ativa',
  site: '',
  igc: '',
  telefone: '',
  email: '',
  endereco_sede: '',
  quantidade_alunos: '',
  quantidade_cursos: '',
  cursos: [],
  descricao: '',
})

const cursosDisponiveis = ref([])
const novoCurso = ref('')

async function carregarCursos() {
  const universidades = await carregarUniversidades()
  cursosDisponiveis.value = getCursos(universidades)
}

function adicionarNovoCurso() {
  if (novoCurso.value !== '' && !cursosDisponiveis.value.includes(novoCurso.value)) {
    cursosDisponiveis.value.push(novoCurso.value)
    novaUniversidade.value.cursos.push(novoCurso.value)
  }
  novoCurso.value = ''
}

async function salvarUniversidade() {
  if (novaUniversidade.value.cursos.length === 0) {
    window.alert('Selecione ao menos um curso.')
  } else {
    try {
      await cadastrarUniversidade(novaUniversidade.value)
      window.alert('Universidade cadastrada com sucesso!')
      router.push('/universidades')
    } catch (error) {
      console.log('Erro ao cadastrar universidade:', error)
      window.alert('Erro ao cadastrar a universidade. Verifique se a API está rodando.')
    }
  }
}

onMounted(carregarCursos)
</script>

<template>
  <div class="pagina-filtro-formulario">
    <header class="cabecalho">
      <h1>Adicionar universidade</h1>
      <p>Preencha os dados abaixo para criar um novo card na listagem.</p>
    </header>

    <form class="formulario" @submit.prevent="salvarUniversidade">
      <div class="campo largo">
        <label for="nome">Nome da universidade *</label>
        <input id="nome" v-model="novaUniversidade.nome" type="text" required />
      </div>

      <div class="campo">
        <label for="sigla">Sigla</label>
        <input id="sigla" v-model="novaUniversidade.sigla" type="text" />
      </div>

      <div class="campo">
        <label for="categoria">Categoria administrativa *</label>
        <select id="categoria" v-model="novaUniversidade.categoria_administrativa" required>
          <option value="" disabled>Selecione</option>
          <option value="Pública">Pública</option>
          <option value="Privada">Privada</option>
        </select>
      </div>

      <div class="campo">
        <label for="municipio">Município *</label>
        <input id="municipio" v-model="novaUniversidade.municipio" type="text" required />
      </div>

      <div class="campo">
        <label for="uf">UF *</label>
        <select id="uf" v-model="novaUniversidade.uf" required>
          <option value="" disabled>Selecione</option>
          <option v-for="uf in ufs" :key="uf" :value="uf">{{ uf }}</option>
        </select>
      </div>

      <div class="campo">
        <label for="situacao">Situação *</label>
        <select id="situacao" v-model="novaUniversidade.situacao" required>
          <option value="Ativa">Ativa</option>
          <option value="Inativa">Inativa</option>
        </select>
      </div>

      <div class="campo">
        <label for="igc">Nota (IGC) *</label>
        <select id="igc" v-model="novaUniversidade.igc" required>
          <option value="" disabled>Selecione</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
        </select>
      </div>

      <div class="campo">
        <label for="site">Site</label>
        <input id="site" v-model="novaUniversidade.site" type="text" placeholder="www.exemplo.br" />
      </div>

      <div class="campo">
        <label for="telefone">Telefone</label>
        <input id="telefone" v-model="novaUniversidade.telefone" type="text" />
      </div>

      <div class="campo largo">
        <label for="email">E-mail</label>
        <input id="email" v-model="novaUniversidade.email" type="email" />
      </div>

      <div class="campo largo">
        <label for="endereco">Endereço da sede</label>
        <input id="endereco" v-model="novaUniversidade.endereco_sede" type="text" />
      </div>

      <div class="campo">
        <label for="alunos">Quantidade de alunos</label>
        <input
          id="alunos"
          v-model="novaUniversidade.quantidade_alunos"
          type="text"
          placeholder="Ex: Mais de 10 mil alunos"
        />
      </div>

      <div class="campo">
        <label for="qtdCursos">Quantidade de cursos</label>
        <input
          id="qtdCursos"
          v-model="novaUniversidade.quantidade_cursos"
          type="text"
          placeholder="Ex: 40 cursos de graduação"
        />
      </div>

      <div class="campo largo">
        <label>Cursos oferecidos *</label>
        <div class="chips">
          <label
            v-for="curso in cursosDisponiveis"
            :key="curso"
            class="chip"
            :class="{ ativo: novaUniversidade.cursos.includes(curso) }"
          >
            <input type="checkbox" :value="curso" v-model="novaUniversidade.cursos" hidden />
            {{ curso }}
          </label>
        </div>

        <div class="novoCurso">
          <input
            v-model="novoCurso"
            type="text"
            placeholder="Outro curso (ex: Medicina)"
            @keydown.enter.prevent="adicionarNovoCurso"
          />
          <button type="button" class="botaoSecundario" @click="adicionarNovoCurso">
            Adicionar curso
          </button>
        </div>
      </div>

      <div class="campo largo">
        <label for="descricao">Descrição</label>
        <textarea id="descricao" v-model="novaUniversidade.descricao" rows="4"></textarea>
      </div>

      <div class="acoes largo">
        <RouterLink class="botaoSecundario" to="/universidades">Cancelar</RouterLink>
        <button class="botaoPrincipal" type="submit">Cadastrar universidade</button>
      </div>
    </form>
  </div>
</template>

<style scoped>
.pagina-filtro-formulario {
  --vermelho: #7a0f1a;
  --vermelho-escuro: #9e1f2e;
  --creme: #fffcf7;
  --creme-forte: #faf6ef;
  --borda: #eeeef0;
  --texto: #5d5d6b;

  min-height: 100vh;
  background: var(--creme);
  padding: 3rem 1.5rem;
  color: #1c1c22;
}

.cabecalho,
.formulario {
  width: 100%;
  max-width: 820px;
  margin-left: auto;
  margin-right: auto;
}

.cabecalho {
  margin-bottom: 1.5rem;
}

.cabecalho h1 {
  font-size: clamp(1.8rem, 3.5vw, 2.4rem);
  font-weight: 800;
  color: var(--vermelho);
  margin: 0 0 0.4rem;
}

.cabecalho p {
  margin: 0;
  color: var(--texto);
}

.formulario {
  background: #fff;
  border: 1px solid var(--borda);
  border-radius: 16px;
  padding: 1.8rem;
  box-shadow: 0 4px 20px #1212160d;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1.1rem 1.2rem;
}

.largo {
  grid-column: 1 / -1;
}

.campo {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.campo label {
  font-size: 0.82rem;
  font-weight: 700;
  color: var(--vermelho-escuro);
}

.campo input,
.campo select,
.campo textarea {
  width: 100%;
  padding: 0.7rem 0.9rem;
  border-radius: 10px;
  border: 1px solid var(--borda);
  background: var(--creme-forte);
  font-size: 0.92rem;
  font-family: inherit;
  outline: 0;
  box-sizing: border-box;
}

.campo input:focus,
.campo select:focus,
.campo textarea:focus {
  border-color: #d06f78;
  background: #fff;
}

.chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.chip {
  background: var(--creme-forte);
  border: 1px solid var(--borda);
  color: var(--texto);
  padding: 0.4rem 0.9rem;
  border-radius: 20px;
  font-size: 0.82rem;
  cursor: pointer;
}

.campo .chip {
  font-size: 0.82rem;
  font-weight: 400;
  color: var(--texto);
}

.chip:hover {
  border-color: #f0cdd0;
  color: var(--vermelho);
}

.chip.ativo {
  background: var(--vermelho);
  color: #fff;
  border-color: var(--vermelho);
}

.novoCurso {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.4rem;
}

.acoes {
  display: flex;
  justify-content: flex-end;
  gap: 0.8rem;
  margin-top: 0.5rem;
}

.botaoPrincipal,
.botaoSecundario {
  padding: 0.7rem 1.3rem;
  border-radius: 10px;
  font-weight: 700;
  font-size: 0.9rem;
  cursor: pointer;
  text-decoration: none;
  white-space: nowrap;
}

.botaoPrincipal {
  background: var(--vermelho);
  color: #fff;
  border: 1px solid var(--vermelho);
}

.botaoPrincipal:hover {
  background: var(--vermelho-escuro);
}

.botaoSecundario {
  background: #fff;
  color: var(--vermelho);
  border: 1px solid var(--vermelho);
}

.botaoSecundario:hover {
  background: var(--creme-forte);
}

@media (max-width: 640px) {
  .pagina-filtro-formulario {
    padding: 2rem 1rem;
  }

  .formulario {
    grid-template-columns: 1fr;
    padding: 1.2rem;
  }

  .novoCurso {
    flex-direction: column;
  }
}
</style>
