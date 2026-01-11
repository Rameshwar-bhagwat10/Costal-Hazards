'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/Card'
import { Button } from '@/components/ui/Button'

type InputMode = 'text' | 'screenshot'

interface SocialInputProps {
  onVerify: (input: { type: 'text' | 'link' | 'screenshot'; content: string; file?: File }) => void
  isVerifying: boolean
  disabled?: boolean
}

const MAX_CHARS = 1000
const MAX_FILE_SIZE = 5 * 1024 * 1024 // 5MB
const ALLOWED_TYPES = ['image/jpeg', 'image/png', 'image/webp']

export function SocialInput({ onVerify, isVerifying, disabled }: SocialInputProps) {
  const [mode, setMode] = useState<InputMode>('text')
  const [textInput, setTextInput] = useState('')
  const [linkInput, setLinkInput] = useState('')
  const [screenshot, setScreenshot] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleTextChange = (value: string) => {
    if (value.length <= MAX_CHARS) {
      setTextInput(value)
      setError(null)
    }
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    setError(null)

    if (!file) return

    if (!ALLOWED_TYPES.includes(file.type)) {
      setError('Please upload a JPG, PNG, or WebP image')
      return
    }

    if (file.size > MAX_FILE_SIZE) {
      setError('File size must be less than 5MB')
      return
    }

    setScreenshot(file)
    setPreviewUrl(URL.createObjectURL(file))
  }

  const clearInput = () => {
    setTextInput('')
    setLinkInput('')
    setScreenshot(null)
    setPreviewUrl(null)
    setError(null)
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const handleVerify = () => {
    setError(null)

    if (mode === 'text') {
      const content = textInput.trim() || linkInput.trim()
      if (!content) {
        setError('Please enter text or a link to verify')
        return
      }
      const isLink = /^https?:\/\//i.test(content)
      onVerify({ type: isLink ? 'link' : 'text', content })
    } else {
      if (!screenshot) {
        setError('Please upload a screenshot to verify')
        return
      }
      onVerify({ type: 'screenshot', content: screenshot.name, file: screenshot })
    }
  }

  const hasInput = mode === 'text' 
    ? (textInput.trim() || linkInput.trim()) 
    : screenshot

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <svg className="w-5 h-5 text-info-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
          </svg>
          Verify Social Media Post
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Mode Tabs */}
        <div className="flex gap-1 p-1 bg-bg-muted rounded-lg mb-4">
          <button
            type="button"
            onClick={() => setMode('text')}
            disabled={isVerifying}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              mode === 'text'
                ? 'bg-bg-card text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Text / Link
          </button>
          <button
            type="button"
            onClick={() => setMode('screenshot')}
            disabled={isVerifying}
            className={`flex-1 py-2 px-4 text-sm font-medium rounded-md transition-all ${
              mode === 'screenshot'
                ? 'bg-bg-card text-text-primary shadow-sm'
                : 'text-text-secondary hover:text-text-primary'
            }`}
          >
            Screenshot
          </button>
        </div>

        {/* Text/Link Input */}
        {mode === 'text' && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Post Text
              </label>
              <textarea
                value={textInput}
                onChange={(e) => handleTextChange(e.target.value)}
                disabled={isVerifying || disabled}
                placeholder="Paste the social media post content here..."
                rows={4}
                className="w-full px-3 py-2 rounded-lg border border-border-soft bg-bg-main text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-info-blue focus:border-transparent resize-none disabled:opacity-50 disabled:cursor-not-allowed"
              />
              <div className="flex justify-between mt-1">
                <span className="text-xs text-text-secondary">
                  Paste text from any social media post
                </span>
                <span className={`text-xs ${textInput.length > MAX_CHARS * 0.9 ? 'text-warning-orange' : 'text-text-secondary'}`}>
                  {textInput.length}/{MAX_CHARS}
                </span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border-soft" />
              </div>
              <div className="relative flex justify-center text-xs">
                <span className="px-2 bg-bg-card text-text-secondary">or</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-1.5">
                Post Link
              </label>
              <input
                type="url"
                value={linkInput}
                onChange={(e) => { setLinkInput(e.target.value); setError(null) }}
                disabled={isVerifying || disabled}
                placeholder="https://twitter.com/user/status/..."
                className="w-full px-3 py-2 rounded-lg border border-border-soft bg-bg-main text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-info-blue focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              />
            </div>
          </div>
        )}

        {/* Screenshot Input */}
        {mode === 'screenshot' && (
          <div>
            <label className="block text-sm font-medium text-text-primary mb-1.5">
              Upload Screenshot
            </label>
            
            {!previewUrl ? (
              <div
                onClick={() => !isVerifying && fileInputRef.current?.click()}
                className={`border-2 border-dashed border-border-soft rounded-lg p-8 text-center cursor-pointer hover:border-info-blue hover:bg-bg-muted transition-colors ${isVerifying ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                <svg className="w-12 h-12 mx-auto mb-3 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-sm text-text-primary font-medium mb-1">
                  Click to upload screenshot
                </p>
                <p className="text-xs text-text-secondary">
                  JPG, PNG or WebP (max 5MB)
                </p>
              </div>
            ) : (
              <div className="relative rounded-lg overflow-hidden border border-border-soft">
                <Image
                  src={previewUrl}
                  alt="Screenshot preview"
                  width={400}
                  height={256}
                  className="w-full max-h-64 object-contain bg-bg-muted"
                  unoptimized
                />
                {!isVerifying && (
                  <button
                    type="button"
                    onClick={() => { setScreenshot(null); setPreviewUrl(null) }}
                    className="absolute top-2 right-2 p-1.5 bg-bg-card rounded-full shadow-md hover:bg-bg-muted transition-colors"
                  >
                    <svg className="w-4 h-4 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
            <svg className="w-5 h-5 text-alert-red flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm text-alert-red">{error}</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-3 mt-6">
          <Button
            onClick={handleVerify}
            disabled={!hasInput || isVerifying || disabled}
            className="flex-1"
          >
            {isVerifying ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Verifying...
              </>
            ) : (
              <>
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Verify Post
              </>
            )}
          </Button>
          
          {hasInput && !isVerifying && (
            <Button variant="secondary" onClick={clearInput}>
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
