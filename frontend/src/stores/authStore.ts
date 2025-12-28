import { create } from 'zustand'
import { apiService } from '../services/api'

interface User {
  id: string
  email: string
  name: string
}

interface AuthState {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => Promise<void>
  checkAuth: () => Promise<void>
  clearError: () => void
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: false,
  error: null,

  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiService.login(email, password)
      set({ user: response.user, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },

  signup: async (email: string, password: string, name: string) => {
    set({ isLoading: true, error: null })
    try {
      const response = await apiService.signup(email, password, name)
      set({ user: response.user, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false, error: error.message })
      throw error
    }
  },

  logout: async () => {
    try {
      await apiService.logout()
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      set({ user: null, error: null })
    }
  },

  checkAuth: async () => {
    try {
      const user = await apiService.getCurrentUser()
      set({ user })
    } catch (error) {
      set({ user: null })
    }
  },

  clearError: () => set({ error: null }),
}))