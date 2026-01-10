'use client'

import { useState } from 'react'
import { Tooltip } from '@/components/ui/Tooltip'
import type { FeedPost } from '@/types/feed'

interface FeedCardProps {
  post: FeedPost
  userVote?: 'up' | 'down' | null
  onVote: (postId: string, vote: 'up' | 'down') => void
  onCommentClick: (post: FeedPost) => void
  isAuthenticated: boolean
  onAuthRequired: () => void
}

const categoryColors: Record<string, { bg: string; text: string; border: string }> = {
  Weather: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-300' },
  Ocean: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-300' },
  Infrastructure: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-300' },
  Evacuation: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-300' },
}

function formatTimeAgo(timestamp: string): string {
  const now = Date.now()
  const then = new Date(timestamp).getTime()
  const diffMs = now - then
  const diffMins = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffMins < 60) return `${diffMins}m ago`
  if (diffHours < 24) return `${diffHours}h ago`
  return `${diffDays}d ago`
}

function getReliabilityLabel(score: number): { label: string; color: string } {
  if (score >= 0.9) return { label: 'High trust', color: 'text-green-600' }
  if (score >= 0.7) return { label: 'Moderate trust', color: 'text-amber-600' }
  return { label: 'New contributor', color: 'text-gray-500' }
}

export function FeedCard({
  post,
  userVote,
  onVote,
  onCommentClick,
  isAuthenticated,
  onAuthRequired,
}: FeedCardProps) {
  const [isVoting, setIsVoting] = useState(false)
  const isResolved = post.status === 'resolved'
  const categoryStyle = categoryColors[post.hazardCategory]
  const reliability = getReliabilityLabel(post.authorReliabilityScore)
  const netVotes = post.upvotes - post.downvotes

  const handleVote = async (vote: 'up' | 'down') => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }
    if (isVoting || userVote === vote) return
    
    setIsVoting(true)
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 200))
    onVote(post.id, vote)
    setIsVoting(false)
  }

  return (
    <article
      className={`
        bg-white rounded-lg border-2 p-4 transition-all
        ${isResolved 
          ? 'opacity-70 border-gray-300 bg-gray-50' 
          : 'border-[var(--border-soft)] hover:border-[var(--info-blue)]'
        }
      `}
      aria-label={`${post.title} - ${post.status}`}
    >
      {/* Top Row: Category + Status */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${categoryStyle.bg} ${categoryStyle.text}`}>
            {post.hazardCategory}
          </span>
          {isResolved ? (
            <span className="px-2 py-1 text-xs font-semibold rounded bg-gray-200 text-gray-600">
              RESOLVED
            </span>
          ) : (
            <span className="px-2 py-1 text-xs font-semibold rounded bg-red-100 text-red-700">
              ACTIVE
            </span>
          )}
        </div>
        
        {/* Trust Indicator */}
        <Tooltip content={`${Math.round(post.authorReliabilityScore * 100)}% validation history`}>
          <div className={`flex items-center gap-1 text-xs ${reliability.color}`}>
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20" aria-hidden="true">
              <path fillRule="evenodd" d="M10 1a4.5 4.5 0 00-4.5 4.5V9H5a2 2 0 00-2 2v6a2 2 0 002 2h10a2 2 0 002-2v-6a2 2 0 00-2-2h-.5V5.5A4.5 4.5 0 0010 1zm3 8V5.5a3 3 0 10-6 0V9h6z" clipRule="evenodd" />
            </svg>
            <span>{reliability.label}</span>
          </div>
        </Tooltip>
      </div>

      {/* Title */}
      <h3 className={`text-lg font-bold mb-2 ${isResolved ? 'text-gray-600' : 'text-[var(--text-primary)]'}`}>
        {post.title}
      </h3>

      {/* Media (if available) */}
      {post.mediaUrl && (
        <div className="mb-3 rounded-lg overflow-hidden bg-gray-100 h-40 flex items-center justify-center">
          <div className="text-gray-400 text-sm">
            <svg className="w-12 h-12 mx-auto mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Media preview
          </div>
        </div>
      )}

      {/* Description */}
      <p className={`text-sm mb-3 line-clamp-2 ${isResolved ? 'text-gray-500' : 'text-[var(--text-secondary)]'}`}>
        {post.description}
      </p>

      {/* Location + Time */}
      <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)] mb-3">
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {post.location.name}
        </span>
        <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          {formatTimeAgo(post.timestamp)}
        </span>
      </div>

      {/* Bottom Row: Votes + Comments */}
      <div className="flex items-center justify-between pt-3 border-t border-[var(--border-soft)]">
        {/* Vote Buttons */}
        <div className="flex items-center gap-1">
          <button
            onClick={() => handleVote('up')}
            disabled={isVoting}
            className={`
              p-2 rounded-lg transition-colors
              ${userVote === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'hover:bg-gray-100 text-gray-500'
              }
            `}
            aria-label="Upvote - validate this report"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          </button>
          
          <span className={`
            min-w-[2.5rem] text-center font-bold text-sm
            ${netVotes > 0 ? 'text-green-600' : netVotes < 0 ? 'text-red-600' : 'text-gray-500'}
          `}>
            {netVotes > 0 ? `+${netVotes}` : netVotes}
          </span>
          
          <button
            onClick={() => handleVote('down')}
            disabled={isVoting}
            className={`
              p-2 rounded-lg transition-colors
              ${userVote === 'down' 
                ? 'bg-red-100 text-red-700' 
                : 'hover:bg-gray-100 text-gray-500'
              }
            `}
            aria-label="Downvote - flag as potentially inaccurate"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Comments */}
        <button
          onClick={() => onCommentClick(post)}
          className="flex items-center gap-1.5 px-3 py-2 rounded-lg hover:bg-gray-100 text-[var(--text-secondary)] transition-colors"
          aria-label={`${post.commentsCount} comments`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="text-sm font-medium">{post.commentsCount}</span>
        </button>
      </div>
    </article>
  )
}
