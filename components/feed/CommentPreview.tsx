'use client'

import { useState } from 'react'
import Modal from '@/components/ui/Modal'
import { Button } from '@/components/ui/Button'
import { useToast } from '@/components/ui/Toast'
import type { FeedPost } from '@/types/feed'

interface CommentPreviewProps {
  post: FeedPost | null
  isOpen: boolean
  onClose: () => void
  isAuthenticated: boolean
  onAuthRequired: () => void
}

interface Comment {
  id: string
  author: string
  content: string
  timestamp: string
  isOfficial: boolean
  likes: number
}

// Generate mock comments based on post
function getMockComments(post: FeedPost): Comment[] {
  const baseComments: Comment[] = [
    {
      id: '1',
      author: 'Local Resident',
      content: 'Can confirm this situation. Saw it myself about an hour ago. Please be careful if you\'re in the area.',
      timestamp: '45m ago',
      isOfficial: false,
      likes: 12,
    },
    {
      id: '2',
      author: 'Municipal Authority',
      content: 'Our team has been dispatched to assess the situation. Expected arrival in 30 minutes. Please stay safe.',
      timestamp: '30m ago',
      isOfficial: true,
      likes: 34,
    },
    {
      id: '3',
      author: 'Community Volunteer',
      content: 'Alternate route available via Ring Road. Traffic moving smoothly there. Will update if situation changes.',
      timestamp: '15m ago',
      isOfficial: false,
      likes: 8,
    },
  ]

  // Add post-specific comment
  if (post.lastComment) {
    baseComments.unshift({
      id: '0',
      author: 'Emergency Services',
      content: post.lastComment,
      timestamp: '5m ago',
      isOfficial: true,
      likes: 45,
    })
  }

  return baseComments
}

export function CommentPreview({
  post,
  isOpen,
  onClose,
  isAuthenticated,
  onAuthRequired,
}: CommentPreviewProps) {
  const [newComment, setNewComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const toast = useToast()

  if (!post) return null

  const comments = getMockComments(post)

  const handleSubmitComment = async () => {
    if (!isAuthenticated) {
      onAuthRequired()
      return
    }
    if (!newComment.trim()) return

    setIsSubmitting(true)
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 500))
    toast.success('Update posted')
    setNewComment('')
    setIsSubmitting(false)
  }

  const categoryColors: Record<string, string> = {
    Weather: 'bg-amber-100 text-amber-800',
    Ocean: 'bg-blue-100 text-blue-800',
    Infrastructure: 'bg-orange-100 text-orange-800',
    Evacuation: 'bg-red-100 text-red-800',
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Updates & Comments" ariaLabel="Comments for hazard report">
      <div className="max-h-[70vh] overflow-y-auto -mx-6 px-6">
        {/* Post Summary Card */}
        <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="flex items-start justify-between gap-3 mb-2">
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${categoryColors[post.hazardCategory]}`}>
              {post.hazardCategory}
            </span>
            <span className={`px-2 py-0.5 text-xs font-semibold rounded-full ${
              post.status === 'resolved' ? 'bg-gray-200 text-gray-600' : 'bg-green-100 text-green-700'
            }`}>
              {post.status === 'resolved' ? 'Resolved' : 'Active'}
            </span>
          </div>
          <h4 className="font-bold text-[var(--text-primary)] mb-1">{post.title}</h4>
          <div className="flex items-center gap-3 text-xs text-[var(--text-secondary)]">
            <span className="flex items-center gap-1">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              </svg>
              {post.location.name}
            </span>
            <span>•</span>
            <span>{post.commentsCount} updates</span>
          </div>
        </div>

        {/* Comments Thread */}
        <div className="space-y-3 mb-4">
          <h5 className="text-sm font-semibold text-[var(--text-primary)]">Community Updates</h5>
          
          {comments.map(comment => (
            <div
              key={comment.id}
              className={`p-3 rounded-lg border ${
                comment.isOfficial 
                  ? 'bg-green-50 border-green-200' 
                  : 'bg-white border-gray-200'
              }`}
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <div className="flex items-center gap-2">
                  {/* Avatar */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                    comment.isOfficial ? 'bg-green-200 text-green-700' : 'bg-gray-200 text-gray-600'
                  }`}>
                    {comment.author.charAt(0)}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className={`text-sm font-semibold ${comment.isOfficial ? 'text-green-700' : 'text-gray-700'}`}>
                        {comment.author}
                      </span>
                      {comment.isOfficial && (
                        <span className="inline-flex items-center gap-1 px-1.5 py-0.5 text-xs bg-green-200 text-green-800 rounded">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                          </svg>
                          Official
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-gray-500">{comment.timestamp}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-2">{comment.content}</p>
              <div className="flex items-center gap-3 text-xs text-gray-500">
                <button className="flex items-center gap-1 hover:text-green-600 transition-colors">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                  </svg>
                  {comment.likes}
                </button>
                <button className="hover:text-blue-600 transition-colors">Reply</button>
              </div>
            </div>
          ))}
        </div>

        {/* Add Comment */}
        <div className="pt-4 border-t border-gray-200 sticky bottom-0 bg-white">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs font-bold text-gray-600 shrink-0">
              {isAuthenticated ? 'Y' : '?'}
            </div>
            <div className="flex-1">
              <textarea
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder={isAuthenticated ? "Share an update or helpful information..." : "Login to add updates"}
                disabled={!isAuthenticated}
                className="w-full p-3 rounded-lg border border-gray-200 bg-white text-sm resize-none focus:outline-none focus:ring-2 focus:ring-[#2563EB] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                rows={2}
              />
              <div className="flex items-center justify-between mt-2">
                <p className="text-xs text-gray-500">
                  {isAuthenticated 
                    ? 'Be helpful and accurate. False information may be flagged.'
                    : 'Login required to post updates'
                  }
                </p>
                <Button
                  onClick={handleSubmitComment}
                  disabled={!newComment.trim() || isSubmitting}
                  size="sm"
                >
                  {isSubmitting ? 'Posting...' : 'Post Update'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
