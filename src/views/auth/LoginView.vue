<script setup>
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'
import { computed, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'

import { HugeiconsIcon } from '@hugeicons/vue'
import { CircleLockIcon } from '@hugeicons/core-free-icons'
import { EyeIcon } from '@hugeicons/core-free-icons'
import { ViewOffIcon } from '@hugeicons/core-free-icons'
import { MailIcon } from '@hugeicons/core-free-icons'
import { GoogleIcon } from '@hugeicons/core-free-icons'

const router = useRouter()
const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const authStore = useAuthStore()
const errorMsg = ref('Error. Por favor tente novamente mais tarde.')

async function handleGoogleLogin() {
  try {
    await authStore.loginWithGoogle()
  } catch (error) {
    errorMsg.value = 'Erro ao fazer login com Google. Tente novamente.'
    console.error(error)
  }
}

const canSubmit = computed(() =>
  email.value.trim().length > 0 && password.value.length > 0 && !loading.value
)

async function handleSubmit() {
  if (!canSubmit.value) return

  loading.value = true
  errorMsg.value = ''
  try {
    await authStore.signIn({
      email: email.value.trim(),
      password: password.value,
      rememberMe: rememberMe.value,
    })
    router.push(router.currentRoute.value.query.redirect || '/')
  } catch {
    errorMsg.value = 'Email ou senha incorretos.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  document.documentElement.style.background = 'linear-gradient(to bottom, #920205, #2C0102)'
  document.body.style.background = 'linear-gradient(to bottom, #920205, #2C0102)'
  document.body.style.minHeight = '100vh'
})

onUnmounted(() => {
  document.body.style.background = ''
})
const userInitial = computed(() => {
  const name = authStore.user?.name || authStore.user?.email || ''
  return name.trim().charAt(0).toUpperCase() || '?'
})
</script>

<template>
  <div class="page">

    <main class="auth-card">
      <div class="avatar">{{ userInitial }}</div>
      <h1>Bem vindo de volta!</h1>

      <form @submit.prevent="handleSubmit">
      <div class="input-wrap">

        <HugeiconsIcon class="icon" :icon="MailIcon" :size="32" color="currentColor" :stroke-width="1.5"/>
        <input
          v-model="email"
          type="email"
          placeholder="Endereço de email"
          autocomplete="email"
          required
        />
      </div>

      <div class="input-wrap">
        <HugeiconsIcon class="icon" :icon="CircleLockIcon" :size="32" color="currentColor" :stroke-width="1.5"/>
        <input
          v-model="password"
          :type="showPassword ? 'text' : 'password'"
          placeholder="Senha"
          autocomplete="current-password"
          required
        />
        <button
          type="button"
          class="toggle-visibility"
          @click="showPassword = !showPassword"
          :aria-label="showPassword ? 'Ocultar senha' : 'Mostrar senha'"
        >
            <HugeiconsIcon v-if="!showPassword" :icon="ViewOffIcon" :size="24" color="currentColor" :stroke-width="1.5"/>
            <HugeiconsIcon v-else :icon="EyeIcon" :size="24" color="currentColor" :stroke-width="1.5"/>
        </button>
      </div>

      <div class="row">
        <label class="checkbox">
          <input type="checkbox" v-model="rememberMe" />
          <span>Lembre-me</span>
        </label>
        <a href="" class="link">Esqueceu a senha?</a>
      </div>

      <button type="submit" class="primary-btn" :disabled="!canSubmit">
        {{ loading ? 'Entrando...' : 'Entrar' }}
      </button>
    </form>

    <div class="divider"><span>ou</span></div>

    <button type="button" class="google-btn" @click="handleGoogleLogin">
      <HugeiconsIcon class="continue-with" :icon="GoogleIcon" :size="24"  :stroke-width="1.5"/>
      <p>
        Entrar com o Google
      </p>
    </button>

    <p v-if="errorMsg" class="error" role="alert">{{ errorMsg }}</p>

    <p class="footer-link">
      Não tem uma conta?
      <router-link to="/create-account">Criar conta</router-link>
    </p>
  </main>
</div>
</template>

<style scoped>
.page {
  min-height: 100vh;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 1rem;
}

.auth-card {
  background: linear-gradient(to bottom, rgba(255, 255, 255, 0.178), rgba(255, 255, 255, 0.115));
  backdrop-filter: blur(16px) saturate(120%);
  -webkit-backdrop-filter: blur(16px) saturate(120%);
  padding: 2.5rem 2.7rem;
  max-width: 380px;
  width: 90%;
  border-radius: 1.1rem;
  border: 1.5px solid rgba(255, 255, 255, 0.15);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
  text-align: center;
  box-sizing: border-box;
}

.avatar {
  width: 56px;
  height: 56px;
  margin: 0 auto 1rem;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #e5595c, #b12326);
  color: #fff;
  font-weight: 700;
  font-size: 1.4rem;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.35);
}

h1 {
  color: #fff;
  font-size: 1.35rem;
  font-weight: 700;
  margin: 0 0 1.75rem;
}

form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;
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

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin: 2px 0 6px;
  font-size: 0.85rem;
}

.checkbox {
  display: flex;
  align-items: center;
  gap: 6px;
  color: rgba(255, 255, 255, 0.85);
  cursor: pointer;
}

.checkbox input {
  accent-color: #b12326;
}

.link {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
}

.link:hover {
  text-decoration: underline;
}

.primary-btn {
  padding: 12px;
  border-radius: 8px;
  border: none;
  background: linear-gradient(to top, #ffffff, #cdcdcd, rgb(153, 153, 153));
  cursor: pointer;
  font-weight: 700;
  font-size: 0.95rem;
  margin-top: 6px;
}

.primary-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.divider {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 1.5rem 0 1.1rem;
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

.google-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  padding: 11px;
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background: rgba(143, 135, 135, 0.15);
  color: #fff;
  font-weight: 600;
  cursor: pointer;
}

.google-btn p {
  color: rgba(255, 255, 255, 0.295);
  font-weight: 500;
  font-size: 0.9rem;
}

.error {
  color: #ff8080;
  font-size: 13px;
  margin-top: 12px;
}

.footer-link {
  margin-top: 1.5rem;
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
</style>
