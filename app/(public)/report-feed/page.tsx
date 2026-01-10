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
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-3">
          <div>
            <h1 className="heading-l flex items-center gap-2">
              Community Hazard Intelligence
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500" />
              </span>
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">
              Real-time hazard reports validated by your community
            </p>
          </div>
          {isLoggedIn ? (
            <Link href="/report">
              <Button>
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Report Hazard
              </Button>
            </Link>
          ) : (
            <Link href="/login?redirect=/report">
              <Button variant="secondary">
                <svg className="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                </svg>
                Login to Report
              </Button>
            </Link>
          )}
        </div>
      </div>

      {/* Quick Info Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
        <div className="bg-white rounded-lg border border-[var(--border-soft)] p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Upvote</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Confirm reports</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--border-soft)] p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Downvote</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Flag inaccurate</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg border border-[var(--border-soft)] p-3">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
            </div>
            <div>
              <p className="text-xs text-[var(--text-secondary)]">Near Me</p>
              <p className="text-sm font-semibold text-[var(--text-primary)]">Filter by location</p>
            </div>
          </div>
        </div>
      </div>

      {/* Hazard Feed */}
      <HazardFeed />

      {/* Footer Notice */}
      <div className="mt-8 p-4 bg-amber-50 rounded-lg border border-amber-200">
        <div className="flex items-start gap-3">
          <svg className="w-5 h-5 text-amber-600 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
          <div>
            <h4 className="text-sm font-semibold text-amber-800 mb-1">Important Notice</h4>
            <p className="text-sm text-amber-700">
              This feed contains citizen-submitted reports and may not reflect official information. 
              For emergencies, contact local disaster management authorities or call emergency services immediately.
            </p>
          </div>
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-4 p-4 bg-white rounded-lg border border-[var(--border-soft)]">
        <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-2">How Community Validation Works</h4>
        <ul className="text-sm text-[var(--text-secondary)] space-y-1">
          <li className="flex items-start gap-2">
            <span className="text-green-500 mt-0.5">•</span>
            <span>Reports with more upvotes appear higher in the feed</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-red-500 mt-0.5">•</span>
            <span>Downvoted reports are flagged for review and may be hidden</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-blue-500 mt-0.5">•</span>
            <span>Trust badges indicate the reporter&apos;s validation history</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-purple-500 mt-0.5">•</span>
            <span>Urgent hazards are highlighted with red borders</span>
          </li>
        </ul>
      </div>
    </div>
  )
}
