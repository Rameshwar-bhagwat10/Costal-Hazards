// Report types for the global store

export type HazardType = 'flood' | 'erosion' | 'rip-current' | 'storm-surge' | 'tsunami' | 'pollution'
export type ReportStatus = 'verified' | 'pending' | 'rejected'
export type Severity = 'high' | 'medium' | 'low'

export interface ReportLocation {
  lat: number
  lng: number
  name: string
}

export interface Report {
  id: string
  hazardType: HazardType
  description: string
  location: ReportLocation
  region: string
  mediaPreview?: string
  hasMedia: boolean
  timestamp: string
  confidence: number
  status: ReportStatus
  severity: Severity
  aiSummary: string
}

// For creating new reports
export interface NewReportInput {
  hazardType: string
  description: string
  location: {
    lat: number
    lng: number
    address: string
  }
  media: File[]
  confidence: number
  status: ReportStatus
  aiSummary: string
  severity: Severity
}

// Legacy interface for backward compatibility with existing components
export interface LegacyReport {
  id: string
  title: string
  description: string
  hazardType: string
  severity: Severity
  location: string
  coordinates: { lat: number; lng: number }
  createdAt: string
  verified: boolean
  media?: string[]
}

// Visibility threshold for showing reports
export const VISIBILITY_THRESHOLD = 75
