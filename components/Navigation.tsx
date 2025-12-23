'use client'

import { motion } from 'framer-motion'

interface NavigationProps {
  currentPage: 'home' | 'log' | 'patterns' | 'review'
  onNavigate: (page: 'home' | 'log' | 'patterns' | 'review') => void
}

export function Navigation({ currentPage, onNavigate }: NavigationProps) {
  const navItems = [
    { 
      id: 'home' as const, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      label: 'Home',
      position: { x: -120, y: 0, z: 0 }
    },
    { 
      id: 'log' as const, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
        </svg>
      ),
      label: 'Log',
      position: { x: -40, y: 0, z: 0 }
    },
    { 
      id: 'patterns' as const, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      ),
      label: 'Insights',
      position: { x: 40, y: 0, z: 0 }
    },
    { 
      id: 'review' as const, 
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      label: 'Review',
      position: { x: 120, y: 0, z: 0 }
    },
  ]

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50" style={{ perspective: '1000px' }}>
      <div className="relative flex items-center justify-center">
        
        {navItems.map((item, index) => {
          const isActive = currentPage === item.id
          
          return (
            <motion.button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className="relative group"
              initial={{ 
                opacity: 0, 
                y: 50,
                rotateX: 45,
                scale: 0.8
              }}
              animate={{ 
                opacity: 1, 
                y: 0,
                rotateX: 0,
                scale: 1,
                x: item.position.x,
                z: isActive ? 20 : 0
              }}
              transition={{ 
                duration: 0.8, 
                delay: 0.5 + index * 0.1,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ 
                scale: 1.1, 
                rotateY: 10,
                z: 30,
                transition: { duration: 0.3 }
              }}
              whileTap={{ 
                scale: 0.9,
                rotateX: -10,
                transition: { duration: 0.1 }
              }}
              style={{ 
                transformStyle: 'preserve-3d',
                transform: `translateX(${item.position.x}px) ${isActive ? 'translateZ(20px)' : ''}`
              }}
            >
              
              {/* Floating orb container */}
              <motion.div
                className={`w-16 h-16 rounded-2xl backdrop-blur-xl border transition-all duration-500 ${
                  isActive 
                    ? 'bg-slate-800/80 border-slate-600/80 shadow-2xl' 
                    : 'bg-slate-800/40 border-slate-700/40 shadow-lg hover:bg-slate-800/60 hover:border-slate-600/60'
                }`}
                animate={{
                  rotateY: isActive ? [0, 5, 0] : 0,
                  boxShadow: isActive 
                    ? '0 25px 50px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
                    : '0 10px 25px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.05)'
                }}
                transition={{ duration: 0.6, repeat: isActive ? Infinity : 0, repeatDelay: 3 }}
                style={{
                  background: isActive 
                    ? 'linear-gradient(135deg, rgba(30,41,59,0.9) 0%, rgba(51,65,85,0.8) 100%)'
                    : 'linear-gradient(135deg, rgba(30,41,59,0.6) 0%, rgba(51,65,85,0.4) 100%)'
                }}
              >
                
                {/* Icon */}
                <div className="w-full h-full flex items-center justify-center">
                  <motion.div
                    className={`transition-all duration-300 ${
                      isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-300'
                    }`}
                    animate={{
                      scale: isActive ? [1, 1.1, 1] : 1,
                      rotateZ: isActive ? [0, 5, 0] : 0
                    }}
                    transition={{ duration: 2, repeat: isActive ? Infinity : 0 }}
                  >
                    {item.icon}
                  </motion.div>
                </div>
                
                {/* Glow effect for active item */}
                {isActive && (
                  <motion.div
                    className="absolute inset-0 bg-slate-600/20 rounded-2xl blur-xl"
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
              </motion.div>

              {/* Floating label */}
              <motion.div
                className="absolute -bottom-8 left-1/2 -translate-x-1/2 pointer-events-none"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.3 }}
              >
                <div className="bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 rounded-xl px-3 py-1">
                  <span className="text-xs font-medium text-slate-300 whitespace-nowrap">
                    {item.label}
                  </span>
                </div>
              </motion.div>

              {/* Connection lines between items */}
              {index < navItems.length - 1 && (
                <motion.div
                  className="absolute top-1/2 left-full w-20 h-px bg-gradient-to-r from-slate-600/50 to-transparent -translate-y-1/2 pointer-events-none"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 1 + index * 0.2, duration: 0.8 }}
                />
              )}
            </motion.button>
          )
        })}
        
        {/* Central connection hub */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-slate-600 rounded-full pointer-events-none"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        />
      </div>
    </div>
  )
}