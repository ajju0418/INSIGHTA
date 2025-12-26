'use client'

import { useState, useEffect } from 'react'
import { HUDCard } from '@/components/HUDCard'
import { User, Mail, Globe, DollarSign, Calendar, Terminal, Save, CheckCircle2 } from 'lucide-react'
import { UserSettings } from '@/types/settings'
import { motion } from 'framer-motion'

interface ProfileSectionProps {
  profile: UserSettings['profile']
  onUpdate: (profile: Partial<UserSettings['profile']>) => void
}

export function ProfileSection({ profile, onUpdate }: ProfileSectionProps) {
  const [name, setName] = useState(profile.name)
  const [email, setEmail] = useState(profile.email || '')
  const [userId, setUserId] = useState(profile.userId)
  const [timezone, setTimezone] = useState(profile.timezone)
  const [currency, setCurrency] = useState(profile.currency)
  const [dateFormat, setDateFormat] = useState(profile.dateFormat)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setName(profile.name)
    setEmail(profile.email || '')
    setUserId(profile.userId)
    setTimezone(profile.timezone)
    setCurrency(profile.currency)
    setDateFormat(profile.dateFormat)
  }, [profile])

  const handleSave = async () => {
    onUpdate({
      name,
      email: email || undefined,
      userId,
      timezone,
      currency,
      dateFormat,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hasChanges =
    name !== profile.name ||
    email !== (profile.email || '') ||
    userId !== profile.userId ||
    timezone !== profile.timezone ||
    currency !== profile.currency ||
    dateFormat !== profile.dateFormat

  return (
    <HUDCard title="Profile & Identity" className="p-8">
      <div className="space-y-6">
        {/* Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <User size={16} className="text-cyan-400" />
            Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="Your name"
          />
        </div>

        {/* Email */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Mail size={16} className="text-cyan-400" />
            Email <span className="text-xs text-slate-500 font-normal">(Optional)</span>
          </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="your.email@example.com"
          />
        </div>

        {/* User ID */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Terminal size={16} className="text-cyan-400" />
            User ID
          </label>
          <input
            type="text"
            value={userId}
            onChange={(e) => setUserId(e.target.value.toUpperCase())}
            className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white font-mono placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="USER-01"
          />
          <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
            <Terminal size={12} />
            Your unique identifier (e.g., ALEX-01)
          </p>
        </div>

        {/* Timezone & Currency Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Globe size={16} className="text-cyan-400" />
              Timezone
            </label>
            <select
              value={timezone}
              onChange={(e) => setTimezone(e.target.value)}
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value={Intl.DateTimeFormat().resolvedOptions().timeZone}>
                {Intl.DateTimeFormat().resolvedOptions().timeZone} (Auto)
              </option>
              <option value="Asia/Kolkata">Asia/Kolkata (IST)</option>
              <option value="America/New_York">America/New_York (EST)</option>
              <option value="Europe/London">Europe/London (GMT)</option>
              <option value="Asia/Tokyo">Asia/Tokyo (JST)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <DollarSign size={16} className="text-cyan-400" />
              Currency
            </label>
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="INR">INR (₹) - Indian Rupee</option>
              <option value="USD">USD ($) - US Dollar</option>
              <option value="EUR">EUR (€) - Euro</option>
              <option value="GBP">GBP (£) - British Pound</option>
              <option value="JPY">JPY (¥) - Japanese Yen</option>
            </select>
          </div>
        </div>

        {/* Date Format */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Calendar size={16} className="text-cyan-400" />
            Date Format
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] as const).map((format) => (
              <button
                key={format}
                onClick={() => setDateFormat(format)}
                className={`py-3 px-4 rounded-xl border-2 transition-all font-mono text-sm ${
                  dateFormat === format
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {format}
              </button>
            ))}
          </div>
        </div>

        {/* Save Button */}
        <div className="pt-4 border-t border-slate-800">
          <motion.button
            onClick={handleSave}
            disabled={!hasChanges}
            whileHover={hasChanges ? { scale: 1.02 } : {}}
            whileTap={hasChanges ? { scale: 0.98 } : {}}
            className={`w-full py-4 px-6 rounded-xl font-semibold transition-all flex items-center justify-center gap-2 ${
              hasChanges
                ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/20'
                : 'bg-slate-800 text-slate-500 cursor-not-allowed'
            }`}
          >
            {saved ? (
              <>
                <CheckCircle2 size={20} />
                Saved!
              </>
            ) : (
              <>
                <Save size={20} />
                Save Changes
              </>
            )}
          </motion.button>
        </div>
      </div>
    </HUDCard>
  )
}
