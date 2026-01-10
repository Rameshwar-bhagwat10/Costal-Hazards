'use client'

import { Card } from '@/components/ui/Card'

interface StatItem {
  label: string
  value: number | string
  icon: React.ReactNode
  color: string
  bgColor: string
  trend?: {
    value: number
    isPositive: boolean
  }
  sparkline?: number[]
}

interface StatsCardsProps {
  stats?: StatItem[]
  extraReports?: number
}

function MiniSparkline({ data, color }: { data: number[]; color: string }) {
  const max = Math.max(...data)
  const min = Math.min(...data)
  const range = max - min || 1
  const width = 60
  const height = 24
  const points = data.map((val, i) => {
    const x = (i / (data.length - 1)) * width
    const y = height - ((val - min) / range) * height
    return `${x},${y}`
  }).join(' ')

  return (
    <svg width={width} height={height} className="opacity-60">
      <polyline
        points={points}
        fill="none"
        stroke={color}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export function StatsCards({ stats, extraReports = 0 }: StatsCardsProps) {
  const defaultStats: StatItem[] = [
    {
      label: 'Active Alerts',
      value: 12 + extraReports,
      color: '#EF4444',
      bgColor: 'bg-red-50',
      trend: { value: 8, isPositive: false },
      sparkline: [5, 8, 6, 9, 12, 10, 12 + extraReports],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
        </svg>
      ),
    },
    {
      label: 'High Risk Zones',
      value: 3,
      color: '#F59E0B',
      bgColor: 'bg-amber-50',
      trend: { value: 0, isPositive: true },
      sparkline: [2, 3, 2, 4, 3, 3, 3],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
    },
    {
      label: 'Verified Reports',
      value: 48 + extraReports,
      color: '#10B981',
      bgColor: 'bg-emerald-50',
      trend: { value: 12, isPositive: true },
      sparkline: [32, 38, 42, 40, 45, 44, 48 + extraReports],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      label: 'Active Regions',
      value: 5,
      color: '#3B82F6',
      bgColor: 'bg-blue-50',
      trend: { value: 2, isPositive: true },
      sparkline: [3, 4, 4, 5, 4, 5, 5],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
        </svg>
      ),
    },
  ]

  const displayStats = stats || defaultStats

  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
      {displayStats.map((stat) => (
        <Card 
          key={stat.label} 
          padding="md" 
          className="relative overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 group"
        >
          {/* Background gradient accent */}
          <div 
            className={`absolute top-0 right-0 w-24 h-24 rounded-full blur-2xl opacity-20 -mr-8 -mt-8 transition-opacity group-hover:opacity-30`}
            style={{ backgroundColor: stat.color }}
          />
          
          <div className="relative">
            {/* Header with icon */}
            <div className="flex items-start justify-between mb-3">
              <div 
                className={`${stat.bgColor} p-2.5 rounded-xl`}
                style={{ color: stat.color }}
              >
                {stat.icon}
              </div>
              {stat.sparkline && (
                <MiniSparkline data={stat.sparkline} color={stat.color} />
              )}
            </div>

            {/* Value */}
            <p 
              className="text-3xl font-bold mb-1"
              style={{ color: 'var(--text-primary)' }}
            >
              {stat.value}
            </p>

            {/* Label and trend */}
            <div className="flex items-center justify-between">
              <p className="text-sm text-[var(--text-secondary)]">{stat.label}</p>
              {stat.trend && stat.trend.value !== 0 && (
                <span 
                  className={`text-xs font-medium flex items-center gap-0.5 ${
                    stat.trend.isPositive ? 'text-emerald-600' : 'text-red-500'
                  }`}
                >
                  {stat.trend.isPositive ? '↑' : '↓'}
                  {stat.trend.value}%
                </span>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  )
}
