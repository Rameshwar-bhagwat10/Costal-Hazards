'use client'

import { memo } from 'react'
import Link from 'next/link'
import { ReportCard } from './ReportCard'
import { SkeletonReportCard } from '@/components/ui/Skeleton'
import { NoReportsFound } from '@/components/ui/EmptyState'
import type { DummyReport } from '@/data/dummyReports'

interface ReportFeedProps {
  reports: DummyReport[]
  isLoading?: boolean
  minConfidence?: number
  onClearFilters?: () => void
  maxItems?: number
}

function ReportFeedComponent({
  reports,
  isLoading = false,
  minConfidence = 75,
  onClearFilters,
  maxItems = 5,
}: ReportFeedProps) {
  const filteredReports = reports
    .filter((r) => r.confidence >= minConfidence)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, maxItems)

  const totalCount = reports.filter((r) => r.confidence >= minConfidence).length

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="heading-m flex items-center gap-2">
            <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verified Reports
          </h2>
        </div>
        <div className="space-y-3 stagger-children">
          {[1, 2, 3].map((i) => (
            <SkeletonReportCard key={i} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="heading-m flex items-center gap-2">
          <svg className="w-5 h-5 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Verified Reports
        </h2>
        <div className="flex items-center gap-3">
          <span className="text-sm text-[var(--text-secondary)]">
            {totalCount} report{totalCount !== 1 ? 's' : ''}
          </span>
          {totalCount > maxItems && (
            <Link 
              href="/report-feed" 
              className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center gap-1"
            >
              View All
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          )}
        </div>
      </div>

      {filteredReports.length === 0 ? (
        <NoReportsFound onClearFilters={onClearFilters} />
      ) : (
        <div className="space-y-3">
          {filteredReports.map((report, index) => (
            <div
              key={report.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <ReportCard report={report} />
            </div>
          ))}
        </div>
      )}

      {/* View more prompt */}
      {totalCount > maxItems && (
        <Link 
          href="/report-feed"
          className="block text-center py-3 bg-[var(--bg-muted)] rounded-lg text-sm text-[var(--text-secondary)] hover:bg-blue-50 hover:text-blue-600 transition-colors"
        >
          +{totalCount - maxItems} more reports in your area
        </Link>
      )}
    </div>
  )
}

export const ReportFeed = memo(ReportFeedComponent)
