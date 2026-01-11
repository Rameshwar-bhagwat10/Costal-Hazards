'use client'

import { useState, useMemo, useCallback, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { FeedCard } from './FeedCard'
import { FeedFiltersComponent } from './FeedFilters'
import { FeedSortOptions, type SortOption } from './FeedSortOptions'
import { FeedSkeleton } from './FeedSkeleton'
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
  const [sortBy, setSortBy] = useState<SortOption>('score')
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [isLocating, setIsLocating] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [userVotes, setUserVotes] = useState<UserVote[]>([])
  const [posts, setPosts] = useState<FeedPost[]>(dummyFeedPosts)
  const [visibleCount, setVisibleCount] = useState(POSTS_PER_PAGE)
  const [selectedPost, setSelectedPost] = useState<FeedPost | null>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false)

  // Simulate initial loading
  useState(() => {
    const timer = setTimeout(() => setIsLoading(false), 800)
    return () => clearTimeout(timer)
  })

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
        setUserLocation(DEFAULT_LOCATION)
        setIsLocating(false)
        isLocatingRef.current = false
        toast.info('Using default location')
      },
      { timeout: 10000 }
    )
  }, [userLocation, toast])

  // Handle filter changes
  const handleFiltersChange = useCallback((newFilters: FeedFilters) => {
    setFilters(newFilters)
    if (newFilters.nearMe && !userLocation && !isLocatingRef.current) {
      requestLocation()
    }
  }, [userLocation, requestLocation])

  // Calculate distance for each post
  const getPostDistance = useCallback((post: FeedPost): number | undefined => {
    if (!userLocation) return undefined
    return calculateDistance(
      userLocation.lat,
      userLocation.lng,
      post.location.lat,
      post.location.lng
    )
  }, [userLocation])

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

    // Sort based on selected option
    switch (sortBy) {
      case 'recent':
        filtered.sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
        break
      case 'validated':
        filtered.sort((a, b) => (b.upvotes - b.downvotes) - (a.upvotes - a.downvotes))
        break
      case 'nearest':
        if (userLocation) {
          filtered.sort((a, b) => {
            const distA = calculateDistance(userLocation.lat, userLocation.lng, a.location.lat, a.location.lng)
            const distB = calculateDistance(userLocation.lat, userLocation.lng, b.location.lat, b.location.lng)
            return distA - distB
          })
        }
        break
      case 'score':
      default:
        const scoredPosts = filtered.map(post => ({
          post,
          score: calculateFeedScore(post, filters.nearMe ? userLocation ?? undefined : undefined),
        }))
        scoredPosts.sort((a, b) => b.score - a.score)
        return scoredPosts.map(item => item.post)
    }

    return filtered
  }, [posts, filters, userLocation, sortBy])

  const visiblePosts = sortedPosts.slice(0, visibleCount)
  const hasMore = visibleCount < sortedPosts.length
  const activeCount = posts.filter(p => p.status === 'active').length

  // Handle vote
  const handleVote = useCallback((postId: string, vote: 'up' | 'down') => {
    const existingVote = userVotes.find(v => v.postId === postId)
    
    if (existingVote) {
      if (existingVote.vote === vote) return
      setUserVotes(prev => prev.map(v => 
        v.postId === postId ? { ...v, vote } : v
      ))
    } else {
      setUserVotes(prev => [...prev, { postId, vote }])
    }

    setPosts(prev => prev.map(post => {
      if (post.id !== postId) return post
      
      let upvotes = post.upvotes
      let downvotes = post.downvotes

      if (existingVote) {
        if (existingVote.vote === 'up') upvotes--
        else downvotes--
      }

      if (vote === 'up') upvotes++
      else downvotes++

      return { ...post, upvotes, downvotes }
    }))

    toast.success(vote === 'up' ? 'Report validated' : 'Report flagged')
  }, [userVotes, toast])

  // Handle mark as resolved
  const handleMarkResolved = useCallback((postId: string) => {
    setPosts(prev => prev.map(post => 
      post.id === postId ? { ...post, status: 'resolved' as const } : post
    ))
    toast.success('Marked as resolved')
  }, [toast])

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

  // Refresh feed
  const handleRefresh = () => {
    setIsLoading(true)
    setTimeout(() => {
      setPosts([...dummyFeedPosts])
      setVisibleCount(POSTS_PER_PAGE)
      setIsLoading(false)
      toast.success('Feed refreshed')
    }, 500)
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

      {/* Sort Options + Stats */}
      <div className="flex items-center justify-between gap-2 mb-4">
        <FeedSortOptions
          value={sortBy}
          onChange={setSortBy}
          hasLocation={!!userLocation}
        />
        
        <div className="flex items-center gap-2 sm:gap-4 text-sm shrink-0">
          <button
            onClick={handleRefresh}
            disabled={isLoading}
            className="p-2 rounded-lg hover:bg-gray-100 text-[var(--text-secondary)] hover:text-[var(--info-blue)] transition-colors"
            aria-label="Refresh feed"
          >
            <svg className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
          </button>
          <span className="hidden sm:flex items-center gap-1.5 text-[var(--text-secondary)]">
            {sortedPosts.length} result{sortedPosts.length !== 1 ? 's' : ''}
          </span>
          <span className="flex items-center gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500" />
            </span>
            <span className="text-red-600 font-medium text-xs sm:text-sm">{activeCount} active</span>
          </span>
        </div>
      </div>

      {/* Feed List */}
      {isLoading ? (
        <FeedSkeleton />
      ) : visiblePosts.length > 0 ? (
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
              distance={filters.nearMe || sortBy === 'nearest' ? getPostDistance(post) : undefined}
              onMarkResolved={isLoggedIn ? handleMarkResolved : undefined}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-16 bg-white rounded-xl border-2 border-dashed border-gray-200">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-[var(--text-primary)] mb-2">No hazards found</h3>
          <p className="text-sm text-[var(--text-secondary)] mb-4 max-w-xs mx-auto">
            {filters.nearMe 
              ? `No hazards reported within ${filters.radius}km of your location.`
              : 'Try adjusting your filters to see more results.'
            }
          </p>
          <Button variant="secondary" size="sm" onClick={() => handleFiltersChange({
            ...filters,
            categories: ['Weather', 'Ocean', 'Infrastructure', 'Evacuation'],
            showResolved: true,
            nearMe: false,
          })}>
            Reset Filters
          </Button>
        </div>
      )}

      {/* Load More */}
      {hasMore && !isLoading && (
        <div className="mt-6 text-center">
          <Button variant="secondary" onClick={handleLoadMore}>
            <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
            Load More ({sortedPosts.length - visibleCount} remaining)
          </Button>
        </div>
      )}

      {/* End of Feed */}
      {!hasMore && visiblePosts.length > 0 && !isLoading && (
        <div className="mt-6 text-center py-4 text-sm text-[var(--text-secondary)]">
          <p>You&apos;ve reached the end of the feed</p>
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
