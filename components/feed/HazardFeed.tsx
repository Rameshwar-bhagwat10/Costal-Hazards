'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FeedCard } from './FeedCard'
import { FeedFiltersComponent } from './FeedFilters'
import { CommentPreview } from './CommentPreview'
import { Button } from '@/components/ui/Button'
import { useAuth } from '@/hooks/useAuth'
import { useToast } from '@/components/ui/Toast'
import { dummyFeedPosts } from '@/data/dummyFeedPosts'
import {
  calculateFeedScore,
  calculateDistance,
  type FeedPost,
  type FeedFilters,
  type UserVote,
  type HazardCategory,
} from '@/types/feed'

const POSTS_PER_PAGE = 6

// Default location (Mumbai)
const DEFAULT_LOCATION = { lat: 19.0760, lng: 72.8777 }

export function HazardFeed() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const toast = useToast()
  const isLocatingRef = useRef(false)

  // State
  const [filters, setFilters] = useState<FeedFilters>({
    categories: ['Weather', 'Ocean', 'Infrastructure', 'Evacuation'] as HazardCategory[],
    nearMe: false,
    radius: 10,
    showResolved: true,
  })
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [userVotes, setUserVotes] = useState<UserVote[]>([])
  const [posts, setPosts] = useState<FeedPost[]>(dummyFeedPosts)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  // Request location
  const requestLocation = useCallback(() => {
    if (userLocation || isLocatingRef.current) return
    
    isLocatingRef.current = true
    setIsLocating(true)
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setUserLocation({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        })
        setIsLocating(false)
        isLocatingRef.current = false
        toast.success('Location detected')
      },
      () => {
        // Fallback to default location
        setUserLocation(DEFAULT_LOCATION)
        setIsLocating(false)
        isLocatingRef.current = false
        toast.info('Using default location')
      },
      { timeout: 10000 }
    )
  }, [userLocation, toast])

  // Handle filter changes - request location when Near Me is enabled
  const handleFiltersChange = useCallback((newFilters: FeedFilters) => {
    setFilters(newFilters)
    
    // Request location when Near Me is enabled
    if (newFilters.nearMe && !userLocation && !isLocatingRef.current) {
      requestLocation()
    }
  }, [userLocation, requestLocation])

  // Filter and sort posts
  const sortedPosts = useMemo(() => {
    let filtered = posts

    // Filter by category
    filtered = filtered.filter(post => filters.categories.includes(post.hazardCategory))

    // Filter by status
    if (!filters.showResolved) {
      filtered = filtered.filter(post => post.status === 'active')
    }

    // Filter by proximity if Near Me is enabled
    if (filters.nearMe && userLocation) {
      filtered = filtered.filter(post => {
        const distance = calculateDistance(
          userLocation.lat,
          userLocation.lng,
          post.location.lat,
          post.location.lng
        )
        return distance <= filters.radius
      })
    }

    // Calculate scores and sort
    const scoredPosts = filtered.map(post => ({
      post,
      score: calculateFeedScore(post, filters.nearMe ? userLocation ?? undefined : undefined),
    }))

    scoredPosts.sort((a, b) => b.score - a.score)

    return scoredPosts.map(item => item.post)
  }, [posts, filters, userLocation])

  const visiblePosts = sortedPosts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedPosts.length

  // Handle vote
  const handleVote = useCallback((postId: string, vote: 'up' | 'down') => {
    // Check existing vote
    const existingVote = userVotes.find(v => v.postId === postId)
    
    // Update user votes
    if (existingVote) {
      if (existingVote.vote === vote) return // Already voted same way
      setUserVotes(prev => prev.map(v => 
        v.postId === postId ? { ...v, vote } : v
      ))
    } else {
      setUserVotes(prev => [...prev, { postId, vote }])
    }

    // Update post votes (optimistic update)
    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post
      
      let upvotes = post.upvotes
      let downvotes = post.downvotes

      // Remove previous vote if exists
      if (existingVote) {
        if (existingVote.vote === 'up') upvotes--
        else downvotes--
      }

      // Add new vote
      if (vote === 'up') upvotes++
      else downvotes++

      return { ...post, upvotes, downvotes }
    }))

    toast.success(vote === 'up' ? 'Report validated' : 'Report flagged')
  }, [userVotes, toast])

  // Handle auth required
  const handleAuthRequired = useCallback(() => {
    toast.info('Login required to validate reports')
    router.push('/login')
  }, [router, toast])

  // Handle comment click
  const handleCommentClick = useCallback((post: FeedPost) => {
    setSelectedPost(post)
    setIsCommentModalOpen(true)
  }, [])

  // Load more
  const handleLoadMore = () => {
    setVisibleCount(prev => prev + POSTS_PER_PAGE)
  }

  return (
    <div>
      {/* Filters */}
      <FeedFiltersComponent
        filters={filters}
        onFiltersChange={handleFiltersChange}
        isLocating={isLocating}
        hasLocation={!!userLocation}
      />

      {/* Feed Stats */}
      <div className="flex items-center justify-between mb-4 text-sm text-[var(--text-secondary)]">
        <span>
          {sortedPosts.length} hazard{sortedPosts.length !== 1 ? 's' : ''} found
          {filters.nearMe && userLocation && ` within ${filters.radius}km`}
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          {posts.filter(p => p.status === 'active').length} active
        </span>
      </div>

      {/* Feed List */}
      {visiblePosts.length > 0 ? (
        <div className="space-y-4">
          {visiblePosts.map(post => (
            <FeedCard
              key={post.id}
              post={post}
              userVote={userVotes.find(v => v.postId === post.id)?.vote ?? null}
              onVote={handleVote}
              onCommentClick={handleCommentClick}
              isAuthenticated={isLoggedIn}
              onAuthRequired={handleAuthRequired}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 bg-white rounded-lg border border-[var(--border-soft)]">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-1">No hazards found</h3>
          <p className="text-sm text-[var(--text-secondary)]">
            Try adjusting your filters or expanding the search radius.
          </p>
        </div>
      )}

      {/* Load More */}
      {hasMore && (
        <div className="mt-6 text-center">
          <Button variant="secondary" onClick={handleLoadMore}>
            Load More ({sortedPosts.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {/* Comment Modal */}
      <CommentPreview
        post={selectedPost}
        isOpen={isCommentModalOpen}
        onClose={() => setIsCommentModalOpen(false)}
        isAuthenticated={isLoggedIn}
        onAuthRequired={handleAuthRequired}
      />
    </div>
  )
}
