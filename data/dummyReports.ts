export interface DummyReport {
  id: string
  hazardType: 'flood' | 'erosion' | 'rip-current' | 'storm-surge' | 'tsunami' | 'pollution'
  region: string
  location: string
  timestamp: string
  confidence: number
  summary: string
  hasMedia: boolean
  severity: 'high' | 'medium' | 'low'
}

export const dummyReports: DummyReport[] = [
  {
    id: '1',
    hazardType: 'flood',
    region: 'Mumbai Coast',
    location: 'Marine Drive, Mumbai',
    timestamp: '2026-01-10T08:30:00Z',
    confidence: 94,
    summary: 'AI verified flooding reported near Marine Drive. Water levels rising due to high tide combined with monsoon rainfall.',
    hasMedia: true,
    severity: 'high',
  },
  {
    id: '2',
    hazardType: 'rip-current',
    region: 'Goa Coast',
    location: 'Calangute Beach, Goa',
    timestamp: '2026-01-10T07:15:00Z',
    confidence: 89,
    summary: 'Strong rip currents detected at Calangute Beach. Multiple reports confirmed by lifeguard stations.',
    hasMedia: true,
    severity: 'high',
  },
  {
    id: '3',
    hazardType: 'erosion',
    region: 'Kerala Coast',
    location: 'Kovalam Beach, Thiruvananthapuram',
    timestamp: '2026-01-10T06:45:00Z',
    confidence: 82,
    summary: 'Coastal erosion observed along Kovalam Beach. Beach section temporarily closed for safety assessment.',
    hasMedia: false,
    severity: 'medium',
  },
  {
    id: '4',
    hazardType: 'storm-surge',
    region: 'Tamil Nadu Coast',
    location: 'Marina Beach, Chennai',
    timestamp: '2026-01-09T22:00:00Z',
    confidence: 91,
    summary: 'Storm surge warning issued for Marina Beach area. Expected wave heights of 2-3 meters due to cyclonic activity.',
    hasMedia: true,
    severity: 'high',
  },
  {
    id: '5',
    hazardType: 'pollution',
    region: 'Gujarat Coast',
    location: 'Alang Ship Breaking Yard, Bhavnagar',
    timestamp: '2026-01-09T18:30:00Z',
    confidence: 78,
    summary: 'Water quality alert near Alang industrial area. Elevated pollution levels detected in coastal waters.',
    hasMedia: false,
    severity: 'medium',
  },
  {
    id: '6',
    hazardType: 'flood',
    region: 'West Bengal Coast',
    location: 'Digha Beach, Purba Medinipur',
    timestamp: '2026-01-09T14:00:00Z',
    confidence: 86,
    summary: 'Minor flooding at Digha coastal area. Low-lying roads may be affected during high tide.',
    hasMedia: true,
    severity: 'medium',
  },
  {
    id: '7',
    hazardType: 'rip-current',
    region: 'Karnataka Coast',
    location: 'Gokarna Beach, Uttara Kannada',
    timestamp: '2026-01-09T10:20:00Z',
    confidence: 76,
    summary: 'Moderate rip current activity at Gokarna Beach. Swimmers advised to stay near lifeguard stations.',
    hasMedia: false,
    severity: 'low',
  },
  {
    id: '8',
    hazardType: 'tsunami',
    region: 'Andaman & Nicobar',
    location: 'Port Blair Coastal Areas',
    timestamp: '2026-01-08T23:00:00Z',
    confidence: 65,
    summary: 'Tsunami advisory lifted for Andaman Islands. Previous seismic activity did not generate significant waves.',
    hasMedia: false,
    severity: 'low',
  },
  {
    id: '9',
    hazardType: 'erosion',
    region: 'Odisha Coast',
    location: 'Puri Beach, Puri',
    timestamp: '2026-01-08T16:00:00Z',
    confidence: 84,
    summary: 'Significant coastal erosion reported at Puri Beach. Sea wall damage observed near Jagannath Temple area.',
    hasMedia: true,
    severity: 'high',
  },
  {
    id: '10',
    hazardType: 'pollution',
    region: 'Maharashtra Coast',
    location: 'Juhu Beach, Mumbai',
    timestamp: '2026-01-08T12:00:00Z',
    confidence: 81,
    summary: 'Beach pollution alert at Juhu. Debris and waste accumulation reported after recent high tides.',
    hasMedia: true,
    severity: 'medium',
  },
]

export const regions = [
  'All Regions',
  'Mumbai Coast',
  'Goa Coast',
  'Kerala Coast',
  'Tamil Nadu Coast',
  'Gujarat Coast',
  'West Bengal Coast',
  'Karnataka Coast',
  'Andaman & Nicobar',
  'Odisha Coast',
  'Maharashtra Coast',
]

export const timeRanges = [
  { label: 'Last 24 hours', value: '24h' },
  { label: 'Last 7 days', value: '7d' },
  { label: 'Last 30 days', value: '30d' },
]
