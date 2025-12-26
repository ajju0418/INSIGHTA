'use client'

import { Bell, Calendar, Wallet, TrendingUp, Award, Zap } from 'lucide-react'
import { HUDCard } from '@/components/HUDCard'
import { UserSettings } from '@/types/settings'
import { motion } from 'framer-motion'

interface NotificationSectionProps {
  notifications: UserSettings['notifications']
  onUpdate: (notifications: Partial<UserSettings['notifications']>) => void
}

export function NotificationSection({
  notifications,
  onUpdate,
}: NotificationSectionProps) {
  const toggle = (key: keyof UserSettings['notifications'], value: boolean) => {
    onUpdate({ [key]: value })
  }

  return (
    <HUDCard title="Notifications & Reminders" className="p-8">
      <div className="space-y-3">
        <ToggleItem
          label="Habit Reminders"
          description="Get notified to complete your habits"
          icon={<Bell size={18} />}
          checked={notifications.habitReminders}
          onChange={(checked) => toggle('habitReminders', checked)}
        />

        <ToggleItem
          label="Budget Alerts"
          description="Notifications when approaching budget limits"
          icon={<Wallet size={18} />}
          checked={notifications.budgetAlerts}
          onChange={(checked) => toggle('budgetAlerts', checked)}
        />

        <ToggleItem
          label="Weekly Summary"
          description="Receive weekly progress reports"
          icon={<Calendar size={18} />}
          checked={notifications.weeklySummary}
          onChange={(checked) => toggle('weeklySummary', checked)}
        />

        <ToggleItem
          label="Milestone Celebrations"
          description="Celebrate achievements and streaks"
          icon={<Award size={18} />}
          checked={notifications.milestoneCelebrations}
          onChange={(checked) => toggle('milestoneCelebrations', checked)}
        />

        <ToggleItem
          label="Smart Timing"
          description="Notifications at optimal times based on your patterns"
          icon={<Zap size={18} />}
          checked={notifications.smartTiming}
          onChange={(checked) => toggle('smartTiming', checked)}
        />
      </div>
    </HUDCard>
  )
}

interface ToggleItemProps {
  label: string
  description: string
  icon: React.ReactNode
  checked: boolean
  onChange: (checked: boolean) => void
}

function ToggleItem({ label, description, icon, checked, onChange }: ToggleItemProps) {
  return (
    <div className="flex items-center justify-between p-4 bg-slate-900/30 border-2 border-slate-800 rounded-xl hover:border-slate-700 transition-all">
      <div className="flex items-center gap-3">
        <div className="text-cyan-400">{icon}</div>
        <div>
          <div className="text-base font-medium text-white">{label}</div>
          <div className="text-sm text-slate-500">{description}</div>
        </div>
      </div>
      <button
        onClick={() => onChange(!checked)}
        className={`relative w-14 h-7 rounded-full transition-all ${
          checked ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' : 'bg-slate-700'
        }`}
      >
        <motion.span
          className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
          animate={{
            x: checked ? 28 : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 500,
            damping: 30,
          }}
        />
      </button>
    </div>
  )
}

