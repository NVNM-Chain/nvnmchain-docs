import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Frame } from '@/app/components/docs/mdx/frame'

describe('Frame', () => {
  it('renders children inside a bordered frame', () => {
    render(<Frame><img src="/test.png" alt="test" /></Frame>)
    expect(screen.getByRole('img', { name: 'test' }).parentElement).toHaveClass('border')
  })

  it('applies a custom class to the frame', () => {
    render(<Frame className="custom-frame">Content</Frame>)
    expect(screen.getByText('Content')).toHaveClass('custom-frame')
  })

  it('does not render a figcaption when no caption is given', () => {
    render(<Frame>Content</Frame>)
    expect(screen.queryByRole('figure', { name: /caption/i })).not.toBeInTheDocument()
    expect(document.querySelector('figcaption')).not.toBeInTheDocument()
  })
})
