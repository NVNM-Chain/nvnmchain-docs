import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Frame } from '@/app/components/docs/mdx/frame'

describe('Frame', () => {
  it('renders children inside a figure element', () => {
    render(<Frame><img src="/test.png" alt="test" /></Frame>)
    expect(screen.getByRole('figure')).toBeInTheDocument()
  })

  it('renders a figcaption when caption is provided', () => {
    render(<Frame caption="Image caption">Content</Frame>)
    expect(screen.getByText('Image caption')).toBeInTheDocument()
  })

  it('does not render a figcaption when no caption is given', () => {
    render(<Frame>Content</Frame>)
    expect(screen.queryByRole('figure', { name: /caption/i })).not.toBeInTheDocument()
    expect(document.querySelector('figcaption')).not.toBeInTheDocument()
  })
})
