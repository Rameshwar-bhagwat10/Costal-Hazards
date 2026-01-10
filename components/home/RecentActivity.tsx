'use client'

import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'

interface Activity {
  id: string
  type: 'report' | 'verification' | 'alert' | 'resolved'
  message: string
  location: string
  time: string
  isNew?: boolean
}

const initialActivities: Activity[] = [
  {
    id: '1',
    type: 'report',
    message: 'New flood report submitted',
    location: 'Marina Bay',
    time: '2 min ago',
    isNew: true,
  },
  {
    id: '2',
    type: 'verification',
    message: 'Rip current report verified',
    location: 'Sunset Beach',
    time: '5 min ago',
  },
  {
    id: '3',
    type: 'alert',
    message: 'High tide warning issued',
    location: 'North Coast',
    time: '12 min ago',
  },
  {
    id: '4',
    type: 'resolved',
    message: 'Erosion hazard cleared',
    location: 'East Shore',
    time: '25 min ago',
  },
  {
    id: '5',
    type: 'report',
    message: 'Storm surge observation',
    location: 'West Harbor',
    time: '32 min ago',
  },
]

const typeConfig = {
  report: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-blue-500',
    bg: 'bg-blue-100',
  },
  verification: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    color: 'text-emerald-500',
    bg: 'bg-emerald-100',
  },
  alert: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
    ),
    color: 'text-amber-500',
    bg: 'bg-amber-100',
  },
  resolved: {
    icon: (
      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
      </svg>
    ),
    color: 'text-slate-500',
    bg: 'bg-slate-100',
  },
}

export function RecentActivity() {
  const [activities, setActivities] = useState(initialActivities)
  const [isLive, setIsLive] = useState(true)

  // Simulate live updates
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const newActivity: Activity = {
        id: Date.now().toString(),
        type: ['report', 'verification', 'alert'][Math.floor(Math.random() * 3)] as Activity['type'],
        message: [
          'New hazard report submitted',
          'Community verification complete',
          'Weather advisory updated',
        ][Math.floor(Math.random() * 3)],
        location: ['Marina Bay', 'South Beach', 'Harbor District'][Math.floor(Math.random() * 3)],
        time: 'Just now',
        isNew: true,
      }

      setActivities((prev) => {
        const updated = prev.map((a) => ({ ...a, isNew: false }))
        return [newActivity, ...updated.slice(0, 4)]
      })
    }, 15000)

    return () => clearInterval(interval)
  }, [isLive])

  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-[var(--border-soft)] flex items-center justify-between">
        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            {isLive && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            )}
            <span className={`relative inline-flex rounded-full h-2 w-2 ${isLive ? 'bg-emerald-500' : 'bg-slate-400'}`} />
          </span>
          Recent Activity
        </h3>
        <button
          onClick={() => setIsLive(!isLive)}
          className="text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          {isLive ? 'Pause' : 'Resume'}
        </button>
      </div>

      <div className="divide-y divide-[var(--border-soft)]">
        {activities.map((activity) => {
          const config = typeConfig[activity.type]
          return (
            <div
              key={activity.id}
              className={`p-3 flex items-start gap-3 transition-colors ${
                activity.isNew ? 'bg-blue-50/50' : ''
              }`}
            >
              <div className={`${config.bg} ${config.color} p-1.5 rounded-lg shrink-0`}>
                {config.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm text-[var(--text-primary)] truncate">
                    {activity.message}
                  </p>
                  {activity.isNew && (
                    <Badge variant="info" size="sm">New</Badge>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="text-xs text-[var(--text-secondary)]">
                    📍 {activity.location}
                  </span>
                  <span className="text-xs text-[var(--text-secondary)]">•</span>
                  <span className="text-xs text-[var(--text-secondary)]">
                    {activity.time}
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
