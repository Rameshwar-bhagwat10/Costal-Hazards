// Social verification types for the global store

export type VerificationStatus = 'verified' | 'uncertain' | 'likely_false'
export type InputType = 'text' | 'link' | 'screenshot'

export interface SocialVerification {
  id: string
  inputType: InputType
  inputContent: string
  confidence: number
  status: VerificationStatus
  summary: string
  timestamp: string
}

// Legacy interfaces for backward compatibility
export interface SocialPost {
  id: string
  url: string
  platform: 'twitter' | 'facebook' | 'instagram' | 'other'
  content: string
  author: string
  timestamp: string
  verified: boolean
  credibility: 'high' | 'medium' | 'low'
}

export interface VerificationResult {
  credibility: 'high' | 'medium' | 'low'
  analysis: string
  confidence: number
}
