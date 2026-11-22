import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'
import {
  atualizarUsuario,
  buscarUsuario,
  buscarUsuarioPorAuthId,
  criarUsuario,
  excluirUsuariosPorAuthId,
  listarUsuarios,
} from '@/services/usuariosApi'

const PROFILE_STORAGE_KEY = 'unihub_profile_local'

function loadLocalProfile(userId) {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (stored) {
      const profiles = JSON.parse(stored)
      return profiles[userId] || null
    }
  } catch (e) {
    console.warn('Erro ao carregar profile local:', e)
  }
  return null
}

function saveLocalProfile(userId, profile) {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
    const profiles = stored ? JSON.parse(stored) : {}
    profiles[userId] = profile
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles))
  } catch (error) {
    console.warn('Erro ao salvar profile local:', error)
  }
}

function clearLocalProfile(userId) {
  try {
    const stored = localStorage.getItem(PROFILE_STORAGE_KEY)
    if (stored) {
      const profiles = JSON.parse(stored)
      delete profiles[userId]
      localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles))
    }
  } catch (e) {
    console.warn('Erro ao limpar profile local:', e)
  }
}

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    session: null,
    profile: null,
    profileError: null,
    loading: true,
  }),

  getters: {
    isLoggedIn: (state) => !!state.session,
    hasProfile: (state) => !!state.profile,
    isProfessor: (state) =>
      state.profile?.tipo_usuario === 'professor' ||
      state.user?.user_metadata?.tipo_usuario === 'professor' ||
      state.session?.user?.user_metadata?.tipo_usuario === 'professor',
    isEstudante: (state) =>
      state.profile?.tipo_usuario === 'estudante' ||
      state.user?.user_metadata?.tipo_usuario === 'estudante' ||
      state.session?.user?.user_metadata?.tipo_usuario === 'estudante',
    isAdmin: (state) => state.profile?.tipo_usuario === 'admin',
    professorUniversidadeId: (state) => state.profile?.universidade_id || null,
  },

  actions: {
    async signIn({ email, password }) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      if (error) throw error
      this.session = data.session
      this.user = data.user
      if (this.user) {
        try {
          await this.fetchProfile()
        } catch (profileError) {
          this.profileError = profileError.message
          throw profileError
        }
      }
      return data
    },

    async signUp({ email, password, tipo_usuario, universidade_id, full_name }) {
      const tipoUsuario = tipo_usuario === 'professor' ? 'professor' : 'estudante'
      const profileData = {
        full_name,
        tipo_usuario: tipoUsuario,
        universidade_id: tipoUsuario === 'professor' ? universidade_id : null,
      }
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: { data: profileData },
      })
      if (error) throw error
      this.session = data.session
      this.user = data.user

      if (this.user) {
        const profile = {
          auth_user_id: this.user.id,
          ...profileData,
          full_name: full_name || this.user.email?.split('@')[0] || 'Usuário',
        }
        saveLocalProfile(this.user.id, profile)
        try {
          this.profile = await criarUsuario(profile)
          clearLocalProfile(this.user.id)
        } catch (profileError) {
          this.profile = profile
          this.profileError = profileError.message
          throw profileError
        }
      }
      return data
    },

    async loginWithGoogle() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    },

    async loginWithMicrosoft() {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'azure',
        options: {
          redirectTo: window.location.origin,
        },
      })
      if (error) throw error
    },

    async logout() {
      await supabase.auth.signOut()

      if (this.user) {
        sessionStorage.removeItem(`favoritos_${this.user.id}`)
      }

      this.user = null
      this.session = null
      this.profile = null
      this.profileError = null
    },

    async fetchProfile() {
      if (!this.user) return

      const linkedProfile = await buscarUsuarioPorAuthId(this.user.id)
      if (linkedProfile) {
        this.profile = linkedProfile
        this.profileError = null
        return linkedProfile
      }

      const localProfile = loadLocalProfile(this.user.id)
      const savedRole = localProfile?.tipo_usuario || this.user.user_metadata?.tipo_usuario
      const newProfile = {
        auth_user_id: this.user.id,
        full_name: localProfile?.full_name ||
          this.user.user_metadata?.full_name ||
          this.user.user_metadata?.name ||
          this.user.email?.split('@')[0] ||
          'Estudante',
        tipo_usuario: savedRole === 'professor' ? 'professor' : 'estudante',
        universidade_id: localProfile?.universidade_id ||
          this.user.user_metadata?.universidade_id ||
          null,
      }
      this.profile = await criarUsuario(newProfile)
      this.profileError = null
      clearLocalProfile(this.user.id)
      return this.profile
    },

    async updateProfile(updates) {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')
      if (!this.profile?.id) throw new Error('PERFIL_NAO_ENCONTRADO')

      const updated = await atualizarUsuario(this.profile.id, updates)
      this.profile = updated
      this.profileError = null
      return this.profile
    },

    async createProfile({ full_name, tipo_usuario, universidade_id }) {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')

      const tipoUsuario = tipo_usuario === 'professor' ? 'professor' : 'estudante'
      const profile = {
        auth_user_id: this.user.id,
        full_name,
        tipo_usuario: tipoUsuario,
        universidade_id: tipoUsuario === 'professor' ? universidade_id : null,
      }

      this.profile = await criarUsuario(profile)
      this.profileError = null
      return this.profile
    },

    async listProfiles() {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')
      return listarUsuarios(this.user.id)
    },

    async getProfileById(id) {
      if (!this.user || id !== this.profile?.id) throw new Error('SEM_PERMISSAO')
      return buscarUsuario(id)
    },

    async deleteProfile() {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')
      if (!this.profile?.id) throw new Error('PERFIL_NAO_ENCONTRADO')
      await excluirUsuariosPorAuthId(this.user.id, this.profile.id)
      clearLocalProfile(this.user.id)
      this.profile = null
      this.profileError = null
    },

    async initAuthListener() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      this.session = session
      this.user = session?.user ?? null
      try {
        if (this.user) await this.fetchProfile()
      } catch (error) {
        this.profileError = error.message
        console.error('Erro ao carregar perfil pela API:', error)
      } finally {
        this.loading = false
      }

      supabase.auth.onAuthStateChange(async (_event, session) => {
        this.session = session
        this.user = session?.user ?? null
        if (this.user) {
          try {
            await this.fetchProfile()
          } catch (error) {
            this.profileError = error.message
            console.error('Erro ao carregar perfil pela API:', error)
          }
        } else {
          this.profile = null
          this.profileError = null
        }
      })
    },
  },
})
