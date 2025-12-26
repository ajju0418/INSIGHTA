/**
 * Settings Service for NEXURA
 * Handles settings CRUD operations with IndexedDB
 */

import { dbService } from './db/indexedDB'
import { UserSettings, DEFAULT_SETTINGS } from '@/types/settings'

const SETTINGS_KEY = 'user_settings'

export class SettingsService {
  async getSettings(): Promise<UserSettings> {
    try {
      const stored = await dbService.get<{ key: string } & UserSettings>('settings', SETTINGS_KEY)
      if (stored) {
        // Remove the 'key' property before returning
        const { key, ...settings } = stored
        return settings as UserSettings
      }
      return DEFAULT_SETTINGS
    } catch (error) {
      console.error('Error getting settings:', error)
      return DEFAULT_SETTINGS
    }
  }

  async updateSettings(updates: Partial<UserSettings>): Promise<UserSettings> {
    try {
      const currentSettings = await this.getSettings()
      
      // Deep merge nested objects
      const updatedSettings: UserSettings = {
        profile: { ...currentSettings.profile, ...(updates.profile || {}) },
        ai: { ...currentSettings.ai, ...(updates.ai || {}) },
        notifications: { ...currentSettings.notifications, ...(updates.notifications || {}) },
        display: { ...currentSettings.display, ...(updates.display || {}) },
        data: { ...currentSettings.data, ...(updates.data || {}) },
      }

      await dbService.put('settings', {
        key: SETTINGS_KEY,
        ...updatedSettings,
      })

      return updatedSettings
    } catch (error) {
      console.error('Error updating settings:', error)
      throw error
    }
  }

  async updateProfile(profile: Partial<UserSettings['profile']>): Promise<UserSettings> {
    const currentSettings = await this.getSettings()
    const updatedProfile = { ...currentSettings.profile, ...profile } as UserSettings['profile']
    return this.updateSettings({
      profile: updatedProfile,
    })
  }

  async updateAI(ai: Partial<UserSettings['ai']>): Promise<UserSettings> {
    const currentSettings = await this.getSettings()
    return this.updateSettings({
      ai: { ...currentSettings.ai, ...ai },
    })
  }

  async updateNotifications(
    notifications: Partial<UserSettings['notifications']>
  ): Promise<UserSettings> {
    const currentSettings = await this.getSettings()
    return this.updateSettings({
      notifications: { ...currentSettings.notifications, ...notifications },
    })
  }

  async updateDisplay(display: Partial<UserSettings['display']>): Promise<UserSettings> {
    const currentSettings = await this.getSettings()
    return this.updateSettings({
      display: { ...currentSettings.display, ...display },
    })
  }

  async updateData(data: Partial<UserSettings['data']>): Promise<UserSettings> {
    const currentSettings = await this.getSettings()
    return this.updateSettings({
      data: { ...currentSettings.data, ...data },
    })
  }

  async resetToDefaults(): Promise<UserSettings> {
    return this.updateSettings(DEFAULT_SETTINGS)
  }

  async exportSettings(): Promise<string> {
    const settings = await this.getSettings()
    return JSON.stringify(settings, null, 2)
  }

  async importSettings(jsonString: string): Promise<UserSettings> {
    try {
      const settings = JSON.parse(jsonString) as UserSettings
      return this.updateSettings(settings)
    } catch (error) {
      console.error('Error importing settings:', error)
      throw new Error('Invalid settings format')
    }
  }
}

export const settingsService = new SettingsService()

