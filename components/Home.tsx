'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export function Home() {
  const [greeting, setGreeting] = useState('')
  const [currentDate, setCurrentDate] = useState('')
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good morning')
    else if (hour < 18) setGreeting('Good afternoon')
    else setGreeting('Good evening')

    const options: Intl.DateTimeFormatOptions = { weekday: 'long', month: 'long', day: 'numeric' }
    setCurrentDate(new Date().toLocaleDateString('en-US', options))
  }, [])

  const lifeMetrics = [
    { 
      id: 'wellness', 
      label: 'Wellness Score', 
      value: 87, 
      change: '+5',
      description: 'Overall health and habit consistency',
      color: 'from-emerald-400 to-teal-500',
      icon: '🌟'
    },
    { 
      id: 'productivity', 
      label: 'Productivity Index', 
      value: 73, 
      change: '+12',
      description: 'Focus time and goal completion rate',
      color: 'from-blue-400 to-indigo-500',
      icon: '⚡'
    },
    { 
      id: 'financial', 
      label: 'Financial Health', 
      value: 91, 
      change: '-3',
      description: 'Budget adherence and savings rate',
      color: 'from-purple-400 to-pink-500',
      icon: '💎'
    }
  ]

  const todayHabits = [
    { name: 'Morning Meditation', completed: true, streak: 12, impact: 95, color: '#10b981' },
    { name: 'Exercise Routine', completed: true, streak: 8, impact: 88, color: '#3b82f6' },
    { name: 'Deep Work Session', completed: false, streak: 5, impact: 0, color: '#8b5cf6' },
    { name: 'Evening Reading', completed: false, streak: 15, impact: 0, color: '#6366f1' },
    { name: 'Healthy Eating', completed: true, streak: 3, impact: 75, color: '#06b6d4' },
    { name: 'No Social Media', completed: false, streak: 7, impact: 0, color: '#f59e0b' }
  ]

  const recentExpenses = [
    { name: 'Morning Coffee', amount: 315, category: 'Food', impact: 'neutral', color: '#f59e0b' },
    { name: 'Healthy Lunch', amount: 1260, category: 'Food', impact: 'positive', color: '#10b981' },
    { name: 'Book Purchase', amount: 1820, category: 'Learning', impact: 'positive', color: '#8b5cf6' },
    { name: 'Impulse Snack', amount: 595, category: 'Food', impact: 'negative', color: '#ef4444' }
  ]

  const habitScore = Math.round((todayHabits.filter(h => h.completed).length / todayHabits.length) * 100)
  const totalSpent = recentExpenses.reduce((sum, exp) => sum + exp.amount, 0)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 px-6 pt-12 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h1 className="text-5xl font-light mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                {greeting}, Alex
              </h1>
              <p className="text-slate-400 text-lg">{currentDate}</p>
            </div>
            
            {/* Habit Score Circle */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="relative w-24 h-24"
            >
              <svg className="w-24 h-24 transform -rotate-90">
                <circle cx="48" cy="48" r="40" stroke="#374151" strokeWidth="6" fill="none" />
                <motion.circle
                  cx="48" cy="48" r="40" stroke="url(#gradient)" strokeWidth="6" fill="none"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: "0 251" }}
                  animate={{ strokeDasharray: `${habitScore * 2.51} 251` }}
                  transition={{ duration: 1.5, delay: 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#10b981" />
                    <stop offset="100%" stopColor="#06b6d4" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-2xl font-bold">{habitScore}%</span>
                <span className="text-xs text-slate-400">Today</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Life Metrics */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {lifeMetrics.map((metric, index) => (
              <motion.div
                key={metric.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                onMouseEnter={() => setHoveredMetric(metric.id)}
                onMouseLeave={() => setHoveredMetric(null)}
                className="relative group"
              >
                <div className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 transition-all duration-500 ${
                  hoveredMetric === metric.id ? 'scale-105 border-slate-600/50' : ''
                }`}>
                  
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${metric.color} flex items-center justify-center text-2xl`}>
                      {metric.icon}
                    </div>
                    <span className={`text-sm font-medium ${
                      metric.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {metric.change}
                    </span>
                  </div>

                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold">{metric.value}</span>
                      <span className="text-slate-400 text-sm">/ 100</span>
                    </div>
                    <h3 className="text-slate-300 font-medium">{metric.label}</h3>
                  </div>

                  <div className="mb-4">
                    <div className="w-full bg-slate-700/50 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full bg-gradient-to-r ${metric.color}`}
                        initial={{ width: 0 }}
                        animate={{ width: `${metric.value}%` }}
                        transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      />
                    </div>
                  </div>

                  <p className="text-slate-400 text-sm">{metric.description}</p>

                  {hoveredMetric === metric.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 rounded-3xl blur-xl`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Today's Habits */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-6">Today's Habits</h2>
              <div className="space-y-4">
                {todayHabits.map((habit, index) => (
                  <motion.div
                    key={habit.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300"
                  >
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-10 h-10 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                        habit.completed 
                          ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/30' 
                          : 'bg-slate-600 border-2 border-slate-500 hover:border-emerald-500'
                      }`}
                    >
                      {habit.completed && <span className="text-sm">✓</span>}
                    </motion.div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-200">{habit.name}</h3>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{habit.streak} day streak</span>
                        {habit.completed && (
                          <span className="text-emerald-400">Impact: {habit.impact}</span>
                        )}
                      </div>
                    </div>
                    {habit.completed && (
                      <div className="w-2 h-8 rounded-full" style={{ backgroundColor: habit.color + '60' }} />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Recent Expenses */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-slate-200">Recent Expenses</h2>
                <span className="text-slate-400">₹{totalSpent.toFixed(0)}</span>
              </div>
              <div className="space-y-4">
                {recentExpenses.map((expense, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30 hover:bg-slate-700/50 transition-all duration-300"
                  >
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium"
                      style={{ backgroundColor: expense.color + '30', color: expense.color }}
                    >
                      {expense.impact === 'positive' ? '✓' : expense.impact === 'negative' ? '!' : '○'}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-slate-200">{expense.name}</h3>
                      <p className="text-sm text-slate-400">{expense.category}</p>
                    </div>
                    <div className="text-right">
                      <span className="font-semibold text-slate-200">₹{expense.amount.toFixed(0)}</span>
                      <div className={`text-xs ${
                        expense.impact === 'positive' ? 'text-emerald-400' :
                        expense.impact === 'negative' ? 'text-red-400' : 'text-slate-400'
                      }`}>
                        {expense.impact}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="max-w-7xl mx-auto mt-12"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {[
              { icon: '✨', label: 'Complete Habit', color: 'from-emerald-400 to-teal-500' },
              { icon: '💰', label: 'Log Expense', color: 'from-blue-400 to-indigo-500' },
              { icon: '📊', label: 'View Analytics', color: 'from-purple-400 to-pink-500' },
              { icon: '🎯', label: 'Set New Goal', color: 'from-orange-400 to-red-500' },
            ].map((action, index) => (
              <motion.button
                key={action.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1 + index * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 text-center hover:border-slate-600/50 transition-all duration-300"
              >
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${action.color} flex items-center justify-center mx-auto mb-3 text-2xl`}>
                  {action.icon}
                </div>
                <p className="text-sm font-medium text-slate-300">{action.label}</p>
              </motion.button>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}