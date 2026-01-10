'use client'

import { Card } from '@/components/ui/Card'

interface Insight {
  id: string
  type: 'warning' | 'info' | 'success'
  icon: string
  title: string
  description: string
  time: string
}

const insights: Insight[] = [
  {
    id: '1',
    type: 'warning',
    icon: '🌊',
    title: 'High Tide Alert',
    description: 'Peak tide expected at 2:30 PM. Water levels may rise 1.5m above normal.',
    time: '30 min',
  },
  {
    id: '2',
    type: 'info',
    icon: '📊',
    title: 'Trending: Rip Currents',
    description: 'Rip current reports increased 40% in South Beach area today.',
    time: '1 hr',
  },
  {
    id: '3',
    type: 'success',
    icon: '✅',
    title: 'All Clear: East Shore',
    description: 'Previous erosion warning lifted. Area now safe for activities.',
    time: '2 hr',
  },
]

const typeStyles = {
  warning: {
    bg: 'bg-amber-50',
    border: 'border-l-amber-500',
    iconBg: 'bg-amber-100',
  },
  info: {
    bg: 'bg-blue-50',
    border: 'border-l-blue-500',
    iconBg: 'bg-blue-100',
  },
  success: {
    bg: 'bg-emerald-50',
    border: 'border-l-emerald-500',
    iconBg: 'bg-emerald-100',
  },
}

export function QuickInsights() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-[var(--border-soft)]">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            Quick Insights
          </h3>
          <span className="text-xs text-[var(--text-secondary)]">Auto-updated</span>
        </div>
      </div>

      <div className="divide-y divide-[var(--border-soft)]">
        {insights.map((insight) => {
          const styles = typeStyles[insight.type]
          return (
            <div
              key={insight.id}
              className={`${styles.bg} ${styles.border} border-l-4 p-4 hover:brightness-95 transition-all cursor-pointer`}
            >
              <div className="flex gap-3">
                <div className={`${styles.iconBg} w-10 h-10 rounded-lg flex items-center justify-center text-lg shrink-0`}>
                  {insight.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <h4 className="font-medium text-sm text-[var(--text-primary)]">
                      {insight.title}
                    </h4>
                    <span className="text-xs text-[var(--text-secondary)] whitespace-nowrap">
                      {insight.time} ago
                    </span>
                  </div>
                  <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
                    {insight.description}
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="p-3 bg-[var(--bg-muted)] text-center">
        <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Insights →
        </button>
      </div>
    </Card>
  )
}
