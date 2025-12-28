const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000/api'

class ApiService {
  private async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const token = typeof window !== 'undefined' ? localStorage.getItem('accessToken') : null

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      credentials: 'include', // Important: Send cookies with requests
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    })

    if (!response.ok) {
      // Handle 401 Unauthorized - token might be expired
      if (response.status === 401 && endpoint !== '/auth/login' && endpoint !== '/auth/refresh' && endpoint !== '/auth/signup') {
        // Try to refresh token
        try {
          await this.refreshToken()
          // Retry the original request
          return this.request(endpoint, options)
        } catch (refreshError) {
          // Refresh failed, clear auth and redirect to login (only if not already on auth pages)
          if (typeof window !== 'undefined') {
            localStorage.removeItem('accessToken')
            // Only redirect if not already on login or signup page
            const currentPath = window.location.pathname
            if (currentPath !== '/login' && currentPath !== '/signup') {
              window.location.href = '/login'
            }
          }
          throw refreshError
        }
      }

      const errorData = await response.json().catch(() => ({ message: response.statusText }))
      throw new Error(errorData.message || `API Error: ${response.statusText}`)
    }

    return response.json()
  }

  // Auth
  async login(email: string, password: string) {
    const response: any = await this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })

    // Store access token
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken)
    }

    return response
  }

  async signup(email: string, password: string, name: string) {
    const response: any = await this.request('/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    })

    // Store access token
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken)
    }

    return response
  }

  async refreshToken() {
    const response: any = await this.request('/auth/refresh', {
      method: 'POST',
    })

    // Update access token
    if (typeof window !== 'undefined' && response.accessToken) {
      localStorage.setItem('accessToken', response.accessToken)
    }

    return response
  }

  async logout() {
    await this.request('/auth/logout', {
      method: 'POST',
    })

    // Clear access token
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken')
    }
  }

  async getCurrentUser() {
    return this.request('/auth/me')
  }

  // Habits
  async getHabits() {
    return this.request('/habits')
  }

  async createHabit(data: any) {
    return this.request('/habits', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateHabit(id: string, data: any) {
    return this.request(`/habits/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteHabit(id: string) {
    return this.request(`/habits/${id}`, {
      method: 'DELETE',
    })
  }

  async completeHabit(id: string) {
    return this.request(`/habits/${id}/complete`, {
      method: 'POST',
      body: JSON.stringify({ date: new Date().toISOString().split('T')[0] }),
    })
  }

  // Goals
  async getGoals() {
    return this.request('/goals')
  }

  async createGoal(data: any) {
    return this.request('/goals', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateGoal(id: string, data: any) {
    return this.request(`/goals/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteGoal(id: string) {
    return this.request(`/goals/${id}`, {
      method: 'DELETE',
    })
  }

  // Expenses
  async getExpenses() {
    return this.request('/expenses')
  }

  async createExpense(data: any) {
    return this.request('/expenses', {
      method: 'POST',
      body: JSON.stringify(data),
    })
  }

  async updateExpense(id: string, data: any) {
    return this.request(`/expenses/${id}`, {
      method: 'PATCH',
      body: JSON.stringify(data),
    })
  }

  async deleteExpense(id: string) {
    return this.request(`/expenses/${id}`, {
      method: 'DELETE',
    })
  }

  async getExpenseSummary(period: string) {
    return this.request(`/expenses/summary?period=${period}`)
  }

  // Timeline
  async getTimeline() {
    return this.request('/analytics/timeline')
  }

  // User
  async getProfile() {
    return this.request('/users/profile')
  }

  async updateProfile(data: any) {
    return this.request('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  }
}

export const apiService = new ApiService()