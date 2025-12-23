'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

export function Patterns() {
  const [selectedPeriod, setSelectedPeriod] = useState('today')
  const [hoveredMetric, setHoveredMetric] = useState<string | null>(null)

  const behaviorMetrics = [
    { 
      id: 'momentum', 
      label: 'Momentum Index', 
      value: 87, 
      trend: '+12%',
      description: 'Habit completion velocity and consistency',
      color: 'from-slate-400 to-slate-600'
    },
    { 
      id: 'consistency', 
      label: 'Consistency Score', 
      value: 73, 
      trend: '+5%',
      description: 'Daily routine adherence and stability',
      color: 'from-slate-400 to-slate-600'
    },
    { 
      id: 'efficiency', 
      label: 'Decision Efficiency', 
      value: 91, 
      trend: '+8%',
      description: 'Ratio of intentional vs impulsive actions',
      color: 'from-slate-400 to-slate-600'
    },
    { 
      id: 'balance', 
      label: 'Life Balance', 
      value: 68, 
      trend: '-3%',
      description: 'Work, health, and personal time distribution',
      color: 'from-slate-400 to-slate-600'
    }
  ]

  const timelineEvents = [
    { time: '06:00', event: 'Meditation', type: 'habit', impact: 95, color: '#10b981' },
    { time: '07:30', event: 'Exercise', type: 'habit', impact: 88, color: '#3b82f6' },
    { time: '09:00', event: 'Coffee', type: 'expense', impact: 45, color: '#f59e0b' },
    { time: '12:30', event: 'Lunch', type: 'expense', impact: 70, color: '#06b6d4' },
    { time: '14:00', event: 'Deep Work', type: 'habit', impact: 92, color: '#8b5cf6' },
    { time: '20:00', event: 'Dinner Out', type: 'expense', impact: 25, color: '#ef4444' },
    { time: '22:30', event: 'Reading', type: 'habit', impact: 85, color: '#6366f1' }
  ]

  const insights = [
    {
      title: 'Peak Performance Window',
      description: 'Your productivity peaks between 2-4 PM when preceded by morning exercise',
      confidence: 94,
      type: 'positive'
    },
    {
      title: 'Spending Pattern Alert',
      description: 'Evening expenses are 40% higher on days without morning meditation',
      confidence: 87,
      type: 'warning'
    },
    {
      title: 'Habit Synergy Detected',
      description: 'Reading before bed improves next-day meditation completion by 23%',
      confidence: 91,
      type: 'insight'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      
      {/* Animated Background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-purple-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="relative z-10 px-6 pt-16 pb-32">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto mb-12"
        >
          <div className="flex items-center justify-between mb-8">
            <div className="relative">
              <motion.h1 
                className="text-6xl font-extralight mb-3 relative tracking-tight"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <span className="text-white font-light">
                  Behavioral
                </span>
                <span className="mx-3 text-slate-500 font-thin">|</span>
                <span className="text-slate-300 font-extralight">
                  Analytics
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-slate-400 text-lg font-light tracking-wide"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                Advanced pattern recognition and predictive insights
              </motion.p>
            </div>
            
            {/* Period Selector */}
            <div className="flex bg-slate-800/50 backdrop-blur-xl rounded-2xl p-1 border border-slate-700/50">
              {['today', 'week', 'month'].map((period) => (
                <button
                  key={period}
                  onClick={() => setSelectedPeriod(period)}
                  className={`px-6 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    selectedPeriod === period
                      ? 'bg-emerald-500 text-white shadow-lg'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  {period.charAt(0).toUpperCase() + period.slice(1)}
                </button>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Behavior Metrics Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {behaviorMetrics.map((metric, index) => (
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
                    <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-slate-400" />
                    </div>
                    <span className={`text-sm font-medium ${
                      metric.trend.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
                    }`}>
                      {metric.trend}
                    </span>
                  </div>

                  {/* Metric Value */}
                  <div className="mb-4">
                    <div className="flex items-baseline gap-2 mb-2">
                      <span className="text-3xl font-bold">{metric.value}</span>
                      <span className="text-slate-400 text-sm">/ 100</span>
                    </div>
                    <h3 className="text-slate-300 font-medium">{metric.label}</h3>
                  </div>

                  {/* Progress Bar */}
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

                  {/* Description */}
                  <p className="text-slate-400 text-sm">{metric.description}</p>

                  {/* Hover Glow */}
                  {hoveredMetric === metric.id && (
                    <div className={`absolute inset-0 bg-gradient-to-br ${metric.color} opacity-10 rounded-3xl blur-xl`} />
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Timeline Visualization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="max-w-7xl mx-auto mb-16"
        >
          <h2 className="text-2xl font-light mb-8 text-slate-200">Today's Impact Flow</h2>
          
          <div className="relative">
            {/* Timeline Container */}
            <div className="overflow-x-auto scrollbar-hide pb-6">
              <div className="relative min-w-max px-8">
                
                {/* Main Timeline Line */}
                <div className="absolute top-20 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-slate-600 to-transparent" />
                
                {/* Time Markers */}
                <div className="flex justify-between mb-8 text-xs text-slate-500 font-mono">
                  <span>06:00</span>
                  <span>12:00</span>
                  <span>18:00</span>
                  <span>24:00</span>
                </div>
                
                {/* Events Timeline */}
                <div className="flex gap-16 items-start min-w-[1200px]">
                  {timelineEvents.map((event, index) => {
                    const impactHeight = Math.max(event.impact / 2, 20)
                    
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 30, scale: 0.8 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{ 
                          delay: 0.7 + index * 0.1,
                          duration: 0.6,
                          type: "spring",
                          stiffness: 100
                        }}
                        className="flex flex-col items-center relative group cursor-pointer"
                      >
                        
                        {/* Time Label */}
                        <div className="text-slate-300 text-lg font-semibold mb-4 tracking-wide">
                          {event.time}
                        </div>
                        
                        {/* Impact Bar */}
                        <motion.div 
                          className="relative mb-4"
                          whileHover={{ scale: 1.1 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div 
                            className="w-6 rounded-full transition-all duration-500 group-hover:w-8"
                            style={{ 
                              height: `${impactHeight}px`,
                              background: `linear-gradient(to top, ${event.color}40, ${event.color})`,
                              boxShadow: `0 0 20px ${event.color}30, inset 0 1px 0 rgba(255,255,255,0.2)`
                            }}
                          />
                          
                          {/* Impact Score */}
                          <div 
                            className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold px-2 py-1 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                            style={{ 
                              backgroundColor: event.color + '20',
                              color: event.color,
                              border: `1px solid ${event.color}40`
                            }}
                          >
                            {event.impact}
                          </div>
                        </motion.div>
                        
                        {/* Timeline Dot */}
                        <motion.div 
                          className="relative z-10 mb-4"
                          whileHover={{ scale: 1.3 }}
                          transition={{ duration: 0.2 }}
                        >
                          <div 
                            className="w-4 h-4 rounded-full border-2 border-slate-700 transition-all duration-300 group-hover:border-slate-500"
                            style={{ 
                              backgroundColor: event.color,
                              boxShadow: `0 0 15px ${event.color}50`
                            }}
                          />
                          
                          {/* Pulse Ring */}
                          <div 
                            className="absolute inset-0 rounded-full animate-ping opacity-20"
                            style={{ backgroundColor: event.color }}
                          />
                        </motion.div>
                        
                        {/* Event Card */}
                        <motion.div
                          className="bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-4 min-w-[140px] text-center transition-all duration-300 group-hover:bg-slate-800/80 group-hover:border-slate-600/50 group-hover:scale-105"
                          style={{
                            background: `linear-gradient(135deg, rgba(30,41,59,0.8) 0%, rgba(51,65,85,0.6) 100%)`,
                          }}
                        >
                          {/* Event Icon */}
                          <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center mx-auto mb-3">
                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: event.color }} />
                          </div>
                          
                          {/* Event Details */}
                          <h3 className="text-slate-200 font-medium text-sm mb-1">{event.event}</h3>
                          <p className={`text-xs font-medium mb-2 ${
                            event.type === 'habit' ? 'text-emerald-400' : 'text-blue-400'
                          }`}>
                            {event.type}
                          </p>
                          
                          {/* Impact Level Dots */}
                          <div className="flex justify-center gap-1">
                            {[1, 2, 3, 4, 5].map((level) => (
                              <div
                                key={level}
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  level <= Math.floor(event.impact / 20) 
                                    ? 'opacity-100 scale-100' 
                                    : 'opacity-30 scale-75'
                                }`}
                                style={{ backgroundColor: event.color }}
                              />
                            ))}
                          </div>
                        </motion.div>
                        
                        {/* Connection Line to Next Event */}
                        {index < timelineEvents.length - 1 && (
                          <div 
                            className="absolute top-20 left-full w-16 h-0.5 -translate-y-1/2"
                            style={{
                              background: `linear-gradient(to right, ${event.color}60, transparent)`
                            }}
                          />
                        )}
                      </motion.div>
                    )
                  })}
                </div>
              </div>
            </div>
            
            {/* Scroll Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2 text-slate-500 text-xs">
                <div className="w-4 h-0.5 bg-slate-600 rounded-full" />
                <span>Scroll to explore timeline</span>
                <div className="w-4 h-0.5 bg-slate-600 rounded-full" />
              </div>
            </div>
          </div>
        </motion.div>

        {/* AI Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
          className="max-w-7xl mx-auto"
        >
          <h2 className="text-2xl font-light mb-8 text-slate-200">AI-Generated Insights</h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.1 + index * 0.1 }}
                className="bg-slate-800/50 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 hover:border-slate-600/50 transition-all duration-300"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-8 h-8 rounded-lg bg-slate-700/50 border border-slate-600/50 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-slate-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-slate-200 font-medium mb-2">{insight.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{insight.description}</p>
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

      <style jsx>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}