// Feed Post Data Model
export type HazardCategory = 'Weather' | 'Ocean' | 'Infrastructure' | 'Evacuation'
export type PostStatus = 'active' | 'resolved'

export interface FeedPost {
  id: string
  title: string
  description: string
  hazardCategory: HazardCategory
  mediaUrl?: string
  location: {
    lat: number
    lng: number
    name: string
  }
  timestamp: string
  upvotes: number
  downvotes: number
  status: PostStatus
  authorReliabilityScore: number
  commentsCount: number
  lastComment?: string
}

export interface FeedFilters {
  categories: HazardCategory[]
  nearMe: boolean
  radius: number // in km
  showResolved: boolean
}

export interface UserVote {
  postId: string
  vote: 'up' | 'down'
}

// Scoring weights for feed ranking
export const SCORING_WEIGHTS = {
  voteWeight: 1.5,
  recencyDecayHours: 24,
  proximityMaxKm: 50,
  recencyMaxScore: 100,
  proximityMaxScore: 50,
}

// Calculate distance between two coordinates (Haversine formula)
export function calculateDistance(
  lat1: number,
  lng1: number,
  lat2: number,
  lng2: number
): number {
  const R = 6371 // Earth's radius in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) *
      Math.sin(dLng / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

// Calculate final score for ranking
export function calculateFeedScore(
  post: FeedPost,
  userLocation?: { lat: number; lng: number }
): number {
  const { voteWeight, recencyDecayHours, proximityMaxKm, recencyMaxScore, proximityMaxScore } = SCORING_WEIGHTS

  // Vote score
  const voteScore = (post.upvotes - post.downvotes) * voteWeight

  // Recency score (higher for newer posts)
  const hoursAgo = (Date.now() - new Date(post.timestamp).getTime()) / (1000 * 60 * 60)
  const recencyScore = Math.max(0, recencyMaxScore * (1 - hoursAgo / recencyDecayHours))

  // Proximity score (if user location available)
  let proximityScore = 0
  if (userLocation) {
    const distance = calculateDistance(
      userLocation.lat,
      userLocation.lng,
      post.location.lat,
      post.location.lng
    )
    proximityScore = Math.max(0, proximityMaxScore * (1 - distance / proximityMaxKm))
  }

  // Resolved posts get lower score
  const statusMultiplier = post.status === 'resolved' ? 0.3 : 1

  return (voteScore + recencyScore + proximityScore) * statusMultiplier
}
