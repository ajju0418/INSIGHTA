'use client'

import { useState, useEffect } from 'react'
import { HUDCard } from '@/components/HUDCard'
import { Brain, MessageSquare, Zap, TrendingUp, Lightbulb, Save, CheckCircle2 } from 'lucide-react'
import { UserSettings } from '@/types/settings'
import { motion } from 'framer-motion'

interface AISectionProps {
  ai: UserSettings['ai']
  onUpdate: (ai: Partial<UserSettings['ai']>) => void
}

export function AISection({ ai, onUpdate }: AISectionProps) {
  const [assistantName, setAssistantName] = useState(ai.assistantName)
  const [personality, setPersonality] = useState(ai.personality)
  const [insightFrequency, setInsightFrequency] = useState(ai.insightFrequency)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    setAssistantName(ai.assistantName)
    setPersonality(ai.personality)
    setInsightFrequency(ai.insightFrequency)
  }, [ai])

  const handleSave = () => {
    onUpdate({
      assistantName,
      personality,
      insightFrequency,
    })
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  const hasChanges =
    assistantName !== ai.assistantName ||
    personality !== ai.personality ||
    insightFrequency !== ai.insightFrequency

  const toggleFeature = (key: keyof UserSettings['ai'], value: boolean) => {
    onUpdate({ [key]: value })
  }

  return (
    <HUDCard title="AI Configuration" className="p-8">
      <div className="space-y-6">
        {/* Assistant Name */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
            <MessageSquare size={16} className="text-cyan-400" />
            Assistant Name
          </label>
          <input
            type="text"
            value={assistantName}
            onChange={(e) => setAssistantName(e.target.value)}
            className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white placeholder-slate-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all"
            placeholder="NEXURA AI"
          />
        </div>

        {/* Personality & Frequency Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Brain size={16} className="text-cyan-400" />
              Communication Style
            </label>
            <select
              value={personality}
              onChange={(e) =>
                setPersonality(e.target.value as UserSettings['ai']['personality'])
              }
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="professional">Professional - Data-driven, precise</option>
              <option value="friendly">Friendly - Warm, encouraging</option>
              <option value="motivational">Motivational - Energetic, inspiring</option>
              <option value="balanced">Balanced - Mix of all styles</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-slate-300 mb-3">
              <Zap size={16} className="text-cyan-400" />
              Insight Frequency
            </label>
            <select
              value={insightFrequency}
              onChange={(e) =>
                setInsightFrequency(
                  e.target.value as UserSettings['ai']['insightFrequency']
                )
              }
              className="w-full bg-slate-900/50 border-2 border-slate-800 rounded-xl px-4 py-3.5 text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/20 transition-all cursor-pointer"
            >
              <option value="daily">Daily - Insights every day</option>
              <option value="weekly">Weekly - Weekly summary</option>
              <option value="on-demand">On-Demand - When you ask</option>
            </select>
          </div>
        </div>

        {/* AI Features Toggle */}
        <div className="space-y-3 pt-6 border-t border-slate-800">
          <h3 className="text-base font-semibold text-white mb-4 flex items-center gap-2">
            <Zap size={18} className="text-cyan-400" />
            AI Features
          </h3>

          <ToggleItem
            label="Pattern Recognition"
            description="Identify behavioral patterns and trends"
            icon={<TrendingUp size={18} />}
            checked={ai.patternRecognition}
            onChange={(checked) => toggleFeature('patternRecognition', checked)}
          />

          <ToggleItem
            label="Predictive Analytics"
            description="Forecast future trends and outcomes"
            icon={<Zap size={18} />}
            checked={ai.predictiveAnalytics}
            onChange={(checked) => toggleFeature('predictiveAnalytics', checked)}
          />

          <ToggleItem
            label="Smart Recommendations"
            description="Get personalized suggestions"
            icon={<Lightbulb size={18} />}
            checked={ai.smartRecommendations}
            onChange={(checked) => toggleFeature('smartRecommendations', checked)}
          />

          <ToggleItem
            label="Spending Predictions"
            description="Forecast future expenses"
            icon={<TrendingUp size={18} />}
            checked={ai.spendingPredictions}
            onChange={(checked) => toggleFeature('spendingPredictions', checked)}
          />

          <ToggleItem
            label="Habit Optimization"
            description="Suggest habit improvements"
            icon={<Brain size={18} />}
            checked={ai.habitOptimization}
            onChange={(checked) => toggleFeature('habitOptimization', checked)}
          />
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

