'use client'

import { memo } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { ConfidenceBadge, VerifiedBadge, FreshnessIndicator } from '@/components/ui/ConfidenceBadge'
import { hazardTypes } from '@/data/hazardTypes'
import type { DummyReport } from '@/data/dummyReports'

interface ReportCardProps {
  report: DummyReport
}

function ReportCardComponent({ report }: ReportCardProps) {
  const hazard = hazardTypes.find((h) => h.id === report.hazardType)

  const severityVariant = {
    high: 'alert' as const,
    medium: 'warning' as const,
    low: 'info' as const,
  }

  const severityGradient = {
    high: 'from-red-500/10 to-transparent',
    medium: 'from-amber-500/10 to-transparent',
    low: 'from-blue-500/10 to-transparent',
  }

  return (
    <Link href="/report-feed">
      <Card
        padding="none"
        className="overflow-hidden card-interactive group focus-visible:ring-2 focus-visible:ring-blue-500"
        tabIndex={0}
        role="article"
        aria-label={`${hazard?.name} report at ${report.location}`}
      >
        {/* Severity gradient accent */}
        <div className={`absolute inset-0 bg-gradient-to-r ${severityGradient[report.severity]} pointer-events-none`} />
        
        <div className="relative p-4">
          {/* Header with badges */}
          <div className="flex flex-wrap items-center gap-2 mb-3">
            <Badge
              variant={severityVariant[report.severity]}
              size="sm"
              className="font-medium"
              style={{ backgroundColor: hazard?.color + '20', color: hazard?.color }}
            >
              <span 
                className="w-1.5 h-1.5 rounded-full mr-1.5"
                style={{ backgroundColor: hazard?.color }}
              />
              {hazard?.name}
            </Badge>
            
            {/* Trust signals */}
            {report.confidence >= 85 && <VerifiedBadge />}
            <ConfidenceBadge confidence={report.confidence} size="sm" />
            
            {report.hasMedia && (
              <span 
                className="text-[var(--text-secondary)] flex items-center gap-1 text-xs" 
                title="Has media evidence"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Media
              </span>
            )}
          </div>

          {/* Summary */}
          <p className="text-sm text-[var(--text-primary)] mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {report.summary}
          </p>

          {/* Footer with location and freshness */}
          <div className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-[var(--text-secondary)]">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              <span className="truncate max-w-[150px]">{report.location}, {report.region}</span>
            </div>
            <FreshnessIndicator timestamp={report.timestamp} />
          </div>
        </div>

        {/* Hover indicator */}
        <div className="absolute right-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </Card>
    </Link>
  )
}

export const ReportCard = memo(ReportCardComponent)
