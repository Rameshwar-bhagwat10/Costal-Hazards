'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

const TIPS = [
  {
    id: 'spread',
    title: 'How Misinformation Spreads',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    content: 'During emergencies, false information spreads 6x faster than verified news. Emotional content gets shared without verification, creating panic and confusion. Always pause before sharing alarming posts.',
  },
  {
    id: 'matters',
    title: 'Why Verification Matters',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    content: 'False hazard reports can cause unnecessary evacuations, divert emergency resources, and put lives at risk. Verified information helps communities respond appropriately and stay safe.',
  },
  {
    id: 'help',
    title: 'How You Can Help',
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
      </svg>
    ),
    content: 'Before sharing: Check official sources, look for multiple confirmations, and use this verification tool. Report suspicious posts to help protect your community from misinformation.',
  },
]

export function TrustTips() {
  const [expandedTip, setExpandedTip] = useState<string | null>(null)

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--info-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Understanding Misinformation
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {TIPS.map((tip) => (
            <div
              key={tip.id}
              className="border border-[var(--border-soft)] rounded-lg overflow-hidden"
            >
              <button
                type="button"
                onClick={() => setExpandedTip(expandedTip === tip.id ? null : tip.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-muted)] transition-colors"
              >
                <div className="text-[var(--info-blue)]">{tip.icon}</div>
                <span className="flex-1 text-sm font-medium text-[var(--text-primary)]">
                  {tip.title}
                </span>
                <svg
                  className={`w-5 h-5 text-[var(--text-secondary)] transition-transform ${
                    expandedTip === tip.id ? 'rotate-180' : ''
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {expandedTip === tip.id && (
                <div className="px-3 pb-3 pt-0">
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed pl-8">
                    {tip.content}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Quick Stats */}
        <div className="mt-4 p-3 bg-[var(--bg-muted)] rounded-lg">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-lg font-bold text-[var(--info-blue)]">6x</p>
              <p className="text-xs text-[var(--text-secondary)]">Faster spread</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--warning-orange)]">70%</p>
              <p className="text-xs text-[var(--text-secondary)]">Share without reading</p>
            </div>
            <div>
              <p className="text-lg font-bold text-[var(--safe-green)]">89%</p>
              <p className="text-xs text-[var(--text-secondary)]">Accuracy with verification</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
