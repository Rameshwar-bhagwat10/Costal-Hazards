'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { TimeFilter } from '@/components/analytics/TimeFilter'
import { SummaryCards } from '@/components/analytics/SummaryCards'
import { InsightCards } from '@/components/analytics/InsightCards'
import { HazardTrendChart } from '@/components/charts/HazardTrendChart'
import { RegionDistributionChart } from '@/components/charts/RegionDistributionChart'
import { RiskTimelineChart } from '@/components/charts/RiskTimelineChart'
import {
  type TimeRange,
  hazardTrendData,
  regionData,
  riskTimelineData,
  summaryMetrics,
  insights,
} from '@/data/dummyAnalytics'

export default function AnalyticsPage() {
  const [timeRange, setTimeRange] = useState<TimeRange>('7d')

  const currentMetrics = summaryMetrics[timeRange]
  const currentHazardData = hazardTrendData[timeRange]
  const currentRegionData = regionData[timeRange]
  const currentRiskData = riskTimelineData[timeRange]
  const currentInsights = insights[timeRange]

  const timeRangeLabels: Record<TimeRange, string> = {
    '24h': 'Last 24 Hours',
    '7d': 'Last 7 Days',
    '30d': 'Last 30 Days',
  }

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-3 mb-1">
            <h1 className="heading-l">Analytics Dashboard</h1>
            <Badge variant="info">Live</Badge>
          </div>
          <p className="text-sm text-[var(--text-secondary)]">
            Hazard trends and regional statistics for {timeRangeLabels[timeRange].toLowerCase()}
          </p>
        </div>
        <TimeFilter value={timeRange} onChange={setTimeRange} />
      </div>

      {/* Summary Cards */}
      <SummaryCards metrics={currentMetrics} />

      {/* Main Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <HazardTrendChart 
          data={currentHazardData} 
          title={`Hazard Trends (${timeRangeLabels[timeRange]})`} 
        />
        <RegionDistributionChart 
          data={currentRegionData} 
          title="Top Affected Regions" 
        />
      </div>

      {/* Secondary Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <RiskTimelineChart 
          data={currentRiskData} 
          title={`Risk Level Distribution (${timeRangeLabels[timeRange]})`} 
        />
        <InsightCards insights={currentInsights} />
      </div>

      {/* Quick Actions */}
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/report">
          <Button>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            New Report
          </Button>
        </Link>
        <Link href="/social-verify">
          <Button variant="secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
            Verify Post
          </Button>
        </Link>
        <Link href="/map">
          <Button variant="secondary">
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
            View Map
          </Button>
        </Link>
      </div>

      {/* Data Disclaimer */}
      <div className="p-4 bg-[var(--bg-muted)] rounded-lg border border-[var(--border-soft)]">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[var(--text-secondary)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <p className="text-sm text-[var(--text-primary)] font-medium">Data Notice</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              Analytics are based on citizen-submitted reports and may not represent official government data. 
              For emergency situations, always refer to official disaster management authorities.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
