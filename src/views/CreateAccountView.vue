<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import universidades from '@/data/universidades.js'

import { HugeiconsIcon } from '@hugeicons/vue'
import { User02Icon } from '@hugeicons/core-free-icons'
import { CircleLockIcon } from '@hugeicons/core-free-icons'
import { EyeIcon } from '@hugeicons/core-free-icons'
import { ViewOffIcon } from '@hugeicons/core-free-icons'
import { ChromeIcon } from '@hugeicons/core-free-icons'
import { MicrosoftIcon } from '@hugeicons/core-free-icons'
import { MailIcon } from '@hugeicons/core-free-icons'
import { BookOpenIcon } from '@hugeicons/core-free-icons'
import { BriefcaseIcon } from '@hugeicons/core-free-icons'
import { BuildingIcon } from '@hugeicons/core-free-icons'

const router = useRouter()
const authStore = useAuthStore()

const tipoUsuario = ref('estudante')
const fullName = ref(authStore.user?.user_metadata?.full_name || '')
const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMsg = ref('')
const loading = ref(false)
const universidadeSelecionada = ref('')
const searchQuery = ref('')
const mostrarDropdown = ref(false)
const dropdownRef = ref(null)
const inputWrapRef = ref(null)
const dropdownStyle = ref({})

const isProfessor = computed(() => tipoUsuario.value === 'professor')
const selectedUni = computed(() =>
  universidades.find((universidade) => universidade.id === Number(universidadeSelecionada.value)),
)
const universidadesFiltradas = computed(() => {
  const busca = searchQuery.value.trim().toLowerCase()
  if (!busca) return universidades.slice(0, 10)

  return universidades
    .filter((universidade) =>
      [universidade.nome, universidade.sigla, universidade.municipio, universidade.uf]
        .join(' ')
        .toLowerCase()
        .includes(busca),
    )
    .slice(0, 15)
})

function atualizarPosicaoDropdown() {
  if (!inputWrapRef.value) return
  const rect = inputWrapRef.value.getBoundingClientRect()
  dropdownStyle.value = {
    position: 'fixed',
    top: `${rect.bottom + 4}px`,
    left: `${rect.left}px`,
    width: `${rect.width}px`,
  }
}

function toggleDropdown() {
  if (!isProfessor.value) return
  mostrarDropdown.value = !mostrarDropdown.value
  if (mostrarDropdown.value) atualizarPosicaoDropdown()
}

function selecionarUniversidade(id) {
  universidadeSelecionada.value = String(id)
  searchQuery.value = ''
  mostrarDropdown.value = false
}

function limparUniversidade() {
  universidadeSelecionada.value = ''
  searchQuery.value = ''
}

function clickFora(event) {
  if (
    dropdownRef.value &&
    !dropdownRef.value.contains(event.target) &&
    inputWrapRef.value &&
    !inputWrapRef.value.contains(event.target)
  ) {
    mostrarDropdown.value = false
  }
}

function atualizarDropdownAoRedimensionar() {
  if (mostrarDropdown.value) atualizarPosicaoDropdown()
}

const canSubmit = computed(
  () =>
    fullName.value.trim().length > 0 &&
    email.value.trim().length > 0 &&
    password.value.length >= 6 &&
    !loading.value &&
    (!isProfessor.value || universidadeSelecionada.value !== ''),
)

async function handleSubmit() {
  if (!canSubmit.value) return

  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.signUp({
      email: email.value.trim(),
      password: password.value,
      tipo_usuario: tipoUsuario.value,
      universidade_id: isProfessor.value ? Number(universidadeSelecionada.value) : null,
      full_name: fullName.value.trim(),
    })
    router.push('/')
  } catch (error) {
    if (error.message?.includes('already registered')) {
      errorMsg.value = 'Esse email já está cadastrado.'
    } else {
      errorMsg.value = 'Erro ao criar conta. Tente novamente.'
    }
  } finally {
    loading.value = false
  }
}

async function handleGoogleSignUp() {
  try {
    await authStore.loginWithGoogle()
  } catch {
    errorMsg.value = 'Não foi possível continuar com o Google.'
  }
}

async function handleMicrosoftSignUp() {
  try {
    await authStore.loginWithMicrosoft()
  } catch {
    errorMsg.value = 'Não foi possível continuar com a Microsoft.'
  }
}

function definirTipoUsuario(valor) {
  tipoUsuario.value = valor

  if (valor !== 'professor') {
    limparUniversidade()
    mostrarDropdown.value = false
  }
}



onMounted(() => {
  document.body.style.background = 'linear-gradient(to bottom, #920205, #2C0102)'
  document.addEventListener('click', clickFora)
  window.addEventListener('resize', atualizarDropdownAoRedimensionar)
  window.addEventListener('scroll', atualizarDropdownAoRedimensionar, true)
})

onUnmounted(() => {
  document.body.style.background = ''
  document.removeEventListener('click', clickFora)
  window.removeEventListener('resize', atualizarDropdownAoRedimensionar)
  window.removeEventListener('scroll', atualizarDropdownAoRedimensionar, true)
})


</script>

<template>
  <div class="page">
    <main class="auth-card">
      <h1>Crie uma conta</h1>
      <p class="subtitle">Junte-se a nós em alguns segundos</p>

      <div class="tipo-usuario">
        <button
          type="button"
          class="tipo-btn"
          :class="{ ativo: tipoUsuario === 'estudante' }"
          @click="definirTipoUsuario('estudante')"
        >
          <HugeiconsIcon :icon="BookOpenIcon" :size="24" :stroke-width="1.5" />
          <span>Estudante</span>
          <small>Buscar universidades, favoritar, comentar</small>
        </button>


        <button
          type="button"
          class="tipo-btn"
          :class="{ ativo: tipoUsuario === 'professor' }"
          @click="definirTipoUsuario('professor')"
        >
          <HugeiconsIcon :icon="BriefcaseIcon" :size="24" :stroke-width="1.5" />
          <span>Representante da Universidade</span>
          <small>Cadastrar vestibulares da sua instituição</small>
        </button>
      </div>

      <form @submit.prevent="handleSubmit">
        <div class="field">
          <label for="fullName">Nome completo</label>
          <div class="input-wrap">
            <HugeiconsIcon
              class="icon"
              :icon="User02Icon"
              :size="32"
              color="currentColor"
              :stroke-width="1.5"
            />
            <input
              id="fullName"
              v-model="fullName"
              type="text"
              placeholder="João da silva..."
              autocomplete="name"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="email">Endereço de email</label>
          <div class="input-wrap">
            <HugeiconsIcon
              class="icon"
              :icon="MailIcon"
              :size="32"
              color="currentColor"
              :stroke-width="1.5"
            />
            <input
              id="email"
              v-model="email"
              type="email"
              placeholder="voceexemplo@gmail.com"
              autocomplete="email"
              required
            />
          </div>
        </div>

        <div class="field">
          <label for="password">Senha</label>
          <div class="input-wrap">
            <HugeiconsIcon
              class="icon"
              :icon="CircleLockIcon"
              :size="32"
              color="currentColor"
              :stroke-width="1.5"
            />
            <input
              id="password"
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              placeholder="••••••••••"
              autocomplete="new-password"
              required
            />
            <button
              type="button"
              class="toggle-visibility"
              @click="showPassword = !showPassword"
              :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
            >
              <HugeiconsIcon
                v-if="!showPassword"
                :icon="ViewOffIcon"
                :size="24"
                color="currentColor"
                :stroke-width="1.5"
              />
              <HugeiconsIcon
                v-else
                :icon="EyeIcon"
                :size="24"
                color="currentColor"
                :stroke-width="1.5"
              />
            </button>
          </div>
        </div>

<div class="field" v-if="isProfessor">
  <label>Sua universidade *</label>

  <div class="universidade-select">
    <div class="input-wrap" ref="inputWrapRef" @click="toggleDropdown">
      <HugeiconsIcon
        class="icon"
        :icon="BuildingIcon"
        :size="32"
        color="currentColor"
        :stroke-width="1.5"
      />

      <input
        type="text"
        :value="selectedUni ? `${selectedUni.sigla} - ${selectedUni.nome}` : ''"
        placeholder="Busque sua universidade..."
        readonly
        autocomplete="off"
      />

      <span class="dropdown-arrow">▼</span>

      <button
        v-if="universidadeSelecionada"
        type="button"
        class="clear-universidade"
        @click.stop="limparUniversidade"
        aria-label="Limpar seleção"
      >
        ×
      </button>
    </div>

    <Teleport to="body">
      <div
        v-if="mostrarDropdown"
        ref="dropdownRef"
        class="universidade-dropdown"
        :style="dropdownStyle"
      >
        <div class="dropdown-search">
          <input
            v-model="searchQuery"
            type="text"
            placeholder="Buscar por nome, sigla, cidade ou estado..."
            autocomplete="off"
          />
        </div>

        <div class="dropdown-list">
          <div
            v-for="uni in universidadesFiltradas"
            :key="uni.id"
            class="dropdown-item"
            :class="{ selecionado: universidadeSelecionada === String(uni.id) }"
            @click="selecionarUniversidade(uni.id)"
          >
            <div class="item-info">
              <span class="item-sigla">{{ uni.sigla }}</span>
              <span class="item-nome">{{ uni.nome }}</span>
            </div>

            <span class="item-local">{{ uni.municipio }}, {{ uni.uf }}</span>
          </div>

          <div v-if="universidadesFiltradas.length === 0" class="dropdown-empty">
            Nenhuma universidade encontrada
          </div>
        </div>
      </div>
    </Teleport>
  </div>
</div>

        <button type="submit" class="primary-btn" :disabled="!canSubmit">
          {{ loading ? 'Criando...' : 'Inscrever-se' }}
        </button>
      </form>

      <div class="divider"><span>ou</span></div>

      <div class="social-row">
        <button type="button" class="social-btn" @click="handleGoogleSignUp">
          <HugeiconsIcon class="continue-with" :icon="ChromeIcon" :size="24" :stroke-width="1.5" />
          <p>Google</p>
        </button>
        <button type="button" class="social-btn" @click="handleMicrosoftSignUp">
          <HugeiconsIcon
            class="continue-with"
            :icon="MicrosoftIcon"
            :size="24"
            :stroke-width="1.5"
          />
          <p>Microsoft</p>
        </button>
      </div>

      <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

      <p class="footer-link">
        Já tem uma conta?
        <router-link to="/login">Entrar</router-link>
      </p>
    </main>
  </div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  box-sizing: border-box;
  padding: 1rem;
}

.auth-card {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.178), rgba(255, 255, 255, 0.115));
  backdrop-filter: blur(40px) saturate(120%);
  -webkit-backdrop-filter: blur(40px) saturate(120%);
  padding: clamp(1.5rem, 3vh, 2.5rem) 2.25rem;
  max-width: 440px;
  width: 90%;
  max-height: 96vh;
  overflow-y: auto;
  border-radius: 1.1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.055);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  text-align: center;
  box-sizing: border-box;
  margin: 5vw auto;
}

h1 {
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 0.4rem;
}

.subtitle {
  color: rgba(255, 255, 255, 0.65);
  font-size: 0.85rem;
  margin: 0 0 clamp(1rem, 3vh, 1.75rem);
}

/* TIPO USUÁRIO */
.tipo-usuario {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.5rem;
  margin-bottom: 1rem;
  text-align: left;
}

.tipo-btn {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.25rem;
  padding: 0.85rem 1rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  background: rgba(143, 135, 135, 0.1);
  color: #fff;
  cursor: pointer;
  transition: all 0.15s ease;
}

.tipo-btn:hover {
  background: rgba(143, 135, 135, 0.2);
  border-color: rgba(255, 255, 255, 0.3);
}

.tipo-btn.ativo {
  border-color: #fff;
  background: linear-gradient(135deg, rgba(255,255,255,0.25), rgba(255,255,255,0.1));
  box-shadow: 0 0 0 2px rgba(255,255,255,0.2);
}

.tipo-btn span {
  font-weight: 600;
  font-size: 0.9rem;
}

.tipo-btn small {
  font-size: 0.65rem;
  opacity: 0.7;
  font-weight: 400;
}

form {
  display: flex;
  flex-direction: column;
  gap: clamp(10px, 2vh, 16px);
  text-align: left;
}

.field label {
  display: block;
  font-size: 0.8rem;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  margin-bottom: 6px;
}

.input-wrap {
  position: relative;
  display: flex;
  align-items: center;
}

.input-wrap input:-webkit-autofill,
.input-wrap input:-webkit-autofill:hover,
.input-wrap input:-webkit-autofill:focus,
.input-wrap input:-webkit-autofill:active {
  -webkit-text-fill-color: #fff;
  -webkit-box-shadow: 0 0 0px 1000px rgba(143, 135, 135, 0.15) inset;
  box-shadow: 0 0 0px 1000px rgba(143, 135, 135, 0.15) inset;
  transition: background-color 5000s ease-in-out 0s;
  caret-color: #fff;
}

.input-wrap .icon {
  position: absolute;
  left: 12px;
  width: 18px;
  height: 18px;
  color: rgba(255, 255, 255, 0.65);
  pointer-events: none;
}

.continue-with {
  color: rgba(255, 255, 255, 0.295);
}

.social-row button p {
  color: rgba(255, 255, 255, 0.295);
  font-weight: 600;
  font-size: 0.9rem;
}

.input-wrap input {
  width: 100%;
  padding: 11px 14px 11px 38px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.25);
  background: rgba(143, 135, 135, 0.1);
  backdrop-filter: blur(8px);
  color: #fff;
  font-size: 0.95rem;
}

.input-wrap input::placeholder {
  color: rgba(255, 255, 255, 0.45);
}

.input-wrap input[readonly] {
  cursor: pointer;
}

.toggle-visibility {
  position: absolute;
  right: 10px;
  background: none;
  border: none;
  padding: 4px;
  cursor: pointer;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
}

.toggle-visibility svg {
  width: 18px;
  height: 18px;
}

.primary-btn {
  padding: 11px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(to top, #ffffff, #cdcdcd, rgb(153, 153, 153));
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 4px;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: clamp(0.9rem, 2.5vh, 1.75rem) 0 clamp(0.7rem, 1.8vh, 1.1rem);
  color: rgba(255, 255, 255, 0.55);
  font-size: 0.8rem;
}

.divider::before,
.divider::after {
  content: '';
  flex: 1;
  height: 1px;
  background: rgba(255, 255, 255, 0.25);
}

.social-row {
  display: flex;
  gap: 10px;
}

.social-btn {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 11px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(143, 135, 135, 0.15);
  color: #fff;
  font-weight: 600;
  font-size: 0.9rem;
  cursor: pointer;
}

.error {
  color: #ff8080;
  font-size: 13px;
  margin-top: 12px;
}

.footer-link {
  margin-top: clamp(0.9rem, 2vh, 1.5rem);
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.75);
}

.footer-link a {
  color: #fff;
  font-weight: 700;
  text-decoration: none;
}

.footer-link a:hover {
  text-decoration: underline;
}

.universidade-select {
  position: relative;
}

.universidade-select .input-wrap {
  position: relative;
}

.dropdown-arrow {
  position: absolute;
  right: 10px;
  color: rgba(255, 255, 255, 0.6);
  font-size: 0.7rem;
  pointer-events: none;
}

.clear-universidade {
  position: absolute;
  right: 32px;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  border: none;
  color: rgba(255, 255, 255, 0.8);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.15s;
}
.clear-universidade:hover {
  background: rgba(255, 128, 128, 0.3);
  color: #ff8080;
}

.universidade-dropdown {
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: 4px;
  background: #fff;
  border: 1px solid #eeeef0;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.15);
  overflow: hidden;
  z-index: 100;
  color: #1c1c22;
}

.dropdown-search {
  padding: 0.5rem;
  border-bottom: 1px solid #eeeef0;
}

.dropdown-search input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #eeeef0;
  border-radius: 8px;
  font-size: 0.85rem;
  outline: none;
}
.dropdown-search input:focus {
  border-color: #9e1f2e;
}

.dropdown-list {
  max-height: 280px;
  overflow-y: auto;
}

.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.1s;
  border-bottom: 1px solid #f7f7f8;
}
.dropdown-item:last-child { border-bottom: none; }
.dropdown-item:hover { background: #fdfaf4; }
.dropdown-item.selecionado { background: #fdf5f5; }

.item-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.item-sigla {
  font-weight: 700;
  font-size: 0.75rem;
  color: #7a0f1a;
}
.item-nome {
  font-size: 0.85rem;
  color: #1c1c22;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-local {
  font-size: 0.7rem;
  color: #91919f;
  white-space: nowrap;
}

.dropdown-empty {
  padding: 1rem;
  text-align: center;
  color: #91919f;
  font-size: 0.85rem;
}

.universidade-dropdown {
  position: fixed;
  background: #fff;
  border: 1px solid #eeeef0;
  border-radius: 12px;
  box-shadow: 0 12px 28px rgba(28, 28, 34, 0.15);
  overflow: hidden;
  z-index: 1000;
  color: #1c1c22;
}
.dropdown-search { padding: 0.5rem; border-bottom: 1px solid #eeeef0; }
.dropdown-search input {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #eeeef0;
  border-radius: 8px;
  font-size: 0.85rem;
  outline: none;
}
.dropdown-search input:focus { border-color: #9e1f2e; }
.dropdown-list { max-height: 280px; overflow-y: auto; }
.dropdown-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1rem;
  cursor: pointer;
  transition: background 0.1s;
  border-bottom: 1px solid #f7f7f8;
}
.dropdown-item:last-child { border-bottom: none; }
.dropdown-item:hover { background: #fdfaf4; }
.dropdown-item.selecionado { background: #fdf5f5; }
.item-info { display: flex; flex-direction: column; gap: 0.15rem; min-width: 0; }
.item-sigla { font-weight: 700; font-size: 0.75rem; color: #7a0f1a; }
.item-nome {
  font-size: 0.85rem;
  color: #1c1c22;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.item-local { font-size: 0.7rem; color: #91919f; white-space: nowrap; }
.dropdown-empty { padding: 1rem; text-align: center; color: #91919f; font-size: 0.85rem; }
</style>
