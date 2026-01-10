'use client'

import { usePWA } from '@/hooks/usePWA'
import { Button } from '@/components/ui/Button'

export function UpdatePrompt() {
  const { isUpdateAvailable, updateApp } = usePWA()

  if (!isUpdateAvailable) {
    return null
  }

  return (
    <div className="fixed top-16 left-4 right-4 md:left-auto md:right-4 md:w-80 z-50 animate-slide-down">
      <div className="bg-blue-600 text-white rounded-lg shadow-lg p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center shrink-0">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </div>

          <div className="flex-1">
            <h3 className="text-sm font-semibold mb-1">Update Available</h3>
            <p className="text-xs text-blue-100 mb-3">
              A new version is ready. Refresh to get the latest features.
            </p>

            <div className="flex items-center gap-2">
              <Button
                size="sm"
                onClick={updateApp}
                className="bg-white text-blue-600 hover:bg-blue-50"
              >
                Update Now
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
