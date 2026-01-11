'use client'

import { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/Card'

interface Step {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed'
}

interface VerificationProgressProps {
  steps: Step[]
  isActive: boolean
}

export function VerificationProgress({ steps, isActive }: VerificationProgressProps) {
  const [dots, setDots] = useState('')

  useEffect(() => {
    if (!isActive) return
    
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.')
    }, 400)

    return () => clearInterval(interval)
  }, [isActive])

  if (!isActive && steps.every(s => s.status === 'pending')) {
    return null
  }

  return (
    <Card className="overflow-hidden">
      <div className="bg-gradient-to-r from-[var(--info-blue)] to-blue-600 px-4 py-3">
        <h3 className="text-white font-semibold flex items-center gap-2">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Analysis in Progress{isActive ? dots : ''}
        </h3>
      </div>
      <CardContent className="pt-4">
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className={`flex items-center gap-3 transition-all duration-300 ${
                step.status === 'pending' ? 'opacity-40' : 'opacity-100'
              }`}
            >
              {/* Status Icon */}
              <div className="flex-shrink-0">
                {step.status === 'completed' ? (
                  <div className="w-6 h-6 rounded-full bg-[var(--safe-green)] flex items-center justify-center animate-scale-in">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                ) : step.status === 'processing' ? (
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--info-blue)] border-t-transparent animate-spin" />
                ) : (
                  <div className="w-6 h-6 rounded-full border-2 border-[var(--border-soft)] flex items-center justify-center">
                    <span className="text-xs text-[var(--text-secondary)]">{index + 1}</span>
                  </div>
                )}
              </div>

              {/* Label */}
              <span className={`text-sm ${
                step.status === 'processing' 
                  ? 'text-[var(--info-blue)] font-medium' 
                  : step.status === 'completed'
                    ? 'text-[var(--text-primary)]'
                    : 'text-[var(--text-secondary)]'
              }`}>
                {step.label}
                {step.status === 'processing' && (
                  <span className="ml-1 text-[var(--info-blue)]">{dots}</span>
                )}
              </span>
            </div>
          ))}
        </div>

        {/* Progress Bar */}
        <div className="mt-4 h-1.5 bg-[var(--bg-muted)] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[var(--info-blue)] to-[var(--safe-green)] transition-all duration-500 ease-out"
            style={{
              width: `${(steps.filter(s => s.status === 'completed').length / steps.length) * 100}%`
            }}
          />
        </div>
      </CardContent>
    </Card>
  )
}
