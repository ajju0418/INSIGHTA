'use client'

import { useState } from 'react'
import { Home } from '@/components/Home'
import { LogInterface } from '@/components/LogInterface'
import { Patterns } from '@/components/Patterns'
import { Review } from '@/components/Review'
import { Navigation } from '@/components/Navigation'

export function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'log' | 'patterns' | 'review'>('home')

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home />
      case 'log':
        return <LogInterface />
      case 'patterns':
        return <Patterns />
      case 'review':
        return <Review />
      default:
        return <Home />
    }
  }

  return (
    <>
      {renderPage()}
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
    </>
  )
}