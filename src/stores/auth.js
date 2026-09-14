import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'

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
    profiles[userId] = { ...profile, updated_at: new Date().toISOString() }
    localStorage.setItem(PROFILE_STORAGE_KEY, JSON.stringify(profiles))
  } catch (e) {
    console.warn('Erro ao salvar profile local:', e)
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
    loading: true,
  }),

  getters: {
    isLoggedIn: (state) => !!state.session,
    hasProfile: (state) => !!state.profile,
    isProfessor: (state) => state.profile?.tipo_usuario === 'professor',
    isEstudante: (state) => state.profile?.tipo_usuario === 'estudante',
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
      if (this.user) await this.fetchProfile()
      return data
    },

    async signUp({ email, password, tipo_usuario, universidade_id, full_name }) {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      if (error) throw error
      this.session = data.session
      this.user = data.user

      if (this.user) {
        const profile = {
          id: this.user.id,
          full_name: full_name || this.user.email?.split('@')[0] || 'Usuário',
          avatar_url: this.user.user_metadata?.avatar_url || null,
          tipo_usuario: tipo_usuario || 'estudante',
          universidade_id: tipo_usuario === 'professor' ? universidade_id : null,
          created_at: new Date().toISOString(),
        }
        saveLocalProfile(this.user.id, profile)
        this.profile = profile
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

      const { useFavoritosStore } = await import('@/stores/favoritos')
      useFavoritosStore().limparFavoritos()

      if (this.user) {
        clearLocalProfile(this.user.id)
      }

      this.user = null
      this.session = null
      this.profile = null
    },

    async fetchProfile() {
      if (!this.user) return

      const localProfile = loadLocalProfile(this.user.id)
      if (localProfile) {
        this.profile = localProfile
        return localProfile
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .maybeSingle()

      if (!error && data) {
        this.profile = data
        saveLocalProfile(this.user.id, data)
        return data
      }

      const newProfile = {
        id: this.user.id,
        full_name:
          this.user.user_metadata?.full_name ||
          this.user.user_metadata?.name ||
          this.user.email?.split('@')[0] ||
          'Estudante',
        avatar_url: this.user.user_metadata?.avatar_url || null,
        tipo_usuario: 'estudante',
        universidade_id: null,
        created_at: new Date().toISOString(),
      }
      saveLocalProfile(this.user.id, newProfile)
      this.profile = newProfile
      return newProfile
    },

    async updateProfile(updates) {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')

      const updated = { ...this.profile, ...updates, updated_at: new Date().toISOString() }
      saveLocalProfile(this.user.id, updated)
      this.profile = updated

      const { error } = await supabase
        .from('profiles')
        .upsert(updated)
        .select()
        .single()

      if (error) console.warn('Erro ao sincronizar profile com Supabase:', error)
      return updated
    },

    async createProfile({ full_name, tipo_usuario, universidade_id }) {
      if (!this.user) throw new Error('USUARIO_NAO_LOGADO')

      const profile = {
        id: this.user.id,
        full_name,
        avatar_url: this.user.user_metadata?.avatar_url || null,
        tipo_usuario: tipo_usuario || 'estudante',
        universidade_id: tipo_usuario === 'professor' ? universidade_id : null,
        created_at: new Date().toISOString(),
      }

      saveLocalProfile(this.user.id, profile)
      this.profile = profile

      const { error } = await supabase
        .from('profiles')
        .insert(profile)
        .select()
        .single()

      if (error) console.warn('Erro ao criar profile no Supabase:', error)
      return profile
    },

    async initAuthListener() {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      this.session = session
      this.user = session?.user ?? null
      if (this.user) await this.fetchProfile()
      this.loading = false

      supabase.auth.onAuthStateChange(async (_event, session) => {
        this.session = session
        this.user = session?.user ?? null
        if (this.user) {
          await this.fetchProfile()
        } else {
          this.profile = null
        }
      })
    },
  },
})
