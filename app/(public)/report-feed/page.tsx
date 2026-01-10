'use client'

import Link from 'next/link'
import { HazardFeed } from '@/components/feed/HazardFeed'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'

export default function ReportFeedPage() {
  const { isLoggedIn } = useAuth()

  return (
    <div className="max-w-3xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <h1 className="heading-l">Community Hazard Intelligence</h1>
          {isLoggedIn && (
            <Link href="/report">
              <Button size="sm">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Report Hazard
              </Button>
            </Link>
          )}
        </div>
        <p className="text-[var(--text-secondary)]">
          Real-time hazard reports from your community. Validate reports to help others stay safe.
        </p>
      </div>

      {/* Info Banner */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-[#2563EB] mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-[#2563EB] mb-1">How Community Validation Works</h4>
            <p className="text-sm text-gray-700">
              Upvote reports you can confirm. Downvote suspicious or inaccurate information. 
              Your validation helps prioritize urgent hazards and filter misinformation.
            </p>
          </div>
        </div>
      </div>

      {/* Hazard Feed */}
      <HazardFeed />

      {/* Footer Notice */}
      <div className="mt-8 p-4 bg-gray-50 rounded-lg border border-[var(--border-soft)]">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-gray-500 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <p className="text-sm text-gray-600">
              This feed contains citizen-submitted reports. For official emergency information, 
              contact local disaster management authorities or call emergency services.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
