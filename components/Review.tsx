'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function Review() {
  const [selectedPeriod, setSelectedPeriod] = useState('week')
  const [hoveredInsight, setHoveredInsight] = useState<string | null>(null)

  const weeklyStats = [
    { 
      label: 'Habit Completion', 
      value: 78, 
      change: '+12%', 
      description: 'Average daily completion rate',
      color: 'from-emerald-400 to-teal-500',
      icon: '✨'
    },
    { 
      label: 'Budget Adherence', 
      value: 85, 
      change: '+5%', 
      description: 'Stayed within planned spending',
      color: 'from-blue-400 to-indigo-500',
      icon: '💰'
    },
    { 
      label: 'Productivity Score', 
      value: 92, 
      change: '+18%', 
      description: 'Focus time and goal achievement',
      color: 'from-purple-400 to-pink-500',
      icon: '🚀'
    },
    { 
      label: 'Wellness Index', 
      value: 74, 
      change: '-3%', 
      description: 'Sleep, exercise, and nutrition balance',
      color: 'from-orange-400 to-red-500',
      icon: '🌟'
    }
  ]

  const habitAnalysis = [
    { name: 'Morning Meditation', completion: 85, streak: 12, impact: 'High', color: '#10b981' },
    { name: 'Exercise', completion: 71, streak: 8, impact: 'High', color: '#3b82f6' },
    { name: 'Reading', completion: 92, streak: 15, impact: 'Medium', color: '#8b5cf6' },
    { name: 'Journaling', completion: 57, streak: 3, impact: 'Medium', color: '#f59e0b' },
    { name: 'Early Sleep', completion: 43, streak: 2, impact: 'High', color: '#ef4444' }
  ]

  const spendingInsights = [
    {
      category: 'Food & Dining',
      amount: 10955,
      budget: 14000,
      trend: 'under',
      transactions: 12,
      color: '#10b981'
    },
    {
      category: 'Transportation',
      amount: 6244,
      budget: 7000,
      trend: 'under',
      transactions: 8,
      color: '#3b82f6'
    },
    {
      category: 'Entertainment',
      amount: 10206,
      budget: 8400,
      trend: 'over',
      transactions: 6,
      color: '#ef4444'
    },
    {
      category: 'Shopping',
      amount: 5523,
      budget: 10500,
      trend: 'under',
      transactions: 4,
      color: '#8b5cf6'
    }
  ]

  const aiInsights = [
    {
      id: 'pattern1',
      title: 'Morning Routine Optimization',
      description: 'Your meditation completion rate is 34% higher when you exercise first. Consider swapping the order.',
      confidence: 94,
      impact: 'High',
      type: 'habit'
    },
    {
      id: 'pattern2',
      title: 'Spending Correlation',
      description: 'Entertainment expenses increase by 67% on days when you skip your morning routine.',
      confidence: 87,
      impact: 'Medium',
      type: 'expense'
    },
    {
      id: 'pattern3',
      title: 'Productivity Peak',
      description: 'Your focus sessions are most effective between 2-4 PM, especially after a healthy lunch.',
      confidence: 91,
      impact: 'High',
      type: 'productivity'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '6s' }} />
      </div>

      <div className="relative z-10 px-6 pt-16 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-5xl font-light mb-2 bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                Weekly Review
              </h1>
              <p className="text-slate-400 text-lg">AI-powered insights and performance analysis</p>
            </div>
            
            {/* Period Selector */}
            <div className="flex bg-slate-800/50 backdrop-blur-xl rounded-2xl p-1 border border-slate-700/50">
              {['week', 'month', 'quarter'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Weekly Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {weeklyStats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-2xl`}>
                    {stat.icon}
                  </div>
                  <span className={`text-sm font-medium ${
                    stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                  }`}>
                    {stat.change}
                  </span>
                </div>

                <div className="mb-4">
                  <div className="flex items-baseline gap-2 mb-2">
                    <span className="text-3xl font-bold">{stat.value}</span>
                    <span className="text-slate-400 text-sm">%</span>
                  </div>
                  <h3 className="text-slate-300 font-medium">{stat.label}</h3>
                </div>

                <div className="mb-4">
                  <div className="w-full bg-slate-700/50 rounded-full h-2">
                    <motion.div
                      className={`h-2 rounded-full bg-gradient-to-r ${stat.color}`}
                      initial={{ width: 0 }}
                      animate={{ width: `${stat.value}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                    />
                  </div>
                </div>

                <p className="text-slate-400 text-sm">{stat.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Analysis Sections */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
          
          {/* Habit Analysis */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-6">Habit Performance</h2>
              <div className="space-y-4">
                {habitAnalysis.map((habit, index) => (
                  <motion.div
                    key={habit.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 + index * 0.05 }}
                    className="flex items-center gap-4 p-4 rounded-2xl bg-slate-700/30"
                  >
                    <div 
                      className="w-3 h-12 rounded-full"
                      style={{ backgroundColor: habit.color }}
                    />
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="font-medium text-slate-200">{habit.name}</h3>
                        <span className="text-slate-300 font-bold">{habit.completion}%</span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-400">
                        <span>{habit.streak} day streak</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          habit.impact === 'High' ? 'bg-emerald-500/20 text-emerald-400' :
                          habit.impact === 'Medium' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-slate-500/20 text-slate-400'
                        }`}>
                          {habit.impact} Impact
                        </span>
                      </div>
                      <div className="w-full bg-slate-600/50 rounded-full h-1 mt-2">
                        <div 
                          className="h-1 rounded-full transition-all duration-1000"
                          style={{ 
                            width: `${habit.completion}%`,
                            backgroundColor: habit.color
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Spending Analysis */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.7 }}
          >
            <div className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6">
              <h2 className="text-xl font-semibold text-slate-200 mb-6">Spending Analysis</h2>
              <div className="space-y-4">
                {spendingInsights.map((category, index) => (
                  <motion.div
                    key={category.category}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.05 }}
                    className="p-4 rounded-2xl bg-slate-700/30"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-medium text-slate-200">{category.category}</h3>
                      <span className={`text-sm font-medium ${
                        category.trend === 'under' ? 'text-emerald-400' : 'text-red-400'
                      }`}>
                        {category.trend === 'under' ? '↓' : '↑'} ₹{Math.abs(category.amount - category.budget).toFixed(0)}
                      </span>
                    </div>
                    <div className="flex items-center justify-between mb-2 text-sm text-slate-400">
                      <span>₹{category.amount.toFixed(0)} / ₹{category.budget}</span>
                      <span>{category.transactions} transactions</span>
                    </div>
                    <div className="w-full bg-slate-600/50 rounded-full h-2">
                      <div 
                        className="h-2 rounded-full transition-all duration-1000"
                        style={{ 
                          width: `${Math.min((category.amount / category.budget) * 100, 100)}%`,
                          backgroundColor: category.color
                        }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl font-light mb-8 text-slate-200">AI-Powered Insights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {aiInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                onMouseEnter={() => setHoveredInsight(insight.id)}
                onMouseLeave={() => setHoveredInsight(null)}
                className={`bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 transition-all duration-300 ${
                  hoveredInsight === insight.id ? 'scale-105 border-slate-600/50' : ''
                }`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    insight.type === 'habit' ? 'bg-emerald-500/20 text-emerald-400' :
                    insight.type === 'expense' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-purple-500/20 text-purple-400'
                  }`}>
                    {insight.type === 'habit' ? '✨' : insight.type === 'expense' ? '💰' : '🚀'}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <h3 className="text-slate-200 font-medium">{insight.title}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        insight.impact === 'High' ? 'bg-emerald-500/20 text-emerald-400' :
                        'bg-yellow-500/20 text-yellow-400'
                      }`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4">{insight.description}</p>
                  </div>
                </div>
                
                {/* Confidence Level */}
                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-xs">Confidence:</span>
                  <div className="flex-1 bg-slate-700/50 rounded-full h-1">
                    <div 
                      className="h-1 rounded-full bg-gradient-to-r from-emerald-400 to-blue-400"
                      style={{ width: `${insight.confidence}%` }}
                    />
                  </div>
                  <span className="text-slate-400 text-xs">{insight.confidence}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  )
}