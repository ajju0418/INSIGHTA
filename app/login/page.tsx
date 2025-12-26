'use client'

import { HUDCard } from '@/components/HUDCard'
import Link from 'next/link'

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden flex items-center justify-center px-4">
      <div className="fixed inset-0 pointer-events-none opacity-20"
        style={{ backgroundImage: 'linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />
      <div className="fixed inset-0 pointer-events-none bg-[radial-gradient(circle_at_center,transparent_0%,#050505_100%)]" />
      <div className="relative z-10 w-full max-w-md">
        <HUDCard className="p-6 sm:p-8">
          <div className="mb-6 text-center">
            <p className="text-xs font-mono tracking-[0.3em] text-cyan-500 mb-2">ACCESS GATE</p>
            <h1 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-1">Log in to NEXURA</h1>
            <p className="text-sm text-slate-400">Return to your behavioral intelligence cockpit</p>
          </div>
          <form className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-slate-400">Email</label>
              <input
                type="email"
                className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="you@example.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs uppercase tracking-wide text-slate-400">Password</label>
              <input
                type="password"
                className="w-full rounded-xl bg-slate-950/60 border border-slate-800 px-4 py-3 text-sm text-slate-100 outline-none focus:border-cyan-500 focus:ring-2 focus:ring-cyan-500/30"
                placeholder="••••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-2 inline-flex items-center justify-center rounded-xl bg-cyan-500 text-slate-950 font-semibold text-sm py-3.5 hover:bg-cyan-400 transition-colors"
            >
              Enter System
            </button>
          </form>
          <div className="mt-6 flex items-center justify-between text-xs text-slate-400">
            <span className="opacity-70">New here?</span>
            <Link href="/signup" className="text-cyan-400 hover:text-cyan-300 font-medium">
              Create a NEXURA profile
            </Link>
          </div>
        </HUDCard>
      </div>
    </div>
  )
}
