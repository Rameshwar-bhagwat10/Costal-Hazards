// Mock Social Media Verification Library
// Simulates AI-powered credibility analysis

export interface VerificationStep {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed'
}

export interface MatchingReport {
  id: string
  title: string
  location: string
  date: string
  similarity: number
}

export interface SocialVerificationResult {
  status: 'verified' | 'uncertain' | 'likely_false'
  confidenceScore: number
  explanation: string
  factors: {
    label: string
    score: number
    description: string
  }[]
  matchingReports: MatchingReport[]
  advice: string
}

export const VERIFICATION_STEPS: VerificationStep[] = [
  { id: 'extract', label: 'Extracting information', status: 'pending' },
  { id: 'emotional', label: 'Detecting emotional manipulation', status: 'pending' },
  { id: 'exaggeration', label: 'Checking for exaggeration', status: 'pending' },
  { id: 'compare', label: 'Comparing with nearby reports', status: 'pending' },
  { id: 'score', label: 'Calculating trust score', status: 'pending' },
]

// Mock matching reports
const MOCK_MATCHING_REPORTS: MatchingReport[] = [
  {
    id: 'r1',
    title: 'High tide warning at Marina Beach',
    location: 'Marina Beach, Chennai',
    date: '2 hours ago',
    similarity: 87,
  },
  {
    id: 'r2',
    title: 'Coastal erosion observed near lighthouse',
    location: 'Kovalam, Kerala',
    date: '5 hours ago',
    similarity: 72,
  },
]

// Generate mock verification result based on input
export function generateMockResult(input: string): SocialVerificationResult {
  // Simple heuristics for demo
  const hasAlarmingWords = /urgent|emergency|disaster|catastrophe|massive|huge|terrible/i.test(input)
  const hasExaggeration = /!!+|all caps|EVERYONE|IMMEDIATELY/i.test(input)
  const isShort = input.length < 50
  const hasLocation = /beach|coast|sea|ocean|shore|marina|port/i.test(input)
  
  let confidenceScore: number
  let status: SocialVerificationResult['status']
  
  if (hasAlarmingWords && hasExaggeration) {
    confidenceScore = Math.floor(Math.random() * 30) + 20 // 20-50
    status = 'likely_false'
  } else if (hasAlarmingWords || isShort) {
    confidenceScore = Math.floor(Math.random() * 25) + 45 // 45-70
    status = 'uncertain'
  } else {
    confidenceScore = Math.floor(Math.random() * 20) + 75 // 75-95
    status = 'verified'
  }

  const explanations = {
    verified: 'This post appears to contain accurate information that aligns with verified ground reports in the area. The language used is measured and factual.',
    uncertain: 'This post contains some claims that could not be fully verified. While not necessarily false, we recommend cross-checking with official sources before sharing.',
    likely_false: 'This post shows signs of potential misinformation including emotional language, exaggerated claims, and inconsistencies with verified reports in the area.',
  }

  const factors = [
    {
      label: 'Language Analysis',
      score: hasAlarmingWords ? 35 : hasExaggeration ? 50 : 85,
      description: hasAlarmingWords 
        ? 'Contains emotionally charged language' 
        : 'Language appears measured and factual',
    },
    {
      label: 'Source Credibility',
      score: Math.floor(Math.random() * 30) + 60,
      description: 'Source history could not be fully verified',
    },
    {
      label: 'Geographic Consistency',
      score: hasLocation ? 80 : 45,
      description: hasLocation 
        ? 'Location mentioned matches known coastal areas' 
        : 'No specific location mentioned',
    },
    {
      label: 'Report Correlation',
      score: confidenceScore > 70 ? 85 : confidenceScore > 50 ? 60 : 30,
      description: confidenceScore > 70 
        ? 'Matches multiple verified ground reports' 
        : 'Limited correlation with verified reports',
    },
  ]

  const adviceMessages = {
    verified: 'This information appears reliable. You may share it while encouraging others to stay updated through official channels.',
    uncertain: 'Exercise caution before sharing. Verify with local authorities or official weather services.',
    likely_false: 'Do not share unverified posts during emergencies. Misinformation can cause panic and divert emergency resources.',
  }

  return {
    status,
    confidenceScore,
    explanation: explanations[status],
    factors,
    matchingReports: status === 'verified' ? MOCK_MATCHING_REPORTS : 
                     status === 'uncertain' ? [MOCK_MATCHING_REPORTS[0]] : [],
    advice: adviceMessages[status],
  }
}

// Simulate step-by-step verification with delays
export async function simulateVerification(
  onStepUpdate: (stepId: string, status: 'processing' | 'completed') => void
): Promise<void> {
  const delays = [800, 1200, 1000, 1500, 600]
  
  for (let i = 0; i < VERIFICATION_STEPS.length; i++) {
    const step = VERIFICATION_STEPS[i]
    onStepUpdate(step.id, 'processing')
    await new Promise(resolve => setTimeout(resolve, delays[i]))
    onStepUpdate(step.id, 'completed')
  }
}
