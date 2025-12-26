'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { App } from '@/components/App'

export default function DashboardPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = localStorage.getItem('isAuthenticated')
      if (authStatus === 'true') {
        setIsAuthenticated(true)
      } else {
        router.push('/login')
      }
      setLoading(false)
    }

    checkAuth()
  }, [router])

  if (loading) {
    return (
      <div className="min-h-screen bg-[#050505] flex items-center justify-center">
        <div className="text-cyan-400 text-lg">Loading...</div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null
  }

  return <App />
}