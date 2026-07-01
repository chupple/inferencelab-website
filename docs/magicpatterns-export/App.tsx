import React from 'react'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { HowItWorks } from './components/HowItWorks'
import { Features } from './components/Features'
import { Setup } from './components/Setup'
import { Pricing } from './components/Pricing'
import { Footer } from './components/Footer'
import { useScreenInit } from './useScreenInit'
export function App() {
  useScreenInit()
  return (
    <div className="min-h-screen bg-background text-white selection:bg-primary/30">
      <Navbar />
      <main>
        <Hero />
        <HowItWorks />
        <Features />
        <Setup />
        <Pricing />
      </main>
      <Footer />
    </div>
  )
}
