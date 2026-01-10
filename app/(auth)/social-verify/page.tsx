'use client'

import { useState, useCallback } from 'react'
import { SocialInput } from '@/components/social/SocialInput'
import { VerificationProgress } from '@/components/social/VerificationProgress'
import { VerificationResult } from '@/components/social/VerificationResult'
import { TrustTips } from '@/components/social/TrustTips'
import { Badge } from '@/components/ui/Badge'
import {
  VERIFICATION_STEPS,
  generateMockResult,
  simulateVerification,
  type SocialVerificationResult,
} from '@/lib/mockSocialVerification'

type VerificationState = 'idle' | 'verifying' | 'result' | 'error'

interface VerificationStep {
  id: string
  label: string
  status: 'pending' | 'processing' | 'completed'
}

export default function SocialVerifyPage() {
  const [state, setState] = useState<VerificationState>('idle')
  const [steps, setSteps] = useState<VerificationStep[]>(
    VERIFICATION_STEPS.map(s => ({ ...s }))
  )
  const [result, setResult] = useState<SocialVerificationResult | null>(null)

  const handleStepUpdate = useCallback((stepId: string, status: 'processing' | 'completed') => {
    setSteps(prev =>
      prev.map(step =>
        step.id === stepId ? { ...step, status } : step
      )
    )
  }, [])

  const handleVerify = async (input: { type: string; content: string; file?: File }) => {
    setState('verifying')
    setResult(null)
    setSteps(VERIFICATION_STEPS.map(s => ({ ...s, status: 'pending' as const })))
    
    // Store input content for mock result generation
    const content = input.type === 'screenshot' 
      ? 'Screenshot uploaded for verification' 
      : input.content

    try {
      // Simulate step-by-step verification
      await simulateVerification(handleStepUpdate)
      
      // Generate mock result
      const mockResult = generateMockResult(content)
      setResult(mockResult)
      setState('result')
    } catch {
      setState('error')
    }
  }

  const handleVerifyAnother = () => {
    setState('idle')
    setResult(null)
    setSteps(VERIFICATION_STEPS.map(s => ({ ...s, status: 'pending' as const })))
  }

  return (
    <div className="max-w-5xl mx-auto">
      {/* Page Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <h1 className="heading-l">Social Media Verification</h1>
          <Badge variant="info">AI Powered</Badge>
        </div>
        <p className="text-[var(--text-secondary)]">
          Verify the credibility of social media posts about coastal hazards using AI-powered analysis.
        </p>
      </div>

      {/* Main Content - Two Column Layout */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Left Column - Input & Progress */}
        <div className="space-y-4">
          <SocialInput
            onVerify={handleVerify}
            isVerifying={state === 'verifying'}
            disabled={state === 'verifying'}
          />

          {/* Verification Progress */}
          {(state === 'verifying' || state === 'result') && (
            <VerificationProgress
              steps={steps}
              isActive={state === 'verifying'}
            />
          )}

          {/* Error State */}
          {state === 'error' && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-start gap-3">
                <svg className="w-5 h-5 text-[var(--alert-red)] flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <div>
                  <h4 className="text-sm font-semibold text-[var(--alert-red)]">Verification Failed</h4>
                  <p className="text-sm text-[var(--text-secondary)] mt-1">
                    Unable to complete verification. Please try again.
                  </p>
                  <button
                    onClick={handleVerifyAnother}
                    className="mt-2 text-sm font-medium text-[var(--info-blue)] hover:underline"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Trust Tips - Show when idle or verifying */}
          {(state === 'idle' || state === 'verifying') && (
            <TrustTips />
          )}
        </div>

        {/* Right Column - Results */}
        <div>
          {state === 'result' && result ? (
            <VerificationResult
              result={result}
              onVerifyAnother={handleVerifyAnother}
            />
          ) : (
            <div className="h-full flex items-center justify-center min-h-[300px] lg:min-h-0">
              <div className="text-center p-8">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-[var(--bg-muted)] flex items-center justify-center">
                  <svg className="w-10 h-10 text-[var(--text-secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">
                  {state === 'verifying' ? 'Analyzing Post...' : 'Ready to Verify'}
                </h3>
                <p className="text-sm text-[var(--text-secondary)] max-w-xs mx-auto">
                  {state === 'verifying'
                    ? 'Our AI is analyzing the content for credibility indicators.'
                    : 'Paste a social media post or upload a screenshot to check its credibility.'}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Educational Banner */}
      <div className="mt-8 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-100">
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-white shadow-sm flex items-center justify-center">
            <svg className="w-5 h-5 text-[var(--info-blue)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-[var(--text-primary)] mb-1">
              Help Stop Misinformation
            </h4>
            <p className="text-sm text-[var(--text-secondary)]">
              During emergencies, false information can spread rapidly and cause harm. 
              Always verify before sharing, and encourage others to do the same. 
              Together, we can keep our communities informed and safe.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
