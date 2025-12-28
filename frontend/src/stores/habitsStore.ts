import { create } from 'zustand'
import { apiService } from '../services/api'

interface Habit {
  id: string
  name: string
  description?: string
  frequency: string
  streak: number
  isCompleted: boolean
  completedAt?: string
  createdAt: string
}

interface HabitsState {
  habits: Habit[]
  isLoading: boolean
  error: string | null
  fetchHabits: () => Promise<void>
  createHabit: (data: any) => Promise<void>
  updateHabit: (id: string, data: any) => Promise<void>
  deleteHabit: (id: string) => Promise<void>
  completeHabit: (id: string) => Promise<void>
  clearError: () => void
}

export const useHabitsStore = create<HabitsState>((set, get) => ({
  habits: [],
  isLoading: false,
  error: null,

  fetchHabits: async () => {
    set({ isLoading: true, error: null })
    try {
      const habits = await apiService.getHabits()
      set({ habits, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false, error: error.message })
    }
  },

  createHabit: async (data: any) => {
    set({ error: null })
    try {
      const newHabit = await apiService.createHabit(data)
      set({ habits: [...get().habits, newHabit] })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  updateHabit: async (id: string, data: any) => {
    set({ error: null })
    try {
      const updatedHabit = await apiService.updateHabit(id, data)
      set({
        habits: get().habits.map(habit =>
          habit.id === id ? updatedHabit : habit
        )
      })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  deleteHabit: async (id: string) => {
    set({ error: null })
    try {
      await apiService.deleteHabit(id)
      set({ habits: get().habits.filter(habit => habit.id !== id) })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  completeHabit: async (id: string) => {
    set({ error: null })
    try {
      await apiService.completeHabit(id)
      await get().fetchHabits() // Refresh to get updated streak
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))