'use client'

import { useEffect } from 'react'
import { Zap, Book, Moon, TrendingUp, CheckCircle2, AlertCircle } from 'lucide-react'
import { useHabitsStore } from '../stores/habitsStore'

export function DailyNexus() {
    const { habits, isLoading, error, fetchHabits, completeHabit, clearError } = useHabitsStore()
    const completedCount = habits.filter(h => h.isCompleted).length

    useEffect(() => {
        fetchHabits()
    }, [fetchHabits])

    const handleCompleteHabit = async (id: string) => {
        try {
            await completeHabit(id)
        } catch (error) {
            console.error('Failed to complete habit:', error)
        }
    }

    if (isLoading) {
        return <div className="text-slate-400">Loading habits...</div>
    }

    if (error) {
        return (
            <div className="text-red-400 p-4 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} />
                    <span>Failed to load habits</span>
                </div>
                <p className="text-sm text-red-300">{error}</p>
                <button 
                    onClick={() => { clearError(); fetchHabits(); }}
                    className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
                >
                    Try again
                </button>
            </div>
        )
    }

    const getIcon = (name: string) => {
        if (name.toLowerCase().includes('meditation')) return Zap
        if (name.toLowerCase().includes('read')) return Book
        if (name.toLowerCase().includes('sleep')) return Moon
        return Zap
    }

    return (
        <div className="space-y-4">
            {/* Summary Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                <div className="flex items-center gap-3">
                    <TrendingUp size={18} className="text-emerald-400" />
                    <span className="text-base font-medium text-slate-300">Today's Progress</span>
                </div>
                <div className="flex items-center gap-2">
                    <span className="text-2xl font-bold text-white">{completedCount}</span>
                    <span className="text-base text-slate-500">/ {habits.length}</span>
                </div>
            </div>

            {/* Habit List */}
            <div className="space-y-3">
                {habits.length === 0 ? (
                    <div className="text-slate-500 text-center py-8">
                        No habits found. Create your first habit to get started!
                    </div>
                ) : (
                    habits.map((habit) => {
                        const IconComponent = getIcon(habit.name)
                        return (
                            <div
                                key={habit.id}
                                className={`flex items-center gap-4 p-4 border transition-all cursor-pointer ${
                                    habit.isCompleted
                                        ? 'border-emerald-500/30 bg-emerald-950/20'
                                        : 'border-slate-800 bg-slate-900/30 hover:border-slate-700'
                                }`}
                                onClick={() => !habit.isCompleted && handleCompleteHabit(habit.id)}
                            >
                                {/* Icon */}
                                <div className="w-12 h-12 bg-emerald-500 flex items-center justify-center rounded-lg">
                                    <IconComponent size={22} className="text-white" />
                                </div>

                                {/* Details */}
                                <div className="flex-1">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h4 className={`text-base font-semibold ${habit.isCompleted ? 'text-emerald-400' : 'text-white'}`}>
                                            {habit.name}
                                        </h4>
                                        {habit.isCompleted && <CheckCircle2 size={16} className="text-emerald-400" />}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span>{habit.streak} day streak</span>
                                        <span>• {habit.frequency}</span>
                                    </div>
                                </div>

                                {/* Status */}
                                <div className={`px-3 py-1.5 text-sm font-medium rounded ${
                                    habit.isCompleted
                                        ? 'bg-emerald-500/20 text-emerald-400'
                                        : 'bg-slate-800 text-slate-400'
                                }`}>
                                    {habit.isCompleted ? 'Done' : 'Pending'}
                                </div>
                            </div>
                        )
                    })
                )}
            </div>
        </div>
    )
}