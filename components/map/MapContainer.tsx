'use client'

import { useMemo, useCallback, useSyncExternalStore } from 'react'
import { MapContainer as LeafletMap, TileLayer, Marker, Tooltip } from 'react-leaflet'
import L from 'leaflet'
import { HeatZones } from './HeatZones'
import { hazardTypes } from '@/data/hazardTypes'
import { dummyMapReports, type MapReport } from '@/data/dummyMapReports'

import 'leaflet/dist/leaflet.css'

interface MapContainerProps {
  selectedHazards: string[]
  confidenceThreshold: number
  onMarkerClick: (report: MapReport) => void
  extraReports?: MapReport[]
}

// Extended type to handle both coordinate formats
interface ExtendedMapReport extends MapReport {
  lat?: number
  lng?: number
  locationName?: string
}

// Severity-based colors (Red, Orange, Green)
const SEVERITY_COLORS = {
  high: '#EF4444',    // Red
  medium: '#F59E0B',  // Orange
  low: '#22C55E',     // Green
}

const createSeverityIcon = (severity: 'high' | 'medium' | 'low') => {
  const color = SEVERITY_COLORS[severity]
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: 22px;
        height: 22px;
        background-color: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 2px 8px rgba(0,0,0,0.35);
        cursor: pointer;
      "></div>
    `,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
    popupAnchor: [0, -11],
  })
}

// Use useSyncExternalStore for client-side detection
function subscribe() {
  return () => {}
}

function getSnapshot() {
  return true
}

function getServerSnapshot() {
  return false
}

export function MapContainerComponent({
  selectedHazards,
  confidenceThreshold,
  onMarkerClick,
  extraReports,
}: MapContainerProps) {
  const isMounted = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)

  // Use extraReports if provided, otherwise use dummy data
  const allReports = useMemo(() => {
    if (extraReports && extraReports.length > 0) {
      return extraReports
    }
    return dummyMapReports
  }, [extraReports])

  const filteredReports = useMemo(() => {
    return allReports.filter(
      (report) =>
        selectedHazards.includes(report.hazardType) &&
        report.confidence >= confidenceThreshold
    )
  }, [allReports, selectedHazards, confidenceThreshold])

  const getMarkerIcon = useCallback((severity: 'high' | 'medium' | 'low') => {
    return createSeverityIcon(severity)
  }, [])

  const center: [number, number] = [17.5, 73.5]
  const zoom = 7

  if (!isMounted) {
    return (
      <div className="w-full h-full bg-bg-muted flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-info-blue border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading map...</p>
        </div>
      </div>
    )
  }

  return (
    <LeafletMap
      center={center}
      zoom={zoom}
      className="w-full h-full"
      zoomControl={true}
      scrollWheelZoom={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <HeatZones selectedHazards={selectedHazards} />

      {filteredReports.map((report) => {
        // Handle both coordinate formats
        const extReport = report as ExtendedMapReport
        const lat = report.coordinates?.lat ?? extReport.lat
        const lng = report.coordinates?.lng ?? extReport.lng
        const locationName = report.location ?? extReport.locationName
        const hazardName = hazardTypes.find((h) => h.id === report.hazardType)?.name || report.hazardType
        
        if (!lat || !lng) return null

        return (
          <Marker
            key={report.id}
            position={[lat, lng]}
            icon={getMarkerIcon(report.severity)}
            eventHandlers={{
              click: () => onMarkerClick(report),
            }}
          >
            {/* Tooltip shows on hover */}
            <Tooltip direction="top" offset={[0, -10]} opacity={1}>
              <div className="text-xs min-w-[140px]">
                <div className="font-semibold text-gray-800 mb-1">{hazardName}</div>
                <div className="text-gray-600 truncate">{locationName}</div>
                <div className="flex items-center gap-1 mt-1">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: SEVERITY_COLORS[report.severity] }}
                  />
                  <span className="capitalize text-gray-500">{report.severity} severity</span>
                </div>
                <div className="text-gray-400 mt-1 text-[10px]">Click for details</div>
              </div>
            </Tooltip>
          </Marker>
        )
      })}
    </LeafletMap>
  )
}
