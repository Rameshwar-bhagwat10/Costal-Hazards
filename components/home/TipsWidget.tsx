'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'

const safetyTips = [
  {
    icon: '🌊',
    title: 'Rip Current Safety',
    tip: 'If caught in a rip current, swim parallel to shore until free, then swim back at an angle.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: '🚗',
    title: 'Flood Awareness',
    tip: 'Never drive through flooded roads. Turn around, don\'t drown. Just 6 inches of water can knock you down.',
    color: 'from-amber-500 to-orange-500',
  },
  {
    icon: '📱',
    title: 'Stay Connected',
    tip: 'Keep emergency contacts saved and enable location services for faster emergency response.',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    icon: '🎒',
    title: 'Emergency Kit',
    tip: 'Prepare an emergency kit with water, flashlight, first aid supplies, and important documents.',
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: '🗺️',
    title: 'Know Your Routes',
    tip: 'Familiarize yourself with evacuation routes and meeting points before an emergency occurs.',
    color: 'from-rose-500 to-pink-500',
  },
  {
    icon: '⚠️',
    title: 'Heed Warnings',
    tip: 'Always follow official warnings and evacuation orders. Your safety is the top priority.',
    color: 'from-red-500 to-rose-500',
  },
]

export function TipsWidget() {
  const [currentTip, setCurrentTip] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAnimating(true)
      setTimeout(() => {
        setCurrentTip((prev) => (prev + 1) % safetyTips.length)
        setIsAnimating(false)
      }, 300)
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  const tip = safetyTips[currentTip]

  const goToTip = (index: number) => {
    if (index === currentTip) return
    setIsAnimating(true)
    setTimeout(() => {
      setCurrentTip(index)
      setIsAnimating(false)
    }, 300)
  }

  return (
    <Card className="p-0 overflow-hidden">
      <div className={`bg-gradient-to-r ${tip.color} p-4 transition-all duration-300`}>
        <div className="flex items-center gap-2 text-white/80 text-xs font-medium mb-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          Safety Tip
        </div>
        <div className={`transition-all duration-300 ${isAnimating ? 'opacity-0 translate-y-2' : 'opacity-100 translate-y-0'}`}>
          <div className="flex items-start gap-3">
            <span className="text-3xl" role="img" aria-hidden="true">
              {tip.icon}
            </span>
            <div>
              <h3 className="font-bold text-white text-lg mb-1">
                {tip.title}
              </h3>
              <p className="text-white/90 text-sm leading-relaxed">
                {tip.tip}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation dots */}
      <div className="flex justify-center gap-1.5 p-3 bg-[var(--bg-card)]">
        {safetyTips.map((_, index) => (
          <button
            key={index}
            onClick={() => goToTip(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentTip
                ? 'bg-blue-500 w-4'
                : 'bg-[var(--border-soft)] hover:bg-[var(--text-secondary)]'
            }`}
            aria-label={`Go to tip ${index + 1}`}
          />
        ))}
      </div>
    </Card>
  )
}
