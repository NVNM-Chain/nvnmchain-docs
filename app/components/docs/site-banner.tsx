'use client'

import { useState } from 'react'

interface SiteBannerProps {
  content: string
  dismissible?: boolean
}

export function SiteBanner({ content, dismissible = true }: SiteBannerProps) {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div className="relative bg-amber-50 dark:bg-amber-950/30 border-b border-amber-200 dark:border-amber-800 px-4 py-3 text-center">
      <p className="text-sm text-amber-800 dark:text-amber-200 font-medium">
        {content}
      </p>
      {dismissible && (
        <button
          onClick={() => setDismissed(true)}
          className="absolute right-4 top-1/2 -translate-y-1/2 text-amber-600 hover:text-amber-800 dark:text-amber-400"
          aria-label="Dismiss banner"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  )
}
