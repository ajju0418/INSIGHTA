'use client'

import { useMemo, useState } from 'react'
import { HUDCard } from '@/components/HUDCard'
import Link from 'next/link'
import { Brain, Sparkles, User, Wallet } from 'lucide-react'

type SignupStep = 'profile' | 'habits' | 'finances' | 'summary'

export default function SignupPage() {
  const [step, setStep] = useState<SignupStep>('profile')
  const [name, setName] = useState('')
  const [role, setRole] = useState('')
  const [goal, setGoal] = useState('')
  const [energyPattern, setEnergyPattern] = useState('')
  const [moneyFeeling, setMoneyFeeling] = useState('')
  const [spendStyle, setSpendStyle] = useState('')

  const canContinue =
    (step === 'profile' && name.trim().length > 1 && role.trim().length > 1) ||
    (step === 'habits' && goal.trim().length > 1 && energyPattern.trim().length > 1) ||
    (step === 'finances' && moneyFeeling.trim().length > 1 && spendStyle.trim().length > 1) ||
    step === 'summary'

  const suggestedId = useMemo(() => {
    const base = name.trim() ? name.trim().split(' ')[0].toUpperCase() : 'PILOT'
    const tag =
      goal.toLowerCase().includes('debt') || goal.toLowerCase().includes('money')
        ? 'ALPHA'
        : goal.toLowerCase().includes('health') || goal.toLowerCase().includes('fitness')
        ? 'VITAL'
        : goal.toLowerCase().includes('focus') || goal.toLowerCase().includes('study')
        ? 'FOCUS'
        : 'NEX'
    return `${tag}-${base}-01`
  }, [name, goal])

  const primaryRecommendation = useMemo(() => {
    if (energyPattern.toLowerCase().includes('night') || energyPattern.toLowerCase().includes('late')) {
      return 'Night-shift protocol: anchor two habits after 9PM and keep mornings friction-free.'
    }
    if (energyPattern.toLowerCase().includes('morning')) {
      return 'Morning-focus protocol: stack your highest-value habits before noon with low-noise evenings.'
    }
    if (goal.toLowerCase().includes('savings') || goal.toLowerCase().includes('wealth')) {
      return 'Wealth-focus protocol: set a daily spend ceiling and auto-review each night for leaks.'
    }
    return 'Balanced protocol: start with one health habit, one focus habit, and one money check-in.'
  }, [energyPattern, goal])

  const spendInsight = useMemo(() => {
    if (spendStyle.toLowerCase().includes('impulse') || spendStyle.toLowerCase().includes('random')) {
      return 'Impulse control: redirect one weekly impulse purchase into a visible savings goal.'
    }
    if (spendStyle.toLowerCase().includes('planned') || spendStyle.toLowerCase().includes('budget')) {
      return 'Optimization: introduce a weekly audit to tune your categories and free up 5–10%.'
    }
    return 'Observation: for the first week, simply log everything to let NEXURA learn your pattern.'
  }, [spendStyle])

  const handleNext = () => {
    if (!canContinue) return
    if (step === 'profile') setStep('habits')
    else if (step === 'habits') setStep('finances')
    else if (step === 'finances') setStep('summary')
  }

  const handleBack = () => {
    if (step === 'habits') setStep('profile')
    else if (step === 'finances') setStep('habits')
    else if (step === 'summary') setStep('finances')
  }

  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      <div className="relative z-10 w-full max-w-xl">
        <HUDCard className="p-6 sm:p-8">
          <div className="mb-6">
            <p className="text-xs font-mono tracking-[0.3em] text-cyan-500 mb-2">NEW PILOT PROTOCOL</p>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-1">
              Create your NEXURA profile
            </h1>
            <p className="text-sm text-slate-400">
              A short AI interview to tune habits, money and recommendations.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6 text-xs font-mono text-slate-400">
            <div className={`h-1 rounded-full flex-1 ${step === 'profile' ? 'bg-cyan-400' : 'bg-slate-800'}`} />
            <div className={`h-1 rounded-full flex-1 ${step === 'habits' ? 'bg-cyan-400' : 'bg-slate-800'}`} />
            <div className={`h-1 rounded-full flex-1 ${step === 'finances' ? 'bg-cyan-400' : 'bg-slate-800'}`} />
            <div className={`h-1 rounded-full flex-1 ${step === 'summary' ? 'bg-cyan-400' : 'bg-slate-800'}`} />
          </div>

          {step === 'profile' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/40">
                  <User className="text-cyan-400" size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">Step 01</p>
                  <p className="text-sm text-slate-300">Who is piloting this system?</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">Preferred name</label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Alex"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">What do you mainly do?</label>
                <input
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                  placeholder="Student, engineer, creator, freelancer..."
                />
              </div>
            </div>
          )}

          {step === 'habits' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/10 border border-emerald-500/40">
                  <Sparkles className="text-emerald-400" size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-[0.25em] text-emerald-400 uppercase">Step 02</p>
                  <p className="text-sm text-slate-300">Habits and energy patterns</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  What is your main goal for the next 3 months?
                </label>
                <input
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Example: clear debt, get fit, ship a project..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  When do you usually feel most awake or focused?
                </label>
                <input
                  value={energyPattern}
                  onChange={(e) => setEnergyPattern(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/30"
                  placeholder="Early morning, late night, depends on the day..."
                />
              </div>
            </div>
          )}

          {step === 'finances' && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-fuchsia-500/10 border border-fuchsia-500/40">
                  <Wallet className="text-fuchsia-400" size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-[0.25em] text-fuchsia-400 uppercase">Step 03</p>
                  <p className="text-sm text-slate-300">Money behavior snapshot</p>
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  How do you currently feel about your money?
                </label>
                <input
                  value={moneyFeeling}
                  onChange={(e) => setMoneyFeeling(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30"
                  placeholder="Calm, stressed, curious, tracking everything..."
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs uppercase tracking-wide text-slate-400">
                  What best describes how you usually spend?
                </label>
                <input
                  value={spendStyle}
                  onChange={(e) => setSpendStyle(e.target.value)}
                  className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500/30"
                  placeholder="Planned, impulsive, routine-based, random..."
                />
              </div>
            </div>
          )}

          {step === 'summary' && (
            <div className="space-y-5">
              <div className="flex items-center gap-3 mb-1">
                <div className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-cyan-500/10 border border-cyan-500/40">
                  <Brain className="text-cyan-400" size={18} />
                </div>
                <div>
                  <p className="text-xs font-mono tracking-[0.25em] text-cyan-500 uppercase">AI BRIEFING</p>
                  <p className="text-sm text-slate-300">NEXURA preloads your starting protocol</p>
                </div>
              </div>
              <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3.5 text-sm text-slate-200">
                <p className="text-xs font-mono text-slate-500 mb-1">Assigned ID</p>
                <p className="text-lg font-semibold text-cyan-400">{suggestedId}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3.5 text-sm text-slate-200">
                  <p className="text-xs font-mono text-slate-500 mb-1">Behavior focus</p>
                  <p>{primaryRecommendation}</p>
                </div>
                <div className="rounded-2xl border border-slate-800/80 bg-slate-950/60 px-4 py-3.5 text-sm text-slate-200">
                  <p className="text-xs font-mono text-slate-500 mb-1">Money focus</p>
                  <p>{spendInsight}</p>
                </div>
              </div>
              <p className="text-xs text-slate-500">
                This is a local preview only. When you connect real data, NEXURA will refine this protocol from your
                actual habits and transactions.
              </p>
            </div>
          )}

          <div className="mt-8 flex items-center justify-between gap-3">
            <button
              type="button"
              onClick={handleBack}
              disabled={step === 'profile'}
              className="text-xs sm:text-sm rounded-xl border border-slate-700 bg-slate-950/60 px-4 py-2.5 text-slate-300 disabled:opacity-40 disabled:cursor-not-allowed hover:border-slate-500"
            >
              Back
            </button>
            {step !== 'summary' ? (
              <button
                type="button"
                onClick={handleNext}
                disabled={!canContinue}
                className="ml-auto inline-flex items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-semibold text-xs sm:text-sm px-5 py-2.5 hover:bg-cyan-400 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
              >
                Next
              </button>
            ) : (
              <Link
                href="/"
                className="ml-auto inline-flex items-center justify-center rounded-xl bg-emerald-500 text-slate-950 font-semibold text-xs sm:text-sm px-5 py-2.5 hover:bg-emerald-400 transition-colors"
              >
                Launch dashboard
              </Link>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="opacity-70">Already have access?</span>
            <Link href="/login" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Log in instead
            </Link>
          </div>
        </HUDCard>
      </div>
    </div>
  )
