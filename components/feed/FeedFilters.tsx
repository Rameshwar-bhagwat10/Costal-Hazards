'use client'

import { useState } from 'react'
import type { HazardCategory, FeedFilters } from '@/types/feed'

interface FeedFiltersProps {
  filters: FeedFilters
  onFiltersChange: (filters: FeedFilters) => void
  isLocating: boolean
  hasLocation: boolean
}

const categories: HazardCategory[] = ['Weather', 'Ocean', 'Infrastructure', 'Evacuation']
const radiusOptions = [5, 10, 25]

export function FeedFiltersComponent({
  filters,
  onFiltersChange,
  isLocating,
  hasLocation,
}: FeedFiltersProps) {
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false)

  const toggleCategory = (category: HazardCategory) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(c => c !== category)
      : [...filters.categories, category]
    
    if (newCategories.length === 0) return
    onFiltersChange({ ...filters, categories: newCategories })
  }

  const toggleNearMe = () => {
    onFiltersChange({ ...filters, nearMe: !filters.nearMe })
  }

  const setRadius = (radius: number) => {
    onFiltersChange({ ...filters, radius })
  }

  const toggleShowResolved = () => {
    onFiltersChange({ ...filters, showResolved: !filters.showResolved })
  }

  const selectAllCategories = () => {
    onFiltersChange({ ...filters, categories: [...categories] })
  }

  return (
    <div className="bg-white rounded-lg border border-[var(--border-soft)] p-3 mb-4">
      {/* Mobile-friendly horizontal scroll */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide -mx-1 px-1">
        {/* Near Me Toggle */}
        <button
          onClick={toggleNearMe}
          disabled={isLocating}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0
            ${filters.nearMe && hasLocation
              ? 'bg-[#2563EB] text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
            ${isLocating ? 'opacity-50 cursor-wait' : ''}
          `}
          aria-pressed={filters.nearMe}
        >
          {isLocating ? (
            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            </svg>
          )}
          <span className="hidden xs:inline">Near Me</span>
        </button>

        {/* Radius Selector */}
        {filters.nearMe && hasLocation && (
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5 shrink-0">
            {radiusOptions.map(radius => (
              <button
                key={radius}
                onClick={() => setRadius(radius)}
                className={`
                  px-2 py-1.5 text-xs font-medium rounded transition-colors
                  ${filters.radius === radius
                    ? 'bg-white text-[#2563EB] shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                  }
                `}
              >
                {radius}km
              </button>
            ))}
          </div>
        )}

        {/* Divider */}
        <div className="w-px h-6 bg-gray-200 shrink-0" />

        {/* Category Filter */}
        <div className="relative shrink-0">
          <button
            onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors whitespace-nowrap"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
            </svg>
            <span className="hidden xs:inline">Type</span>
            {filters.categories.length < categories.length && (
              <span className="bg-[#2563EB] text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                {filters.categories.length}
              </span>
            )}
          </button>

          {showCategoryDropdown && (
            <div className="absolute top-full left-0 mt-1 bg-white rounded-lg shadow-lg border border-[var(--border-soft)] py-2 z-30 min-w-[160px]">
              <button
                onClick={selectAllCategories}
                className="w-full px-3 py-2 text-left text-sm text-[#2563EB] hover:bg-gray-50"
              >
                Select All
              </button>
              <div className="border-t border-[var(--border-soft)] my-1" />
              {categories.map(category => (
                <label
                  key={category}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => toggleCategory(category)}
                    className="w-4 h-4 rounded border-gray-300 text-[#2563EB] focus:ring-[#2563EB]"
                  />
                  <span className="text-sm">{category}</span>
                </label>
              ))}
            </div>
          )}
        </div>

        {/* Show Resolved Toggle */}
        <button
          onClick={toggleShowResolved}
          className={`
            flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap shrink-0
            ${filters.showResolved
              ? 'bg-gray-700 text-white'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }
          `}
          aria-pressed={filters.showResolved}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span className="hidden sm:inline">Resolved</span>
        </button>
      </div>

      {/* Close dropdown when clicking outside */}
      {showCategoryDropdown && (
        <div
          className="fixed inset-0 z-20"
          onClick={() => setShowCategoryDropdown(false)}
        />
      )}
    </div>
  )
}
