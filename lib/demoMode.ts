// Demo Mode Utilities - Disabled for production
// Enable with NEXT_PUBLIC_DEMO_MODE=true in .env.local

export const isDemoMode = false

// Sample report data for testing
export const demoReportData = {
  hazardType: 'flood',
  description: 'Severe flooding observed near the coastal road. Water level rising rapidly due to high tide combined with heavy rainfall. Multiple vehicles stranded. Immediate attention required.',
  location: {
    lat: 19.0760,
    lng: 72.8777,
    address: 'Marine Drive, Mumbai',
  },
}

// Sample social verification examples
export const demoSocialPosts = [
  {
    type: 'text' as const,
    content: 'URGENT: Heavy flooding at Marine Drive, Mumbai! Water everywhere, people evacuating. Stay safe everyone! #MumbaiRains #Emergency',
    expectedResult: 'uncertain',
  },
  {
    type: 'text' as const,
    content: 'Minor water logging observed near Juhu Beach after morning rain. Drainage working, situation under control. BMC monitoring.',
    expectedResult: 'verified',
  },
  {
    type: 'text' as const,
    content: 'BREAKING: 50 foot tsunami wave heading to Mumbai coast!!! EVACUATE NOW!!! Share before deleted!!!',
    expectedResult: 'likely_false',
  },
]

// High risk alert example
export const demoHighRiskAlert = {
  severity: 'high' as const,
  title: 'Cyclone Warning - Bay of Bengal',
  message: 'Cyclone expected to make landfall on Tamil Nadu coast in 24 hours. All coastal residents advised to evacuate to designated shelters.',
}

// Banner message (not used when demo mode is disabled)
export const demoBannerMessage = ''
