'use client'

import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Coffee, ShoppingBag, Droplet, Car, Home, AlertCircle } from 'lucide-react'
import { useExpensesStore } from '../stores/expensesStore'

export function RecentExpenses() {
    const { expenses, isLoading, error, fetchExpenses, clearError } = useExpensesStore()

    useEffect(() => {
        fetchExpenses()
    }, [fetchExpenses])

    const getIcon = (category: string) => {
        switch (category.toLowerCase()) {
            case 'food': return Coffee
            case 'transport': return Car
            case 'health': return Droplet
            case 'home': return Home
            default: return ShoppingBag
        }
    }

    const totalAmount = expenses.reduce((sum, expense) => sum + expense.amount, 0)

    if (isLoading) {
        return <div className="text-slate-400">Loading expenses...</div>
    }

    if (error) {
        return (
            <div className="text-red-400 p-4 border border-red-500/30 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                    <AlertCircle size={16} />
                    <span>Failed to load expenses</span>
                </div>
                <p className="text-sm text-red-300">{error}</p>
                <button 
                    onClick={() => { clearError(); fetchExpenses(); }}
                    className="mt-2 text-sm text-red-400 hover:text-red-300 underline"
                >
                    Try again
                </button>
            </div>
        )
    }

    return (
        <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-light text-slate-200">Recent Expenses</h3>
                <span className="text-2xl font-medium text-slate-400">₹{totalAmount.toFixed(2)}</span>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
                {expenses.length === 0 ? (
                    <div className="text-slate-500 text-center py-8 flex-1">
                        No expenses recorded yet.
                    </div>
                ) : (
                    expenses.slice(0, 2).map((expense, index) => {
                        const IconComponent = getIcon(expense.category)
                        return (
                            <motion.div
                                key={expense.id}
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="flex-1 bg-slate-800/60 backdrop-blur-md border border-slate-700/50 rounded-2xl p-4 flex items-center gap-4 hover:bg-slate-800/80 transition-colors"
                            >
                                <div className="w-10 h-10 rounded-full bg-amber-500/20 text-amber-500 flex items-center justify-center">
                                    <IconComponent size={20} />
                                </div>
                                <div className="flex-1">
                                    <h4 className="text-sm font-medium text-slate-200">{expense.description}</h4>
                                    <p className="text-xs text-slate-500">{expense.category}</p>
                                </div>
                                <div className="text-right">
                                    <span className="block font-medium text-slate-200">₹{expense.amount}</span>
                                    <span className="text-xs text-slate-500">{new Date(expense.date).toLocaleDateString()}</span>
                                </div>
                            </motion.div>
                        )
                    })
                )}

                {/* Add Button Placeholder */}
                <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-12 flex items-center justify-center rounded-2xl bg-slate-800/40 border border-slate-700/50 hover:bg-slate-700/50 transition-colors"
                >
                    <span className="text-2xl text-slate-400">+</span>
                </motion.button>
            </div>
        </div>
    )
}