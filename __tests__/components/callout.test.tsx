import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { Info, Tip, Warning, Note, Check } from '@/app/components/docs/mdx/callout'
import { getMDXComponents } from '@/app/components/docs/mdx'

describe('Callout variants', () => {
  it('Info renders children', () => {
    render(<Info>Information message</Info>)
    expect(screen.getByText('Information message')).toBeInTheDocument()
  })

  it('Tip renders children', () => {
    render(<Tip>A helpful tip</Tip>)
    expect(screen.getByText('A helpful tip')).toBeInTheDocument()
  })

  it('Warning renders children', () => {
    render(<Warning>Be careful</Warning>)
    expect(screen.getByText('Be careful')).toBeInTheDocument()
  })

  it('Note renders children', () => {
    render(<Note>Side note</Note>)
    expect(screen.getByText('Side note')).toBeInTheDocument()
  })

  it('Check renders children', () => {
    render(<Check>All good</Check>)
    expect(screen.getByText('All good')).toBeInTheDocument()
  })

  it('renders an optional title when provided', () => {
    render(<Info title="My Title">Body text</Info>)
    expect(screen.getByText('My Title')).toBeInTheDocument()
    expect(screen.getByText('Body text')).toBeInTheDocument()
  })

  it('does not render a title element when title is omitted', () => {
    render(<Info>No title here</Info>)
    expect(screen.queryByRole('paragraph', { name: /title/i })).not.toBeInTheDocument()
  })
})

describe('Danger alias', () => {
  it('Danger is mapped to Warning in the MDX components registry', () => {
    const components = getMDXComponents()
    expect(components.Danger).toBe(components.Warning)
  })
})
