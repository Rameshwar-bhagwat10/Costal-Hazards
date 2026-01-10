'use client'

import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'

interface InsightCardsProps {
  insights: string[]
}

export function InsightCards({ insights }: InsightCardsProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5 text-[var(--info-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
          AI Insights
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {insights.map((insight, index) => (
            <div
              key={index}
              className="flex gap-3 p-3 bg-[var(--bg-muted)] rounded-lg border-l-4 border-[var(--info-blue)]"
            >
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[var(--info-blue)] text-white flex items-center justify-center text-xs font-bold">
                {index + 1}
              </div>
              <p className="text-sm text-[var(--text-primary)] leading-relaxed">
                {insight}
              </p>
            </div>
          ))}
        </div>
        
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-100">
          <div className="flex items-start gap-2">
            <svg className="w-4 h-4 text-[var(--info-blue)] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-xs text-[var(--text-secondary)]">
              These insights are generated based on pattern analysis of reported hazards and may not reflect real-time conditions.
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
