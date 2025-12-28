'use client'

import { Settings } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function SettingsLink() {
  const router = useRouter()

  return (
    <button
      onClick={() => router.push('/settings')}
      className="fixed top-6 right-6 z-50 p-3 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 rounded-lg transition-colors"
      aria-label="Settings"
    >
      <Settings size={20} className="text-cyan-400" />
    </button>
  )
}

