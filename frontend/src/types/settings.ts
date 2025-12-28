/**
 * Settings Types for NEXURA
 */

export interface UserSettings {
  // Profile
  profile: {
    name: string
    email?: string
    avatar?: string
    userId: string // Like "ALEX-01"
    timezone: string
    currency: string
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD'
  }

  // AI Configuration
  ai: {
    assistantName: string
    personality: 'professional' | 'friendly' | 'motivational' | 'balanced'
    insightFrequency: 'daily' | 'weekly' | 'on-demand'
    patternRecognition: boolean
    predictiveAnalytics: boolean
    smartRecommendations: boolean
    spendingPredictions: boolean
    habitOptimization: boolean
  }

  // Notifications
  notifications: {
    habitReminders: boolean
    budgetAlerts: boolean
    weeklySummary: boolean
    milestoneCelebrations: boolean
    smartTiming: boolean
  }

  // Display & Interface
  display: {
    theme: 'dark' | 'light' | 'auto'
    defaultView: 'home' | 'log' | 'patterns' | 'goals'
    animationSpeed: 'fast' | 'normal' | 'slow'
    hapticFeedback: boolean
  }

  // Data & Privacy
  data: {
    autoBackup: boolean
    backupFrequency: 'daily' | 'weekly' | 'monthly'
    exportFormat: 'json' | 'csv'
  }
}

export const DEFAULT_SETTINGS: UserSettings = {
  profile: {
    name: 'User',
    userId: 'USER-01',
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currency: 'INR',
    dateFormat: 'DD/MM/YYYY',
  },
  ai: {
    assistantName: 'NEXURA AI',
    personality: 'balanced',
    insightFrequency: 'daily',
    patternRecognition: true,
    predictiveAnalytics: true,
    smartRecommendations: true,
    spendingPredictions: true,
    habitOptimization: true,
  },
  notifications: {
    habitReminders: true,
    budgetAlerts: true,
    weeklySummary: true,
    milestoneCelebrations: true,
    smartTiming: true,
  },
  display: {
    theme: 'dark',
    defaultView: 'home',
    animationSpeed: 'normal',
    hapticFeedback: false,
  },
  data: {
    autoBackup: true,
    backupFrequency: 'weekly',
    exportFormat: 'json',
  },
}

