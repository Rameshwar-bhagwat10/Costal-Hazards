'use client'

import Link from 'next/link'
import { Card } from '@/components/ui/Card'

interface HazardMarker {
  id: string
  type: 'flood' | 'rip-current' | 'erosion' | 'storm-surge'
  severity: 'high' | 'medium' | 'low'
  x: number
  y: number
  label: string
}

const markers: HazardMarker[] = [
  { id: '1', type: 'flood', severity: 'high', x: 25, y: 30, label: 'Marina Bay' },
  { id: '2', type: 'rip-current', severity: 'high', x: 65, y: 45, label: 'Sunset Beach' },
  { id: '3', type: 'erosion', severity: 'medium', x: 80, y: 25, label: 'Cliff Walk' },
  { id: '4', type: 'storm-surge', severity: 'medium', x: 40, y: 70, label: 'Harbor' },
]

const severityColors = {
  high: '#EF4444',
  medium: '#F59E0B',
  low: '#10B981',
}

export function MiniMap() {
  return (
    <Card className="p-0 overflow-hidden">
      <div className="p-4 border-b border-[var(--border-soft)] flex items-center justify-between">
        <h3 className="font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
          </svg>
          Hazard Map
        </h3>
        <Link 
          href="/map" 
          className="text-xs text-blue-600 hover:text-blue-700 font-medium"
        >
          Full Map →
        </Link>
      </div>

      {/* Map Preview */}
      <div className="relative h-48 bg-gradient-to-br from-blue-100 to-cyan-50 overflow-hidden">
        {/* Simplified coastline */}
        <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <defs>
            <linearGradient id="water" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3B82F6" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.3" />
            </linearGradient>
          </defs>
          {/* Water */}
          <path d="M0 0 L100 0 L100 100 L0 100 Z" fill="url(#water)" />
          {/* Land */}
          <path 
            d="M0 40 Q20 35, 30 50 Q40 65, 50 55 Q60 45, 70 60 Q80 75, 100 65 L100 100 L0 100 Z" 
            fill="#F0FDF4" 
            stroke="#86EFAC" 
            strokeWidth="0.5"
          />
          {/* Beach line */}
          <path 
            d="M0 40 Q20 35, 30 50 Q40 65, 50 55 Q60 45, 70 60 Q80 75, 100 65" 
            fill="none" 
            stroke="#FDE68A" 
            strokeWidth="2"
          />
        </svg>

        {/* Hazard markers */}
        {markers.map((marker) => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
          >
            {/* Pulse ring */}
            {marker.severity === 'high' && (
              <span 
                className="absolute inset-0 rounded-full animate-ping opacity-75"
                style={{ backgroundColor: severityColors[marker.severity] }}
              />
            )}
            {/* Marker dot */}
            <span 
              className="relative flex h-4 w-4 rounded-full border-2 border-white shadow-lg"
              style={{ backgroundColor: severityColors[marker.severity] }}
            />
            {/* Tooltip */}
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="bg-slate-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {marker.label}
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm rounded-lg p-2 text-xs">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-red-500" />
              High
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-amber-500" />
              Medium
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Low
            </span>
          </div>
        </div>
      </div>
    </Card>
  )
}
