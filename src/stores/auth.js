import { defineStore } from 'pinia'
import { supabase } from '@/services/supabase'

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
    async signUp({ email, password }) {
       const { data, error } = await supabase.auth.signUp({
         email,
         password,
       })
      if (error) throw error
      this.session = data.session
      this.user = data.user
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

    async logout() {
      await supabase.auth.signOut()
      this.user = null
      this.session = null
      this.profile = null
    },

    async fetchProfile() {
      if (!this.user) return
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', this.user.id)
        .single()

      if (!error) this.profile = data
      return data
    },

async createProfile({ full_name }) {
  const { data, error } = await supabase
    .from('profiles')
    .insert({
      id: this.user.id,
      full_name,
      avatar_url: this.user.user_metadata?.avatar_url,
    })
    .select()
    .single()

  if (error) throw error
  this.profile = data
  return data
},

    async initAuthListener() {
      const { data: { session } } = await supabase.auth.getSession()
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
