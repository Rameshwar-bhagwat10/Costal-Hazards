'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import type { SocialVerificationResult } from '@/lib/mockSocialVerification'

interface VerificationResultProps {
  result: SocialVerificationResult
  onVerifyAnother: () => void
}

export function VerificationResult({ result, onVerifyAnother }: VerificationResultProps) {
  const [copied, setCopied] = useState(false)

  const statusConfig = {
    verified: {
      label: 'Verified',
      variant: 'safe' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      bgColor: 'bg-green-50',
      borderColor: 'border-green-200',
      textColor: 'text-safe-green',
    },
    uncertain: {
      label: 'Uncertain',
      variant: 'warning' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      bgColor: 'bg-orange-50',
      borderColor: 'border-orange-200',
      textColor: 'text-warning-orange',
    },
    likely_false: {
      label: 'Likely False',
      variant: 'alert' as const,
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      ),
      bgColor: 'bg-red-50',
      borderColor: 'border-red-200',
      textColor: 'text-alert-red',
    },
  }

  const config = statusConfig[result.status]

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'bg-safe-green'
    if (score >= 45) return 'bg-warning-orange'
    return 'bg-alert-red'
  }

  const copyResult = async () => {
    const summary = `Verification Result: ${config.label}
Confidence Score: ${result.confidenceScore}%
${result.explanation}
Advice: ${result.advice}`
    
    await navigator.clipboard.writeText(summary)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-4 animate-fade-in">
      {/* Main Result Card */}
      <Card className={`${config.bgColor} ${config.borderColor} border-2`}>
        <CardContent className="pt-6">
          <div className="flex flex-col items-center text-center">
            {/* Status Icon */}
            <div className={`${config.textColor} mb-3`}>
              {config.icon}
            </div>

            {/* Status Badge */}
            <Badge variant={config.variant} className="text-base px-4 py-1 mb-4">
              {config.label}
            </Badge>

            {/* Confidence Meter */}
            <div className="w-full max-w-xs mb-4">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-text-secondary">Confidence Score</span>
                <span className={`font-bold ${config.textColor}`}>{result.confidenceScore}%</span>
              </div>
              <div className="h-3 bg-white rounded-full overflow-hidden shadow-inner">
                <div
                  className={`h-full ${getScoreColor(result.confidenceScore)} transition-all duration-1000 ease-out rounded-full`}
                  style={{ width: `${result.confidenceScore}%` }}
                />
              </div>
            </div>

            {/* Explanation */}
            <p className="text-sm text-text-primary leading-relaxed">
              {result.explanation}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Analysis Factors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Analysis Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {result.factors.map((factor, index) => (
              <div key={index}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium text-text-primary">{factor.label}</span>
                  <span className={`text-sm font-bold ${
                    factor.score >= 70 ? 'text-safe-green' :
                    factor.score >= 45 ? 'text-warning-orange' :
                    'text-alert-red'
                  }`}>
                    {factor.score}%
                  </span>
                </div>
                <div className="h-2 bg-bg-muted rounded-full overflow-hidden mb-1">
                  <div
                    className={`h-full ${getScoreColor(factor.score)} transition-all duration-700`}
                    style={{ width: `${factor.score}%` }}
                  />
                </div>
                <p className="text-xs text-text-secondary">{factor.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Matching Reports */}
      {result.matchingReports.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base flex items-center gap-2">
              <svg className="w-5 h-5 text-info-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
              Matching Ground Reports
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {result.matchingReports.map((report) => (
                <div
                  key={report.id}
                  className="p-3 bg-bg-muted rounded-lg border border-border-soft"
                >
                  <div className="flex justify-between items-start mb-1">
                    <h4 className="text-sm font-medium text-text-primary">{report.title}</h4>
                    <Badge variant="info" className="text-xs">{report.similarity}% match</Badge>
                  </div>
                  <p className="text-xs text-text-secondary">
                    {report.location} • {report.date}
                  </p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Advice Card */}
      <Card className="bg-blue-50 border-blue-200 border">
        <CardContent className="pt-4">
          <div className="flex gap-3">
            <div className="shrink-0">
              <svg className="w-6 h-6 text-info-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h4 className="text-sm font-semibold text-info-blue mb-1">Recommendation</h4>
              <p className="text-sm text-text-primary">{result.advice}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <Button onClick={copyResult} variant="secondary" className="flex-1">
          {copied ? (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Copied!
            </>
          ) : (
            <>
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              Copy Result
            </>
          )}
        </Button>
        <Button onClick={onVerifyAnother} className="flex-1">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
          </svg>
          Verify Another
        </Button>
      </div>
    </div>
  )
}
