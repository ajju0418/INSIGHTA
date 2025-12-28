'use client'

import { useState } from 'react'
import { HUDCard } from '@/components/HUDCard'
import { Database, Download, Upload, Trash2, RefreshCw } from 'lucide-react'
import { UserSettings } from '@/types/settings'
import { settingsService } from '@/services/settingsService'
import { motion } from 'framer-motion'

interface DataSectionProps {
  data: UserSettings['data']
  onUpdate: (data: Partial<UserSettings['data']>) => void
}

export function DataSection({ data, onUpdate }: DataSectionProps) {
  const [exportFormat, setExportFormat] = useState(data.exportFormat)
  const [backupFrequency, setBackupFrequency] = useState(data.backupFrequency)

  const handleExport = async () => {
    try {
      const jsonData = await settingsService.exportSettings()
      const blob = new Blob([jsonData], { type: 'application/json' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      a.download = `nexura-settings-${new Date().toISOString().split('T')[0]}.json`
      document.body.appendChild(a)
      a.click()
      document.body.removeChild(a)
      URL.revokeObjectURL(url)
    } catch (error) {
      console.error('Error exporting settings:', error)
      alert('Failed to export settings')
    }
  }

  const handleImport = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      await settingsService.importSettings(text)
      alert('Settings imported successfully!')
      window.location.reload()
    } catch (error) {
      console.error('Error importing settings:', error)
      alert('Failed to import settings. Please check the file format.')
    }
  }

  const handleReset = async () => {
    if (confirm('Are you sure you want to reset all settings to defaults?')) {
      try {
        await settingsService.resetToDefaults()
        alert('Settings reset to defaults')
        window.location.reload()
      } catch (error) {
        console.error('Error resetting settings:', error)
        alert('Failed to reset settings')
      }
    }
  }

  const handleSave = () => {
    onUpdate({
      exportFormat,
      backupFrequency,
      autoBackup: data.autoBackup,
    })
  }

  return (
    <HUDCard title="Data & Privacy" className="p-8">
      <div className="space-y-6">
        {/* Auto Backup */}
        <div className="flex items-center justify-between p-4 bg-slate-900/30 border-2 border-slate-800 rounded-xl hover:border-slate-700 transition-all">
          <div className="flex items-center gap-3">
            <Database size={18} className="text-cyan-400" />
            <div>
              <div className="text-base font-medium text-white">Auto Backup</div>
              <div className="text-sm text-slate-500">Automatically backup your data</div>
            </div>
          </div>
          <button
            onClick={() => onUpdate({ autoBackup: !data.autoBackup })}
            className={`relative w-14 h-7 rounded-full transition-all ${
              data.autoBackup ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' : 'bg-slate-700'
            }`}
          >
            <motion.span
              className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{
                x: data.autoBackup ? 28 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </button>
        </div>

        {/* Backup Frequency & Export Format Row */}
        {data.autoBackup && (
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <RefreshCw size={16} className="text-cyan-400" />
              Backup Frequency
            </label>
            <select
              value={backupFrequency}
              onChange={(e) =>
                setBackupFrequency(
                  e.target.value as UserSettings['data']['backupFrequency']
                )
              }
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
        )}

        {/* Export Format */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Download size={16} className="text-cyan-400" />
            Export Format
          </label>
          <select
            value={exportFormat}
            onChange={(e) =>
              setExportFormat(e.target.value as UserSettings['data']['exportFormat'])
            }
            className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
          >
            <option value="json">JSON</option>
            <option value="csv">CSV</option>
          </select>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-6 border-t border-slate-800">
          <motion.button
            onClick={handleExport}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors border-2 border-slate-700"
          >
            <Download size={18} />
            Export Settings
          </motion.button>

          <label className="flex items-center justify-center gap-2 py-4 bg-slate-800 hover:bg-slate-700 text-white font-medium rounded-xl transition-colors cursor-pointer border-2 border-slate-700">
            <Upload size={18} />
            Import Settings
            <input
              type="file"
              accept=".json"
              onChange={handleImport}
              className="hidden"
            />
          </label>

          <motion.button
            onClick={handleReset}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-4 bg-red-900/30 hover:bg-red-900/50 text-red-400 font-medium rounded-xl transition-colors border-2 border-red-800/50"
          >
            <Trash2 size={18} />
            Reset to Defaults
          </motion.button>

          <motion.button
            onClick={handleSave}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white font-medium rounded-xl transition-colors shadow-lg shadow-cyan-500/20"
          >
            <Database size={18} />
            Save Data Settings
          </motion.button>
        </div>
      </div>
    </HUDCard>
  )
}

