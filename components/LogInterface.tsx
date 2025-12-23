'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function LogInterface() {
  const [mode, setMode] = useState<'habit' | 'expense'>('habit')
  const [selectedHabit, setSelectedHabit] = useState<string | null>(null)
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('')

  const habits = [
    { id: 'meditation', name: 'Morning Meditation', icon: '🧘', color: 'from-emerald-400 to-teal-500', streak: 12 },
    { id: 'exercise', name: 'Exercise', icon: '💪', color: 'from-blue-400 to-indigo-500', streak: 8 },
    { id: 'reading', name: 'Reading', icon: '📚', color: 'from-purple-400 to-pink-500', streak: 15 },
    { id: 'water', name: 'Drink Water', icon: '💧', color: 'from-cyan-400 to-blue-500', streak: 5 },
    { id: 'journal', name: 'Journaling', icon: '✍️', color: 'from-orange-400 to-red-500', streak: 7 },
    { id: 'sleep', name: 'Early Sleep', icon: '😴', color: 'from-indigo-400 to-purple-500', streak: 3 }
  ]

  const expenseCategories = [
    { id: 'food', name: 'Food & Dining', icon: '🍽️', color: 'from-emerald-400 to-teal-500' },
    { id: 'transport', name: 'Transport', icon: '🚗', color: 'from-blue-400 to-indigo-500' },
    { id: 'shopping', name: 'Shopping', icon: '🛍️', color: 'from-purple-400 to-pink-500' },
    { id: 'health', name: 'Health & Fitness', icon: '🏥', color: 'from-cyan-400 to-blue-500' },
    { id: 'entertainment', name: 'Entertainment', icon: '🎬', color: 'from-orange-400 to-red-500' },
    { id: 'education', name: 'Education', icon: '📚', color: 'from-indigo-400 to-purple-500' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-6 py-16">
        <div className="w-full max-w-2xl">
          
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl font-light mb-4 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Smart Logging
            </h1>
            <p className="text-slate-400 text-lg">AI-powered habit and expense tracking</p>
          </motion.div>

          {/* Mode Selection */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex justify-center mb-12"
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-2 flex">
              {['habit', 'expense'].map((type) => (
                <button
                  key={type}
                  onClick={() => setMode(type as any)}
                  className={`px-8 py-4 rounded-xl text-sm font-medium transition-all duration-300 ${
                    mode === type 
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30' 
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {type === 'habit' ? '✨ Log Habit' : '💰 Log Expense'}
                </button>
              ))}
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: mode === 'habit' ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
            className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-8"
          >
            
            {mode === 'habit' ? (
              <div>
                <h2 className="text-2xl font-light mb-8 text-center text-slate-200">
                  Which habit did you complete?
                </h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                  {habits.map((habit, index) => (
                    <motion.button
                      key={habit.id}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3 + index * 0.05 }}
                      onClick={() => setSelectedHabit(habit.id)}
                      className={`p-6 rounded-2xl border transition-all duration-300 ${
                        selectedHabit === habit.id
                          ? 'border-emerald-500 bg-emerald-500/10 scale-105'
                          : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50 hover:bg-slate-700/50'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${habit.color} flex items-center justify-center text-3xl mx-auto mb-4`}>
                        {habit.icon}
                      </div>
                      <h3 className="font-medium text-slate-200 mb-2">{habit.name}</h3>
                      <p className="text-sm text-slate-400">{habit.streak} day streak</p>
                      
                      {selectedHabit === habit.id && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="mt-4 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center mx-auto"
                        >
                          <span className="text-white text-sm">✓</span>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>

                {selectedHabit && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center"
                  >
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white px-12 py-4 rounded-2xl font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/40 transition-all duration-300"
                    >
                      Complete Habit
                    </motion.button>
                  </motion.div>
                )}
              </div>
            ) : (
              <div>
                <h2 className="text-2xl font-light mb-8 text-center text-slate-200">
                  Log your expense
                </h2>
                
                {/* Amount Input */}
                <div className="mb-8">
                  <motion.input
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    type="text"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="$0.00"
                    className="w-full text-6xl font-light text-center bg-transparent border-none outline-none text-white placeholder-slate-500 mb-4"
                  />
                  <div className="w-24 h-px bg-gradient-to-r from-transparent via-slate-500 to-transparent mx-auto" />
                </div>

                {/* Categories */}
                {amount && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="text-lg font-medium text-slate-300 mb-6 text-center">
                      Select category
                    </h3>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-8">
                      {expenseCategories.map((cat, index) => (
                        <motion.button
                          key={cat.id}
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ delay: 0.6 + index * 0.05 }}
                          onClick={() => setCategory(cat.id)}
                          className={`p-4 rounded-2xl border transition-all duration-300 ${
                            category === cat.id
                              ? 'border-emerald-500 bg-emerald-500/10 scale-105'
                              : 'border-slate-600/50 bg-slate-700/30 hover:border-slate-500/50'
                          }`}
                        >
                          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${cat.color} flex items-center justify-center text-2xl mx-auto mb-3`}>
                            {cat.icon}
                          </div>
                          <p className="text-sm font-medium text-slate-300">{cat.name}</p>
                        </motion.button>
                      ))}
                    </div>

                    {category && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center"
                      >
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white px-12 py-4 rounded-2xl font-medium shadow-lg shadow-blue-500/30 hover:shadow-blue-500/40 transition-all duration-300"
                        >
                          Save Expense
                        </motion.button>
                      </motion.div>
                    )}
                  </motion.div>
                )}
              </div>
            )}
          </motion.div>

          {/* AI Suggestion */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="mt-8 bg-slate-800/30 backdrop-blur-xl border border-slate-700/30 rounded-2xl p-6"
          >
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl flex items-center justify-center text-xl">
                🤖
              </div>
              <div>
                <h4 className="font-medium text-slate-200 mb-1">AI Suggestion</h4>
                <p className="text-slate-400 text-sm">
                  {mode === 'habit' 
                    ? "Your meditation streak is strong! Consider adding a 5-minute breathing exercise."
                    : "You're 23% under budget this week. Great job on mindful spending!"
                  }
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}