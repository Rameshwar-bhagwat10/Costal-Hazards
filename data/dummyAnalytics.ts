// Dummy Analytics Data for Phase 7

export type TimeRange = '24h' | '7d' | '30d'

export interface TimeBucket {
  label: string
  timestamp: string
}

export interface HazardCount {
  time: string
  flood: number
  ripCurrent: number
  erosion: number
  stormSurge: number
  tsunami: number
}

export interface RegionCount {
  region: string
  reports: number
  riskLevel: 'high' | 'medium' | 'low'
  change: number
}

export interface RiskLevel {
  time: string
  high: number
  medium: number
  low: number
}

export interface SummaryMetrics {
  reportsToday: number
  reportsYesterday: number
  highRiskZones: number
  highRiskZonesChange: number
  verifiedPercent: number
  verifiedPercentChange: number
  topHazard: string
  topHazardCount: number
}

// Time buckets for different ranges
export const timeBuckets: Record<TimeRange, TimeBucket[]> = {
  '24h': [
    { label: '12 AM', timestamp: '00:00' },
    { label: '4 AM', timestamp: '04:00' },
    { label: '8 AM', timestamp: '08:00' },
    { label: '12 PM', timestamp: '12:00' },
    { label: '4 PM', timestamp: '16:00' },
    { label: '8 PM', timestamp: '20:00' },
    { label: 'Now', timestamp: '23:59' },
  ],
  '7d': [
    { label: 'Mon', timestamp: 'monday' },
    { label: 'Tue', timestamp: 'tuesday' },
    { label: 'Wed', timestamp: 'wednesday' },
    { label: 'Thu', timestamp: 'thursday' },
    { label: 'Fri', timestamp: 'friday' },
    { label: 'Sat', timestamp: 'saturday' },
    { label: 'Sun', timestamp: 'sunday' },
  ],
  '30d': [
    { label: 'Week 1', timestamp: 'week1' },
    { label: 'Week 2', timestamp: 'week2' },
    { label: 'Week 3', timestamp: 'week3' },
    { label: 'Week 4', timestamp: 'week4' },
  ],
}

// Hazard trend data by time range
export const hazardTrendData: Record<TimeRange, HazardCount[]> = {
  '24h': [
    { time: '12 AM', flood: 2, ripCurrent: 1, erosion: 0, stormSurge: 0, tsunami: 0 },
    { time: '4 AM', flood: 1, ripCurrent: 0, erosion: 1, stormSurge: 0, tsunami: 0 },
    { time: '8 AM', flood: 3, ripCurrent: 2, erosion: 1, stormSurge: 1, tsunami: 0 },
    { time: '12 PM', flood: 5, ripCurrent: 4, erosion: 2, stormSurge: 1, tsunami: 0 },
    { time: '4 PM', flood: 4, ripCurrent: 6, erosion: 1, stormSurge: 2, tsunami: 0 },
    { time: '8 PM', flood: 3, ripCurrent: 3, erosion: 2, stormSurge: 1, tsunami: 0 },
    { time: 'Now', flood: 2, ripCurrent: 2, erosion: 1, stormSurge: 0, tsunami: 0 },
  ],
  '7d': [
    { time: 'Mon', flood: 8, ripCurrent: 5, erosion: 3, stormSurge: 2, tsunami: 0 },
    { time: 'Tue', flood: 12, ripCurrent: 8, erosion: 4, stormSurge: 3, tsunami: 0 },
    { time: 'Wed', flood: 15, ripCurrent: 10, erosion: 5, stormSurge: 4, tsunami: 1 },
    { time: 'Thu', flood: 10, ripCurrent: 12, erosion: 6, stormSurge: 3, tsunami: 0 },
    { time: 'Fri', flood: 18, ripCurrent: 9, erosion: 4, stormSurge: 5, tsunami: 0 },
    { time: 'Sat', flood: 14, ripCurrent: 15, erosion: 3, stormSurge: 4, tsunami: 0 },
    { time: 'Sun', flood: 11, ripCurrent: 7, erosion: 5, stormSurge: 2, tsunami: 0 },
  ],
  '30d': [
    { time: 'Week 1', flood: 45, ripCurrent: 32, erosion: 18, stormSurge: 12, tsunami: 1 },
    { time: 'Week 2', flood: 52, ripCurrent: 41, erosion: 22, stormSurge: 15, tsunami: 0 },
    { time: 'Week 3', flood: 38, ripCurrent: 28, erosion: 15, stormSurge: 10, tsunami: 2 },
    { time: 'Week 4', flood: 48, ripCurrent: 35, erosion: 20, stormSurge: 14, tsunami: 0 },
  ],
}

// Region distribution data by time range
export const regionData: Record<TimeRange, RegionCount[]> = {
  '24h': [
    { region: 'Mumbai Coast', reports: 12, riskLevel: 'high', change: 15 },
    { region: 'Chennai Coast', reports: 8, riskLevel: 'high', change: -5 },
    { region: 'Goa Coast', reports: 6, riskLevel: 'medium', change: 10 },
    { region: 'Kerala Coast', reports: 4, riskLevel: 'medium', change: 0 },
    { region: 'Gujarat Coast', reports: 3, riskLevel: 'low', change: -8 },
  ],
  '7d': [
    { region: 'Mumbai Coast', reports: 45, riskLevel: 'high', change: 22 },
    { region: 'Chennai Coast', reports: 38, riskLevel: 'high', change: 12 },
    { region: 'Goa Coast', reports: 28, riskLevel: 'medium', change: -5 },
    { region: 'Kerala Coast', reports: 22, riskLevel: 'medium', change: 8 },
    { region: 'Gujarat Coast', reports: 15, riskLevel: 'low', change: -12 },
  ],
  '30d': [
    { region: 'Mumbai Coast', reports: 156, riskLevel: 'high', change: 18 },
    { region: 'Chennai Coast', reports: 132, riskLevel: 'high', change: 25 },
    { region: 'Goa Coast', reports: 98, riskLevel: 'medium', change: -8 },
    { region: 'Kerala Coast', reports: 76, riskLevel: 'medium', change: 5 },
    { region: 'Gujarat Coast', reports: 54, riskLevel: 'low', change: -15 },
  ],
}

// Risk timeline data by time range
export const riskTimelineData: Record<TimeRange, RiskLevel[]> = {
  '24h': [
    { time: '12 AM', high: 2, medium: 3, low: 5 },
    { time: '4 AM', high: 1, medium: 2, low: 4 },
    { time: '8 AM', high: 4, medium: 5, low: 6 },
    { time: '12 PM', high: 6, medium: 8, low: 4 },
    { time: '4 PM', high: 5, medium: 7, low: 5 },
    { time: '8 PM', high: 3, medium: 5, low: 6 },
    { time: 'Now', high: 2, medium: 4, low: 5 },
  ],
  '7d': [
    { time: 'Mon', high: 8, medium: 12, low: 15 },
    { time: 'Tue', high: 12, medium: 15, low: 12 },
    { time: 'Wed', high: 15, medium: 18, low: 10 },
    { time: 'Thu', high: 10, medium: 14, low: 14 },
    { time: 'Fri', high: 18, medium: 12, low: 8 },
    { time: 'Sat', high: 14, medium: 16, low: 12 },
    { time: 'Sun', high: 8, medium: 10, low: 15 },
  ],
  '30d': [
    { time: 'Week 1', high: 45, medium: 62, low: 48 },
    { time: 'Week 2', high: 52, medium: 58, low: 42 },
    { time: 'Week 3', high: 38, medium: 48, low: 55 },
    { time: 'Week 4', high: 48, medium: 55, low: 50 },
  ],
}

// Summary metrics by time range
export const summaryMetrics: Record<TimeRange, SummaryMetrics> = {
  '24h': {
    reportsToday: 33,
    reportsYesterday: 28,
    highRiskZones: 2,
    highRiskZonesChange: 1,
    verifiedPercent: 87,
    verifiedPercentChange: 3,
    topHazard: 'Rip Current',
    topHazardCount: 18,
  },
  '7d': {
    reportsToday: 148,
    reportsYesterday: 125,
    highRiskZones: 3,
    highRiskZonesChange: 0,
    verifiedPercent: 91,
    verifiedPercentChange: 5,
    topHazard: 'Coastal Flooding',
    topHazardCount: 88,
  },
  '30d': {
    reportsToday: 516,
    reportsYesterday: 482,
    highRiskZones: 4,
    highRiskZonesChange: 2,
    verifiedPercent: 89,
    verifiedPercentChange: -2,
    topHazard: 'Coastal Flooding',
    topHazardCount: 183,
  },
}

// AI-style insights by time range
export const insights: Record<TimeRange, string[]> = {
  '24h': [
    'Rip current activity peaked at 4 PM near Goa beaches. Exercise caution during evening hours.',
    'Coastal flooding reports increased 18% compared to yesterday, primarily in Mumbai coastal zones.',
    'All high-risk alerts have been verified within 15 minutes of submission.',
  ],
  '7d': [
    'Coastal flooding incidents increased 23% this week along Maharashtra coast, correlating with monsoon patterns.',
    'Mumbai Coast and Chennai Coast remain the highest risk areas with consistent daily reports.',
    'Weekend activity shows 40% more reports from Goa, likely due to increased tourist activity.',
  ],
  '30d': [
    'Monthly trend shows gradual increase in erosion reports along Kerala coast, suggesting seasonal pattern.',
    'Verification rate improved from 85% to 91% over the past month across all Indian coastal regions.',
    'Cyclone-related storm surge warnings decreased 15% compared to previous month in Bay of Bengal.',
  ],
}
