'use client'

export function FeedSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white rounded-lg border-2 border-border-soft p-4 animate-pulse"
        >
          {/* Top Row */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="h-6 w-20 bg-gray-200 rounded" />
              <div className="h-6 w-16 bg-gray-200 rounded" />
            </div>
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>

          {/* Title */}
          <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />

          {/* Description */}
          <div className="space-y-2 mb-3">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-2/3 bg-gray-200 rounded" />
          </div>

          {/* Location + Time */}
          <div className="flex items-center gap-4 mb-3">
            <div className="h-4 w-32 bg-gray-200 rounded" />
            <div className="h-4 w-16 bg-gray-200 rounded" />
          </div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between pt-3 border-t border-border-soft">
            <div className="flex items-center gap-2">
              <div className="h-9 w-9 bg-gray-200 rounded-lg" />
              <div className="h-5 w-10 bg-gray-200 rounded" />
              <div className="h-9 w-9 bg-gray-200 rounded-lg" />
            </div>
            <div className="h-9 w-16 bg-gray-200 rounded-lg" />
          </div>
        </div>
      ))}
    </div>
  )
}
