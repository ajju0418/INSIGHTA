'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HUDCard } from '@/components/HUDCard'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { Eye, EyeOff, Lock, Mail, ArrowRight, Terminal, Shield } from 'lucide-react'

const VALID_CREDENTIALS = {
  email: 'admin@nexura.com',
  password: 'nexura123'
}

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [showIntro, setShowIntro] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => setShowIntro(false), 2000)
    return () => clearTimeout(timer)
  }, [])

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    setTimeout(() => {
      if (email === VALID_CREDENTIALS.email && password === VALID_CREDENTIALS.password) {
        localStorage.setItem('isAuthenticated', 'true')
        localStorage.setItem('user', JSON.stringify({ email, name: 'Alex Chen' }))
        router.push('/dashboard')
      } else {
        setError('ACCESS DENIED - INVALID CREDENTIALS')
      }
      setLoading(false)
    }, 1500)
  }

  const isFormValid = email.length > 0 && password.length > 0

  // Simple Intro Screen
  if (showIntro) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 to-black text-cyan-400 font-mono flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <motion.div
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex justify-center mb-4"
          >
            <Image 
              src="/NEXURA_LOGO-Photoroom.png" 
              alt="NEXURA" 
              width={400} 
              height={160} 
              className="object-contain"
            />
          </motion.div>
          <div className="text-lg tracking-widest">INITIALIZING...</div>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-black text-slate-200 font-sans relative">
      {/* Simple Grid Background */}
      <div className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: 'linear-gradient(rgba(34, 211, 238, 0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 211, 238, 0.3) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }}
      />

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <div className="inline-flex items-center gap-3 mb-4">
              <Image 
                src="/NEXURA_LOGO-Photoroom.png" 
                alt="NEXURA" 
                width={220} 
                height={75} 
                className="object-contain"
              />
            </div>
            <p className="text-slate-400">Behavioral Intelligence System</p>
          </motion.div>

          {/* Login Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <HUDCard className="p-6 md:p-8">
              {/* Status */}
              <div className="flex items-center gap-2 mb-6">
                <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
                <span className="text-xs font-mono tracking-wider text-emerald-400 uppercase">
                  System Online
                </span>
              </div>
              
              <AnimatePresence>
                {error && (
                  <motion.div 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="mb-6 p-4 bg-red-950/50 border border-red-500/30 rounded-xl text-red-400 text-sm font-mono"
                  >
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                      {error}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              
              <form onSubmit={handleLogin} className="space-y-6">
                {/* Email Field */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400 flex items-center gap-2">
                    <Mail size={12} />
                    Access ID
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField('email')}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full rounded-xl bg-slate-950/60 border px-4 py-4 text-slate-100 outline-none transition-all duration-300 font-mono ${
                      focusedField === 'email' 
                        ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' 
                        : 'border-slate-700 hover:border-slate-600'
                    }`}
                    placeholder="admin@nexura.com"
                    required
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-wide text-slate-400 flex items-center gap-2">
                    <Lock size={12} />
                    Security Key
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onFocus={() => setFocusedField('password')}
                      onBlur={() => setFocusedField(null)}
                      className={`w-full rounded-xl bg-slate-950/60 border px-4 py-4 pr-12 text-slate-100 outline-none transition-all duration-300 font-mono ${
                        focusedField === 'password' 
                          ? 'border-cyan-400 shadow-lg shadow-cyan-400/20' 
                          : 'border-slate-700 hover:border-slate-600'
                      }`}
                      placeholder="nexura123"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-cyan-400 transition-colors"
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Login Button */}
                <motion.button
                  type="submit"
                  disabled={!isFormValid || loading}
                  whileHover={{ scale: isFormValid ? 1.02 : 1 }}
                  whileTap={{ scale: isFormValid ? 0.98 : 1 }}
                  className={`w-full mt-8 rounded-xl font-bold py-4 px-6 transition-all duration-300 flex items-center justify-center gap-3 text-lg ${
                    isFormValid && !loading
                      ? 'bg-gradient-to-r from-cyan-600 to-cyan-500 hover:from-cyan-500 hover:to-cyan-400 text-white shadow-lg shadow-cyan-500/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      ACCESSING...
                    </>
                  ) : (
                    <>
                      <Shield size={18} />
                      INITIALIZE ACCESS
                      <ArrowRight size={18} />
                    </>
                  )}
                </motion.button>
              </form>
              
              {/* Demo Credentials */}
              <div className="mt-6 p-4 bg-gradient-to-r from-amber-950/30 to-orange-950/30 border border-amber-500/20 rounded-xl">
                <div className="text-xs font-mono text-amber-400 space-y-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Terminal size={12} />
                    <span className="font-bold">DEMO ACCESS</span>
                  </div>
                  <div>ID: admin@nexura.com</div>
                  <div>KEY: nexura123</div>
                </div>
              </div>
              
              {/* Footer */}
              <div className="mt-8 flex items-center justify-between text-sm">
                <span className="text-slate-500">New User?</span>
                <Link 
                  href="/signup" 
                  className="text-cyan-400 hover:text-cyan-300 font-medium transition-colors flex items-center gap-1 group"
                >
                  Initialize Profile
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </HUDCard>
          </motion.div>
        </div>
      </div>
    </div>
  )
}