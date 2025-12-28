import { create } from 'zustand'
import { apiService } from '../services/api'

interface Expense {
  id: string
  amount: number
  category: string
  description: string
  date: string
  createdAt: string
}

interface ExpensesState {
  expenses: Expense[]
  isLoading: boolean
  error: string | null
  fetchExpenses: () => Promise<void>
  createExpense: (data: any) => Promise<void>
  updateExpense: (id: string, data: any) => Promise<void>
  deleteExpense: (id: string) => Promise<void>
  clearError: () => void
}

export const useExpensesStore = create<ExpensesState>((set, get) => ({
  expenses: [],
  isLoading: false,
  error: null,

  fetchExpenses: async () => {
    set({ isLoading: true, error: null })
    try {
      const expenses = await apiService.getExpenses()
      set({ expenses, isLoading: false })
    } catch (error: any) {
      set({ isLoading: false, error: error.message })
    }
  },

  createExpense: async (data: any) => {
    set({ error: null })
    try {
      const newExpense = await apiService.createExpense(data)
      set({ expenses: [...get().expenses, newExpense] })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  updateExpense: async (id: string, data: any) => {
    set({ error: null })
    try {
      const updatedExpense = await apiService.updateExpense(id, data)
      set({
        expenses: get().expenses.map(expense =>
          expense.id === id ? updatedExpense : expense
        )
      })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  deleteExpense: async (id: string) => {
    set({ error: null })
    try {
      await apiService.deleteExpense(id)
      set({ expenses: get().expenses.filter(expense => expense.id !== id) })
    } catch (error: any) {
      set({ error: error.message })
      throw error
    }
  },

  clearError: () => set({ error: null }),
}))