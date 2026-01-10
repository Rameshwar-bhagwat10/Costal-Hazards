'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import type { FeedPost } from '@/types/feed'

interface CommentPreviewProps {
  post: FeedPost | null
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onAuthRequired: () => void
}

// Mock comments data
const mockComments = [
  {
    id: '1',
    author: 'Local Resident',
    content: 'Can confirm this situation. Saw it myself about an hour ago.',
    timestamp: '45m ago',
    isOfficial: false,
  },
  {
    id: '2',
    author: 'Municipal Authority',
    content: 'Our team has been dispatched. Expected arrival in 30 minutes.',
    timestamp: '30m ago',
    isOfficial: true,
  },
  {
    id: '3',
    author: 'Community Volunteer',
    content: 'Alternate route available via Ring Road. Traffic moving smoothly there.',
    timestamp: '15m ago',
    isOfficial: false,
  },
]

export function CommentPreview({
  post,
  isOpen,
  onClose,
  isAuthenticated,
  onAuthRequired,
}: CommentPreviewProps) {
  const [newComment, setNewComment] = useState('')

  if (!post) return null

  const handleSubmitComment = () => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }
    // Mock submit - just clear the input
    setNewComment('')
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Updates & Comments" ariaLabel="Comments for hazard report">
      <div className="max-h-[60vh] overflow-y-auto">
        {/* Post Summary */}
        <div className="mb-4 pb-4 border-b border-[var(--border-soft)]">
          <h4 className="font-bold text-[var(--text-primary)] mb-1">{post.title}</h4>
          <p className="text-sm text-[var(--text-secondary)]">{post.location.name}</p>
        </div>

        {/* Last Update Highlight */}
        {post.lastComment && (
          <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-4 h-4 text-[#2563EB]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-xs font-semibold text-[#2563EB]">Latest Update</span>
            </div>
            <p className="text-sm text-gray-700">{post.lastComment}</p>
          </div>
        )}

        {/* Comments Thread */}
        <div className="space-y-3 mb-4">
          {mockComments.map(comment => (
            <div
              key={comment.id}
              className={`p-3 rounded-lg ${comment.isOfficial ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}
            >
              <div className="flex items-center justify-between mb-1">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-semibold ${comment.isOfficial ? 'text-green-700' : 'text-gray-700'}`}>
                    {comment.author}
                  </span>
                  {comment.isOfficial && (
                    <span className="px-1.5 py-0.5 text-xs bg-green-200 text-green-800 rounded">
                      Official
                    </span>
                  )}
                </div>
                <span className="text-xs text-gray-500">{comment.timestamp}</span>
              </div>
              <p className="text-sm text-gray-600">{comment.content}</p>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="pt-4 border-t border-[var(--border-soft)]">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder={isAuthenticated ? "Add an update or comment..." : "Login to add comments"}
            disabled={!isAuthenticated}
            className="w-full p-3 rounded-lg border border-[var(--border-soft)] bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] disabled:bg-gray-100 disabled:cursor-not-allowed"
            rows={3}
          />
          <div className="flex justify-end mt-2">
            <Button
              onClick={handleSubmitComment}
              disabled={!newComment.trim()}
              size="sm"
            >
              Post Update
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  )
}
