'use client'

import { useState, useEffect } from 'react'
import { HUDCard } from '@/components/HUDCard'
import { Palette, Layout, Zap, Smartphone, Save, CheckCircle2 } from 'lucide-react'
import { UserSettings } from '@/types/settings'
import { motion } from 'framer-motion'

interface DisplaySectionProps {
  display: UserSettings['display']
  onUpdate: (display: Partial<UserSettings['display']>) => void
}

export function DisplaySection({ display, onUpdate }: DisplaySectionProps) {
  const [theme, setTheme] = useState(display.theme)
  const [defaultView, setDefaultView] = useState(display.defaultView)
  const [animationSpeed, setAnimationSpeed] = useState(display.animationSpeed)
  const [hapticFeedback, setHapticFeedback] = useState(display.hapticFeedback)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setTheme(display.theme)
    setDefaultView(display.defaultView)
    setAnimationSpeed(display.animationSpeed)
    setHapticFeedback(display.hapticFeedback)
  }, [display])

  const handleSave = () => {
    onUpdate({
      theme,
      defaultView,
      animationSpeed,
      hapticFeedback,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hasChanges =
    theme !== display.theme ||
    defaultView !== display.defaultView ||
    animationSpeed !== display.animationSpeed ||
    hapticFeedback !== display.hapticFeedback

  return (
    <HUDCard title="Display & Interface" className="p-8">
      <div className="space-y-6">
        {/* Theme & Default View Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Palette size={16} className="text-cyan-400" />
              Theme
            </label>
            <select
              value={theme}
              onChange={(e) =>
                setTheme(e.target.value as UserSettings['display']['theme'])
              }
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="dark">Dark</option>
              <option value="light">Light</option>
              <option value="auto">Auto (System)</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Layout size={16} className="text-cyan-400" />
              Default View
            </label>
            <select
              value={defaultView}
              onChange={(e) =>
                setDefaultView(e.target.value as UserSettings['display']['defaultView'])
              }
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="home">Home</option>
              <option value="log">Log</option>
              <option value="patterns">Patterns</option>
              <option value="goals">Goals</option>
            </select>
          </div>
        </div>

        {/* Animation Speed */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <Zap size={16} className="text-cyan-400" />
            Animation Speed
          </label>
          <div className="grid grid-cols-3 gap-3">
            {(['fast', 'normal', 'slow'] as const).map((speed) => (
              <button
                key={speed}
                onClick={() => setAnimationSpeed(speed)}
                className={`py-3 px-4 rounded-xl border-2 transition-all capitalize ${
                  animationSpeed === speed
                    ? 'border-cyan-500 bg-cyan-500/10 text-cyan-400'
                    : 'border-slate-800 bg-slate-900/30 text-slate-400 hover:border-slate-700 hover:text-white'
                }`}
              >
                {speed}
              </button>
            ))}
          </div>
        </div>

        {/* Haptic Feedback */}
        <div className="flex items-center justify-between p-4 bg-slate-900/30 border-2 border-slate-800 rounded-xl hover:border-slate-700 transition-all">
          <div className="flex items-center gap-3">
            <Smartphone size={18} className="text-cyan-400" />
            <div>
              <div className="text-base font-medium text-white">Haptic Feedback</div>
              <div className="text-sm text-slate-500">Vibrate on interactions (mobile)</div>
            </div>
          </div>
          <button
            onClick={() => setHapticFeedback(!hapticFeedback)}
            className={`relative w-14 h-7 rounded-full transition-all ${
              hapticFeedback ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' : 'bg-slate-700'
            }`}
          >
            <motion.span
              className="absolute top-0.5 left-0.5 w-6 h-6 bg-white rounded-full shadow-lg"
              animate={{
                x: hapticFeedback ? 28 : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 500,
                damping: 30,
              }}
            />
          </button>
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

