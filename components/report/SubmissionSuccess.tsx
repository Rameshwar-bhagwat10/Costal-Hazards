'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'
import { Badge } from '@/components/ui/Badge'
import { hazardTypes } from '@/data/hazardTypes'
import { useReportStore } from '@/store/useReportStore'
import type { AIVerificationResult, ReportFormData } from '@/lib/reportValidation'

interface SubmissionSuccessProps {
  data: ReportFormData
  result: AIVerificationResult
  onSubmitAnother: () => void
}

export function SubmissionSuccess({ data, result, onSubmitAnother }: SubmissionSuccessProps) {
  const addReport = useReportStore((state) => state.addReport)
  const hasAddedReport = useRef(false)

  // Add report to store on mount (only once)
  useEffect(() => {
    if (hasAddedReport.current) return
    hasAddedReport.current = true

    if (data.location) {
      addReport({
        hazardType: data.hazardType,
        description: data.description,
        location: {
          lat: data.location.lat,
          lng: data.location.lng,
          address: data.location.address,
        },
        media: data.media,
        confidence: result.confidence,
        status: result.status === 'verified' ? 'verified' : result.status === 'low-trust' ? 'rejected' : 'pending',
        severity: result.urgency,
        aiSummary: result.summary,
      })
    }
  }, [data, result, addReport])

  const hazard = hazardTypes.find((h) => h.id === data.hazardType)

  const statusConfig = {
    verified: { variant: 'safe' as const, label: 'Verified', bg: 'bg-green-50' },
    'needs-review': { variant: 'warning' as const, label: 'Under Review', bg: 'bg-amber-50' },
    'low-trust': { variant: 'alert' as const, label: 'Pending Verification', bg: 'bg-red-50' },
  }

  const config = statusConfig[result.status]

  return (
    <Card>
      <CardContent className="pt-6 text-center">
        {/* Success Animation */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-green-100 rounded-full flex items-center justify-center animate-bounce">
            <svg className="w-10 h-10 text-[var(--safe-green)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>

        <h2 className="heading-l mb-2">Report Submitted!</h2>
        <p className="text-[var(--text-secondary)] mb-6">
          Your hazard report has been sent for public awareness.
        </p>

        {/* Report Summary Card */}
        <div className={`${config.bg} rounded-lg p-4 mb-6 text-left`}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: hazard?.color }}
              />
              <span className="font-semibold">{hazard?.name}</span>
            </div>
            <Badge variant={config.variant}>{config.label}</Badge>
          </div>

          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Location:</span>
              <span>{data.location?.address}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Confidence:</span>
              <span className="font-medium">{result.confidence}%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-secondary)]">Media:</span>
              <span>{data.media.length} file(s)</span>
            </div>
          </div>
        </div>

        {/* What Happens Next */}
        <div className="bg-[var(--bg-muted)] rounded-lg p-4 mb-6 text-left">
          <h3 className="font-semibold mb-2">What happens next?</h3>
          <ul className="text-sm text-[var(--text-secondary)] space-y-1">
            <li>• Your report will appear on the public safety map</li>
            <li>• Nearby users will receive alerts</li>
            <li>• Authorities may be notified for high-risk hazards</li>
            <li>• You can track your report status in your dashboard</li>
          </ul>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link href="/home" className="flex-1">
            <Button variant="secondary" className="w-full">
              View on Home
            </Button>
          </Link>
          <Link href="/map" className="flex-1">
            <Button variant="secondary" className="w-full">
              View on Map
            </Button>
          </Link>
          <Button className="flex-1" onClick={onSubmitAnother}>
            Submit Another
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
