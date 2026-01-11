'use client'

import { useState } from 'react'

export function MapLegend() {
  const [isCollapsed, setIsCollapsed] = useState(true)

  // Severity levels - these determine the marker/zone COLOR
  const severityLevels = [
    { level: 'High', color: '#EF4444', description: 'Immediate danger, avoid area' },
    { level: 'Medium', color: '#F59E0B', description: 'Use caution, stay alert' },
    { level: 'Low', color: '#22C55E', description: 'Minor risk, stay aware' },
  ]

  // Marker types explanation
  const markerTypes = [
    { type: 'Solid Circle', description: 'Individual hazard report' },
    { type: 'Shaded Zone', description: 'Risk area (larger = higher impact)' },
  ]

  return (
    <div className="absolute bottom-4 right-4 z-[500]">
      {/* Collapsed state */}
      {isCollapsed ? (
        <button
          onClick={() => setIsCollapsed(false)}
          className="flex items-center gap-2 px-3 py-2 bg-white rounded-lg shadow-lg text-sm font-medium hover:bg-gray-50 transition-colors border border-gray-200"
          aria-expanded={false}
          aria-controls="map-legend"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Legend
        </button>
      ) : (
        /* Expanded legend panel */
        <div
          id="map-legend"
          className="bg-white rounded-lg shadow-lg overflow-hidden w-52 border border-gray-200"
        >
          {/* Header */}
          <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200">
            <h3 className="text-sm font-semibold text-gray-800">Map Legend</h3>
            <button
              onClick={() => setIsCollapsed(true)}
              className="p-1 rounded hover:bg-white transition-colors"
              aria-label="Collapse legend"
            >
              <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="p-3">
            {/* Severity/Risk Levels - PRIMARY */}
            <div className="mb-3">
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Severity Level (by color)
              </p>
              <div className="space-y-2">
                {severityLevels.map((item) => (
                  <div key={item.level} className="flex items-start gap-2">
                    <span
                      className="w-4 h-4 rounded-full shrink-0 mt-0.5 shadow-sm"
                      style={{ backgroundColor: item.color }}
                    />
                    <div className="min-w-0">
                      <span className="text-xs font-medium text-gray-800">{item.level}</span>
                      <p className="text-xs text-gray-500 leading-tight">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-3" />

            {/* Marker Types */}
            <div>
              <p className="text-xs font-semibold text-gray-700 mb-2">
                Marker Types
              </p>
              <div className="space-y-1.5">
                {markerTypes.map((item) => (
                  <div key={item.type} className="flex items-center gap-2">
                    <span className="text-xs text-gray-600">•</span>
                    <span className="text-xs text-gray-600">
                      <span className="font-medium">{item.type}:</span> {item.description}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tip */}
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500">
                💡 Tap markers to see hazard type & details
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
