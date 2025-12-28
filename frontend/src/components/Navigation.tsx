'use client'

import React from 'react'
import { Home, PenTool, BarChart3, Target } from 'lucide-react'
import { motion } from 'framer-motion'

interface NavigationProps {
  currentPage: 'home' | 'log' | 'patterns' | 'goals'
  onNavigate: (page: 'home' | 'log' | 'patterns' | 'goals') => void
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { id: 'home' as const, icon: Home, label: 'Home' },
    { id: 'log' as const, icon: PenTool, label: 'Input' },
    { id: 'patterns' as const, icon: BarChart3, label: 'Patterns' },
    { id: 'goals' as const, icon: Target, label: 'Goals' },
  ]

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center pointer-events-none">
      <div className="pointer-events-auto">
        <nav className="
          relative px-2 py-2 flex items-center gap-2
          bg-black/40 backdrop-blur-2xl
          border border-white/10
          rounded-full shadow-[0_8px_32px_rgba(0,0,0,0.5)]
          ring-1 ring-white/5
        ">
          {navItems.map((item) => {
            const isActive = currentPage === item.id
            const IconComponent = item.icon

            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className="relative z-10 px-6 py-3 flex items-center justify-center transition-colors group"
              >
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="absolute inset-0 bg-gradient-to-t from-cyan-500/20 to-cyan-400/10 rounded-full border border-cyan-500/20 shadow-[0_0_15px_rgba(34,211,238,0.3)]"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}

                <div className="relative z-20 flex flex-col items-center gap-1">
                  <IconComponent
                    size={20}
                    className={`transition-colors duration-200 ${isActive ? 'text-cyan-400' : 'text-slate-400 group-hover:text-slate-200'
                      }`}
                  />
                  {isActive && (
                    <motion.div
                      initial={{ width: 0, opacity: 0 }}
                      animate={{ width: 4, opacity: 1 }}
                      className="h-1 bg-cyan-400 rounded-full absolute -bottom-1 shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                    />
                  )}
                </div>
              </button>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
